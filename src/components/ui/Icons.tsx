import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
)

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
)

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.7-5.3A8.5 8.5 0 1 1 21 11.5Z" />
    <path d="M8.6 9.1c0 3 2.4 5.4 5.3 5.4.6 0 1-.4 1-1v-.6l-1.7-.7-.8.9a4.4 4.4 0 0 1-2.1-2.1l.9-.8-.7-1.7h-.6c-.6 0-1 .5-1 1Z" />
  </svg>
)

/**
 * Solid-fill WhatsApp glyph for the floating chat button, where the stroked
 * `WhatsAppIcon` above reads too thin against a filled green bubble.
 */
export const WhatsAppSolidIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.46 1.34 4.97L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01A9.9 9.9 0 0 0 22 11.93 9.9 9.9 0 0 0 12.04 2Zm0 18.14h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.97 3.86Zm4.5-6.14c-.24-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.97-.14.16-.28.18-.52.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.84-.85 2.04s.87 2.36.99 2.53c.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.46-.29Z" />
  </svg>
)

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const PlusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m14 6-6 6 6 6" />
  </svg>
)

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m10 6 6 6-6 6" />
  </svg>
)

/* --- Social icons (solid, so they read at small sizes) --- */

const solid = { fill: 'currentColor', viewBox: '0 0 24 24' }

export const FacebookIcon = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6a22 22 0 0 0-2.4-.12c-2.4 0-4 1.46-4 4.14V9.9H7.6V13h2.7v8Z" />
  </svg>
)

export const TwitterIcon = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M21 5.9c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.4 1a3.7 3.7 0 0 0-6.4 3.4A10.6 10.6 0 0 1 4 5a3.7 3.7 0 0 0 1.2 5 3.6 3.6 0 0 1-1.7-.5 3.7 3.7 0 0 0 3 3.6c-.6.2-1.1.2-1.7.1a3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 17.3a10.5 10.5 0 0 0 5.7 1.7c6.9 0 10.7-5.8 10.7-10.8v-.5c.7-.5 1.3-1.2 1.8-1.9Z" />
  </svg>
)

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

export const LinkedInIcon = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M6.9 21H3.5V9.2h3.4ZM5.2 7.7A2 2 0 1 1 5.2 3.7a2 2 0 0 1 0 4ZM21 21h-3.4v-5.7c0-1.4 0-3.2-1.9-3.2s-2.2 1.5-2.2 3.1V21H10V9.2h3.3v1.6a3.6 3.6 0 0 1 3.2-1.8c3.5 0 4.1 2.3 4.1 5.2Z" />
  </svg>
)

export const YouTubeIcon = (p: IconProps) => (
  <svg {...solid} {...p}>
    <path d="M22.5 7.5a2.7 2.7 0 0 0-1.9-1.9C18.9 5.1 12 5.1 12 5.1s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 7.5 28 28 0 0 0 1 12a28 28 0 0 0 .5 4.5 2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 23 12a28 28 0 0 0-.5-4.5ZM9.8 15.3V8.7l5.7 3.3Z" />
  </svg>
)

/* --- Service icons: each is a swatch of the stitch pattern it names --- */

const stitch = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  viewBox: '0 0 24 24',
}

/** Diamond lattice — the default commission quilting pattern. */
export const DiamondStitchIcon = (p: IconProps) => (
  <svg {...stitch} {...p}>
    <path d="M2 8l6-6M2 16l14-14M6 22L22 6M14 22l8-8" />
    <path d="M8 2l14 14M2 8l14 14M16 2l6 6M2 16l6 6" />
  </svg>
)

/** Wide diagonal ruling, for the wide-width machines. */
export const WideStitchIcon = (p: IconProps) => (
  <svg {...stitch} {...p}>
    <path d="M2 10L10 2M2 18L18 2M6 22L22 6M14 22l8-8" />
  </svg>
)

/** Dense cross-hatch, standing for bespoke/computerised patterns. */
export const BespokeStitchIcon = (p: IconProps) => (
  <svg {...stitch} {...p}>
    <path d="M2 6l4-4M2 12l10-10M2 18L18 2M4 22L22 4M10 22L22 10M16 22l6-6" />
    <path d="M6 2l16 16M2 6l16 16M12 2l10 10M2 12l10 10M18 2l4 4M2 18l4 4" />
  </svg>
)

