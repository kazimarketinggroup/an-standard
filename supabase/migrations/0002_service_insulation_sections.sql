-- Fields needed to move the five service pages and seven insulation subpages
-- into the CMS.
--
-- Everything here is additive: existing rows keep their values, and every new
-- column has a default so partially-populated rows stay valid.

-- ---------------------------------------------------------------------------
-- services
--
-- The five service pages share one layout. Most of it already had columns; the
-- rest are added here, plus a generic `extra_sections` list for the bespoke
-- block each page carries (a weight-guide table, a pattern-design workflow, a
-- list of material limits). Those blocks differ per page but share a shape —
-- heading, optional intro, and a list of items — so one flexible field models
-- all of them without a column per page.
-- ---------------------------------------------------------------------------

alter table public.services
  -- The three swatch photos under the hero.
  add column if not exists swatches jsonb not null default '[]'::jsonb,
  -- The "Why Choose Lock Stitch Quilting?" panel: two flanking photos, a
  -- bulleted application list, and the bold line closing the panel.
  add column if not exists panel_heading text not null default '',
  add column if not exists panel_intro text not null default '',
  add column if not exists panel_list jsonb not null default '[]'::jsonb,
  add column if not exists panel_left_image text not null default '',
  add column if not exists panel_left_image_alt text not null default '',
  add column if not exists panel_right_image text not null default '',
  add column if not exists panel_right_image_alt text not null default '',
  add column if not exists panel_footnote text not null default '',
  add column if not exists panel_cta_label text not null default '',
  add column if not exists panel_cta_href text not null default '',
  -- The panel comes in two published layouts: photos on both sides of the
  -- copy, or a single photo on the left. Both are kept so the existing pages
  -- render exactly as they do today.
  add column if not exists panel_layout text not null default 'three-column',
  -- 'bullets' is a plain list; 'pills' renders each item as a highlighted
  -- label beside its description, as the wadding weight guide does.
  add column if not exists panel_list_style text not null default 'bullets',
  -- Headings above the two shared lists.
  add column if not exists fabrics_heading text not null default '',
  add column if not exists fabrics_intro text not null default '',
  add column if not exists why_heading text not null default '',
  add column if not exists why_intro text not null default '',
  -- The "See our work process" link and the photo beside that column.
  add column if not exists video_label text not null default '',
  add column if not exists video_caption text not null default '',
  add column if not exists side_image text not null default '',
  add column if not exists side_image_alt text not null default '',
  add column if not exists hero_buttons jsonb not null default '[]'::jsonb,
  -- [{ heading, intro, style, items: [...] }] — see src/lib/cms/types.ts.
  add column if not exists extra_sections jsonb not null default '[]'::jsonb;

-- ---------------------------------------------------------------------------
-- insulation_subpages
--
-- All seven pages use one shape already modelled, except the second panel:
-- a heading, body, two images, and a second heading/body beneath them.
-- ---------------------------------------------------------------------------

alter table public.insulation_subpages
  add column if not exists panel_image text not null default '',
  add column if not exists panel_image_alt text not null default '',
  add column if not exists second_panel_heading text not null default '',
  add column if not exists second_panel_body jsonb not null default '[]'::jsonb,
  add column if not exists second_panel_left_image text not null default '',
  add column if not exists second_panel_left_image_alt text not null default '',
  add column if not exists second_panel_image text not null default '',
  add column if not exists second_panel_image_alt text not null default '',
  add column if not exists second_panel_sub_heading text not null default '',
  add column if not exists second_panel_sub_body jsonb not null default '[]'::jsonb;
