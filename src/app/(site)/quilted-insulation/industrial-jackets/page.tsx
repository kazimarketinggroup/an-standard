import type { Metadata } from 'next'
import InsulationDetail from '@/components/insulation/InsulationDetail'

export const metadata: Metadata = {
  title: 'Industrial Jackets & Plant Insulation — A.N. Standard Ltd.',
  description:
    'Removable insulation jackets for valves, flanges, exhausts, turbines and pipework are cut and sewn from quilted fibreglass — we make the material.',
}

const IMG = '/images/industrial-jackets'

export default function IndustrialJacketsPage() {
  return (
    <InsulationDetail
      currentHref="/quilted-insulation/industrial-jackets"
      title="Industrial Jackets & Plant"
      intro="Removable insulation jackets for valves, flanges, exhausts, turbines and pipework are cut and sewn from quilted fibreglass — we make the material."
      heroImage={`${IMG}/Rectangle 23.png`}
      heroImageAlt="Black, cream and orange quilted fabric panels side by side"
      sectionTitle="Why Removable Jackets Exist"
      paragraphs={[
        'Removable insulation jackets exist because plant has to be maintained. Rigid lagging has to be destroyed to get at a valve or a flange and rebuilt afterwards; a quilted jacket unclips, comes off in one piece, and goes back on in minutes. The insulating layer in the middle of that jacket is what we manufacture.',
      ]}
      specs={[
        { label: 'Typical use', value: 'Removable valve, flange, exhaust and turbine jackets' },
        { label: 'Maximum width', value: '2400mm' },
        { label: 'Outer facings', value: 'Plain or coated glass for washdown and outdoor use' },
        { label: 'Supplied as', value: 'Roll goods for cutting and sewing' },
      ]}
      panel={{
        heading: 'Wide rolls and panel nesting',
        body: [
          'Jacket fabricators typically order quilted fibreglass in wide rolls and nest their panel shapes across the width, which is where 2400mm earns its money — fewer joins in the finished jacket and less offcut waste on complex nesting. Panels are then cut, sewn with high-temperature thread, and fitted with belts, D-rings or lacing hooks by the fabricator.',
        ],
      }}
      secondPanel={{
        heading: 'Specifying against temperature and environment',
        body: [
          'Specification varies with the surface temperature & the environment. Indoor plant is usually built with plain woven glass facings; anything outdoors or exposed to oil, water or washdown takes a coated outer face. Mat density is chosen against the heat loss target & the thickness the fitting will allow.',
        ],
        leftImage: {
          src: `${IMG}/Rectangle 23.png`,
          alt: 'A machinist feeding a quilted panel through the sewing head',
        },
        image: {
          src: `${IMG}/Rectangle 23 (2).png`,
          alt: 'Camouflage-patterned quilted fabric on a padded surface',
        },
        secondHeading: 'Other plant applications we supply',
        secondBody: [
          'We supply the same material for exhaust and manifold wraps, turbine and generator enclosures, steam line covers and acoustic-thermal composites. Send the operating temperature, the environment and the roll width that suits your cutting, and we will quote the build.',
        ],
      }}
    />
  )
}
