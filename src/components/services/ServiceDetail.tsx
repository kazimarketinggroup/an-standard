import Image from 'next/image'
import Link from 'next/link'
import PageHero from '../layout/PageHero'
import QuoteCta from '../layout/QuoteCta'
import ServiceMarquee, { type MarqueeService } from './ServiceMarquee'
import Reveal, { RevealGroup, RevealItem } from '../motion/Reveal'
import type { ExtraSection, GalleryImage, HeroButton, Spec } from '@/lib/cms/types'

/**
 * The shared layout behind every /services/[slug] page.
 *
 * The markup is a direct transcription of the five hardcoded pages it replaces,
 * so the rendered output is byte-identical for the same content. Sections are
 * omitted when their content is empty, which is how one component covers five
 * pages that each carried a slightly different set.
 */

export type ServiceDetailProps = {
  currentHref: string
  title: React.ReactNode
  intro: string
  heroImage: string
  heroImageAlt: string
  heroButtons: HeroButton[]
  swatches: GalleryImage[]
  bodyHeading: string
  bodyParagraphs: string[]
  highlightHeading: string
  highlightText: string
  specs: Spec[]
  panel: {
    heading: React.ReactNode
    intro: string
    /** Plain strings render as bullets; label/value pairs render as pills. */
    list: (string | Spec)[]
    /** 'three-column' puts a photo either side of the copy; 'two-column' one. */
    layout: string
    listStyle: string
    leftImage: GalleryImage | null
    rightImage: GalleryImage | null
    footnote: string
    ctaLabel: string
    ctaHref: string
  }
  fabricsHeading: string
  fabricsIntro: string
  fabrics: string[]
  whyHeading: string
  whyIntro: string
  reasons: string[]
  video: { thumbnail: string; url: string; label: string; caption: string } | null
  sideImage: GalleryImage | null
  extraSections: ExtraSection[]
  otherServices: MarqueeService[]
}

const BUTTON_CLASS: Record<string, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  navy: 'btn-navy',
}

/** Bullet styling shared by several lists on this page. */
const BULLET =
  'relative pl-5 text-sm leading-relaxed text-brand-muted before:absolute before:left-0 ' +
  'before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-brand-muted'

/**
 * Renders one of the page-specific blocks. `style` decides the shape, so the
 * wadding weight table and the pattern-design workflow can share one field.
 */
