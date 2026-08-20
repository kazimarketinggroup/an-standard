'use client'

import type { FieldGroup } from '@/lib/cms/schema'
import { saveSingleton } from '../../actions'
import EditorForm from '../../ui/EditorForm'

export default function SingletonEditor({
  table,
  title,
  livePath,
  groups,
  initialValues,
  dynamicOptions,
}: {
  table: string
  title: string
  livePath: string
  groups: FieldGroup[]
  initialValues: Record<string, unknown>
  dynamicOptions?: Record<string, { value: string; label: string }[]>
}) {
  return (
    <EditorForm
      title={title}
      livePath={livePath}
      groups={groups}
      initialValues={initialValues}
      dynamicOptions={dynamicOptions}
      onSave={(values) => saveSingleton(table, values)}
    />
  )
}
