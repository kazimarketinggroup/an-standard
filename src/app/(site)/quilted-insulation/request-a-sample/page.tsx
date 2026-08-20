import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Request A Sample — A.N. Standard Ltd.',
  description:
    "Tell us the application, the operating temperature and the quantity, and we'll send material to assess — free on a live enquiry.",
}

const IMG = '/images/request sample'

export default function RequestASamplePage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/request-a-sample"
      title="Request A Sample"
      intro="Tell us the application, the operating temperature and the quantity, and we'll send material to assess — free on a live enquiry."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="Folds of pink diamond-quilted fabric"
      sectionTitle="Why Handling The Material Settles It"
      paragraphs={[
        'The fastest way to find out whether quilted fibreglass suits your product is to handle it. We keep sample panels of our standard constructions and will send one out on any live enquiry, at no charge.',
      ]}
      specs={[
        { label: 'Sample cost', value: 'Free on a live enquiry' },
        { label: 'Turnaround', value: 'Typically 3–5 working days' },
        { label: 'Custom builds', value: 'Quilted to your facings or mat on request' },
        { label: 'Maximum width', value: '2400mm' },
      ]}
      panel={{
        heading: 'The four things we need from you',
        body: [
          "To send something useful rather than something generic, we need four things: what the material is going into, the operating temperature and environment, the finished width you cut to, and roughly what quantity you would order. Where you already have a facing fabric or mat specified, tell us and we'll quilt a panel to that build instead of ours.",
        ],
      }}
      secondPanel={{
        heading: 'Comparing us against your current supplier',
        body: [
          "If you're comparing us against an existing supplier, send a piece of what you use now. We'll quilt a like-for-like panel so the comparison is on the same fabric and the same pattern rather than on two different builds.",
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23 (1).png`,
          alt: 'A machinist feeding cream quilted fabric through a wide quilting machine',
        },
        image: {
          src: `${IMG}/Border.png`,
          alt: 'A hand holding the edge of a blue quilted jacket panel',
        },
        secondHeading: 'Or just pick up the phone',
        secondBody: [
          "Call us on the number in the header if it's easier than writing it down — for technical enquiries a five-minute conversation usually saves a week of emails.",
        ],
      }}
    />
  )
}
