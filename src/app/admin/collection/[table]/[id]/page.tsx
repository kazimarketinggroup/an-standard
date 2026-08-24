import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { collectionMeta, isCollectionKey } from '@/lib/cms/admin-nav'
import { collectionSchema, fieldsOf, emptyValue } from '@/lib/cms/schema'
import { collectionGuide } from '@/lib/cms/guide'
import ItemEditor from './ItemEditor'

export const dynamic = 'force-dynamic'

export default async function CollectionItemPage({
  params,
}: {
  params: { table: string; id: string }
}) {
  const { table, id } = params
  if (!isCollectionKey(table)) notFound()

  const groups = collectionSchema[table]
  const meta = collectionMeta[table]

  const supabase = createAdminClient()
  const { data } = await supabase.from(table).select('*').eq('id', id).maybeSingle()

  if (!data) notFound()

  const values: Record<string, unknown> = {}
  for (const field of fieldsOf(groups)) {
    values[field.name] = data[field.name] ?? emptyValue(field.type)
  }

  const livePath = meta.basePath ? `${meta.basePath}/${data.slug}` : `/${data.slug}`

  return (
    <ItemEditor
      table={table}
      id={id}
      title={(data.title as string) || `Edit ${meta.singular}`}
      livePath={livePath}
      groups={groups}
      initialValues={values}
      guide={collectionGuide[table]}
    >
      <Link
        href={`/admin/collection/${table}`}
        className="mt-1 inline-block text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to {meta.label.toLowerCase()}
      </Link>
    </ItemEditor>
  )
}
