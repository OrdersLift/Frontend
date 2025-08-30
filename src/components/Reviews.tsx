import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

type Review = {
  name: string;
  rating: number;
  avatar: string;
};

const reviews: Review[] = [
  { name: "Isabella Davis", rating: 4.8,  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
  { name: "Liam Johnson",    rating: 4.7,  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { name: "Ava Martinez",    rating: 5.0,  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { name: "Noah Thompson",   rating: 4.85, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { name: "Sophia Wilson",   rating: 4.9,  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" },
  { name: "Daniel Williams", rating: 4.85, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { name: "Olivia Brown",    rating: 4.95, avatar: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?w=150&h=150&fit=crop&crop=face" },
  { name: "Jacob Bennett",   rating: 4.9,  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
  { name: "Emily Carter",    rating: 4.8,  avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" },
  { name: "Michael Garcia",  rating: 4.75, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
];

const firstRow = reviews.slice(0, 5);
const secondRow = reviews.slice(5, 10);

function ReviewPill({ r }: { r: Review }) {
  return (
    <div className="animate-float flex-shrink-0 min-w-[280px] rounded-full px-6 py-3
                    flex items-center gap-3 shadow-lg
                    bg-primary-600/90 backdrop-blur
                    ring-1 ring-white/10 hover:ring-white/20 transition
                    will-change-transform">
      <img
        src={r.avatar}
        alt={`${r.name} avatar`}
        loading="lazy"
        decoding="async"
        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-300"
      />
      <div className="flex-1">
        <div className="text-white font-semibold text-sm">{r.name}</div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-400" stroke="none" fill="currentColor" />
          <span className="text-white/90 text-sm">{r.rating} Ratings</span>
          <span className="sr-only">{r.rating} out of 5</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = 'rl',  // 'rl' = right->left, 'lr' = left->right
  speed = '28s',
  tilt = 0,          // slight rotate to sell the circular motion
}: {
  items: Review[];
  direction?: 'rl' | 'lr';
  speed?: string;
  tilt?: number;
}) {
  // two copies of the list for a seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      style={{ '--speed': speed } as React.CSSProperties}
      className="relative marquee-paused mask-edges overflow-hidden"
    >
      <div
        className={[
          'marquee-track flex gap-6 w-[200%] px-8 py-2 will-change-transform',
          direction === 'rl' ? 'animate-marquee-rl' : 'animate-marquee-lr',
          tilt !== 0 ? `rotate-[${tilt}deg]` : ''
        ].join(' ')}
      >
        {doubled.map((r, i) => (
          <ReviewPill key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

const Reviews = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative overflow-hidden py-20 bg-gradient-to-br from-secondary-50 via-white to-secondary-50"
    >
      {/* soft background blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="pointer-events-none absolute -top-16 -left-10 h-72 w-72 rounded-full bg-primary-200/70 blur-3xl mix-blend-multiply"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-secondary-200/70 blur-3xl mix-blend-multiply"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="pointer-events-none absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-primary-300/70 blur-3xl mix-blend-multiply"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 font-display text-4xl font-bold text-gray-900 lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Trusted by hundreds of restaurants worldwide. Here’s a snapshot of their experience.
          </p>
        </motion.div>

        {/* rows */}
        <div className="mx-auto max-w-6xl space-y-10">
          {/* Top row: left -> right, slight tilt */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <MarqueeRow items={firstRow} direction="lr" speed="28s" tilt={-1.5} />
          </motion.div>

          {/* Bottom row: right -> left, opposite tilt */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <MarqueeRow items={secondRow} direction="rl" speed="28s" tilt={1.5} />
          </motion.div>
        </div>

        {/* quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Happy Restaurants</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary-600">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-primary-600">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
