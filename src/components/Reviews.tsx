import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

type Review = { name: string; rating: number; business: string };

const avatarColors = [
  'bg-primary-600',
  'bg-glow-600',
  'bg-accent-600',
  'bg-orange-600',
  'bg-pink-600',
  'bg-green-600',
  'bg-indigo-600',
  'bg-teal-600',
  'bg-rose-600',
  'bg-violet-600',
];

const reviews: Review[] = [
  { name: 'Rahul Kumar',       rating: 4.5, business: 'Restaurant Owner' },
  { name: 'Liam Johnson',      rating: 4.0, business: 'Gym Owner' },
  { name: 'Akash',             rating: 5.0, business: 'Dental Clinic' },
  { name: 'Rohit Kumar',       rating: 4.5, business: 'Auto Garage' },
  { name: 'Sophia Wilson',     rating: 4.5, business: 'Salon Owner' },
  { name: 'Daniel Williams',   rating: 5.0, business: 'Hotel Manager' },
  { name: 'David',             rating: 5.0, business: 'Retail Shop' },
  { name: 'Jacob Bennett',     rating: 4.5, business: 'Law Firm' },
  { name: 'Soumya Ranjan',     rating: 4.5, business: 'Restaurant Owner' },
  { name: 'Priyanshu Kumar',   rating: 4.0, business: 'Physio Clinic' },
];

const firstRow  = reviews.slice(0, 5);
const secondRow = reviews.slice(5, 10);

function ReviewPill({ r, colorClass }: { r: Review; colorClass: string }) {
  return (
    <div className="animate-float flex-shrink-0 min-w-[260px] rounded-2xl px-5 py-4
                    flex items-center gap-3 glass border border-white/08
                    hover:border-primary-500/30 transition-all duration-300 will-change-transform">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                       flex-shrink-0 ${colorClass} ring-2 ring-white/10`}>
        <span className="text-white font-bold text-base leading-none">
          {r.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-sm truncate">{r.name}</div>
        <div className="text-slate-500 text-xs mb-1 truncate">{r.business}</div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(r.rating) ? 'text-amber-400' : 'text-slate-600'}`}
              fill="currentColor"
              stroke="none"
            />
          ))}
          <span className="text-slate-400 text-xs ml-1">{r.rating}</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items, direction = 'rl', speed = '30s', tilt = 0, startIndex = 0,
}: { items: Review[]; direction?: 'rl' | 'lr'; speed?: string; tilt?: number; startIndex?: number }) {
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
          tilt !== 0 ? `rotate-[${tilt}deg]` : '',
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
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="reviews" ref={ref} className="relative py-24 bg-dark-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/08 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-glow-600/08 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass
                           border border-glow-500/30 text-glow-300 text-sm font-medium mb-6">
            Client Reviews
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            Trusted by{' '}
            <span className="gradient-text">Businesses Worldwide</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Businesses around the world trust us to build their AI platform.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="mx-auto max-w-6xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <MarqueeRow items={firstRow} direction="lr" speed="30s" tilt={-1} startIndex={0} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <MarqueeRow items={secondRow} direction="rl" speed="30s" tilt={1} startIndex={5} />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '100+', label: 'Businesses Served' },
            { value: '4.6/5', label: 'Average Rating' },
            { value: '92%',   label: 'Client Satisfaction' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text-blue mb-1">{s.value}</div>
              <div className="text-slate-500 text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
