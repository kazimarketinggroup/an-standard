import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../motion/Reveal'

export default function Insulation() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src="/images/home/vecteezy_a-stack-of-colorful-quilts_55963077 1.png"
        alt="Quilting a green panel on a lock stitch machine"
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/20 lg:to-transparent" />

      <div className="container relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <Reveal>
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
              The UK’s leading supplier
              <br className="hidden sm:block" /> of quilted fibreglass
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              We worked alongside the developer of quilted fibreglass and have since taken over its
              full manufacture. We can take in full container loads or supply smaller quantities —
              the minimum order does not have to be large.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <Link href="/quilted-insulation" className="btn-primary mt-8">
              Explore quilted insulation
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
