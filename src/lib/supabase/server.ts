import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

/**
 * Session-aware server client, for reading the signed-in admin.
 *
 * This module imports `next/headers`, so it can only be reached from code that
 * is never part of a Client Component's import graph. The cookie-free clients
 * live in ./admin for everything else.
 */
export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {
            // Called from a Server Component, where cookies are read-only.
            // Middleware refreshes the session instead, so this is safe.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch {
            // See above.
          }
        },
      },
    }
  )
}

export { createAdminClient, createPublicClient } from './admin'
