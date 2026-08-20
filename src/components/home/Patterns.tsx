import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../motion/Reveal'
import { patterns as patternList } from '../../lib/patterns'

/** Marquee cards, drawn from the shared pattern list so links stay in step. */
const patterns = patternList.map((pattern) => ({
  name: pattern.title,
  image: pattern.image,
  href: `/patterns/${pattern.slug}`,
}))

function PatternCard({ pattern }: { pattern: (typeof patterns)[number] }) {
  return (
    <Link
      href={pattern.href}
      className="group relative block w-[150px] shrink-0 overflow-hidden rounded-lg
                 sm:w-[170px] lg:w-[185px]"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={pattern.image}
          alt={pattern.name}
          fill
          sizes="185px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Keeps the overlaid caption readable against busy patterned fabric. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <h3 className="absolute inset-x-0 bottom-0 p-4 text-[13px] font-medium leading-snug text-white">
          {pattern.name}
        </h3>
      </div>
    </Link>
  )
}

export default function Patterns() {
  return (
    <section className="section relative isolate overflow-hidden bg-brand-ink">
      <Image
        src="/images/home/Rectangle 29.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-brand-ink/85" />
      {/* Faint diagonal cross-hatch, echoing a quilting stitch grid. */}
      <div className="pattern-stripes absolute inset-0" />

      <div className="relative">
        <div className="container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <Reveal className="max-w-lg">
              <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
                Choose from our pattern
                <br className="hidden sm:block" /> book, or bring your own
              </h2>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <Link href="/patterns" className="btn-primary shrink-0">
                See All Patterns
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60">
              Box, diamond, hourglass, vertical and wavy lines — in a range of sizes, with thread
              matched or deliberately contrasted. Heavier waddings need larger patterns, and we’ll
              tell you which combinations work before you commit to a run.
            </p>
          </Reveal>
        </div>

        {/*
          Full-bleed marquee. The list is rendered twice and the track slides
          exactly -50%, so the second copy lands where the first began and the
          loop is seamless. Pauses on hover so a card can be read or clicked.
        */}
        <Reveal delay={0.2}>
          <div
            className="marquee mt-9 flex gap-4 [--marquee-duration:48s] hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {[...patterns, ...patterns].map((pattern, i) => (
              <PatternCard key={`${pattern.name}-${i}`} pattern={pattern} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
