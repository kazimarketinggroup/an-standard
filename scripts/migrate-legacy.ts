/**
 * Lifts the content out of the hardcoded page files and into Supabase.
 *
 *   npm run migrate-legacy          # report what would change
 *   npm run migrate-legacy -- --write
 *
 * Those pages shadow the database-driven [slug] routes, so until their content
 * is in the CMS the client can edit a sector in the admin and see nothing
 * change on the site. This reads each file's JSX props and writes them to the
 * matching row, after which the legacy files can be deleted.
 *
 * The parsing is deliberately narrow: it understands only the prop shapes these
 * files actually use, and reports anything it could not read rather than
 * guessing. Existing non-empty values in the database are never overwritten.
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

/**
 * Finds a balanced {...} or [...] region starting at `from`, so nested braces
 * and brackets inside a prop value do not end the match early.
 */
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

/** Reads `name={...}` or `name="..."` from a JSX call. */
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
  // Strip the outer JSX braces: `{'text'}` -> `'text'`, `{[...]}` -> `[...]`.
  return region ? region.slice(1, -1).trim() : null
}

/**
 * Evaluates a literal prop value. These files contain only string/array/object
 * literals plus a `${IMG}` template, so a scoped Function is enough and there
 * is no untrusted input — the source is this repository.
 */
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

/** The JSX call for a component, e.g. <SectorDetail ... />. */
function componentCall(source: string, component: string): string {
  const at = source.indexOf(`<${component}`)
  return at === -1 ? source : source.slice(at)
}

function metaField(source: string, field: 'title' | 'description'): string {
  const block = source.match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\}/)
  if (!block) return ''
  const m = block[1].match(new RegExp(`${field}:\\s*(['"\`])([\\s\\S]*?)\\1`))
  return m ? m[2].replace(/\s+/g, ' ').trim() : ''
}

type Str = string
const str = (v: unknown): Str => (typeof v === 'string' ? v : '')
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])

/* --------------------------------------------------------------- extractors */

type Extracted = { slug: string; values: Record<string, unknown>; unread: string[] }

function extractSector(slug: string): Extracted | null {
  const file = join(SITE, 'sectors', slug, 'page.tsx')
  if (!existsSync(file)) return null

  const source = readFileSync(file, 'utf8')
  const img = imgConst(source)
  const call = componentCall(source, 'SectorDetail')
  const unread: string[] = []

  const hero = literal(prop(call, 'heroImage'), img) as { src?: string; alt?: string } | null
  const banner = literal(prop(call, 'banner'), img) as Record<string, unknown> | null
  const fillings = literal(prop(call, 'fillings'), img) as Record<string, unknown> | null
  const evidence = literal(prop(call, 'evidence'), img) as Record<string, unknown> | null
  const related = literal(prop(call, 'relatedHrefs'), img) as string[] | null

  if (!hero) unread.push('heroImage')
  if (!banner) unread.push('banner')
  if (!evidence) unread.push('evidence')

  const bannerImage = (banner?.image ?? {}) as { src?: string; alt?: string }
  const evidenceImage = (evidence?.image ?? {}) as { src?: string; alt?: string }

  return {
    slug,
    unread,
    values: {
      hero_heading: str(literal(prop(call, 'accent'), img)),
      hero_subtitle: str(literal(prop(call, 'intro'), img)),
      hero_image: str(hero?.src),
      hero_image_alt: str(hero?.alt),
      intro_heading: str(literal(prop(call, 'sectionTitle'), img)),
      intro_paragraphs: arr(literal(prop(call, 'paragraphs'), img)),
      specs: arr(literal(prop(call, 'specs'), img)),
      fabrics_heading: str(banner?.heading),
      fabrics_text: arr(banner?.body),
      fabrics_image: str(bannerImage.src),
      fabrics_image_alt: str(bannerImage.alt),
      fillings_heading: str(fillings?.heading),
      fillings_text: arr(fillings?.body),
      evidence_heading: str(evidence?.heading),
      evidence_intro: arr(evidence?.body),
      evidence_list: arr(evidence?.list),
      side_image: str(evidenceImage.src),
      side_image_alt: str(evidenceImage.alt),
      related_sectors: (related ?? []).map((href) => href.replace('/sectors/', '')),
      meta_title: metaField(source, 'title'),
      meta_description: metaField(source, 'description'),
    },
  }
}

