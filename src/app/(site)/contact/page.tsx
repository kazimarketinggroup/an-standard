import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/motion/Reveal'
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from '@/components/ui/Icons'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us — A.N. Standard Ltd.',
  description:
    'Questions about custom quilting, help with an order, or a partnership enquiry — our West Midlands team is here to help.',
}

const socials = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'X', href: 'https://x.com', Icon: TwitterIcon },
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedInIcon },
  { label: 'YouTube', href: 'https://youtube.com', Icon: YouTubeIcon },
]

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      <Image
        src="/images/quote/vecteezy_a-stack-of-colorful-quilts_55963077 1.png"
        alt="Quilting green satin fabric on a Brother sewing machine"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/35 to-brand-ink/70" />

      <div className="container relative py-16 lg:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
          <div>
            <Reveal>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Contact Us
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-sm text-white/85">We’d love to hear from you!</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70">
                Whether you have a question about our custom quilting services, need help with an
                order, or want to explore a partnership opportunity, our team is here to help.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8">
                <h2 className="text-base font-semibold text-white">Address:</h2>
                <address className="mt-2 max-w-md text-sm not-italic leading-relaxed text-white/70">
                  {site.address.line1} {site.address.line2}
                </address>

                <dl className="mt-5 space-y-1.5 text-sm text-white/70">
                  <div className="flex gap-2">
                    <dt>Phone:</dt>
                    <dd>
                      <a href={site.phoneHref} className="transition-colors hover:text-white">
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>WhatsApp</dt>
                    <dd>
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        {site.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt>Email:</dt>
                    <dd>
                      <a href={site.emailHref} className="transition-colors hover:text-white">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8">
                <h2 className="text-base font-semibold text-white">Business Hours</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Monday – Friday: 9:00 AM – 5:00 PM
                  <br />
                  Closed on weekends and public holidays.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8">
                <h2 className="text-base font-semibold text-white">Connect With Us</h2>
                <ul className="mt-4 flex items-center gap-5">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="block text-white/80 transition-colors hover:text-white"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.15}>
            <div className="rounded-2xl bg-brand-cream p-8 shadow-lift sm:p-10">
              <h2 className="text-xl font-semibold text-brand-ink sm:text-2xl">Request a quote</h2>
              <p className="mt-6 text-sm leading-relaxed text-brand-muted">
                Three short steps: about you, your specification, and anything else you want to send
                us.
              </p>
              <Link href="/quote" className="btn-primary mt-8">
                Request A Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
