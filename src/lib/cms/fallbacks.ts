/**
 * Guards for reading CMS values.
 *
 * jsonb columns can legitimately arrive as null, and a hand-edited row can
 * arrive as an object where the code expects an array. These helpers keep that
 * from reaching JSX, so a bad row degrades to an empty section instead of a
 * 500. Use them at the render boundary rather than sprinkling `?? []` inline.
 */

/** Text with a fallback, treating whitespace-only values as empty. */
export function text(value: string | null | undefined, fallback = ''): string {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

/** Always an array, whatever the column actually held. */
export function list<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : []
}

/** An array with every empty/blank string dropped — for bullet lists. */
export function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim())
    .filter((v) => v.length > 0)
}

/**
 * An image src that is safe to hand to next/image, which throws on an empty
 * string. Returns null so callers can skip the <Image> entirely.
 */
export function imageSrc(value: string | null | undefined): string | null {
  const src = text(value)
  return src.length > 0 ? src : null
}
