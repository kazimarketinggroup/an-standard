import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { insulationItems } from '@/lib/insulation'

export const metadata: Metadata = {
  title: 'Quilted Insulation — A.N. Standard Ltd.',
  description:
    'We worked alongside the developer of quilted fibreglass and have since taken over its full manufacture, which makes us the UK’s leading supplier of the product.',
}

const IMG = '/images/quilted-insultation'

const swatches = [
  { src: `${IMG}/Rectangle 89.png`, alt: 'Cream fabric quilted in a diamond pattern' },
  { src: `${IMG}/Rectangle 90.png`, alt: 'Navy quilted jackets on a rail' },
  { src: `${IMG}/Rectangle 91.png`, alt: 'White quilted mattress protector' },
]

const specs = [
  { label: 'Maximum width', value: '2400mm' },
  { label: 'Minimum order', value: 'Small runs accepted' },
  { label: 'Repeat orders', value: 'Typically completed within 2–3 weeks' },
  { label: 'Construction', value: 'Mat between two facings' },
  { label: 'Standard patterns', value: 'Vertical 1–2", box 2" and 4"' },
]

const industries = [
  'Healthcare',
  'Automotive',
  'Equestrian',
  'Industrial manufacturing',
  'Protective equipment',
]

const fabrics = [
  'Woven fabrics',
  'Knitted fabrics',
  'Ripstop materials',
  'Coated nylons',
  'Cotton',
  'Polycotton',
  'Satin',
  'Canvas',
  'Velour',
  'PVC-backed fabrics',
  'Non-woven materials',
]

const reasons = [
  'Commission quilting specialists',
  'Multi-needle lock stitch technology',
  'No minimum contract length',
  'Small orders and container loads welcomed',
  'Quality inspection on every roll',
  'Sampling available before production',
  'We never manufacture competing finished products',
]

export default function QuiltedInsulationPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Quilted Insulation,
            <br />
            Manufactured In The UK
          </>
        }
        intro="We worked alongside the developer of quilted fibreglass and have since taken over its full manufacture, which makes us the UK’s leading supplier of the product."
        image={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Brown fabric quilted in a fine diamond pattern"
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

      <section className="section bg-[#F2F2F3]">
        <div className="container">
          <RevealGroup className="grid gap-5 sm:grid-cols-3">
            {swatches.map((swatch) => (
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

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">Built for industrial manufacturing</h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                  Quilted fibreglass is a composite: a fibreglass mat quilted between layers of
                  fabric, producing a flexible insulating material that holds together in use rather
                  than shedding or slumping.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  We have the facilities to take in full container loads, and we also supply smaller
                  quantities — a first order does not have to be large.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <h3 className="mt-8 text-base font-semibold sm:text-lg">
                  Need delivery for a fixed production date?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  Let us know during the quotation stage so we can schedule your order accordingly.
                </p>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1}>
              <dl className="rounded-xl bg-[#E9EAEC] p-6 sm:p-8">
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

          {/* Why lock stitch: copy plus a nested industries panel. */}
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-8">
                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">Why lock stitch?</h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                    Lock stitch quilting is chosen because it offers greater durability than chain
                    stitch quilting. If a chain stitch thread breaks, the stitching can unravel. A
                    lock stitch does not, making it suitable for products that are repeatedly
                    laundered, used daily, or exposed to demanding environments.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)]">
                    <div className="relative hidden min-h-[200px] overflow-hidden rounded-lg sm:block">
                      <Image
                        src={`${IMG}/Rectangle 23.png`}
                        alt="A machinist feeding quilted insulation through the machine"
                        fill
                        sizes="180px"
                        className="object-cover"
                      />
                    </div>

                    <div className="rounded-lg border border-black/8 p-5">
                      <h3 className="text-sm font-semibold text-brand-ink">
                        Suitable for industries including:
                      </h3>
                      <ul className="mt-3 space-y-1.5">
                        {industries.map((industry) => (
                          <li
                            key={industry}
                            className="relative pl-5 text-sm leading-relaxed text-brand-muted
                                       before:absolute before:left-0 before:top-[0.6em] before:h-1
                                       before:w-1 before:rounded-full before:bg-brand-muted"
                          >
                            {industry}
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link href="/process" className="btn-primary mt-5">
                          Learn About Our Process
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative hidden min-h-[320px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23 (1).png`}
                    alt="A roll of quilted fibreglass on the machine"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore the range: banner image over a six-item grid. */}
      <section className="section bg-brand-cream">
        <div className="container">
          <Reveal>
            <div className="rounded-xl bg-[#F7F1EC] p-5 sm:p-6">
              <h2 className="text-center text-lg font-semibold sm:text-xl">
                Explore our quilted insulation range
              </h2>
              <div className="relative mt-5 aspect-[21/6] overflow-hidden rounded-lg">
                <Image
                  src={`${IMG}/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png`}
                  alt="Quilted fibreglass wrapped around a roller on the quilting machine"
                  fill
                  sizes="(min-width: 1024px) 1120px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3" delay={0.08}>
            {insulationItems.map((item) => {
              const Icon = item.icon

              return (
                <RevealItem key={item.href}>
                  <Link href={item.href} className="group block">
                    <Icon className="h-6 w-6 text-brand-ink/80 transition-colors group-hover:text-brand-red" />
                    <h3 className="mt-3 text-sm font-semibold text-brand-ink transition-colors group-hover:text-brand-red">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-brand-muted">{item.body}</p>
                  </Link>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">Fabrics We Quilt</h2>
            <p className="mt-3 text-center text-sm text-brand-muted">
              Designed to Handle a Wide Range of Materials
            </p>
          </Reveal>

          <RevealGroup
            className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5"
            delay={0.06}
          >
            {fabrics.map((fabric) => (
              <RevealItem key={fabric}>
                <span className="inline-flex rounded-md bg-[#F2F2F3] px-3.5 py-2 text-[13px] text-brand-ink">
                  {fabric}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <Reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">Why Work With Us?</h2>
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

              <Reveal delay={0.15}>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex items-center gap-3 border-t border-black/10 pt-6"
                >
                  <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                    <Image
                      src={`${IMG}/Rectangle 13 (1).png`}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition-colors group-hover:text-brand-red">
                      See our work process
                    </span>
                    <span className="mt-0.5 block text-xs text-brand-muted">Youtube</span>
                  </span>
                </a>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.1} className="min-w-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={`${IMG}/Rectangle 13.png`}
                  alt="A machinist quilting green fabric on a Brother machine"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Page-specific CTA: the question this page leaves the reader with. */}
          <Reveal delay={0.1}>
            <div className="mt-12 grid items-center gap-8 rounded-2xl bg-brand-cream px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:py-12">
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  Quilted Fibreglass Or Polyester Wadding, Which Do You Need?
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-muted">
                  We manufacture both, so we have no reason to push you toward either. The choice
                  usually comes down to temperature, weight and cost.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/quote" className="btn-primary">
                    Request A Quote
                  </Link>
                  <Link href="/patterns" className="btn-navy">
                    See our patterns
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/fiberglassor polystar/Rectangle 23.png"
                  alt="A fibreglass quilted panel beside a white polyester quilted panel on a workbench"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
