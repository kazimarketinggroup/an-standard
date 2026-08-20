'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../motion/Reveal'
import { cn } from '../../lib/utils'

export type Step = { title: string; body: string }

/**
 * Vertical step list with a panel that swaps as each step is selected.
 * Mirrors the Sectors tab pattern on the home page: click or hover to change,
 * and the panel is the only thing that animates.
 */
export default function StepTabs({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const current = steps[active]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-8">
      <ul className="flex flex-col gap-2" role="tablist" aria-label="Pattern process steps">
        {steps.map((step, i) => {
          const isActive = i === active

          return (
            <li key={step.title}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-brand-navy to-[#1E5AA8] text-white shadow-card'
                    : 'bg-[#F2F2F3] text-brand-ink hover:bg-brand-ink/5'
                )}
              >
                {step.title}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="rounded-xl bg-gradient-to-b from-[#E8EEF7] to-[#DCE6F3] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h3 className="text-lg font-semibold text-brand-ink sm:text-xl">{current.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-ink/70">{current.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
