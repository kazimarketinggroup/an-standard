'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal, { EASE } from '../motion/Reveal'
import { cn } from '../../lib/utils'
import { sectors } from '../../lib/sectors'
import { ArrowUpRightIcon } from '../ui/Icons'

/** One image backs every tab — only the copy on the right changes. */
const PANEL_IMAGE =
  '/images/home/vecteezy_closeup-of-light-blue-fabric-with-textured-surface_69639386 1.png'

export default function Sectors() {
  const [active, setActive] = useState(0)
  const current = sectors[active]

  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-[2rem]">
            Nine industries, one factory
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">
            The right pattern depends on what the finished product has to do. A funeral supplier and
            an equestrian manufacturer are quilting for entirely different reasons, and we’ve been
            doing both for decades.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal direction="right">
            <ul className="flex flex-col gap-2" role="tablist" aria-label="Sectors we serve">
              {sectors.map((sector, i) => {
                const Icon = sector.icon
                const isActive = i === active

                return (
                  <li key={sector.name}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left transition-all duration-300',
                        isActive
                          ? 'border-transparent bg-gradient-to-r from-brand-red to-[#F2765C] text-white shadow-card'
                          : 'border-black/8 bg-white text-brand-ink hover:border-black/15 hover:bg-brand-cream'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 shrink-0 transition-colors',
                          isActive ? 'text-white' : 'text-brand-muted'
                        )}
                      />
                      <span className="flex-1 text-sm font-medium">{sector.name}</span>
                      <ArrowUpRightIcon
                        className={cn(
                          'h-4 w-4 shrink-0 transition-all duration-300',
                          isActive
                            ? 'text-white opacity-100'
                            : 'text-brand-muted opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100'
                        )}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="flex h-full flex-col rounded-xl bg-gradient-to-b from-[#FDE9E4] to-[#FBD9D1] p-6 sm:p-7">
              {/*
                Only the copy sits inside AnimatePresence — the image is a
                sibling, so it stays mounted and never reloads or flickers
                as tabs change.
              */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="min-h-[84px]"
                >
                  <h3 className="text-base font-semibold text-brand-ink sm:text-lg">
                    {current.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-brand-ink/70">
                    {current.blurb}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-4 flex-1 overflow-hidden rounded-lg">
                <Image
                  src={PANEL_IMAGE}
                  alt="Close-up of quilted fabric"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              <Link
                href={current.href}
                className="group mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-red"
              >
                Explore {current.name.toLowerCase()}
                <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
