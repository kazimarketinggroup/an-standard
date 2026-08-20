'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../motion/Reveal'
import { cn } from '../../lib/utils'

export type MegaMenuItem = {
  title: string
  tagline: string
  href: string
  /** Most menus lead with an icon; pattern items use a fabric thumbnail instead. */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  thumbnail?: string
}

type MegaMenuProps = {
  label: string
  href: string
  isActive: boolean
  items: MegaMenuItem[]
  /** Omit to run the items across three columns instead of two plus a picture. */
  image?: { src: string; alt: string }
}

/**
 * Full-width navbar dropdown shared by "Services" and "Quilted Insulation".
 * Opens on hover for mouse users and on focus for keyboard users; a short
 * close delay lets the pointer travel from the trigger into the panel.
 */
export default function MegaMenu({ label, href, isActive, items, image }: MegaMenuProps) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>()
  const wrapRef = useRef<HTMLDivElement>(null)

  const show = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const hide = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  // Escape closes; focus leaving the group closes.
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onFocusIn = (e: FocusEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [open])

  // Two balanced columns beside the picture, or three across when there isn't one.
  const columnCount = image ? 2 : 3
  const perColumn = Math.ceil(items.length / columnCount)
  const columns = Array.from({ length: columnCount }, (_, i) =>
    items.slice(i * perColumn, (i + 1) * perColumn)
  )

  return (
    <div ref={wrapRef} onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href={href}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={show}
        className={cn(
          'relative whitespace-nowrap text-sm transition-colors hover:text-brand-red',
          'after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-brand-red',
          'after:transition-all after:duration-300 hover:after:w-full',
          isActive ? 'font-semibold text-brand-ink after:w-full' : 'text-brand-ink/80 after:w-0'
        )}
      >
        {label}
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-black/5 bg-brand-cream shadow-lift"
          >
            <div className="container py-5">
              <p className="text-xs text-brand-muted">{label}</p>

              <div
                className={cn(
                  'mt-2.5 grid gap-x-10',
                  image ? 'lg:grid-cols-[1fr_1fr_minmax(0,300px)]' : 'lg:grid-cols-3'
                )}
              >
                {columns.map((column, colIndex) => (
                  <ul key={colIndex}>
                    {column.map((item) => {
                      const Icon = item.icon

                      return (
                        // Keyed on title: pattern items all share one href.
                        <li key={item.title} className="border-b border-black/8 last:border-0">
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-start gap-3 py-2.5 transition-colors"
                          >
                            {item.thumbnail ? (
                              <span className="relative mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded">
                                <Image
                                  src={item.thumbnail}
                                  alt=""
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              </span>
                            ) : (
                              Icon && (
                                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink/70 transition-colors group-hover:text-brand-red" />
                              )
                            )}
                            <span>
                              <span className="block text-sm font-medium text-brand-ink transition-colors group-hover:text-brand-red">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block text-[13px] text-brand-muted">
                                {item.tagline}
                              </span>
                            </span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                ))}

                {/* Stretches to the list height rather than dictating its own. */}
                {image && (
                  <div className="relative hidden overflow-hidden rounded-lg lg:block">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
