'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../lib/site'
import { WhatsAppSolidIcon } from '../ui/Icons'

/** Pre-filled opener so the enquiry arrives with context already attached. */
const message = `Hi ${site.name}, I'd like to ask about your commission quilting.`
const href = `${site.whatsappHref}?text=${encodeURIComponent(message)}`

/**
 * Floating WhatsApp chat button, fixed to the bottom-right on every page.
 *
 * It stays hidden until the visitor has scrolled past roughly the first
 * viewport so it never competes with the hero's own calls to action, then
 * fades in and rides along for the rest of the page.
 */
export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with us on WhatsApp — ${site.whatsapp}`}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center
                     rounded-full bg-[#25D366] text-white shadow-lift
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-[#25D366] sm:bottom-6 sm:right-6"
        >
          {/* Slow pulse ring — decorative, so it stays out of the a11y tree. */}
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20
                       [animation-duration:2.5s]"
          />
          <WhatsAppSolidIcon className="relative h-7 w-7" />

          {/* Label unfurls on hover where there is a pointer to hover with. */}
          <span
            className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap
                       rounded-lg bg-brand-ink px-3 py-2 text-xs font-medium text-white opacity-0
                       shadow-lift transition-opacity duration-200 group-hover:opacity-100 lg:block"
          >
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
