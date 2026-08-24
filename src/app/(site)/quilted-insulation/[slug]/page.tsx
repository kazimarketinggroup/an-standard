import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import InsulationDetail from '@/components/insulation/InsulationDetail'
import { getInsulationSubpage, getInsulationSubpages } from '@/lib/cms/queries'
import { imageSrc, list, stringList, text } from '@/lib/cms/fallbacks'

/**
 * Database-driven insulation subpage. The seven original pages keep their own
 * routes; this covers anything the client adds.
 */

/**
 * Revalidate on a timer as well as on save: pages built from
 * generateStaticParams are otherwise fully static, and revalidatePath alone
 * does not rebuild them.
 */
export const revalidate = 60

export async function generateStaticParams() {
  const pages = await getInsulationSubpages()
  return pages.filter((page) => page.is_published).map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getInsulationSubpage(params.slug)
  if (!page) return {}

  return {
    title: text(page.meta_title, `${page.title} — A.N. Standard Ltd.`),
    description: text(page.meta_description, page.teaser_text),
  }
}

export default async function InsulationSubPage({ params }: { params: { slug: string } }) {
  const page = await getInsulationSubpage(params.slug)
  if (!page || !page.is_published) notFound()

  const comparison = page.comparison ?? {}
  const hasComparison =
    Array.isArray(comparison.columns) &&
    comparison.columns.length > 0 &&
    Array.isArray(comparison.rows) &&
    comparison.rows.length > 0

  return (
    <InsulationDetail
      currentHref={`/quilted-insulation/${page.slug}`}
      title={text(page.hero_heading, page.title)}
      intro={text(page.hero_intro, page.teaser_text)}
      heroImage={
        imageSrc(page.hero_image) ??
        '/images/quilted-insultation/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png'
      }
      heroImageAlt={text(page.hero_image_alt, page.title)}
      sectionTitle={text(page.body_heading, page.title)}
      paragraphs={stringList(page.body_paragraphs)}
      specs={list(page.specs)}
      panel={{
        heading: page.panel_heading,
        body: stringList(page.panel_body),
        // The closing block shares the panel card, below a divider.
        secondHeading: page.closing_heading || undefined,
        secondBody: stringList(page.closing_body).length
          ? stringList(page.closing_body)
          : undefined,
      }}
      secondPanel={
        page.second_panel_heading || stringList(page.second_panel_body).length
          ? {
              heading: page.second_panel_heading,
              body: stringList(page.second_panel_body),
              leftImage: imageSrc(page.second_panel_left_image)
                ? {
                    src: imageSrc(page.second_panel_left_image)!,
                    alt: text(page.second_panel_left_image_alt),
                  }
                : undefined,
              image: {
                src:
                  imageSrc(page.second_panel_image) ??
                  imageSrc(page.hero_image) ??
                  '/images/quilted-insultation/Rectangle 13.png',
                alt: text(page.second_panel_image_alt, page.title),
              },
              secondHeading: page.second_panel_sub_heading || undefined,
              secondBody: stringList(page.second_panel_sub_body).length
                ? stringList(page.second_panel_sub_body)
                : undefined,
            }
          : undefined
      }
      comparison={
        hasComparison
          ? {
              heading: text(comparison.heading, 'Compared side by side'),
              columns: comparison.columns as string[],
              // Rows are stored with `cells`; `values` is accepted too so a
              // row hand-written in the admin either way still renders.
              rows: (
                comparison.rows as { label: string; cells?: string[]; values?: string[] }[]
              ).map((row) => ({
                label: row.label,
                cells: row.cells ?? row.values ?? [],
              })),
            }
          : undefined
      }
    />
  )
}
