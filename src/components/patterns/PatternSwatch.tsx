/**
 * Quilting patterns drawn as tiling SVG rather than photographed, so the
 * geometry is exact and stays crisp at any card size. Each swatch is a
 * <pattern> tile repeated across the box — the same way the machine repeats
 * a stitch pattern across the roll.
 */

export type PatternKind =
  | 'box'
  | 'diamond'
  | 'wavy'
  | 'vertical'
  | 'hourglass'
  | 'bespoke'

const STROKE = '#9AA1AC'

/** Tile geometry per pattern. `size` is the repeat in user units. */
function Tile({ kind, id }: { kind: PatternKind; id: string }) {
  switch (kind) {
    // Square grid — the classic box pattern, quoted in inches.
    case 'box':
      return (
        <pattern id={id} width={26} height={26} patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke={STROKE} strokeWidth={1} />
        </pattern>
      )

    // Box rotated 45°, plus a second offset diamond for the "overlap" family.
    case 'diamond':
      return (
        <pattern
          id={id}
          width={38}
          height={38}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path d="M38 0H0V38" fill="none" stroke={STROKE} strokeWidth={1} />
          <path d="M19 0V38M0 19H38" fill="none" stroke={STROKE} strokeWidth={0.6} opacity={0.55} />
        </pattern>
      )

    // Continuous sine-style run. Two mirrored curves per tile keep it seamless.
    case 'wavy':
      return (
        <pattern id={id} width={44} height={26} patternUnits="userSpaceOnUse">
          <path
            d="M0 13 C 11 0, 11 0, 22 13 S 33 26, 44 13"
            fill="none"
            stroke={STROKE}
            strokeWidth={1}
          />
        </pattern>
      )

    // Straight channel quilting — the simplest and most economical pattern.
    case 'vertical':
      return (
        <pattern id={id} width={22} height={22} patternUnits="userSpaceOnUse">
          <path d="M0 0V22" fill="none" stroke={STROKE} strokeWidth={1} />
        </pattern>
      )

    // Opposed triangles meeting at a waist — the bow-tie hourglass repeat,
    // run large because it suits heavier waddings.
    case 'hourglass':
      return (
        <pattern id={id} width={44} height={44} patternUnits="userSpaceOnUse">
          {/*
            One hourglass filling the tile: top and bottom edges joined by
            crossed diagonals, so the repeat butts up cleanly on all sides.
          */}
          <path
            d="M2 2H42L2 42H42Z"
            fill="none"
            stroke={STROKE}
            strokeWidth={1}
            strokeLinejoin="round"
          />
        </pattern>
      )

    // Fine grid with a heavier every-fourth line, suggesting a custom repeat.
    case 'bespoke':
      return (
        <pattern id={id} width={48} height={48} patternUnits="userSpaceOnUse">
          <path
            d="M12 0V48M24 0V48M36 0V48M0 12H48M0 24H48M0 36H48"
            fill="none"
            stroke={STROKE}
            strokeWidth={0.6}
            opacity={0.6}
          />
          <path d="M48 0H0V48" fill="none" stroke={STROKE} strokeWidth={1.1} />
        </pattern>
      )
  }
}

export default function PatternSwatch({
  kind,
  className,
}: {
  kind: PatternKind
  className?: string
}) {
  const id = `quilt-${kind}`

  return (
    <svg
      className={className}
      role="img"
      aria-label={`${kind} quilting pattern`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 220"
    >
      <defs>
        <Tile kind={kind} id={id} />
      </defs>
      <rect width="400" height="220" fill="#F4F4F5" />
      <rect width="400" height="220" fill={`url(#${id})`} />
    </svg>
  )
}
