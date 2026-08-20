'use client'

import { useEffect, useState } from 'react'
import type { FieldGroup } from '@/lib/cms/schema'
import type { ActionResult } from '../actions'
import FieldRenderer from './FieldRenderer'

/**
 * Renders a schema as a form and saves it in one go.
 *
 * There is no draft state: Save writes straight to the live site, which is what
 * the client expects. A beforeunload guard covers the accidental-close case.
 */
export default function EditorForm({
  groups,
  initialValues,
  onSave,
  title,
  livePath,
  dynamicOptions,
  children,
}: {
  groups: FieldGroup[]
  initialValues: Record<string, unknown>
  onSave: (values: Record<string, unknown>) => Promise<ActionResult>
  title: string
  livePath?: string
  /** Options for `optionsFrom` selects, keyed by field name. */
  dynamicOptions?: Record<string, { value: string; label: string }[]>
  children?: React.ReactNode
}) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')
  const [error, setError] = useState('')

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
    const timer = setTimeout(() => setToast(''), 2500)
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
      setToast('Saved ✓')
    } else {
      setError(result.error)
    }
    setBusy(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        {livePath && (
          <a
            href={livePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
          >
            View live page ↗
          </a>
        )}
      </div>

      {children}

      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <section
            key={group.title}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-neutral-200"
          >
            <h2 className="text-sm font-semibold text-neutral-900">{group.title}</h2>

            <div className="mt-4 space-y-4">
              {group.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-neutral-700">
                    {field.label}
                  </label>
                  {field.help && (
                    <p className="mb-1.5 mt-0.5 text-xs text-neutral-500">{field.help}</p>
                  )}
                  <div className={field.help ? '' : 'mt-1'}>
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
              ))}
            </div>
          </section>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Sticky so Save is reachable on these long forms. */}
      <div className="sticky bottom-0 mt-6 flex items-center gap-3 border-t border-neutral-200 bg-neutral-100/95 py-3 backdrop-blur">
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white
                     transition-colors hover:bg-neutral-700 disabled:opacity-60"
        >
          {busy ? 'Saving…' : 'Save'}
        </button>

        {toast && <span className="text-sm font-medium text-green-700">{toast}</span>}
        {dirty && !busy && !toast && (
          <span className="text-sm text-neutral-500">Unsaved changes</span>
        )}
      </div>
    </div>
  )
}
