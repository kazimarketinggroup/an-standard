import Link from 'next/link'
import { adminNav } from '@/lib/cms/admin-nav'

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-lg font-semibold">Website content</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Choose a section to edit. Changes go live as soon as you save.
      </p>

      <div className="mt-6 space-y-5">
        {adminNav.map((section) => (
          <section key={section.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {section.title}
            </h2>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {section.entries.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="block rounded-lg bg-white px-4 py-3 text-sm shadow-sm
                               ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50"
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
