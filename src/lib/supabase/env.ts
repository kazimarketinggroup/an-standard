/**
 * Supabase public credentials.
 *
 * Supabase renamed the browser-safe key from "anon" to "publishable", and
 * projects are issued one or the other depending on when they were created.
 * Both names are accepted here so the app works with either.
 *
 * Each variable is referenced by its literal name rather than looked up
 * dynamically: Next.js inlines NEXT_PUBLIC_* at build time by matching the
 * source text, so `process.env[someVariable]` would come back undefined in the
 * browser bundle.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''

export const SUPABASE_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  ''

/** False until both are set, which the callers use to fail soft. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL) && Boolean(SUPABASE_PUBLIC_KEY)
