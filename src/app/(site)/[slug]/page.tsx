import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLegalPage, getLegalPages } from '@/lib/cms/queries'
import { sanitizeHtml } from '@/lib/cms/sanitize'
import { text } from '@/lib/cms/fallbacks'

/**
 * The legal pages (/privacy-policy, /terms, /responsible-disclosure).
 *
 * This is a root-level catch-all, so it only ever matches slugs that no other
 * route claims; anything not present in legal_pages 404s.
 */

/**
 * Revalidate on a timer as well as on save: pages built from
 * generateStaticParams are otherwise fully static, and revalidatePath alone
 * does not rebuild them.
 */
export const revalidate = 60

export async function generateStaticParams() {
  const pages = await getLegalPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getLegalPage(params.slug)
  if (!page) return {}

  return {
    title: text(page.meta_title, `${page.title} — A.N. Standard Ltd.`),
    description: page.meta_description,
  }
}

export default async function LegalPageRoute({ params }: { params: { slug: string } }) {
  const page = await getLegalPage(params.slug)
  if (!page) notFound()

  const html = sanitizeHtml(page.body_content)

  return (
    <section className="section bg-white">
      <div className="container max-w-3xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{page.title}</h1>

        {html ? (
          <div
            className="mt-8 text-sm leading-relaxed text-brand-muted sm:text-[15px]
                       [&_a]:text-brand-red [&_a]:underline [&_a]:underline-offset-4
                       [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_p]:mb-5
                       [&_strong]:font-semibold [&_strong]:text-brand-ink
                       [&_ul]:list-disc [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="mt-8 text-sm leading-relaxed text-brand-muted">
            This page has not been published yet.
          </p>
        )}
      </div>
    </section>
  )
}
