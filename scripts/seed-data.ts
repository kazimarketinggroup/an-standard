/**
 * The current live-site content, transcribed from the hardcoded sources it
 * used to live in (src/lib/*.ts and the page/component files).
 *
 * This is the seed payload only — scripts/seed.ts does the writing. Keeping
 * the data separate keeps the upload logic readable and lets the payload be
 * type-checked against the CMS types.
 */

import { DEFAULT_HOURS } from '../src/lib/hours'

export const globalSettings = {
  id: 1,
  company_name: 'A.N. Standard Ltd.',
  tagline: 'Commission quilters since 1975',
  topbar_email: 'info@anstandardquilting.com',
  topbar_whatsapp: '+447949709412',
  header_phone: '0121 555 8101',
  phone_href: 'tel:01215558101',
  whatsapp_href: 'https://wa.me/447949709412',
  email_href: 'mailto:info@anstandardquilting.com',
  logo_image: '/images/home/mainLogo.png',
  footer_logo_image: '/images/home/footerLogoWhite.png',
  address_line1: 'Unit 11A, Parkrose Industrial Estate,',
  address_line2: 'Middlemore Road, West Midlands, B66 2DZ',
  office_hours: DEFAULT_HOURS,
  social_links: [
    { label: 'Facebook', url: 'https://facebook.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ],
  footer_copyright_text: '© 2026 A.N Standard Ltd',
  cta_block_heading: 'Tell us what you need quilting',
  cta_block_text:
    'Send us your fabric and filling, tell us the pattern, and we will quote you on the work.',
}

export const homePage = {
  id: 1,
  hero_image: '/images/home/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png',
  hero_image_alt: 'Close-up of an autumn-toned patchwork quilt',
  hero_title: 'Commission\nQuilters Since 1975',
  hero_subtitle:
    'Multi-needle lock stitch quilting up to 2400mm wide, from our factory in the West Midlands. Your fabric, your filling, your pattern or ours.',
  hero_buttons: [
    { label: 'Request A Quote', href: '/quote', style: 'primary' },
    { label: 'See our patterns', href: '/patterns', style: 'outline' },
    { label: '0121 555 8101', href: 'tel:01215558101', style: 'call' },
  ],
  stat_badges: [
    { label: 'Established', value: '1975' },
    { label: 'Third generation', value: 'Family-run' },
    { label: 'Manufactured in the', value: 'West Midlands' },
    { label: 'UK-sourced wadding', value: 'held in stock' },
  ],
  about_heading: 'About A.N. Standard Ltd.',
  about_paragraphs: [
    'Established in 1975, we are a family based company offering commission quilting in the heart of the Midlands. With the third generation of the family having taken the reins in 2021 and recently acquiring another quilting company we are in a better position than ever to offer our customers a first class quilting service.',
    'We specialise in multi-needle quilting in a wide range of patterns for a variety of uses including apparel, bedding, equestrian and healthcare. We specialise in quilting wax fabric and are a leading supplier of quilted insulation.',
    'Our friendly team are always on hand to discuss your quilting needs. Taking you through the whole quilting process, fabric, filling and which patterns are best suited to your end application.',
  ],
  about_image: '',
  services_intro_heading: 'What we do',
  services_intro_text:
    'Commission quilting on multi-needle lock stitch machines, in your pattern or ours.',
  services_intro_image: '/images/services/Rectangle 13.png',
  insulation_heading: "The UK's leading supplier\nof quilted fibreglass",
  insulation_text:
    'We worked alongside the developer of quilted fibreglass and have since taken over its full manufacture. We can take in full container loads or supply smaller quantities — the minimum order does not have to be large.',
  insulation_image: '/images/home/vecteezy_a-stack-of-colorful-quilts_55963077 1.png',
  sectors_heading: 'Nine industries, one factory',
  sectors_intro:
    'The right pattern depends on what the finished product has to do. A funeral supplier and an equestrian manufacturer are quilting for entirely different reasons, and we have been doing both for decades.',
  featured_sector_slug: 'healthcare',
  patterns_heading: 'Patterns we run',
  patterns_intro:
    'Box, diamond, wavy, vertical, hourglass and bespoke patterns, run on computerised multi-needle machines.',
  process_heading: 'From fabric arriving\nto despatch',
  process_intro: '',
  process_image: '',
  process_steps: [
    { title: 'Fabric in, rerolled and allocated.', description: '' },
    { title: 'Wadding selected.', description: '' },
    { title: 'Machines threaded by hand.', description: '' },
    {
      title: 'Every roll checked for thread breaks and slips before it leaves us.',
      description: '',
    },
  ],
  history_heading: 'Fifty years,\nthree generations',
  history_paragraphs: [
    'Since then we have acquired another quilting company, which brought additional machines, additional patterns and more capacity than we have had at any point in our history. It also brought a second set of customers, some of whom had been with that business as long as ours had been with us.',
    'What hasn’t changed is how the work is done. Machines are still threaded by hand. Every roll is still checked before it leaves. The people who answer the phone are the people who run the machines.',
  ],
  quote_cta_heading: 'Tell us what you need quilting',
  quote_cta_text:
    'Send us your fabric and filling, tell us the pattern, and we will quote you on the work.',
  meta_title: 'A.N. Standard Ltd. — Commission Quilters Since 1975',
  meta_description:
    'Multi-needle lock stitch commission quilting up to 2400mm wide, from our factory in the West Midlands.',
}

export const services = [
  {
    slug: 'commission-quilting',
    title: 'Commission Quilting',
    menu_title: 'Commission Quilting',
    tagline: 'Custom quilting made to your exact design',
    icon: 'diamondStitch',
    sort_order: 1,
    show_in_footer: true,
    listing_card_image: '/images/services/Rectangle 29.png',
    listing_card_alt: 'A needle stitching through richly coloured quilted fabric',
    listing_card_teaser:
      'Send us your fabric and filling, and we’ll quilt it to your chosen pattern before returning it to you. It’s the same trusted service we’ve been providing since 1975.',
    hero_image: '/images/commision quilting/Rectangle 23.png',
    hero_image_alt: 'A needle stitching through richly coloured quilted fabric',
    hero_heading: 'Commission Quilting',
    hero_intro:
      'Send us your fabric and filling. We quilt it to your pattern and send it back.',
    specs: [
      { label: 'Standard width', value: '1500–1600mm' },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Stock wadding', value: '70–300gsm' },
      { label: 'Stitch', value: 'Multi-needle lock stitch' },
    ],
    meta_title: 'Commission Quilting — A.N. Standard Ltd.',
    meta_description:
      'Send us your fabric and filling. We quilt it to your pattern on multi-needle lock stitch machines and send it back.',
  },
  {
    slug: 'wide-width-quilting',
    title: 'Wide-Width Quilting',
    menu_title: 'Wide-Width Quilting',
    tagline: 'Long-arm quilting for oversized quilts',
    icon: 'wideStitch',
    sort_order: 2,
    show_in_footer: true,
    listing_card_image: '/images/services/Rectangle 33.png',
    listing_card_alt: 'Folds of soft cream fleece fabric',
    listing_card_teaser:
      'Our standard quilting width is 1500–1600mm, but for larger products we can quilt up to 2400mm, eliminating the need to join panels and ensuring a cleaner finish.',
    hero_image: '/images/wide-width quilting/Rectangle 23.png',
    hero_image_alt: 'Folds of soft cream fleece fabric',
    hero_heading: 'Wide-Width Quilting',
    hero_intro: 'Quilting up to 2400mm wide, with no joined panels.',
    specs: [
      { label: 'Standard width', value: '1500–1600mm' },
      { label: 'Maximum width', value: '2400mm' },
    ],
    meta_title: 'Wide-Width Quilting — A.N. Standard Ltd.',
    meta_description:
      'Quilting up to 2400mm wide, eliminating the need to join panels for a cleaner finish.',
  },
  {
    slug: 'bespoke-pattern-design',
    title: 'Bespoke Pattern Design',
    menu_title: 'Bespoke Pattern Design',
    tagline: 'Unique patterns designed just for you',
    icon: 'bespokeStitch',
    sort_order: 3,
    show_in_footer: true,
    listing_card_image: '/images/services/Rectangle 30.png',
    listing_card_alt: 'Damask patterned fabric with metallic thread detail',
    listing_card_teaser:
      'Our quilting machines have been upgraded with computerised technology, allowing us to create custom quilting patterns beyond the limitations of a traditional pattern library.',
    hero_image: '/images/bespoke-pattern/Rectangle 23.png',
    hero_image_alt: 'Damask patterned fabric with metallic thread detail',
    hero_heading: 'Bespoke Pattern Design',
    hero_intro: 'Computerised machines, so we are not limited to the pattern book.',
    specs: [{ label: 'Lead time', value: 'Sample first, then production' }],
    meta_title: 'Bespoke Pattern Design — A.N. Standard Ltd.',
    meta_description:
      'Computerised quilting machines let us create custom patterns beyond a traditional pattern library.',
  },
  {
    slug: 'wadding-and-fillings',
    title: 'Wadding & Fillings',
    menu_title: 'Wadding & Fillings',
    tagline: 'Premium wadding for warmth and drape',
    icon: 'boxStitch',
    sort_order: 4,
    show_in_footer: true,
    listing_card_image: '/images/services/Rectangle 31.png',
    listing_card_alt: 'A grid of coloured quilted fabric squares',
    listing_card_teaser:
      'We stock UK-sourced recycled polyester wadding in weights ranging from 70gsm to 300gsm. All materials comply with BS 5852 Part 2: 1982 standards.',
    hero_image: '/images/waddingandfellings/Rectangle 23.png',
    hero_image_alt: 'A grid of coloured quilted fabric squares',
    hero_heading: 'Wadding & Fillings',
    hero_intro: 'UK-sourced recycled polyester wadding, 70gsm to 300gsm, held in stock.',
    specs: [
      { label: 'Stock range', value: '70–300gsm' },
      { label: 'Compliance', value: 'BS 5852 Part 2: 1982' },
    ],
    meta_title: 'Wadding & Fillings — A.N. Standard Ltd.',
    meta_description:
      'UK-sourced recycled polyester wadding from 70gsm to 300gsm, compliant with BS 5852 Part 2: 1982.',
  },
  {
    slug: 'customer-supplied-materials',
    title: 'Customer-Supplied Materials',
    menu_title: 'Customer-Supplied Materials',
    tagline: 'Bring your own fabric, we’ll quilt it',
    icon: 'gridStitch',
    sort_order: 5,
    show_in_footer: true,
    listing_card_image: '/images/services/Rectangle 32.png',
    listing_card_alt: 'Rolls of patterned paisley fabric',
    listing_card_teaser:
      'If polyester wadding isn’t suitable for your application, you’re welcome to supply your own materials. We regularly quilt a wide range of fillings, including foam, felt, and natural fibres.',
    hero_image: '/images/customer-supplied/Rectangle 23.png',
    hero_image_alt: 'Rolls of patterned paisley fabric',
    hero_heading: 'Customer-Supplied Materials',
    hero_intro:
      'Supply your own fabric and filling. We quilt foam, felt and natural fibres as standard.',
    specs: [{ label: 'Pricing', value: 'No penalty for customer-supplied materials' }],
    meta_title: 'Customer-Supplied Materials — A.N. Standard Ltd.',
    meta_description:
      'Supply your own materials — we regularly quilt foam, felt and natural fibres with no pricing penalty.',
  },
]

export const sectors = [
  {
    slug: 'healthcare',
    title: 'Healthcare',
    tagline: 'Quilted insulation for medical and care settings',
    icon: 'heartPulse',
    sort_order: 1,
    show_in_footer: true,
    listing_card_teaser:
      'Laundered harder and more often than almost anything else we quilt.',
    home_blurb: 'Laundered harder and more often than almost anything else we quilt.',
    hero_image: '/images/healthcare/Rectangle 95.png',
    hero_image_alt: 'Folds of pale blue open-weave medical mesh fabric',
    hero_heading: 'Healthcare',
    hero_subtitle: 'Laundered harder and more often than almost anything else we quilt.',
    intro_heading: 'What Healthcare Manufacturers Need From Quilting',
    intro_paragraphs: [
      "Healthcare textiles get laundered harder and more often than almost anything else we quilt. Mattress covers, patient slings, positioning aids and ward soft furnishings all need a stitch that survives industrial washing without opening up, and a filling that keeps its loft after repeated cycles. We've supplied healthcare manufacturers for decades and understand what the sector asks for before you have to explain it.",
      'We quilt on commission only. You send fabric on the roll, we quilt it to your chosen filling on multi-needle lock stitch machines, and the finished rolls come back ready to cut. We never make competing finished products, so nothing you tell us ends up in a rival’s catalogue.',
    ],
    specs: [
      { label: 'Standard width', value: '1500–1600mm' },
      { label: 'Maximum Width', value: '2400mm' },
      { label: 'Stock wadding', value: '70–300gsm' },
      { label: 'Stitch', value: 'Multi-needle lock stitch' },
    ],
    fabrics_heading: 'Fabrics we quilt for healthcare',
    fabrics_text: [
      'Wipe-clean PU and PVC-coated fabrics, polyester woven and knitted fabrics, and antimicrobial-treated cloth. If your fabric is coated, tell us at quote stage — coating affects needle selection and stitch tension.',
      'If you are unsure whether a fabric will run coated, waxed, very light or very open, send us five metres and we will quilt a sample before you commit to a production quantity.',
    ],
    fabrics_image: '/images/healthcare/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png',
    fabrics_image_alt: 'Close-up of a patchwork quilt in many colours',
    fillings_heading: 'Fillings and waddings',
    fillings_text: [
      'Our stock polyester wadding runs from 70gsm to 300gsm, is made from recycled polyester and complies with BS5852 Part 2 1982. Heavier weights are available on request. Where an application calls for foam, felt, a natural filling or a specified flame-retardant material, we quilt customer-supplied materials as standard, with no penalty in our pricing for doing so.',
    ],
    evidence_heading: "Material data we can evidence, tests we won't invent",
    evidence_intro: [
      'Reaction-to-fire and durability classifications belong to a finished article and its test, not to roll goods. We supply what we can evidence and quilt panels for you to submit.',
    ],
    evidence_list: [
      'UK-sourced recycled polyester wadding to BS5852 Part 2 1982',
      'Documentation and batch traceability with any order',
      'Free sample panels for you or your test house',
      'Customer-approved or customer-supplied materials on request',
    ],
    related_sectors: ['nursery', 'soft-furnishings'],
    meta_title: 'Quilting For The Healthcare Sector — A.N. Standard Ltd.',
    meta_description:
      'Healthcare textiles are laundered harder and more often than almost anything else we quilt.',
  },
  {
    slug: 'soft-furnishings',
    title: 'Soft furnishings',
    tagline: 'Quilted fabrics for cushions, throws and upholstery',
    icon: 'sofa',
    sort_order: 2,
    show_in_footer: true,
    listing_card_teaser: 'Appearance-led. Stitch has to look right as well as hold.',
    home_blurb: 'Appearance-led. Stitch has to look right as well as hold.',
    hero_heading: 'Soft furnishings',
    hero_subtitle: 'Appearance-led. Stitch has to look right as well as hold.',
    related_sectors: ['healthcare', 'nursery'],
    meta_title: 'Quilting For Soft Furnishings — A.N. Standard Ltd.',
    meta_description: 'Appearance-led quilting for cushions, throws and upholstery.',
  },
  {
    slug: 'funeral-supplies',
    title: 'Funeral supplies',
    tagline: 'Quilted satin linings for coffins and caskets',
    icon: 'candle',
    sort_order: 3,
    show_in_footer: true,
    listing_card_teaser: 'Discretion and consistency. Repeat orders to fixed specification.',
    home_blurb: 'Discretion and consistency. Repeat orders to fixed spec.',
    hero_heading: 'Funeral supplies',
    hero_subtitle: 'Discretion and consistency. Repeat orders to fixed specification.',
    related_sectors: ['soft-furnishings', 'clothing'],
    meta_title: 'Quilting For Funeral Supplies — A.N. Standard Ltd.',
    meta_description: 'Quilted satin linings for coffins and caskets, to fixed specification.',
  },
  {
    slug: 'nursery',
    title: 'Nursery',
    tagline: 'Soft, safe quilting for baby and nursery products',
    icon: 'baby',
    sort_order: 4,
    show_in_footer: true,
    listing_card_teaser: 'Safety, softness and washability for parent-facing products.',
    home_blurb: 'Safety, softness, washability. Parent-facing product.',
    hero_heading: 'Nursery',
    hero_subtitle: 'Safety, softness and washability for parent-facing products.',
    related_sectors: ['healthcare', 'clothing'],
    meta_title: 'Quilting For Nursery Products — A.N. Standard Ltd.',
    meta_description: 'Soft, safe, washable quilting for baby and nursery products.',
  },
  {
    slug: 'clothing',
    title: 'Clothing',
    tagline: 'Quilting for jackets, outerwear and apparel',
    icon: 'shirt',
    sort_order: 5,
    show_in_footer: true,
    listing_card_teaser: 'Fashion-led, seasonal production with wax fabric expertise.',
    home_blurb: 'Fashion-led, seasonal, wax fabric a stated speciality.',
    hero_heading: 'Clothing',
    hero_subtitle: 'Fashion-led, seasonal production with wax fabric expertise.',
    related_sectors: ['workwear', 'nursery'],
    meta_title: 'Quilting For Clothing And Apparel — A.N. Standard Ltd.',
    meta_description: 'Fashion-led seasonal quilting for jackets, outerwear and apparel.',
  },
  {
    slug: 'automotive',
    title: 'Automotive',
    tagline: 'Insulation and lining for vehicle interiors',
    icon: 'car',
    sort_order: 6,
    show_in_footer: false,
    listing_card_teaser:
      'Dimensional stability and heat resistance for interior trim and insulation.',
    home_blurb: 'Dimensional stability and heat. Interior trim and insulation.',
    hero_heading: 'Automotive',
    hero_subtitle: 'Dimensional stability and heat resistance for interior trim and insulation.',
    related_sectors: ['workwear', 'equestrian'],
    meta_title: 'Quilting For The Automotive Sector — A.N. Standard Ltd.',
    meta_description: 'Quilted insulation and lining for vehicle interiors and trim.',
  },
  {
    slug: 'pet-supplies',
    title: 'Pet supplies',
    tagline: 'Warm, durable quilting for pet products.',
    icon: 'paw',
    sort_order: 7,
    show_in_footer: false,
    listing_card_teaser:
      'Durable, cost-effective quilting for bedding that gets chewed and washed.',
    home_blurb: 'Durability and cost. Bedding that gets chewed and washed.',
    hero_heading: 'Pet supplies',
    hero_subtitle: 'Durable, cost-effective quilting for bedding that gets chewed and washed.',
    related_sectors: ['equestrian', 'soft-furnishings'],
    meta_title: 'Quilting For Pet Supplies — A.N. Standard Ltd.',
    meta_description: 'Durable, cost-effective quilting for pet bedding and products.',
  },
  {
    slug: 'workwear',
    title: 'Workwear',
    tagline: 'Hard-wearing quilted linings for workwear',
    icon: 'hardHat',
    sort_order: 8,
    show_in_footer: false,
    listing_card_teaser: 'Warmth-to-weight performance with excellent abrasion resistance.',
    home_blurb: 'Warmth-to-weight and abrasion. Often flame-retardant.',
    hero_heading: 'Workwear',
    hero_subtitle: 'Warmth-to-weight performance with excellent abrasion resistance.',
    related_sectors: ['clothing', 'automotive'],
    meta_title: 'Quilting For Workwear — A.N. Standard Ltd.',
    meta_description: 'Hard-wearing quilted linings with warmth-to-weight and abrasion resistance.',
  },
  {
    slug: 'equestrian',
    title: 'Equestrian',
    tagline: 'Durable quilted linings for horse rugs and tack',
    icon: 'horse',
    sort_order: 9,
    show_in_footer: false,
    listing_card_teaser: 'Designed for heavy use, outdoor conditions and high wadding weights.',
    home_blurb: 'Heavy use, weather, high wadding weights.',
    hero_heading: 'Equestrian',
    hero_subtitle: 'Designed for heavy use, outdoor conditions and high wadding weights.',
    related_sectors: ['pet-supplies', 'automotive'],
    meta_title: 'Quilting For The Equestrian Sector — A.N. Standard Ltd.',
    meta_description: 'Durable quilted linings for horse rugs and tack, built for heavy use.',
  },
]

export const patterns = [
  {
    slug: 'box-quilting',
    title: 'Box quilting',
    menu_title: 'Box (1¼", 2", 4")',
    kind: 'box',
    sort_order: 1,
    listing_subtitle: '1¼" (35mm), 2", 4"',
    listing_teaser: '1¼" (35mm), 2" and 4". Our most requested pattern family.',
    tagline: 'Classic box quilting in three sizes',
    hero_title: 'Box quilting',
    hero_subtitle: '1¼" (35mm), 2", 4"',
    about_heading: 'About box quilting',
    about_paragraphs: [
      'Our most requested pattern family, used heavily in fashion and nursery products. Available at 1¼" (35mm), 2" and 4". Smaller boxes give a firmer, flatter finish and suit lighter waddings; larger boxes carry heavier fillings without over-compressing them.',
    ],
    specs: [
      { label: 'Sizes', value: '1¼" (35mm), 2", 4"' },
      { label: 'Suitable wadding', value: '70–200gsm polyester at 1¼"; 2" and 4" for 200gsm and above' },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Multi-needle lock stitch' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a limit. Send a sample if you are unsure.',
    pattern_image: '/images/home/Rectangle 32.png',
    pattern_image_alt: 'Box quilted fabric',
    meta_title: 'Box Quilting — A.N. Standard Ltd.',
    meta_description: 'Box quilting at 1¼" (35mm), 2" and 4" — our most requested pattern family.',
  },
  {
    slug: 'diamond-and-overlapping',
    title: 'Diamond and overlapping patterns',
    menu_title: 'Diamond and overlap',
    kind: 'diamond',
    sort_order: 2,
    listing_subtitle: 'Double diamond, diamond overlap, wavy diamond overlap',
    listing_teaser: 'Double diamond, diamond overlap and wavy diamond overlap.',
    tagline: 'Elegant diamond and overlapping designs',
    hero_title: 'Diamond and overlapping patterns',
    hero_subtitle: 'Double diamond, diamond overlap, wavy diamond overlap',
    about_heading: 'About diamond and overlapping patterns',
    about_paragraphs: [
      'Double diamond, diamond overlap and wavy diamond overlap. Overlapping patterns add strength to the quilting, which makes them a common choice where the finished product will be handled, laundered or loaded repeatedly.',
    ],
    specs: [
      { label: 'Sizes', value: 'Double diamond, diamond overlap, wavy diamond overlap' },
      {
        label: 'Suitable wadding',
        value: '70–250gsm polyester, felt & customer-supplied flame-retardant fillings',
      },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Multi-needle lock stitch' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a limit. Send a sample if you are unsure.',
    pattern_image: '/images/home/Rectangle 37.png',
    pattern_image_alt: 'Diamond quilted fabric',
    meta_title: 'Diamond And Overlapping Quilting — A.N. Standard Ltd.',
    meta_description:
      'Double diamond, diamond overlap and wavy diamond overlap quilting patterns.',
  },
  {
    slug: 'wavy-line-quilting',
    title: 'Wavy line quilting',
    menu_title: 'Wavy lines',
    kind: 'wavy',
    sort_order: 3,
    listing_subtitle: '2" standard, adjustable in 1" increments',
    listing_teaser: '2" as standard, adjustable in 1" increments.',
    tagline: 'Soft, flowing wave-style stitching',
    hero_title: 'Wavy line quilting',
    hero_subtitle: '2" standard, adjustable in 1" increments',
    about_heading: 'About wavy line quilting',
    about_paragraphs: [
      'A softer alternative to straight lines, at 2" as standard and adjustable in 1" increments. Suits heavier waddings and applications where a directional stitch is acceptable.',
    ],
    specs: [
      { label: 'Sizes', value: '2" standard, adjustable in 1" increments' },
      { label: 'Suitable wadding', value: '150–300gsm polyester, foam up to 10mm' },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Multi-needle lock stitch' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a limit. Send a sample if you are unsure.',
    pattern_image: '/images/home/Rectangle 38.png',
    pattern_image_alt: 'Wavy line quilted fabric',
    meta_title: 'Wavy Line Quilting — A.N. Standard Ltd.',
    meta_description: 'Wavy line quilting at 2" as standard, adjustable in 1" increments.',
  },
  {
    slug: 'vertical-line-quilting',
    title: 'Vertical line quilting',
    menu_title: 'Vertical lines',
    kind: 'vertical',
    sort_order: 4,
    listing_subtitle: '1" standard, adjustable in 1" increments',
    listing_teaser: '1" as standard. The simplest pattern we run, often the most economical.',
    tagline: 'Clean, simple vertical channel quilting',
    hero_title: 'Vertical line quilting',
    hero_subtitle: '1" standard, adjustable in 1" increments',
    about_heading: 'About vertical line quilting',
    about_paragraphs: [
      '1" as standard, adjustable in 1" increments. The simplest pattern we run and often the most economical. Well suited to heavier waddings and to products where quilting runs along the length of a panel.',
    ],
    specs: [
      { label: 'Sizes', value: '1" standard, adjustable in 1" increments' },
      {
        label: 'Suitable wadding',
        value: '150–300gsm polyester and foam; the most forgiving pattern for thick fillings',
      },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Multi-needle lock stitch' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a limit. Send a sample if you are unsure.',
    pattern_image: '/images/home/Rectangle 39.png',
    pattern_image_alt: 'Vertical line quilted fabric',
    meta_title: 'Vertical Line Quilting — A.N. Standard Ltd.',
    meta_description:
      'Vertical line quilting at 1" as standard — the simplest and often most economical pattern.',
  },
  {
    slug: 'hourglass-quilting',
    title: 'Hourglass quilting',
    menu_title: 'Hourglass',
    kind: 'hourglass',
    sort_order: 5,
    listing_subtitle: 'Large hourglass',
    listing_teaser: 'A large pattern designed for heavier weight waddings.',
    tagline: 'Distinctive hourglass repeat pattern',
    hero_title: 'Hourglass quilting',
    hero_subtitle: 'Large hourglass',
    about_heading: 'About hourglass quilting',
    about_paragraphs: [
      'Our large hourglass pattern is designed for heavier weight waddings, where a smaller pattern would flatten the loft. Common in equestrian and pet bedding applications.',
    ],
    specs: [
      { label: 'Sizes', value: 'Large hourglass' },
      {
        label: 'Suitable wadding',
        value: '250gsm and above, including customer-supplied heavyweight and hollowfibre fillings',
      },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Multi-needle lock stitch' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a limit. Send a sample if you are unsure.',
    pattern_image: '/images/home/Rectangle 40.png',
    pattern_image_alt: 'Hourglass quilted fabric',
    meta_title: 'Hourglass Quilting — A.N. Standard Ltd.',
    meta_description: 'Large hourglass quilting, designed for heavier weight waddings.',
  },
  {
    slug: 'bespoke-quilting',
    title: 'Bespoke quilting patterns',
    menu_title: 'Bespoke patterns',
    kind: 'bespoke',
    sort_order: 6,
    listing_subtitle: 'To your drawing',
    listing_teaser: 'Computerised machines. Send a sketch, a photograph or a sample.',
    tagline: 'Fully custom patterns to your spec.',
    hero_title: 'Bespoke quilting patterns',
    hero_subtitle: 'To your drawing',
    about_heading: 'About bespoke quilting patterns',
    about_paragraphs: [
      "Our machines have been modified into computerised machines, which means we are not limited to the pattern book. Several of the patterns we run today started as a customer sketch. Send us a drawing, a photograph or a sample of what you're trying to achieve and we'll tell you whether we can run it.",
    ],
    specs: [
      { label: 'Sizes', value: 'To your drawing' },
      {
        label: 'Suitable wadding',
        value: '70–300gsm polyester and customer-supplied fillings, subject to a sample run',
      },
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Thread', value: 'Multi-needle lock stitch' },
    ],
    spec_note:
      'Wadding guidance is a starting point, not a limit. Send a sample if you are unsure.',
    pattern_image: '/images/home/Rectangle 85.png',
    pattern_image_alt: 'Bespoke quilted fabric',
    footer_note:
      'Send a drawing, a photograph or a sample of what you are trying to achieve and we will tell you whether we can run it.',
    meta_title: 'Bespoke Quilting Patterns — A.N. Standard Ltd.',
    meta_description:
      'Computerised machines mean we are not limited to the pattern book. Send a drawing or a sample.',
  },
]

export const insulationSubpages = [
  {
    slug: 'quilted-fibreglass',
    title: 'Quilted Fibreglass',
    tagline: 'High-performance quilted fibreglass insulation',
    icon: 'layers',
    sort_order: 1,
    teaser_text:
      'Flexible insulation manufactured using quilted fibreglass for industrial applications requiring durability and thermal performance.',
    hero_heading: 'Quilted Fibreglass',
    meta_title: 'Quilted Fibreglass — A.N. Standard Ltd.',
    meta_description:
      'Flexible insulation manufactured using quilted fibreglass for demanding industrial applications.',
  },
  {
    slug: 'fire-and-welding-blankets',
    title: 'Fire & Welding Blankets',
    tagline: 'Heat and spark-resistant protective blankets',
    icon: 'flame',
    sort_order: 2,
    teaser_text:
      'Protective quilted materials designed for heat protection and industrial environments.',
    hero_heading: 'Fire & Welding Blankets',
    meta_title: 'Fire & Welding Blankets — A.N. Standard Ltd.',
    meta_description:
      'Protective quilted materials designed for heat protection and industrial environments.',
  },
  {
    slug: 'industrial-jackets',
    title: 'Industrial Jackets & Plant Insulation',
    tagline: 'Insulation jackets for plant and machinery',
    icon: 'factory',
    sort_order: 3,
    teaser_text:
      'Custom manufactured quilted insulation for removable insulation jackets and industrial equipment.',
    hero_heading: 'Industrial Jackets & Plant Insulation',
    meta_title: 'Industrial Jackets & Plant Insulation — A.N. Standard Ltd.',
    meta_description:
      'Custom quilted insulation for removable insulation jackets and industrial equipment.',
  },
  {
    slug: 'technical-specification',
    title: 'Technical specification',
    tagline: 'Full specs and technical data sheets',
    icon: 'document',
    sort_order: 4,
    teaser_text:
      'Access product information, technical guidance and specification details to help you choose the right quilted insulation solution.',
    hero_heading: 'Technical specification',
    meta_title: 'Technical Specification — A.N. Standard Ltd.',
    meta_description:
      'Product information, technical guidance and specification details for quilted insulation.',
  },
  {
    slug: 'fibreglass-vs-polyester',
    title: 'Fibreglass vs polyester wadding',
    tagline: 'Compare materials to find the right fit',
    icon: 'compare',
    sort_order: 5,
    teaser_text:
      'Compare the characteristics of quilted fibreglass and polyester wadding to determine which material best suits your application.',
    hero_image: '/images/fiberglassor polystar/Rectangle 23.png',
    hero_image_alt:
      'A fibreglass quilted panel beside a white polyester quilted panel on a workbench',
    hero_heading: 'Quilted Fibreglass Or Polyester Wadding, Which Do You Need?',
    hero_intro:
      'We manufacture both, so we have no reason to push you toward either. The choice usually comes down to temperature, weight and cost.',
    body_heading: 'Start With Temperature',
    body_paragraphs: [
      'Start with temperature, because it settles most enquiries on its own. Polyester wadding is a thermoplastic: it softens and shrinks well before it burns, and it has no business anywhere near sustained heat, sparks or flame.',
      'Fibreglass is mineral and does not melt at temperatures that destroy polyester. If the application involves hot work, plant surfaces or fire protection, the answer is fibreglass and there is no second option.',
    ],
    specs: [
      { label: 'Fibreglass', value: 'Heat, spark and flame exposure; industrial plant' },
      { label: 'Polyester 70–300gsm', value: 'Bedding, clothing, furniture, trim, healthcare' },
      { label: 'Handling', value: 'Fibreglass stiff and enclosed; polyester soft and sewable' },
      { label: 'Relative cost', value: 'Polyester materially cheaper per square metre' },
    ],
    panel_heading: 'Below that threshold, polyester wins',
    panel_body: [
      'Below that threshold, polyester wins on almost everything else. It is softer, cheaper, easier to sew, more pleasant to handle, washable, and it recovers loft after compression. It is what belongs in bedding, clothing, furniture, pet products, vehicle trim and healthcare textiles.',
    ],
    meta_title: 'Fibreglass vs Polyester Wadding — A.N. Standard Ltd.',
    meta_description:
      'We manufacture both, so we have no reason to push you toward either. The choice usually comes down to temperature, weight and cost.',
  },
  {
    slug: 'bulk-supply',
    title: 'Bulk supply & lead times',
    tagline: 'Volume orders with reliable turnaround',
    icon: 'boxes',
    sort_order: 6,
    teaser_text:
      'Whether you require a small production run or full container loads, we offer flexible manufacturing capacity with dependable lead times.',
    hero_heading: 'Bulk supply & lead times',
    meta_title: 'Bulk Supply & Lead Times — A.N. Standard Ltd.',
    meta_description:
      'Flexible manufacturing capacity with dependable lead times, from small runs to container loads.',
  },
  {
    slug: 'request-a-sample',
    title: 'Request a sample',
    tagline: 'Free sample panels on a live enquiry',
    icon: 'diamondStitch',
    sort_order: 7,
    teaser_text:
      'Tell us the application, the operating temperature and the quantity, and we will send material to assess free of charge on a live enquiry.',
    hero_heading: 'Request a sample',
    meta_title: 'Request A Sample — A.N. Standard Ltd.',
    meta_description:
      'Tell us the application, operating temperature and quantity, and we will send material to assess.',
  },
]

export const aboutSubpages = [
  {
    slug: 'our-story',
    title: 'Our Story',
    sort_order: 1,
    teaser: 'Fifty years, three generations, one factory.',
    hero_heading: 'Our Story',
    meta_title: 'Our Story — A.N. Standard Ltd.',
    meta_description: 'Fifty years of commission quilting, now run by the third generation.',
  },
  {
    slug: 'our-team',
    title: 'Our Team',
    sort_order: 2,
    teaser: 'The people who answer the phone are the people who run the machines.',
    hero_heading: 'Our Team',
    meta_title: 'Our Team — A.N. Standard Ltd.',
    meta_description:
      'The people who answer the phone are the people who run the machines.',
  },
  {
    slug: 'our-factory',
    title: 'Our Factory',
    sort_order: 3,
    teaser: 'Multi-needle lock stitch machines in the heart of the West Midlands.',
    hero_heading: 'Our Factory',
    meta_title: 'Our Factory — A.N. Standard Ltd.',
    meta_description:
      'Multi-needle lock stitch quilting machines in our West Midlands factory.',
  },
  {
    slug: 'quality',
    title: 'Quality',
    sort_order: 4,
    teaser: 'Every roll checked for thread breaks and slips before it leaves us.',
    hero_heading: 'Quality',
    meta_title: 'Quality — A.N. Standard Ltd.',
    meta_description: 'Every roll is checked for thread breaks and slips before it leaves us.',
  },
]

/**
 * These three pages are referenced from /resources but have never existed in
 * the codebase, so they are seeded as placeholders for the client to fill in.
 */
export const resourceArticles = [
  {
    slug: 'choosing-a-wadding-weight',
    title: 'Choosing a wadding weight',
    sort_order: 1,
    listing_teaser:
      '70gsm to 300gsm, and what each weight is actually for.',
    hero_heading: 'Choosing a wadding weight',
    hero_intro: '70gsm to 300gsm, and what each weight is actually for.',
    body_sections: [
      {
        heading: 'Placeholder',
        paragraphs: [
          'This guide has not been written yet. Edit it in the admin dashboard under Resources.',
        ],
      },
    ],
    meta_title: 'Choosing A Wadding Weight — A.N. Standard Ltd.',
    meta_description: '70gsm to 300gsm, and what each weight is actually for.',
  },
  {
    slug: 'matching-pattern-to-filling',
    title: 'Matching pattern to filling',
    sort_order: 2,
    listing_teaser: 'Why a 1¼" box and a 300gsm wadding rarely belong together.',
    hero_heading: 'Matching pattern to filling',
    hero_intro: 'Why a 1¼" box and a 300gsm wadding rarely belong together.',
    body_sections: [
      {
        heading: 'Placeholder',
        paragraphs: [
          'This guide has not been written yet. Edit it in the admin dashboard under Resources.',
        ],
      },
    ],
    meta_title: 'Matching Pattern To Filling — A.N. Standard Ltd.',
    meta_description: 'Why a 1¼" box and a 300gsm wadding rarely belong together.',
  },
  {
    slug: 'getting-a-sample-right',
    title: 'Getting a sample right',
    sort_order: 3,
    listing_teaser: 'What to send us, and what we send back.',
    hero_heading: 'Getting a sample right',
    hero_intro: 'What to send us, and what we send back.',
    body_sections: [
      {
        heading: 'Placeholder',
        paragraphs: [
          'This guide has not been written yet. Edit it in the admin dashboard under Resources.',
        ],
      },
    ],
    meta_title: 'Getting A Sample Right — A.N. Standard Ltd.',
    meta_description: 'What to send us, and what we send back.',
  },
]

/**
 * Also placeholders: the footer links to all three, but none has ever existed.
 * Real wording has to come from the client — these are deliberately explicit
 * about being unfinished rather than inventing legal text.
 */
export const legalPages = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    sort_order: 1,
    body_content:
      '<p>This privacy policy has not been published yet. Please edit it in the admin dashboard under Legal Pages.</p>',
    meta_title: 'Privacy Policy — A.N. Standard Ltd.',
    meta_description: 'How A.N. Standard Ltd. handles your personal data.',
  },
  {
    slug: 'responsible-disclosure',
    title: 'Responsible Disclosure',
    sort_order: 2,
    body_content:
      '<p>This responsible disclosure policy has not been published yet. Please edit it in the admin dashboard under Legal Pages.</p>',
    meta_title: 'Responsible Disclosure — A.N. Standard Ltd.',
    meta_description: 'How to report a security issue to A.N. Standard Ltd.',
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    sort_order: 3,
    body_content:
      '<p>These terms and conditions have not been published yet. Please edit them in the admin dashboard under Legal Pages.</p>',
    meta_title: 'Terms & Conditions — A.N. Standard Ltd.',
    meta_description: 'Terms and conditions for working with A.N. Standard Ltd.',
  },
]

export const navItems = [
  { label: 'About Us', url: '/about', sort_order: 1, group_key: 'header' },
  { label: 'Services', url: '/services', sort_order: 2, group_key: 'header' },
  { label: 'Quilted Insulation', url: '/quilted-insulation', sort_order: 3, group_key: 'header' },
  { label: 'Sectors', url: '/sectors', sort_order: 4, group_key: 'header' },
  { label: 'Patterns', url: '/patterns', sort_order: 5, group_key: 'header' },
  { label: 'Contact', url: '/contact', sort_order: 6, group_key: 'header' },

  { label: 'About Us', url: '/about', sort_order: 1, group_key: 'footer-company' },
  {
    label: 'Quilted Insulation',
    url: '/quilted-insulation',
    sort_order: 2,
    group_key: 'footer-company',
  },
  { label: 'Patterns', url: '/patterns', sort_order: 3, group_key: 'footer-company' },
  { label: 'Resources', url: '/resources', sort_order: 4, group_key: 'footer-company' },
  { label: 'Contact', url: '/contact', sort_order: 5, group_key: 'footer-company' },

  { label: 'Privacy Policy', url: '/privacy-policy', sort_order: 1, group_key: 'footer-legal' },
  {
    label: 'Responsible Disclosure',
    url: '/responsible-disclosure',
    sort_order: 2,
    group_key: 'footer-legal',
  },
  { label: 'Terms & Condition', url: '/terms', sort_order: 3, group_key: 'footer-legal' },
]

export const singletons = {
  about_page: {
    id: 1,
    hero_image: '/images/about/Rectangle 23.png',
    hero_heading: 'About A.N. Standard Ltd.',
    hero_intro:
      'Established in 1975, we are a family based company offering commission quilting in the heart of the Midlands.',
    stat_badges: [
      { label: 'Established', value: '1975' },
      { label: 'Third generation', value: 'Family-run' },
      { label: 'Manufactured in the', value: 'West Midlands' },
      { label: 'UK-sourced wadding', value: 'held in stock' },
    ],
    meta_title: 'About Us — A.N. Standard Ltd.',
    meta_description:
      'Established in 1975, a family based commission quilting company in the West Midlands.',
  },
  services_page: {
    id: 1,
    hero_image: '/images/services/Rectangle 13.png',
    hero_image_alt:
      'A multi-needle quilting machine running orange fabric over white wadding',
    hero_heading: 'Our Services',
    hero_intro:
      'Commission quilting on multi-needle lock stitch machines, in your pattern or ours.',
    meta_title: 'Services — A.N. Standard Ltd.',
    meta_description:
      'Commission quilting, wide-width quilting, bespoke pattern design, wadding and fillings.',
  },
  sectors_page: {
    id: 1,
    hero_image: '/images/sectors/Group 302.png',
    hero_image_alt:
      'A grid of finished products we quilt for, from healthcare to equestrian',
    hero_heading: 'Sectors We Serve',
    hero_intro:
      'The right pattern depends on what the finished product has to do. Nine industries, one factory.',
    banner_image: '/images/sectors/Gemini_Generated_Image_l8bjphl8bjphl8bj 1.png',
    banner_image_alt: 'Close-up of a patchwork quilt in many colours',
    meta_title: 'Sectors — A.N. Standard Ltd.',
    meta_description:
      'We quilt for healthcare, soft furnishings, funeral supplies, nursery, clothing and more.',
  },
  patterns_page: {
    id: 1,
    hero_image: '/images/home/Rectangle 29.png',
    hero_image_alt: 'Close-up of deep red wavy-line quilted fabric',
    hero_heading: 'Patterns We Run',
    hero_intro:
      'Box, diamond, wavy, vertical, hourglass and bespoke patterns on computerised multi-needle machines.',
    footer_note:
      'Send a drawing, a photograph or a sample of what you are trying to achieve and we will tell you whether we can run it.',
    meta_title: 'Patterns — A.N. Standard Ltd.',
    meta_description:
      'Box, diamond, wavy, vertical, hourglass and bespoke quilting patterns up to 2400mm wide.',
  },
  insulation_page: {
    id: 1,
    hero_image: '/images/quilted-insultation/vecteezy_autumn-themed-patchwork-quilt_70066206 1.png',
    hero_image_alt: 'Brown fabric quilted in a fine diamond pattern',
    hero_heading: 'Quilted Insulation,\nManufactured In The UK',
    hero_intro:
      'We worked alongside the developer of quilted fibreglass and have since taken over its full manufacture, which makes us the UK’s leading supplier of the product.',
    stat_boxes: [
      { label: 'Maximum width', value: '2400mm' },
      { label: 'Minimum order', value: 'Small runs accepted' },
      { label: 'Repeat orders', value: 'Typically completed within 2–3 weeks' },
      { label: 'Construction', value: 'Mat between two facings' },
      { label: 'Standard patterns', value: 'Vertical 1–2", box 2" and 4"' },
    ],
    suitable_industries: [
      'Healthcare',
      'Automotive',
      'Equestrian',
      'Industrial manufacturing',
      'Protective equipment',
    ],
    fabrics_we_quilt: [
      'Woven fabrics',
      'Knitted fabrics',
      'Ripstop materials',
      'Coated nylons',
      'Cotton',
      'Polycotton',
      'Satin',
      'Canvas',
      'Velour',
      'PVC-backed fabrics',
      'Non-woven materials',
    ],
    why_work_with_us: [
      'Commission quilting specialists',
      'Multi-needle lock stitch technology',
      'No minimum contract length',
      'Small orders and container loads welcomed',
      'Quality inspection on every roll',
      'Sampling available before production',
      'We never manufacture competing finished products',
    ],
    bottom_cta_heading: 'Quilted Fibreglass Or Polyester Wadding, Which Do You Need?',
    bottom_cta_text:
      'We manufacture both, so we have no reason to push you toward either. The choice usually comes down to temperature, weight and cost.',
    meta_title: 'Quilted Insulation — A.N. Standard Ltd.',
    meta_description:
      'We worked alongside the developer of quilted fibreglass and have since taken over its full manufacture.',
  },
  process_page: {
    id: 1,
    hero_heading: 'From Fabric Arriving To Despatch',
    hero_intro: 'How your quilt comes to life, step by step.',
    steps: [
      {
        title: 'Fabric in',
        description: 'Your fabric arrives, is rerolled and allocated to your job.',
      },
      { title: 'Wadding selected', description: 'We select the wadding for your application.' },
      { title: 'Machines threaded', description: 'Machines are still threaded by hand.' },
      { title: 'Quilting', description: 'Your fabric is quilted to your chosen pattern.' },
      {
        title: 'Inspection',
        description: 'Every roll is checked for thread breaks and slips before it leaves us.',
      },
      { title: 'Despatch', description: 'Finished rolls come back to you ready to cut.' },
    ],
    meta_title: 'Our Process — A.N. Standard Ltd.',
    meta_description: 'How your quilt comes to life, from fabric arriving to despatch.',
  },
  resources_page: {
    id: 1,
    hero_heading: 'Resources',
    hero_intro: 'Practical guidance on wadding weights, patterns and sampling.',
    meta_title: 'Resources — A.N. Standard Ltd.',
    meta_description: 'Practical guidance on wadding weights, patterns and sampling.',
  },
  contact_page: {
    id: 1,
    heading: 'Contact Us',
    intro_text: 'Tell us what you need quilting and we will come back to you.',
    address: 'Unit 11A, Parkrose Industrial Estate, Middlemore Road, West Midlands, B66 2DZ',
    phone: '0121 555 8101',
    whatsapp: '+447949709412',
    email: 'info@anstandardquilting.com',
    business_hours_text: DEFAULT_HOURS,
    social_links: [
      { label: 'Facebook', url: 'https://facebook.com' },
      { label: 'Instagram', url: 'https://instagram.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
    ],
    meta_title: 'Contact — A.N. Standard Ltd.',
    meta_description:
      'Unit 11A, Parkrose Industrial Estate, Middlemore Road, West Midlands, B66 2DZ.',
  },
  quote_page: {
    id: 1,
    heading: 'Request A Quote',
    intro_text:
      'Tell us about your fabric, your filling and your pattern, and we will quote you on the work.',
    step_labels: ['Your details', 'Your project', 'Your materials'],
    success_heading: 'Thank you',
    success_text: 'We have received your enquiry and will come back to you shortly.',
    meta_title: 'Request A Quote — A.N. Standard Ltd.',
    meta_description:
      'Tell us about your fabric, filling and pattern, and we will quote you on the work.',
  },
}
