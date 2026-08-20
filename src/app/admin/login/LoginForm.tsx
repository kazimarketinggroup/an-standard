'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      // Supabase returns the same message for a wrong password and an unknown
      // address, which is the behaviour we want — don't reveal which it was.
      setError('That email address and password did not match.')
      setBusy(false)
      return
    }

    const next = searchParams.get('next')
    // Only accept internal paths, so ?next= cannot redirect off-site.
    const target = next && next.startsWith('/admin') ? next : '/admin'

    router.replace(target)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm
                     outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm
                     outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white
                   transition-colors hover:bg-neutral-700 disabled:opacity-60"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
