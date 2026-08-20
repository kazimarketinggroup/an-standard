import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Technical Specification — A.N. Standard Ltd.',
  description:
    'Widths, constructions, patterns and the information we need from you before quoting quilted fibreglass.',
}

const IMG = '/images/technical-specification'

export default function TechnicalSpecificationPage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/technical-specification"
      title="Technical Specification"
      intro="Widths, constructions, patterns and the information we need from you before quoting quilted fibreglass."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="Tape measure laid across brown quilted fabric"
      sectionTitle="How To Read This Specification"
      paragraphs={[
        'Quilted fibreglass is built to order rather than sold from a fixed catalogue, so the specification below describes the envelope we work within rather than a single product.',
      ]}
      specs={[
        { label: 'Maximum width', value: '2400mm' },
        { label: 'Standard patterns', value: 'Vertical 1–2", box 2" and 4"' },
        { label: 'Construction', value: 'Mat between two facings; multi-layer to order' },
        { label: 'Sample panels', value: 'Supplied free on a live enquiry' },
      ]}
      panel={{
        heading: 'Width and roll winding',
        body: [
          'Width: quilted up to 2400mm; most orders run between 1500mm and 2400mm. Rolls are wound to a length that suits your handling — tell us the maximum roll weight your team can lift and we will wind to it.',
        ],
        secondHeading: 'Construction options',
        secondBody: [
          'Construction: one fibreglass mat between two facing fabrics as standard. Multi-layer builds, single-faced constructions and composites incorporating a foil or a scrim are all possible; each needs a sample run before production.',
        ],
      }}
      secondPanel={{
        heading: 'Performance claims and where testing sits',
        body: [
          'Performance claims: thermal conductivity, continuous service temperature and reaction-to-fire classification are properties of the specific mat and facings in your build and of the finished article, rather than of roll goods. We publish the constructions we can make and pass through the material data for the components; testing and classification of the finished product sits with you or your test house — we will quilt sample panels for submission at no charge on a live enquiry.',
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23 (1).png`,
          alt: 'Close-up of pale grey diamond-quilted technical fabric',
        },
        image: {
          src: `${IMG}/Rectangle 23 (2).png`,
          alt: 'An electronics panel with wired terminal blocks on the quilting machine',
        },
        secondHeading: 'What to send with an enquiry',
        secondBody: [
          'What to send with an enquiry: operating temperature, environment (indoor, outdoor, washdown, oil contact), required finished width, annual or per-order quantity, any facing fabric or mat you need us to use, and the standard the end product is being tested against.',
        ],
      }}
    />
  )
}
