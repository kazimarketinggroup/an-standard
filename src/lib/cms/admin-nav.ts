/**
 * The admin sidebar, and the single source of truth for which CMS tables the
 * dashboard exposes. Collections are rendered by one generic list/edit screen
 * driven by these keys, so adding a section is a data change, not a new page.
 */

export type CollectionKey =
  | 'services'
  | 'sectors'
  | 'patterns'
  | 'insulation_subpages'
  | 'about_subpages'
  | 'resource_articles'
  | 'legal_pages'

export type SingletonKey =
  | 'global_settings'
  | 'home_page'
  | 'about_page'
  | 'services_page'
  | 'insulation_page'
  | 'sectors_page'
  | 'patterns_page'
  | 'process_page'
  | 'resources_page'
  | 'contact_page'
  | 'quote_page'

export type NavEntry = {
  label: string
  href: string
  /** The public URL this screen edits, for the "View live page" link. */
  livePath?: string
}

export type NavSection = {
  title: string
  entries: NavEntry[]
}

export const adminNav: NavSection[] = [
  {
    title: 'Site-wide',
    entries: [
      { label: 'Global Settings', href: '/admin/global', livePath: '/' },
      { label: 'Navigation', href: '/admin/navigation', livePath: '/' },
    ],
  },
  {
    title: 'Pages',
    entries: [
      { label: 'Home', href: '/admin/singleton/home_page', livePath: '/' },
      { label: 'Process', href: '/admin/singleton/process_page', livePath: '/process' },
      { label: 'Contact', href: '/admin/singleton/contact_page', livePath: '/contact' },
      { label: 'Quote', href: '/admin/singleton/quote_page', livePath: '/quote' },
    ],
  },
  {
    title: 'About',
    entries: [
      { label: 'About listing', href: '/admin/singleton/about_page', livePath: '/about' },
      { label: 'About pages', href: '/admin/collection/about_subpages', livePath: '/about' },
    ],
  },
  {
    title: 'Services',
    entries: [
      { label: 'Services listing', href: '/admin/singleton/services_page', livePath: '/services' },
      { label: 'Services', href: '/admin/collection/services', livePath: '/services' },
    ],
  },
  {
    title: 'Quilted Insulation',
    entries: [
      {
        label: 'Insulation listing',
        href: '/admin/singleton/insulation_page',
        livePath: '/quilted-insulation',
      },
      {
        label: 'Insulation pages',
        href: '/admin/collection/insulation_subpages',
        livePath: '/quilted-insulation',
      },
    ],
  },
  {
    title: 'Sectors',
    entries: [
      { label: 'Sectors listing', href: '/admin/singleton/sectors_page', livePath: '/sectors' },
      { label: 'Sectors', href: '/admin/collection/sectors', livePath: '/sectors' },
    ],
  },
  {
    title: 'Patterns',
    entries: [
      { label: 'Patterns listing', href: '/admin/singleton/patterns_page', livePath: '/patterns' },
      { label: 'Patterns', href: '/admin/collection/patterns', livePath: '/patterns' },
    ],
  },
  {
    title: 'Resources',
    entries: [
      {
        label: 'Resources listing',
        href: '/admin/singleton/resources_page',
        livePath: '/resources',
      },
      { label: 'Articles', href: '/admin/collection/resource_articles', livePath: '/resources' },
    ],
  },
  {
    title: 'Legal',
    entries: [{ label: 'Legal pages', href: '/admin/collection/legal_pages', livePath: '/' }],
  },
]

/** Metadata for the generic collection screens. */
export const collectionMeta: Record<
  CollectionKey,
  { label: string; singular: string; basePath: string; canCreate: boolean }
> = {
  services: {
    label: 'Services',
    singular: 'service',
    basePath: '/services',
    canCreate: true,
  },
  sectors: { label: 'Sectors', singular: 'sector', basePath: '/sectors', canCreate: true },
  patterns: { label: 'Patterns', singular: 'pattern', basePath: '/patterns', canCreate: true },
  insulation_subpages: {
    label: 'Insulation pages',
    singular: 'insulation page',
    basePath: '/quilted-insulation',
    canCreate: true,
  },
  about_subpages: {
    label: 'About pages',
    singular: 'about page',
    basePath: '/about',
    canCreate: true,
  },
  resource_articles: {
    label: 'Resource articles',
    singular: 'article',
    basePath: '/resources',
    canCreate: true,
  },
  // The three legal pages are linked from the footer by fixed slug, so the
  // client can edit them but not add or remove them.
  legal_pages: { label: 'Legal pages', singular: 'legal page', basePath: '', canCreate: false },
}

export const singletonMeta: Record<SingletonKey, { label: string; livePath: string }> = {
  global_settings: { label: 'Global Settings', livePath: '/' },
  home_page: { label: 'Home Page', livePath: '/' },
  about_page: { label: 'About Listing', livePath: '/about' },
  services_page: { label: 'Services Listing', livePath: '/services' },
  insulation_page: { label: 'Insulation Listing', livePath: '/quilted-insulation' },
  sectors_page: { label: 'Sectors Listing', livePath: '/sectors' },
  patterns_page: { label: 'Patterns Listing', livePath: '/patterns' },
  process_page: { label: 'Process Page', livePath: '/process' },
  resources_page: { label: 'Resources Listing', livePath: '/resources' },
  contact_page: { label: 'Contact Page', livePath: '/contact' },
  quote_page: { label: 'Quote Page', livePath: '/quote' },
}

export function isCollectionKey(value: string): value is CollectionKey {
  return value in collectionMeta
}

export function isSingletonKey(value: string): value is SingletonKey {
  return value in singletonMeta
}
