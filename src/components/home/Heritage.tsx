import Image from 'next/image'
import { getGlobalSettings, getHomePage } from '@/lib/cms/queries'
import { stringList, text } from '@/lib/cms/fallbacks'
import { multiline } from '@/lib/cms/render'
import { site } from '@/lib/site'
import Reveal from '../motion/Reveal'
import { PhoneIcon } from '../ui/Icons'

const FALLBACK_PARAGRAPHS = [
  'Since then we’ve acquired another quilting company, which brought additional machines, additional patterns and more capacity than we’ve had at any point in our history. It also brought a second set of customers, some of whom had been with that business as long as ours had been with us.',
  'What hasn’t changed is how the work is done. Machines are still threaded by hand. Every roll is still checked before it leaves. The people who answer the phone are the people who run the machines.',
]

export default async function Heritage() {
  const [home, settings] = await Promise.all([getHomePage(), getGlobalSettings()])

  const paragraphs = stringList(home?.history_paragraphs).length
    ? stringList(home?.history_paragraphs)
    : FALLBACK_PARAGRAPHS

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src="/images/home/vecteezy_ai-generated-a-female-s-hands-are-putting-stitches-at-an_37040401 1.png"
        alt="Rolls of quilted fibreglass on the factory floor"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/80 to-brand-ink/30" />

      <div className="container relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <Reveal>
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
              {multiline(text(home?.history_heading, 'Fifty years,\nthree generations'))}
            </h2>
          </Reveal>

          {paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={0.12 + i * 0.08}>
              <p className={`${i === 0 ? 'mt-6' : 'mt-5'} text-sm leading-relaxed text-white/70`}>
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.28}>
            <a
              href={text(settings?.phone_href, site.phoneHref)}
              className="btn-outline mt-8"
            >
              <PhoneIcon className="h-4 w-4" />
              {text(settings?.header_phone, site.phone)}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
