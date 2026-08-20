import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import ServiceMarquee from '@/components/services/ServiceMarquee'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import StepTabs from '@/components/ui/StepTabs'

export const metadata: Metadata = {
  title: 'Bespoke Pattern Design — A.N. Standard Ltd.',
  description:
    'Bespoke quilting patterns commissioned to your design. Send a sketch, photo, or vector. Design check included. Patterns go on file for future runs with no set-up charge.',
}

const IMG = '/images/bespoke-pattern'

const swatches = [
  { src: `${IMG}/Rectangle 89.png`, alt: 'A bespoke pattern quilted in green satin' },
  { src: `${IMG}/Rectangle 90.png`, alt: 'A diamond variation quilted in silver satin' },
  { src: `${IMG}/Rectangle 91.png`, alt: 'A hexagon pattern quilted in white cotton' },
]

const specs = [
  { label: 'Standard Width', value: '1500–1600mm' },
  { label: 'Maximum Width', value: '2400mm' },
  { label: 'Stock Wadding', value: '70–300gsm' },
  { label: 'Minimum Order', value: 'One sample pattern; production runs from 200 linear metres' },
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

/** Steps in the sketch-to-production route; the first is shown by default. */
const patternProcess = [
  {
    title: 'Send anything',
    body: 'A drawing, a photograph of a competitor’s product, a physical sample, or a vector file — any of those is enough for us to say yes, no, or yes-with-changes.',
  },
  {
    title: 'Design check',
    body: 'We look at the pattern against the wadding you intend to use. A dense pattern crushes the loft out of a heavy filling, so we tell you which combinations work before you commit to anything.',
  },
  {
    title: 'Sample panel',
    body: 'We quilt a sample panel, usually within a few days depending on machine availability. You handle it before anything goes into production.',
  },
  {
    title: 'On file',
    body: 'Once proven, the pattern stays on file under your name, with no set-up charge to run it again.',
  },
]

const bespokeOptions = [
  {
    title: 'Take a book pattern',
    items: [
      'No set-up time or sample lead time',
      'Proven against a known range of waddings',
      'Right when quilting is functional rather than decorative',
      'Fastest route to a first production run',
    ],
  },
  {
    title: 'Commission a bespoke pattern',
    items: [
      'The quilting is part of how your product is recognised',
      'You need a motif, logo geometry or a specific repeat',
      'An existing product has to be matched exactly',
      'Patterns drawn to your design are yours — we do not offer them to anyone else',
    ],
  },
]

export default function BespokePatternDesignPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Bespoke Pattern Design"
        intro="Patterns are data, not fixed cams. Send a sketch, photo, or vector file. We'll check the design, run a sample, and put the pattern on file for future runs."
        image={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Hands working on bespoke quilting pattern design"
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
                  Pattern As Data,
                  <br />
                  Not As A Cam
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                  Our machines were built mechanical and have been converted to computerised control.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  On an old mechanical quilter the pattern is a physical cam, and your choice is
                  whatever the maker cut. Our machines have been modified over the years into
                  computerised machines, so the pattern is data.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  In practice that means: if it can be drawn as a continuous path across the width of
                  the machine, we can usually run it. Several patterns in our book started life as a
                  customer’s sketch on the back of a delivery note.
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

          {/* Book pattern or bespoke: copy centred between two photos. */}
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)_minmax(0,240px)] lg:gap-8">
                <div className="relative hidden min-h-[300px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23.png`}
                    alt="A quilted panel being drawn off the machine"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold sm:text-2xl">Book pattern or bespoke?</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    Both run on the same machines. The decision is usually about volume and
                    distinctiveness.
                  </p>

                  <div className="mt-5 space-y-5">
                    {bespokeOptions.map((option) => (
                      <div key={option.title}>
                        <h3 className="text-sm font-semibold text-brand-ink">{option.title}</h3>
                        <ul className="mt-2 space-y-1.5">
                          {option.items.map((item) => (
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
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link href="/process" className="btn-primary mt-6">
                      Learn About Our Process
                    </Link>
                  </div>
                </div>

                <div className="relative hidden min-h-[300px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23 (1).png`}
                    alt="Tartan fabric being loaded for a bespoke run"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* From sketch to signed-off pattern */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">From sketch to signed-off pattern</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9">
              <StepTabs steps={patternProcess} />
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
                  alt="Bespoke pattern design process"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ServiceMarquee currentHref="/services/bespoke-pattern-design" />

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
