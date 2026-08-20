import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import Reveal from '@/components/motion/Reveal'
import { getResourceArticle, getResourceArticles } from '@/lib/cms/queries'
import { imageSrc, list, stringList, text } from '@/lib/cms/fallbacks'

export async function generateStaticParams() {
  const articles = await getResourceArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = await getResourceArticle(params.slug)
  if (!article) return {}

  return {
    title: text(article.meta_title, `${article.title} — A.N. Standard Ltd.`),
    description: text(article.meta_description, article.listing_teaser),
  }
}

export default async function ResourceArticlePage({ params }: { params: { slug: string } }) {
  const article = await getResourceArticle(params.slug)
  if (!article) notFound()

  const sections = list(article.body_sections)

  return (
    <>
      <PageHero
        align="left"
        title={text(article.hero_heading, article.title)}
        intro={text(article.hero_intro, article.listing_teaser)}
        image={
          imageSrc(article.hero_image) ??
          imageSrc(article.listing_image) ??
          '/images/resources/Rectangle 23.png'
        }
        imageAlt={text(article.hero_image_alt, article.title)}
      />

      <section className="section bg-[#F2F2F3]">
        <div className="container">
          {sections.length > 0 && (
            <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10 lg:p-12">
              <div className="space-y-10">
                {sections.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <Reveal>
                        <h2 className="text-xl font-semibold sm:text-2xl">{section.heading}</h2>
                      </Reveal>
                    )}
                    <div className="mt-4 space-y-5">
                      {stringList(section.paragraphs).map((paragraph, j) => (
                        <Reveal key={j} delay={Math.min(j * 0.06, 0.3)}>
                          <p className="text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                            {paragraph}
                          </p>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={sections.length > 0 ? 'mt-12' : ''}>
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
