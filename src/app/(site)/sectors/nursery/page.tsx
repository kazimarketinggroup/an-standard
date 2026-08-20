import type { Metadata } from 'next'
import SectorDetail from '@/components/sectors/SectorDetail'

export const metadata: Metadata = {
  title: 'Quilting For The Nursery Sector — A.N. Standard Ltd.',
  description:
    'Nursery products are washed often and inspected closely by the people who buy them. Softness matters as much as durability.',
}

const IMG = '/images/nursery'

export default function NurserySectorPage() {
  return (
    <SectorDetail
      currentHref="/sectors/nursery"
      accent="Nursery"
      intro="Safety, softness, washability. Parent-facing product."
      heroImage={{
        src: `${IMG}/Rectangle 95.png`,
        alt: 'A pale green nursery with a cot, rocking chair and soft toys',
      }}
      sectionTitle="What Nursery Manufacturers Need From Quilting"
      paragraphs={[
        'Nursery products are washed often and inspected closely by the people who buy them. Softness matters as much as durability, and the quilting has to stay put through repeated domestic laundering.',
        'We quilt on commission only. You send fabric on the roll, we quilt it to your chosen filling on multi-needle lock stitch machines, and the finished rolls come back ready to cut. We never make competing finished products, so nothing you tell us ends up in a rival’s catalogue.',
      ]}
      specs={[
        { label: 'Standard width', value: '1500–1600mm' },
        { label: 'Maximum Width', value: '2400mm' },
        { label: 'Stock wadding', value: '70–300gsm' },
        { label: 'Stitch', value: 'Multi-needle lock stitch' },
      ]}
      banner={{
        heading: 'Fabrics we quilt for nursery',
        body: [
          'Cotton jersey, woven cotton and PU-coated fabrics. If you are unsure whether a fabric will run coated, waxed, very light or very open send us five metres and we will quilt a sample before you commit to a production quantity.',
        ],
        image: {
          src: `${IMG}/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png`,
          alt: 'Close-up of a patchwork quilt in many colours',
        },
      }}
      fillings={{
        heading: 'Fillings and waddings',
        body: [
          'Our stock polyester wadding runs from 70gsm to 300gsm, is made from recycled polyester and complies with BS5852 Part 2 1982. Heavier weights are available on request. Where an application calls for foam, felt, a natural filling or a specified flame-retardant material, we quilt customer-supplied materials as standard, with no penalty in our pricing for doing so.',
        ],
      }}
      evidence={{
        heading: "Material data we can evidence, tests we won't invent",
        body: [
          'Reaction-to-fire and durability classifications belong to a finished article and its test, not to roll goods. We supply what we can evidence and quilt panels for you to submit.',
        ],
        list: [
          'UK-sourced recycled polyester wadding to BS5852 Part 2 1982',
          'Documentation and batch traceability with any order',
          'Free sample panels for you or your test house',
          'Customer-approved or customer-supplied materials on request',
        ],
        image: {
          src: `${IMG}/laptop-screen-with-business-chart-cup-of-coffee-n-2026-03-26-04-47-39-utc 1.png`,
          alt: 'Close-up of cream quilted fabric with a wavy vertical stitch',
        },
      }}
      relatedHrefs={[
        '/sectors/soft-furnishings',
        '/sectors/funeral-supplies',
        '/sectors/workwear',
      ]}
    />
  )
}
