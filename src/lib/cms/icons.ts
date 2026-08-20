import type { ComponentType, SVGProps } from 'react'
import {
  BabyIcon,
  BespokeStitchIcon,
  BoxesIcon,
  BoxStitchIcon,
  CandleIcon,
  CarIcon,
  CompareIcon,
  DiamondStitchIcon,
  DocumentIcon,
  FactoryIcon,
  FlameIcon,
  GridStitchIcon,
  HardHatIcon,
  HeartPulseIcon,
  HorseIcon,
  LayersIcon,
  PawIcon,
  ProcessStitchIcon,
  ShirtIcon,
  SofaIcon,
  WideStitchIcon,
} from '../../components/ui/Icons'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

/**
 * A React component cannot be stored in Postgres, so collection rows keep an
 * icon *key* and the frontend resolves it here. Keys are stable: renaming one
 * would orphan every row that references it.
 */
export const iconRegistry: Record<string, Icon> = {
  baby: BabyIcon,
  bespokeStitch: BespokeStitchIcon,
  boxes: BoxesIcon,
  boxStitch: BoxStitchIcon,
  candle: CandleIcon,
  car: CarIcon,
  compare: CompareIcon,
  diamondStitch: DiamondStitchIcon,
  document: DocumentIcon,
  factory: FactoryIcon,
  flame: FlameIcon,
  gridStitch: GridStitchIcon,
  hardHat: HardHatIcon,
  heartPulse: HeartPulseIcon,
  horse: HorseIcon,
  layers: LayersIcon,
  paw: PawIcon,
  processStitch: ProcessStitchIcon,
  shirt: ShirtIcon,
  sofa: SofaIcon,
  wideStitch: WideStitchIcon,
}

/** Offered as a dropdown in the admin forms. */
export const iconKeys = Object.keys(iconRegistry).sort()

/**
 * Falls back to a neutral glyph so an unrecognised key renders a placeholder
 * rather than crashing the page.
 */
export function resolveIcon(key: string | null | undefined): Icon {
  if (key && key in iconRegistry) return iconRegistry[key]
  return DiamondStitchIcon
}
