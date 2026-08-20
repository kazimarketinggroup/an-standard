import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Quilted Fibreglass — A.N. Standard Ltd.',
  description:
    'A fibreglass mat quilted between layers of fabric, producing a flexible insulating material that holds together in use instead of shedding or slumping.',
}

const IMG = '/images/Quilted fibreglass'

export default function QuiltedFibreglassPage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/quilted-fibreglass"
      title="Quilted Fibreglass"
      intro="A fibreglass mat quilted between layers of fabric, producing a flexible insulating material that holds together in use instead of shedding or slumping."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="Silver quilted upholstery leather with brass studs"
      sectionTitle="Why Loose Fibreglass Has To Be Quilted"
      paragraphs={[
        'Loose fibreglass insulates well and behaves badly. It slumps under its own weight, it sheds fibre into the air every time it is handled, and it loses thickness — and therefore performance — wherever it is compressed.',
        'Quilting fixes all three problems at once: the mat is captured between two facing fabrics and stitched on a grid, so the fibre stays where it was put for the life of the product.',
      ]}
      specs={[
        { label: 'Construction', value: 'Fibreglass mat quilted between two facing fabrics' },
        { label: 'Maximum Width', value: '2400mm' },
        { label: 'Facings', value: 'Woven glass cloth, coated glass, or customer-supplied' },
        { label: 'Supply', value: 'Container loads or small runs' },
      ]}
      panel={{
        heading: 'Flexible, so a fabricator can actually work with it',
        body: [
          'Because the finished material is flexible, it can be cut, sewn, eyeleted and fitted around irregular shapes on site. That is the practical difference between quilted fibreglass and rigid board: the same insulating fibre, in a form a fabricator can actually work with.',
          'We have worked together with the developer of Quilted Fibreglass and have recently taken over full manufacture of this product making us the leading supplier of quilted fibreglass.',
          'We have the facilities to take in full container loads as well as smaller quantities.',
        ],
      }}
      secondPanel={{
        heading: 'Made on the machines that made the original',
        body: [
          'We worked alongside the developer of quilted fibreglass and have since taken over its full manufacture. It is made on the same multi-needle lock stitch machines as the rest of our quilting, up to 2400mm wide, which is what allows large covers and blankets to be cut from a single piece.',
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23 (2).png`,
          alt: 'A machinist stitching a black quilted panel on a lock stitch machine',
        },
        image: {
          src: `${IMG}/Rectangle 23 (1).png`,
          alt: 'A wide roll of camouflage-patterned fabric on the quilting machine',
        },
        secondHeading: 'The build is specified, not fixed',
        secondBody: [
          'The build is specified rather than fixed. You choose the facing fabrics on both sides, the mat density, and the stitch pattern. Facings are typically woven glass cloth, silicone- or PU-coated glass, or a technical textile you supply; the pattern is usually vertical lines or a large box, both of which hold the mat evenly without over-compressing it.',
        ],
      }}
    />
  )
}
