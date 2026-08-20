import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginForm from './LoginForm'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export const metadata: Metadata = {
  title: 'Sign in — A.N. Standard Ltd.',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-xl font-semibold text-neutral-900">
          A.N. Standard Ltd.
        </h1>
        <p className="mt-1 text-center text-sm text-neutral-500">Website content editor</p>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
          {configured ? (
            // LoginForm reads ?next= via useSearchParams, which opts the whole
            // page into client rendering unless it sits behind a boundary.
            <Suspense fallback={<div className="h-[232px]" />}>
              <LoginForm />
            </Suspense>
          ) : (
            <div className="text-sm leading-relaxed text-neutral-600">
              <p className="font-medium text-neutral-900">Not configured yet</p>
              <p className="mt-2">
                Add <code className="rounded bg-neutral-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
                and{' '}
                <code className="rounded bg-neutral-100 px-1">
                  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
                </code>{' '}
                to <code className="rounded bg-neutral-100 px-1">.env.local</code>, then restart
                the server.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
