import type { Metadata } from 'next'
import Sidebar from './Sidebar'

export const metadata: Metadata = {
  title: 'Content editor — A.N. Standard Ltd.',
  robots: { index: false, follow: false },
}

/**
 * The admin shell. The login page renders its own full-screen layout, so the
 * sidebar is not rendered there — Sidebar returns null on that route.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <Sidebar />
      <div className="lg:pl-64">{children}</div>
    </div>
  )
}
