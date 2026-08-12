import { motion, AnimatePresence, MotionConfig, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { duration, fadeUp, pressHover, pressTap, staggerContainer, tr } from '../lib/motion';

const venues = [
  'Restaurants',
  'Cafés',
  'Takeaways',
  'Fine Dining',
  'Pizzerias',
  'Bars & Pubs',
  'Cloud Kitchens',
  'Food Trucks',
];

const stats = [
  { number: '100+',  label: 'Restaurants Powered' },
  { number: '3',     label: 'Countries Served' },
  { number: '2 Yrs', label: 'Free Maintenance' },
  { number: '24/7',  label: 'Online Bookings' },
];

/* The headline and the venue rotator share one fluid ramp. Fixed steps
   clip "Cloud Kitchens" and "Restaurant" once the raised panel takes its
   own px-6 out of a 320px viewport, so the small end is fluid and the
   sm/lg steps stay exactly where they were. */
const headlineSize = 'text-[clamp(1.875rem,8.5vw,3rem)] sm:text-6xl lg:text-7xl';

/* `fadeUp`, held back so the strip lands just after the panel's CTA row
   (~0.85s). The delay has to live inside the variant: framer resolves a
   variant's own `transition` ahead of the component's `transition` prop,
   so `transition={tr(duration.slow, 0.35)}` alone would be dropped. */
const statStrip: Variants = {
  hidden: fadeUp.hidden,
  show: { opacity: 1, y: 0, transition: tr(duration.slow, 0.35) },
};

const Hero = () => {
  const [venueIndex, setVenueIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setVenueIndex((i) => (i + 1) % venues.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden
                   bg-white dark:bg-black scroll-mt-28"
      >
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Animated glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/30 dark:bg-primary-600/25
                     rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent-300/40 dark:bg-glow-600/25
                     rounded-full blur-3xl pointer-events-none"
        />
        {/* Third orb is desktop-only — three blur-3xl layers is real compositing
            cost on a phone for decoration nobody is looking at. */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="hidden sm:block absolute top-1/2 right-1/3 w-64 h-64 bg-glow-300/35
                     dark:bg-accent-500/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32">
          {/* Copy panel — the one elevation-2 surface above the fold. Above the
              fold means initial/animate, never whileInView. */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="surface-card-raised mx-auto max-w-4xl
                       px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 text-center"
          >
            {/* Orchestrator only — it has no visual effect of its own. */}
            <motion.div variants={staggerContainer(0.06, 0.04)}>
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30
                           text-primary-700 dark:text-primary-300 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                Websites, Bookings &amp; QR Menus for Restaurants
                <Globe className="w-4 h-4 ml-1 flex-shrink-0" />
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className={`${headlineSize} font-display font-bold text-neutral-900
                            dark:text-white leading-tight mb-4`}
              >
                Get Your Restaurant
                <span className="block text-neutral-500 dark:text-slate-400
                                 text-[clamp(1.5rem,6.8vw,2.25rem)] sm:text-5xl lg:text-6xl mt-2 font-semibold">
                  Online &amp; Automated —
                </span>
              </motion.h1>

              {/* Cycling industry text — the reserved height stops the rotator
                  from shifting everything below it on every swap. */}
              <motion.div
                variants={fadeUp}
                className="h-20 sm:h-24 flex items-center justify-center mb-6 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={venueIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={tr(duration.base)}
                    className={`${headlineSize} font-display font-bold leading-none gradient-text`}
                  >
                    {venues[venueIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl text-neutral-600 dark:text-slate-400
                           mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                We build or rebuild your restaurant website, add a table booking system and a QR menu you
                can update in seconds — then host and maintain it all for 2 years free. You run the kitchen;
                we run the tech.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="/#contact"
                  whileHover={pressHover}
                  whileTap={pressTap}
                  className="btn-primary text-base px-8 py-4 glow-primary w-full sm:w-auto justify-center"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 flex-shrink-0" />
                </motion.a>
                <motion.a
                  href="/#products"
                  whileHover={pressHover}
                  whileTap={pressTap}
                  className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center"
                >
                  See What We Build
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stat strip — four cells of one surface, not four chips. Nothing
              here is clickable, so no cardHover and no card-hover class.
              The divide utilities carry `!` because `.stat-tile !border-0`
              would otherwise win the cascade and erase the internal rules. */}
          <motion.div
            variants={statStrip}
            initial="hidden"
            animate="show"
            className="surface-card mx-auto max-w-4xl mt-6 grid grid-cols-2 md:grid-cols-4
                       !divide-y !divide-x md:!divide-y-0
                       divide-[rgb(124_45_18_/_0.10)] dark:divide-white/[0.08]"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="stat-tile !border-0 !bg-transparent">
                <div className="text-2xl md:text-3xl font-bold gradient-text-blue mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-neutral-500 dark:text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only; on a phone the fold is obvious. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-9 border-2 border-primary-500/40 dark:border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2.5 bg-primary-500 dark:bg-primary-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default Hero;
