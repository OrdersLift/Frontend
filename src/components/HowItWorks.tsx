import { motion, MotionConfig } from 'framer-motion';
import { MessageCircle, SearchCheck, Lightbulb, Rocket, TrendingUp } from 'lucide-react';
import { howItWorks } from '../data/site';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

/** `howItWorks.steps[].icon` is one of these lucide export names. */
const icons = { MessageCircle, SearchCheck, Lightbulb, Rocket, TrendingUp };

/* The badge sits ON the rail, so it needs a ring painted in the colour of the
   card it is sitting on — otherwise the dashed line runs through it. That
   colour already exists: global.css resolves `--focus-offset` per theme to the
   *composited* fill of `.surface-card` (white in light, #0a0a0a in dark), which
   is exactly what a translucent `bg-white/4` cannot give us. */
const badgeRing = 'ring-4 ring-[color:rgb(var(--focus-offset))]';

const HowItWorks = () => (
  <MotionConfig reducedMotion="user">
    <section id="how-it-works" className="scroll-mt-28 bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink text-center tracking-tight"
        >
          {howItWorks.heading}
        </motion.h2>

        <div className="surface-card rounded-2xl p-8 lg:p-12 mt-12 lg:mt-16">
          <motion.ol
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative grid gap-8 lg:grid-cols-5 lg:gap-6"
          >
            {/* Desktop rail. 10% / 10% lands 0.4 × gap (≈10px) inside the first
                and last badge centres at every width, so the line always dies
                under a badge instead of running out to the card edge. */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute left-[10%] right-[10%] top-[13.5px]
                         border-t border-dashed border-rule"
            />

            {howItWorks.steps.map((step, i) => {
              const Icon = icons[step.icon];
              return (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  className="relative flex gap-4 text-left lg:block lg:text-center"
                >
                  {/* Mobile rail, drawn per step so it never overshoots the
                      last badge. -bottom-8 bridges the grid's gap-8. */}
                  {i < howItWorks.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="lg:hidden absolute left-[13.5px] top-7 -bottom-8
                                 border-l border-dashed border-rule"
                    />
                  )}

                  <span
                    className={`relative flex h-7 w-7 flex-shrink-0 items-center justify-center
                                rounded-full bg-primary-500 font-mono font-bold text-xs text-white
                                lg:mx-auto ${badgeRing}`}
                  >
                    {i + 1}
                  </span>

                  <div className="flex-1 lg:flex-none">
                    <div
                      className="w-14 h-14 rounded-full border border-primary-500/30 bg-primary-500/10
                                 flex items-center justify-center lg:mx-auto lg:mt-5"
                    >
                      <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-sm lg:text-base text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs lg:text-sm text-body leading-relaxed max-w-[22ch] lg:mx-auto">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  </MotionConfig>
);

export default HowItWorks;
