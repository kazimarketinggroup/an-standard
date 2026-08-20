import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import ServiceMarquee from '@/components/services/ServiceMarquee'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Wadding & Fillings — A.N. Standard Ltd.',
  description:
    'Stock wadding from 70–300gsm, UK-sourced recycled polyester, BS5852 Part 2 compliant. No waiting. Fast turnaround on sampling and repeat orders.',
}

const IMG = '/images/waddingandfellings'

const swatches = [
  { src: `${IMG}/Rectangle 89.png`, alt: 'White quilted wadding sample' },
  { src: `${IMG}/Rectangle 90.png`, alt: 'Thick polyester wadding sample' },
  { src: `${IMG}/Rectangle 91.png`, alt: 'Heavyweight wadding sample' },
]

// Widths and standards match the rest of the site (see /services and
// /about/our-factory); stock wadding is 70–300gsm, not 350.
const specs = [
  { label: 'Standard Width', value: '1500–1600mm' },
  { label: 'Maximum Width', value: '2400mm' },
  { label: 'Stock Wadding', value: '70–300gsm' },
  { label: 'Minimum Order', value: 'One sample panel; no set-up charge on repeat patterns' },
]

const weightGuide = [
  { range: '70–100gsm', uses: 'clothing, linings and nursery, where drape beats insulation' },
  { range: '100–150gsm', uses: 'soft furnishings, bedding and light workwear' },
  { range: '150–250gsm', uses: 'healthcare, pet bedding and vehicle trim' },
  { range: '250–300gsm', uses: 'equestrian rugs and anything that stays lofted outdoors' },
  { range: 'Above 300gsm', uses: 'on request, usually with a large pattern' },
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
  'We only produce commission quilting',
  'We never manufacture competing finished products',
  'No direct competition creates better results for you',
  'Experienced quality inspection on every roll',
  'Sampling available to verify specifications',
  'Fast turnaround on repeat orders',
]

export default function WaddingAndFillingsPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Wadding And Fillings"
        intro="UK-sourced polyester wadding from 70gsm to 300gsm, held in stock, made from recycled polyester and compliant with BS5852 Part 2 1982."
        image={`${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Rolls of wadding and filling materials in storage"
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
                  Why We Hold Stock
                  <br />
                  Rather Than Order In
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                  Recycled UK polyester, 70gsm to 300gsm, compliant with BS5852 Part 2 1982.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Holding wadding ourselves is deliberate. It means a repeat order does not wait on a
                  supplier lead time, and it means we can pull a heavier or lighter weight
                  mid-conversation when a sample shows the first choice was wrong.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Everything on the shelf is UK-sourced, made from recycled polyester, and compliant
                  with BS5852 Part 2 1982. Heavier weights above 300gsm are available on request.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <h3 className="mt-8 text-base font-semibold sm:text-lg">
                  Need a specific weight or bulk quantity?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                  Let us know in the quotation stage and we’ll arrange stock or sourcing to match your delivery date.
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

          {/* Choosing a weight: a working guide */}
          <Reveal delay={0.1} className="mt-12">
            <div className="overflow-hidden rounded-xl border border-black/8 bg-white p-4 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
                <div className="relative hidden min-h-[300px] overflow-hidden rounded-lg lg:block">
                  <Image
                    src={`${IMG}/Rectangle 23.png`}
                    alt="Wadding weight samples showing thickness variation"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    Choosing a weight: a working guide
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                    Weight is the decision that determines drape, warmth, structure and feel. Pick the weight first; pattern and colour follow.
                  </p>

                  <ul className="mt-6 space-y-4">
                    {weightGuide.map((item) => (
                      <li key={item.range} className="flex gap-4">
                        <span className="min-w-fit rounded bg-brand-ink/10 px-3 py-1 text-xs font-semibold text-brand-ink">
                          {item.range}
                        </span>
                        <span className="text-sm leading-relaxed text-brand-muted">{item.uses}</span>
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
              <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-brand-muted">
                Heavier waddings need larger patterns, because a tight stitch grid compresses the
                loft you have just paid for. Specify 300gsm with 1¼&quot; box quilting and you get a
                stiff, thin panel that performs worse than 200gsm at 4&quot;. We would rather have
                that conversation at quote stage than after a production run. Send the finished
                performance you are after and we will work back to a weight and pattern pairing.
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
                  alt="Operator inspecting wadding quality"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ServiceMarquee currentHref="/services/wadding-and-fillings" />

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
