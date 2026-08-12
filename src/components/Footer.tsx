import { motion, MotionConfig } from 'framer-motion';
import { brand, footer } from '../data/site';
import { fadeUp, viewportOnce } from '../lib/motion';

/* Widened once here so `.map`/`.find` see one array type instead of a union
   of three literal-typed tuples. */
type Column = { title: string; links: readonly { label: string; href: string }[] };
const columns: readonly Column[] = footer.columns;
const legal = columns.find((c) => c.title === 'Legal');

const linkClass = 'focus-ring rounded-sm text-sm text-body transition-colors hover:text-ink';

/* The footer closes the page — one reveal, no stagger, nothing to look at
   twice. `.section-band` already paints its own hairline top and bottom. */
const Footer = () => (
  <MotionConfig reducedMotion="user">
    <footer className="section-band">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:pt-20">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
          {/* Brand column is double-width, so lg reads as 4 columns, not 5 */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <div className="sm:col-span-2">
              <a
                href="/"
                aria-label={brand.name}
                className="focus-ring -mx-1 inline-block rounded-md px-1 py-1 leading-none"
              >
                {/* Same mark as the header. */}
                <img src="/logo-h-dark.png" alt="" width={491} height={120} className="block h-10 w-auto" />
                <span className="mt-3 block text-[10px] uppercase tracking-[0.18em] text-muted">
                  {brand.tagline}
                </span>
              </a>
              <p className="mt-4 max-w-xs text-sm text-body">{footer.blurb}</p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">{col.title}</h2>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className={linkClass}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-rule pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            {legal && (
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {legal.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="focus-ring rounded-sm text-xs text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  </MotionConfig>
);

export default Footer;
