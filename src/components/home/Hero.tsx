import Image from 'next/image'
import Link from 'next/link'
import { PhoneIcon } from '../ui/Icons'
import { site } from '../../lib/site'

const stats = [
  { label: 'Established', value: '1975' },
  { label: 'Third generation', value: 'Family-run' },
  { label: 'Manufactured in the', value: 'West Midlands' },
  { label: 'UK-sourced wadding', value: 'held in stock' },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src="/images/home/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png"
        alt="Close-up of an autumn-toned patchwork quilt"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/95 via-brand-ink/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-brand-ink/30" />

      <div className="container relative flex min-h-[600px] flex-col justify-end pb-8 pt-24 lg:pb-10">
        <div className="max-w-xl">
          <h1 className="hero-rise text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[3.25rem]">
            Commission
            <br />
            Quilters Since 1975
          </h1>

          <p
            className="hero-rise mt-6 max-w-md text-sm leading-relaxed text-white/75"
            style={{ animationDelay: '0.15s' }}
          >
            Multi-needle lock stitch quilting up to 2400mm wide, from our factory in the West
            Midlands. Your fabric, your filling, your pattern or ours.
          </p>

          <div
            className="hero-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '0.28s' }}
          >
            <Link href="/quote" className="btn-primary">
              Request A Quote
            </Link>
            <Link href="/patterns" className="btn-outline">
              See our patterns
            </Link>
            <a href={site.phoneHref} className="btn-call">
              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>

        {/* Stats bar: translucent panel with hairline dividers, seal tucked in at the end. */}
        <div
          className="hero-rise mt-10 rounded-lg border border-white/10 bg-white/[0.07] backdrop-blur-md lg:mt-12"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="flex flex-col gap-6 px-5 py-5 sm:flex-row sm:items-center sm:gap-0 sm:py-4 lg:px-7">
            <dl className="grid flex-1 grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-y-0">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="sm:px-5 sm:first:pl-0 lg:px-7 [&+div]:sm:border-l [&+div]:sm:border-white/15"
                >
                  <dt className="text-[11px] leading-tight text-white/60">{stat.label}</dt>
                  <dd className="mt-1 text-base font-semibold text-white lg:text-[17px]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Image
              src="/images/home/quality-icon-1019x1024 1.png"
              alt="100% quality product guaranteed"
              width={140}
              height={140}
              className="hidden h-[72px] w-[72px] shrink-0 opacity-95 sm:block lg:h-20 lg:w-20"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
