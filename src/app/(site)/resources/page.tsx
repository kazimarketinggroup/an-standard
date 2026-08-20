import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { getResourceArticles, getResourcesPage } from '@/lib/cms/queries'
import { imageSrc, text } from '@/lib/cms/fallbacks'

export const metadata: Metadata = {
  title: 'Resources and Guides — A.N. Standard Ltd.',
  description:
    'Practical guides for specifying commission quilting — wadding weights, pattern selection and roll widths.',
}

const FALLBACK_GUIDES = [
  {
    title: 'Choosing a wadding weight',
    body: 'Heavier is not better — it is only better when the pattern is sized to carry it.',
    href: '/resources/choosing-a-wadding-weight',
    image: '/images/resources/Rectangle 13.png',
    alt: 'Wadding samples labelled 4oz, 6oz and 10oz on a quilted panel',
  },
  {
    title: 'Matching pattern to filling',
    body: 'Small patterns give a firm, flat panel and crush loft; large patterns preserve loft but let heavy fillings move.',
    href: '/resources/matching-pattern-to-filling',
    image: '/images/resources/Rectangle 10.png',
    alt: 'A small grid pattern beside a large fan pattern',
  },
  {
    title: 'Getting a sample right first time',
    body: 'Send five metres of your actual production fabric rather than a swatch, tell us the end application.',
    href: '/resources/getting-a-sample-right',
    image: '/images/resources/Rectangle 11.png',
    alt: 'A labelled production fabric roll ready for sampling',
  },
]

export default async function ResourcesPage() {
  const [page, articles] = await Promise.all([getResourcesPage(), getResourceArticles()])

  const guides =
    articles.length > 0
      ? articles.map((article) => ({
          title: article.title,
          body: article.listing_teaser,
          href: `/resources/${article.slug}`,
          image: imageSrc(article.listing_image) ?? '/images/resources/Rectangle 13.png',
          alt: article.title,
        }))
      : FALLBACK_GUIDES

  return (
    <>
      <PageHero
        align="left"
        title={text(page?.hero_heading, 'Resources And Guides')}
        intro={text(page?.hero_intro, 'Practical guides for specifying commission quilting — wadding weights, pattern selection and roll widths.')}
        image={imageSrc(page?.hero_image) ?? '/images/resources/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png'}
        imageAlt="Close-up of the drive mechanism on a quilting machine"
      />

      <section className="section bg-brand-cream">
        <div className="container">
          <Reveal>
            <p className="max-w-2xl text-sm leading-relaxed text-brand-muted">
              Most of what a buyer needs to specify quilting comes down to six decisions. These are
              the answers we give on the phone, written down.
            </p>
          </Reveal>

          <RevealGroup className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3" delay={0.1}>
            {guides.map((guide) => (
              <RevealItem key={guide.title}>
                <Link
                  href={guide.href}
                  className="group flex h-full flex-col overflow-hidden rounded-xl bg-white
                             shadow-card transition-shadow duration-300 hover:shadow-lift
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-brand-red focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-base font-semibold text-brand-ink sm:text-lg">
                      {guide.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-brand-muted">{guide.body}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-brand-ink">
                      Read More
                      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
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
