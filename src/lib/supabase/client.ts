'use client'

import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from './env'

/**
 * Browser client, used by the admin login form and by any client component
 * that needs the current session. Carries only the anon key.
 */
export function createClient() {
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_PUBLIC_KEY
  )
}
