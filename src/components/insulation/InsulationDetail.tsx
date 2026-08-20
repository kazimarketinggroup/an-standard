import Image from 'next/image'
import Link from 'next/link'
import PageHero from '../layout/PageHero'
import QuoteCta from '../layout/QuoteCta'
import Reveal from '../motion/Reveal'
import { insulationItems } from '../../lib/insulation'
import { cn } from '../../lib/utils'

type Spec = { label: string; value: string }

type PanelImage = { src: string; alt: string }

type InsulationDetailProps = {
  /** Route of the page being rendered, so it can drop itself from the sidebar. */
  currentHref: string
  title: string
  intro: string
  heroImage: string
  heroImageAlt: string
  /** Left column under the hero. */
  sectionTitle: string
  paragraphs: string[]
  specs: Spec[]
  /** Statement card under the intro: heading + body, plus an optional bullet list. */
  panel: {
    heading: string
    body: string[]
    list?: string[]
    /** Optional follow-on heading/body inside the same card, below a divider. */
    secondHeading?: string
    secondBody?: string[]
  }
  /**
   * Optional side-by-side comparison table, rendered between the two panels.
   * `columns` are the header cells; each row's `cells` must line up with them.
   */
  comparison?: {
    heading: string
    columns: string[]
    rows: { label: string; cells: string[] }[]
  }
  /**
   * Optional third block: a second heading/body/image trio, used by pages
   * that need one more idea after the main panel (e.g. "made on the same
   * machines" or "specifying against temperature").
   */
  secondPanel?: {
    heading: string
    body: string[]
    /**
     * Left-hand image, distinct from the main panel's image above it. Omit to
     * let the body copy run the full width of the column instead.
     */
    leftImage?: PanelImage
    /** Right-hand image. */
    image: PanelImage
    secondBody?: string[]
    secondHeading?: string
  }
}

/**
 * Shared shell for the four "Quilted Insulation" detail pages. Each page only
 * supplies its own words and images; the layout, spec table, and the
 * "More in quilted insulation" cross-links come from here so they can't drift
 * out of sync across pages.
 */
