import Image from 'next/image'
import Link from 'next/link'
import Reveal, { RevealGroup, RevealItem } from '../motion/Reveal'
import { ArrowRightIcon } from '../ui/Icons'

type Service = {
  title: string
  body: string
  href: string
  /** Empty renders a solid navy panel instead of a photo. */
  image: string
  cta: string
}

const services: Service[] = [
  {
    title: 'Commission quilting',
    body: 'Send us your fabric and filling. We quilt it to your pattern and send it back.',
    href: '/services/commission-quilting',
    image: '/images/home/Rectangle 29.png',
    cta: 'Learn More',
  },
  {
    title: 'Wadding and fillings',
    body: 'UK-sourced polyester wadding from 70gsm to 300gsm, held in stock. Or we quilt yours.',
    href: '/services/wadding-and-fillings',
    image: '/images/home/Rectangle 29 (1).png',
    cta: 'Learn More',
  },
  {
    title: 'Bespoke patterns',
    body: 'Our machines are computerised. If you have a pattern in mind that isn’t in our book, we can usually make it.',
    href: '/services/bespoke-pattern-design',
    image: '/images/home/Rectangle 30.png',
    cta: 'Learn More',
  },
  {
    title: 'Wide-width Quilting',
    body: 'Long-arm machines built for oversized quilts. No piecing panels together — we quilt king-size and larger in a single continuous run.',
    href: '/services/wide-width-quilting',
    image: '/images/home/Rectangle 31.png',
    cta: 'Learn More',
  },
  {
    title: 'Customer-supplied materials',
    body: 'Already have your fabric and wadding? Send it over and we’ll quilt to your spec, no need to buy through us.',
    href: '/services/customer-supplied-materials',
    image: '/images/home/Rectangle 32.png',
    cta: 'Learn More',
  },
  {
    title: 'Our Process',
    body: 'From first sample to final delivery — see how a job moves through the workshop, and what to expect at each stage.',
    href: '/process',
    image: '',
    cta: 'See Our Process',
  },
]

/**
 * At rest the card shows only its title, pinned to the bottom. On hover (or
 * keyboard focus) the title lifts to the top and the body + CTA fade in
 * beneath it. Touch devices get the expanded state permanently, since there
 * is no hover there to reveal it.
 */
function ServiceCard({ service }: { service: Service }) {
  const hasImage = Boolean(service.image)

  return (
    <Link
      href={service.href}
      className="group relative isolate block min-h-[240px] overflow-hidden rounded-xl
                 shadow-card transition-shadow duration-300 hover:shadow-lift
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red
                 focus-visible:ring-offset-2 sm:min-h-[260px]"
    >
      {hasImage ? (
        <>
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Dark wash deepens on hover so the revealed copy stays readable. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10
                       transition-colors duration-500 group-hover:from-black/85 group-hover:via-black/70
                       group-hover:to-black/55 group-focus-visible:from-black/85"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-brand-navy transition-colors duration-500 group-hover:bg-brand-navyDark" />
      )}

      <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6 sm:min-h-[260px]">
        <h3 className="text-base font-semibold text-white sm:text-lg">{service.title}</h3>

        {/*
          Collapsed to zero height at rest and expanded on hover. grid-rows
          keeps the transition smooth without hard-coding the body height.
        */}
        <div
          className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out
                     group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]
                     [@media(hover:none)]:grid-rows-[1fr]"
        >
          <div className="overflow-hidden">
            <p
              className="pt-3 text-[13px] leading-relaxed text-white/0 transition-colors duration-500
                         group-hover:text-white/75 group-focus-visible:text-white/75
                         [@media(hover:none)]:text-white/75"
            >
              {service.body}
            </p>

            <span
              className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white/0
                         transition-colors duration-500 group-hover:text-white
                         group-focus-visible:text-white [@media(hover:none)]:text-white"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              {service.cta}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Services() {
  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal>
          <h2 className="max-w-3xl text-2xl font-semibold sm:text-3xl lg:text-[2rem]">
            Quilting, from a single roll to a full production run
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted">
            We quilt fabric on multi-needle lock stitch machines. Lock stitch gives a stronger, more
            stable stitch than the alternatives, which matters when the finished product has to
            survive laundering, wear, or years of use.
          </p>
        </Reveal>

        <RevealGroup className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {services.map((service) => (
            <RevealItem key={service.title}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
