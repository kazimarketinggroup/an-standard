import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFab from '@/components/layout/WhatsAppFab'

/**
 * Public pages are statically rendered and served from cache, which is what
 * keeps them fast. Saving in the admin calls revalidatePath('/', 'layout') so a
 * change appears immediately; this window is the backstop for anything that
 * misses — a row edited directly in Supabase, or a revalidation that failed.
 */
export const revalidate = 300

/** Marketing chrome. Unchanged from the previous root layout. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
