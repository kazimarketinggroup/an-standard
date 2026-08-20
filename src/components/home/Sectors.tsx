import { getHomePage, getSectors } from '@/lib/cms/queries'
import { text } from '@/lib/cms/fallbacks'
import { sectors as fallbackSectors } from '@/lib/sectors'
import SectorsClient, { type SectorTab } from './SectorsClient'

export default async function Sectors() {
  const [home, dbSectors] = await Promise.all([getHomePage(), getSectors()])

  let tabs: SectorTab[] =
    dbSectors.length > 0
      ? dbSectors.map((sector) => ({
          name: sector.title,
          blurb: text(sector.home_blurb, sector.listing_card_teaser),
          href: `/sectors/${sector.slug}`,
          icon: sector.icon,
        }))
      : fallbackSectors.map((sector) => ({
          name: sector.name,
          blurb: sector.blurb,
          href: sector.href,
          // The fallback list holds components; the client resolves by key, so
          // pass an empty key and let it fall back to the default glyph.
          icon: '',
        }))

  // The admin can promote one sector to open first.
  const featured = text(home?.featured_sector_slug)
  if (featured) {
    const index = tabs.findIndex((tab) => tab.href === `/sectors/${featured}`)
    if (index > 0) {
      tabs = [tabs[index], ...tabs.filter((_, i) => i !== index)]
    }
  }

  return (
    <SectorsClient
      heading={text(home?.sectors_heading, 'Nine industries, one factory')}
      intro={text(
        home?.sectors_intro,
        'The right pattern depends on what the finished product has to do. A funeral supplier and an equestrian manufacturer are quilting for entirely different reasons, and we’ve been doing both for decades.'
      )}
      sectors={tabs}
    />
  )
}
