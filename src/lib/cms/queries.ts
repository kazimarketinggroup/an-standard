import { cache } from 'react'
import { createPublicClient } from '../supabase/admin'
import { isSupabaseConfigured } from '../supabase/env'
import type {
  AboutPage,
  AboutSubpage,
  ContactPage,
  GlobalSettings,
  HomePage,
  InsulationPage,
  InsulationSubpage,
  LegalPage,
  NavItem,
  Pattern,
  PatternsPage,
  Pattern as PatternType,
  ProcessPage,
  QuotePage,
  ResourceArticle,
  ResourcesPage,
  Sector,
  SectorsPage,
  Service,
  ServicesPage,
} from './types'

/**
 * Read helpers for the public site.
 *
 * Every function is wrapped in React's `cache`, so a page that needs global
 * settings in both the header and the footer still issues one query per
 * request. All of them fail soft: if Supabase is unreachable or a row is
 * missing the caller gets `null` (singletons) or `[]` (collections) rather
 * than an exception, which keeps the site rendering during setup and if the
 * client ever empties a table.
 */

/**
 * True once the public Supabase credentials exist. Before that every read is
 * skipped silently: the site renders from its fallbacks, and the build log
 * stays free of one error per table per page.
 */
const isConfigured = isSupabaseConfigured

async function fetchSingleton<T>(table: string): Promise<T | null> {
  if (!isConfigured) return null
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.from(table).select('*').eq('id', 1).maybeSingle()
    if (error) {
      console.error(`[cms] ${table}:`, error.message)
      return null
    }
    return (data as T) ?? null
  } catch (err) {
    console.error(`[cms] ${table}:`, err)
    return null
  }
}

async function fetchCollection<T>(table: string, orderBy = 'sort_order'): Promise<T[]> {
  if (!isConfigured) return []
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase.from(table).select('*').order(orderBy)
    if (error) {
      console.error(`[cms] ${table}:`, error.message)
      return []
    }
    return (data as T[]) ?? []
  } catch (err) {
    console.error(`[cms] ${table}:`, err)
    return []
  }
}

async function fetchBySlug<T>(table: string, slug: string): Promise<T | null> {
  if (!isConfigured) return null
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (error) {
      console.error(`[cms] ${table}/${slug}:`, error.message)
      return null
    }
    return (data as T) ?? null
  } catch (err) {
    console.error(`[cms] ${table}/${slug}:`, err)
    return null
  }
}

/* --- singletons --- */

export const getGlobalSettings = cache(() =>
  fetchSingleton<GlobalSettings>('global_settings')
)
export const getHomePage = cache(() => fetchSingleton<HomePage>('home_page'))
export const getAboutPage = cache(() => fetchSingleton<AboutPage>('about_page'))
export const getServicesPage = cache(() => fetchSingleton<ServicesPage>('services_page'))
export const getInsulationPage = cache(() => fetchSingleton<InsulationPage>('insulation_page'))
export const getSectorsPage = cache(() => fetchSingleton<SectorsPage>('sectors_page'))
export const getPatternsPage = cache(() => fetchSingleton<PatternsPage>('patterns_page'))
export const getProcessPage = cache(() => fetchSingleton<ProcessPage>('process_page'))
export const getResourcesPage = cache(() => fetchSingleton<ResourcesPage>('resources_page'))
export const getContactPage = cache(() => fetchSingleton<ContactPage>('contact_page'))
export const getQuotePage = cache(() => fetchSingleton<QuotePage>('quote_page'))

/* --- collections --- */

export const getServices = cache(() => fetchCollection<Service>('services'))
export const getSectors = cache(() => fetchCollection<Sector>('sectors'))
export const getPatterns = cache(() => fetchCollection<PatternType>('patterns'))
export const getInsulationSubpages = cache(() =>
  fetchCollection<InsulationSubpage>('insulation_subpages')
)
export const getAboutSubpages = cache(() => fetchCollection<AboutSubpage>('about_subpages'))
export const getResourceArticles = cache(() =>
  fetchCollection<ResourceArticle>('resource_articles')
)
export const getLegalPages = cache(() => fetchCollection<LegalPage>('legal_pages'))
export const getNavItems = cache(() => fetchCollection<NavItem>('nav_items'))

/* --- single records --- */

export const getService = cache((slug: string) => fetchBySlug<Service>('services', slug))
export const getSector = cache((slug: string) => fetchBySlug<Sector>('sectors', slug))
export const getPattern = cache((slug: string) => fetchBySlug<Pattern>('patterns', slug))
export const getInsulationSubpage = cache((slug: string) =>
  fetchBySlug<InsulationSubpage>('insulation_subpages', slug)
)
export const getAboutSubpage = cache((slug: string) =>
  fetchBySlug<AboutSubpage>('about_subpages', slug)
)
export const getResourceArticle = cache((slug: string) =>
  fetchBySlug<ResourceArticle>('resource_articles', slug)
)
export const getLegalPage = cache((slug: string) => fetchBySlug<LegalPage>('legal_pages', slug))

/* --- derived --- */

export const getFooterServices = cache(async () =>
  (await getServices()).filter((s) => s.show_in_footer)
)
export const getFooterSectors = cache(async () =>
  (await getSectors()).filter((s) => s.show_in_footer)
)
export const getNavGroup = cache(async (group: string) =>
  (await getNavItems()).filter((item) => item.group_key === group)
)
