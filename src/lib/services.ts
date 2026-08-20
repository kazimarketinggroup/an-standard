import type { ComponentType, SVGProps } from 'react'
import {
  BespokeStitchIcon,
  BoxStitchIcon,
  DiamondStitchIcon,
  GridStitchIcon,
  ProcessStitchIcon,
  WideStitchIcon,
} from '../components/ui/Icons'

export type Service = {
  title: string
  /** Short line used in the navbar dropdown. */
  tagline: string
  /** Full paragraph used on the services page banner. */
  body: string
  href: string
  image: string
  alt: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Single source of truth: drives the services page and the navbar dropdown. */
export const services: Service[] = [
  {
    title: 'Commission Quilting',
    tagline: 'Custom quilting made to your exact design',
    body: 'Send us your fabric and filling, and we’ll quilt it to your chosen pattern before returning it to you. It’s the same trusted service we’ve been providing since 1975.',
    href: '/services/commission-quilting',
    image: '/images/services/Rectangle 29.png',
    alt: 'A needle stitching through richly coloured quilted fabric',
    icon: DiamondStitchIcon,
  },
  {
    title: 'Wide-Width Quilting',
    tagline: 'Long-arm quilting for oversized quilts',
    body: 'Our standard quilting width is 1500–1600mm, but for larger products we can quilt up to 2400mm, eliminating the need to join panels and ensuring a cleaner finish.',
    href: '/services/wide-width-quilting',
    image: '/images/services/Rectangle 33.png',
    alt: 'Folds of soft cream fleece fabric',
    icon: WideStitchIcon,
  },
  {
    title: 'Bespoke Pattern Design',
    tagline: 'Unique patterns designed just for you',
    body: 'Our quilting machines have been upgraded with computerised technology, allowing us to create custom quilting patterns beyond the limitations of a traditional pattern library.',
    href: '/services/bespoke-pattern-design',
    image: '/images/services/Rectangle 30.png',
    alt: 'Damask patterned fabric with metallic thread detail',
    icon: BespokeStitchIcon,
  },
  {
    title: 'Wadding & Fillings',
    tagline: 'Premium wadding for warmth and drape',
    body: 'We stock UK-sourced recycled polyester wadding in weights ranging from 70gsm to 300gsm. All materials comply with BS 5852 Part 2: 1982 standards.',
    href: '/services/wadding-and-fillings',
    image: '/images/services/Rectangle 31.png',
    alt: 'A grid of coloured quilted fabric squares',
    icon: BoxStitchIcon,
  },
  {
    title: 'Customer-Supplied Materials',
    tagline: 'Bring your own fabric, we’ll quilt it',
    body: 'If polyester wadding isn’t suitable for your application, you’re welcome to supply your own materials. We regularly quilt a wide range of fillings, including foam, felt, and natural fibres.',
    href: '/services/customer-supplied-materials',
    image: '/images/services/Rectangle 32.png',
    alt: 'Rolls of patterned paisley fabric',
    icon: GridStitchIcon,
  },
]

/** Extra dropdown entry that is not a banner on the services page. */
export const processLink = {
  title: 'Our process',
  tagline: 'How your quilt comes to life, step by step',
  href: '/process',
  icon: ProcessStitchIcon,
}

export const servicesMenuImage = {
  src: '/images/services/Rectangle 13.png',
  alt: 'A multi-needle quilting machine running orange fabric over white wadding',
}
