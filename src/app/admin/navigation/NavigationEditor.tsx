'use client'

import { useEffect, useState } from 'react'
import { saveNavItems } from '../actions'
import RepeatableList from '../ui/RepeatableList'

type Link = { label: string; url: string }
type Group = { key: string; label: string; items: Link[] }

export default function NavigationEditor({ groups }: { groups: Group[] }) {
  const [state, setState] = useState(groups)
  const [busy, setBusy] = useState('')
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  async function save(groupKey: string, items: Link[]) {
    setBusy(groupKey)
    setError('')

    const result = await saveNavItems(groupKey, items)

    if (result.ok) {
      setToast(`Saved ✓`)
    } else {
      setError(result.error)
    }
    setBusy('')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Navigation</h1>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
        >
          View live page ↗
        </a>
      </div>

      <p className="mt-1 text-sm text-neutral-600">
        The footer&rsquo;s &ldquo;What we do&rdquo; and &ldquo;Sectors&rdquo; columns are built
        from the Services and Sectors sections — use the &ldquo;Show in footer&rdquo; switch on
        each one to change them.
      </p>

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 space-y-5">
        {state.map((group, groupIndex) => (
          <section
            key={group.key}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-neutral-200"
          >
            <h2 className="text-sm font-semibold">{group.label}</h2>

            <div className="mt-3">
              <RepeatableList<Link>
                items={group.items}
                onChange={(next) => {
                  const copy = [...state]
                  copy[groupIndex] = { ...group, items: next }
                  setState(copy)
                }}
                makeEmpty={() => ({ label: '', url: '' })}
                addLabel="Add link"
                renderItem={(item, update) => (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      placeholder="Link text"
                      value={item.label}
                      onChange={(e) => update({ ...item, label: e.target.value })}
                      className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm
                                 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                    <input
                      placeholder="/about"
                      value={item.url}
                      onChange={(e) => update({ ...item, url: e.target.value })}
                      className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm
                                 outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                )}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => save(group.key, group.items)}
                disabled={busy === group.key}
                className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white
                           transition-colors hover:bg-neutral-700 disabled:opacity-60"
              >
                {busy === group.key ? 'Saving…' : 'Save'}
              </button>
              {toast && busy === '' && (
                <span className="text-sm font-medium text-green-700">{toast}</span>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
