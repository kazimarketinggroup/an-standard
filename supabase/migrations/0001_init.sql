-- A.N. Standard Ltd. — CMS schema
--
-- Design notes:
--   * Singletons are ordinary tables pinned to id = 1 by a CHECK constraint, so
--     a second row is impossible and reads can always use .eq('id', 1).
--   * Repeatable list fields (specs, bullets, gallery images, steps) are jsonb
--     arrays rather than child tables: they are always edited together with
--     their parent, and never queried independently.
--   * Icons cannot be stored as React components, so collections keep an
--     `icon` text column holding a key that the frontend maps to a component.
--   * Every image column stores a URL string. Seeded rows hold existing
--     /images/... paths; admin uploads replace them with Supabase Storage URLs.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Singletons
-- ---------------------------------------------------------------------------

create table if not exists public.global_settings (
  id                    int primary key default 1 check (id = 1),
  company_name          text not null default '',
  tagline               text not null default '',
  topbar_email          text not null default '',
  topbar_whatsapp       text not null default '',
  header_phone          text not null default '',
  phone_href            text not null default '',
  whatsapp_href         text not null default '',
  email_href            text not null default '',
  logo_image            text not null default '',
  footer_logo_image     text not null default '',
  address_line1         text not null default '',
  address_line2         text not null default '',
  office_hours          text not null default '',
  social_links          jsonb not null default '[]'::jsonb,
  footer_copyright_text text not null default '',
  cta_block_heading     text not null default '',
  cta_block_text        text not null default '',
  updated_at            timestamptz not null default now()
);

create table if not exists public.home_page (
  id                          int primary key default 1 check (id = 1),
  hero_image                  text not null default '',
  hero_image_alt              text not null default '',
  hero_title                  text not null default '',
  hero_subtitle               text not null default '',
  hero_buttons                jsonb not null default '[]'::jsonb,
  stat_badges                 jsonb not null default '[]'::jsonb,
  about_heading               text not null default '',
  about_paragraphs            jsonb not null default '[]'::jsonb,
  about_image                 text not null default '',
  services_intro_heading      text not null default '',
  services_intro_text         text not null default '',
  services_intro_image        text not null default '',
  insulation_heading          text not null default '',
  insulation_text             text not null default '',
  insulation_image            text not null default '',
  sectors_heading             text not null default '',
  sectors_intro               text not null default '',
  featured_sector_slug        text not null default '',
  patterns_heading            text not null default '',
  patterns_intro              text not null default '',
  process_heading             text not null default '',
  process_intro               text not null default '',
  process_image               text not null default '',
  process_steps               jsonb not null default '[]'::jsonb,
  history_heading             text not null default '',
  history_paragraphs          jsonb not null default '[]'::jsonb,
  quote_cta_heading           text not null default '',
  quote_cta_text              text not null default '',
  meta_title                  text not null default '',
  meta_description            text not null default '',
  updated_at                  timestamptz not null default now()
);

create table if not exists public.about_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  stat_badges      jsonb not null default '[]'::jsonb,
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

create table if not exists public.services_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

create table if not exists public.insulation_page (
  id                         int primary key default 1 check (id = 1),
  hero_image                 text not null default '',
  hero_image_alt             text not null default '',
  hero_heading               text not null default '',
  hero_intro                 text not null default '',
  stat_boxes                 jsonb not null default '[]'::jsonb,
  why_lock_stitch_heading    text not null default '',
  why_lock_stitch_text       jsonb not null default '[]'::jsonb,
  suitable_industries        jsonb not null default '[]'::jsonb,
  fabrics_we_quilt           jsonb not null default '[]'::jsonb,
  why_work_with_us           jsonb not null default '[]'::jsonb,
  bottom_cta_heading         text not null default '',
  bottom_cta_text            text not null default '',
  meta_title                 text not null default '',
  meta_description           text not null default '',
  updated_at                 timestamptz not null default now()
);

create table if not exists public.sectors_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  banner_image     text not null default '',
  banner_image_alt text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

create table if not exists public.patterns_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  footer_note      text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

create table if not exists public.process_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  steps            jsonb not null default '[]'::jsonb,
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

