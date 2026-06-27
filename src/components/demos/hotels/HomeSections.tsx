import { motion } from 'framer-motion';
import { Coffee, Flame, Mountain, Star, Quote } from 'lucide-react';
import { rooms, testimonials } from './data';
import RoomCard from './RoomCard';

const highlights = [
  { icon: Coffee, title: 'Farm breakfast, always included', text: 'Local eggs, warm pastries, and our maple granola served by the great-room window.' },
  { icon: Flame, title: 'A fire in every room', text: 'Wood stoves, hearths, and barrel saunas to thaw out after a day on the ridge.' },
  { icon: Mountain, title: 'Trails out the front door', text: 'Step from your bed onto six waymarked routes — plus loaner e-bikes and canoes.' },
];

export function Highlights() {
  return (
    <section className="bg-[#fbf7ef] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="Why guests return" title="Small inn, generous heart" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.div key={h.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-stone-200 p-7 shadow-sm">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 mb-4">
                <h.icon className="w-6 h-6" />
              </span>
              <h3 className="font-serif text-xl text-stone-800">{h.title}</h3>
              <p className="mt-2 text-stone-500 text-sm leading-relaxed">{h.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedRooms() {
  const featured = rooms.filter((r) => r.popular).slice(0, 3);
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHead eyebrow="Where you'll rest" title="Guest favourites" align="left" />
          <a href="/demo/hotels/rooms" className="text-emerald-700 hover:text-emerald-900 font-medium text-sm">
            View all rooms →
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((r, i) => (
            <RoomCard key={r.id} room={r} index={i} ctaLabel="Book this room"
              onSelect={() => (window.location.href = '/demo/hotels/book')} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-[#1c2b24] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead eyebrow="From the guest book" title="Quiet praise" dark />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-emerald-950/50 border border-emerald-800/50 p-7">
              <Quote className="w-8 h-8 text-amber-400/70" />
              <p className="mt-3 text-emerald-50/90 leading-relaxed">{t.text}</p>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-amber-200 font-serif">{t.name}</p>
                  <p className="text-emerald-200/60 text-xs">{t.stay}</p>
                </div>
                <span className="flex">{[...Array(t.rating)].map((_, k) => <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow, title, align = 'center', dark = false,
}: { eyebrow: string; title: string; align?: 'center' | 'left'; dark?: boolean }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">{eyebrow}</span>
      <h2 className={`mt-2 font-serif text-3xl sm:text-4xl ${dark ? 'text-amber-50' : 'text-stone-800'}`}>{title}</h2>
    </div>
  );
}
