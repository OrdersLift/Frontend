import { motion, MotionConfig } from 'framer-motion';
import { CalendarDays, CheckCircle2 } from 'lucide-react';
import { cta, ctaBanner } from '../data/site';
import { fadeUp, pressHover, pressTap, viewportOnce } from '../lib/motion';

const CTABanner = () => (
  <MotionConfig reducedMotion="user">
    <section id="contact-cta" className="py-20 scroll-mt-28 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* .surface-card already sets radius (--radius-card = 1rem = rounded-2xl)
            and owns background/border/shadow — padding and layout are ours. */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="surface-card p-8 lg:p-12"
        >
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-500/10"
              >
                <CalendarDays className="h-7 w-7 text-primary-500" />
              </span>

              <div>
                <h2 className="font-display text-2xl font-bold text-ink lg:text-3xl">
                  {ctaBanner.heading}
                </h2>
                <p className="mt-2 text-body">{ctaBanner.sub}</p>
              </div>
            </div>

            <motion.a
              href={cta.banner.href}
              whileHover={pressHover}
              whileTap={pressTap}
              className="btn-primary focus-ring shrink-0 justify-center"
            >
              <CalendarDays className="mr-2 h-5 w-5" aria-hidden="true" />
              {cta.banner.label}
            </motion.a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-6 lg:justify-start">
            {ctaBanner.badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-xs text-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-500" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  </MotionConfig>
);

export default CTABanner;
