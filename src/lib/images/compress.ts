/**
 * Browser-side image compression, used by every admin upload field.
 *
 * The client uploads straight off a phone or a camera, where a photo is
 * routinely 10–20MB — far larger than a marketing page needs, and past the
 * upload limit. Resizing before the upload keeps the storage bucket small and
 * the site fast, and means the client never has to think about file size.
 *
 * Canvas-based rather than a library: the whole job is decode, draw smaller,
 * re-encode, and the browser already does all three.
 */

/** Longest edge of the stored image. Ample for a full-width hero. */
const MAX_EDGE = 2000

/** Quality for the first lossy attempt; dropped if the result is still big. */
const QUALITY_STEPS = [0.8, 0.7, 0.6, 0.5]

/** What we aim for. Comfortably under the 8MB hard limit. */
const TARGET_BYTES = 1.5 * 1024 * 1024

/** The server's hard limit; anything above this is rejected there. */
const HARD_LIMIT_BYTES = 8 * 1024 * 1024

/**
 * Formats that must keep their transparency, so they are resized but never
 * re-encoded to JPEG. WebP stays WebP: it already compresses well and supports
 * an alpha channel.
 */
const KEEPS_ALPHA = ['image/png', 'image/webp', 'image/avif']

/** Vectors are already tiny and would be destroyed by rasterising. */
const SKIP_ENTIRELY = ['image/svg+xml', 'image/gif']

export type CompressResult =
  | { ok: true; file: File; note: string }
  | { ok: false; error: string }

/** Reads a file into an ImageBitmap, or an <img> where that is unsupported. */
async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file)
    } catch {
      // Safari has historically refused some formats here; fall through.
    }
  }

  const url = URL.createObjectURL(file)
  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('decode failed'))
      img.src = url
    })
  } finally {
    // Revoking immediately is safe: the browser has the pixels by now.
    URL.revokeObjectURL(url)
  }
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}

/**
 * Whether any pixel is actually see-through.
 *
 * A PNG or WebP *can* carry transparency but usually does not — screenshots
 * and exported photos are routinely opaque PNGs. Those compress far better as
 * JPEG, so the format alone is not enough to decide; the pixels are.
 *
 * Samples on a grid rather than reading every pixel: a 2000px image is 4M
 * pixels, and a stride of 4 is plenty to notice a transparent region.
 */
function hasTransparency(context: CanvasRenderingContext2D, w: number, h: number): boolean {
  let data: Uint8ClampedArray
  try {
    data = context.getImageData(0, 0, w, h).data
  } catch {
    // A cross-origin source taints the canvas. Assume transparency and stay
    // lossless rather than risk flattening an alpha channel onto black.
    return true
  }

  const stride = 4 * 4 // every 4th pixel
  for (let i = 3; i < data.length; i += stride) {
    if (data[i] < 250) return true
  }
  return false
}

/** Swaps a filename's extension to match the encoded type. */
function rename(name: string, mime: string): string {
  const extension = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg'
  const base = name.replace(/\.[^.]+$/, '') || 'image'
  return `${base}.${extension}`
}

/**
 * Resizes and re-encodes an image so it is small enough to upload.
 *
 * Never upscales, and never rasterises an SVG. Images that need transparency
 * are resized but kept lossless; photographs are re-encoded as JPEG, dropping
 * quality a step at a time until they come in under target.
 *
 * Returns the original file whenever compressing it would not help — a small
 * photo, an unsupported format, or a browser without canvas encoding.
 */
export async function compressImage(file: File): Promise<CompressResult> {
  if (SKIP_ENTIRELY.includes(file.type)) {
    return file.size > HARD_LIMIT_BYTES
      ? { ok: false, error: 'That file is too large to upload. Please use a smaller one.' }
      : { ok: true, file, note: '' }
  }

  // Already small and a sensible format: nothing to gain.
  if (file.size <= TARGET_BYTES && file.type !== 'image/png') {
    return { ok: true, file, note: '' }
  }

  let source: ImageBitmap | HTMLImageElement
  try {
    source = await decode(file)
  } catch {
    return file.size > HARD_LIMIT_BYTES
      ? {
          ok: false,
          error: 'That image could not be read. It may be corrupt or an unsupported format.',
        }
      : { ok: true, file, note: '' }
  }

  const width = 'naturalWidth' in source ? source.naturalWidth : source.width
  const height = 'naturalHeight' in source ? source.naturalHeight : source.height

  if (!width || !height) {
    return { ok: true, file, note: '' }
  }

  // Only ever scale down.
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height))
  const targetWidth = Math.round(width * scale)
  const targetHeight = Math.round(height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight

  const context = canvas.getContext('2d')
  if (!context) return { ok: true, file, note: '' }

  context.imageSmoothingQuality = 'high'
  context.drawImage(source, 0, 0, targetWidth, targetHeight)
  if ('close' in source) source.close()

  const resized = scale < 1 ? `${width}×${height} → ${targetWidth}×${targetHeight}` : ''

  // Only stay lossless where the image genuinely uses its alpha channel;
  // an opaque PNG screenshot is a photograph as far as compression goes.
  const needsAlpha =
    KEEPS_ALPHA.includes(file.type) && hasTransparency(context, targetWidth, targetHeight)

  if (needsAlpha) {
    const type = file.type === 'image/avif' ? 'image/webp' : file.type
    const blob = await canvasToBlob(canvas, type, 0.9)

    if (blob && blob.size < file.size && blob.size <= HARD_LIMIT_BYTES) {
      return {
        ok: true,
        file: new File([blob], rename(file.name, type), { type }),
        note: resized || 'compressed',
      }
    }

    // Lossless was not enough. WebP is the last option that keeps alpha, so
    // try it before giving up — flattening onto white would alter the design.
    if (!blob || blob.size > HARD_LIMIT_BYTES) {
      const webp = await canvasToBlob(canvas, 'image/webp', 0.85)
      if (webp && webp.size <= HARD_LIMIT_BYTES) {
        return {
          ok: true,
          file: new File([webp], rename(file.name, 'image/webp'), { type: 'image/webp' }),
          note: resized || 'compressed',
        }
      }
      return {
        ok: false,
        error:
          'That image is very large and could not be compressed enough. Please try a smaller one.',
      }
    }

    // Re-encoding made it bigger, which happens with small flat graphics.
    return { ok: true, file, note: '' }
  }

  // Photographs: step the quality down until it fits.
  let best: Blob | null = null
  for (const quality of QUALITY_STEPS) {
    const blob = await canvasToBlob(canvas, 'image/jpeg', quality)
    if (!blob) break
    best = blob
    if (blob.size <= TARGET_BYTES) break
  }

  if (!best) {
    return file.size > HARD_LIMIT_BYTES
      ? { ok: false, error: 'That image could not be compressed. Please try a different file.' }
      : { ok: true, file, note: '' }
  }

  if (best.size > HARD_LIMIT_BYTES) {
    return {
      ok: false,
      error:
        'That image is very large and could not be compressed enough. Please try a smaller one.',
    }
  }

  // Keep whichever is smaller; an already-optimised JPEG can beat our re-encode.
  if (best.size >= file.size && file.size <= HARD_LIMIT_BYTES) {
    return { ok: true, file, note: '' }
  }

  return {
    ok: true,
    file: new File([best], rename(file.name, 'image/jpeg'), { type: 'image/jpeg' }),
    note: resized || 'compressed',
  }
}

/** "2.4MB" / "820KB" — for the size shown next to the preview. */
export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  return `${Math.max(1, Math.round(bytes / 1024))}KB`
}
