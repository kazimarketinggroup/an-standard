import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuoteCta from '@/components/layout/QuoteCta'
import PatternSwatch from '@/components/patterns/PatternSwatch'
import Reveal from '@/components/motion/Reveal'
import { getPattern, getPatterns } from '@/lib/cms/queries'
import { imageSrc, list, stringList, text } from '@/lib/cms/fallbacks'
import type { PatternKind } from '@/components/patterns/PatternSwatch'

type Params = { params: { slug: string } }

/** One static page per pattern, so the whole set prerenders. */
export async function generateStaticParams() {
  const patterns = await getPatterns()
  return patterns.map((pattern) => ({ slug: pattern.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const pattern = await getPattern(params.slug)
  if (!pattern) return {}

  return {
    title: text(pattern.meta_title, `${pattern.title} — A.N. Standard Ltd.`),
    description: text(pattern.meta_description, pattern.listing_teaser),
  }
}

export default async function PatternDetailPage({ params }: Params) {
  const [pattern, allPatterns] = await Promise.all([getPattern(params.slug), getPatterns()])
  if (!pattern) notFound()

  const others = allPatterns.filter((p) => p.slug !== pattern.slug)
  const specs = list(pattern.specs)
  const sampleList = stringList(pattern.sample_list)
  const patternImage = imageSrc(pattern.pattern_image)

  return (
    <>
      {/*
       * Hero: the pattern's own geometry, tiled pale behind the title, so the
       * page opens on the thing it is describing.
       */}
      <section className="relative isolate overflow-hidden bg-brand-cream">
        <PatternSwatch
          kind={(pattern.kind || 'box') as PatternKind}
          className="absolute inset-0 h-full w-full opacity-40"
        />
        <div className="absolute inset-0 bg-brand-cream/55" />

        {/* Matches the 600px hero height used by PageHero and the home hero. */}
        <div className="container relative flex min-h-[600px] flex-col items-center justify-center py-14 text-center lg:py-16">
          <h1 className="hero-rise text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-[40px]">
            {text(pattern.hero_title, pattern.title)}
          </h1>

          <p
            className="hero-rise mt-4 max-w-xl text-sm leading-relaxed text-brand-muted"
            style={{ animationDelay: '0.15s' }}
          >
            {text(pattern.hero_subtitle, pattern.listing_teaser)}
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
              {text(pattern.about_heading, 'About This Pattern')}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 space-y-4">
              {stringList(pattern.about_paragraphs).map((paragraph, i) => (
                <Reveal key={i} delay={0.06 + i * 0.06}>
                  <p className="text-sm leading-relaxed text-brand-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="rounded-xl bg-[#F1F2F4] p-6 sm:p-8">
                <h3 className="text-base font-semibold">Specification</h3>

                <dl className="mt-4">
                  {specs.map((row) => (
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
                  {text(
                    pattern.spec_note,
                    'Wadding guidance is a starting point, not a rule — we’ll quilt a sample panel before you commit to a run.'
                  )}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Sampling: fabric photo left, copy and checklist right. */}
          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
            {patternImage && (
              <Reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={patternImage}
                    alt={text(pattern.pattern_image_alt, `${pattern.title} on finished fabric`)}
                    fill
                    sizes="(min-width: 1024px) 340px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}

            <Reveal direction="left" delay={0.1}>
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                  {text(pattern.sample_heading, 'We sample before we run')}
                </h2>

                <p className="mt-5 text-sm leading-relaxed text-brand-muted">
                  {text(
                    pattern.sample_intro,
                    'Most pattern problems show up on a sample panel and cost almost nothing to fix there. Found mid-run, they cost a production quantity of fabric.'
                  )}
                </p>

                <ul className="mt-5 space-y-2">
                  {(sampleList.length
                    ? sampleList
                    : [
                        'Scale checked against your wadding weight',
                        'Repeat checked across the full roll width',
                        'Thread and tension matched to your fabric',
                        'Panel quilted for you to handle before production',
                      ]
                  ).map((item) => (
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
                  {text(
                    pattern.footer_note,
                    'Send a drawing, a photograph or a sample — our computerised machines are not limited to the pattern book.'
                  )}
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
                        src={other.pattern_image || '/images/home/Rectangle 32.png'}
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
