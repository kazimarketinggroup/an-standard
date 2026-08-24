'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { PageGuide } from '@/lib/cms/guide'
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
  guide,
}: {
  table: string
  meta: { label: string; singular: string; basePath: string; canCreate: boolean }
  items: Item[]
  loadError: string
  guide?: PageGuide
}) {
  const router = useRouter()
  const [rows, setRows] = useState(items)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [showGuide, setShowGuide] = useState(false)

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
      `Delete “${item.title}”?\n\nThis removes the page from your website permanently and cannot be undone.`
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

  /** Suggests a web address from the title, which the client can still edit. */
  function handleTitleChange(value: string) {
    const previousSuggestion = slugify(newTitle)
    setNewTitle(value)
    if (!newSlug || newSlug === previousSuggestion) {
      setNewSlug(slugify(value))
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight">{meta.label}</h1>
          {guide?.summary && (
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">
              {guide.summary}
            </p>
          )}
        </div>

        {meta.canCreate && !adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="shrink-0 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white
                       transition-colors hover:bg-neutral-700"
          >
            + Add new
          </button>
        )}
      </div>

      {(guide?.steps?.length || guide?.notes?.length) && (
        <div className="mt-4 overflow-hidden rounded-lg border border-blue-200 bg-blue-50">
          <button
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-2.5 text-left"
          >
            <span className="text-sm font-medium text-blue-900">How this section works</span>
            <span className="text-xs text-blue-700">{showGuide ? 'Hide' : 'Show'}</span>
          </button>
          {showGuide && (
            <div className="border-t border-blue-200 px-4 py-3">
              {guide.steps && (
                <ol className="space-y-1.5">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-blue-900">
                      <span className="font-semibold tabular-nums">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {guide.notes?.map((note, i) => (
                <p
                  key={i}
                  className="mt-3 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-relaxed text-amber-900"
                >
                  {note}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {loadError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          Could not load: {loadError}
        </p>
      )}

      {adding && (
        <div className="mt-4 rounded-lg border border-neutral-300 bg-white p-5">
          <h2 className="text-sm font-medium">New {meta.singular}</h2>
          <p className="mt-1 text-xs text-neutral-500">
            Give it a name to start with. You can fill in the rest on the next screen.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-800">Name</label>
              <p className="mb-1.5 mt-0.5 text-xs text-neutral-500">
                Shown as the page heading, e.g. Marine
              </p>
              <input
                autoFocus
                value={newTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm
                           outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">Web address</label>
              <p className="mb-1.5 mt-0.5 text-xs text-neutral-500">
                Filled in for you. The page will be at{' '}
                <span className="font-medium text-neutral-700">
                  {meta.basePath}/{newSlug || '…'}
                </span>
              </p>
              <input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm
                           outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={create}
              disabled={busy}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white
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
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <p className="mt-6 text-xs text-neutral-500">
        {rows.length} {rows.length === 1 ? 'page' : 'pages'} · shown on your website in this
        order
      </p>

      <ul className="mt-2 space-y-2">
        {rows.length === 0 && !loadError && (
          <li className="rounded-lg border border-dashed border-neutral-300 px-4 py-10 text-center text-sm text-neutral-500">
            Nothing here yet. Press <strong className="font-medium">+ Add new</strong> to create
            the first one.
          </li>
        )}

        {rows.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-3
                       transition-colors hover:border-neutral-300"
          >
            <span className="w-5 shrink-0 text-center text-xs tabular-nums text-neutral-400">
              {index + 1}
            </span>

            <div className="flex shrink-0 flex-col gap-0.5">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move ${item.title} up`}
                title="Move up"
                className="rounded border border-neutral-300 px-1.5 text-xs leading-4 text-neutral-600
                           hover:bg-neutral-50 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === rows.length - 1}
                aria-label={`Move ${item.title} down`}
                title="Move down"
                className="rounded border border-neutral-300 px-1.5 text-xs leading-4 text-neutral-600
                           hover:bg-neutral-50 disabled:opacity-30"
              >
                ↓
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title || '(no name yet)'}</p>
              <p className="truncate text-xs text-neutral-500">
                {meta.basePath}/{item.slug}
              </p>
            </div>

            {meta.basePath && (
              <a
                href={`${meta.basePath}/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden shrink-0 text-xs text-neutral-500 hover:text-neutral-900 sm:block"
                title="Open this page on the website"
              >
                View ↗
              </a>
            )}

            <Link
              href={`/admin/collection/${table}/${item.id}`}
              className="shrink-0 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm
                         transition-colors hover:bg-neutral-50"
            >
              Edit
            </Link>

            {meta.canCreate && (
              <button
                type="button"
                onClick={() => remove(item)}
                disabled={busy}
                title={`Delete ${item.title}`}
                className="shrink-0 rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm
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
