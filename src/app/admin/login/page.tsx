import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign in — A.N. Standard Ltd.',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-xl font-semibold text-neutral-900">
          A.N. Standard Ltd.
        </h1>
        <p className="mt-1 text-center text-sm text-neutral-500">Website content editor</p>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200">
          {configured ? (
            <LoginForm />
          ) : (
            <div className="text-sm leading-relaxed text-neutral-600">
              <p className="font-medium text-neutral-900">Not configured yet</p>
              <p className="mt-2">
                Add <code className="rounded bg-neutral-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
                and{' '}
                <code className="rounded bg-neutral-100 px-1">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY
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
