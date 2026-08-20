import type { ComponentType, SVGProps } from 'react'
import {
  BabyIcon,
  CandleIcon,
  CarIcon,
  HardHatIcon,
  HeartPulseIcon,
  HorseIcon,
  PawIcon,
  ShirtIcon,
  SofaIcon,
} from '../components/ui/Icons'

export type Sector = {
  name: string
  /** Short line used on the home tabs. */
  blurb: string
  /** Fuller line used in the navbar dropdown. */
  tagline: string
  /** Description used on the sectors page grid. */
  body: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Single source of truth: drives the sectors page, the home tabs and the navbar menu. */
export const sectors: Sector[] = [
  {
    name: 'Healthcare',
    blurb: 'Laundered harder and more often than almost anything else we quilt.',
    tagline: 'Quilted insulation for medical and care settings',
    body: 'Laundered harder and more often than almost anything else we quilt.',
    href: '/sectors/healthcare',
    icon: HeartPulseIcon,
  },
  {
    name: 'Soft furnishings',
    blurb: 'Appearance-led. Stitch has to look right as well as hold.',
    tagline: 'Quilted fabrics for cushions, throws and upholstery',
    body: 'Appearance-led. Stitch has to look right as well as hold.',
    href: '/sectors/soft-furnishings',
    icon: SofaIcon,
  },
  {
    name: 'Funeral supplies',
    blurb: 'Discretion and consistency. Repeat orders to fixed spec.',
    tagline: 'Quilted satin linings for coffins and caskets',
    body: 'Discretion and consistency. Repeat orders to fixed specification.',
    href: '/sectors/funeral-supplies',
    icon: CandleIcon,
  },
  {
    name: 'Nursery',
    blurb: 'Safety, softness, washability. Parent-facing product.',
    tagline: 'Soft, safe quilting for baby and nursery products',
    body: 'Safety, softness and washability for parent-facing products.',
    href: '/sectors/nursery',
    icon: BabyIcon,
  },
  {
    name: 'Clothing',
    blurb: 'Fashion-led, seasonal, wax fabric a stated speciality.',
    tagline: 'Quilting for jackets, outerwear and apparel',
    body: 'Fashion-led, seasonal production with wax fabric expertise.',
    href: '/sectors/clothing',
    icon: ShirtIcon,
  },
  {
    name: 'Automotive',
    blurb: 'Dimensional stability and heat. Interior trim and insulation.',
    tagline: 'Insulation and lining for vehicle interiors',
    body: 'Dimensional stability and heat resistance for interior trim and insulation.',
    href: '/sectors/automotive',
    icon: CarIcon,
  },
  {
    name: 'Pet supplies',
    blurb: 'Durability and cost. Bedding that gets chewed and washed.',
    tagline: 'Warm, durable quilting for pet products.',
    body: 'Durable, cost-effective quilting for bedding that gets chewed and washed.',
    href: '/sectors/pet-supplies',
    icon: PawIcon,
  },
  {
    name: 'Workwear',
    blurb: 'Warmth-to-weight and abrasion. Often flame-retardant.',
    tagline: 'Hard-wearing quilted linings for workwear',
    body: 'Warmth-to-weight performance with excellent abrasion resistance.',
    href: '/sectors/workwear',
    icon: HardHatIcon,
  },
  {
    name: 'Equestrian',
    blurb: 'Heavy use, weather, high wadding weights.',
    tagline: 'Durable quilted linings for horse rugs and tack',
    body: 'Designed for heavy use, outdoor conditions and high wadding weights.',
    href: '/sectors/equestrian',
    icon: HorseIcon,
  },
]

export const sectorsHeroImage = {
  src: '/images/sectors/Group 302.png',
  alt: 'A grid of finished products we quilt for, from healthcare to equestrian',
}

export const sectorsBannerImage = {
  src: '/images/sectors/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png',
  alt: 'Close-up of a patchwork quilt in many colours',
}
