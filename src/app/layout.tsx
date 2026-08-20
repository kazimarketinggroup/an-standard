import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'A.N. Standard Ltd. — Commission Quilters Since 1975',
  description:
    'Family-run commission quilters in the West Midlands. Multi-needle lock stitch quilting up to 2400mm wide, UK-sourced wadding held in stock.',
}

/**
 * Only the document shell. The marketing header and footer live in the (site)
 * layout so the admin dashboard can render without them.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  )
}
