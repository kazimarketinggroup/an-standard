import Link from 'next/link'
import Reveal, { RevealGroup, RevealItem } from '../motion/Reveal'

const steps = [
  'Fabric in, rerolled and allocated.',
  'Wadding selected.',
  'Machines threaded by hand.',
  'Every roll checked for thread breaks and slips before it leaves us.',
]

export default function Process() {
  return (
    <section className="section bg-white">
      <div className="container grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-[2rem]">
              From fabric arriving
              <br className="hidden sm:block" /> to despatch
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
              <RevealItem key={step}>
                <li className="flex gap-4 border-b border-black/8 pb-5 last:border-0">
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-red">
                    {i + 1}.
                  </span>
                  <p className="text-sm leading-relaxed text-brand-muted">{step}</p>
                </li>
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  )
}
