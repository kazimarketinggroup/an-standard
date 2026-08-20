import Link from 'next/link'
import { getHomePage } from '@/lib/cms/queries'
import { list, text } from '@/lib/cms/fallbacks'
import { multiline } from '@/lib/cms/render'
import Reveal, { RevealGroup, RevealItem } from '../motion/Reveal'

const FALLBACK_STEPS = [
  { title: 'Fabric in, rerolled and allocated.', description: '' },
  { title: 'Wadding selected.', description: '' },
  { title: 'Machines threaded by hand.', description: '' },
  {
    title: 'Every roll checked for thread breaks and slips before it leaves us.',
    description: '',
  },
]

export default async function Process() {
  const home = await getHomePage()

  const steps = list(home?.process_steps).length ? list(home?.process_steps) : FALLBACK_STEPS

  return (
    <section className="section bg-white">
      <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2rem]">
              {multiline(text(home?.process_heading, 'From fabric arriving\nto despatch'))}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <Link href="/process" className="btn-primary mt-8">
              See how we work
            </Link>
          </Reveal>
        </div>

        <RevealGroup delay={0.1}>
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <RevealItem key={i}>
                <li className="flex gap-4 border-b border-black/8 pb-5 last:border-0">
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-red">
                    {i + 1}.
                  </span>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    {step.title}
                    {step.description ? ` ${step.description}` : ''}
                  </p>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  )
}
