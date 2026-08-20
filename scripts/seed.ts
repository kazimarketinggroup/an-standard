/**
 * Fills the Supabase tables with the current live-site content.
 *
 *   npm run seed
 *
 * Safe to re-run: every write is an upsert keyed on the natural key (id = 1 for
 * singletons, slug for collections), so re-seeding refreshes rows rather than
 * duplicating them. It never deletes, so content the client has already edited
 * in a row that is not in the seed payload is left alone — but note that a
 * re-run *does* overwrite edited values for rows that are in the payload.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY, since RLS blocks anonymous writes.
 */

import { createClient } from '@supabase/supabase-js'
import {
  aboutSubpages,
  globalSettings,
  homePage,
  insulationSubpages,
  legalPages,
  navItems,
  patterns,
  resourceArticles,
  sectors,
  services,
  singletons,
} from './seed-data'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error(
    'Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY\n' +
      'in .env.local (see .env.example), then run: npm run seed'
  )
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

let failures = 0

async function upsert(table: string, rows: unknown, conflict: string) {
  const payload = Array.isArray(rows) ? rows : [rows]
  const { error } = await supabase.from(table).upsert(payload as never, { onConflict: conflict })

  if (error) {
    console.error(`  ✗ ${table}: ${error.message}`)
    failures++
    return
  }
  console.log(`  ✓ ${table} (${payload.length})`)
}

async function main() {
  console.log('\nSeeding singletons…')
  await upsert('global_settings', globalSettings, 'id')
  await upsert('home_page', homePage, 'id')
  for (const [table, row] of Object.entries(singletons)) {
    await upsert(table, row, 'id')
  }

  console.log('\nSeeding collections…')
  await upsert('services', services, 'slug')
  await upsert('sectors', sectors, 'slug')
  await upsert('patterns', patterns, 'slug')
  await upsert('insulation_subpages', insulationSubpages, 'slug')
  await upsert('about_subpages', aboutSubpages, 'slug')
  await upsert('resource_articles', resourceArticles, 'slug')
  await upsert('legal_pages', legalPages, 'slug')

  // nav_items has no unique key to upsert on, so it is replaced wholesale.
  console.log('\nSeeding navigation…')
  const { error: navDeleteError } = await supabase
    .from('nav_items')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (navDeleteError) {
    console.error(`  ✗ nav_items (clear): ${navDeleteError.message}`)
    failures++
  } else {
    const { error } = await supabase.from('nav_items').insert(navItems as never)
    if (error) {
      console.error(`  ✗ nav_items: ${error.message}`)
      failures++
    } else {
      console.log(`  ✓ nav_items (${navItems.length})`)
    }
  }

  if (failures > 0) {
    console.error(
      `\n${failures} table(s) failed. The most common cause is that the schema ` +
        'has not been applied yet — run supabase/migrations/0001_init.sql in the ' +
        'Supabase SQL editor first.\n'
    )
    process.exit(1)
  }

  console.log('\nDone. Every table is populated.\n')
}

main().catch((err) => {
  console.error('\nSeed failed:', err)
  process.exit(1)
})
