-- The team photo grid on /about/our-team.
--
-- Additive and safe to re-run. Only about_subpages needs the column; the grid
-- renders on whichever about page has members, so no other table changes.

-- [{ name, designation, photo, photo_alt, bio }] — see src/lib/cms/types.ts.
-- Order is the array order, which is what the admin's up/down buttons rewrite.
alter table public.about_subpages
  add column if not exists team_members jsonb not null default '[]'::jsonb;
