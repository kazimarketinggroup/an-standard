'use client'

import { useRef, useState } from 'react'
import { uploadImage } from '../actions'

/**
 * Shows the current image and swaps it for a newly uploaded one.
 *
 * Uses a plain <img> rather than next/image: the value can be any URL the
 * client has uploaded, and this preview is behind auth where optimisation
 * gains nothing.
 */
export default function ImageField({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    setBusy(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    const result = await uploadImage(formData)

    if (result.ok) {
      onChange(result.url)
    } else {
      setError(result.error)
    }
    setBusy(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-neutral-400">No image</span>
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
              {busy ? 'Uploading…' : value ? 'Change image' : 'Upload image'}
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm
                           text-red-600 transition-colors hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>

          {value && (
            <p className="mt-2 break-all text-xs text-neutral-500" title={value}>
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
