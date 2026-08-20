import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFab from '@/components/layout/WhatsAppFab'

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
