'use client'

import type { FieldGroup } from '@/lib/cms/schema'
import type { PageGuide } from '@/lib/cms/guide'
import { saveSingleton } from '../../actions'
import EditorForm from '../../ui/EditorForm'

export default function SingletonEditor({
  table,
  title,
  livePath,
  groups,
  initialValues,
  guide,
  dynamicOptions,
}: {
  table: string
  title: string
  livePath: string
  groups: FieldGroup[]
  initialValues: Record<string, unknown>
  guide?: PageGuide
  dynamicOptions?: Record<string, { value: string; label: string }[]>
}) {
  return (
    <EditorForm
      title={title}
      livePath={livePath}
      groups={groups}
      initialValues={initialValues}
      guide={guide}
      dynamicOptions={dynamicOptions}
      onSave={(values) => saveSingleton(table, values)}
    />
  )
}
