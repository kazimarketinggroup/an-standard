import Image from 'next/image'
import { RevealGroup, RevealItem } from '../motion/Reveal'
import type { TeamMember } from '@/lib/cms/types'

/**
 * The team photo grid on /about/our-team.
 *
 * Transcribed from the hardcoded page it replaces, so the rendered markup is
 * identical for the same content. The caption previously held a single "Name &
 * Role" string; it now shows the name with the job title beneath it, and both
 * are omitted when empty so a photo-only card renders exactly as before.
 */
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null

  return (
    <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {members.map((member, i) => (
        <RevealItem key={i}>
          <figure className="group relative overflow-hidden rounded-xl bg-[#EDEDEE] shadow-card">
            <div className="relative aspect-[3/4]">
              <Image
                src={member.photo}
                alt={member.photo_alt ?? ''}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            {(member.name || member.designation) && (
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-brand-ink">
                {member.name}
                {member.designation && (
                  <span className="mt-0.5 block text-xs font-normal text-brand-muted">
                    {member.designation}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
