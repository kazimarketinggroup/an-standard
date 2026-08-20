import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import ServiceMarquee from '@/components/services/ServiceMarquee'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import StepTabs from '@/components/ui/StepTabs'

export const metadata: Metadata = {
  title: 'Customer-Supplied Materials — A.N. Standard Ltd.',
  description:
    'Send your own materials—foam, felt, wool, or technical non-wovens. We quilt without competing on materials. Sample testing available before production.',
}

const IMG = '/images/customer-supplied'

const swatches = [
  { src: `${IMG}/Rectangle 89.png`, alt: 'Customer-supplied quilted fabric sample' },
  { src: `${IMG}/Rectangle 90.png`, alt: 'Custom material quilting example' },
  { src: `${IMG}/Rectangle 91.png`, alt: 'Finished customer material project' },
]

const specs = [
  { label: 'Standard Width', value: '1500–1600mm' },
  { label: 'Maximum Width', value: '2400mm' },
  { label: 'Stock Wadding', value: '70–300gsm' },
  { label: 'Minimum Order', value: 'One sample panel; no set-up charge on repeat patterns' },
]

const limits = [
  'Foam above roughly 10mm becomes difficult to feed evenly under a multi-needle head',
  'Very open or poorly bonded battings can drift and pill between stitch lines',
  'Shedding materials — raw fibreglass, loose mineral wool — must be enclosed between fabrics',
  'Anything with specified fire performance must arrive with its documentation',
]

/** Matches the four steps shown on the design's tabbed panel. */
const sampleRoute = [
  {
    title: 'Send one roll',
    body: 'Tell us the pattern and the fabric it is going between.',
  },
  {
    title: 'We quilt a panel',
    body: 'We run a panel on the same machine and settings your production would use, so the sample is representative rather than optimistic.',
  },
  {
    title: 'You get an honest assessment',
    body: 'If your material will not feed evenly, pill between stitch lines or hold the pattern, we tell you at this stage rather than after a production run.',
  },
  {
    title: 'Stock is returned or held',
    body: 'Whatever is left goes back to you, or stays booked in against your name for the production run.',
  },
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
  'No direct competition creates better results for you',
  'Experienced quality inspection on every roll',
  'Sampling available to verify specifications',
  'Fast turnaround on repeat orders',
]

export default function CustomerSuppliedMaterialsPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Customer-Supplied Materials"
        intro="If polyester wadding isn't right for your product, send us yours. We regularly quilt foam, felt and natural fillings."
        image={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Customer materials being prepared for quilting"
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
                  A Large Share Of Our Work
                  <br />
                  Is Material We Didn’t Sell You
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                  Foam, felt, wool, cotton batting, hollowfibre, barrier fabrics and technical
                  non-wovens.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Customers send us their own fillings, usually because their end market specifies a
                  particular material, or because they buy it more cheaply at their own volumes than
                  we could. Either is fine — our pricing does not penalise it.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Supplied materials are treated exactly like our own stock: booked in against your
                  order, stored dry, allocated only to your jobs. Nothing gets substituted without a
                  phone call.
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

          {/* Limits worth knowing before you ship */}
          <Reveal delay={0.1} className="mt-12">
            <div className="overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
                <div className="relative hidden min-h-[300px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23.png`}
                    alt="Material being prepared for quilting"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Limits worth knowing before you ship
                  </h2>
                  <p className="mt-1 text-sm text-brand-muted">Honest constraints</p>

                  <ul className="mt-6 space-y-2">
                    {limits.map((item) => (
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
                    <Link href="/process" className="btn-primary mt-8">
                      Learn About Our Process
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              The safe route: a sample run first
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9">
              <StepTabs steps={sampleRoute} />
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

          {/* Weight and pattern are one decision, not two */}
          <div className="mt-16">
            <Reveal>
              <h2 className="text-center text-2xl font-semibold sm:text-3xl">
                Weight and pattern are one decision, not two
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-2xl text-center text-sm leading-relaxed text-brand-muted mx-auto">
                Heavier waddings need larger patterns, because a light stitch gap compresses the fibres and makes the quilting feel thin. Specify weight and pattern together, and we will recommend the minimum stitch gap to ensure your wadding lofts properly after quilting. We will also back it in a weight and pattern pairing.
              </p>
            </Reveal>
          </div>

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
                  alt="Team handling customer-supplied materials"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ServiceMarquee currentHref="/services/customer-supplied-materials" />

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
