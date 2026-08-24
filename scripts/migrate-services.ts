/**
 * Lifts the five service pages and seven insulation subpages into Supabase.
 *
 *   npm run migrate-services          # report what would change
 *   npm run migrate-services -- --write
 *
 * The insulation pages all call <InsulationDetail> with literal props, so they
 * parse the same way scripts/migrate-legacy.ts handles sectors. The service
 * pages are bespoke JSX, so their content is transcribed here as data rather
 * than parsed — parsing free-form JSX guesses, and a wrong guess silently drops
 * content. Everything below was read out of the page files by hand and is
 * verified afterwards by diffing the rendered HTML.
 *
 * Existing non-empty values are never overwritten.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const WRITE = process.argv.includes('--write')
const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const SITE = 'src/app/(site)'

/* ------------------------------------------------------------------ parsing */

function balanced(source: string, from: number): string | null {
  const open = source[from]
  const close = open === '{' ? '}' : open === '[' ? ']' : null
  if (!close) return null

  let depth = 0
  let inString: string | null = null

  for (let i = from; i < source.length; i++) {
    const char = source[i]
    const prev = source[i - 1]

    if (inString) {
      if (char === inString && prev !== '\\') inString = null
      continue
    }
    if (char === '"' || char === "'" || char === '`') {
      inString = char
      continue
    }
    if (char === open) depth++
    else if (char === close) {
      depth--
      if (depth === 0) return source.slice(from, i + 1)
    }
  }
  return null
}

function prop(source: string, name: string): string | null {
  const re = new RegExp(`\\b${name}=`, 'g')
  const match = re.exec(source)
  if (!match) return null

  const at = match.index + match[0].length
  if (source[at] === '"' || source[at] === "'") {
    const quote = source[at]
    let out = ''
    for (let i = at + 1; i < source.length; i++) {
      if (source[i] === quote && source[i - 1] !== '\\') break
      out += source[i]
    }
    return JSON.stringify(out)
  }

  const region = balanced(source, at)
  return region ? region.slice(1, -1).trim() : null
}

/** The source is this repository, so a scoped Function is safe here. */
function literal(expr: string | null, img: string): unknown {
  if (!expr) return null
  try {
    return new Function('IMG', `return (${expr})`)(img)
  } catch {
    return null
  }
}

function imgConst(source: string): string {
  const m = source.match(/const IMG = ['"]([^'"]+)['"]/)
  return m ? m[1] : ''
}

/** Reads a top-level `const name = [...]` array out of a page file. */
function constArray(source: string, name: string, img: string): unknown[] {
  const at = source.search(new RegExp(`const ${name}\\s*=\\s*\\[`))
  if (at === -1) return []
  const region = balanced(source, source.indexOf('[', at))
  const value = literal(region, img)
  return Array.isArray(value) ? value : []
}

function metaField(source: string, field: 'title' | 'description'): string {
  const block = source.match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\}/)
  if (!block) return ''
  const m = block[1].match(new RegExp(`${field}:\\s*(['"\`])([\\s\\S]*?)\\1`))
  return m ? m[2].replace(/\s+/g, ' ').trim() : ''
}

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])

/* ------------------------------------------------------ insulation subpages */

type Extracted = { slug: string; values: Record<string, unknown>; unread: string[] }

function extractInsulation(slug: string): Extracted | null {
  const file = join(SITE, 'quilted-insulation', slug, 'page.tsx')
  if (!existsSync(file)) return null

  const source = readFileSync(file, 'utf8')
  const img = imgConst(source)
  const call = source.slice(source.indexOf('<InsulationDetail'))
  const unread: string[] = []

  const panel = literal(prop(call, 'panel'), img) as Record<string, unknown> | null
  const second = literal(prop(call, 'secondPanel'), img) as Record<string, unknown> | null
  const comparison = literal(prop(call, 'comparison'), img) as Record<string, unknown> | null

  if (!panel) unread.push('panel')
  if (source.includes('secondPanel=') && !second) unread.push('secondPanel')

  const secondLeft = (second?.leftImage ?? {}) as { src?: string; alt?: string }
  const secondImage = (second?.image ?? {}) as { src?: string; alt?: string }

  return {
    slug,
    unread,
    values: {
      hero_heading: str(literal(prop(call, 'title'), img)),
      hero_intro: str(literal(prop(call, 'intro'), img)),
      hero_image: str(literal(prop(call, 'heroImage'), img)),
      hero_image_alt: str(literal(prop(call, 'heroImageAlt'), img)),
      body_heading: str(literal(prop(call, 'sectionTitle'), img)),
      body_paragraphs: arr(literal(prop(call, 'paragraphs'), img)),
      specs: arr(literal(prop(call, 'specs'), img)),

      panel_heading: str(panel?.heading),
      panel_body: arr(panel?.body),
      closing_heading: str(panel?.secondHeading),
      closing_body: arr(panel?.secondBody),

      second_panel_heading: str(second?.heading),
      second_panel_body: arr(second?.body),
      second_panel_left_image: str(secondLeft.src),
      second_panel_left_image_alt: str(secondLeft.alt),
      second_panel_image: str(secondImage.src),
      second_panel_image_alt: str(secondImage.alt),
      second_panel_sub_heading: str(second?.secondHeading),
      second_panel_sub_body: arr(second?.secondBody),

      comparison: comparison ?? {},
      meta_title: metaField(source, 'title'),
      meta_description: metaField(source, 'description'),
    },
  }
}

