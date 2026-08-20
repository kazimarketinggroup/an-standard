# A.N. Standard Ltd. — website

Marketing site for A.N. Standard Ltd., built with Next.js (App Router) and
Tailwind. All page content is stored in Supabase and edited through a built-in
admin dashboard at `/admin`.

---

## For the site owner: editing your website

### Signing in

Go to **https://your-site.com/admin** and sign in with the email and password
you were given. There is no public sign-up — accounts are created by your
developer.

### How it works

The left-hand menu is grouped by section. Click any entry to edit that page.
Every screen has a **View live page ↗** link at the top so you can open the
real page in a new tab and check your work.

There are no drafts, so only save when you are happy with the wording.

Saved changes normally appear on the live site straight away. Pages are cached
for speed, so if a change has not shown up yet, wait a minute and refresh — it
will appear on its own.

### What you can edit

| Section | What it controls |
| --- | --- |
| **Global Settings** | Company name, phone, email, WhatsApp, address, opening hours, logos, social links, footer copyright, and the "Tell us what you need quilting" block that appears near the bottom of most pages |
| **Navigation** | The header menu, the footer's Company column, and the footer's legal links |
| **Home / Process / Contact / Quote** | Each of those single pages |
| **About / Services / Quilted Insulation / Sectors / Patterns / Resources** | The listing page, plus the individual pages inside each section |
| **Legal pages** | Privacy Policy, Responsible Disclosure, Terms |

### Editing fields

- **Text boxes** — type your wording. In large boxes, pressing Enter creates a
  genuine line break on the page, which is how the two-line headings work.
- **Images** — click **Change image** and pick a file. It replaces the old one
  straight away. Keep images under 8MB; JPEG, PNG or WebP.
- **Lists** (specification tables, bullet points, steps, galleries) — use
  **+ Add** for a new row, the **↑ ↓** buttons to reorder, and **×** to delete.
- **Page title / Page description** — what Google shows in search results.

### Adding and removing pages

Sections like Services, Sectors and Patterns have an **+ Add new** button. Give
the page a title and a URL slug (lowercase, hyphens instead of spaces) and it
appears on its listing page automatically. The **×** button deletes a page
permanently.

Two things worth knowing:

- **Changing a URL slug breaks existing links** to that page, including any
  Google has already indexed. Avoid changing it once a page is published.
- The **Show in footer** switch on a service or sector controls whether it
  appears in the footer's "What we do" and "Sectors" columns.

### If something looks wrong

Every page falls back to sensible defaults, so clearing a field usually hides
that section rather than breaking the page. If a page does look wrong, put the
old wording back and save again — or contact your developer.

---

## For developers

### Setup

```bash
npm install
cp .env.example .env.local     # then fill in the values
```

Environment variables (Supabase dashboard → Project Settings → API):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public read key. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted too — Supabase renamed it, and `lib/supabase/env.ts` reads whichever is set |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only. Bypasses RLS — never expose to the browser |

### First-time database setup

1. Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor. It
   creates the tables, row-level security policies and the `site-images`
   storage bucket.
2. Seed the current site content:
   ```bash
   npm run seed
   ```
3. Create the admin user:
   ```bash
   npm run create-admin -- admin@example.com 'a-strong-password'
   ```
   Re-running with an existing address resets that user's password.

Then `npm run dev` and sign in at http://localhost:3000/admin.

### Architecture

```
src/
  app/
    (site)/          Public pages — route group so /admin skips the site chrome
    admin/           Dashboard: schema-driven forms, server actions
  components/        Unchanged presentational components
  lib/
    cms/
      schema.ts      Declares every editable field — the file to edit most often
      queries.ts     Cached read helpers, one per table
      types.ts       Row types mirroring the SQL
      fallbacks.ts   Guards so empty/missing data never crashes a page
      icons.ts       Maps stored icon keys to components
      sanitize.ts    Whitelist filter for the legal pages' HTML
    supabase/
      admin.ts       Cookie-free clients (public read, service role)
      server.ts      Session client — imports next/headers
```

Points worth knowing before changing things:

- **`schema.ts` drives the admin.** One generic form renders every screen, so
  adding a field is a line of data plus a column in SQL — not a new component.
- **`server.ts` imports `next/headers`.** Anything reachable from a Client
  Component (including Server Actions, which client components import) must use
  `admin.ts` instead, or the page fails with an RSC error.
- **Every page falls back to its original hardcoded copy.** The site renders
  correctly with no database at all, which is what keeps builds green before
  configuration. Those fallbacks are also the safety net if a table is emptied.
- **Icons cannot be stored in Postgres**, so rows keep an icon *key* that
  `icons.ts` resolves. Renaming a key orphans every row using it.
- **The quote form's logic is deliberately not editable** — only its labels.
- **Public pages are ISR, not fully static.** Each exports `revalidate = 60`.
  Pages built via `generateStaticParams` are otherwise baked at build time, and
  `revalidatePath` alone does *not* regenerate them — without the timer, a
  content edit would never reach the live site. Save still calls
  `revalidatePath('/', 'layout')`; the timer is what guarantees it lands.

### Legacy hardcoded pages

The original detail pages for services, sectors, insulation and about still
exist under `src/app/(site)/`. Next matches them before the `[slug]` routes, so
they currently win. Once the seeded content is verified in the admin, deleting
those files hands the routes to the database-driven versions. Until then they
are a rollback path.

`src/lib/{services,sectors,patterns,insulation,site}.ts` are still imported as
the fallback data described above, and should not be deleted with them.

### Deployment

Vercel. Set the three environment variables in the project settings; the build
also reads `NEXT_PUBLIC_SUPABASE_URL` to allow Supabase Storage images through
`next/image`.
