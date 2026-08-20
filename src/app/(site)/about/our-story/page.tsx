import type { Metadata } from 'next'
import PageHero from '@/components/layout/PageHero'
import ProsePanel from '@/components/layout/ProsePanel'
import QuoteCta from '@/components/layout/QuoteCta'

export const metadata: Metadata = {
  title: 'Our Story — A.N. Standard Ltd.',
  description:
    'A.N Standard was established in 1975 as a family business, and it has stayed one. The third generation of the family took the reins in 2021.',
}

const paragraphs = [
  'Established in 1975, we are a family based company offering commission quilting in the heart of the Midlands. With the third generation of the family having taken the reins in 2021 and recently acquiring another quilting company we are in a better position than ever to offer our customers a first class quilting service.',
  'We specialise in multi-needle quilting in a wide range of patterns for a variety of uses including apparel, bedding, equestrian and healthcare. We specialise in quilting wax fabric and are a leading supplier of quilted insulation.',
  'Our friendly team are always on hand to discuss your quilting needs. Taking you through the whole quilting process, fabric, filling and which patterns are best suited to your end application.',
  'Since then we’ve acquired another quilting company, which brought additional machines, additional patterns and more capacity than we’ve had at any point in our history. It also brought a second set of customers, some of whom had been with that business as long as ours had been with us.',
  'What hasn’t changed is how the work is done. Machines are still threaded by hand. Every roll is still checked before it leaves. The people who answer the phone are the people who run the machines.',
]

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Fifty Years Of Quilting"
        intro="A.N Standard was established in 1975 as a family business, and it has stayed one. The third generation of the family took the reins in 2021."
        image="/images/ourStory/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png"
        imageAlt="Hands guiding a quilted panel with a swirling feather pattern"
      />

      <section className="section bg-[#F2F2F3]">
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
