'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The real page, in a frame beside the form.
 *
 * It reloads when `refreshKey` changes, which the editor bumps after a
 * successful save. Because saves revalidate the public route, the reload shows
 * the change the client just made.
 *
 * The frame renders the site at desktop width and scales it down with a CSS
 * transform rather than letting it reflow, so the client sees the real desktop
 * layout instead of the mobile one.
 */
const WIDTHS = { desktop: 1280, mobile: 420 } as const

type Device = keyof typeof WIDTHS

export default function LivePreview({
  path,
  refreshKey,
}: {
  path: string
  refreshKey: number
}) {
  const frame = useRef<HTMLIFrameElement>(null)
  const shell = useRef<HTMLDivElement>(null)
  const [device, setDevice] = useState<Device>('desktop')
  const [scale, setScale] = useState(0.4)
  const [loading, setLoading] = useState(true)

  // Fit the chosen viewport width into whatever space the column has.
  useEffect(() => {
    const el = shell.current
    if (!el) return

    const fit = () => setScale(el.clientWidth / WIDTHS[device])
    fit()

    const observer = new ResizeObserver(fit)
    observer.observe(el)
    return () => observer.disconnect()
  }, [device])

  useEffect(() => {
    if (refreshKey === 0) return
    setLoading(true)
    // Cache-bust so the frame refetches rather than reusing its last render.
    if (frame.current) frame.current.src = `${path}?preview=${refreshKey}`
  }, [refreshKey, path])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-neutral-500">Preview</span>
          {loading && <span className="text-xs text-neutral-400">loading…</span>}
        </div>

        <div className="flex items-center gap-1">
          {(['desktop', 'mobile'] as Device[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setDevice(option)}
              className={`rounded px-2 py-1 text-xs capitalize transition-colors ${
                device === option
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {option}
            </button>
          ))}
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100"
          >
            Open ↗
          </a>
        </div>
      </div>

      <div ref={shell} className="flex-1 overflow-hidden bg-neutral-200">
        <iframe
          ref={frame}
          src={path}
          title="Live preview of this page"
          onLoad={() => setLoading(false)}
          className="border-0 bg-white"
          style={{
            width: WIDTHS[device],
            // Tall enough that the scaled frame still fills the column.
            height: `${100 / scale}%`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  )
}
