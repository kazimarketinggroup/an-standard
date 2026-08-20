import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import Reveal, { RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { getProcessPage } from '@/lib/cms/queries'
import { imageSrc, list, text } from '@/lib/cms/fallbacks'

export const metadata: Metadata = {
  title: 'Our Quilting Process — A.N. Standard Ltd.',
  description:
    'Six steps from fabric arrival to despatch: intake, filling allocated, threads selected, machines threaded, quilting, and inspection. Every roll checked before it leaves.',
}

const IMG = '/images/our-process'

/** Source files share one stock-photo name, differing only by the (n) suffix. */
const STEP_IMAGE = (n: number) =>
  `${IMG}/light-blue-and-white-abstract-background-2026-01-07-05-58-29-utc 3${
    n === 0 ? '' : ` (${n})`
  }.png`

const FALLBACK_STEPS = [
  {
    title: 'Fabric in',
    description: 'Your fabric arrives, is rerolled if it needs to be, and is allocated to a machine.',
    image: STEP_IMAGE(0),
    alt: 'Rolls of blue, pink and cream fabric on the intake bench',
  },
  {
    title: 'Filling allocated',
    description: "We select your wadding from stock, or allocate the filling you've supplied.",
    image: STEP_IMAGE(1),
    alt: 'Racked and labelled rolls of wadding in the store',
  },
  {
    title: 'Threads and bobbins selected',
    description: "Matched to your fabric, or deliberately contrasted if that's the look you want.",
    image: STEP_IMAGE(2),
    alt: 'Cones of thread and wound bobbins on a quilted panel',
  },
  {
    title: 'Machines set and threaded',
    description: 'By hand, every time. Needles threaded, fabric and wadding loaded.',
    image: STEP_IMAGE(3),
    alt: 'The needle bar of a multi-needle quilting machine mid-run',
  },
  {
    title: 'Quilting',
    description: 'Multi-needle lock stitch, up to 2400mm wide.',
    image: STEP_IMAGE(4),
    alt: 'A machinist guiding a quilted panel through the machine',
  },
  {
    title: 'Repair and check',
    description:
      "Every roll is checked for thread breaks and slips before it leaves us. This is the stage most people don't ask about and the one that determines whether you get a usable roll.",
    image: STEP_IMAGE(5),
    alt: 'Inspecting a finished roll of quilted fabric before despatch',
  },
]

export default async function ProcessPage() {
  const page = await getProcessPage()

  const dbSteps = list(page?.steps)
  const processSteps =
    dbSteps.length > 0
      ? dbSteps.map((step, i) => ({
          title: step.title,
          description: step.description,
          image: imageSrc(step.image) ?? STEP_IMAGE(i),
          alt: step.title,
        }))
      : FALLBACK_STEPS

  return (
    <>
      <PageHero
        align="left"
        title={text(page?.hero_heading, 'From Fabric Arriving To Despatch')}
        intro={text(page?.hero_intro, 'Every order follows the same careful steps. Each one handled by hand, checked at every stage, and finished to a standard that keeps customers coming back.')}
        image={imageSrc(page?.hero_image) ?? `${IMG}/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png`}
        imageAlt="Quilted fabric running under the needle bar of a long-arm machine"
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

      <section className="section bg-white">
        <div className="container">
          <RevealGroup className="space-y-5">
            {processSteps.map((step) => (
              <RevealItem key={step.title}>
                <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-5 lg:grid-cols-[260px_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-card sm:aspect-auto sm:min-h-[150px]">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 220px, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-center rounded-xl bg-[#F4F4F5] p-6 sm:p-8">
                    <h2 className="text-lg font-semibold text-brand-ink sm:text-xl">
                      {step.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section bg-brand-cream">
        <div className="container">
          <QuoteCta />
        </div>
      </section>
    </>
  )
}

/** Rebuilt on save, and on this timer as a backstop. */
export const revalidate = 60
