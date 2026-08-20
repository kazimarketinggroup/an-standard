import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/services/ServiceDetail'
import { getService, getServices } from '@/lib/cms/queries'
import { imageSrc, list, stringList, text } from '@/lib/cms/fallbacks'

/**
 * Database-driven service page. The five original services keep their own
 * hardcoded routes, which Next matches first; this covers anything the client
 * adds through the admin.
 */

/**
 * Revalidate on a timer as well as on save: pages built from
 * generateStaticParams are otherwise fully static, and revalidatePath alone
 * does not rebuild them.
 */
export const revalidate = 60

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const service = await getService(params.slug)
  if (!service) return {}

  return {
    title: text(service.meta_title, `${service.title} — A.N. Standard Ltd.`),
    description: text(service.meta_description, service.listing_card_teaser),
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug)
  if (!service) notFound()

  const heroImage =
    imageSrc(service.hero_image) ??
    imageSrc(service.listing_card_image) ??
    '/images/services/Rectangle 13.png'

  return (
    <ServiceDetail
      title={text(service.hero_heading, service.title)}
      intro={text(service.hero_intro, service.listing_card_teaser)}
      heroImage={heroImage}
      heroImageAlt={text(service.hero_image_alt, service.title)}
      gallery={list(service.gallery_images).filter((image) => Boolean(image?.src))}
      bodyHeading={service.body_heading}
      bodyParagraphs={stringList(service.body_paragraphs)}
      highlightHeading={service.highlight_box_heading}
      highlightText={service.highlight_box_text}
      specs={list(service.specs)}
      benefitsHeading={service.benefits_heading}
      benefitsIntro={service.benefits_intro}
      benefitsList={stringList(service.benefits_list)}
      fabrics={stringList(service.fabrics_we_quilt)}
      reasons={stringList(service.why_work_with_us)}
      videoThumbnail={imageSrc(service.video_thumbnail_image) ?? ''}
      videoUrl={service.video_url}
    />
  )
}
