import Image from 'next/image'
import Link from 'next/link'
import Reveal from '../motion/Reveal'

export default function ContactCta() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
          <Reveal direction="right" className="h-full">
            <div className="flex h-full flex-col justify-center overflow-hidden rounded-2xl bg-brand-navy p-8 sm:p-12 lg:p-14">
              <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Tell us what you need quilting
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
                Send us your fabric type, filling, width and quantity and we’ll come back with a
                price. If you’re not sure what you need, call us — that conversation is usually
                quicker than a form.
              </p>
              <div>
                <Link href="/quote" className="btn-primary mt-8">
                  Request A Quote
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="h-full">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72 lg:h-full lg:min-h-[340px]">
              <Image
                src="/images/home/image-36 1.png"
                alt="Quilted tartan fabric with a raw edge"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
