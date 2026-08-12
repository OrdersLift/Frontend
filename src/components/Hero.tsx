import { motion, MotionConfig } from 'framer-motion';
import { CalendarDays, Play, Star, TrendingUp } from 'lucide-react';
import { cta, hero } from '../data/site';
import { media } from '../data/media';
import { duration, fadeUp, staggerContainer, tr } from '../lib/motion';

const Stars = ({ size = 'h-3.5 w-3.5' }: { size?: string }) => (
  <span className="flex items-center gap-0.5" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className={`${size} fill-gold text-gold`} />
    ))}
  </span>
);

const Hero = () => (
  <MotionConfig reducedMotion="user">
    <section id="home" className="relative isolate overflow-hidden bg-paper scroll-mt-28">
      {/* Background banner: a dark, pre-blurred restaurant interior, already
          composed with an empty left third for the copy. Decorative, so it's a
          background layer rather than an <img>, and aria-hidden.
          Dark mode shows it at full strength. Light mode drops it to a faint
          texture — a near-black photograph behind dark text would be unreadable
          however the scrim is tuned. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-right opacity-[0.12] dark:opacity-100"
          style={{ backgroundImage: 'url(/images/hero-bg.webp)' }}
        />
        {/* Left stop stays solid: that is what holds the headline at full
            contrast. Right stop is nearly clear so the bulbs read behind the
            stat cards. */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-paper/5" />
        {/* Settle the band into the section below it. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div
        /* No min-height: at 88vh the band was 792px for 453px of content, and
           `items-center` split the surplus into 186px of dead space above and
           154px below. The band is now just padding plus content, so the top
           gap is only the clearance the fixed header needs. */
        className="mx-auto max-w-7xl px-5 sm:px-8 pt-24 pb-10 lg:pt-28 lg:pb-14
                   flex items-center"
      >
        <div className="grid w-full gap-12 lg:grid-cols-[46%_1fr] lg:gap-10 lg:items-center">
          {/* ── Left: copy. Above the fold, so initial/animate — never
                 whileInView, which would never fire for content already
                 on screen at load. ───────────────────────────────────── */}
          <motion.div variants={staggerContainer(0.08, 0.05)} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              /* Sized so the accent line sets on ONE line once the grid splits.
                 Measured in Fraunces 700 at -0.025em: the line needs 415px at
                 2.3rem and 521px at 2.9rem, against a column of 442px at lg and
                 559px at xl. It drops at lg because the column narrows to 46%
                 there — below lg the copy has the full width and can be bigger. */
              className="font-display font-bold text-4xl sm:text-5xl lg:text-[2.3rem] xl:text-[2.9rem]
                         leading-[1.08] tracking-tight"
            >
              <span className="block text-ink">{hero.headline}</span>
              <span className="block text-primary-500 lg:whitespace-nowrap">
                {hero.headlineAccent}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-md text-base lg:text-lg text-body">
              {hero.sub}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
              <a href={cta.hero.href} className="btn-primary focus-ring">
                <CalendarDays className="mr-2 h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
                {cta.hero.label}
              </a>
              <a href={cta.secondary.href} className="btn-outline focus-ring">
                <Play className="mr-2 h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
                {cta.secondary.label}
              </a>
            </motion.div>

            {/* Social proof: rating + claim. No headshots exist in the asset
                set and a stock face would be a lie, so the stars carry it.
                They're decoration for the sentence — out of the a11y tree. */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
              <Stars />
              <p className="text-xs text-muted">{hero.proof}</p>
            </motion.div>
          </motion.div>

          {/* ── Right: the live ad creative + floating dashboard cards ── */}
          <div className="relative">
            {/* Transparent cutout, so no frame — it sits straight on the
                background banner. lg and up only: its card figures are baked
                into the artwork and would render around 7px on a phone. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={tr(duration.slower, 0.12)}
              className="hidden lg:block relative mx-auto w-full max-w-[560px]"
            >
              <img
                src={media.hero.src}
                alt={hero.imageAlt}
                width={media.hero.width}
                height={media.hero.height}
                loading="eager"
                fetchPriority="high"
                className="block h-auto w-full"
              />
            </motion.div>

            {/* Below lg only — the cutout above carries these same figures as
                pixels, so showing both would print every number twice. This is
                the legible, selectable, screen-reader-visible version. */}
            <motion.div
              variants={staggerContainer(0.1, 0.45)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-3 lg:hidden"
            >
              {hero.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="surface-card backdrop-blur-sm !rounded-xl px-4 py-3"
                >
                  <p className="text-[11px] text-muted">{stat.label}</p>
                  <p className="font-mono font-bold text-xl text-ink">{stat.value}</p>
                  {'stars' in stat && stat.stars ? <Stars size="h-3 w-3" /> : null}
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-emerald-400">
                    <TrendingUp className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                    {stat.delta}
                  </p>
                  <p className="text-[10px] text-muted">{stat.note}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  </MotionConfig>
);

export default Hero;
