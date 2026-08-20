import Image from 'next/image'
import Link from 'next/link'
import QuoteCta from '../layout/QuoteCta'
import Reveal, { RevealGroup, RevealItem } from '../motion/Reveal'
import { ArrowRightIcon } from '../ui/Icons'
import { sectors } from '../../lib/sectors'

type Spec = { label: string; value: string }

type SectorImage = { src: string; alt: string }

type SectorDetailProps = {
  /** Route of the page being rendered, so it can pick its "related" siblings. */
  currentHref: string
  /**
   * Title reads "Quilting For The <accent> Sector", with the sector name
   * picked out in navy — so it is passed separately rather than baked in.
   */
  accent: string
  intro: string
  heroImage: SectorImage
  /** Opening block: heading on the left, copy and spec table below. */
  sectionTitle: string
  paragraphs: string[]
  specs: Spec[]
  /** Full-width dark band: heading and copy over a photo. */
  banner: {
    heading: string
    body: string[]
    image: SectorImage
  }
  /** Two-column block under the banner. */
  fillings: {
    heading: string
    body: string[]
  }
  /** Closing block: heading, copy and a bullet list beside an image. */
  evidence: {
    heading: string
    body: string[]
    list: string[]
    image: SectorImage
  }
  /**
   * Hrefs of the three sectors to cross-link. Defaults to the next three in
   * order, but most pages name the ones that share a material or a problem.
   */
  relatedHrefs?: string[]
}

/**
 * Shared shell for the nine sector pages. Each page supplies only its own
 * words and images; the layout and the "Related sectors" cross-links come
 * from here so they cannot drift apart across pages.
 */
export default function SectorDetail({
  currentHref,
  accent,
  intro,
  heroImage,
  sectionTitle,
  paragraphs,
  specs,
  banner,
  fillings,
  evidence,
  relatedHrefs,
}: SectorDetailProps) {
  // Named siblings where the page picks them, otherwise the next three in
  // order, wrapping around the list so every page shows a full row.
  const index = sectors.findIndex((sector) => sector.href === currentHref)
  const related = relatedHrefs
    ? (relatedHrefs
        .map((href) => sectors.find((sector) => sector.href === href))
        .filter(Boolean) as typeof sectors)
    : Array.from({ length: 3 }, (_, i) => sectors[(index + i + 1) % sectors.length])

  return (
    <>
      {/* Hero: image left, title and actions right. */}
      <section className="bg-white">
        {/* 600px matches every other hero on the site. */}
        <div className="container grid min-h-[600px] items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
          <div className="hero-rise relative aspect-[16/10] overflow-hidden rounded-xl">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <h1
              className="hero-rise text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[40px]"
              style={{ animationDelay: '0.1s' }}
            >
              Quilting For The <span className="text-brand-navy">{accent}</span> Sector
            </h1>

            <p
              className="hero-rise mt-5 max-w-md text-sm leading-relaxed text-brand-muted"
              style={{ animationDelay: '0.18s' }}
            >
              {intro}
            </p>

            <div
              className="hero-rise mt-7 flex flex-wrap gap-3"
              style={{ animationDelay: '0.26s' }}
            >
              <Link href="/quote" className="btn-primary">
                Request A Quote
              </Link>
              <Link href="/sectors" className="btn-navy">
                All Sectors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-14 lg:pb-16">
        <div className="container">
          <Reveal>
            <h2 className="max-w-lg text-2xl font-semibold leading-[1.2] sm:text-[32px]">
              {sectionTitle}
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 space-y-4">
              {paragraphs.map((text, i) => (
                <Reveal key={i} delay={0.06 + i * 0.06}>
                  <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal direction="left" delay={0.1}>
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
            </Reveal>
          </div>

          {/* Dark band: copy sits over the photo. */}
          <Reveal delay={0.1}>
            <div className="relative isolate mt-12 overflow-hidden rounded-xl">
              <Image
                src={banner.image.src}
                alt={banner.image.alt}
                width={2088}
                height={560}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-[260px] w-full object-cover sm:h-[240px]"
              />
              <div className="absolute inset-0 bg-brand-ink/78" />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-8 text-center sm:px-10">
                <h2 className="text-2xl font-semibold text-white sm:text-[28px]">
                  {banner.heading}
                </h2>
                {banner.body.map((text, i) => (
                  <p
                    key={i}
                    className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80 first:mt-5"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Fillings: heading left, copy right. */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <h2 className="max-w-sm text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                {fillings.heading}
              </h2>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <div className="space-y-4">
                {fillings.body.map((text, i) => (
                  <p key={i} className="text-sm leading-relaxed text-brand-muted">
                    {text}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Evidence: copy and bullets left, image right. */}
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <div className="min-w-0">
                <h2 className="max-w-sm text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                  {evidence.heading}
                </h2>

                {evidence.body.map((text, i) => (
                  <p key={i} className="mt-5 text-sm leading-relaxed text-brand-muted">
                    {text}
                  </p>
                ))}

                <ul className="mt-5 space-y-2">
                  {evidence.list.map((item) => (
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
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={evidence.image.src}
                  alt={evidence.image.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Related sectors. */}
          <div className="mt-14">
            <Reveal>
              <h2 className="text-2xl font-semibold leading-[1.2] sm:text-[32px]">
                Related sectors
              </h2>
            </Reveal>

            <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((sector) => {
                const Icon = sector.icon

                return (
                  <RevealItem key={sector.href}>
                    <Link
                      href={sector.href}
                      className="group flex h-full flex-col rounded-xl bg-[#F1F2F4] p-6
                                 transition-colors hover:bg-[#E9EAEC]"
                    >
                      <Icon className="h-7 w-7 text-brand-ink/75" />

                      <h3 className="mt-5 text-base font-semibold text-brand-ink">{sector.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-brand-muted">{sector.body}</p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-ink">
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        Learn More
                      </span>
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
