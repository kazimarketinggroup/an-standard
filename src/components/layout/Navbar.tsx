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
import { services as fallbackServices } from '@/lib/services'
import { insulationItems as fallbackInsulation } from '@/lib/insulation'
import { sectors as fallbackSectors } from '@/lib/sectors'
import { patterns as fallbackPatterns } from '@/lib/patterns'
import NavbarClient, { type NavbarData } from './NavbarClient'

const serviceIconByHref: Record<string, string> = {
  '/services/commission-quilting': 'diamondStitch',
  '/services/wide-width-quilting': 'wideStitch',
  '/services/bespoke-pattern-design': 'bespokeStitch',
  '/services/wadding-and-fillings': 'boxStitch',
  '/services/customer-supplied-materials': 'gridStitch',
}

const insulationIconByHref: Record<string, string> = {
  '/quilted-insulation/quilted-fibreglass': 'layers',
  '/quilted-insulation/fire-and-welding-blankets': 'flame',
  '/quilted-insulation/industrial-jackets': 'factory',
  '/quilted-insulation/technical-specification': 'document',
  '/quilted-insulation/fibreglass-vs-polyester': 'compare',
  '/quilted-insulation/bulk-supply': 'boxes',
  '/quilted-insulation/request-a-sample': 'diamondStitch',
}

const sectorIconByHref: Record<string, string> = {
  '/sectors/healthcare': 'heartPulse',
  '/sectors/soft-furnishings': 'sofa',
  '/sectors/funeral-supplies': 'candle',
  '/sectors/nursery': 'baby',
  '/sectors/clothing': 'shirt',
  '/sectors/automotive': 'car',
  '/sectors/pet-supplies': 'paw',
  '/sectors/workwear': 'hardHat',
  '/sectors/equestrian': 'horse',
}

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

  const menuServices =
    services.length > 0
      ? services.map((service) => ({
          title: service.title,
          tagline: service.tagline,
          href: `/services/${service.slug}`,
          icon: service.icon,
        }))
      : fallbackServices.map((service) => ({
          title: service.title,
          tagline: service.tagline,
          href: service.href,
          icon: serviceIconByHref[service.href],
        }))

  const menuInsulation =
    insulation.length > 0
      ? insulation
          .filter((item) => item.is_published)
          .map((item) => ({
            title: item.title,
            tagline: item.tagline,
            href: `/quilted-insulation/${item.slug}`,
            icon: item.icon,
          }))
      : fallbackInsulation
          .filter((item) => item.ready !== false)
          .map((item) => ({
            title: item.title,
            tagline: item.tagline,
            href: item.href,
            icon: insulationIconByHref[item.href],
          }))

  const menuSectors =
    sectors.length > 0
      ? sectors.map((sector) => ({
          title: sector.title,
          tagline: sector.tagline,
          href: `/sectors/${sector.slug}`,
          icon: sector.icon,
        }))
      : fallbackSectors.map((sector) => ({
          title: sector.name,
          tagline: sector.tagline,
          href: sector.href,
          icon: sectorIconByHref[sector.href],
        }))

  const menuPatterns =
    patterns.length > 0
      ? patterns.map((pattern) => ({
          title: text(pattern.menu_title, pattern.title),
          tagline: pattern.tagline,
          href: `/patterns/${pattern.slug}`,
          thumbnail: pattern.pattern_image,
        }))
      : fallbackPatterns.map((pattern) => ({
          title: pattern.menuTitle,
          tagline: pattern.tagline,
          href: `/patterns/${pattern.slug}`,
          thumbnail: pattern.image,
        }))

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

    services: menuServices,
    insulation: menuInsulation,
    sectors: menuSectors,
    patterns: menuPatterns,
  }

  return <NavbarClient data={data} />
}