function extractInsulation(slug: string): Extracted | null {
  const file = join(SITE, 'quilted-insulation', slug, 'page.tsx')
  if (!existsSync(file)) return null

  const source = readFileSync(file, 'utf8')
  const img = imgConst(source)
  const call = componentCall(source, 'InsulationDetail')
  const unread: string[] = []

  const panel = literal(prop(call, 'panel'), img) as Record<string, unknown> | null
  const comparison = literal(prop(call, 'comparison'), img) as Record<string, unknown> | null
  const closing = literal(prop(call, 'closing'), img) as Record<string, unknown> | null

  const heroImage = str(literal(prop(call, 'heroImage'), img))
  if (!heroImage) unread.push('heroImage')

  return {
    slug,
    unread,
    values: {
      hero_heading: str(literal(prop(call, 'title'), img)),
      hero_intro: str(literal(prop(call, 'intro'), img)),
      hero_image: heroImage,
      hero_image_alt: str(literal(prop(call, 'heroImageAlt'), img)),
      body_heading: str(literal(prop(call, 'sectionTitle'), img)),
      body_paragraphs: arr(literal(prop(call, 'paragraphs'), img)),
      specs: arr(literal(prop(call, 'specs'), img)),
      panel_heading: str(panel?.heading),
      panel_body: arr(panel?.body),
      comparison: comparison ?? {},
      closing_heading: str(closing?.heading),
      closing_body: arr(closing?.body),
      meta_title: metaField(source, 'title'),
      meta_description: metaField(source, 'description'),
    },
  }
}

function extractAbout(slug: string): Extracted | null {
  const file = join(SITE, 'about', slug, 'page.tsx')
  if (!existsSync(file)) return null

  const source = readFileSync(file, 'utf8')
  const img = imgConst(source)
  const hero = componentCall(source, 'PageHero')
  const unread: string[] = []

  // Body copy lives in ProsePanel blocks, or in a paragraphs array.
  const paragraphs: string[] = []
  const proseRe = /<ProsePanel[\s\S]*?\/>/g
  let match: RegExpExecArray | null
  while ((match = proseRe.exec(source))) {
    const body = literal(prop(match[0], 'body'), img)
    for (const p of arr(body)) if (typeof p === 'string') paragraphs.push(p)
  }
  if (paragraphs.length === 0) {
    const loose = source.match(/const paragraphs\s*=\s*\[/)
    if (loose) {
      const region = balanced(source, source.indexOf('[', loose.index!))
      for (const p of arr(literal(region, img))) {
        if (typeof p === 'string') paragraphs.push(p)
      }
    }
  }
  if (paragraphs.length === 0) unread.push('body paragraphs')

  const heroImage = str(literal(prop(hero, 'image'), img))

  return {
    slug,
    unread,
    values: {
      hero_heading: str(literal(prop(hero, 'title'), img)),
      hero_intro: str(literal(prop(hero, 'intro'), img)),
      hero_image: heroImage,
      hero_image_alt: str(literal(prop(hero, 'imageAlt'), img)),
      body_paragraphs: paragraphs,
      meta_title: metaField(source, 'title'),
      meta_description: metaField(source, 'description'),
    },
  }
}

function extractService(slug: string): Extracted | null {
  const file = join(SITE, 'services', slug, 'page.tsx')
  if (!existsSync(file)) return null

  const source = readFileSync(file, 'utf8')
  const img = imgConst(source)
  const hero = componentCall(source, 'PageHero')

  const paragraphs: string[] = []
  const proseRe = /<ProsePanel[\s\S]*?\/>/g
  let match: RegExpExecArray | null
  while ((match = proseRe.exec(source))) {
    const body = literal(prop(match[0], 'body'), img)
    for (const p of arr(body)) if (typeof p === 'string') paragraphs.push(p)
  }

  return {
    slug,
    unread: [],
    values: {
      hero_heading: str(literal(prop(hero, 'title'), img)),
      hero_intro: str(literal(prop(hero, 'intro'), img)),
      hero_image: str(literal(prop(hero, 'image'), img)),
      hero_image_alt: str(literal(prop(hero, 'imageAlt'), img)),
      body_paragraphs: paragraphs,
      meta_title: metaField(source, 'title'),
      meta_description: metaField(source, 'description'),
    },
  }
}

/* ------------------------------------------------------------------- runner */

/** True for '' , [] and {} — the values the seed left behind. */
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

    const { data: row } = await supabase.from(table).select('*').eq('slug', slug).maybeSingle()
    if (!row) {
      console.log(`  ✗ ${slug}: no database row`)
      continue
    }

    // Only fill gaps: anything the client has already written stays.
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
    console.log(
      `  ${WRITE ? '✓' : '→'} ${slug}: ${Object.keys(patch).length} fields${note}`
    )
  }
}

async function main() {
  console.log(WRITE ? 'Writing to Supabase…' : 'Dry run — pass --write to apply.')

  await migrate(
    'sectors',
    [
      'healthcare',
      'soft-furnishings',
      'funeral-supplies',
      'nursery',
      'clothing',
      'automotive',
      'pet-supplies',
      'workwear',
      'equestrian',
    ],
    extractSector
  )

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

  await migrate('about_subpages', ['our-story', 'our-team', 'our-factory', 'quality'], extractAbout)

  await migrate(
    'services',
    [
      'commission-quilting',
      'wide-width-quilting',
      'bespoke-pattern-design',
      'wadding-and-fillings',
      'customer-supplied-materials',
    ],
    extractService
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
