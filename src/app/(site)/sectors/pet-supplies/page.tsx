import type { Metadata } from 'next'
import SectorDetail from '@/components/sectors/SectorDetail'

export const metadata: Metadata = {
  title: 'Quilting For The Pet Supplies Sector — A.N. Standard Ltd.',
  description:
    'Pet bedding gets chewed, dragged and washed. The quilting needs to hold a heavy filling in place at a price that still works on a bedding product.',
}

const IMG = '/images/pet supplies'

export default function PetSuppliesSectorPage() {
  return (
    <SectorDetail
      currentHref="/sectors/pet-supplies"
      accent="Pet Supplies"
      intro="Durability and cost. Bedding that gets chewed and washed."
      heroImage={{
        src: `${IMG}/Rectangle 95.png`,
        alt: 'A beagle sitting on a round pet bed under a soft blanket',
      }}
      sectionTitle="What Pet Supplies Manufacturers Need From Quilting"
      paragraphs={[
        'Pet bedding gets chewed, dragged and washed. The quilting needs to hold a heavy filling in place at a price that still works on a bedding product, which usually means a larger pattern and a robust stitch.',
        'We quilt on commission only. You send fabric on the roll, we quilt it to your chosen filling on multi-needle lock stitch machines, and the finished rolls come back ready to cut. We never make competing finished products, so nothing you tell us ends up in a rival’s catalogue.',
      ]}
      specs={[
        { label: 'Standard width', value: '1500–1600mm' },
        { label: 'Maximum Width', value: '2400mm' },
        { label: 'Stock wadding', value: '70–300gsm' },
        { label: 'Stitch', value: 'Multi-needle lock stitch' },
      ]}
      banner={{
        heading: 'Fabrics we quilt for pet supplies',
        body: [
          'Wipe-clean PU and PVC-coated fabrics, polyester woven and knitted fabrics, and antimicrobial-treated cloth. If your fabric is coated, tell us at quote stage — coating affects needle selection and stitch tension.',
          'If you are unsure whether a fabric will run coated, waxed, very light or very open send us five metres and we will quilt a sample before you commit to a production quantity.',
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
          alt: 'Close-up of camouflage-patterned diamond-quilted fabric',
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