create table if not exists public.resources_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

create table if not exists public.contact_page (
  id                  int primary key default 1 check (id = 1),
  hero_image          text not null default '',
  hero_image_alt      text not null default '',
  heading             text not null default '',
  intro_text          text not null default '',
  address             text not null default '',
  phone               text not null default '',
  whatsapp            text not null default '',
  email               text not null default '',
  business_hours_text text not null default '',
  social_links        jsonb not null default '[]'::jsonb,
  meta_title          text not null default '',
  meta_description    text not null default '',
  updated_at          timestamptz not null default now()
);

-- Only the labels are editable here; the form's validation and submission
-- behaviour stays in code.
create table if not exists public.quote_page (
  id               int primary key default 1 check (id = 1),
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  heading          text not null default '',
  intro_text       text not null default '',
  step_labels      jsonb not null default '[]'::jsonb,
  success_heading  text not null default '',
  success_text     text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  updated_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Collections
-- ---------------------------------------------------------------------------

create table if not exists public.services (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique,
  title                 text not null default '',
  menu_title            text not null default '',
  tagline               text not null default '',
  icon                  text not null default '',
  sort_order            int not null default 0,
  show_in_footer        boolean not null default false,
  listing_card_image    text not null default '',
  listing_card_alt      text not null default '',
  listing_card_teaser   text not null default '',
  hero_image            text not null default '',
  hero_image_alt        text not null default '',
  hero_heading          text not null default '',
  hero_intro            text not null default '',
  gallery_images        jsonb not null default '[]'::jsonb,
  body_heading          text not null default '',
  body_paragraphs       jsonb not null default '[]'::jsonb,
  highlight_box_heading text not null default '',
  highlight_box_text    text not null default '',
  specs                 jsonb not null default '[]'::jsonb,
  benefits_heading      text not null default '',
  benefits_intro        text not null default '',
  benefits_list         jsonb not null default '[]'::jsonb,
  fabrics_we_quilt      jsonb not null default '[]'::jsonb,
  why_work_with_us      jsonb not null default '[]'::jsonb,
  video_thumbnail_image text not null default '',
  video_url             text not null default '',
  meta_title            text not null default '',
  meta_description      text not null default '',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table if not exists public.sectors (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null default '',
  tagline             text not null default '',
  icon                text not null default '',
  sort_order          int not null default 0,
  show_in_footer      boolean not null default false,
  listing_card_teaser text not null default '',
  home_blurb          text not null default '',
  hero_image          text not null default '',
  hero_image_alt      text not null default '',
  hero_heading        text not null default '',
  hero_subtitle       text not null default '',
  intro_heading       text not null default '',
  intro_paragraphs    jsonb not null default '[]'::jsonb,
  specs               jsonb not null default '[]'::jsonb,
  fabrics_heading     text not null default '',
  fabrics_text        jsonb not null default '[]'::jsonb,
  fabrics_image       text not null default '',
  fabrics_image_alt   text not null default '',
  fillings_heading    text not null default '',
  fillings_text       jsonb not null default '[]'::jsonb,
  evidence_heading    text not null default '',
  evidence_intro      jsonb not null default '[]'::jsonb,
  evidence_list       jsonb not null default '[]'::jsonb,
  side_image          text not null default '',
  side_image_alt      text not null default '',
  related_sectors     jsonb not null default '[]'::jsonb,
  meta_title          text not null default '',
  meta_description    text not null default '',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists public.patterns (
  id                     uuid primary key default gen_random_uuid(),
  slug                   text not null unique,
  title                  text not null default '',
  menu_title             text not null default '',
  kind                   text not null default '',
  sort_order             int not null default 0,
  listing_subtitle       text not null default '',
  listing_teaser         text not null default '',
  tagline                text not null default '',
  hero_title             text not null default '',
  hero_subtitle          text not null default '',
  about_heading          text not null default '',
  about_paragraphs       jsonb not null default '[]'::jsonb,
  specs                  jsonb not null default '[]'::jsonb,
  spec_note              text not null default '',
  pattern_image          text not null default '',
  pattern_image_alt      text not null default '',
  sample_heading         text not null default '',
  sample_intro           text not null default '',
  sample_list            jsonb not null default '[]'::jsonb,
  footer_note            text not null default '',
  meta_title             text not null default '',
  meta_description       text not null default '',
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create table if not exists public.insulation_subpages (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null default '',
  tagline          text not null default '',
  icon             text not null default '',
  sort_order       int not null default 0,
  is_published     boolean not null default true,
  teaser_text      text not null default '',
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  body_heading     text not null default '',
  body_paragraphs  jsonb not null default '[]'::jsonb,
  specs            jsonb not null default '[]'::jsonb,
  panel_heading    text not null default '',
  panel_body       jsonb not null default '[]'::jsonb,
  comparison       jsonb not null default '{}'::jsonb,
  closing_heading  text not null default '',
  closing_body     jsonb not null default '[]'::jsonb,
  meta_title       text not null default '',
  meta_description text not null default '',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.about_subpages (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null default '',
  sort_order       int not null default 0,
  teaser           text not null default '',
  listing_image    text not null default '',
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  body_paragraphs  jsonb not null default '[]'::jsonb,
  meta_title       text not null default '',
  meta_description text not null default '',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.resource_articles (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null default '',
  sort_order       int not null default 0,
  listing_teaser   text not null default '',
  listing_image    text not null default '',
  hero_image       text not null default '',
  hero_image_alt   text not null default '',
  hero_heading     text not null default '',
  hero_intro       text not null default '',
  -- [{ heading, paragraphs: [] }] so an article can carry several subheadings.
  body_sections    jsonb not null default '[]'::jsonb,
  meta_title       text not null default '',
  meta_description text not null default '',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.legal_pages (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null default '',
  sort_order       int not null default 0,
  -- The only rich-text field in the CMS; stored as sanitised HTML.
  body_content     text not null default '',
  meta_title       text not null default '',
  meta_description text not null default '',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists public.nav_items (
  id         uuid primary key default gen_random_uuid(),
  label      text not null default '',
  url        text not null default '',
  sort_order int not null default 0,
  -- header | footer-services | footer-sectors | footer-company | footer-legal
  group_key  text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------

do $$
declare
  t text;
  tables text[] := array[
    'global_settings','home_page','about_page','services_page','insulation_page',
    'sectors_page','patterns_page','process_page','resources_page','contact_page',
    'quote_page','services','sectors','patterns','insulation_subpages',
    'about_subpages','resource_articles','legal_pages','nav_items'
  ];
begin
  foreach t in array tables loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I; '
      'create trigger set_updated_at before update on public.%I '
      'for each row execute function public.set_updated_at();', t, t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists services_order_idx            on public.services (sort_order);
create index if not exists sectors_order_idx             on public.sectors (sort_order);
create index if not exists patterns_order_idx            on public.patterns (sort_order);
create index if not exists insulation_subpages_order_idx on public.insulation_subpages (sort_order);
create index if not exists about_subpages_order_idx      on public.about_subpages (sort_order);
create index if not exists resource_articles_order_idx   on public.resource_articles (sort_order);
create index if not exists nav_items_group_order_idx     on public.nav_items (group_key, sort_order);

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- The public site reads with the anon key, so every table gets a read-all
-- policy. Writes are limited to signed-in admins; the service-role key used by
-- server actions bypasses RLS entirely.
-- ---------------------------------------------------------------------------

do $$
declare
  t text;
  tables text[] := array[
    'global_settings','home_page','about_page','services_page','insulation_page',
    'sectors_page','patterns_page','process_page','resources_page','contact_page',
    'quote_page','services','sectors','patterns','insulation_subpages',
    'about_subpages','resource_articles','legal_pages','nav_items'
  ];
begin
  foreach t in array tables loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public read" on public.%I;', t);
    execute format(
      'create policy "public read" on public.%I for select using (true);', t);

    execute format('drop policy if exists "admin write" on public.%I;', t);
    execute format(
      'create policy "admin write" on public.%I for all '
      'to authenticated using (true) with check (true);', t);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Storage bucket for admin image uploads
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site-images admin write" on storage.objects;
create policy "site-images admin write"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'site-images')
  with check (bucket_id = 'site-images');
