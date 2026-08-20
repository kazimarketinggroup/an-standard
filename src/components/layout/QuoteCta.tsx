import Link from 'next/link'
import Reveal from '../motion/Reveal'
import { WhatsAppIcon } from '../ui/Icons'
import { site } from '../../lib/site'

/** Navy "Tell us what you need quilting" panel shared by every interior page. */
export default function QuoteCta() {
  return (
    <Reveal delay={0.1}>
      <div className="rounded-2xl bg-brand-navy px-6 py-12 text-center sm:px-10 lg:py-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Tell us what you need quilting
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/70">
          Send us your fabric type, filling, width and quantity and we’ll come back with a price. If
          you’re not sure what you need, call us — that conversation is usually quicker than a form.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/quote" className="btn-primary">
            Request A Quote
          </Link>
          <a
            href={site.phoneHref}
            className="btn inline-flex items-center gap-2 rounded-md border border-white/25
                       bg-white/5 px-5 py-3 text-sm font-medium text-white transition-colors
                       hover:bg-white/15 focus-visible:ring-white"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            {site.phone}
          </a>
        </div>
      </div>
    </Reveal>
  )
}
