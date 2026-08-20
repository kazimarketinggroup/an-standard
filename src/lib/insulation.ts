import type { ComponentType, SVGProps } from 'react'
import {
  BoxesIcon,
  CompareIcon,
  DiamondStitchIcon,
  DocumentIcon,
  FactoryIcon,
  FlameIcon,
  LayersIcon,
} from '../components/ui/Icons'

export type InsulationItem = {
  title: string
  /** Short line used in the navbar dropdown. */
  tagline: string
  /** Fuller description used on the page grid. */
  body: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** False until the detail page exists; sidebar/menu render it as "coming soon" rather than a dead link. */
  ready?: boolean
}

/** Single source of truth: drives the insulation page grid and the navbar menu. */
export const insulationItems: InsulationItem[] = [
  {
    title: 'Quilted Fibreglass',
    tagline: 'High-performance quilted fibreglass insulation',
    body: 'Flexible insulation manufactured using quilted fibreglass for industrial applications requiring durability and thermal performance.',
    href: '/quilted-insulation/quilted-fibreglass',
    icon: LayersIcon,
    ready: true,
  },
  {
    title: 'Fire & Welding Blankets',
    tagline: 'Heat and spark-resistant protective blankets',
    body: 'Protective quilted materials designed for heat protection and industrial environments.',
    href: '/quilted-insulation/fire-and-welding-blankets',
    icon: FlameIcon,
    ready: true,
  },
  {
    title: 'Industrial Jackets & Plant Insulation',
    tagline: 'Insulation jackets for plant and machinery',
    body: 'Custom manufactured quilted insulation for removable insulation jackets and industrial equipment.',
    href: '/quilted-insulation/industrial-jackets',
    icon: FactoryIcon,
    ready: true,
  },
  {
    title: 'Technical specification',
    tagline: 'Full specs and technical data sheets',
    body: 'Access product information, technical guidance and specification details to help you choose the right quilted insulation solution.',
    href: '/quilted-insulation/technical-specification',
    icon: DocumentIcon,
    ready: true,
  },
  {
    title: 'Fibreglass vs polyester wadding',
    tagline: 'Compare materials to find the right fit',
    body: 'Compare the characteristics of quilted fibreglass and polyester wadding to determine which material best suits your application.',
    href: '/quilted-insulation/fibreglass-vs-polyester',
    icon: CompareIcon,
    ready: true,
  },
  {
    title: 'Bulk supply & lead times',
    tagline: 'Volume orders with reliable turnaround',
    body: 'Whether you require a small production run or full container loads, we offer flexible manufacturing capacity with dependable lead times.',
    href: '/quilted-insulation/bulk-supply',
    icon: BoxesIcon,
    ready: true,
  },
  {
    title: 'Request a sample',
    tagline: 'Free sample panels on a live enquiry',
    body: 'Tell us the application, the operating temperature and the quantity, and we will send material to assess free of charge on a live enquiry.',
    href: '/quilted-insulation/request-a-sample',
    icon: DiamondStitchIcon,
    ready: true,
  },
]

export const insulationMenuImage = {
  src: '/images/quilted-insultation/Rectangle 13.png',
  alt: 'A machinist quilting green fabric on a Brother machine',
}
