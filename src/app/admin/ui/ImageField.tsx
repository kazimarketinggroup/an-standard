'use client'

import { useRef, useState } from 'react'
import { compressImage, formatBytes } from '@/lib/images/compress'
import { uploadImage } from '../actions'

/**
 * Shows the current image and swaps it for a newly uploaded one.
 *
 * Files are resized and re-encoded in the browser before upload, so the client
 * can select a photo straight off a phone without thinking about file size.
 *
 * Uses a plain <img> rather than next/image: the value can be any URL the
 * client has uploaded, and this preview is behind auth where optimisation
 * gains nothing.
 */

type Stage = 'idle' | 'compressing' | 'uploading'

export default function ImageField({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [stage, setStage] = useState<Stage>('idle')
  const [error, setError] = useState('')
  const [savings, setSavings] = useState('')

  const busy = stage !== 'idle'

  async function handleFile(file: File) {
    setError('')
    setSavings('')
    setStage('compressing')

    const compressed = await compressImage(file)

    if (!compressed.ok) {
      setError(compressed.error)
      setStage('idle')
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    const shrunk = compressed.file.size < file.size
    setStage('uploading')

    const formData = new FormData()
    formData.append('file', compressed.file)
    const result = await uploadImage(formData)

    if (result.ok) {
      onChange(result.url)
      setSavings(
        shrunk
          ? `Compressed ${formatBytes(file.size)} → ${formatBytes(compressed.file.size)}`
          : formatBytes(compressed.file.size)
      )
    } else {
      setError(result.error)
    }

    setStage('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  const label =
    stage === 'compressing'
      ? 'Compressing…'
      : stage === 'uploading'
        ? 'Uploading…'
        : value
          ? 'Change image'
          : 'Upload image'

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="relative flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-neutral-400">No image</span>
          )}

          {busy && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/85 text-[11px] font-medium text-neutral-700">
              {stage === 'compressing' ? 'Compressing…' : 'Uploading…'}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm
                         transition-colors hover:bg-neutral-50 disabled:opacity-60"
            >
              {label}
            </button>

            {value && !busy && (
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setSavings('')
                }}
                className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm
                           text-red-600 transition-colors hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>

          {savings && !busy && <p className="mt-2 text-xs text-green-700">{savings}</p>}

          {value && (
            <p className="mt-1.5 break-all text-xs text-neutral-500" title={value}>
              {value}
            </p>
          )}
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />
    </div>
  )
}
