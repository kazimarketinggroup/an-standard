import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { services as fallbackServices } from '@/lib/services'
import { getServices, getServicesPage } from '@/lib/cms/queries'
import { imageSrc, text } from '@/lib/cms/fallbacks'
import { resolveIcon } from '@/lib/cms/icons'

export const metadata: Metadata = {
  title: 'Quilting Services — A.N. Standard Ltd.',
  description:
    'Multi-needle lock stitch quilting on machines we have been running, maintaining and modifying since 1975.',
}

const intro = [
  'We use multi needle lock stitch quilting machines on all of our work, ensuring a stronger stitch. Our machines are regularly serviced and updated to maintain a high quality.',
  'We want to give all of our customer’s the best possible experience and so are on hand to offer our support and experience to ensure a tailored solution for your business.',
  'You may already have a quilting pattern in mind, or you can choose from our extensive pattern book. Our computerised machine means we can make adaptions if you prefer a bespoke pattern.',
  'We can advise which patterns work best with the different weights of wadding. The thicker the wadding the bigger the pattern will need to be',
]

export default async function ServicesPage() {
  const [page, dbServices] = await Promise.all([getServicesPage(), getServices()])

  const services =
    dbServices.length > 0
      ? dbServices.map((service) => ({
          title: service.title,
          body: service.listing_card_teaser,
          href: `/services/${service.slug}`,
          image: imageSrc(service.listing_card_image) ?? '/images/services/Rectangle 29.png',
          alt: text(service.listing_card_alt, service.title),
          icon: resolveIcon(service.icon),
        }))
      : fallbackServices

  return (
    <>
      <PageHero
        align="left"
        title={text(page?.hero_heading, 'Quilting Services')}
        intro={text(page?.hero_intro, 'Multi-needle lock stitch quilting on machines we have been running, maintaining and modifying since 1975.')}
        image={imageSrc(page?.hero_image) ?? '/images/services/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png'}
        imageAlt="Red quilted fabric running through a multi-needle quilting machine"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-14">
            <Reveal direction="right">
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                What We Quilt,
                <br />
                And How
              </h2>
            </Reveal>

            <div className="space-y-5">
              {intro.map((text, i) => (
                <Reveal key={i} delay={0.06 * (i + 1)}>
                  <p className="text-sm leading-relaxed text-brand-muted">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Full-width banners: image bleeds across the card, copy sits left. */}
          <RevealGroup className="mt-12 space-y-5" delay={0.1}>
            {services.map((service) => {
              const Icon = service.icon

              return (
                <RevealItem key={service.title}>
                  <article className="group relative isolate overflow-hidden rounded-xl bg-brand-ink">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 1120px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/45" />

                    <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                      <div className="max-w-md">
                        <h3 className="flex items-center gap-2.5 text-lg font-semibold text-white sm:text-xl">
                          <Icon className="h-5 w-5 shrink-0 text-white/80" />
                          {service.title}
                        </h3>
                        <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                          {service.body}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap gap-3">
                        <Link
                          href={service.href}
                          className="btn border border-white/35 bg-white/10 text-white
                                     backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white"
                        >
                          Learn More
                        </Link>
                        <Link href="/quote" className="btn-primary">
                          Get Quote
                        </Link>
                      </div>
                    </div>
                  </article>
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
