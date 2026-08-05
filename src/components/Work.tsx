import { ArrowRight } from 'lucide-react';
import { cases } from '../data/site';
import { ProfileCard } from './mockups';
import { SectionHead } from './Section';

const shown = cases.slice(1);

function Delta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="label">{label}</span>
      <span className="figure text-base font-medium text-gain">{value}</span>
    </div>
  );
}

/**
 * Before and after, side by side — the format the whole pitch rests on.
 * Labelled as worked examples in the section note, deliberately: these
 * illustrate the shape of the job, they are not signed-off client records.
 */
export default function Work() {
  return (
    <section id="work" className="section section-band">
      <div className="shell">
        <SectionHead
          marker="The work"
          aside="Worked examples"
          title="Same kitchen. Same street. Different result."
          lede="Nothing on the menu changed in any of these. What changed is what a stranger
                sees in the four seconds before they decide where to eat."
        />

        <div className="mt-14 grid gap-14">
          {shown.map((c) => (
            <article key={c.id} className="border-t border-rule pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h3 className="display text-2xl">{c.name}</h3>
                <p className="label">
                  {c.category} · {c.address.split(',').slice(1).join(',').trim()} · {c.span}
                </p>
              </div>

              <p className="mt-3 max-w-2xl text-body">“{c.headline}”</p>

              <div className="mt-8 grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)]">
                <div>
                  <p className="label mb-2.5 text-loss">Before</p>
                  <ProfileCard c={c} state="before" compact />
                </div>

                <div className="hidden place-items-center lg:grid" aria-hidden="true">
                  <ArrowRight className="h-6 w-6 text-muted" strokeWidth={1.5} />
                </div>

                <div>
                  <p className="label mb-2.5 text-gain">After</p>
                  <ProfileCard c={c} state="after" compact />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-rule pt-4">
                <Delta
                  label="Rating"
                  value={`+${(c.after.rating - c.before.rating).toFixed(1)}`}
                />
                <Delta
                  label="Reviews"
                  value={`+${(c.after.count - c.before.count).toLocaleString()}`}
                />
                <Delta label="Elapsed" value={c.span} />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-t border-rule pt-5 text-xs leading-relaxed text-muted">
          Worked examples, built from real campaign structures to show the shape of the job.
          Restaurant names and figures are illustrative. Ask on the call and we will walk you
          through live profiles instead.
        </p>
      </div>
    </section>
  );
}
