import { motion, MotionConfig } from 'framer-motion';
import { trustedBy } from '../data/site';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

/* Wordmark treatments. Set as type, not logos: five real restaurants
   lettered five slightly different ways so the row reads as a collected
   set rather than a list. Monochrome only — no colour, no boxes, and no
   size changes, so the band stays a hairline of texture under the hero.
   Cycled by index, so the set survives site.ts gaining a sixth name. */
const wordmarks = [
  'font-semibold tracking-tight',
  'italic font-medium',
  'font-bold uppercase tracking-[0.1em]',
  'italic font-semibold tracking-tight',
  'font-medium tracking-[0.16em]',
];

const TrustedBy = () => (
  <MotionConfig reducedMotion="user">
    {/* .section-band owns its own top/bottom hairline (--hairline) and is
        declared after @tailwind utilities, so a border-* utility here would
        be dead CSS. */}
    <section className="section-band py-10 lg:py-12">
      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mx-auto max-w-7xl px-5 sm:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="text-center text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          {trustedBy.eyebrow}
        </motion.p>

        <div className="mt-6 flex flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {trustedBy.logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              variants={fadeUp}
              /* 50% minus half the 2.5rem column gap = exactly two per row
                 on mobile; auto-width from sm up so the five sit in one line. */
              className="w-[calc(50%-1.25rem)] text-center sm:w-auto"
            >
              <div className={`font-display text-lg text-ink/70 lg:text-xl ${wordmarks[i % wordmarks.length]}`}>
                {logo.name}
              </div>
              {logo.sub && (
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                  {logo.sub}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  </MotionConfig>
);

export default TrustedBy;