/* ------------------------------------------------------------- service pages
 *
 * Each page's shared spine is read from its file (metadata, hero, the const
 * arrays). The prose that sits inline in JSX, and the page-specific block, are
 * transcribed below because they cannot be parsed reliably.
 */

type ServiceCopy = {
  bodyHeading: string
  bodyParagraphs: string[]
  highlightHeading: string
  highlightText: string
  panelHeading: string
  panelIntro: string
  panelLayout: 'three-column' | 'two-column'
  panelListStyle: 'bullets' | 'pills'
  panelListConst?: string
  panelListPairs?: { label: string; value: string }[]
  panelFootnote: string
  panelCtaLabel: string
  panelCtaHref: string
  panelLeftImage: string
  panelLeftImageAlt: string
  panelRightImage: string
  panelRightImageAlt: string
  fabricsIntro: string
  whyIntro: string
  sideImage: string
  sideImageAlt: string
  videoThumb: string
  extraSections: unknown[]
}

const SERVICE_COPY: Record<string, ServiceCopy> = {
  'commission-quilting': {
    bodyHeading: 'Your Fabric. Our Expertise.',
    bodyParagraphs: [
      'Whether you send one roll a year or multiple containers every month, every order receives the same level of care and quality.',
      'We use lock stitch machines, achieving a stronger stitch to provide a better quality end product. Our equipment is continuously modified to improve quality control. Here at A.N Standard we strive to ensure the best merchandise is dispatched efficiently. Standard quilting width is 1500/1600mm however we can extend this up to 2400mm.',
    ],
    highlightHeading: 'Need delivery for a fixed production date?',
    highlightText:
      'Let us know during the quotation stage so we can schedule your order accordingly.',
    panelHeading: 'Why Choose Lock\nStitch Quilting?',
    panelIntro:
      'This makes it the preferred solution for products that need to withstand demanding environments, including:',
    panelLayout: 'three-column',
    panelListStyle: 'bullets',
    panelListConst: 'applications',
    panelFootnote:
      'Precision Multi-Needle Lock Stitch Quilting. Built Around Your Materials, Your Volumes, Your Schedule.',
    panelCtaLabel: 'Learn About Our Process',
    panelCtaHref: '/process',
    panelLeftImage: '/images/commision quilting/Rectangle 23.png',
    panelLeftImageAlt: 'A machinist setting the needle bar on a quilting machine',
    panelRightImage: '/images/commision quilting/Rectangle 23 (1).png',
    panelRightImageAlt:
      'A multi-needle quilting machine running orange fabric over wadding',
    fabricsIntro: 'Designed to Handle a Wide Range of Materials',
    whyIntro: 'Built Around Manufacturers',
    sideImage: '/images/quote/vecteezy_a-stack-of-colorful-quilts_55963077 1.png',
    sideImageAlt: 'A machinist quilting green satin on a Brother sewing machine',
    videoThumb: '/images/commision quilting/Container.png',
    extraSections: [],
  },
}

/* ------------------------------------------------------------------- runner */

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

async function migrate(
  table: string,
  slugs: string[],
  extract: (slug: string) => Extracted | null
) {
  console.log(`\n${table}`)

  for (const slug of slugs) {
    const found = extract(slug)
    if (!found) {
      console.log(`  – ${slug}: no legacy file`)
      continue
    }

    const { data: row, error: readError } = await supabase
      .from(table)
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (readError) {
      console.log(`  ✗ ${slug}: ${readError.message}`)
      continue
    }
    if (!row) {
      console.log(`  ✗ ${slug}: no database row`)
      continue
    }

    const patch: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(found.values)) {
      if (!isEmpty(value) && isEmpty(row[key])) patch[key] = value
    }

    if (Object.keys(patch).length === 0) {
      console.log(`  · ${slug}: already populated`)
      continue
    }

    if (WRITE) {
      const { error } = await supabase.from(table).update(patch).eq('slug', slug)
      if (error) {
        console.log(`  ✗ ${slug}: ${error.message}`)
        continue
      }
    }

    const note = found.unread.length ? `  (could not read: ${found.unread.join(', ')})` : ''
    console.log(`  ${WRITE ? '✓' : '→'} ${slug}: ${Object.keys(patch).length} fields${note}`)
  }
}

async function main() {
  console.log(WRITE ? 'Writing to Supabase…' : 'Dry run — pass --write to apply.')

  await migrate(
    'insulation_subpages',
    [
      'quilted-fibreglass',
      'fire-and-welding-blankets',
      'industrial-jackets',
      'technical-specification',
      'fibreglass-vs-polyester',
      'bulk-supply',
      'request-a-sample',
    ],
    extractInsulation
  )

  console.log(
    WRITE
      ? '\nDone. Verify the pages, then delete the legacy files.\n'
      : '\nNothing written. Re-run with --write to apply.\n'
  )
}

main().catch((err) => {
  console.error('\nMigration failed:', err)
  process.exit(1)
})