/** Box grid — wadding sheets stacked square. */
export const BoxStitchIcon = (p: IconProps) => (
  <svg {...stitch} {...p}>
    <path d="M2 2h20v20H2z" />
    <path d="M2 7h20M2 12h20M2 17h20M7 2v20M12 2v20M17 2v20" />
  </svg>
)

/** Fine grid, for customer-supplied materials. */
export const GridStitchIcon = (p: IconProps) => (
  <svg {...stitch} {...p}>
    <path d="M2 2h20v20H2z" />
    <path d="M2 6h20M2 10h20M2 14h20M2 18h20M6 2v20M10 2v20M14 2v20M18 2v20" />
  </svg>
)

/** Stacked rolls, used for the process entry. */
export const ProcessStitchIcon = (p: IconProps) => (
  <svg {...stitch} {...p}>
    <path d="M2 4h20M2 8h20M2 12h20M2 16h20M2 20h20" />
    <path d="M6 2v20M18 2v20" />
  </svg>
)

/* --- Quilted insulation icons --- */

/** Layered mat, standing for quilted fibreglass. */
export const LayersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 3 7.5l9 4.5 9-4.5Z" />
    <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  </svg>
)

/** Flame, for fire and welding blankets. */
export const FlameIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22a6 6 0 0 0 6-6c0-4-3-5.5-3-9 0 0-2 1.5-2.5 4C11 8 11 5 8.5 3 9 7 6 8.5 6 16a6 6 0 0 0 6 6Z" />
  </svg>
)

/** Plant/machinery jacket. */
export const FactoryIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21V10l6 3.5V10l6 3.5V7l6 3v11Z" />
    <path d="M7 21v-3.5M12 21v-3.5M17 21v-3.5" />
  </svg>
)

/** Document, for technical specification. */
export const DocumentIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)

/** Two arrows, for material comparison. */
export const CompareIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 10h8l-2.5-2.5M16 14H8l2.5 2.5" />
  </svg>
)

/** Stacked crates, for bulk supply. */
export const BoxesIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="13" width="8" height="8" rx="1" />
    <rect x="13" y="13" width="8" height="8" rx="1" />
    <rect x="8" y="3" width="8" height="8" rx="1" />
  </svg>
)

/* --- Sector icons --- */

export const HeartPulseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20.8 6.6a5 5 0 0 0-8.8-1.6 5 5 0 0 0-8.8 1.6c-1 3.3 1.6 6.3 4 8.6l4.8 4.5 4.8-4.5c2.4-2.3 5-5.3 4-8.6Z" />
    <path d="M3.5 12.5h3l1.5-2.5 2 5 2-3.5h5" />
  </svg>
)

export const SofaIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
    <path d="M2 13a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0v5H2Z" />
  </svg>
)

export const CandleIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2c1.5 1.8 2.5 3 2.5 4.3a2.5 2.5 0 0 1-5 0C9.5 5 10.5 3.8 12 2Z" />
    <rect x="8" y="10" width="8" height="12" rx="1.5" />
  </svg>
)

export const BabyIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 0 0 5 0" />
  </svg>
)

export const ShirtIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3 4 5.5 5.5 10 8 9v11h8V9l2.5 1L20 5.5 15 3a3 3 0 0 1-6 0Z" />
  </svg>
)

export const CarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 16v2M19 16v2" />
    <path d="M3 16v-3.2a2 2 0 0 1 .4-1.2l1.9-2.7A2 2 0 0 1 7 8h10a2 2 0 0 1 1.7.9l1.9 2.7a2 2 0 0 1 .4 1.2V16Z" />
    <path d="M6.5 13h.01M17.5 13h.01" />
  </svg>
)

export const PawIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="7" cy="9" r="1.8" />
    <circle cx="12" cy="6.5" r="1.8" />
    <circle cx="17" cy="9" r="1.8" />
    <path d="M12 11c2.8 0 5 2.2 5 4.6 0 1.9-1.6 2.9-3.2 2.3a5.4 5.4 0 0 0-3.6 0C8.6 18.5 7 17.5 7 15.6 7 13.2 9.2 11 12 11Z" />
  </svg>
)

export const HardHatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 16a9 9 0 0 1 18 0Z" />
    <path d="M2.5 16h19M9 16V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V16" />
  </svg>
)

export const HorseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 20c0-4 2-6 5-7l1.5-3.5L8 7l1-3 3 2h3a4 4 0 0 1 4 4v3c0 3.5-2.5 5.5-5 7" />
    <path d="M9 6.5h.01" />
  </svg>
)
