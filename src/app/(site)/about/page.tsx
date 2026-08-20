import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { getAboutPage, getAboutSubpages } from '@/lib/cms/queries'
import { imageSrc, list, text } from '@/lib/cms/fallbacks'
import { multiline } from '@/lib/cms/render'

export const metadata: Metadata = {
  title: 'About Us — A.N. Standard Ltd.',
  description:
    'A.N Standard was established in 1975 as a family business, and it has stayed one. Third-generation commission quilters in the West Midlands.',
}

const stats = [
  { label: 'Established', value: '1975' },
  { label: 'Third generation', value: 'Family-run' },
  { label: 'Manufactured in the', value: 'West Midlands' },
  { label: 'UK-sourced wadding', value: 'held in stock' },
]

const FALLBACK_CARDS = [
  {
    title: 'Our story',
    body: 'Send us your fabric and filling. We quilt it to your pattern and send it back.',
    href: '/about/our-story',
    image: '/images/about/Rectangle 29.png',
    alt: 'Quilted fabric coming off the machine in our factory',
  },
  {
    title: 'Our Team',
    body: 'The people who answer the phone are the people who run the machines.',
    href: '/about/our-team',
    image: '/images/about/Rectangle 29 (1).png',
    alt: 'A machinist threading a multi-needle quilting machine',
  },
  {
    title: 'Our factory',
    body: 'Machines, capacity and roll widths at our West Midlands site.',
    href: '/about/our-factory',
    image: '/images/about/Rectangle 31.png',
    alt: 'Multi-needle quilting machine with rolls of wadding',
  },
  {
    title: 'Quality and accreditations',
    body: 'Every roll checked before despatch. Accreditation list [TBC].',
    href: '/about/quality',
    image: '/images/about/Rectangle 32.png',
    alt: 'Inspecting a quilted panel before despatch',
  },
]

export default async function AboutPage() {
  const [page, subpages] = await Promise.all([getAboutPage(), getAboutSubpages()])

  const cards =
    subpages.length > 0
      ? subpages.map((sub) => ({
          title: sub.title,
          body: sub.teaser,
          href: `/about/${sub.slug}`,
          image: imageSrc(sub.listing_image) ?? '/images/about/Rectangle 29.png',
          alt: sub.title,
        }))
      : FALLBACK_CARDS

  const heroStats = list(page?.stat_badges).length ? list(page?.stat_badges) : stats

  return (
    <>
      <PageHero
        seal
        title={multiline(text(page?.hero_heading, 'Fifty Years,\nThree Generations'))}
        intro={text(page?.hero_intro, 'A.N Standard was established in 1975 as a family business, and it has stayed one.')}
        image={imageSrc(page?.hero_image) ?? '/images/about/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png'}
        imageAlt="Spools of coloured thread arranged in a spiral"
        stats={heroStats}
      />

      <section className="section bg-[#F2F2F3]">
        <div className="container">
          <RevealGroup className="grid gap-5 lg:grid-cols-2">
            {cards.map((card) => (
              <RevealItem key={card.title}>
                <Link
                  href={card.href}
                  className="group flex h-full items-stretch justify-between gap-4 rounded-xl
                             bg-white p-5 shadow-card transition-shadow duration-300
                             hover:shadow-lift focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-brand-red focus-visible:ring-offset-2 sm:gap-6 sm:p-6"
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="text-base font-semibold text-brand-ink sm:text-lg">
                      {card.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-brand-muted">{card.body}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand-ink">
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      Learn More
                    </span>
                  </div>

                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-lg sm:w-40 lg:w-48">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </RevealItem>
            ))}
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
