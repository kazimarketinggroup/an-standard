import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import QuoteForm from '@/components/quote/QuoteForm'
import { getQuotePage } from '@/lib/cms/queries'
import { imageSrc, stringList, text } from '@/lib/cms/fallbacks'

export const metadata: Metadata = {
  title: 'Request a Quote — A.N. Standard Ltd.',
  description:
    'Three short steps: about you, your specification, and anything else you want to send us. We’ll come back with a price.',
}

export default async function QuotePage() {
  const page = await getQuotePage()
  const stepLabels = stringList(page?.step_labels)

  return (
    <>
      <PageHero
        align="left"
        title={text(page?.heading, 'Request A Quote')}
        intro={text(page?.intro_text, 'Three short steps: about you, your specification, and anything else you want to send us.')}
        image={imageSrc(page?.hero_image) ?? '/images/quote/vecteezy_a-stack-of-colorful-quilts_55963077 1.png'}
        imageAlt="Quilting green satin fabric on a sewing machine"
      />

      <section className="section bg-[#F2F2F3]">
        <div className="container max-w-3xl">
          <QuoteForm stepLabels={stepLabels.length === 3 ? stepLabels : undefined} successHeading={page?.success_heading} successText={page?.success_text} />
        </div>
      </section>
    </>
  )
}

/** Rebuilt on save, and on this timer as a backstop. */
export const revalidate = 60
