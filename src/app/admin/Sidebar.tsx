'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { adminNav } from '@/lib/cms/admin-nav'
import { createClient } from '@/lib/supabase/client'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // The login screen is full-bleed and has no navigation.
  if (pathname === '/admin/login') return null

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile bar */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="text-sm font-semibold">
          Website content
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <aside
        className={`${open ? 'block' : 'hidden'} border-b border-neutral-200 bg-white
                    lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col
                    lg:overflow-y-auto lg:border-b-0 lg:border-r`}
      >
        <div className="hidden px-5 py-5 lg:block">
          <Link href="/admin" className="block">
            <p className="text-sm font-semibold leading-tight">A.N. Standard Ltd.</p>
            <p className="mt-0.5 text-xs text-neutral-500">Website content</p>
          </Link>
        </div>

        <nav className="flex-1 px-3 pb-4">
          {adminNav.map((section) => (
            <div key={section.title} className="mb-5">
              <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.entries.map((entry) => {
                  const active =
                    entry.href === '/admin'
                      ? pathname === '/admin'
                      : pathname === entry.href || pathname.startsWith(`${entry.href}/`)

                  return (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                          active
                            ? 'bg-neutral-900 font-medium text-white'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-neutral-200 px-5 py-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-neutral-600 hover:text-neutral-900"
          >
            View website ↗
          </a>
          <button
            type="button"
            onClick={signOut}
            className="mt-3 text-sm text-neutral-600 hover:text-neutral-900"
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
