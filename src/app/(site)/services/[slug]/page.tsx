import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceDetail from '@/components/services/ServiceDetail'
import type { MarqueeService } from '@/components/services/ServiceMarquee'
import { getService, getServices } from '@/lib/cms/queries'
import { imageSrc, list, stringList, text } from '@/lib/cms/fallbacks'
import { multiline } from '@/lib/cms/render'
import type { ExtraSection, GalleryImage } from '@/lib/cms/types'

/**
 * Every /services/… page. Adding a service in the admin creates its page here
 * without any new file.
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

/** Only pass an image through when it actually has a source. */
function image(src: string | null | undefined, alt: string): GalleryImage | null {
  const resolved = imageSrc(src)
  return resolved ? { src: resolved, alt } : null
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const [service, allServices] = await Promise.all([getService(params.slug), getServices()])
  if (!service) notFound()

  const heroImage =
    imageSrc(service.hero_image) ??
    imageSrc(service.listing_card_image) ??
    '/images/services/Rectangle 13.png'

  const otherServices: MarqueeService[] = allServices.map((item) => ({
    title: item.title,
    body: item.listing_card_teaser,
    href: `/services/${item.slug}`,
    image: imageSrc(item.listing_card_image) ?? '/images/services/Rectangle 13.png',
    alt: text(item.listing_card_alt, item.title),
  }))

  const videoUrl = text(service.video_url)

  return (
    <ServiceDetail
      currentHref={`/services/${service.slug}`}
      title={multiline(text(service.hero_heading, service.title))}
      intro={text(service.hero_intro, service.listing_card_teaser)}
      heroImage={heroImage}
      heroImageAlt={text(service.hero_image_alt, service.title)}
      heroButtons={list(service.hero_buttons)}
      swatches={list<GalleryImage>(service.swatches).filter((s) => Boolean(s?.src))}
      bodyHeading={service.body_heading}
      bodyParagraphs={stringList(service.body_paragraphs)}
      highlightHeading={service.highlight_box_heading}
      highlightText={service.highlight_box_text}
      specs={list(service.specs)}
      panel={{
        heading: multiline(text(service.panel_heading)),
        intro: service.panel_intro,
        // Kept raw: the pill style needs the {label,value} pairs intact.
        list: list(service.panel_list),
        layout: text(service.panel_layout, 'three-column'),
        listStyle: text(service.panel_list_style, 'bullets'),
        leftImage: image(service.panel_left_image, text(service.panel_left_image_alt)),
        rightImage: image(service.panel_right_image, text(service.panel_right_image_alt)),
        footnote: service.panel_footnote,
        ctaLabel: service.panel_cta_label,
        ctaHref: service.panel_cta_href,
      }}
      fabricsHeading={text(service.fabrics_heading, 'Fabrics We Quilt')}
      fabricsIntro={service.fabrics_intro}
      fabrics={stringList(service.fabrics_we_quilt)}
      whyHeading={text(service.why_heading, 'Why Work With Us?')}
      whyIntro={service.why_intro}
      reasons={stringList(service.why_work_with_us)}
      video={
        videoUrl
          ? {
              thumbnail: imageSrc(service.video_thumbnail_image) ?? '',
              url: videoUrl,
              label: text(service.video_label, 'See our work process'),
              caption: text(service.video_caption, 'Youtube'),
            }
          : null
      }
      sideImage={image(service.side_image, text(service.side_image_alt))}
      extraSections={list<ExtraSection>(service.extra_sections)}
      otherServices={otherServices}
    />
  )
}
