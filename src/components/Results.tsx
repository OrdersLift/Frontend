import type { ReactNode } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { media } from '../data/media';
import { brand, results } from '../data/site';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

type Item = (typeof results.items)[number];

const captionClass = 'text-[10px] uppercase tracking-wider text-muted';

/** Decorative — the number beside it is the accessible value. */
function Stars({ value, tone }: { value: number; tone: string }) {
  return (
    <div aria-hidden="true" className="mt-1.5 flex items-center justify-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = value - i;
        return (
          <Star
            key={i}
            className={`h-3 w-3 ${
              fill >= 1 ? tone : fill > 0.25 ? `${tone} opacity-40` : 'text-muted opacity-25'
            }`}
            fill="currentColor"
            stroke="none"
          />
        );
      })}
    </div>
  );
}

function Rating({ value, note, tone }: { value: number; note: string; tone: string }) {
  return (
    <div className="surface-inset px-2 py-4 text-center">
      <div className={`font-mono text-2xl font-bold leading-none ${tone}`}>{value.toFixed(1)}</div>
      <Stars value={value} tone={tone} />
      <p className="mt-2 text-[10px] text-muted">{note}</p>
    </div>
  );
}

function Frame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-lg">
      <img
        src={src}
        alt={alt}
        width={400}
        height={300}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function panels(item: Item): [ReactNode, ReactNode] {
  if (item.kind === 'rating') {
    return [
      <Rating value={item.before.rating} note={item.before.note} tone="text-loss" />,
      <Rating value={item.after.rating} note={item.after.note} tone="text-primary-500" />,
    ];
  }
  const shots = media.results[item.slot];
  return [
    <Frame src={shots.before} alt={`${item.title} before working with ${brand.name}`} />,
    <Frame src={shots.after} alt={`${item.title} after working with ${brand.name} — ${item.gain}`} />,
  ];
}

const Results = () => (
  <MotionConfig reducedMotion="user">
    <section id="results" aria-labelledby="results-heading" className="section-band py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2
          id="results-heading"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          {results.heading} <span className="text-primary-500">{results.headingAccent}</span>
        </motion.h2>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:gap-6 lg:mt-16 xl:grid-cols-4"
        >
          {results.items.map((item) => {
            const [before, after] = panels(item);
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="surface-card flex flex-col rounded-2xl p-5"
              >
                <h3 className="text-center font-display text-sm font-semibold text-ink">
                  {item.title}
                </h3>

                {/* Pair stays side by side down to 360px; the badge overlaps
                    the gap rather than reserving a third column for itself. */}
                <div className="relative mt-4 grid grid-cols-2 items-start gap-4">
                  <div className="min-w-0 text-center">
                    <p className={captionClass}>Before</p>
                    <div className="mt-1.5">{before}</div>
                  </div>
                  <div className="min-w-0 text-center">
                    <p className={captionClass}>After</p>
                    <div className="mt-1.5">{after}</div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 z-10 flex h-7 w-7 -translate-x-1/2
                               -translate-y-1/2 items-center justify-center rounded-full
                               bg-primary-500 ring-4 ring-[color:rgb(var(--surface-muted))]"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </span>
                </div>

                <div className="hairline-t mt-auto pt-4 text-center">
                  <p className="text-sm font-semibold text-primary-500">{item.gain}</p>
                  <p className="mt-1 text-xs text-muted">{item.why}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  </MotionConfig>
);

export default Results;
