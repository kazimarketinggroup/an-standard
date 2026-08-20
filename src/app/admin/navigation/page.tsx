import { createAdminClient } from '@/lib/supabase/server'
import NavigationEditor from './NavigationEditor'

export const dynamic = 'force-dynamic'

/**
 * The footer's "What we do" and "Sectors" columns are generated from the
 * Service and Sector tables' "Show in footer" switch, so they are not editable
 * here — only the free-form groups are.
 */
const GROUPS = [
  { key: 'header', label: 'Header menu' },
  { key: 'footer-company', label: 'Footer — Company column' },
  { key: 'footer-legal', label: 'Footer — legal links' },
]

export default async function NavigationPage() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('nav_items')
    .select('label, url, group_key, sort_order')
    .order('sort_order')

  const items = data ?? []
  const grouped = GROUPS.map((group) => ({
    ...group,
    items: items
      .filter((item) => item.group_key === group.key)
      .map((item) => ({ label: item.label as string, url: item.url as string })),
  }))

  return <NavigationEditor groups={grouped} />
}
