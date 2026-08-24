/**
 * Shapes of the jsonb list fields and of each CMS table row.
 *
 * These mirror supabase/migrations/0001_init.sql. Every list field is typed as
 * an array so callers can map over it directly; the fetch helpers in queries.ts
 * guarantee arrays even when a column holds null or malformed json.
 */

/* --- jsonb item shapes --- */

export type Spec = { label: string; value: string }
export type StatBadge = { label: string; value: string }
export type SocialLink = { label: string; url: string }
export type GalleryImage = { src: string; alt: string }
export type HeroButton = { label: string; href: string; style: string }
export type ProcessStep = { title: string; description: string; image?: string }
export type BodySection = { heading: string; paragraphs: string[] }
/**
 * A page-specific block: a heading, optional intro, and a list. The four
 * service pages that carry one each use a different item shape, so items are a
 * union and `style` picks how the list renders.
 *
 *   bullets  — string[]        e.g. material limits
 *   steps    — {title, body}   e.g. the pattern-design workflow
 *   table    — {label, value}  e.g. the wadding weight guide
 *   columns  — {title, items}  e.g. book pattern vs bespoke
 */
export type ExtraSectionStyle = 'bullets' | 'steps' | 'table' | 'columns' | 'text'

export type ExtraSection = {
  heading: string
  intro?: string
  style: ExtraSectionStyle
  items: (string | { title?: string; body?: string; label?: string; value?: string; items?: string[] })[]
}

export type ComparisonTable = {
  heading?: string
  columns?: string[]
  rows?: { label: string; values: string[] }[]
}

/* --- singletons --- */

export type GlobalSettings = {
  company_name: string
  tagline: string
  topbar_email: string
  topbar_whatsapp: string
  header_phone: string
  phone_href: string
  whatsapp_href: string
  email_href: string
  logo_image: string
  footer_logo_image: string
  address_line1: string
  address_line2: string
  office_hours: string
  social_links: SocialLink[]
  footer_copyright_text: string
  cta_block_heading: string
  cta_block_text: string
}

export type HomePage = {
  hero_image: string
  hero_image_alt: string
  hero_title: string
  hero_subtitle: string
  hero_buttons: HeroButton[]
  stat_badges: StatBadge[]
  about_heading: string
  about_paragraphs: string[]
  about_image: string
  services_intro_heading: string
  services_intro_text: string
  services_intro_image: string
  insulation_heading: string
  insulation_text: string
  insulation_image: string
  sectors_heading: string
  sectors_intro: string
  featured_sector_slug: string
  patterns_heading: string
  patterns_intro: string
  process_heading: string
  process_intro: string
  process_image: string
  process_steps: ProcessStep[]
  history_heading: string
  history_paragraphs: string[]
  quote_cta_heading: string
  quote_cta_text: string
  meta_title: string
  meta_description: string
}

export type ListingPage = {
  hero_image: string
  hero_image_alt: string
  hero_heading: string
  hero_intro: string
  meta_title: string
  meta_description: string
}

export type AboutPage = ListingPage & { stat_badges: StatBadge[] }
export type ServicesPage = ListingPage
export type ResourcesPage = ListingPage

export type SectorsPage = ListingPage & {
  banner_image: string
  banner_image_alt: string
}

export type PatternsPage = ListingPage & { footer_note: string }

export type InsulationPage = ListingPage & {
  stat_boxes: StatBadge[]
  why_lock_stitch_heading: string
  why_lock_stitch_text: string[]
  suitable_industries: string[]
  fabrics_we_quilt: string[]
  why_work_with_us: string[]
  bottom_cta_heading: string
  bottom_cta_text: string
}

export type ProcessPage = ListingPage & { steps: ProcessStep[] }

export type ContactPage = {
  hero_image: string
  hero_image_alt: string
  heading: string
  intro_text: string
  address: string
  phone: string
  whatsapp: string
  email: string
  business_hours_text: string
  social_links: SocialLink[]
  meta_title: string
  meta_description: string
}

export type QuotePage = {
  hero_image: string
  hero_image_alt: string
  heading: string
  intro_text: string
  step_labels: string[]
  success_heading: string
  success_text: string
  meta_title: string
  meta_description: string
}

/* --- collections --- */

