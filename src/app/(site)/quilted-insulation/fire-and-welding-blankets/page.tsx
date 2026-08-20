import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Fire & Welding Blankets — A.N. Standard Ltd.',
  description:
    'Quilted fibreglass supplied to blanket manufacturers and converters for hot work protection, spark containment and fire curtains.',
}

const IMG = '/images/fire-wilding'

export default function FireAndWeldingBlanketsPage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/fire-and-welding-blankets"
      title="Fire & Welding Blankets"
      intro="Quilted fibreglass supplied to blanket manufacturers and converters for hot work protection, spark containment and fire curtains."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="Close-up of cream quilted fabric with wavy vertical stitching"
      sectionTitle="We Make The Material; You Make The Article"
      paragraphs={[
        'We supply quilted fibreglass to the manufacturers who make welding blankets, spark curtains, hot work screens and fire blankets. We make the material; they cut, hem, eyelet and certify the finished product.',
        'That division matters — the fire performance of a finished blanket depends on its construction, its edging and the test it has been put through, so certification sits with whoever builds and tests the article.',
      ]}
      specs={[
        { label: 'Typical use', value: 'Welding blankets, spark curtains, hot work screens' },
        { label: 'Facings', value: 'Coated woven glass cloth' },
        { label: 'Thread', value: 'Glass or high-temperature thread on request' },
        { label: 'Certification', value: 'Finished-article testing sits with the converter' },
      ]}
      panel={{
        heading: 'Typical construction for hot work',
        body: [
          'For hot work protection the usual specification is a heavier mat between coated glass facings, quilted on a close vertical or box pattern so that nothing shifts when the blanket is thrown over a rail and dragged. Where a blanket is used vertically as a curtain, we quilt tighter to stop the mat migrating downward under gravity over months of hanging.',
        ],
      }}
      secondPanel={{
        heading: 'Thread is part of the specification',
        body: [
          'Stitch thread is part of the specification here, not a detail. A polyester thread will fail long before the fibre does. Where the end application involves sustained heat or direct spark contact, the quilting is run with a glass or high-temperature thread, and we will specify that with you before sampling.',
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23.png`,
          alt: 'Close-up of cream quilted fabric with wavy vertical stitching',
        },
        image: {
          src: `${IMG}/Rectangle 23 (2).png`,
          alt: 'Diamond-quilted cream fabric on a padded headboard',
        },
        secondHeading: 'What to tell us before we quote',
        secondBody: [
          'Tell us the exposure — spatter, radiant heat, direct flame contact, duration — and the test the finished article has to meet, and we will build the material to suit and quilt a panel for you to submit for testing.',
        ],
      }}
    />
  )
}
