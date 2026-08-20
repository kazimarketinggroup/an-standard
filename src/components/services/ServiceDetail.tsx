import Image from 'next/image'
import Link from 'next/link'
import PageHero from '../layout/PageHero'
import QuoteCta from '../layout/QuoteCta'
import Reveal, { RevealGroup, RevealItem } from '../motion/Reveal'

type Spec = { label: string; value: string }
type GalleryImage = { src: string; alt: string }

export type ServiceDetailProps = {
  title: string
  intro: string
  heroImage: string
  heroImageAlt: string
  gallery: GalleryImage[]
  bodyHeading: string
  bodyParagraphs: string[]
  highlightHeading: string
  highlightText: string
  specs: Spec[]
  benefitsHeading: string
  benefitsIntro: string
  benefitsList: string[]
  fabrics: string[]
  reasons: string[]
  videoThumbnail: string
  videoUrl: string
}

/**
 * Shared shell for the service pages, extracted from the original hardcoded
 * pages so the layout is identical while the words come from the CMS.
 *
 * Each block renders only when it has content, so a half-filled service page
 * degrades to a shorter page rather than showing empty headings.
 */
export default function ServiceDetail({
  title,
  intro,
  heroImage,
  heroImageAlt,
  gallery,
  bodyHeading,
  bodyParagraphs,
  highlightHeading,
  highlightText,
  specs,
  benefitsHeading,
  benefitsIntro,
  benefitsList,
  fabrics,
  reasons,
  videoThumbnail,
  videoUrl,
}: ServiceDetailProps) {
  const hasUpperBlock = bodyParagraphs.length > 0 || specs.length > 0

  return (
    <>
      <PageHero
        align="left"
        title={title}
        intro={intro}
        image={heroImage}
        imageAlt={heroImageAlt}
        actions={
          <>
            <Link href="/quote" className="btn-primary">
              Request A Quote
            </Link>
            <Link href="/patterns" className="btn-outline">
              See our patterns
            </Link>
          </>
        }
      />

      {(gallery.length > 0 || hasUpperBlock || benefitsList.length > 0) && (
        <section className="section bg-[#F2F2F3]">
          <div className="container">
            {gallery.length > 0 && (
              <RevealGroup className="grid gap-5 sm:grid-cols-3">
                {gallery.map((swatch) => (
                  <RevealItem key={swatch.src}>
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

            {hasUpperBlock && (
              <div
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                  gallery.length > 0 ? 'mt-12' : ''
                }`}
              >
                <div>
                  {bodyHeading && (
                    <Reveal>
                      <h2 className="text-2xl font-semibold sm:text-3xl">{bodyHeading}</h2>
                    </Reveal>
                  )}

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
                      <h3 className="mt-8 text-base font-semibold sm:text-lg">
                        {highlightHeading}
                      </h3>
                      {highlightText && (
                        <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                          {highlightText}
                        </p>
                      )}
                    </Reveal>
                  )}
                </div>

                {specs.length > 0 && (
                  <Reveal direction="left" delay={0.1}>
                    <dl className="rounded-xl bg-[#FBE9E7] p-6 sm:p-8">
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
                  </Reveal>
                )}
              </div>
            )}

            {benefitsList.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-12 overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
                  <div className="flex flex-col justify-center">
                    {benefitsHeading && (
                      <h2 className="text-xl font-semibold sm:text-2xl">{benefitsHeading}</h2>
                    )}
                    {benefitsIntro && (
                      <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                        {benefitsIntro}
                      </p>
                    )}
                    <ul className="mt-4 space-y-2">
                      {benefitsList.map((item) => (
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
                    <div>
                      <Link href="/process" className="btn-primary mt-6">
                        Learn About Our Process
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="section bg-brand-cream">
        <div className="container">
          {fabrics.length > 0 && (
            <>
              <Reveal>
                <h2 className="text-center text-2xl font-semibold sm:text-3xl">
                  Fabrics We Quilt
                </h2>
                <p className="mt-3 text-center text-sm text-brand-muted">
                  Designed to Handle a Wide Range of Materials
                </p>
              </Reveal>

              <RevealGroup
                className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5"
                delay={0.08}
              >
                {fabrics.map((fabric) => (
                  <RevealItem key={fabric}>
                    <span className="inline-flex rounded-md bg-white px-3.5 py-2 text-[13px] text-brand-ink shadow-sm">
                      {fabric}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </>
          )}

          {reasons.length > 0 && (
            <div
              className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                fabrics.length > 0 ? 'mt-16' : ''
              }`}
            >
              <div className="min-w-0">
                <Reveal>
                  <h2 className="text-2xl font-semibold sm:text-3xl">Why Work With Us?</h2>
                  <p className="mt-2 text-sm text-brand-muted">Built Around Manufacturers</p>
                </Reveal>

                <RevealGroup className="mt-6 space-y-2.5" delay={0.06}>
                  {reasons.map((reason) => (
                    <RevealItem key={reason}>
                      <p
                        className="relative pl-5 text-sm leading-relaxed text-brand-muted
                                   before:absolute before:left-0 before:top-[0.6em] before:h-1
                                   before:w-1 before:rounded-full before:bg-brand-muted"
                      >
                        {reason}
                      </p>
                    </RevealItem>
                  ))}
                </RevealGroup>

                {videoThumbnail && (
                  <Reveal delay={0.15}>
                    <a
                      href={videoUrl || 'https://youtube.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-8 flex items-center gap-3 border-t border-black/10 pt-6"
                    >
                      <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                        <Image src={videoThumbnail} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition-colors group-hover:text-brand-red">
                          See our work process
                        </span>
                        <span className="mt-0.5 block text-xs text-brand-muted">Youtube</span>
                      </span>
                    </a>
                  </Reveal>
                )}
              </div>

              <Reveal direction="left" delay={0.1} className="min-w-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image
                    src={heroImage}
                    alt={heroImageAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          )}

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
