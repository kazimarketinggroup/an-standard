import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import ServiceMarquee from '@/components/services/ServiceMarquee'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Commission Quilting — A.N. Standard Ltd.',
  description:
    'We quilt your fabric to your specification and return it production-ready. No finished products, no competition with our customers, no minimum contract commitments.',
}

const IMG = '/images/commision quilting'

const swatches = [
  { src: `${IMG}/Rectangle 89.png`, alt: 'Green satin quilted in a leaf pattern' },
  { src: `${IMG}/Rectangle 90.png`, alt: 'Silver satin quilted in a diamond pattern' },
  { src: `${IMG}/Rectangle 91.png`, alt: 'White fabric quilted in a hexagon pattern' },
]

const specs = [
  { label: 'Standard Width', value: '1500–1600mm' },
  { label: 'Maximum Width', value: '2400mm' },
  { label: 'Stock Wadding', value: '70–300gsm' },
  { label: 'Minimum Order', value: 'One roll for sampling; 200 linear metres for production pricing' },
]

const applications = [
  'Hospital textiles requiring frequent high-temperature laundering',
  'Automotive seating and interiors',
  'Equestrian products exposed to heavy outdoor use',
  'Commercial and industrial applications',
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
  'We only provide commission quilting',
  'We never manufacture competing finished products',
  'No minimum contract length',
  'Flexible order quantities',
  'Experienced quality inspection on every roll',
  'Sampling available before production',
  'Fast repeat-order turnaround',
]

export default function CommissionQuiltingPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Commission Quilting"
        intro="We quilt your fabric to your specification and return it production-ready. No finished products. No competition with our customers. No minimum contract commitments."
        image={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Diamond-quilted fabric shading from dark to light"
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
            <div>
              <Reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">Your Fabric. Our Expertise.</h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                  Whether you send one roll a year or multiple containers every month, every order
                  receives the same level of care and quality.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  We use lock stitch machines, achieving a stronger stitch to provide a better
                  quality end product. Our equipment is continuously modified to improve quality
                  control. Here at A.N Standard we strive to ensure the best merchandise is
                  dispatched efficiently. Standard quilting width is 1500/1600mm however we can
                  extend this up to 2400mm.
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
          </div>

          {/* Why lock stitch: two photos flanking the copy. */}
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-8">
                <div className="relative hidden min-h-[260px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23.png`}
                    alt="A machinist setting the needle bar on a quilting machine"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Why Choose Lock
                    <br className="hidden sm:block" /> Stitch Quilting?
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                    This makes it the preferred solution for products that need to withstand
                    demanding environments, including:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {applications.map((item) => (
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

                <div className="relative hidden min-h-[260px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23 (1).png`}
                    alt="A multi-needle quilting machine running orange fabric over wadding"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="mt-6 border-t border-black/8 pt-6 text-lg font-semibold leading-snug sm:text-xl">
                Precision Multi-Needle Lock Stitch Quilting. Built Around Your Materials, Your
                Volumes, Your Schedule.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-brand-cream">
        <div className="container">
          <Reveal>
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">Fabrics We Quilt</h2>
            <p className="mt-3 text-center text-sm text-brand-muted">
              Designed to Handle a Wide Range of Materials
            </p>
          </Reveal>

          <RevealGroup className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5" delay={0.08}>
            {fabrics.map((fabric) => (
              <RevealItem key={fabric}>
                <span className="inline-flex rounded-md bg-white px-3.5 py-2 text-[13px] text-brand-ink shadow-sm">
                  {fabric}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
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

              <Reveal delay={0.15}>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex items-center gap-3 border-t border-black/10 pt-6"
                >
                  <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded">
                    <Image
                      src={`${IMG}/Container.png`}
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
                  src="/images/quote/vecteezy_a-stack-of-colorful-quilts_55963077 1.png"
                  alt="A machinist quilting green satin on a Brother sewing machine"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ServiceMarquee currentHref="/services/commission-quilting" />

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
