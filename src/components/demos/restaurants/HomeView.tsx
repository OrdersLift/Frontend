import { motion } from 'framer-motion';
import { Flame, Star, UtensilsCrossed, Clock, MapPin, ArrowRight, Quote } from 'lucide-react';
import { menu, signatureIds, testimonials, story, brand } from './data';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08 } }),
};

export default function HomeView() {
  const signatures = signatureIds.map((id) => menu.find((d) => d.id === id)!).filter(Boolean);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 bg-[#140d07]">
        {/* warm glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-24 w-[34rem] h-[34rem] rounded-full bg-amber-600/20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-[28rem] h-[28rem] rounded-full bg-rose-700/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200 mb-6">
              <Flame className="w-3.5 h-3.5" /> Wood-fire kitchen · {brand.city}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-50 leading-[1.05]">
              Fire-kissed fusion,
              <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                plated with soul.
              </span>
            </h1>
            <p className="mt-6 text-lg text-amber-100/70 max-w-md">
              {brand.cuisine}. Live coals, Goan spice, Portuguese seafood — two coastlines on one plate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/demo/restaurants/reservations" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 hover:brightness-110 transition">
                Book a Table <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/demo/restaurants/menu" className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 px-6 py-3 font-semibold text-amber-100 hover:bg-amber-400/10 transition">
                View Menu
              </a>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-amber-100/60">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
              4.9 · 1,200+ reviews · Booked solid every weekend
            </div>
          </motion.div>

          {/* Plate motif */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative mx-auto"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-amber-500/30 to-rose-700/30 grid place-items-center border border-amber-400/30">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#1a120b] grid place-items-center shadow-inner">
                <span className="text-8xl sm:text-9xl">🔥</span>
              </div>
              {['🐙', '🍗', '🍆', '🌹'].map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute text-4xl sm:text-5xl drop-shadow-lg"
                  style={{
                    top: `${50 - 46 * Math.cos((i / 4) * 2 * Math.PI)}%`,
                    left: `${50 + 46 * Math.sin((i / 4) * 2 * Math.PI)}%`,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK INFO STRIP */}
      <section className="bg-[#1a120b] border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid sm:grid-cols-3 gap-6">
          {[
            { icon: Clock, t: 'Open Tue–Sun', s: 'Late kitchen Fri & Sat' },
            { icon: MapPin, t: 'Alfama, Lisbon', s: 'Steps from Santa Apolónia' },
            { icon: UtensilsCrossed, t: 'Dine-in & Collection', s: 'Order online in minutes' },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400">
                <it.icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-amber-50">{it.t}</p>
                <p className="text-sm text-amber-100/60">{it.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="bg-[#140d07] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-amber-400 font-medium tracking-wider uppercase text-sm">Straight from the coals</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50 mt-2">Signature Dishes</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatures.map((d, i) => (
              <motion.div
                key={d.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl bg-[#1a120b] border border-amber-500/20 overflow-hidden hover:border-amber-400/50 transition"
              >
                <div className="h-40 grid place-items-center bg-gradient-to-br from-amber-600/20 to-rose-700/20 text-6xl group-hover:scale-105 transition-transform">
                  {d.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg font-semibold text-amber-50">{d.name}</h3>
                    <span className="font-semibold text-amber-300 whitespace-nowrap">€{d.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-amber-100/60 mt-2">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/demo/restaurants/menu" className="inline-flex items-center gap-2 font-semibold text-amber-300 hover:text-amber-200">
              See the full menu <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#1a120b] py-20 border-y border-amber-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-600/30 via-orange-700/20 to-rose-800/30 grid place-items-center text-8xl">
              👩‍🍳
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} variants={fadeUp}>
            <p className="text-amber-400 font-medium tracking-wider uppercase text-sm">Our story · since {story.founded}</p>
            <h2 className="font-serif text-3xl font-bold text-amber-50 mt-2">{story.chef}'s table</h2>
            <p className="mt-5 text-amber-100/70 leading-relaxed">{story.text}</p>
            <a href="/demo/restaurants/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-amber-300 hover:text-amber-200">
              More about us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#140d07] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50 text-center mb-12">Loved in Lisbon</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl bg-[#1a120b] border border-amber-500/20 p-6"
              >
                <Quote className="w-8 h-8 text-amber-500/40" />
                <p className="mt-3 text-amber-100/80 leading-relaxed">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(t.rating)].map((_, k) => <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="mt-3 font-semibold text-amber-50">{t.name}</p>
                <p className="text-sm text-amber-100/50">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-amber-600 to-rose-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Hungry yet?</h2>
          <p className="mt-3 text-amber-50/90 text-lg">Reserve your table or build an order for collection tonight.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="/demo/restaurants/reservations" className="rounded-full bg-white px-7 py-3 font-semibold text-rose-700 hover:bg-amber-50 transition">Book a Table</a>
            <a href="/demo/restaurants/order" className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white hover:bg-white/10 transition">Order Online</a>
          </div>
        </div>
      </section>
    </div>
  );
}
