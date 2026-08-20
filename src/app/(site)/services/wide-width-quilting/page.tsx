import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import ServiceMarquee from '@/components/services/ServiceMarquee'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Wide-Width Quilting — A.N. Standard Ltd.',
  description:
    'Wide-width quilting up to 2400mm. Eliminate panel joins for mattresses, soft furnishings, and technical insulation. No minimum order on sampling.',
}

const IMG = '/images/wide-width quilting'

const swatches = [
  { src: `${IMG}/Rectangle 89.png`, alt: 'Orange fabric quilted in a diamond pattern' },
  { src: `${IMG}/Rectangle 90.png`, alt: 'Yellow fabric quilted in a diamond pattern' },
  { src: `${IMG}/Rectangle 91.png`, alt: 'Purple fabric quilted in a diamond pattern' },
]

const specs = [
  { label: 'Standard Width', value: '1500–1600mm' },
  { label: 'Maximum Width', value: '2400mm' },
  { label: 'Stock Wadding', value: '70–300gsm' },
  { label: 'Minimum Order', value: 'Sampling from one roll; width-specific machine time booked in advance' },
]

const applications = [
  'Bedding and mattress protection at king and super-king',
  'Marquee linings, covers and tarpaulin work',
  'Vehicle, plant and enclosure insulation panels',
  'Horse rugs and heavy equestrian goods',
  'Any panel where a centre seam is a warranty risk',
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
  'We have invested in wide-width quilting machinery',
  'Our machines are regularly maintained and upgraded',
  'Experienced operators ensure consistent quality on all widths',
  'Flexible design and pattern options available',
  'Sampling available to verify specifications',
  'Fast turnaround on repeat orders',
]

export default function WideWidthQuiltingPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Wide-Width Quilting"
        intro="Standard quilting is 1500–1600mm wide. For larger products, we quilt up to 2400mm—eliminating panel joins and ensuring seamless, professional results."
        image={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Wide-width quilted fabric on our long-arm quilting machine"
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
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  The 1600mm Ceiling,
                  <br />
                  And Why It Costs You
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                  Most UK quilting stops at standard machine width. Ours doesn’t have to.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Most quilting in the UK is done at around 1500–1600mm because that is the width of
                  a standard multi-needle machine. If your finished panel is wider, the usual answer
                  is to join two pieces — which adds a seam, adds labour, and puts a weak line down
                  the middle of the product.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  We quilt up to 2400mm so you do not have to. A wider roll also improves yield on
                  nested cutting patterns: more room to interlock shapes before the offcut becomes
                  waste. On long runs that saving alone often pays for the wider quilting.
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

          {/* Where The Extra Width Earns Its Keep: two photos flanking the copy. */}
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-8">
                <div className="relative hidden min-h-[260px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 90.png`}
                    alt="Rolls of quilted fabric"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Where The Extra
                    <br className="hidden sm:block" /> Width Earns Its Keep
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                    Wide-width quilting eliminates the need to join multiple panels and ensures a seamless, professional finish. It’s particularly valuable for:
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
                    src={`${IMG}/laptop-screen-with-business-chart-cup-of-coffee-n-2026-03-26-04-47-39-utc 1.png`}
                    alt="Wide-width quilting machinery"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-black/8 pt-6 space-y-4">
                <p className="text-sm leading-relaxed text-brand-muted">
                  Across 2400mm, a stitch line that wanders by a millimetre per metre is visible, and so is any variation in wadding tension. We keep pattern sizes generous on wide work and run wide jobs with tighter checks on wadding feed.
                </p>
              </div>
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
                      src={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
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
                  alt="Operator working on wide-width quilting machine"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Send the cut plan section */}
          <div className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-semibold sm:text-3xl">Send the cut plan, not the roll width</h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                It is common for a customer to ask for 2400mm when 1800mm cuts more efficiently for their product, and equally common for someone to be joining panels at 1900mm when a single wide roll would have been cheaper. Give us the finished panel size and the next, and we will work the roll width back from it before quilting. Wide-width machine time is booked in advance, so early notice of a fixed date is worth more than chasing later.
              </p>
            </Reveal>
          </div>

          <ServiceMarquee currentHref="/services/wide-width-quilting" />

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
