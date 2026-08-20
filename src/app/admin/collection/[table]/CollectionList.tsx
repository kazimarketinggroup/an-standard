'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  createCollectionItem,
  deleteCollectionItem,
  reorderCollection,
} from '../../actions'

type Item = { id: string; slug: string; title: string; sort_order: number }

export default function CollectionList({
  table,
  meta,
  items,
  loadError,
}: {
  table: string
  meta: { label: string; singular: string; basePath: string; canCreate: boolean }
  items: Item[]
  loadError: string
}) {
  const router = useRouter()
  const [rows, setRows] = useState(items)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= rows.length) return

    const next = [...rows]
    ;[next[index], next[target]] = [next[target], next[index]]
    setRows(next)

    const result = await reorderCollection(
      table,
      next.map((r) => r.id)
    )
    if (!result.ok) {
      setError(result.error)
      setRows(rows)
    }
  }

  async function remove(item: Item) {
    const confirmed = window.confirm(
      `Delete “${item.title}”? This permanently removes the page and cannot be undone.`
    )
    if (!confirmed) return

    setBusy(true)
    const result = await deleteCollectionItem(table, item.id)
    setBusy(false)

    if (result.ok) {
      setRows((prev) => prev.filter((r) => r.id !== item.id))
    } else {
      setError(result.error)
    }
  }

  async function create() {
    setBusy(true)
    setError('')

    const result = await createCollectionItem(table, newTitle, newSlug)
    setBusy(false)

    if (result.ok && result.id) {
      router.push(`/admin/collection/${table}/${result.id}`)
    } else if (!result.ok) {
      setError(result.error)
    }
  }

  /** Suggests a URL slug from the title, which the client can still override. */
  function handleTitleChange(value: string) {
    const previousSuggestion = slugify(newTitle)
    setNewTitle(value)
    if (!newSlug || newSlug === previousSuggestion) {
      setNewSlug(slugify(value))
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">{meta.label}</h1>
        {meta.canCreate && !adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white
                       transition-colors hover:bg-neutral-700"
          >
            + Add new
          </button>
        )}
      </div>

      {loadError && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          Could not load: {loadError}
        </p>
      )}

      {adding && (
        <div className="mt-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-neutral-200">
          <h2 className="text-sm font-semibold">New {meta.singular}</h2>

          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Title</label>
              <input
                value={newTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm
                           outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">URL slug</label>
              <p className="mt-0.5 text-xs text-neutral-500">
                The page will live at {meta.basePath}/{newSlug || '…'}
              </p>
              <input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm
                           outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={create}
              disabled={busy}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white
                         transition-colors hover:bg-neutral-700 disabled:opacity-60"
            >
              {busy ? 'Creating…' : 'Create and edit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false)
                setError('')
              }}
              className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {rows.length === 0 && !loadError && (
          <li className="rounded-lg border border-dashed border-neutral-300 px-4 py-8 text-center text-sm text-neutral-500">
            Nothing here yet.
          </li>
        )}

        {rows.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-neutral-200"
          >
            <div className="flex shrink-0 flex-col gap-0.5">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="rounded border border-neutral-300 px-1.5 text-xs disabled:opacity-40"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === rows.length - 1}
                aria-label="Move down"
                className="rounded border border-neutral-300 px-1.5 text-xs disabled:opacity-40"
              >
                ↓
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title || '(untitled)'}</p>
              <p className="truncate text-xs text-neutral-500">
                {meta.basePath}/{item.slug}
              </p>
            </div>

            <Link
              href={`/admin/collection/${table}/${item.id}`}
              className="shrink-0 rounded-md border border-neutral-300 px-3 py-1.5 text-sm
                         transition-colors hover:bg-neutral-50"
            >
              Edit
            </Link>

            {meta.canCreate && (
              <button
                type="button"
                onClick={() => remove(item)}
                disabled={busy}
                className="shrink-0 rounded-md border border-neutral-300 px-2 py-1.5 text-sm
                           text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                aria-label={`Delete ${item.title}`}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
