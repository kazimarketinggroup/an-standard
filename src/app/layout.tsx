import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../globals.css'

/**
 * Poppins is self-hosted from public/fonts rather than pulled through
 * next/font/google: the Google Fonts fetch runs at build time, and a network
 * that cannot reach fonts.gstatic.com fails the whole build. These are the same
 * woff2 files Google serves, so the rendered result is unchanged.
 */
const poppins = localFont({
  src: [
    { path: '../../public/fonts/poppins-300-latin.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/poppins-400-latin.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/poppins-500-latin.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/poppins-600-latin.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/poppins-700-latin.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-poppins',
  fallback: ['system-ui', 'sans-serif'],
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
