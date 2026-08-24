/**
 * Reads the five hardcoded service pages and prints one JSON object per page,
 * ready to paste into scripts/migrate-services.ts.
 *
 *   node scripts/extract-services.mjs > /tmp/services.json
 *
 * The const arrays parse cleanly. The prose sits inline in JSX, so it is
 * pulled out of the <h2>/<h3>/<p> elements in document order and assigned to
 * fields by position — which is only safe because every page follows the same
 * running order, and because the result is checked afterwards by diffing the
 * rendered HTML. Anything this cannot place is reported rather than dropped.
 */

import { readFileSync } from 'node:fs'

const SITE = 'src/app/(site)/services'

const PAGES = [
  'commission-quilting',
  'wide-width-quilting',
  'bespoke-pattern-design',
  'wadding-and-fillings',
  'customer-supplied-materials',
]

function balanced(source, from) {
  const open = source[from]
  const close = open === '{' ? '}' : open === '[' ? ']' : null
  if (!close) return null
  let depth = 0
  let inString = null
  for (let i = from; i < source.length; i++) {
    const c = source[i]
    if (inString) {
      if (c === inString && source[i - 1] !== '\\') inString = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { inString = c; continue }
    if (c === open) depth++
    else if (c === close) { depth--; if (depth === 0) return source.slice(from, i + 1) }
  }
  return null
}

function constArray(source, name, img) {
  const at = source.search(new RegExp(`const ${name}\\s*=\\s*\\[`))
  if (at === -1) return null
  const region = balanced(source, source.indexOf('[', at))
  try {
    const value = new Function('IMG', `return (${region})`)(img)
    return Array.isArray(value) ? value : null
  } catch {
    return null
  }
}

/** Every <h2>/<h3>/<p> in document order, with tags and expressions stripped. */
function prose(source) {
  const body = source.slice(source.search(/^export default function/m))
  const re = /<(h2|h3|p)\b[^>]*>([\s\S]*?)<\/\1>/g
  const out = []
  let m
  while ((m = re.exec(body))) {
    const text = m[2]
      .replace(/\{[^{}]*\}/g, '')
      // A <br /> is a deliberate line break in the design, so keep it as \n.
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<[^>]+>/g, ' ')
      // Collapse runs of spaces without eating the newlines just introduced.
      .replace(/[^\S\n]+/g, ' ')
      .replace(/ ?\n ?/g, '\n')
      // A <br /> between two text nodes yields several newlines; keep one.
      .replace(/\n{2,}/g, '\n')
      .replace(/&amp;/g, '&')
      .trim()
    if (text.length > 3) out.push({ tag: m[1], text })
  }
  return out
}

/**
 * A JSX attribute's value. Template forms carry `${IMG}`, which has to be
 * resolved here — leaving it literal produces a src next/image rejects.
 */
function attr(source, name, img = '') {
  const m = source.match(new RegExp(`\\b${name}=(?:"([^"]*)"|\\{\`([^\`]*)\`\\})`))
  if (!m) return ''
  const raw = (m[1] ?? m[2] ?? '').trim()
  return raw.replace(/\$\{IMG\}/g, img)
}

function meta(source, field) {
  const block = source.match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\}/)
  if (!block) return ''
  const m = block[1].match(new RegExp(`${field}:\\s*(['"\`])([\\s\\S]*?)\\1`))
  return m ? m[2].replace(/\s+/g, ' ').trim() : ''
}

