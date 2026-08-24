import Link from 'next/link'

/**
 * The landing screen.
 *
 * Organised by the question the client actually arrives with — "I need to
 * change the phone number", "I need to add a sector" — rather than by how the
 * database happens to be laid out.
 */

type Card = {
  title: string
  description: string
  href: string
  meta?: string
}

const COMMON: Card[] = [
  {
    title: 'Phone, email and address',
    description:
      'Your contact details, logos and the wording of the enquiry box. Used on every page.',
    href: '/admin/singleton/global_settings',
  },
  {
    title: 'Home page',
    description: 'The headline, photos and text on your front page.',
    href: '/admin/singleton/home_page',
  },
  {
    title: 'Contact page',
    description: 'The address, phone number and opening hours shown on your contact page.',
    href: '/admin/singleton/contact_page',
  },
]

const SECTIONS: Card[] = [
  {
    title: 'Sectors',
    description: 'The industries you quilt for — healthcare, nursery, equestrian and the rest.',
    href: '/admin/collection/sectors',
    meta: '9 pages',
  },
  {
    title: 'Services',
    description: 'What you offer, from commission quilting to bespoke patterns.',
    href: '/admin/collection/services',
    meta: '5 pages',
  },
  {
    title: 'Patterns',
    description: 'Your quilting patterns and their sizes.',
    href: '/admin/collection/patterns',
    meta: '6 pages',
  },
  {
    title: 'Quilted Insulation',
    description: 'The insulation pages and the products on them.',
    href: '/admin/collection/insulation_subpages',
    meta: '7 pages',
  },
  {
    title: 'About',
    description: 'Your story, factory and quality pages.',
    href: '/admin/collection/about_subpages',
    meta: '4 pages',
  },
  {
    title: 'Resources',
    description: 'Guides and articles for your customers.',
    href: '/admin/collection/resource_articles',
    meta: '3 articles',
  },
]

const OTHER: Card[] = [
  {
    title: 'Landing pages',
    description:
      'The top of the Services, Sectors, Patterns, Insulation and Resources listing pages.',
    href: '/admin/singleton/services_page',
  },
  {
    title: 'Our process',
    description: 'The numbered steps on your process page.',
    href: '/admin/singleton/process_page',
  },
  {
    title: 'Quote form wording',
    description: 'The headings on your quote page. The questions themselves are fixed.',
    href: '/admin/singleton/quote_page',
  },
  {
    title: 'Menus',
    description: 'The links in your header and footer.',
    href: '/admin/navigation',
  },
  {
    title: 'Legal pages',
    description: 'Privacy policy, terms and responsible disclosure.',
    href: '/admin/collection/legal_pages',
  },
]

function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {cards.map((card) => (
        <li key={card.href}>
          <Link
            href={card.href}
            className="group flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-4
                       transition-all hover:border-neutral-400 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium text-neutral-900">{card.title}</span>
              {card.meta && (
                <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-500">
                  {card.meta}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{card.description}</p>
            <span className="mt-3 text-xs font-medium text-neutral-400 transition-colors group-hover:text-neutral-900">
              Edit →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Website content</h1>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
        Everything on your website can be changed from here. Pick what you want to edit, make
        your change, then press <strong className="font-medium">Save changes</strong> — the
        website updates straight away.
      </p>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
        <p className="text-sm leading-relaxed text-blue-900">
          <strong className="font-medium">New here?</strong> Start with{' '}
          <Link href="/admin/singleton/global_settings" className="underline underline-offset-2">
            Phone, email and address
          </Link>{' '}
          — it is the quickest change to make, and you will see it update across the whole site.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Most often changed
        </h2>
        <div className="mt-3">
          <CardGrid cards={COMMON} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Your pages
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Each of these is a group of pages. You can edit them, reorder them, or add new ones.
        </p>
        <div className="mt-3">
          <CardGrid cards={SECTIONS} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Everything else
        </h2>
        <div className="mt-3">
          <CardGrid cards={OTHER} />
        </div>
      </section>
    </div>
  )
}
