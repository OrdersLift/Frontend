import { motion, MotionConfig } from 'framer-motion';
import { media } from '../data/media';
import { results } from '../data/site';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

// Each graphic is ONE landscape file that already contains the before and
// after states with their own labels burnt in — so the card frames a single
// image and adds no captions, no arrow, no second panel. Two columns on lg,
// because at four-up these wide screenshots stop being readable.

const Results = () => (
  <MotionConfig reducedMotion="user">
    <section id="results" aria-labelledby="results-heading" className="section-band pt-12 pb-12 lg:pt-14 lg:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <h2
            id="results-heading"
            className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            {results.heading} <span className="text-primary-500">{results.headingAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body">{results.sub}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2"
        >
          {results.items.map((item, i) => {
            const shot = media.results[i];
            if (!shot) return null;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="surface-card flex flex-col p-4 lg:p-5"
              >
                {/* White fill: the artwork is white-background, so the frame
                    matches it in both themes rather than inverting it. */}
                <div className="overflow-hidden rounded-lg bg-white">
                  <img
                    src={shot.src}
                    alt={item.alt}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </div>

                <h3 className="mt-4 font-display text-sm font-semibold text-ink">{item.title}</h3>

                <div className="mt-1 flex flex-col gap-x-3 gap-y-1 sm:flex-row sm:items-baseline">
                  <p className="text-sm font-semibold text-primary-500">{item.gain}</p>
                  <p className="text-xs text-muted">{item.why}</p>
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
