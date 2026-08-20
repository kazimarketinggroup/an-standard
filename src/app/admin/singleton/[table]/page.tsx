import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { isSingletonKey, singletonMeta } from '@/lib/cms/admin-nav'
import { singletonSchema, fieldsOf, emptyValue } from '@/lib/cms/schema'
import SingletonEditor from './SingletonEditor'

export const dynamic = 'force-dynamic'

export default async function SingletonPage({ params }: { params: { table: string } }) {
  const { table } = params
  if (!isSingletonKey(table)) notFound()

  const groups = singletonSchema[table]
  const meta = singletonMeta[table]

  const supabase = createAdminClient()
  const { data } = await supabase.from(table).select('*').eq('id', 1).maybeSingle()

  // A missing row is normal before the seed has run, so start from blanks
  // rather than 404ing — saving will create the row.
  const values: Record<string, unknown> = {}
  for (const field of fieldsOf(groups)) {
    values[field.name] = data?.[field.name] ?? emptyValue(field.type)
  }

  // The home page's featured-sector select needs the current sector list.
  let dynamicOptions: Record<string, { value: string; label: string }[]> | undefined
  const needsSectors = fieldsOf(groups).some((f) => f.optionsFrom === 'sectors')
  if (needsSectors) {
    const { data: sectors } = await supabase
      .from('sectors')
      .select('slug, title')
      .order('sort_order')
    dynamicOptions = {
      featured_sector_slug: (sectors ?? []).map((s) => ({
        value: s.slug as string,
        label: s.title as string,
      })),
    }
  }

  return (
    <SingletonEditor
      table={table}
      title={meta.label}
      livePath={meta.livePath}
      groups={groups}
      initialValues={values}
      dynamicOptions={dynamicOptions}
    />
  )
}
