import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ProsePanel from '@/components/layout/ProsePanel'
import QuoteCta from '@/components/layout/QuoteCta'

export const metadata: Metadata = {
  title: 'Our Factory — A.N. Standard Ltd.',
  description:
    'Multi-needle lock stitch machines at Parkrose Industrial Estate, West Midlands. Standard quilting width 1500–1600mm, extendable to 2400mm.',
}

const paragraphs = [
  'Standard quilting width is 1500–1600mm, extendable to 2400mm. Stock polyester wadding from 70gsm to 300gsm is held on site. We run a bank of multi-needle lock stitch quilting machines, including wide-width machines for work up to 2400mm. The machines were built as mechanical quilters and have been modified over the years into computerised machines, which is what takes us beyond a fixed pattern book: the pattern is data, so a new design is a set-up rather than a new cam.',
  'Acquiring a second quilting company brought additional machines and additional patterns onto the floor, and with them more capacity than we have had at any point in our history. In practice that means we can hold a production run and a sampling job at the same time without one pushing the other back a fortnight.',
  'Alongside the quilting line there is fabric intake and rerolling, racked wadding storage, hand threading and setting, and a dedicated repair and check bench where every roll is inspected along its full length before it is wrapped. Nothing goes out on the assumption that the machine got it right.',
  'Everything is under one roof in the West Midlands. Nothing is subcontracted, nothing is quilted overseas, and customers are welcome to visit and watch their own fabric run.',
]

export default function OurFactoryPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Fifty Years Of Quilting"
        intro="Multi-needle lock stitch machines at Parkrose Industrial Estate, West Midlands."
        image="/images/factory/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png"
        imageAlt="The brick sawtooth roofline of our West Midlands factory"
      />

      <section className="section bg-brand-cream">
        <div className="container">
          <ProsePanel paragraphs={paragraphs} />
          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
