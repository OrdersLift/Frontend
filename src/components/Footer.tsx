import { contact } from '../data/site';

const columns = [
  {
    head: 'What we do',
    links: [
      { name: 'Reviews',         href: '/#s-reviews' },
      { name: 'Google profile',  href: '/#s-profile' },
      { name: 'Email & SMS',     href: '/#emails' },
      { name: 'Meta ads',        href: '/#ads' },
      { name: 'Site & ordering', href: '/#s-website' },
    ],
  },
  {
    head: 'Look around',
    links: [
      { name: 'The work',      href: '/#work' },
      { name: 'How it runs',   href: '/#process' },
      { name: 'Pricing',       href: '/#pricing' },
      { name: 'Questions',     href: '/#faq' },
      { name: 'Demo restaurant', href: '/demo/restaurants/' },
    ],
  },
  {
    head: 'Company',
    links: [
      { name: 'About us',        href: '/about' },
      { name: 'Book a teardown', href: '/#contact' },
      { name: 'Privacy policy',  href: '/privacy' },
      { name: 'Terms of service', href: '/terms' },
      { name: 'Cookie policy',   href: '/cookies' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="shell">
        <div className="grid gap-10 py-14 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] lg:gap-12 lg:py-16">
          <div>
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="" className="h-9 w-auto" />
              <span className="display text-xl">OrdersLift</span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-body">
              A growth agency for restaurants and nothing else. We fix the listing, build the
              reviews, write to your guests and run the ads — then send you one page every Monday
              showing what it did.
            </p>
            <div className="mt-6 grid gap-1.5">
              <a href={`mailto:${contact.email}`} className="text-sm text-body transition-colors hover:text-ink">
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                className="figure text-sm text-body transition-colors hover:text-ink"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.head} aria-label={col.head}>
              <h3 className="label">{col.head}</h3>
              <ul className="mt-5 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <a href={l.href} className="text-sm text-body transition-colors hover:text-ink">
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-rule py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} OrdersLift. Restaurants only.
          </p>
          <p className="text-xs text-muted">
            Listings, emails and ad creative shown on this site are worked examples.
          </p>
        </div>
      </div>
    </footer>
  );
}
