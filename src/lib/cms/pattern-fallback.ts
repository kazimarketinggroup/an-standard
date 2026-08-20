import { patterns as hardcoded } from '../patterns'
import type { Pattern } from './types'

/**
 * Adapts the original hardcoded pattern list into CMS row shape.
 *
 * Every other page falls back to its previous copy when the database is empty;
 * the pattern pages are the only ones driven entirely by a collection, so
 * without this they would 404 rather than degrade. Once the seed has run the
 * database wins and this is never reached.
 */
export function fallbackPatterns(): Pattern[] {
  return hardcoded.map((pattern, i) => ({
    id: pattern.slug,
    slug: pattern.slug,
    title: pattern.title,
    menu_title: pattern.menuTitle,
    kind: pattern.kind,
    sort_order: i + 1,
    listing_subtitle: pattern.sizes,
    listing_teaser: pattern.body,
    tagline: pattern.tagline,
    hero_title: pattern.title,
    hero_subtitle: pattern.sizes,
    about_heading: 'About This Pattern',
    about_paragraphs: [
      pattern.detail,
      'Pattern choice is mostly a question of wadding weight. A tight grid holds a light filling flat and crisp; the same grid on a heavy filling crushes the loft you have paid for. We set the scale against the filling and the finished product, not against the drawing on its own.',
      'Every pattern runs on multi-needle lock stitch machines at up to 2400mm wide, with thread matched to your fabric or deliberately contrasted where the stitch is part of the design. Settings are held on file under your name so a repeat order comes off the machine the same way.',
    ],
    specs: [
      { label: 'Sizes', value: pattern.sizes },
      { label: 'Suitable wadding', value: pattern.wadding },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Matching or contrasting' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a rule — we’ll quilt a sample panel before you commit to a run.',
    pattern_image: pattern.image,
    pattern_image_alt: `${pattern.title} on finished fabric`,
    sample_heading: 'We sample before we run',
    sample_intro:
      'Most pattern problems show up on a sample panel and cost almost nothing to fix there. Found mid-run, they cost a production quantity of fabric.',
    sample_list: [
      'Scale checked against your wadding weight',
      'Repeat checked across the full roll width',
      'Thread and tension matched to your fabric',
      'Panel quilted for you to handle before production',
    ],
    footer_note:
      'Send a drawing, a photograph or a sample — our computerised machines are not limited to the pattern book.',
    meta_title: `${pattern.title} — A.N. Standard Ltd.`,
    meta_description: pattern.body,
  }))
}
