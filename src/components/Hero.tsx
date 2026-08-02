import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cases } from '../data/site';
import { ProfileCard, ReviewCard } from './mockups';

const subject = cases[0];

/** Eases a number toward a target over `ms`, honouring reduced motion. */
function useTween(target: number, ms: number, still: boolean) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (still) { setValue(target); return; }
    const start = performance.now();
    const origin = from.current;
    let frame = 0;

    // Elapsed time is read from performance.now() rather than the frame
    // timestamp: the two do not always share an origin, and a frame stamped
    // behind `start` would otherwise pin the counter at its opening value.
    const tick = () => {
      const t = Math.max(0, Math.min(1, (performance.now() - start) / ms));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(origin + (target - origin) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else { from.current = target; setValue(target); }
    };

    frame = requestAnimationFrame(tick);

    // Backstop. If frames stop arriving — background tab, throttled clock —
    // the counter still has to land on the real rating rather than freeze
    // partway and quietly show a number that is not true.
    const settle = setTimeout(() => {
      cancelAnimationFrame(frame);
      from.current = target;
      setValue(target);
    }, ms + 120);

    return () => { cancelAnimationFrame(frame); clearTimeout(settle); };
  }, [target, ms, still]);

  useEffect(() => { if (still) from.current = target; }, [target, still]);
  return value;
}

const facts = [
  ['Restaurants', 'and nothing else'],
  ['4 channels', 'profile · reviews · email · ads'],
  ['Monday', 'is when the report lands'],
  ['Month to month', 'after the first 90 days'],
];

export default function Hero() {
  const [state, setState] = useState<'before' | 'after'>('before');
  const [still, setStill] = useState(true);

  // Play the flip once on load — the pitch, told without a sentence.
  useEffect(() => {
    const quiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quiet) { setState('after'); return; }
    setStill(false);
    const id = setTimeout(() => setState('after'), 1100);
    return () => clearTimeout(id);
  }, []);

  const target = state === 'after' ? subject.after : subject.before;
  const rating = useTween(target.rating, 900, still);
  const count = useTween(target.count, 900, still);

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* ── Argument ── */}
          <div>
            <p className="label">Growth marketing · restaurants only</p>

            <h1 className="display mt-5 text-[clamp(2.6rem,7.2vw,4.4rem)]">
              Your front door is a search&nbsp;result.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              Before anyone tastes your food they see a rating, three photographs and a
              review count. That screen decides whether they walk in. We rebuild it, fill it
              with real reviews, and then go and find people to sit at the tables.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="/#contact" className="btn btn-solid">
                Book a 20-minute teardown
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/#work" className="btn btn-line">See the work</a>
            </div>

            <p className="mt-5 text-sm text-muted">
              Free, no deck. We look up your listing on the call and read it back to you.
            </p>
          </div>

          {/* ── Artifact ── */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="label">The same restaurant, {subject.span} apart</p>

              <div
                className="inline-flex shrink-0 rounded border border-rule p-0.5"
                role="group"
                aria-label="Listing state"
              >
                {(['before', 'after'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setStill(false); setState(s); }}
                    aria-pressed={state === s}
                    className={`figure rounded px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                      state === s
                        ? 'bg-ink text-paper'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem]">
              <ProfileCard
                c={subject}
                state={state}
                rating={Math.round(rating * 10) / 10}
                count={Math.round(count)}
              />

              {/* The reviews only exist on the far side of the work. */}
              <div
                aria-hidden={state === 'before'}
                className={`grid gap-3 transition-all duration-500 sm:content-start ${
                  state === 'after'
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0'
                }`}
              >
                {subject.reviews.map((r) => (
                  <ReviewCard key={r.name} r={r} />
                ))}
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted">
              Worked example. {subject.headline}
            </p>
          </div>
        </div>
      </div>

      {/* ── How the shop runs ── */}
      <div className="shell mt-16 lg:mt-24">
        <dl className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([head, tail], i) => (
            <div
              key={head}
              className={`py-5 sm:px-6 lg:py-6 ${i > 0 ? 'border-t border-rule sm:border-t-0' : ''} ${
                i % 2 === 1 ? 'sm:border-l sm:border-rule' : ''
              } ${i >= 2 ? 'sm:border-t sm:border-rule lg:border-t-0' : ''} ${
                i > 0 ? 'lg:border-l lg:border-rule' : ''
              } ${i === 0 ? 'sm:pl-0' : ''}`}
            >
              <dt className="display text-2xl">{head}</dt>
              <dd className="mt-1 text-sm text-muted">{tail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
