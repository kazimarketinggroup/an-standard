/**
 * The admin sidebar, and the single source of truth for which CMS tables the
 * dashboard exposes. Collections are rendered by one generic list/edit screen
 * driven by these keys, so adding a section is a data change, not a new page.
 *
 * Labels are written for the client, not for a developer: they name what the
 * thing is on the website, never the table behind it.
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
    title: 'Start here',
    entries: [
      { label: 'Dashboard', href: '/admin' },
      { label: 'Phone, email, address', href: '/admin/singleton/global_settings', livePath: '/' },
      { label: 'Home page', href: '/admin/singleton/home_page', livePath: '/' },
    ],
  },
  {
    title: 'Your pages',
    entries: [
      { label: 'Sectors', href: '/admin/collection/sectors', livePath: '/sectors' },
      { label: 'Services', href: '/admin/collection/services', livePath: '/services' },
      { label: 'Patterns', href: '/admin/collection/patterns', livePath: '/patterns' },
      {
        label: 'Quilted Insulation',
        href: '/admin/collection/insulation_subpages',
        livePath: '/quilted-insulation',
      },
      { label: 'About', href: '/admin/collection/about_subpages', livePath: '/about' },
      {
        label: 'Resources',
        href: '/admin/collection/resource_articles',
        livePath: '/resources',
      },
    ],
  },
  {
    title: 'Single pages',
    entries: [
      { label: 'Contact', href: '/admin/singleton/contact_page', livePath: '/contact' },
      { label: 'Our process', href: '/admin/singleton/process_page', livePath: '/process' },
      { label: 'Quote form', href: '/admin/singleton/quote_page', livePath: '/quote' },
      { label: 'Legal pages', href: '/admin/collection/legal_pages' },
    ],
  },
  {
    title: 'Listing page headers',
    entries: [
      { label: 'About header', href: '/admin/singleton/about_page', livePath: '/about' },
      { label: 'Services header', href: '/admin/singleton/services_page', livePath: '/services' },
      { label: 'Sectors header', href: '/admin/singleton/sectors_page', livePath: '/sectors' },
      { label: 'Patterns header', href: '/admin/singleton/patterns_page', livePath: '/patterns' },
      {
        label: 'Insulation header',
        href: '/admin/singleton/insulation_page',
        livePath: '/quilted-insulation',
      },
      {
        label: 'Resources header',
        href: '/admin/singleton/resources_page',
        livePath: '/resources',
      },
      { label: 'Menus', href: '/admin/navigation', livePath: '/' },
    ],
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
    label: 'Quilted Insulation',
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
  global_settings: { label: 'Phone, email and address', livePath: '/' },
  home_page: { label: 'Home page', livePath: '/' },
  about_page: { label: 'About page header', livePath: '/about' },
  services_page: { label: 'Services page header', livePath: '/services' },
  insulation_page: { label: 'Quilted Insulation page', livePath: '/quilted-insulation' },
  sectors_page: { label: 'Sectors page header', livePath: '/sectors' },
  patterns_page: { label: 'Patterns page header', livePath: '/patterns' },
  process_page: { label: 'Our process page', livePath: '/process' },
  resources_page: { label: 'Resources page header', livePath: '/resources' },
  contact_page: { label: 'Contact page', livePath: '/contact' },
  quote_page: { label: 'Quote form wording', livePath: '/quote' },
}

export function isCollectionKey(value: string): value is CollectionKey {
  return value in collectionMeta
}

export function isSingletonKey(value: string): value is SingletonKey {
  return value in singletonMeta
}
