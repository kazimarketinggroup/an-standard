import Image from 'next/image'
import Link from 'next/link'
import {
  getFooterSectors,
  getFooterServices,
  getGlobalSettings,
  getNavItems,
} from '@/lib/cms/queries'
import { imageSrc, text } from '@/lib/cms/fallbacks'
import { site } from '@/lib/site'
import { isClosed, parseOpeningHours } from '@/lib/hours'
import { ArrowRightIcon, ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'

/**
 * Reads its content from the CMS, falling back to the values in lib/site.ts so
 * the footer still renders correctly before the database is configured.
 *
 * The "What we do" and "Sectors" columns are generated from the Service and
 * Sector tables' show_in_footer flag; the Company and legal links come from
 * nav_items.
 */
export default async function Footer() {
  const [settings, services, sectors, navItems] = await Promise.all([
    getGlobalSettings(),
    getFooterServices(),
    getFooterSectors(),
    getNavItems(),
  ])

  const companyLinks = navItems.filter((item) => item.group_key === 'footer-company')
  const legalLinks = navItems.filter((item) => item.group_key === 'footer-legal')

  const columns = [
    {
      title: 'What we do',
      links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
      cta: { label: 'View All Services', href: '/services' },
    },
    {
      title: 'Sectors',
      links: sectors.map((s) => ({ label: s.title, href: `/sectors/${s.slug}` })),
      cta: { label: 'View All Sectors', href: '/sectors' },
    },
    {
      title: 'Company',
      links: companyLinks.map((item) => ({ label: item.label, href: item.url })),
      cta: null,
    },
  ].filter((column) => column.links.length > 0)

  const logo = imageSrc(settings?.footer_logo_image) ?? '/images/home/footerLogoWhite.png'
  const companyName = text(settings?.company_name, site.name)
  const phone = text(settings?.header_phone, site.phone)
  const phoneHref = text(settings?.phone_href, site.phoneHref)
  const whatsapp = text(settings?.topbar_whatsapp, site.whatsapp)
  const whatsappHref = text(settings?.whatsapp_href, site.whatsappHref)
  const email = text(settings?.topbar_email, site.email)
  const emailHref = text(settings?.email_href, site.emailHref)
  const hours = text(settings?.office_hours, site.hours)
  const openingHours = parseOpeningHours(hours)

  return (
    <footer className="bg-black text-white">
      <div className="container py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
          <div>
            <Link href="/" aria-label={companyName} className="inline-block">
              <Image
                src={logo}
                alt={companyName}
                width={412}
                height={96}
                className="block h-auto w-[180px] sm:w-[220px]"
              />
            </Link>
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-white/60">
              <p>{text(settings?.address_line1, site.address.line1)}</p>
              <p>{text(settings?.address_line2, site.address.line2)}</p>
            </address>
            <p className="mt-4 text-sm text-white/60">
              {text(settings?.tagline, site.tagline)}
            </p>
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
                <a href={phoneHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-brand-red" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-brand-red" />
                  <span className="whitespace-nowrap">WhatsApp {whatsapp}</span>
                </a>
              </li>
              <li>
                <a href={emailHref} className="flex items-center gap-2.5 transition-colors hover:text-white">
                  <MailIcon className="h-4 w-4 shrink-0 text-brand-red" />
                  <span className="whitespace-nowrap">{email}</span>
                </a>
              </li>
            </ul>

            {openingHours.length > 0 ? (
              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <h4 className="flex items-center gap-2.5 text-sm font-semibold text-white">
                  <ClockIcon className="h-4 w-4 shrink-0 text-brand-red" />
                  Opening hours
                </h4>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {openingHours.map(({ day, time }) => {
                    const closed = isClosed(time)
                    return (
                      <div key={day} className="flex items-baseline gap-2">
                        <dt className="shrink-0 text-white/60">{day}</dt>
                        <span
                          aria-hidden
                          className="min-w-3 flex-1 translate-y-[-0.2em] border-b border-dotted border-white/20"
                        />
                        <dd
                          className={`shrink-0 whitespace-nowrap tabular-nums ${
                            closed ? 'text-white/40' : 'text-white/90'
                          }`}
                        >
                          {time}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            ) : (
              <p className="mt-6 flex items-center gap-2.5 text-sm text-white/60">
                <ClockIcon className="h-4 w-4 shrink-0 text-brand-red" />
                {hours}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            {text(
              settings?.footer_copyright_text,
              `© ${new Date().getFullYear()} A.N Standard Ltd`
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {(legalLinks.length > 0
              ? legalLinks.map((item) => ({ label: item.label, href: item.url }))
              : [
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Responsible Disclosure', href: '/responsible-disclosure' },
                  { label: 'Terms & Condition', href: '/terms' },
                ]
            ).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
