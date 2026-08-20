import {
  getGlobalSettings,
  getInsulationSubpages,
  getNavGroup,
  getPatterns,
  getSectors,
  getServices,
} from '@/lib/cms/queries'
import { imageSrc, text } from '@/lib/cms/fallbacks'
import { navLinks as fallbackNavLinks, site } from '@/lib/site'
import NavbarClient, { type NavbarData } from './NavbarClient'

/**
 * Fetches the navbar's content and hands it to the client component, which owns
 * the scroll, drawer and mega-menu behaviour.
 *
 * Everything falls back to the hardcoded values in lib/site.ts so the header
 * keeps working before Supabase is configured.
 */
export default async function Navbar() {
  const [settings, navItems, services, insulation, sectors, patterns] = await Promise.all([
    getGlobalSettings(),
    getNavGroup('header'),
    getServices(),
    getInsulationSubpages(),
    getSectors(),
    getPatterns(),
  ])

  const data: NavbarData = {
    logo: imageSrc(settings?.logo_image) ?? '/images/home/mainLogo.png',
    companyName: text(settings?.company_name, site.name),
    phone: text(settings?.header_phone, site.phone),
    phoneHref: text(settings?.phone_href, site.phoneHref),
    email: text(settings?.topbar_email, site.email),
    emailHref: text(settings?.email_href, site.emailHref),
    whatsapp: text(settings?.topbar_whatsapp, site.whatsapp),
    whatsappHref: text(settings?.whatsapp_href, site.whatsappHref),

    navLinks:
      navItems.length > 0
        ? navItems.map((item) => ({ label: item.label, href: item.url }))
        : fallbackNavLinks,

    services: services.map((service) => ({
      title: service.title,
      tagline: service.tagline,
      href: `/services/${service.slug}`,
      icon: service.icon,
    })),

    insulation: insulation
      .filter((item) => item.is_published)
      .map((item) => ({
        title: item.title,
        tagline: item.tagline,
        href: `/quilted-insulation/${item.slug}`,
        icon: item.icon,
      })),

    sectors: sectors.map((sector) => ({
      title: sector.title,
      tagline: sector.tagline,
      href: `/sectors/${sector.slug}`,
      icon: sector.icon,
    })),

    patterns: patterns.map((pattern) => ({
      title: text(pattern.menu_title, pattern.title),
      tagline: pattern.tagline,
      href: `/patterns/${pattern.slug}`,
      thumbnail: pattern.pattern_image,
    })),
  }

  return <NavbarClient data={data} />
}