/** Images used by the lock-stitch panel, in source order. */
function panelImages(source, img) {
  const re = /<Image\s+src=\{`\$\{IMG\}\/([^`]+)`\}\s+alt="([^"]*)"/g
  const out = []
  let m
  while ((m = re.exec(source))) out.push({ src: `${img}/${m[1]}`, alt: m[2] })
  return out
}

const results = {}

for (const slug of PAGES) {
  const source = readFileSync(`${SITE}/${slug}/page.tsx`, 'utf8')
  const img = (source.match(/const IMG = ['"]([^'"]+)['"]/) ?? [, ''])[1]
  const p = prose(source)
  const notes = []

  // The running order is identical on every page:
  //   h2 body heading, p… body paragraphs, h3 highlight + p,
  //   h2 panel heading, p panel intro, … , h2 "Fabrics We Quilt" + p intro,
  //   h2 "Why Work With Us?" + p intro, then any page-specific block.
  const fabricsAt = p.findIndex((x) => x.tag === 'h2' && /Fabrics We Quilt/i.test(x.text))
  const whyAt = p.findIndex((x) => x.tag === 'h2' && /Why Work With Us/i.test(x.text))
  if (fabricsAt === -1) notes.push('no "Fabrics We Quilt" heading')
  if (whyAt === -1) notes.push('no "Why Work With Us" heading')

  const head = p.slice(0, fabricsAt === -1 ? p.length : fabricsAt)
  const bodyHeading = head[0]?.tag === 'h2' ? head[0].text : ''
  const highlightAt = head.findIndex((x) => x.tag === 'h3')
  const secondH2At = head.findIndex((x, i) => i > 0 && x.tag === 'h2')

  const bodyEnd = highlightAt !== -1 ? highlightAt : secondH2At !== -1 ? secondH2At : head.length
  const bodyParagraphs = head.slice(1, bodyEnd).filter((x) => x.tag === 'p').map((x) => x.text)

  const highlightHeading = highlightAt !== -1 ? head[highlightAt].text : ''
  const highlightText =
    highlightAt !== -1 && head[highlightAt + 1]?.tag === 'p' ? head[highlightAt + 1].text : ''

  const panelHeading = secondH2At !== -1 ? head[secondH2At].text : ''
  const panelIntro =
    secondH2At !== -1 && head[secondH2At + 1]?.tag === 'p' ? head[secondH2At + 1].text : ''

  // The bold line closing the panel card, when present.
  const footnoteMatch = source.match(
    /className="mt-6 border-t border-black\/8 pt-6 text-lg font-semibold leading-snug sm:text-xl">\s*([\s\S]*?)\s*<\/p>/
  )
  const panelFootnote = footnoteMatch
    ? footnoteMatch[1].replace(/\s+/g, ' ').replace(/&amp;/g, '&').trim()
    : ''

  // Some pages close the panel card with a plain paragraph instead of the bold
  // footnote. Captured separately so neither style is lost.
  const panelNoteMatch = source.match(
    /<div className="mt-6 border-t border-black\/8 pt-6 space-y-4">\s*<p[^>]*>([\s\S]*?)<\/p>/
  )
  const panelNote = panelNoteMatch
    ? panelNoteMatch[1].replace(/\s+/g, ' ').replace(/&amp;/g, '&').trim()
    : ''

  /*
   * The "See our work process" link, its thumbnail, and the large photo beside
   * that column. All three sit in the last section, after the reasons list.
   */
  const videoBlock = source.match(
    /<a\s+href="(https?:\/\/[^"]+)"[\s\S]{0,400}?border-t border-black\/10 pt-6"[\s\S]*?<\/a>/
  )
  const videoUrl = videoBlock ? videoBlock[1] : ''
  const videoThumb = videoBlock
    ? (videoBlock[0].match(/src=\{`\$\{IMG\}\/([^`]+)`\}/)?.[1] ?? '')
    : ''
  const videoLabel = videoBlock
    ? (videoBlock[0]
        .match(/underline-offset-4[^>]*>\s*([\s\S]*?)\s*<\/span>/)?.[1]
        ?.replace(/\s+/g, ' ')
        .trim() ?? '')
    : ''
  const videoCaption = videoBlock
    ? (videoBlock[0]
        .match(/text-xs text-brand-muted">\s*([\s\S]*?)\s*<\/span>/)?.[1]
        ?.replace(/\s+/g, ' ')
        .trim() ?? '')
    : ''

  // The photo in the right-hand column, referenced by absolute path.
  const sideMatch = source.match(
    /<div className="relative aspect-\[4\/3\] w-full overflow-hidden rounded-xl">\s*<Image\s+src="([^"]+)"\s+alt="([^"]*)"/
  )

  const tail = whyAt === -1 ? [] : p.slice(whyAt + 1)
  const whyIntro = tail[0]?.tag === 'p' ? tail[0].text : ''
  const fabricsIntro =
    fabricsAt !== -1 && p[fabricsAt + 1]?.tag === 'p' ? p[fabricsAt + 1].text : ''

  const images = panelImages(source, img)
  const twoColumn = source.includes('minmax(0,240px)_minmax(0,1fr)]')

  // Swatch images come first in source order, then the panel's own.
  const swatches = constArray(source, 'swatches', img) ?? []
  const panelImgs = images.filter((i) => !swatches.some((s) => s.src === i.src))

  /*
   * The page-specific blocks. Each is an h2 that is not part of the shared
   * spine, paired with the const array it renders. Declared per page because
   * the pairing cannot be inferred from the markup alone.
   */
  const EXTRA_SPEC = {
    'wide-width-quilting': [
      { heading: 'Send the cut plan, not the roll width', style: 'text', from: null },
    ],
    'bespoke-pattern-design': [
      { heading: 'Book pattern or bespoke?', style: 'columns', from: 'bespokeOptions' },
      { heading: 'From sketch to signed-off pattern', style: 'steps', from: 'patternProcess' },
    ],
    'wadding-and-fillings': [
      { heading: 'Weight and pattern are one decision, not two', style: 'text', from: null },
    ],
    'customer-supplied-materials': [
      { heading: 'Limits worth knowing before you ship', style: 'bullets', from: 'limits' },
      { heading: 'The safe route: a sample run first', style: 'steps', from: 'sampleRoute' },
      { heading: 'Weight and pattern are one decision, not two', style: 'text', from: null },
    ],
  }

  const extraSections = (EXTRA_SPEC[slug] ?? []).map((spec) => {
    const at = p.findIndex((x) => x.tag === 'h2' && x.text === spec.heading)
    if (at === -1) notes.push(`extra section not found: ${spec.heading}`)
    const intro = at !== -1 && p[at + 1]?.tag === 'p' ? p[at + 1].text : ''

    let items = []
    if (spec.from) {
      const raw = constArray(source, spec.from, img)
      if (!raw) notes.push(`const not read: ${spec.from}`)
      items = (raw ?? []).map((item) =>
        // Normalise the published item shapes onto one. Plain strings pass through.
        typeof item !== 'object' || item === null
          ? item
          : 'range' in item
          ? { label: item.range, value: item.uses }
          : 'body' in item
            ? { title: item.title, body: item.body }
            : 'items' in item
              ? { title: item.title, items: item.items }
              : item
      )
    }

    return { heading: spec.heading, intro, style: spec.style, items }
  })

  // The button inside the panel card.
  const ctaMatch = source.match(
    /<Link href="([^"]+)" className="btn-primary mt-[68]">([\s\S]*?)<\/Link>/
  )
  const panelCtaHref = ctaMatch ? ctaMatch[1] : ''
  const panelCtaLabel = ctaMatch ? ctaMatch[2].replace(/\s+/g, ' ').trim() : ''

  // The panel's own list: a const array, or the weight guide rendered as pills.
  const panelListConst = ['applications', 'weightGuide', 'limits'].find((name) =>
    source.includes(`{${name}.map(`)
  )
  const panelListRaw = panelListConst ? (constArray(source, panelListConst, img) ?? []) : []
  const panelPills =
    panelListRaw.length > 0 &&
    typeof panelListRaw[0] === 'object' &&
    panelListRaw[0] !== null &&
    'range' in panelListRaw[0]

  results[slug] = {
    meta_title: meta(source, 'title'),
    meta_description: meta(source, 'description'),
    hero_heading: attr(source, 'title', img),
    hero_intro: attr(source, 'intro', img),
    hero_image: attr(source, 'image', img),
    hero_image_alt: attr(source, 'imageAlt', img),
    swatches,
    body_heading: bodyHeading,
    body_paragraphs: bodyParagraphs,
    highlight_box_heading: highlightHeading,
    highlight_box_text: highlightText,
    specs: constArray(source, 'specs', img) ?? [],
    panel_heading: panelHeading,
    panel_intro: panelIntro,
    panel_layout: twoColumn ? 'two-column' : 'three-column',
    panel_left_image: panelImgs[0]?.src ?? '',
    panel_left_image_alt: panelImgs[0]?.alt ?? '',
    panel_right_image: twoColumn ? '' : (panelImgs[1]?.src ?? ''),
    panel_right_image_alt: twoColumn ? '' : (panelImgs[1]?.alt ?? ''),
    panel_list: panelPills
      ? panelListRaw.map((x) => ({ label: x.range, value: x.uses }))
      : panelListRaw,
    panel_list_style: panelPills ? 'pills' : 'bullets',
    panel_cta_label: panelCtaLabel,
    panel_cta_href: panelCtaHref,
    panel_footnote: panelFootnote || panelNote,
    fabrics_heading: fabricsAt === -1 ? '' : p[fabricsAt].text,
    fabrics_intro: fabricsIntro,
    fabrics_we_quilt: constArray(source, 'fabrics', img) ?? [],
    why_heading: whyAt === -1 ? '' : p[whyAt].text,
    why_intro: whyIntro,
    why_work_with_us: constArray(source, 'reasons', img) ?? [],
    video_url: videoUrl,
    video_thumbnail_image: videoThumb ? img + '/' + videoThumb : '',
    video_label: videoLabel,
    video_caption: videoCaption,
    side_image: sideMatch ? sideMatch[1] : '',
    side_image_alt: sideMatch ? sideMatch[2] : '',
    extra_sections: extraSections,
    _notes: notes,
    _allProse: p,
    _constNames: [...source.matchAll(/^const (\w+) =/gm)].map((m) => m[1]),
  }
}

console.log(JSON.stringify(results, null, 2))
