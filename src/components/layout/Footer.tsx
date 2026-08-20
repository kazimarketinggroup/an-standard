import Image from 'next/image'
import Link from 'next/link'
import { site } from '../../lib/site'
import { ArrowRightIcon, ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'

const columns = [
  {
    title: 'What we do',
    links: [
      { label: 'Commission quilting', href: '/services/commission-quilting' },
      { label: 'Bespoke patterns', href: '/services/bespoke-pattern-design' },
      { label: 'Wadding and fillings', href: '/services/wadding-and-fillings' },
      { label: 'Quilted fibreglass', href: '/quilted-insulation' },
    ],
    cta: { label: 'View All Services', href: '/services' },
  },
  {
    title: 'Sectors',
    links: [
      { label: 'Healthcare', href: '/sectors/healthcare' },
      { label: 'Soft furnishings', href: '/sectors/soft-furnishings' },
      { label: 'Funeral supplies', href: '/sectors/funeral-supplies' },
      { label: 'Nursery', href: '/sectors/nursery' },
      { label: 'Clothing', href: '/sectors/clothing' },
    ],
    cta: { label: 'View All Sectors', href: '/sectors' },
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Quilted Insulation', href: '/quilted-insulation' },
      { label: 'Patterns', href: '/patterns' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label={site.name} className="inline-block">
              {/* White cut-out of footerLogo.png, whose artwork is knocked out
                  of a solid black plate and so vanishes on the black footer. */}
              <Image
                src="/images/home/footerLogoWhite.png"
                alt={site.name}
                width={412}
                height={96}
                className="block h-auto w-[180px] sm:w-[220px]"
              />
            </Link>
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-white/60">
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
            </address>
            <p className="mt-4 text-sm text-white/60">{site.tagline}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.cta && (
                <Link
                  href={col.cta.href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white
                             transition-colors hover:text-brand-red"
                >
                  {col.cta.label}
                  <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brand-red" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-brand-red" />
                  WhatsApp {site.whatsapp}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-start gap-2.5 transition-colors hover:text-white">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon className="h-4 w-4 shrink-0 text-brand-red" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} A.N Standard Ltd</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/responsible-disclosure" className="transition-colors hover:text-white">
              Responsible Disclosure
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
