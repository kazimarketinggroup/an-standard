'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { forwardRef, useEffect, useState, type ReactNode } from 'react'

/** True only after hydration, so SSR output stays visible without JS. */
function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

export const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  /** Render as a different element, e.g. "li" or "section". */
  as?: 'div' | 'section' | 'li' | 'span' | 'article'
}

/**
 * Fades content in as it scrolls into view, drifting from `direction`.
 * Collapses to a plain fade when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const offset = reduced ? OFFSET.none : OFFSET[direction]
  const MotionTag = motion[as]

  // Before hydration the content renders plainly visible, so a failed or slow
  // JS load can never leave a section stranded at opacity 0.
  if (!mounted) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Parent wrapper that staggers the entrance of `RevealItem` children.
 * Use when a group of sibling cards should cascade rather than land together.
 * Forwards a ref so callers can drive it as a scroll container (see Patterns).
 */
export const RevealGroup = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode
    className?: string
    stagger?: number
    delay?: number
  }
>(function RevealGroup({ children, className, stagger = 0.09, delay = 0 }, ref) {
  const mounted = useMounted()

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  if (!mounted) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  )
})

export function RevealItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: Direction
}) {
  const reduced = useReducedMotion()
  const mounted = useMounted()
  const offset = reduced ? OFFSET.none : OFFSET[direction]

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
