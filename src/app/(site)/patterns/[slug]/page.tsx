import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuoteCta from '@/components/layout/QuoteCta'
import PatternSwatch from '@/components/patterns/PatternSwatch'
import Reveal from '@/components/motion/Reveal'
import { patterns } from '@/lib/patterns'

type Params = { params: { slug: string } }

/** One static page per pattern, so the whole set prerenders. */
export function generateStaticParams() {
  return patterns.map((pattern) => ({ slug: pattern.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const pattern = patterns.find((p) => p.slug === params.slug)
  if (!pattern) return {}

  return {
    title: `${pattern.title} — A.N. Standard Ltd.`,
    description: pattern.body,
  }
}

export default function PatternDetailPage({ params }: Params) {
  const pattern = patterns.find((p) => p.slug === params.slug)
  if (!pattern) notFound()

  const others = patterns.filter((p) => p.slug !== pattern.slug)

  return (
    <>
      {/*
       * Hero: the pattern's own geometry, tiled pale behind the title, so the
       * page opens on the thing it is describing.
       */}
      <section className="relative isolate overflow-hidden bg-brand-cream">
        <PatternSwatch
          kind={pattern.kind}
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div className="absolute inset-0 bg-brand-cream/55" />

        {/* Matches the 600px hero height used by PageHero and the home hero. */}
        <div className="container relative flex min-h-[600px] flex-col items-center justify-center py-14 text-center lg:py-16">
          <h1 className="hero-rise text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[40px]">
            {pattern.title}
          </h1>

          <p
            className="hero-rise mt-4 max-w-xl text-sm leading-relaxed text-brand-muted"
            style={{ animationDelay: '0.15s' }}
          >
            {pattern.body}
          </p>

          <div className="hero-rise mt-7" style={{ animationDelay: '0.25s' }}>
            <Link href="/quote" className="btn-primary">
              Request A Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-semibold leading-[1.2] sm:text-[32px]">
              About This Pattern
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 space-y-4">
              <Reveal delay={0.06}>
                <p className="text-sm leading-relaxed text-brand-muted">{pattern.sizes}</p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-sm leading-relaxed text-brand-muted">{pattern.detail}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Pattern choice is mostly a question of wadding weight. A tight grid holds a light
                  filling flat and crisp; the same grid on a heavy filling crushes the loft you have
                  paid for. We set the scale against the filling and the finished product, not
                  against the drawing on its own.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Every pattern runs on multi-needle lock stitch machines at up to 2400mm wide, with
                  thread matched to your fabric or deliberately contrasted where the stitch is part
                  of the design. Settings are held on file under your name so a repeat order comes
                  off the machine the same way.
                </p>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="rounded-xl bg-[#F1F2F4] p-6 sm:p-8">
                <h3 className="text-base font-semibold">Specification</h3>

                <dl className="mt-4">
                  {[
                    { label: 'Sizes', value: pattern.sizes },
                    { label: 'Suitable wadding', value: pattern.wadding },
                    { label: 'Maximum width', value: '2400mm' },
                    { label: 'Thread', value: 'Matching or contrasting' },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-6 border-b border-brand-ink/10
                                 py-4 first:pt-0 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm font-semibold text-brand-ink">{row.label}</dt>
                      <dd className="text-right text-sm text-brand-muted">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 text-xs leading-relaxed text-brand-muted">
                  Wadding guidance is a starting point, not a rule — we’ll quilt a sample panel
                  before you commit to a run.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Sampling: fabric photo left, copy and checklist right. */}
          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
            <Reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={pattern.image}
                  alt={`${pattern.title} on finished fabric`}
                  fill
                  sizes="(min-width: 1024px) 340px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                  We sample before we run
                </h2>

                <p className="mt-5 text-sm leading-relaxed text-brand-muted">
                  Most pattern problems show up on a sample panel and cost almost nothing to fix
                  there. Found mid-run, they cost a production quantity of fabric.
                </p>

                <ul className="mt-5 space-y-2">
                  {[
                    'Scale checked against your wadding weight',
                    'Repeat checked across the full roll width',
                    'Thread and tension matched to your fabric',
                    'Panel quilted for you to handle before production',
                  ].map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-sm leading-relaxed text-brand-muted
                                 before:absolute before:left-0 before:top-[0.6em] before:h-1
                                 before:w-1 before:rounded-full before:bg-brand-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/process" className="btn-primary mt-7">
                  Learn about our process
                </Link>

                <p className="mt-7 border-t border-brand-ink/10 pt-7 text-sm leading-relaxed text-brand-ink">
                  Send a drawing, a photograph or a sample — our computerised machines are not
                  limited to the pattern book.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Other patterns: photo cards, scrollable on narrow screens. */}
          <div className="mt-14">
            <Reveal>
              <h2 className="text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                Other patterns
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="no-scrollbar -mx-4 mt-6 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/patterns/${other.slug}`}
                    className="group relative block w-[160px] shrink-0 overflow-hidden rounded-lg sm:w-[185px]"
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        sizes="185px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Keeps the caption readable over busy patterned fabric. */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <h3 className="absolute inset-x-0 bottom-0 p-4 text-[13px] font-medium leading-snug text-white">
                        {other.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
