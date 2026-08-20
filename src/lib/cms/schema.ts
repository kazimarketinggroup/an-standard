import type { CollectionKey, SingletonKey } from './admin-nav'

/**
 * Declarative description of every editable field.
 *
 * One generic form component renders all of these, which is what keeps the
 * admin simple: adding a field to a page is a line here, not a new screen. The
 * field `type` decides the control the client sees — never a code or markdown
 * editor, except the single `richtext` used by the legal pages.
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'image'
  | 'boolean'
  | 'number'
  | 'select'
  | 'richtext'
  /** Repeatable list of plain strings, e.g. bullet points. */
  | 'stringList'
  /** Repeatable list of { label, value } pairs. */
  | 'specList'
  /** Repeatable list of { label, url } pairs. */
  | 'linkList'
  /** Repeatable list of { src, alt } images. */
  | 'imageList'
  /** Repeatable list of { title, description, image? } steps. */
  | 'stepList'
  /** Repeatable list of { heading, paragraphs[] } article sections. */
  | 'sectionList'
  /** Repeatable list of { label, href, style } buttons. */
  | 'buttonList'

export type Field = {
  name: string
  label: string
  type: FieldType
  /** Shown under the input, to explain where the value appears on the site. */
  help?: string
  /** For `select`. */
  options?: { value: string; label: string }[]
  /** For `select` whose options come from a collection, e.g. sector slugs. */
  optionsFrom?: CollectionKey
  rows?: number
}

export type FieldGroup = {
  title: string
  fields: Field[]
}

const META_GROUP: FieldGroup = {
  title: 'Search engine listing',
  fields: [
    {
      name: 'meta_title',
      label: 'Page title',
      type: 'text',
      help: 'Shown in the browser tab and as the headline in Google results.',
    },
    {
      name: 'meta_description',
      label: 'Page description',
      type: 'textarea',
      rows: 2,
      help: 'The grey summary text under the title in Google results.',
    },
  ],
}

const HERO_FIELDS: Field[] = [
  { name: 'hero_image', label: 'Hero image', type: 'image' },
  {
    name: 'hero_image_alt',
    label: 'Hero image description',
    type: 'text',
    help: 'Describes the image for screen readers and search engines.',
  },
  { name: 'hero_heading', label: 'Hero heading', type: 'text' },
  { name: 'hero_intro', label: 'Hero intro', type: 'textarea', rows: 3 },
]

/* --- singletons --- */

