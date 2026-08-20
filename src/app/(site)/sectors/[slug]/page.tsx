import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SectorDetail, { type RelatedSector } from '@/components/sectors/SectorDetail'
import { getSector, getSectors } from '@/lib/cms/queries'
import { imageSrc, stringList, list, text } from '@/lib/cms/fallbacks'
import { resolveIcon } from '@/lib/cms/icons'

/**
 * Database-driven sector page. Adding a sector in the admin creates its page
 * here without any new file.
 *
 * The nine original sectors still have their own hardcoded routes, which take
 * precedence over this one in Next's routing; this handles anything the client
 * adds. Those files can be deleted once their content is confirmed in the CMS.
 */

/**
 * Revalidate on a timer as well as on save: pages built from
 * generateStaticParams are otherwise fully static, and revalidatePath alone
 * does not rebuild them.
 */
export const revalidate = 60

export async function generateStaticParams() {
  const sectors = await getSectors()
  return sectors.map((sector) => ({ slug: sector.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const sector = await getSector(params.slug)
  if (!sector) return {}

  return {
    title: text(sector.meta_title, `${sector.title} — A.N. Standard Ltd.`),
    description: text(sector.meta_description, sector.listing_card_teaser),
  }
}

export default async function SectorPage({ params }: { params: { slug: string } }) {
  const [sector, allSectors] = await Promise.all([getSector(params.slug), getSectors()])

  if (!sector) notFound()

  // Named siblings first, then fill from the rest of the list so the row is
  // always complete even if the client names fewer than three.
  const namedSlugs = stringList(sector.related_sectors)
  const named = namedSlugs
    .map((slug) => allSectors.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const filler = allSectors.filter(
    (s) => s.slug !== sector.slug && !namedSlugs.includes(s.slug)
  )

  const relatedSectors: RelatedSector[] = [...named, ...filler]
    .slice(0, 3)
    .map((s) => ({
      href: `/sectors/${s.slug}`,
      name: s.title,
      body: s.listing_card_teaser,
      icon: resolveIcon(s.icon),
    }))

  const heroSrc = imageSrc(sector.hero_image)

  return (
    <SectorDetail
      currentHref={`/sectors/${sector.slug}`}
      accent={text(sector.hero_heading, sector.title)}
      intro={text(sector.hero_subtitle, sector.listing_card_teaser)}
      heroImage={{
        src: heroSrc ?? '/images/sectors/Group 302.png',
        alt: text(sector.hero_image_alt, sector.title),
      }}
      sectionTitle={text(sector.intro_heading, `Quilting for ${sector.title.toLowerCase()}`)}
      paragraphs={stringList(sector.intro_paragraphs)}
      specs={list(sector.specs)}
      banner={{
        heading: text(sector.fabrics_heading, 'Fabrics we quilt'),
        body: stringList(sector.fabrics_text),
        image: {
          src:
            imageSrc(sector.fabrics_image) ??
            '/images/sectors/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png',
          alt: text(sector.fabrics_image_alt, 'Close-up of a patchwork quilt in many colours'),
        },
      }}
      fillings={{
        heading: text(sector.fillings_heading, 'Fillings and waddings'),
        body: stringList(sector.fillings_text),
      }}
      evidence={{
        heading: text(sector.evidence_heading, 'What we can evidence'),
        body: stringList(sector.evidence_intro),
        list: stringList(sector.evidence_list),
        image: {
          src: imageSrc(sector.side_image) ?? heroSrc ?? '/images/sectors/Group 302.png',
          alt: text(sector.side_image_alt, sector.title),
        },
      }}
      relatedSectors={relatedSectors}
    />
  )
}
