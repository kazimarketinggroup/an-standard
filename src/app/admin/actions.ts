'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import {
  collectionMeta,
  isCollectionKey,
  isSingletonKey,
  type CollectionKey,
} from '@/lib/cms/admin-nav'
import { collectionSchema, fieldsOf, singletonSchema, emptyValue } from '@/lib/cms/schema'

/**
 * Every write the admin performs.
 *
 * Each action re-checks the session with the anon client before touching data
 * with the service-role client, because the service-role key bypasses RLS —
 * middleware alone is not a sufficient guard for a mutation.
 */

export type ActionResult = { ok: true } | { ok: false; error: string }

async function requireAdmin(): Promise<string | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user ? null : 'You are not signed in. Reload the page and sign in again.'
}

/** Revalidates the public site so a save is visible immediately. */
function revalidateSite() {
  revalidatePath('/', 'layout')
}

/** Keeps only the columns the schema declares, so no stray keys reach the DB. */
function pickSchemaFields(
  table: string,
  input: Record<string, unknown>
): Record<string, unknown> {
  const groups = isCollectionKey(table)
    ? collectionSchema[table]
    : isSingletonKey(table)
      ? singletonSchema[table]
      : null

  if (!groups) return {}

  const allowed = new Set(fieldsOf(groups).map((f) => f.name))
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input)) {
    if (allowed.has(key)) out[key] = value
  }
  return out
}

export async function saveSingleton(
  table: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  if (!isSingletonKey(table)) return { ok: false, error: 'Unknown page.' }

  const payload = pickSchemaFields(table, values)
  const supabase = createAdminClient()
  const { error } = await supabase
    .from(table)
    .upsert({ id: 1, ...payload }, { onConflict: 'id' })

  if (error) return { ok: false, error: error.message }

  revalidateSite()
  return { ok: true }
}

export async function saveCollectionItem(
  table: string,
  id: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  if (!isCollectionKey(table)) return { ok: false, error: 'Unknown section.' }

  const payload = pickSchemaFields(table, values)

  if ('slug' in payload) {
    const slug = String(payload.slug ?? '').trim()
    if (!slug) return { ok: false, error: 'URL slug cannot be empty.' }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return {
        ok: false,
        error: 'URL slug can only contain lowercase letters, numbers and hyphens.',
      }
    }
    payload.slug = slug
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from(table).update(payload).eq('id', id)

  if (error) {
    if (error.code === '23505') {
      return { ok: false, error: 'That URL slug is already used by another page.' }
    }
    return { ok: false, error: error.message }
  }

  revalidateSite()
  return { ok: true }
}

export async function createCollectionItem(
  table: string,
  title: string,
  slug: string
): Promise<ActionResult & { id?: string }> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  if (!isCollectionKey(table)) return { ok: false, error: 'Unknown section.' }
  if (!collectionMeta[table as CollectionKey].canCreate) {
    return { ok: false, error: 'Pages cannot be added to this section.' }
  }

  const cleanTitle = title.trim()
  const cleanSlug = slug.trim().toLowerCase()

  if (!cleanTitle) return { ok: false, error: 'Enter a title.' }
  if (!/^[a-z0-9-]+$/.test(cleanSlug)) {
    return {
      ok: false,
      error: 'URL slug can only contain lowercase letters, numbers and hyphens.',
    }
  }

  // Start from schema defaults so no NOT NULL column is missed.
  const row: Record<string, unknown> = {}
  for (const field of fieldsOf(collectionSchema[table])) {
    row[field.name] = emptyValue(field.type)
  }
  row.title = cleanTitle
  row.slug = cleanSlug

  // Append to the end of the list.
  const supabase = createAdminClient()
  const { data: last } = await supabase
    .from(table)
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()
  row.sort_order = ((last?.sort_order as number | undefined) ?? 0) + 1

  const { data, error } = await supabase.from(table).insert(row).select('id').single()

  if (error) {
    if (error.code === '23505') return { ok: false, error: 'That URL slug is already in use.' }
    return { ok: false, error: error.message }
  }

  revalidateSite()
  return { ok: true, id: data.id as string }
}

export async function deleteCollectionItem(
  table: string,
  id: string
): Promise<ActionResult> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  if (!isCollectionKey(table)) return { ok: false, error: 'Unknown section.' }
  if (!collectionMeta[table as CollectionKey].canCreate) {
    return { ok: false, error: 'Pages cannot be deleted from this section.' }
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from(table).delete().eq('id', id)

  if (error) return { ok: false, error: error.message }

  revalidateSite()
  return { ok: true }
}

export async function reorderCollection(
  table: string,
  orderedIds: string[]
): Promise<ActionResult> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  if (!isCollectionKey(table)) return { ok: false, error: 'Unknown section.' }

  const supabase = createAdminClient()
  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabase
      .from(table)
      .update({ sort_order: i + 1 })
      .eq('id', orderedIds[i])
    if (error) return { ok: false, error: error.message }
  }

  revalidateSite()
  return { ok: true }
}

/* --- navigation --- */

export async function saveNavItems(
  group: string,
  items: { label: string; url: string }[]
): Promise<ActionResult> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  const supabase = createAdminClient()

  const { error: clearError } = await supabase.from('nav_items').delete().eq('group_key', group)
  if (clearError) return { ok: false, error: clearError.message }

  const rows = items
    .filter((item) => item.label.trim() && item.url.trim())
    .map((item, i) => ({
      label: item.label.trim(),
      url: item.url.trim(),
      sort_order: i + 1,
      group_key: group,
    }))

  if (rows.length > 0) {
    const { error } = await supabase.from('nav_items').insert(rows)
    if (error) return { ok: false, error: error.message }
  }

  revalidateSite()
  return { ok: true }
}

/* --- images --- */

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml']

export async function uploadImage(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const denied = await requireAdmin()
  if (denied) return { ok: false, error: denied }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Choose a file to upload.' }
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: 'That image is larger than 8MB. Please compress it first.' }
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: 'Images must be PNG, JPEG, WebP, AVIF or SVG.' }
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : 'png'
  const safeName = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
  const path = `${Date.now()}-${safeName || 'image'}.${extension}`

  const supabase = createAdminClient()
  const { error } = await supabase.storage
    .from('site-images')
    .upload(path, file, { contentType: file.type, upsert: false })

  if (error) return { ok: false, error: error.message }

  const {
    data: { publicUrl },
  } = supabase.storage.from('site-images').getPublicUrl(path)

  return { ok: true, url: publicUrl }
}
