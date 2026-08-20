import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import QuoteCta from '@/components/layout/QuoteCta'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { sectors as fallbackSectors, sectorsBannerImage, sectorsHeroImage } from '@/lib/sectors'
import { getSectors, getSectorsPage } from '@/lib/cms/queries'
import { imageSrc, text } from '@/lib/cms/fallbacks'
import { resolveIcon } from '@/lib/cms/icons'
import { multiline } from '@/lib/cms/render'

export const metadata: Metadata = {
  title: 'Sectors — A.N. Standard Ltd.',
  description:
    'The right pattern depends on what the finished product has to do. Pick your sector for the fabrics, fillings and patterns we normally run for it.',
}

export default async function SectorsPage() {
  const [page, dbSectors] = await Promise.all([getSectorsPage(), getSectors()])

  const sectors =
    dbSectors.length > 0
      ? dbSectors.map((sector) => ({
          href: `/sectors/${sector.slug}`,
          name: sector.title,
          body: sector.listing_card_teaser,
          icon: resolveIcon(sector.icon),
        }))
      : fallbackSectors.map((sector) => ({
          href: sector.href,
          name: sector.name,
          body: sector.body,
          icon: sector.icon,
        }))

  return (
    <>
      {/*
       * Hero. The collage on the right is a single pre-composed image rather
       * than a grid of nine, so its staggered layout survives at any width.
       */}
      <section className="bg-[#F7F7F8]">
        {/* 600px matches every other hero on the site. */}
        <div className="container grid min-h-[600px] items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="min-w-0">
            <h1 className="hero-rise text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[44px]">
              {multiline(text(page?.hero_heading, 'Nine Sectors,\nOne Factory'))}
            </h1>

            <p
              className="hero-rise mt-6 max-w-md text-sm leading-relaxed text-brand-muted"
              style={{ animationDelay: '0.15s' }}
            >
              {text(page?.hero_intro, 'The right pattern depends on what the finished product has to do. Pick your sector for the fabrics, fillings and patterns we normally run for it.')}
            </p>

            <div
              className="hero-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: '0.25s' }}
            >
              <Link href="/quote" className="btn-primary">
                Request A Quote
              </Link>
              <Link href="/patterns" className="btn-navy">
                See our patterns
              </Link>
            </div>
          </div>

          <div className="hero-rise relative" style={{ animationDelay: '0.1s' }}>
            <Image
              src={sectorsHeroImage.src}
              alt={sectorsHeroImage.alt}
              width={1000}
              height={776}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          {/* Banner: title sits over the quilt photo. */}
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-xl">
              <Image
                src={sectorsBannerImage.src}
                alt={sectorsBannerImage.alt}
                width={2088}
                height={560}
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="h-[180px] w-full object-cover sm:h-[220px]"
              />
              <div className="absolute inset-0 bg-brand-navy/70" />
              <h2 className="absolute inset-0 flex items-end justify-center p-6 text-2xl font-semibold text-white sm:p-8 sm:text-3xl">
                Industries we serve
              </h2>
            </div>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => {
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

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}

/** Rebuilt on save, and on this timer as a backstop. */
export const revalidate = 60
