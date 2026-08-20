import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import QuoteForm from '@/components/quote/QuoteForm'

export const metadata: Metadata = {
  title: 'Request a Quote — A.N. Standard Ltd.',
  description:
    'Three short steps: about you, your specification, and anything else you want to send us. We’ll come back with a price.',
}

export default function QuotePage() {
  return (
    <>
      <PageHero
        align="left"
        title="Request A Quote"
        intro="Three short steps: about you, your specification, and anything else you want to send us."
        image="/images/quote/vecteezy_a-stack-of-colorful-quilts_55963077 1.png"
        imageAlt="Quilting green satin fabric on a sewing machine"
      />

      <section className="section bg-[#F2F2F3]">
        <div className="container max-w-3xl">
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
