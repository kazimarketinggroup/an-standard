import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { collectionMeta, isCollectionKey } from '@/lib/cms/admin-nav'
import CollectionList from './CollectionList'

export const dynamic = 'force-dynamic'

export default async function CollectionPage({ params }: { params: { table: string } }) {
  const { table } = params
  if (!isCollectionKey(table)) notFound()

  const meta = collectionMeta[table]

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from(table)
    .select('id, slug, title, sort_order')
    .order('sort_order')

  return (
    <CollectionList
      table={table}
      meta={meta}
      items={(data ?? []) as { id: string; slug: string; title: string; sort_order: number }[]}
      loadError={error?.message ?? ''}
    />
  )
}
