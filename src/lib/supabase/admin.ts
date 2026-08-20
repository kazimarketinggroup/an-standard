import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from './env'

/**
 * Cookie-free Supabase clients.
 *
 * Deliberately separate from server.ts: that module imports `next/headers`,
 * which Next refuses to bundle once anything in the import graph is a Client
 * Component. Server Actions are imported *by* client components, so they must
 * reach Supabase through this module instead.
 */

/**
 * Anonymous read-only client for public pages. No cookies, so pages using it
 * stay cacheable; RLS still limits it to the public read policies.
 */
export function createPublicClient() {
  return createSupabaseClient(
    SUPABASE_URL,
    SUPABASE_PUBLIC_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}

/**
 * Service-role client. Bypasses RLS, so it must only ever run server-side —
 * never import this from a client component.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  }

  return createSupabaseClient(SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