function ExtraBlock({ section }: { section: ExtraSection }) {
  const items = Array.isArray(section.items) ? section.items : []

  return (
    <div className="mt-16">
      <Reveal>
        <h2 className="text-2xl font-semibold sm:text-3xl">{section.heading}</h2>
      </Reveal>

      {section.intro && (
        <Reveal delay={0.08}>
          <p className="mt-6 text-sm leading-relaxed text-brand-muted">{section.intro}</p>
        </Reveal>
      )}

      {items.length > 0 && section.style === 'bullets' && (
        <RevealGroup className="mt-6 space-y-2.5" delay={0.06}>
          {items.map((item, i) => (
            <RevealItem key={i}>
              <p className={BULLET}>{typeof item === 'string' ? item : item.title}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      )}

      {items.length > 0 && section.style === 'steps' && (
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" delay={0.06}>
          {items.map((item, i) => {
            const step = typeof item === 'string' ? { title: item, body: '' } : item
            return (
              <RevealItem key={i}>
                <div className="h-full rounded-xl bg-white p-5 shadow-card">
                  <span className="text-sm font-semibold tabular-nums text-brand-red">
                    {i + 1}.
                  </span>
                  <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-brand-muted">{step.body}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      )}

      {items.length > 0 && section.style === 'table' && (
        <Reveal delay={0.1}>
          <dl className="mt-6 rounded-xl bg-[#FBE9E7] p-6 sm:p-8">
            {items.map((item, i) => {
              const row = typeof item === 'string' ? { label: item, value: '' } : item
              return (
                <div
                  key={i}
                  className="flex items-start justify-between gap-6 border-b border-brand-ink/10
                             py-4 first:pt-0 last:border-0 last:pb-0"
                >
                  <dt className="text-sm font-semibold text-brand-ink">{row.label}</dt>
                  <dd className="text-right text-sm text-brand-muted">{row.value}</dd>
                </div>
              )
            })}
          </dl>
        </Reveal>
      )}

      {items.length > 0 && section.style === 'columns' && (
        <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2" delay={0.08}>
          {items.map((item, i) => {
            const column =
              typeof item === 'string' ? { title: item, items: [] as string[] } : item
            const points = Array.isArray(column.items) ? column.items : []
            return (
              <RevealItem key={i}>
                <div className="h-full rounded-xl bg-white p-6 shadow-card">
                  <h3 className="text-base font-semibold sm:text-lg">{column.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {points.map((point, j) => (
                      <li key={j} className={BULLET}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      )}
    </div>
  )
}

export default function ServiceDetail(props: ServiceDetailProps) {
  const {
    currentHref,
    title,
    intro,
    heroImage,
    heroImageAlt,
    heroButtons,
    swatches,
    bodyHeading,
    bodyParagraphs,
    highlightHeading,
    highlightText,
    specs,
    panel,
    fabricsHeading,
    fabricsIntro,
    fabrics,
    whyHeading,
    whyIntro,
    reasons,
    video,
    sideImage,
    extraSections,
    otherServices,
  } = props

  const hasPanel =
    Boolean(panel.heading) || panel.list.length > 0 || Boolean(panel.footnote)
  const twoColumnPanel = panel.layout === 'two-column'
  const pillList = panel.listStyle === 'pills'

  return (
    <>
      <PageHero
        align="left"
        title={title}
        intro={intro}
        image={heroImage}
        imageAlt={heroImageAlt}
        actions={
          heroButtons.length > 0 ? (
            <>
              {heroButtons.map((button, i) => (
                <Link
                  key={i}
                  href={button.href}
                  className={BUTTON_CLASS[button.style] ?? 'btn-primary'}
                >
                  {button.label}
                </Link>
              ))}
            </>
          ) : undefined
        }
      />

      <section className="section bg-[#F2F2F3]">
        <div className="container">
          {swatches.length > 0 && (
            <RevealGroup className="grid gap-5 sm:grid-cols-3">
              {swatches.map((swatch, i) => (
                <RevealItem key={i}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-card">
                    <Image
                      src={swatch.src}
                      alt={swatch.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          )}

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">{bodyHeading}</h2>
              </Reveal>

              {bodyParagraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06}>
                  <p
                    className={`${i === 0 ? 'mt-6' : 'mt-4'} text-sm leading-relaxed text-brand-muted`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              {highlightHeading && (
                <Reveal delay={0.2}>
                  <h3 className="mt-8 text-base font-semibold sm:text-lg">{highlightHeading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{highlightText}</p>
                </Reveal>
              )}
            </div>

            {specs.length > 0 && (
              <Reveal direction="left" delay={0.1}>
                <dl className="rounded-xl bg-[#FBE9E7] p-6 sm:p-8">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-6 border-b border-brand-ink/10
                                 py-4 first:pt-0 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm font-semibold text-brand-ink">{spec.label}</dt>
                      <dd className="text-right text-sm text-brand-muted">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>

          {/*
            The panel ships in two published layouts: a photo either side of
            the copy, or a single photo on the left with the copy beside it.
          */}
          {hasPanel && (
            <Reveal delay={0.1} className={twoColumnPanel ? 'mt-12' : undefined}>
              <div
                className={`overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6 ${
                  twoColumnPanel ? '' : 'mt-12'
                }`}
              >
                <div
                  className={
                    twoColumnPanel
                      ? 'grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]'
                      : 'grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-8'
                  }
                >
                  {panel.leftImage && (
                    <div
                      className={`relative hidden overflow-hidden rounded-lg lg:block ${
                        twoColumnPanel ? 'min-h-[300px]' : 'min-h-[260px]'
                      }`}
                    >
                      <Image
                        src={panel.leftImage.src}
                        alt={panel.leftImage.alt}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className={twoColumnPanel ? '' : 'flex flex-col justify-center'}>
                    <h2 className="text-xl font-semibold sm:text-2xl">{panel.heading}</h2>
                    {panel.intro && (
                      <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                        {panel.intro}
                      </p>
                    )}

                    {panel.list.length > 0 &&
                      (pillList ? (
                        <ul className="mt-6 space-y-4">
                          {panel.list.map((item, i) => {
                            const row =
                              typeof item === 'string' ? { label: item, value: '' } : item
                            return (
                              <li key={i} className="flex gap-4">
                                <span className="min-w-fit rounded bg-brand-ink/10 px-3 py-1 text-xs font-semibold text-brand-ink">
                                  {row.label}
                                </span>
                                <span className="text-sm leading-relaxed text-brand-muted">
                                  {row.value}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      ) : (
                        <ul className="mt-4 space-y-2">
                          {panel.list.map((item, i) => (
                            <li key={i} className={BULLET}>
                              {typeof item === 'string' ? item : item.label}
                            </li>
                          ))}
                        </ul>
                      ))}

                    {panel.ctaLabel && (
                      <div>
                        <Link
                          href={panel.ctaHref || '/process'}
                          className={`btn-primary ${twoColumnPanel ? 'mt-8' : 'mt-6'}`}
                        >
                          {panel.ctaLabel}
                        </Link>
                      </div>
                    )}
                  </div>

                  {panel.rightImage && !twoColumnPanel && (
                    <div className="relative hidden min-h-[260px] overflow-hidden rounded-lg lg:block">
                      <Image
                        src={panel.rightImage.src}
                        alt={panel.rightImage.alt}
                        fill
                        sizes="240px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {panel.footnote && (
                  <p className="mt-6 border-t border-black/8 pt-6 text-lg font-semibold leading-snug sm:text-xl">
                    {panel.footnote}
                  </p>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section bg-brand-cream">
        <div className="container">
          {fabrics.length > 0 && (
            <>
              <Reveal>
                <h2 className="text-center text-2xl font-semibold sm:text-3xl">
                  {fabricsHeading}
                </h2>
                {fabricsIntro && (
                  <p className="mt-3 text-center text-sm text-brand-muted">{fabricsIntro}</p>
                )}
              </Reveal>

              <RevealGroup
                className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5"
                delay={0.08}
              >
                {fabrics.map((fabric, i) => (
                  <RevealItem key={i}>
                    <span className="inline-flex rounded-md bg-white px-3.5 py-2 text-[13px] text-brand-ink shadow-sm">
                      {fabric}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          )}

          {extraSections.map((section, i) => (
            <ExtraBlock key={i} section={section} />
          ))}

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">{whyHeading}</h2>
                {whyIntro && <p className="mt-2 text-sm text-brand-muted">{whyIntro}</p>}
              </Reveal>

              <RevealGroup className="mt-6 space-y-2.5" delay={0.06}>
                {reasons.map((reason, i) => (
                  <RevealItem key={i}>
                    <p className={BULLET}>{reason}</p>
                  </RevealItem>
                ))}
              </RevealGroup>

              {video && (
                <Reveal delay={0.15}>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 flex items-center gap-3 border-t border-black/10 pt-6"
                  >
                    <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                      <Image
                        src={video.thumbnail}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition-colors group-hover:text-brand-red">
                        {video.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-brand-muted">
                        {video.caption}
                      </span>
                    </span>
                  </a>
                </Reveal>
              )}
            </div>

            {sideImage && (
              <Reveal direction="left" delay={0.1} className="min-w-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={sideImage.src}
                    alt={sideImage.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>

          <ServiceMarquee currentHref={currentHref} services={otherServices} />

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
