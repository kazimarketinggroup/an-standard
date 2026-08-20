import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import QuoteCta from '@/components/layout/QuoteCta'
import PatternSwatch from '@/components/patterns/PatternSwatch'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { patterns } from '@/lib/patterns'

export const metadata: Metadata = {
  title: 'Quilting Patterns — A.N. Standard Ltd.',
  description:
    'Box, diamond, wavy, vertical, hourglass and bespoke quilting patterns. Every pattern below is running on our machines now.',
}

export default function PatternsPage() {
  return (
    <>
      {/* Hero: centred copy over a darkened quilted photo. */}
      <section className="relative isolate overflow-hidden bg-brand-ink">
        <Image
          src="/images/home/Rectangle 29.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-brand-ink/80" />
        {/* Faint cross-hatch, echoing a stitch grid. */}
        <div className="pattern-stripes absolute inset-0" />

        {/* Matches the 600px hero height used by PageHero and the home hero. */}
        <div className="container relative flex min-h-[600px] flex-col items-center justify-center py-14 text-center lg:py-16">
          <h1 className="hero-rise text-3xl font-semibold leading-[1.15] text-white sm:text-4xl lg:text-[44px]">
            Quilting Patterns
          </h1>

          <p
            className="hero-rise mt-5 max-w-xl text-sm leading-relaxed text-white/70"
            style={{ animationDelay: '0.15s' }}
          >
            Every pattern below is running on our machines now. Which one suits your product depends
            mostly on wadding weight — the heavier the wadding, the larger the pattern needs to be.
            Send us your specification and we’ll advise.
          </p>

          <div className="hero-rise mt-8" style={{ animationDelay: '0.25s' }}>
            <Link href="/quote" className="btn-primary">
              Request A Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-[#F2F2F3]">
        <div className="container">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {patterns.map((pattern) => (
              <RevealItem key={pattern.slug}>
                <Link
                  href={`/patterns/${pattern.slug}`}
                  className="group block h-full overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-card"
                >
                  <PatternSwatch kind={pattern.kind} className="h-[200px] w-full sm:h-[220px]" />

                  <div className="p-6 sm:p-7">
                    <h2 className="text-lg font-semibold transition-colors group-hover:text-brand-red sm:text-xl">
                      {pattern.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">
                      {pattern.sizes}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">
                      {pattern.body}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <QuoteCta />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
