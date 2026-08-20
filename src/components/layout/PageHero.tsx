import Image from 'next/image'
import { cn } from '../../lib/utils'

type Stat = { label: string; value: string }

type PageHeroProps = {
  title: React.ReactNode
  intro?: string
  image: string
  imageAlt: string
  /** Optional stats bar rendered below the intro, matching the home hero. */
  stats?: Stat[]
  /** Shows the quality seal above the title. */
  seal?: boolean
  /** Landing pages centre their hero; detail pages align left. */
  align?: 'center' | 'left'
  /** Optional buttons rendered below the intro. */
  actions?: React.ReactNode
  /**
   * "split" is a light hero: dark text on white with the image as a rounded
   * card beside it, rather than white text over a full-bleed darkened photo.
   */
  variant?: 'overlay' | 'split'
}

/**
 * Centred hero used by interior pages. Animation is CSS rather than
 * framer-motion so above-the-fold content is visible without JS.
 */
export default function PageHero({
  title,
  intro,
  image,
  imageAlt,
  stats,
  seal = false,
  align = 'center',
  actions,
  variant = 'overlay',
}: PageHeroProps) {
  const centred = align === 'center'

  if (variant === 'split') {
    return (
      <section className="bg-[#FAF8F5]">
        <div className="container grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="min-w-0">
            {seal && (
              <Image
                src="/images/about/quality-icon-1019x1024 1.png"
                alt="100% quality product guaranteed"
                width={140}
                height={140}
                className="hero-rise mb-6 h-16 w-16 lg:h-20 lg:w-20"
              />
            )}

            <h1 className="hero-rise max-w-xl text-3xl font-semibold leading-[1.4] tracking-tight text-neutral-900 sm:text-4xl lg:text-[34px]">
              {title}
            </h1>

            {intro && (
              <p
                className="hero-rise mt-6 max-w-lg text-base leading-relaxed text-neutral-700"
                style={{ animationDelay: '0.15s' }}
              >
                {intro}
              </p>
            )}

            {actions && (
              <div
                className="hero-rise mt-8 flex flex-wrap gap-3"
                style={{ animationDelay: '0.25s' }}
              >
                {actions}
              </div>
            )}
          </div>

          <div
            className="hero-rise relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm lg:rounded-3xl"
            style={{ animationDelay: '0.1s' }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className={cn('absolute inset-0', centred ? 'bg-brand-ink/72' : 'bg-brand-ink/55')} />
      <div
        className={cn(
          'absolute inset-0',
          centred
            ? 'bg-gradient-to-t from-brand-ink/70 via-transparent to-brand-ink/40'
            : 'bg-gradient-to-r from-brand-ink/85 via-brand-ink/45 to-transparent'
        )}
      />

      <div
        className={cn(
          'container relative flex min-h-[600px] flex-col justify-center py-14 sm:min-h-[600px] lg:min-h-[600px] lg:py-16',
          centred ? 'items-center text-center' : 'items-start text-left'
        )}
      >
        {seal && (
          <Image
            src="/images/about/quality-icon-1019x1024 1.png"
            alt="100% quality product guaranteed"
            width={140}
            height={140}
            className="hero-rise mb-6 h-20 w-20 opacity-95 lg:h-24 lg:w-24"
          />
        )}

        <h1
          className="hero-rise text-3xl font-semibold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
          style={{ animationDelay: seal ? '0.1s' : undefined }}
        >
          {title}
        </h1>

        {intro && (
          <p
            className="hero-rise mt-5 max-w-xl text-sm leading-relaxed text-white/75"
            style={{ animationDelay: '0.2s' }}
          >
            {intro}
          </p>
        )}

        {actions && (
          <div
            className={cn(
              'hero-rise mt-8 flex flex-wrap gap-3',
              centred && 'justify-center'
            )}
            style={{ animationDelay: '0.28s' }}
          >
            {actions}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div
            className="hero-rise mt-10 w-full rounded-lg border border-white/10 bg-white/[0.07] backdrop-blur-md"
            style={{ animationDelay: '0.32s' }}
          >
            <dl className="grid grid-cols-2 gap-y-5 px-5 py-5 text-left sm:grid-cols-4 sm:gap-y-0 sm:py-4 lg:px-7">
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
          </div>
        )}
      </div>
    </section>
  )
}