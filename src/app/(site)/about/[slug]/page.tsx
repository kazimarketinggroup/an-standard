import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHero from '@/components/layout/PageHero'
import ProsePanel from '@/components/layout/ProsePanel'
import QuoteCta from '@/components/layout/QuoteCta'
import TeamGrid from '@/components/about/TeamGrid'
import { getAboutSubpage, getAboutSubpages } from '@/lib/cms/queries'
import { imageSrc, list, stringList, text } from '@/lib/cms/fallbacks'
import type { TeamMember } from '@/lib/cms/types'

/**
 * Revalidate on a timer as well as on save: pages built from
 * generateStaticParams are otherwise fully static, and revalidatePath alone
 * does not rebuild them.
 */
export const revalidate = 60

export async function generateStaticParams() {
  const pages = await getAboutSubpages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getAboutSubpage(params.slug)
  if (!page) return {}

  return {
    title: text(page.meta_title, `${page.title} — A.N. Standard Ltd.`),
    description: text(page.meta_description, page.teaser),
  }
}

export default async function AboutSubPage({ params }: { params: { slug: string } }) {
  const page = await getAboutSubpage(params.slug)
  if (!page) notFound()

  const paragraphs = stringList(page.body_paragraphs)
  const team = list<TeamMember>(page.team_members).filter((member) => Boolean(member?.photo))

  return (
    <>
      <PageHero
        align="left"
        title={text(page.hero_heading, page.title)}
        intro={text(page.hero_intro, page.teaser)}
        image={
          imageSrc(page.hero_image) ??
          imageSrc(page.listing_image) ??
          '/images/about/Rectangle 23.png'
        }
        imageAlt={text(page.hero_image_alt, page.title)}
      />

      {/* The team page's grid sits on cream; the prose pages use grey. */}
      <section className={`section ${team.length > 0 ? 'bg-brand-cream' : 'bg-[#F2F2F3]'}`}>
        <div className="container">
          {paragraphs.length > 0 && <ProsePanel paragraphs={paragraphs} />}
          {team.length > 0 && <TeamGrid members={team} />}

          <div className={paragraphs.length > 0 || team.length > 0 ? 'mt-12' : ''}>
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
