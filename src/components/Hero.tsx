import { motion, MotionConfig } from 'framer-motion';
import { CalendarDays, Play, Star, TrendingUp } from 'lucide-react';
import { cta, hero } from '../data/site';
import { media } from '../data/media';
import { duration, fadeUp, staggerContainer, tr } from '../lib/motion';

/* Where each stat card sits around the ad creative — index-matched to
   `hero.stats`. Only applied from `lg` up; below that the cards are a plain
   2-column grid under the image, so nothing overlaps or overflows.
   The creative is portrait and capped at 340px inside a much wider column,
   so each card lives in the gutter beside it and only clips the frame's
   edge — the ad's own copy and food photography stay readable.
   Negative offsets stay under the container's own `sm:px-8`, so a card
   hanging off the edge can never push the page sideways. */
const cardAt = [
  'lg:absolute lg:top-4 lg:left-0',
  'lg:absolute lg:top-16 lg:-right-2',
  'lg:absolute lg:bottom-16 lg:left-0',
  'lg:absolute lg:bottom-2 lg:-right-2',
];

const Stars = ({ size = 'h-3.5 w-3.5' }: { size?: string }) => (
  <span className="flex items-center gap-0.5" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className={`${size} fill-gold text-gold`} />
    ))}
  </span>
);

const Hero = () => (
  <MotionConfig reducedMotion="user">
    <section id="home" className="relative bg-paper scroll-mt-28">
      <div
        className="mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24
                   lg:min-h-[88vh] flex items-center"
      >
        <div className="grid w-full gap-12 lg:grid-cols-[46%_1fr] lg:gap-10 lg:items-center">
          {/* ── Left: copy. Above the fold, so initial/animate — never
                 whileInView, which would never fire for content already
                 on screen at load. ───────────────────────────────────── */}
          <motion.div variants={staggerContainer(0.08, 0.05)} initial="hidden" animate="show">
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem]
                         leading-[1.08] tracking-tight"
            >
              <span className="block text-ink">{hero.headline}</span>
              <span className="block text-primary-500">{hero.headlineAccent}</span>
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
            {/* Portrait artwork on a white background, so the frame is white in
                BOTH themes and the image is never inverted, tinted or
                filtered. Capped well under the column width so it doesn't
                tower over the copy; the column keeps its full width for the
                floating cards. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={tr(duration.slower, 0.12)}
              className="relative mx-auto w-full max-w-[300px] lg:max-w-[340px]
                         rounded-2xl bg-white ring-1 ring-inset ring-rule"
            >
              <img
                src={media.hero.src}
                alt={hero.imageAlt}
                width={media.hero.width}
                height={media.hero.height}
                loading="eager"
                fetchPriority="high"
                className="block h-auto w-full rounded-2xl"
              />

              {/* Says plainly that this is an ad we ship, not decoration.
                  Hangs below the frame rather than over it: the artwork is
                  white in both themes, and `.surface-card` is only legible on
                  the page background. */}
              <span
                className="surface-card !rounded-full absolute -bottom-3 left-1/2
                           -translate-x-1/2 translate-y-full whitespace-nowrap px-3 py-1
                           text-[10px] uppercase tracking-wider text-muted"
              >
                Live ad creative
              </span>
            </motion.div>

            {/* Orchestrator only. At lg it becomes a transparent overlay on the
                column and each card takes its own absolute offset; below lg it
                is a normal 2-col grid, so the cards never cover the image. */}
            <motion.div
              variants={staggerContainer(0.1, 0.45)}
              initial="hidden"
              animate="show"
              className="mt-12 grid grid-cols-2 gap-3 lg:mt-0 lg:block lg:absolute lg:inset-0
                         lg:pointer-events-none"
            >
              {hero.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className={`surface-card backdrop-blur-sm !rounded-xl px-4 py-3 min-w-[150px] ${cardAt[i]}`}
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
