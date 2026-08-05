import { motion, MotionConfig } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeUp, slideInLeft, slideInRight, viewportOnce } from '../lib/motion';

type Review = { name: string; rating: number; business: string };

const avatarColors = [
  'bg-primary-600',
  'bg-glow-600',
  'bg-accent-700',
  'bg-primary-700',
  'bg-glow-700',
  'bg-accent-600',
  'bg-primary-500',
  'bg-glow-500',
  'bg-accent-800',
  'bg-primary-800',
];

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

function ReviewPill({ r, colorClass }: { r: Review; colorClass: string }) {
  return (
    <div className="surface-card surface-interactive flex-shrink-0 min-w-[260px] rounded-2xl
                    px-5 py-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                       flex-shrink-0 ${colorClass} ring-2 ring-primary-200 dark:ring-white/10`}>
        <span className="text-white font-bold text-base leading-none">
          {r.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-neutral-900 dark:text-white font-semibold text-sm truncate">{r.name}</div>
        <div className="text-neutral-500 dark:text-slate-500 text-xs mb-1 truncate">{r.business}</div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(r.rating)
                  ? 'text-glow-500 dark:text-accent-400'
                  : 'text-neutral-300 dark:text-slate-700'
              }`}
              fill="currentColor"
              stroke="none"
            />
          ))}
          <span className="text-neutral-600 dark:text-slate-400 text-xs ml-1">{r.rating}</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items, direction = 'rl', speed = '30s', startIndex = 0,
}: { items: Review[]; direction?: 'rl' | 'lr'; speed?: string; startIndex?: number }) {
  const doubled = [...items, ...items];
  return (
    <div
      style={{ '--speed': speed } as React.CSSProperties}
      className="relative marquee-paused mask-edges overflow-hidden"
    >
      <div
        className={[
          'marquee-track flex gap-5 w-[200%] px-6 py-2 will-change-transform',
          direction === 'rl' ? 'animate-marquee-rl' : 'animate-marquee-lr',
        ].join(' ')}
      >
        {doubled.map((r, i) => (
          <ReviewPill
            key={`${r.name}-${i}`}
            r={r}
            colorClass={avatarColors[(startIndex + (i % items.length)) % avatarColors.length]}
          />
        ))}
      </div>
    </div>
  );
}

const Reviews = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section id="reviews" className="scroll-mt-24 relative py-16 sm:py-20 lg:py-24 bg-white dark:bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-300/25 dark:bg-primary-600/10
                        rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-300/25 dark:bg-glow-600/10
                        rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-16 text-center"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full glass
                             border border-glow-500/30 text-glow-700 dark:text-glow-300
                             text-sm font-medium mb-6">
              Client Reviews
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
              Trusted by{' '}
              <span className="gradient-text">Restaurants Worldwide</span>
            </h2>
            <p className="text-neutral-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Kitchens around the world trust us with their website, bookings and menu.
            </p>
          </motion.div>

          {/* Marquee rows — one contained testimonial board, not two bleeding tracks */}
          <div className="surface-card mx-auto max-w-6xl p-4 sm:p-6 space-y-5 overflow-hidden">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <MarqueeRow items={firstRow} direction="lr" speed="30s" startIndex={0} />
            </motion.div>
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <MarqueeRow items={secondRow} direction="rl" speed="30s" startIndex={5} />
            </motion.div>
          </div>

          {/* Stats — same strip construction as the hero, on purpose */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="surface-card mx-auto max-w-3xl mt-14 grid grid-cols-1 sm:grid-cols-3
                       !divide-y sm:!divide-y-0 sm:!divide-x
                       divide-[rgb(124_45_18_/_0.10)] dark:divide-white/[0.08]"
          >
            {[
              { value: '100+', label: 'Restaurants Served' },
              { value: '4.6/5', label: 'Average Rating' },
              { value: '92%',   label: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="stat-tile !border-0 !bg-transparent">
                <div className="text-3xl font-bold gradient-text-blue mb-1">{s.value}</div>
                <div className="text-neutral-500 dark:text-slate-500 text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Reviews;