export const singletonSchema: Record<SingletonKey, FieldGroup[]> = {
  global_settings: [
    {
      title: 'Company',
      fields: [
        { name: 'company_name', label: 'Company name', type: 'text' },
        { name: 'tagline', label: 'Tagline', type: 'text' },
      ],
    },
    {
      title: 'Logos',
      fields: [
        { name: 'logo_image', label: 'Header logo', type: 'image' },
        {
          name: 'footer_logo_image',
          label: 'Footer logo',
          type: 'image',
          help: 'Shown on the black footer, so this needs to be the white version.',
        },
      ],
    },
    {
      title: 'Contact details',
      fields: [
        { name: 'header_phone', label: 'Phone number', type: 'text' },
        {
          name: 'phone_href',
          label: 'Phone link',
          type: 'text',
          help: 'The dialling link. Format: tel:01215558101',
        },
        { name: 'topbar_email', label: 'Email address', type: 'text' },
        {
          name: 'email_href',
          label: 'Email link',
          type: 'text',
          help: 'Format: mailto:info@example.com',
        },
        { name: 'topbar_whatsapp', label: 'WhatsApp number', type: 'text' },
        {
          name: 'whatsapp_href',
          label: 'WhatsApp link',
          type: 'text',
          help: 'Format: https://wa.me/447949709412',
        },
        { name: 'office_hours', label: 'Opening hours', type: 'text' },
      ],
    },
    {
      title: 'Address',
      fields: [
        { name: 'address_line1', label: 'Address line 1', type: 'text' },
        { name: 'address_line2', label: 'Address line 2', type: 'text' },
      ],
    },
    {
      title: 'Footer',
      fields: [
        { name: 'social_links', label: 'Social links', type: 'linkList' },
        { name: 'footer_copyright_text', label: 'Copyright text', type: 'text' },
      ],
    },
    {
      title: 'Call-to-action block',
      fields: [
        {
          name: 'cta_block_heading',
          label: 'Heading',
          type: 'text',
          help: 'The "Tell us what you need quilting" block near the bottom of most pages.',
        },
        { name: 'cta_block_text', label: 'Text', type: 'textarea', rows: 3 },
      ],
    },
  ],

  home_page: [
    {
      title: 'Hero',
      fields: [
        { name: 'hero_image', label: 'Hero image', type: 'image' },
        { name: 'hero_image_alt', label: 'Hero image description', type: 'text' },
        {
          name: 'hero_title',
          label: 'Hero title',
          type: 'textarea',
          rows: 2,
          help: 'Press Enter to control where the line breaks.',
        },
        { name: 'hero_subtitle', label: 'Hero subtitle', type: 'textarea', rows: 3 },
        { name: 'hero_buttons', label: 'Hero buttons', type: 'buttonList' },
        { name: 'stat_badges', label: 'Stats bar', type: 'specList' },
      ],
    },
    {
      title: 'About section',
      fields: [
        { name: 'about_heading', label: 'Heading', type: 'text' },
        { name: 'about_paragraphs', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    {
      title: 'Services section',
      fields: [
        { name: 'services_intro_heading', label: 'Heading', type: 'text' },
        { name: 'services_intro_text', label: 'Intro text', type: 'textarea', rows: 3 },
        { name: 'services_intro_image', label: 'Image', type: 'image' },
      ],
    },
    {
      title: 'Insulation section',
      fields: [
        { name: 'insulation_heading', label: 'Heading', type: 'textarea', rows: 2 },
        { name: 'insulation_text', label: 'Text', type: 'textarea', rows: 3 },
        { name: 'insulation_image', label: 'Background image', type: 'image' },
      ],
    },
    {
      title: 'Sectors section',
      fields: [
        { name: 'sectors_heading', label: 'Heading', type: 'text' },
        { name: 'sectors_intro', label: 'Intro text', type: 'textarea', rows: 3 },
        {
          name: 'featured_sector_slug',
          label: 'Featured sector',
          type: 'select',
          optionsFrom: 'sectors',
          help: 'Which sector opens first in the tabbed section.',
        },
      ],
    },
    {
      title: 'Patterns section',
      fields: [
        { name: 'patterns_heading', label: 'Heading', type: 'text' },
        { name: 'patterns_intro', label: 'Intro text', type: 'textarea', rows: 3 },
      ],
    },
    {
      title: 'Process section',
      fields: [
        { name: 'process_heading', label: 'Heading', type: 'textarea', rows: 2 },
        { name: 'process_steps', label: 'Steps', type: 'stepList' },
      ],
    },
    {
      title: 'History section',
      fields: [
        { name: 'history_heading', label: 'Heading', type: 'textarea', rows: 2 },
        { name: 'history_paragraphs', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    {
      title: 'Quote call-to-action',
      fields: [
        { name: 'quote_cta_heading', label: 'Heading', type: 'text' },
        { name: 'quote_cta_text', label: 'Text', type: 'textarea', rows: 3 },
      ],
    },
    META_GROUP,
  ],

  about_page: [
    { title: 'Hero', fields: HERO_FIELDS },
    { title: 'Stats bar', fields: [{ name: 'stat_badges', label: 'Stats', type: 'specList' }] },
    META_GROUP,
  ],

  services_page: [{ title: 'Hero', fields: HERO_FIELDS }, META_GROUP],

  sectors_page: [
    { title: 'Hero', fields: HERO_FIELDS },
    {
      title: 'Banner',
      fields: [
        { name: 'banner_image', label: 'Banner image', type: 'image' },
        { name: 'banner_image_alt', label: 'Banner image description', type: 'text' },
      ],
    },
    META_GROUP,
  ],

  patterns_page: [
    { title: 'Hero', fields: HERO_FIELDS },
    {
      title: 'Footer note',
      fields: [{ name: 'footer_note', label: 'Closing note', type: 'textarea', rows: 3 }],
    },
    META_GROUP,
  ],

  insulation_page: [
    { title: 'Hero', fields: HERO_FIELDS },
    { title: 'Specifications', fields: [{ name: 'stat_boxes', label: 'Specs', type: 'specList' }] },
    {
      title: 'Why lock stitch',
      fields: [
        { name: 'why_lock_stitch_heading', label: 'Heading', type: 'text' },
        { name: 'why_lock_stitch_text', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    {
      title: 'Lists',
      fields: [
        { name: 'suitable_industries', label: 'Suitable industries', type: 'stringList' },
        { name: 'fabrics_we_quilt', label: 'Fabrics we quilt', type: 'stringList' },
        { name: 'why_work_with_us', label: 'Why work with us', type: 'stringList' },
      ],
    },
    {
      title: 'Bottom call-to-action',
      fields: [
        { name: 'bottom_cta_heading', label: 'Heading', type: 'text' },
        { name: 'bottom_cta_text', label: 'Text', type: 'textarea', rows: 3 },
      ],
    },
    META_GROUP,
  ],

  process_page: [
    { title: 'Hero', fields: HERO_FIELDS },
    { title: 'Steps', fields: [{ name: 'steps', label: 'Process steps', type: 'stepList' }] },
    META_GROUP,
  ],

  resources_page: [{ title: 'Hero', fields: HERO_FIELDS }, META_GROUP],

  contact_page: [
    {
      title: 'Hero',
      fields: [
        { name: 'hero_image', label: 'Hero image', type: 'image' },
        { name: 'hero_image_alt', label: 'Hero image description', type: 'text' },
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'intro_text', label: 'Intro text', type: 'textarea', rows: 3 },
      ],
    },
    {
      title: 'Contact details',
      fields: [
        { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'business_hours_text', label: 'Opening hours', type: 'text' },
        { name: 'social_links', label: 'Social links', type: 'linkList' },
      ],
    },
    META_GROUP,
  ],

  quote_page: [
    {
      title: 'Page header',
      fields: [
        { name: 'hero_image', label: 'Hero image', type: 'image' },
        { name: 'hero_image_alt', label: 'Hero image description', type: 'text' },
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'intro_text', label: 'Intro text', type: 'textarea', rows: 3 },
      ],
    },
    {
      title: 'Form labels',
      fields: [
        {
          name: 'step_labels',
          label: 'Step titles',
          type: 'stringList',
          help: 'The three step titles. The form fields themselves are fixed and cannot be edited here.',
        },
      ],
    },
    {
      title: 'After submitting',
      fields: [
        { name: 'success_heading', label: 'Thank-you heading', type: 'text' },
        { name: 'success_text', label: 'Thank-you text', type: 'textarea', rows: 3 },
      ],
    },
    META_GROUP,
  ],
}

/* --- collections --- */

const SLUG_FIELD: Field = {
  name: 'slug',
  label: 'URL slug',
  type: 'text',
  help: 'The address of this page. Changing it breaks any existing links to the page.',
}

export const collectionSchema: Record<CollectionKey, FieldGroup[]> = {
  services: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'menu_title', label: 'Menu title', type: 'text' },
        { name: 'tagline', label: 'Menu tagline', type: 'text' },
        { name: 'icon', label: 'Icon', type: 'select' },
        { name: 'sort_order', label: 'Order', type: 'number' },
        { name: 'show_in_footer', label: 'Show in footer', type: 'boolean' },
      ],
    },
    {
      title: 'Listing card',
      fields: [
        { name: 'listing_card_image', label: 'Card image', type: 'image' },
        { name: 'listing_card_alt', label: 'Card image description', type: 'text' },
        { name: 'listing_card_teaser', label: 'Card text', type: 'textarea', rows: 3 },
      ],
    },
    { title: 'Hero', fields: HERO_FIELDS },
    {
      title: 'Body',
      fields: [
        { name: 'body_heading', label: 'Heading', type: 'text' },
        { name: 'body_paragraphs', label: 'Paragraphs', type: 'stringList' },
        { name: 'gallery_images', label: 'Gallery', type: 'imageList' },
      ],
    },
    {
      title: 'Highlight box',
      fields: [
        { name: 'highlight_box_heading', label: 'Heading', type: 'text' },
        { name: 'highlight_box_text', label: 'Text', type: 'textarea', rows: 3 },
      ],
    },
    { title: 'Specifications', fields: [{ name: 'specs', label: 'Specs', type: 'specList' }] },
    {
      title: 'Benefits',
      fields: [
        { name: 'benefits_heading', label: 'Heading', type: 'text' },
        { name: 'benefits_intro', label: 'Intro', type: 'textarea', rows: 2 },
        { name: 'benefits_list', label: 'Benefits', type: 'stringList' },
      ],
    },
    {
      title: 'Lists',
      fields: [
        { name: 'fabrics_we_quilt', label: 'Fabrics we quilt', type: 'stringList' },
        { name: 'why_work_with_us', label: 'Why work with us', type: 'stringList' },
      ],
    },
    {
      title: 'Video',
      fields: [
        { name: 'video_thumbnail_image', label: 'Thumbnail', type: 'image' },
        { name: 'video_url', label: 'Video URL', type: 'text' },
      ],
    },
    META_GROUP,
  ],

  sectors: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'tagline', label: 'Menu tagline', type: 'text' },
        { name: 'icon', label: 'Icon', type: 'select' },
        { name: 'sort_order', label: 'Order', type: 'number' },
        { name: 'show_in_footer', label: 'Show in footer', type: 'boolean' },
      ],
    },
    {
      title: 'Teasers',
      fields: [
        { name: 'listing_card_teaser', label: 'Listing card text', type: 'textarea', rows: 2 },
        {
          name: 'home_blurb',
          label: 'Home page text',
          type: 'textarea',
          rows: 2,
          help: 'Shown in the tabbed sectors section on the home page.',
        },
      ],
    },
    {
      title: 'Hero',
      fields: [
        { name: 'hero_image', label: 'Hero image', type: 'image' },
        { name: 'hero_image_alt', label: 'Hero image description', type: 'text' },
        { name: 'hero_heading', label: 'Hero heading', type: 'text' },
        { name: 'hero_subtitle', label: 'Hero subtitle', type: 'textarea', rows: 2 },
      ],
    },
    {
      title: 'Introduction',
      fields: [
        { name: 'intro_heading', label: 'Heading', type: 'text' },
        { name: 'intro_paragraphs', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    { title: 'Specifications', fields: [{ name: 'specs', label: 'Specs', type: 'specList' }] },
    {
      title: 'Fabrics',
      fields: [
        { name: 'fabrics_heading', label: 'Heading', type: 'text' },
        { name: 'fabrics_text', label: 'Paragraphs', type: 'stringList' },
        { name: 'fabrics_image', label: 'Image', type: 'image' },
        { name: 'fabrics_image_alt', label: 'Image description', type: 'text' },
      ],
    },
    {
      title: 'Fillings',
      fields: [
        { name: 'fillings_heading', label: 'Heading', type: 'text' },
        { name: 'fillings_text', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    {
      title: 'Evidence',
      fields: [
        { name: 'evidence_heading', label: 'Heading', type: 'text' },
        { name: 'evidence_intro', label: 'Intro paragraphs', type: 'stringList' },
        { name: 'evidence_list', label: 'Bullet points', type: 'stringList' },
        { name: 'side_image', label: 'Side image', type: 'image' },
        { name: 'side_image_alt', label: 'Side image description', type: 'text' },
      ],
    },
    {
      title: 'Related',
      fields: [
        {
          name: 'related_sectors',
          label: 'Related sectors',
          type: 'stringList',
          help: 'Enter the URL slugs of other sectors, e.g. nursery',
        },
      ],
    },
    META_GROUP,
  ],

  patterns: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'menu_title', label: 'Menu title', type: 'text' },
        { name: 'tagline', label: 'Menu tagline', type: 'text' },
        {
          name: 'kind',
          label: 'Swatch style',
          type: 'select',
          options: [
            { value: 'box', label: 'Box' },
            { value: 'diamond', label: 'Diamond' },
            { value: 'wavy', label: 'Wavy' },
            { value: 'vertical', label: 'Vertical' },
            { value: 'hourglass', label: 'Hourglass' },
            { value: 'bespoke', label: 'Bespoke' },
          ],
          help: 'Controls the drawn pattern swatch on the listing page.',
        },
        { name: 'sort_order', label: 'Order', type: 'number' },
      ],
    },
    {
      title: 'Listing card',
      fields: [
        { name: 'listing_subtitle', label: 'Sizes line', type: 'text' },
        { name: 'listing_teaser', label: 'Card text', type: 'textarea', rows: 2 },
      ],
    },
    {
      title: 'Hero',
      fields: [
        { name: 'hero_title', label: 'Title', type: 'text' },
        { name: 'hero_subtitle', label: 'Subtitle', type: 'text' },
        { name: 'pattern_image', label: 'Pattern photo', type: 'image' },
        { name: 'pattern_image_alt', label: 'Photo description', type: 'text' },
      ],
    },
    {
      title: 'About',
      fields: [
        { name: 'about_heading', label: 'Heading', type: 'text' },
        { name: 'about_paragraphs', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    {
      title: 'Specifications',
      fields: [
        { name: 'specs', label: 'Specs', type: 'specList' },
        { name: 'spec_note', label: 'Note under specs', type: 'textarea', rows: 2 },
      ],
    },
    {
      title: 'Samples',
      fields: [
        { name: 'sample_heading', label: 'Heading', type: 'text' },
        { name: 'sample_intro', label: 'Intro', type: 'textarea', rows: 2 },
        { name: 'sample_list', label: 'Bullet points', type: 'stringList' },
        { name: 'footer_note', label: 'Closing note', type: 'textarea', rows: 2 },
      ],
    },
    META_GROUP,
  ],

  insulation_subpages: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'tagline', label: 'Menu tagline', type: 'text' },
        { name: 'icon', label: 'Icon', type: 'select' },
        { name: 'sort_order', label: 'Order', type: 'number' },
        {
          name: 'is_published',
          label: 'Published',
          type: 'boolean',
          help: 'Unpublished pages show as "coming soon" instead of a link.',
        },
        { name: 'teaser_text', label: 'Listing card text', type: 'textarea', rows: 3 },
      ],
    },
    { title: 'Hero', fields: HERO_FIELDS },
    {
      title: 'Body',
      fields: [
        { name: 'body_heading', label: 'Heading', type: 'text' },
        { name: 'body_paragraphs', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    { title: 'Specifications', fields: [{ name: 'specs', label: 'Specs', type: 'specList' }] },
    {
      title: 'Panel',
      fields: [
        { name: 'panel_heading', label: 'Heading', type: 'text' },
        { name: 'panel_body', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    {
      title: 'Closing section',
      fields: [
        { name: 'closing_heading', label: 'Heading', type: 'text' },
        { name: 'closing_body', label: 'Paragraphs', type: 'stringList' },
      ],
    },
    META_GROUP,
  ],

  about_subpages: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'sort_order', label: 'Order', type: 'number' },
        { name: 'teaser', label: 'Listing card text', type: 'textarea', rows: 2 },
        { name: 'listing_image', label: 'Listing card image', type: 'image' },
      ],
    },
    { title: 'Hero', fields: HERO_FIELDS },
    {
      title: 'Body',
      fields: [{ name: 'body_paragraphs', label: 'Paragraphs', type: 'stringList' }],
    },
    META_GROUP,
  ],

  resource_articles: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'sort_order', label: 'Order', type: 'number' },
        { name: 'listing_teaser', label: 'Listing card text', type: 'textarea', rows: 2 },
        { name: 'listing_image', label: 'Listing card image', type: 'image' },
      ],
    },
    { title: 'Hero', fields: HERO_FIELDS },
    {
      title: 'Article body',
      fields: [
        {
          name: 'body_sections',
          label: 'Sections',
          type: 'sectionList',
          help: 'Each section has its own subheading and paragraphs.',
        },
      ],
    },
    META_GROUP,
  ],

  legal_pages: [
    {
      title: 'Basics',
      fields: [
        { name: 'title', label: 'Title', type: 'text' },
        SLUG_FIELD,
        { name: 'sort_order', label: 'Order', type: 'number' },
      ],
    },
    {
      title: 'Content',
      fields: [{ name: 'body_content', label: 'Page content', type: 'richtext' }],
    },
    META_GROUP,
  ],
}

/** Flattens a schema to a plain field list, for building empty records. */
export function fieldsOf(groups: FieldGroup[]): Field[] {
  return groups.flatMap((g) => g.fields)
}

/** The empty value appropriate to each field type. */
export function emptyValue(type: FieldType): unknown {
  switch (type) {
    case 'boolean':
      return false
    case 'number':
      return 0
    case 'stringList':
    case 'specList':
    case 'linkList':
    case 'imageList':
    case 'stepList':
    case 'sectionList':
    case 'buttonList':
      return []
    default:
      return ''
  }
}
