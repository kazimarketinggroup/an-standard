'use client'

import { useEffect, useState } from 'react'
import type { FieldGroup } from '@/lib/cms/schema'
import type { PageGuide } from '@/lib/cms/guide'
import { fieldGuide, groupGuide } from '@/lib/cms/guide'
import type { ActionResult } from '../actions'
import FieldRenderer from './FieldRenderer'
import LivePreview from './LivePreview'

/**
 * The editing screen: guidance, a grouped form, and the live page beside it.
 *
 * There is no draft state — Save writes straight to the live site, which is
 * what the client expects — so the preview reloads on save to show the result.
 */
export default function EditorForm({
  groups,
  initialValues,
  onSave,
  title,
  livePath,
  guide,
  dynamicOptions,
  children,
}: {
  groups: FieldGroup[]
  initialValues: Record<string, unknown>
  onSave: (values: Record<string, unknown>) => Promise<ActionResult>
  title: string
  livePath?: string
  guide?: PageGuide
  dynamicOptions?: Record<string, { value: string; label: string }[]>
  children?: React.ReactNode
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')
  const [previewKey, setPreviewKey] = useState(0)
  const [showPreview, setShowPreview] = useState(true)
  const [openSection, setOpenSection] = useState<string | null>(groups[0]?.title ?? null)
  const [showGuide, setShowGuide] = useState(false)

  // Warn before losing unsaved edits.
  useEffect(() => {
    if (!dirty) return
    function warn(e: BeforeUnloadEvent) {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  function setField(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }))
    setDirty(true)
  }

  async function save() {
    setBusy(true)
    setError('')

    const result = await onSave(values)

    if (result.ok) {
      setDirty(false)
      setToast('Saved — your website has been updated')
      // Give revalidation a moment before the frame refetches.
      setTimeout(() => setPreviewKey((k) => k + 1), 800)
    } else {
      setError(result.error)
    }
    setBusy(false)
  }

  const form = (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {guide?.summary && (
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-600">
              {guide.summary}
            </p>
          )}
        </div>
      </div>

      {children}

      {(guide?.steps?.length || guide?.notes?.length) && (
        <div className="mt-4 overflow-hidden rounded-lg border border-blue-200 bg-blue-50">
          <button
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-2.5 text-left"
          >
            <span className="text-sm font-medium text-blue-900">
              How this page works
            </span>
            <span className="text-xs text-blue-700">{showGuide ? 'Hide' : 'Show'}</span>
          </button>

          {showGuide && (
            <div className="border-t border-blue-200 px-4 py-3">
              {guide.steps && guide.steps.length > 0 && (
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

      {/* One section open at a time: these forms are long, and a wall of
          inputs is exactly what makes a CMS feel intimidating. */}
      <div className="mt-5 space-y-2.5">
        {groups.map((group, index) => {
          const open = openSection === group.title
          const filled = group.fields.filter((f) => {
            const v = values[f.name]
            return Array.isArray(v) ? v.length > 0 : Boolean(v)
          }).length

          return (
            <section
              key={group.title}
              className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenSection(open ? null : group.title)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    open ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {index + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-neutral-900">
                    {group.title}
                  </span>
                  {groupGuide[group.title] && (
                    <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500">
                      {groupGuide[group.title]}
                    </span>
                  )}
                </span>

                <span className="shrink-0 text-xs text-neutral-400">
                  {filled}/{group.fields.length}
                </span>
                <span className="shrink-0 text-neutral-400">{open ? '−' : '+'}</span>
              </button>

              {open && (
                <div className="space-y-5 border-t border-neutral-200 px-4 py-4">
                  {group.fields.map((field) => {
                    const help = field.help ?? fieldGuide[field.name]

                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-neutral-800">
                          {field.label}
                        </label>
                        {help && (
                          <p className="mb-2 mt-0.5 text-xs leading-relaxed text-neutral-500">
                            {help}
                          </p>
                        )}
                        <div className={help ? '' : 'mt-1.5'}>
                          <FieldRenderer
                            field={field}
                            value={values[field.name]}
                            onChange={(value) => setField(field.name, value)}
                            dynamicOptions={
                              field.optionsFrom ? dynamicOptions?.[field.name] : undefined
                            }
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="h-20" />
    </div>
  )

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      <div className="flex min-h-0 flex-1">
        <div className="min-w-0 flex-1 overflow-y-auto">{form}</div>

        {livePath && showPreview && (
          <div className="hidden w-[46%] shrink-0 border-l border-neutral-200 bg-white xl:block">
            <LivePreview path={livePath} refreshKey={previewKey} />
          </div>
        )}
      </div>

      {/* Save bar: always visible, so the client never loses it down a long form. */}
      <div className="flex items-center gap-3 border-t border-neutral-200 bg-white px-4 py-3 shadow-[0_-1px_3px_rgba(0,0,0,0.04)] sm:px-6">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white
                     transition-colors hover:bg-neutral-700 disabled:opacity-60"
        >
          {busy ? 'Saving…' : 'Save changes'}
        </button>

        {toast && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
            ✓ {toast}
          </span>
        )}
        {dirty && !busy && !toast && (
          <span className="text-sm text-amber-700">You have unsaved changes</span>
        )}
        {!dirty && !toast && !busy && (
          <span className="text-sm text-neutral-400">No changes yet</span>
        )}

        <div className="ml-auto flex items-center gap-3">
          {livePath && (
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="hidden text-sm text-neutral-600 hover:text-neutral-900 xl:block"
            >
              {showPreview ? 'Hide preview' : 'Show preview'}
            </button>
          )}
          {livePath && (
            <a
              href={livePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              View page ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
