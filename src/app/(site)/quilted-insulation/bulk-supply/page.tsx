import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Bulk Supply & Lead Times — A.N. Standard Ltd.',
  description:
    'We have the facilities to take in full container loads, and we also supply smaller quantities — a first order does not have to be large.',
}

const IMG = '/images/bulk supply'

export default function BulkSupplyPage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/bulk-supply"
      title="Bulk Supply & Lead Times"
      intro="We have the facilities to take in full container loads, and we also supply smaller quantities — a first order does not have to be large."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="A machinist working at a wide multi-needle quilting machine"
      sectionTitle="Container Loads And Single Rolls, Same Factory"
      paragraphs={[
        'Quilted fibreglass is normally bought one of two ways. Established converters order against a schedule and take full container loads of mat, which we hold and draw down as their orders come in. Smaller fabricators order a few rolls at a time.',
        'We run both, and we do not price the small customer out of the market on principle — the first order is often a single roll while a design is proven.',
      ]}
      specs={[
        { label: 'Minimum order', value: 'Single roll; no minimum contract' },
        { label: 'Repeat lead time', value: '2–3 weeks from confirmation' },
        { label: 'New build', value: 'Sample panel in 1–2 weeks, then production' },
        { label: 'Dispatch', value: 'UK delivery, collection, or palletised for export' },
      ]}
      panel={{
        heading: 'Lead times you can plan against',
        body: [
          'Lead time on a repeat order is typically two to three weeks from confirmation, assuming mat and facings are in stock. A new build takes longer: allow one to two weeks for a sample panel, your assessment and any adjustment, then the production lead time on top. Where a customer holds a call-off schedule with us, we keep their mat and facings on the shelf and lead times come down accordingly.',
        ],
      }}
      secondPanel={{
        heading: 'Winding, wrapping and dispatch',
        body: [
          "Rolls are wound to your handling requirement and wrapped for transport. We can deliver on our own arrangements throughout the UK, or hold goods for your carrier to collect from the West Midlands. For export orders we palletise and wrap for container loading and work to your forwarder's documentation.",
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23 (1).png`,
          alt: 'Two cones of pink quilting thread resting on white quilted fabric',
        },
        image: {
          src: `${IMG}/Rectangle 23 (2).png`,
          alt: 'A machinist feeding cream quilted fabric through a sewing machine',
        },
        secondHeading: 'Fixed dates need early notice',
        secondBody: [
          "If you have a fixed installation or delivery date, tell us at enquiry stage. Machine time on wide-width work is booked in advance, and a week's notice at quote stage is worth more than any amount of chasing after the order is placed.",
        ],
      }}
    />
  )
}
