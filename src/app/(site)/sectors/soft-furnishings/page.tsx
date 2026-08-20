import type { Metadata } from 'next'
import SectorDetail from '@/components/sectors/SectorDetail'

export const metadata: Metadata = {
  title: 'Quilting For The Soft Furnishings Sector — A.N. Standard Ltd.',
  description:
    'Soft furnishings are judged on appearance first. We quilt to a consistent tension across the full roll width so panels cut from the same run match.',
}

const IMG = '/images/soft furnishing'

export default function SoftFurnishingsSectorPage() {
  return (
    <SectorDetail
      currentHref="/sectors/soft-furnishings"
      accent="Soft Furnishings"
      intro="Appearance-led. Stitch has to look right as well as hold."
      heroImage={{
        src: `${IMG}/Rectangle 95.png`,
        alt: 'A cream sofa dressed with cushions and a knitted throw',
      }}
      sectionTitle="What Soft Furnishings Manufacturers Need From Quilting"
      paragraphs={[
        'Soft furnishings are judged on appearance first. The stitch has to sit evenly across the panel and hold its line after the product has been made up, handled and lived with. We quilt to a consistent tension across the full roll width so panels cut from the same run match.',
        'We quilt on commission only. You send fabric on the roll, we quilt it to your chosen filling on multi-needle lock stitch machines, and the finished rolls come back ready to cut. We never make competing finished products, so nothing you tell us ends up in a rival’s catalogue.',
      ]}
      specs={[
        { label: 'Standard width', value: '1500–1600mm' },
        { label: 'Maximum Width', value: '2400mm' },
        { label: 'Stock wadding', value: '70–300gsm' },
        { label: 'Stitch', value: 'Multi-needle lock stitch' },
      ]}
      banner={{
        heading: 'Fabrics we quilt for soft furnishings',
        body: [
          'Cotton, linen blends and upholstery-weight woven fabrics.',
          'If you are unsure whether a fabric will run — coated, waxed, very light or very open — send us five metres and we will quilt a sample before you commit to a production quantity.',
        ],
        image: {
          src: `${IMG}/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png`,
          alt: 'Close-up of a patchwork quilt in many colours',
        },
      }}
      fillings={{
        heading: 'Fillings and waddings',
        body: [
          'Our stock polyester wadding runs from 70gsm to 300gsm, is made from recycled polyester and complies with BS5852 Part 2 1982. Heavier weights are available on request.',
          'Where an application calls for foam, felt, a natural filling or a specified flame-retardant material, we quilt customer-supplied materials as standard, with no penalty in our pricing for doing so.',
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
          alt: 'Close-up of beige diamond-quilted upholstery fabric',
        },
      }}
      // The reference art shows a self-link here; swapped for a real sibling.
      relatedHrefs={['/sectors/healthcare', '/sectors/funeral-supplies', '/sectors/workwear']}
    />
  )
}
