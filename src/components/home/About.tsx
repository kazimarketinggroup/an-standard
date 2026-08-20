import { getHomePage } from '@/lib/cms/queries'
import { stringList, text } from '@/lib/cms/fallbacks'
import Reveal from '../motion/Reveal'

const FALLBACK_PARAGRAPHS = [
  'Established in 1975, we are a family based company offering commission quilting in the heart of the Midlands. With the third generation of the family having taken the reins in 2021 and recently acquiring another quilting company we are in a better position than ever to offer our customers a first class quilting service.',
  'We specialise in multi-needle quilting in a wide range of patterns for a variety of uses including apparel, bedding, equestrian and healthcare. We specialise in quilting wax fabric and are a leading supplier of quilted insulation.',
  'Our friendly team are always on hand to discuss your quilting needs. Taking you through the whole quilting process, fabric, filling and which patterns are best suited to your end application.',
]

export default async function About() {
  const home = await getHomePage()

  const paragraphs = stringList(home?.about_paragraphs).length
    ? stringList(home?.about_paragraphs)
    : FALLBACK_PARAGRAPHS

  return (
    <section className="section bg-brand-cream">
      <div className="container">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl lg:text-[2rem]">
            {text(home?.about_heading, 'About A.N. Standard Ltd.')}
          </h2>
        </Reveal>

        <div className="mt-8 space-y-5">
          {paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.08 * (i + 1)}>
              <p className="text-[13px] leading-relaxed text-brand-muted sm:text-sm">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
