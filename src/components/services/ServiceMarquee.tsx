import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { services } from '../../lib/services'
import { ArrowRightIcon } from '../ui/Icons'

type ServiceMarqueeProps = {
  currentHref: string
}

export default function ServiceMarquee({ currentHref }: ServiceMarqueeProps) {
  const otherServices = services.filter((service) => service.href !== currentHref)

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold sm:text-3xl">Other Services</h2>

      <div className="no-scrollbar mt-6 overflow-hidden">
        <div className="marquee flex w-max" style={{ '--marquee-duration': '34s' } as CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-5 pr-5">
              {otherServices.map((service) => (
                <Link
                  key={`${copy}-${service.href}`}
                  href={service.href}
                  className="group relative isolate flex h-[220px] w-[78vw] shrink-0 flex-col
                             overflow-hidden rounded-xl p-5 shadow-card transition-shadow duration-300
                             hover:shadow-lift sm:h-[220px] sm:w-[45vw] lg:h-[240px] lg:w-[31vw]"
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 78vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-ink/78 transition-colors duration-300 group-hover:bg-brand-ink/85" />

                  <div className="relative flex h-full flex-col">
                    <h3 className="text-sm font-semibold text-white sm:text-base">{service.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-white/70">{service.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-white">
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      Learn More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
