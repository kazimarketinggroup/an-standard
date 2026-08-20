import Image from 'next/image'
import Link from 'next/link'
import { getGlobalSettings, getHomePage } from '@/lib/cms/queries'
import { imageSrc, list, text } from '@/lib/cms/fallbacks'
import { multiline } from '@/lib/cms/render'
import { site } from '@/lib/site'
import { PhoneIcon } from '../ui/Icons'

const FALLBACK_STATS = [
  { label: 'Established', value: '1975' },
  { label: 'Third generation', value: 'Family-run' },
  { label: 'Manufactured in the', value: 'West Midlands' },
  { label: 'UK-sourced wadding', value: 'held in stock' },
]

const FALLBACK_BUTTONS = [
  { label: 'Request A Quote', href: '/quote', style: 'primary' },
  { label: 'See our patterns', href: '/patterns', style: 'outline' },
]

/** Maps the admin's button style choice onto the existing button classes. */
const BUTTON_CLASS: Record<string, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  call: 'btn-call',
}

export default async function Hero() {
  const [home, settings] = await Promise.all([getHomePage(), getGlobalSettings()])

  const heroImage =
    imageSrc(home?.hero_image) ??
    '/images/home/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png'

  const stats = list(home?.stat_badges).length ? list(home?.stat_badges) : FALLBACK_STATS

  const buttons = list(home?.hero_buttons).length
    ? list(home?.hero_buttons)
    : [
        ...FALLBACK_BUTTONS,
        {
          label: text(settings?.header_phone, site.phone),
          href: text(settings?.phone_href, site.phoneHref),
          style: 'call',
        },
      ]

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src={heroImage}
        alt={text(home?.hero_image_alt, 'Close-up of an autumn-toned patchwork quilt')}
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
            {multiline(text(home?.hero_title, 'Commission\nQuilters Since 1975'))}
          </h1>

          <p
            className="hero-rise mt-6 max-w-md text-sm leading-relaxed text-white/75"
            style={{ animationDelay: '0.15s' }}
          >
            {text(
              home?.hero_subtitle,
              'Multi-needle lock stitch quilting up to 2400mm wide, from our factory in the West Midlands. Your fabric, your filling, your pattern or ours.'
            )}
          </p>

          <div
            className="hero-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '0.28s' }}
          >
            {buttons.map((button, i) => {
              const className = BUTTON_CLASS[button.style] ?? 'btn-primary'

              // tel: and mailto: links need a plain anchor, not next/link.
              if (/^(tel:|mailto:|https?:)/.test(button.href)) {
                return (
                  <a key={i} href={button.href} className={className}>
                    {button.style === 'call' && (
                      <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    {button.label}
                  </a>
                )
              }

              return (
                <Link key={i} href={button.href} className={className}>
                  {button.style === 'call' && (
                    <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  {button.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Stats bar: translucent panel with hairline dividers, seal tucked in at the end. */}
        <div
          className="hero-rise mt-10 rounded-lg border border-white/10 bg-white/[0.07] backdrop-blur-md lg:mt-12"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="flex flex-col gap-6 px-5 py-5 sm:flex-row sm:items-center sm:gap-0 sm:py-4 lg:px-7">
            <dl className="grid flex-1 grid-cols-2 gap-y-5 sm:grid-cols-4 sm:gap-y-0">
              {stats.map((stat, i) => (
                <div
                  key={i}
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
