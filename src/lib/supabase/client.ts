'use client'

import { createBrowserClient } from '@supabase/ssr'

/**
 * Browser client, used by the admin login form and by any client component
 * that needs the current session. Carries only the anon key.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
