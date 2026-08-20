import type { Metadata } from 'next'
import Image from 'next/image'
import PageHero from '@/components/layout/PageHero'
import QuoteCta from '@/components/layout/QuoteCta'
import { RevealGroup, RevealItem } from '@/components/motion/Reveal'

export const metadata: Metadata = {
  title: 'Our Team — A.N. Standard Ltd.',
  description:
    'The people who answer the phone are the people who run the machines. Meet the team behind A.N. Standard Ltd.',
}

/**
 * Names and roles are still to be supplied, so each slot renders the shared
 * placeholder portrait with a "Name & Role" caption.
 */
const team = [
  { id: 'member-1', name: 'Name & Role' },
  { id: 'member-2', name: 'Name & Role' },
  { id: 'member-3', name: 'Name & Role' },
  { id: 'member-4', name: 'Name & Role' },
  { id: 'member-5', name: 'Name & Role' },
]

const PORTRAIT =
  '/images/team/657727f13b1b4f1e9c9de2a0_WhatsApp Image 2023-12-11 at 15.16.47_acc79fa1-p-800.png'

export default function OurTeamPage() {
  return (
    <>
      <PageHero
        align="left"
        title="Our Team"
        intro="The people who answer the phone are the people who run the machines."
        image="/images/team/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png"
        imageAlt="A machinist guiding quilted tartan fabric through a sewing machine"
      />

      <section className="section bg-brand-cream">
        <div className="container">
          <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((member) => (
              <RevealItem key={member.id}>
                <figure className="group relative overflow-hidden rounded-xl bg-[#EDEDEE] shadow-card">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={PORTRAIT}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-brand-ink">
                    {member.name}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12">
            <QuoteCta />
          </div>
        </div>
      </section>
    </>
  )
}
