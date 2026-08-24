import type { CollectionKey, SingletonKey } from './admin-nav'

/**
 * Plain-language guidance shown in the admin.
 *
 * Kept apart from schema.ts on purpose: that file describes the *shape* of the
 * data, this one explains it to someone who has never seen a CMS. Wording here
 * should name what the client sees on the website ("the big heading at the top
 * of the home page"), never a database column.
 */

export type PageGuide = {
  /** One line under the page title, saying what this screen controls. */
  summary: string
  /** Optional numbered orientation shown in a collapsible panel. */
  steps?: string[]
  /** Anything that will surprise them, e.g. a field used in several places. */
  notes?: string[]
}

export const singletonGuide: Partial<Record<SingletonKey, PageGuide>> = {
  global_settings: {
    summary:
      'Your company details. These appear in the header and footer of every single page, so a change here shows up right across the website.',
    steps: [
      'Change a phone number, email address or your address here once, and it updates everywhere.',
      'The two logos are separate: the header logo sits on a white background, the footer logo on black.',
      'The call-to-action wording is the "Tell us what you need quilting" box near the bottom of most pages.',
    ],
    notes: [
      'The phone link and the phone number are two different boxes. The number is what people read; the link is what their phone dials. If you change one, change the other.',
    ],
  },
  home_page: {
    summary: 'Everything on your home page, working from the top down.',
    steps: [
      'Hero is the large photo and headline visitors see first.',
      'The four stats sit in the bar just underneath it.',
      'Each section below matches a band of the home page, in the same order as the page itself.',
    ],
    notes: [
      'The services, sectors and pattern cards on the home page come from the Services, Sectors and Patterns sections in the sidebar — not from here.',
    ],
  },
  contact_page: {
    summary: 'Your contact page: the address, phone, email and opening hours shown to visitors.',
    notes: [
      'These are separate from the header and footer details in Global Settings. Update both if something changes.',
    ],
  },
  quote_page: {
    summary: 'The wording around your quote form.',
    notes: [
      'Only the headings and labels can be changed here. The form questions themselves, and where the enquiry is sent, are fixed.',
    ],
  },
  process_page: {
    summary: 'Your "how we work" page, and the numbered steps on it.',
    steps: [
      'Add, remove or reorder steps with the buttons beside each one.',
      'Steps appear on the page in the order they are listed here.',
    ],
  },
  about_page: {
    summary:
      'The main About page — the heading, photo and the four stats. The cards below them come from About pages.',
  },
  services_page: { summary: 'The top of the Services listing page. The cards come from Services.' },
  sectors_page: { summary: 'The top of the Sectors listing page. The cards come from Sectors.' },
  patterns_page: { summary: 'The top of the Patterns listing page. The cards come from Patterns.' },
  insulation_page: {
    summary:
      'The Quilted Insulation landing page. The cards on it come from Insulation pages.',
  },
  resources_page: {
    summary: 'The top of the Resources page. The articles come from Articles.',
  },
}

export const collectionGuide: Partial<Record<CollectionKey, PageGuide>> = {
  sectors: {
    summary:
      'The industries you quilt for. Each one has its own page, and a card on the Sectors page.',
    steps: [
      'Click Edit to change a sector’s wording or photos.',
      'Use the arrows to change the order they appear in.',
      '"Show in footer" decides which five appear in the footer column.',
      '"+ Add new" creates a brand-new sector page.',
    ],
  },
  services: {
    summary: 'What you offer. Each service has its own page and a card on the Services page.',
    steps: [
      'Click Edit to change wording or photos.',
      'Use the arrows to change the order.',
      '"Show in footer" decides which appear in the footer column.',
    ],
  },
  patterns: {
    summary: 'Your quilting patterns, shown on the Patterns page and in the menu.',
  },
  insulation_subpages: {
    summary: 'The pages underneath Quilted Insulation.',
    notes: [
      'Turning "Published" off hides a page from the menu without deleting it.',
    ],
  },
  about_subpages: {
    summary: 'The pages underneath About — your story, factory and quality.',
  },
  resource_articles: {
    summary: 'Guides and articles listed on the Resources page.',
  },
  legal_pages: {
    summary: 'Your privacy policy, terms and disclosure page.',
    notes: [
      'These three cannot be added to or deleted, because the footer links to them by name. You can change their wording freely.',
    ],
  },
}

/**
 * Explains a field group where the title alone is not obvious. Keyed by the
 * group title used in schema.ts.
 */
export const groupGuide: Record<string, string> = {
  Hero: 'The photo and headline at the very top of the page.',
  'Search engine listing':
    'How this page looks in Google results. Leave blank to use the page heading.',
  'Listing card': 'The small preview card that links to this page from the listing page.',
  Basics: 'The name and web address of this page.',
  Specifications: 'The label-and-value table shown on the page.',
  'Call-to-action block':
    'The "Tell us what you need quilting" box that appears near the bottom of most pages.',
  Logos: 'Two versions are needed because the header is white and the footer is black.',
  'Form labels': 'The wording on the quote form. The questions themselves cannot be changed.',
  Navigation: 'The links in your menus.',
}

/**
 * Per-field help, keyed by field name. schema.ts can still set `help` for a
 * field that needs wording specific to one page; that takes precedence.
 */
export const fieldGuide: Record<string, string> = {
  slug: 'The web address of this page. Changing it breaks any existing links people have saved.',
  sort_order: 'Lower numbers come first. The arrows on the list screen are usually easier.',
  show_in_footer: 'Adds this to the footer column at the bottom of every page.',
  is_published: 'Turn off to hide this page from the menus without deleting it.',
  icon: 'The small symbol shown beside this item in the menu and on its card.',

  hero_image: 'The large photo across the top of the page.',
  hero_image_alt:
    'A short description of the photo, read aloud to visually impaired visitors. Describe what is in the picture.',
  hero_heading: 'The large heading over the photo.',
  hero_intro: 'The sentence or two under that heading.',
  hero_title: 'The large heading over the photo.',
  hero_subtitle: 'The line under the heading.',

  listing_card_teaser: 'The short text on this page’s preview card.',
  listing_card_image: 'The photo on this page’s preview card.',
  teaser: 'The short text on this page’s preview card.',
  teaser_text: 'The short text on this page’s preview card.',
  listing_teaser: 'The short text on this page’s preview card.',
  listing_image: 'The photo on this page’s preview card.',

  meta_title: 'The clickable blue headline in Google results.',
  meta_description: 'The grey summary under that headline in Google results.',

  specs: 'A two-column table. The left box is the label, the right box is the value.',
  body_paragraphs: 'The main text. Each box is one paragraph.',
  intro_paragraphs: 'The opening text. Each box is one paragraph.',
  about_paragraphs: 'Each box is one paragraph.',
  evidence_list: 'A bulleted list. One point per box.',
  benefits_list: 'A bulleted list. One point per box.',
  fabrics_we_quilt: 'Shown as small tags. One fabric per box.',
  why_work_with_us: 'A bulleted list. One point per box.',
  suitable_industries: 'A bulleted list. One industry per box.',

  related_sectors:
    'Which other sectors to suggest at the bottom. Type their web address ending, e.g. nursery.',
  social_links: 'Your social media pages. Leave the list empty to hide the icons.',
  stat_badges: 'The short facts in the bar under the hero.',
  hero_buttons: 'The buttons over the hero photo.',
}