export type Service = {
  id: string
  slug: string
  title: string
  menu_title: string
  tagline: string
  icon: string
  sort_order: number
  show_in_footer: boolean
  listing_card_image: string
  listing_card_alt: string
  listing_card_teaser: string
  hero_image: string
  hero_image_alt: string
  hero_heading: string
  hero_intro: string
  gallery_images: GalleryImage[]
  body_heading: string
  body_paragraphs: string[]
  highlight_box_heading: string
  highlight_box_text: string
  specs: Spec[]
  benefits_heading: string
  benefits_intro: string
  benefits_list: string[]
  fabrics_we_quilt: string[]
  why_work_with_us: string[]
  video_thumbnail_image: string
  video_url: string
  video_label: string
  video_caption: string
  side_image: string
  side_image_alt: string
  hero_buttons: HeroButton[]
  swatches: GalleryImage[]
  panel_heading: string
  panel_intro: string
  /** Plain strings for the bullet style; {label,value} pairs for pills. */
  panel_list: (string | Spec)[]
  panel_layout: string
  panel_list_style: string
  panel_left_image: string
  panel_left_image_alt: string
  panel_right_image: string
  panel_right_image_alt: string
  panel_footnote: string
  panel_cta_label: string
  panel_cta_href: string
  fabrics_heading: string
  fabrics_intro: string
  why_heading: string
  why_intro: string
  extra_sections: ExtraSection[]
  meta_title: string
  meta_description: string
}

export type Sector = {
  id: string
  slug: string
  title: string
  tagline: string
  icon: string
  sort_order: number
  show_in_footer: boolean
  listing_card_teaser: string
  home_blurb: string
  hero_image: string
  hero_image_alt: string
  hero_heading: string
  hero_subtitle: string
  intro_heading: string
  intro_paragraphs: string[]
  specs: Spec[]
  fabrics_heading: string
  fabrics_text: string[]
  fabrics_image: string
  fabrics_image_alt: string
  fillings_heading: string
  fillings_text: string[]
  evidence_heading: string
  evidence_intro: string[]
  evidence_list: string[]
  side_image: string
  side_image_alt: string
  related_sectors: string[]
  meta_title: string
  meta_description: string
}

export type Pattern = {
  id: string
  slug: string
  title: string
  menu_title: string
  kind: string
  sort_order: number
  listing_subtitle: string
  listing_teaser: string
  tagline: string
  hero_title: string
  hero_subtitle: string
  about_heading: string
  about_paragraphs: string[]
  specs: Spec[]
  spec_note: string
  pattern_image: string
  pattern_image_alt: string
  sample_heading: string
  sample_intro: string
  sample_list: string[]
  footer_note: string
  meta_title: string
  meta_description: string
}

export type InsulationSubpage = {
  id: string
  slug: string
  title: string
  tagline: string
  icon: string
  sort_order: number
  is_published: boolean
  teaser_text: string
  hero_image: string
  hero_image_alt: string
  hero_heading: string
  hero_intro: string
  body_heading: string
  body_paragraphs: string[]
  specs: Spec[]
  panel_heading: string
  panel_body: string[]
  panel_image: string
  panel_image_alt: string
  second_panel_heading: string
  second_panel_body: string[]
  second_panel_left_image: string
  second_panel_left_image_alt: string
  second_panel_image: string
  second_panel_image_alt: string
  second_panel_sub_heading: string
  second_panel_sub_body: string[]
  comparison: ComparisonTable
  closing_heading: string
  closing_body: string[]
  meta_title: string
  meta_description: string
}

export type AboutSubpage = {
  id: string
  slug: string
  title: string
  sort_order: number
  teaser: string
  listing_image: string
  hero_image: string
  hero_image_alt: string
  hero_heading: string
  hero_intro: string
  body_paragraphs: string[]
  meta_title: string
  meta_description: string
}

export type ResourceArticle = {
  id: string
  slug: string
  title: string
  sort_order: number
  listing_teaser: string
  listing_image: string
  hero_image: string
  hero_image_alt: string
  hero_heading: string
  hero_intro: string
  body_sections: BodySection[]
  meta_title: string
  meta_description: string
}

export type LegalPage = {
  id: string
  slug: string
  title: string
  sort_order: number
  body_content: string
  meta_title: string
  meta_description: string
}

export type NavItem = {
  id: string
  label: string
  url: string
  sort_order: number
  group_key: string
}
