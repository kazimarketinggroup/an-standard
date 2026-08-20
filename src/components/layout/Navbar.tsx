'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, site } from '../../lib/site'
import { processLink, services, servicesMenuImage } from '../../lib/services'
import { insulationItems, insulationMenuImage } from '../../lib/insulation'
import { sectors } from '../../lib/sectors'
import { patterns, patternsMenuImage } from '../../lib/patterns'
import { cn } from '../../lib/utils'
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'
import MegaMenu from './MegaMenu'

/**
 * Sub-items shown nested under a top-level link in the mobile drawer, mirroring
 * the desktop mega menus. Keyed by href so adding a menu here and above stays
 * a single edit rather than two that can drift apart.
 */
const drawerSubItems: Record<string, { href: string; title: string }[]> = {
  '/services': [...services, processLink].map((s) => ({ href: s.href, title: s.title })),
  '/quilted-insulation': insulationItems.map((i) => ({ href: i.href, title: i.title })),
  '/sectors': sectors.map((s) => ({ href: s.href, title: s.name })),
  '/patterns': patterns.map((p) => ({ href: `/patterns/${p.slug}`, title: p.menuTitle })),
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      {/*
       * Utility bar. From lg up it keeps its original shape: strapline hard
       * left, the two contact links paired together on the right. Below lg the
       * strapline drops away and the links spread across the full width, which
       * is the only way both fit on a phone.
       */}
      <div className="bg-brand-navy text-white">
        <div className="container flex h-9 items-center justify-between gap-3 text-[11px] sm:text-xs">
          <p className="hidden text-white/80 lg:block">Textile Manufacturers</p>
          <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:justify-end lg:gap-6">
            <a
              href={site.emailHref}
              className="flex min-w-0 items-center gap-1.5 text-white/85 transition-colors
                         hover:text-white sm:gap-2"
            >
              <MailIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{site.email}</span>
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-1.5 text-white/85 transition-colors
                         hover:text-white sm:gap-2"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 text-[#25D366]" />
              {site.whatsapp.replace(/\s/g, '')}
            </a>
          </div>
        </div>
      </div>

      {/* `relative` anchors the full-width Services dropdown to this bar. */}
      <div
        className={cn(
          'relative border-b border-black/5 bg-white/95 backdrop-blur transition-shadow duration-300',
          scrolled && 'shadow-card'
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="relative z-10 shrink-0" aria-label={site.name}>
            <Image
              src="/images/home/mainLogo.png"
              alt={site.name}
              width={400}
              height={78}
              priority
              className="h-8 w-auto lg:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-7 xl:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

              if (link.href === '/services') {
                return (
                  <MegaMenu
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    isActive={isActive}
                    items={[...services, processLink]}
                    image={servicesMenuImage}
                  />
                )
              }

              if (link.href === '/quilted-insulation') {
                return (
                  <MegaMenu
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    isActive={isActive}
                    items={insulationItems}
                    image={insulationMenuImage}
                  />
                )
              }

              if (link.href === '/patterns') {
                return (
                  <MegaMenu
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    isActive={isActive}
                    items={patterns.map((pattern) => ({
                      title: pattern.menuTitle,
                      tagline: pattern.tagline,
                      href: `/patterns/${pattern.slug}`,
                      thumbnail: pattern.image,
                    }))}
                    image={patternsMenuImage}
                  />
                )
              }

              if (link.href === '/sectors') {
                return (
                  <MegaMenu
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    isActive={isActive}
                    // Nine sectors run across three columns, so no picture column.
                    items={sectors.map((sector) => ({
                      title: sector.name,
                      tagline: sector.tagline,
                      href: sector.href,
                      icon: sector.icon,
                    }))}
                  />
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative text-sm transition-colors hover:text-brand-red',
                    'after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-brand-red',
                    'after:transition-all after:duration-300 hover:after:w-full',
                    isActive
                      ? 'font-semibold text-brand-ink after:w-full'
                      : 'text-brand-ink/80 after:w-0'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium
                         text-brand-navy transition-colors hover:text-brand-red sm:gap-2 sm:text-sm"
            >
              <PhoneIcon className="h-3.5 w-3.5 text-brand-red sm:h-4 sm:w-4" />
              <span className="truncate">{site.phone}</span>
            </a>
            <Link href="/quote" className="btn-primary hidden px-4 py-2.5 text-xs sm:inline-flex">
              Request A Quote
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative z-10 rounded-md border border-brand-ink/10 p-2 text-brand-ink
                         transition-colors hover:bg-brand-ink/5 xl:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 top-0 z-0 bg-brand-ink/40 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="drawer"
              className="absolute inset-x-0 top-full z-10 origin-top border-b border-black/5
                         bg-white shadow-lift xl:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-md px-3 py-3 text-sm font-medium text-brand-ink
                                 transition-colors hover:bg-brand-cream hover:text-brand-red"
                    >
                      {link.label}
                    </Link>

                    {/* Sub-items are nested inline — there is no hover on touch. */}
                    {drawerSubItems[link.href] && (
                      <ul className="mb-1 ml-3 border-l border-black/8 pl-3">
                        {drawerSubItems[link.href].map((item) => (
                          <li key={item.href + item.title}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-md px-3 py-2 text-[13px] text-brand-muted
                                         transition-colors hover:bg-brand-cream hover:text-brand-red"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}

                <div className="mt-3 flex flex-col gap-3 border-t border-black/5 pt-4">
                  <a href={site.phoneHref} className="flex items-center gap-2 px-3 text-sm text-brand-navy">
                    <PhoneIcon className="h-4 w-4 text-brand-red" />
                    {site.phone}
                  </a>
                  <a href={site.emailHref} className="flex items-center gap-2 px-3 text-sm text-brand-muted">
                    <MailIcon className="h-4 w-4 text-brand-red" />
                    {site.email}
                  </a>
                  <Link href="/quote" onClick={() => setOpen(false)} className="btn-primary w-full">
                    Request A Quote
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
