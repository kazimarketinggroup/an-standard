'use client'

import type { ReactNode } from 'react'

/**
 * Add / reorder / delete shell shared by every repeatable field.
 *
 * Reordering uses up/down buttons rather than drag-and-drop: it works on touch
 * and with a keyboard, needs no dependency, and the lists here are short.
 */
export default function RepeatableList<T>({
  items,
  onChange,
  makeEmpty,
  addLabel = 'Add item',
  renderItem,
}: {
  items: T[]
  onChange: (next: T[]) => void
  makeEmpty: () => T
  addLabel?: string
  renderItem: (item: T, update: (next: T) => void, index: number) => ReactNode
}) {
  const list = Array.isArray(items) ? items : []

  function updateAt(index: number, next: T) {
    const copy = [...list]
    copy[index] = next
    onChange(copy)
  }

  function removeAt(index: number) {
    onChange(list.filter((_, i) => i !== index))
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= list.length) return
    const copy = [...list]
    ;[copy[index], copy[target]] = [copy[target], copy[index]]
    onChange(copy)
  }

  return (
    <div className="space-y-2">
      {list.length === 0 && (
        <p className="rounded-md border border-dashed border-neutral-300 px-3 py-4 text-center text-sm text-neutral-500">
          Nothing here yet.
        </p>
      )}

      {list.map((item, index) => (
        <div
          key={index}
          className="rounded-md border border-neutral-200 bg-neutral-50 p-3"
        >
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">{renderItem(item, (next) => updateAt(index, next), index)}</div>

            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-xs
                           disabled:opacity-40"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === list.length - 1}
                aria-label="Move down"
                className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-xs
                           disabled:opacity-40"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeAt(index)}
                aria-label="Delete"
                className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-xs
                           text-red-600 hover:bg-red-50"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...list, makeEmpty()])}
        className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm
                   transition-colors hover:bg-neutral-50"
      >
        + {addLabel}
      </button>
    </div>
  )
}
