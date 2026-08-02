import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/site';
import { SectionHead } from './Section';

/**
 * The offer, as an index rather than a card grid.
 *
 * Five services, each one a ruled row. The artifacts that go with three of
 * them get their own sections further down the page — repeating a screenshot
 * beside every bullet would dilute the ones that matter.
 */
export default function Services() {
  return (
    <section id="services" className="section">
      <div className="shell">
        <SectionHead
          marker="What we do"
          aside="Five things, done properly"
          title="Four channels feed one number: how many people walk in."
          lede="They run in order. Advertising a two-point-eight rating is throwing money into
                a hole, so the rating comes first and the ads come fourth."
        />

        <ol className="mt-14">
          {services.map((s, i) => (
            <li
              key={s.id}
              id={`s-${s.id}`}
              className="grid gap-6 border-t border-rule py-9 lg:grid-cols-[7rem_minmax(0,1fr)_minmax(0,22rem)] lg:gap-10 lg:py-11"
            >
              <p className="figure text-sm text-muted lg:pt-1">
                <span className="text-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="ml-3 lg:hidden">{s.marker}</span>
                <span className="mt-1 hidden lg:block">{s.marker}</span>
              </p>

              <div>
                <h3 className="display text-[clamp(1.5rem,2.6vw,2rem)]">{s.title}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-body">{s.lede}</p>
                {s.href && (
                  <a
                    href={s.href}
                    className="link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                  >
                    {s.hrefLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>

              <ul className="grid content-start gap-2.5 lg:pt-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-snug text-body">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-px w-3 shrink-0 bg-gold"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
