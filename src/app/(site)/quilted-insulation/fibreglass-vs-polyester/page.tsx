import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Fibreglass vs Polyester Wadding — A.N. Standard Ltd.',
  description:
    'We manufacture both, so we have no reason to push you toward either. The choice usually comes down to temperature, weight and cost.',
}

const IMG = '/images/fiberglassor polystar'

export default function FibreglassVsPolyesterPage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/fibreglass-vs-polyester"
      title="Quilted Fibreglass Or Polyester Wadding, Which Do You Need?"
      intro="We manufacture both, so we have no reason to push you toward either. The choice usually comes down to temperature, weight and cost."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="A fibreglass quilted panel beside a white polyester quilted panel on a workbench"
      sectionTitle="Start With Temperature"
      paragraphs={[
        'Start with temperature, because it settles most enquiries on its own. Polyester wadding is a thermoplastic: it softens and shrinks well before it burns, and it has no business anywhere near sustained heat, sparks or flame.',
        'Fibreglass is mineral and does not melt at temperatures that destroy polyester. If the application involves hot work, plant surfaces or fire protection, the answer is fibreglass and there is no second option.',
      ]}
      specs={[
        { label: 'Fibreglass', value: 'Heat, spark and flame exposure; industrial plant' },
        { label: 'Polyester 70–300gsm', value: 'Bedding, clothing, furniture, trim, healthcare' },
        { label: 'Handling', value: 'Fibreglass stiff and enclosed; polyester soft and sewable' },
        { label: 'Relative cost', value: 'Polyester materially cheaper per square metre' },
      ]}
      panel={{
        heading: 'Below that threshold, polyester wins',
        body: [
          'Below that threshold, polyester wins on almost everything else. It is softer, cheaper, easier to sew, more pleasant to handle, washable, and it recovers loft after compression. It is what belongs in bedding, clothing, furniture, pet products, vehicle trim and healthcare textiles.',
        ],
      }}
      comparison={{
        heading: 'Fibreglass vs polyester, side by side',
        columns: ['Fibreglass wadding', 'Polyester wadding'],
        rows: [
          {
            label: 'Material',
            cells: ['Mineral (glass fibre)', 'Thermoplastic (polyester fibre)'],
          },
          {
            label: 'Temperature range',
            cells: [
              'Withstands sustained heat, sparks and flame',
              'Softens and shrinks well below flame temperatures — not for heat exposure',
            ],
          },
          {
            label: 'Weight (gsm)',
            cells: ['Heavier for equivalent thickness than polyester', '70–300gsm'],
          },
          {
            label: 'Typical applications',
            cells: [
              'Hot work, plant surfaces, fire protection, welding blankets, industrial jackets',
              'Bedding, clothing, furniture, vehicle trim, pet products, healthcare textiles',
            ],
          },
          {
            label: 'Cost indication',
            cells: ['Higher cost per square metre', 'Materially cheaper per square metre'],
          },
          {
            label: 'Standards',
            cells: [
              'Supplied quilted between facings (cut edges enclosed)',
              'Stock wadding to BS5852 Part 2 1982',
            ],
          },
        ],
      }}
      secondPanel={{
        heading: 'How fibreglass handles',
        body: [
          'Fibreglass handles differently. It is stiffer, it does not drape, and cut edges need enclosing — which is why it is always supplied quilted between facings rather than open. It is also heavier for the same thickness and costs more per square metre, so specifying it where polyester would do is simply an expensive way to make a worse product.',
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23 (1).png`,
          alt: 'Close-up of coarse fibreglass wadding quilted in horizontal lines',
        },
        image: {
          src: `${IMG}/Rectangle 23 (2).png`,
          alt: 'Close-up of white diamond-quilted polyester panel',
        },
        secondHeading: 'The short version',
        secondBody: [
          'If the product goes near heat, use quilted fibreglass. If it goes near people, use polyester. If it goes near both — a workwear liner behind a flame-retardant outer, say — the honest answer is usually neither on its own, and we will talk you through a customer-supplied barrier filling instead.',
        ],
      }}
    />
  )
}
