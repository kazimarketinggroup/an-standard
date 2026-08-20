import type { PatternKind } from '../components/patterns/PatternSwatch'

export type Pattern = {
  /** URL segment for the pattern's own page. */
  slug: string
  /** Full name used on the patterns page cards. */
  title: string
  /** Shorter label used in the navbar dropdown. */
  menuTitle: string
  /** Sizes we run, quoted as the machine is set. */
  sizes: string
  /** One line used in the navbar dropdown. */
  tagline: string
  /** Fuller line used under the sizes on the page. */
  body: string
  kind: PatternKind
  /** Fabric photo used as the dropdown thumbnail and on the detail page. */
  image: string
  /** Detail page: the paragraph specific to this pattern. */
  detail: string
  /** Detail page: wadding this pattern suits, for the spec table. */
  wadding: string
}

/** Single source of truth: drives the patterns page and the navbar menu. */
export const patterns: Pattern[] = [
  {
    slug: 'box-quilting',
    title: 'Box quilting',
    menuTitle: 'Box (1¼", 2", 4")',
    sizes: '1¼" (35mm), 2", 4"',
    tagline: 'Classic box quilting in three sizes',
    body: '1¼" (35mm), 2" and 4". Our most requested pattern family.',
    kind: 'box',
    image: '/images/home/Rectangle 32.png',
    detail:
      'Our most requested pattern family, used heavily in fashion and nursery products. Available at 1¼" (35mm), 2" and 4". Smaller boxes give a firmer, flatter finish and suit lighter waddings; larger boxes carry heavier fillings without over-compressing them.',
    wadding: '70–200gsm polyester at 1¼"; 2" and 4" for 200gsm and above',
  },
  {
    slug: 'diamond-and-overlapping',
    title: 'Diamond and overlapping patterns',
    menuTitle: 'Diamond and overlap',
    sizes: 'Double diamond, diamond overlap, wavy diamond overlap',
    tagline: 'Elegant diamond and overlapping designs',
    body: 'Double diamond, diamond overlap and wavy diamond overlap.',
    kind: 'diamond',
    image: '/images/home/Rectangle 37.png',
    detail:
      'Double diamond, diamond overlap and wavy diamond overlap. Overlapping patterns add strength to the quilting, which makes them a common choice where the finished product will be handled, laundered or loaded repeatedly.',
    wadding: '70–250gsm polyester, felt & customer-supplied flame-retardant fillings',
  },
  {
    slug: 'wavy-line-quilting',
    title: 'Wavy line quilting',
    menuTitle: 'Wavy lines',
    sizes: '2" standard, adjustable in 1" increments',
    tagline: 'Soft, flowing wave-style stitching',
    body: '2" as standard, adjustable in 1" increments.',
    kind: 'wavy',
    image: '/images/home/Rectangle 38.png',
    detail:
      'A softer alternative to straight lines, at 2" as standard and adjustable in 1" increments. Suits heavier waddings and applications where a directional stitch is acceptable.',
    wadding: '150–300gsm polyester, foam up to 10mm',
  },
  {
    slug: 'vertical-line-quilting',
    title: 'Vertical line quilting',
    menuTitle: 'Vertical lines',
    sizes: '1" standard, adjustable in 1" increments',
    tagline: 'Clean, simple vertical channel quilting',
    body: '1" as standard. The simplest pattern we run, often the most economical.',
    kind: 'vertical',
    image: '/images/home/Rectangle 39.png',
    detail:
      '1" as standard, adjustable in 1" increments. The simplest pattern we run and often the most economical. Well suited to heavier waddings and to products where quilting runs along the length of a panel.',
    wadding: '150–300gsm polyester and foam; the most forgiving pattern for thick fillings',
  },
  {
    slug: 'hourglass-quilting',
    title: 'Hourglass quilting',
    menuTitle: 'Hourglass',
    sizes: 'Large hourglass',
    tagline: 'Distinctive hourglass repeat pattern',
    body: 'A large pattern designed for heavier weight waddings.',
    kind: 'hourglass',
    image: '/images/home/Rectangle 40.png',
    detail:
      'Our large hourglass pattern is designed for heavier weight waddings, where a smaller pattern would flatten the loft. Common in equestrian and pet bedding applications.',
    wadding: '250gsm and above, including customer-supplied heavyweight and hollowfibre fillings',
  },
  {
    slug: 'bespoke-quilting',
    title: 'Bespoke quilting patterns',
    menuTitle: 'Bespoke patterns',
    sizes: 'To your drawing',
    tagline: 'Fully custom patterns to your spec.',
    body: 'Computerised machines. Send a sketch, a photograph or a sample.',
    kind: 'bespoke',
    image: '/images/home/Rectangle 85.png',
    detail:
      "Our machines have been modified into computerised machines, which means we are not limited to the pattern book. Several of the patterns we run today started as a customer sketch. Send us a drawing, a photograph or a sample of what you're trying to achieve and we'll tell you whether we can run it.",
    wadding: '70–300gsm polyester and customer-supplied fillings, subject to a sample run',
  },
]

export const patternsMenuImage = {
  src: '/images/home/Rectangle 29.png',
  alt: 'Close-up of deep red wavy-line quilted fabric',
}
