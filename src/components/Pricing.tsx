import { Check } from 'lucide-react';
import { plans } from '../data/site';
import { SectionHead } from './Section';

export default function Pricing() {
  return (
    <section id="pricing" className="section section-band">
      <div className="shell">
        <SectionHead
          marker="Pricing"
          aside="Ad spend never marked up"
          title="Three shapes. Whichever one fits the room."
          lede="One number, agreed before we start, invoiced monthly. Media spend goes from your
                card straight to Meta, so you can see exactly what we did and did not spend it on."
        />

        <div className="mt-14 grid gap-px bg-rule lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col p-7 lg:p-8 ${p.featured ? 'bg-ink text-paper' : 'bg-paper'}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className={`display text-2xl ${p.featured ? '!text-paper' : ''}`}>{p.name}</h3>
                <span className={`label ${p.featured ? '!text-paper/60' : ''}`}>{p.tag}</span>
              </div>

              <p className={`mt-6 text-sm leading-relaxed ${p.featured ? 'text-paper/75' : 'text-body'}`}>
                {p.blurb}
              </p>

              <div className={`mt-7 border-t pt-5 ${p.featured ? 'border-paper/20' : 'border-rule'}`}>
                <p className={`figure text-2xl ${p.featured ? 'text-paper' : 'text-ink'}`}>{p.price}</p>
                <p className={`label mt-1.5 ${p.featured ? '!text-paper/55' : ''}`}>{p.note}</p>
              </div>

              <ul className="mt-7 grid flex-1 content-start gap-3">
                {p.includes.map((f) => (
                  <li
                    key={f}
                    className={`flex gap-3 text-sm leading-snug ${p.featured ? 'text-paper/85' : 'text-body'}`}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/#contact"
                className={`btn mt-9 w-full ${
                  p.featured ? 'bg-gold text-[#14110d] hover:bg-paper hover:text-ink' : 'btn-line'
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          Every engagement starts with the free teardown. The quote comes after it, once we have
          seen what state the listing is actually in — not before.
        </p>
      </div>
    </section>
  );
}
