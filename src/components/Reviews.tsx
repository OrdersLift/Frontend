import { motion, MotionConfig } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion';

type Review = { name: string; rating: number; business: string };

const reviews: Review[] = [
  { name: 'Rahul Kumar',       rating: 4.5, business: 'Indian Restaurant' },
  { name: 'Liam Johnson',      rating: 4.0, business: 'Gastropub' },
  { name: 'Akash',             rating: 5.0, business: 'Takeaway Owner' },
  { name: 'Rohit Kumar',       rating: 4.5, business: 'Pizzeria Owner' },
  { name: 'Sophia Wilson',     rating: 4.5, business: 'Café Owner' },
  { name: 'Daniel Williams',   rating: 5.0, business: 'Bistro Manager' },
  { name: 'David',             rating: 5.0, business: 'Food Truck' },
  { name: 'Jacob Bennett',     rating: 4.5, business: 'Fine Dining' },
  { name: 'Soumya Ranjan',     rating: 4.5, business: 'Cloud Kitchen' },
  { name: 'Priyanshu Kumar',   rating: 4.0, business: 'Bakery Owner' },
];

const firstRow  = reviews.slice(0, 5);
const secondRow = reviews.slice(5, 10);

const stats = [
  { value: '100+',  label: 'Restaurants Served' },
  { value: '4.6/5', label: 'Average Rating' },
  { value: '92%',   label: 'Client Satisfaction' },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="surface-card surface-interactive flex w-[272px] flex-shrink-0 flex-col
                        rounded-2xl p-6">
      <div
        className="flex items-center gap-2"
        role="img"
        aria-label={`Rated ${r.rating} out of 5`}
      >
        <span className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(r.rating) ? 'text-gold' : 'text-rule'}`}
              fill="currentColor"
              stroke="none"
            />
          ))}
        </span>
        <span className="font-mono text-xs text-muted">{r.rating.toFixed(1)}</span>
      </div>

      <div className="mt-auto flex items-center gap-3 pt-5 hairline-t">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
                         bg-primary-500/15 text-sm font-semibold text-primary-500">
          {r.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">{r.name}</div>
          <div className="truncate text-xs text-muted">{r.business}</div>
        </div>
      </div>
    </article>
  );
}

/* Track is `w-max` and each copy carries its own trailing gutter (`pr-5`), so
   translateX(-50%) lands exactly one copy along — no half-gap seam drift.
   Hover pause and reduced-motion come from `.marquee-paused` / `.marquee-track`
   in global.css. */
function MarqueeRow({ items, direction }: { items: Review[]; direction: 'rl' | 'lr' }) {
  return (
    <div
      style={{ '--speed': '38s' } as React.CSSProperties}
      className="marquee-paused mask-edges overflow-hidden"
    >
      <div
        className={`marquee-track flex w-max will-change-transform ${
          direction === 'rl' ? 'animate-marquee-rl' : 'animate-marquee-lr'
        }`}
      >
        {[false, true].map((isClone) => (
          <div key={String(isClone)} className="flex gap-5 pr-5" aria-hidden={isClone || undefined}>
            {items.map((r) => (
              <ReviewCard key={r.name} r={r} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Reviews = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="reviews" className="scroll-mt-28 section-band py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight"
            >
              Trusted by <span className="text-primary-500">Restaurants Worldwide</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-body">
              Kitchens around the world trust us with their website, bookings and menu.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-12 lg:mt-16 space-y-5 lg:space-y-6"
          >
            <motion.div variants={fadeUp}>
              <MarqueeRow items={firstRow} direction="lr" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <MarqueeRow items={secondRow} direction="rl" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-12 lg:mt-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="stat-tile">
                <div className="font-mono text-3xl font-bold text-primary-500">{s.value}</div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Reviews;
