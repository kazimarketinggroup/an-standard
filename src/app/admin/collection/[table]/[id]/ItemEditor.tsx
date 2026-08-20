'use client'

import type { FieldGroup } from '@/lib/cms/schema'
import { saveCollectionItem } from '../../../actions'
import EditorForm from '../../../ui/EditorForm'

export default function ItemEditor({
  table,
  id,
  title,
  livePath,
  groups,
  initialValues,
  children,
}: {
  table: string
  id: string
  title: string
  livePath: string
  groups: FieldGroup[]
  initialValues: Record<string, unknown>
  children?: React.ReactNode
}) {
  return (
    <EditorForm
      title={title}
      livePath={livePath}
      groups={groups}
      initialValues={initialValues}
      onSave={(values) => saveCollectionItem(table, id, values)}
    >
      {children}
    </EditorForm>
  )
}