export default function InsulationDetail({
  currentHref,
  title,
  intro,
  heroImage,
  heroImageAlt,
  sectionTitle,
  paragraphs,
  specs,
  panel,
  comparison,
  secondPanel,
}: InsulationDetailProps) {
  const related = insulationItems.filter((item) => item.href !== currentHref)

  return (
    <>
      <PageHero
        align="left"
        variant="split"
        title={title}
        intro={intro}
        image={heroImage}
        imageAlt={heroImageAlt}
        actions={
          <>
            <Link href="/quote" className="btn-primary">
              Request A Quote
            </Link>
            <Link href="/patterns" className="btn-navy">
              See our patterns
            </Link>
          </>
        }
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <Reveal>
                <h2 className="max-w-md text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                  {sectionTitle}
                </h2>
              </Reveal>

              <div className="mt-6 space-y-4">
                {paragraphs.map((text, i) => (
                  <Reveal key={i} delay={0.06 + i * 0.06}>
                    <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
                  </Reveal>
                ))}
              </div>

              {/* Statement card: rule, heading and copy, sitting under the intro copy. */}
              <Reveal delay={0.1}>
                <div className="mt-8 rounded-xl border border-brand-ink/10 bg-white p-6 sm:p-8">
                  {/* Echoes the segmented rule on the Technical Specification page. */}
                  <div className="flex h-1.5 overflow-hidden rounded-full">
                    <div className="w-[30%] bg-brand-red/60" />
                    <div className="w-[25%] bg-brand-navy/45" />
                    <div className="flex-1 bg-brand-ink/12" />
                  </div>

                  <h2 className="mt-6 max-w-sm text-xl font-semibold leading-[1.25] sm:text-[26px]">
                    {panel.heading}
                  </h2>

                  {panel.body.map((text, i) => (
                    <p key={i} className="mt-4 text-sm leading-relaxed text-brand-muted">
                      {text}
                    </p>
                  ))}

                  {panel.list && (
                    <ul className="mt-4 space-y-1.5">
                      {panel.list.map((item) => (
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
                  )}

                  {panel.secondHeading && (
                    <div className="mt-6 border-t border-brand-ink/10 pt-6">
                      <h3 className="max-w-sm text-xl font-semibold leading-[1.25] sm:text-[26px]">
                        {panel.secondHeading}
                      </h3>
                      {panel.secondBody?.map((text, i) => (
                        <p key={i} className="mt-4 text-sm leading-relaxed text-brand-muted">
                          {text}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <div className="space-y-5">
                <dl className="rounded-xl bg-[#F1F2F4] p-6 sm:p-8">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start justify-between gap-6 border-b border-brand-ink/10
                                 py-4 first:pt-0 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm font-semibold text-brand-ink">{spec.label}</dt>
                      <dd className="text-right text-sm text-brand-muted">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="rounded-xl bg-[#F1F2F4] p-6 sm:p-8">
                  <h3 className="text-sm font-semibold text-brand-navy">
                    More in quilted insulation
                  </h3>
                  <ul className="mt-3">
                    {related.map((item) => {
                      const Icon = item.icon

                      return item.ready ? (
                        <li key={item.href} className="border-b border-brand-ink/10 last:border-0">
                          <Link href={item.href} className="group flex items-start gap-3 py-3">
                            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink/70 transition-colors group-hover:text-brand-red" />
                            <span className="min-w-0">
                              <span className="block text-sm font-medium text-brand-ink transition-colors group-hover:text-brand-red">
                                {item.title}
                              </span>
                              <span className="mt-0.5 block text-xs text-brand-navy/70">
                                {item.tagline}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ) : (
                        // Not built yet — shown for completeness but not a link, so it
                        // can never 404. Muted blue matches "coming soon" elsewhere.
                        <li
                          key={item.href}
                          className="flex items-start gap-3 border-b border-brand-ink/10 py-3 last:border-0"
                          aria-disabled="true"
                        >
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink/45" />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-brand-ink/70">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-brand-navy/60">
                              {item.tagline}
                            </span>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/*
           * Comparison table. Scrolls inside its own container so a narrow
           * screen never forces the whole page sideways.
           */}
          {comparison && (
            <Reveal delay={0.12}>
              <div className="mt-12">
                <h2 className="text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                  {comparison.heading}
                </h2>

                <div className="mt-6 overflow-x-auto rounded-xl border border-brand-ink/10">
                  <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                      <tr>
                        <th className="border-b border-brand-ink/10 px-5 py-3.5 text-sm font-semibold text-brand-ink">
                          Property
                        </th>
                        {comparison.columns.map((col) => (
                          <th
                            key={col}
                            className="border-b border-l border-brand-ink/10 px-5 py-3.5 text-sm font-semibold text-brand-ink"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.rows.map((row) => (
                        <tr key={row.label} className="align-top">
                          <th
                            scope="row"
                            className="border-b border-brand-ink/10 px-5 py-3.5 text-sm
                                       font-medium text-brand-ink last:border-0"
                          >
                            {row.label}
                          </th>
                          {row.cells.map((cell, i) => (
                            <td
                              key={i}
                              className="border-b border-l border-brand-ink/10 px-5 py-3.5
                                         text-sm leading-relaxed text-brand-muted"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          )}

          {/*
           * Second panel. The right-hand image sits in its own column spanning
           * both rows, so it runs the full height of the card alongside both
           * the intro copy and the closing "specified, not fixed" block.
           */}
          {secondPanel && (
            <Reveal delay={0.14}>
              <div className="mt-12 overflow-hidden rounded-xl border border-brand-ink/10 bg-white p-4 sm:p-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:gap-8">
                  {/*
                   * Copy column: heading across the top, then image and body
                   * side by side split by a vertical rule, then the closing
                   * block and the CTA beneath both.
                   */}
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold leading-[1.25] sm:text-[26px]">
                      {secondPanel.heading}
                    </h2>

                    <div
                      className={cn(
                        'mt-6 grid gap-6',
                        secondPanel.leftImage && 'sm:grid-cols-2 sm:gap-8'
                      )}
                    >
                      {secondPanel.leftImage && (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                          <Image
                            src={secondPanel.leftImage.src}
                            alt={secondPanel.leftImage.alt}
                            fill
                            sizes="(min-width: 640px) 260px, 100vw"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className={cn(secondPanel.leftImage && 'sm:border-l sm:border-brand-ink/10 sm:pl-8')}>
                        {secondPanel.body.map((text, i) => (
                          <p
                            key={i}
                            className="text-sm leading-relaxed text-brand-muted [&:not(:first-child)]:mt-4"
                          >
                            {text}
                          </p>
                        ))}
                      </div>
                    </div>

                    {secondPanel.secondHeading && (
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold leading-[1.25] sm:text-[26px]">
                          {secondPanel.secondHeading}
                        </h3>
                        {secondPanel.secondBody?.map((text, i) => (
                          <p key={i} className="mt-4 text-sm leading-relaxed text-brand-muted">
                            {text}
                          </p>
                        ))}
                      </div>
                    )}

                    <Link href="/quote" className="btn-primary mt-8">
                      Request A Quote
                    </Link>
                  </div>

                  <div className="relative min-h-[240px] overflow-hidden rounded-lg lg:min-h-full">
                    <Image
                      src={secondPanel.image.src}
                      alt={secondPanel.image.alt}
                      fill
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
