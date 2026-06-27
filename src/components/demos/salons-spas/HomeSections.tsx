import { motion } from 'framer-motion';
import { Sparkles, Star, ArrowRight, Leaf, Scissors, Heart } from 'lucide-react';
import { serviceCategories, testimonials, stylists } from './data';
import LoyaltyWidget from './LoyaltyWidget';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function HomeSections() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-rose-900/80 text-white pt-32 pb-28">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(60%_50%_at_70%_20%,rgba(251,191,36,0.35),transparent),radial-gradient(50%_50%_at_20%_80%,rgba(244,114,182,0.35),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-200 mb-5"
            >
              <Sparkles className="w-4 h-4" /> San Francisco · Est. 2014
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6"
            >
              Beauty, <span className="italic text-rose-200">unhurried.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-stone-200 max-w-md mb-9 leading-relaxed"
            >
              A luxury hair salon &amp; spa where every detail is considered — from the warm lighting to the way you feel walking out the door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a href="/demo/salons-spas/book" className="inline-flex items-center gap-2 rounded-full bg-white text-stone-900 font-medium px-7 py-3.5 hover:bg-rose-100 transition-colors">
                Book Appointment <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/demo/salons-spas/services" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 hover:bg-white/10 transition-colors">
                View Services
              </a>
            </motion.div>
            <div className="flex gap-8 mt-12">
              {[['12k+', 'happy guests'], ['4.9★', '850+ reviews'], ['9', 'years of craft']].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl">{n}</p>
                  <p className="text-xs text-stone-300 uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-br from-rose-200 via-amber-100 to-stone-200 shadow-2xl rotate-2" />
            <div className="absolute -bottom-6 -left-6 w-44 rounded-3xl bg-white/95 backdrop-blur p-5 shadow-xl text-stone-800 -rotate-3">
              <div className="flex items-center gap-1 text-amber-400 mb-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
              <p className="text-xs leading-snug">“The most relaxing two hours of my month.”</p>
            </div>
            <div className="absolute -top-5 -right-4 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-xl text-stone-800 rotate-3">
              <p className="text-xs text-stone-500">Next opening</p>
              <p className="font-serif text-lg">Today · 3:30 PM</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-[#fbf7f3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">What we do</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-800">A full ritual of care</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((c, i) => (
              <motion.a
                key={c.id}
                href="/demo/salons-spas/services"
                custom={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group rounded-3xl bg-white border border-rose-100 p-7 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <span className="text-4xl">{c.icon}</span>
                <h3 className="font-serif text-2xl text-stone-800 mt-4 mb-2">{c.name}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-4">{c.blurb}</p>
                <span className="text-sm text-rose-500 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY + LOYALTY */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Our promise</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-800 mb-6 leading-tight">Crafted by hand, never rushed.</h2>
            <div className="space-y-5">
              {[
                [<Scissors className="w-5 h-5" />, 'Master artists', 'Every stylist trains for years before they touch your hair.'],
                [<Leaf className="w-5 h-5" />, 'Clean, conscious products', 'Sulfate-free colour and cruelty-free skincare, always.'],
                [<Heart className="w-5 h-5" />, 'You, at the centre', 'A consultation before every service — no surprises.'],
              ].map(([icon, title, desc], i) => (
                <motion.div
                  key={title as string} custom={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-rose-50 text-rose-500 shrink-0">{icon}</span>
                  <div>
                    <p className="font-medium text-stone-800">{title as string}</p>
                    <p className="text-sm text-stone-500">{desc as string}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <LoyaltyWidget />
          </motion.div>
        </div>
      </section>

      {/* MEET THE TEAM PREVIEW */}
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-300 mb-3">The hands behind the work</p>
              <h2 className="font-serif text-4xl sm:text-5xl">Meet your artists</h2>
            </div>
            <a href="/demo/salons-spas/stylists" className="inline-flex items-center gap-2 text-rose-200 hover:text-white">
              See all &amp; gallery <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylists.map((s, i) => (
              <motion.div
                key={s.id} custom={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-3xl bg-stone-800 p-6 text-center"
              >
                <span className={`mx-auto grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} text-stone-800 font-serif text-2xl mb-4`}>
                  {s.initials}
                </span>
                <p className="font-serif text-xl">{s.name}</p>
                <p className="text-xs text-stone-400 mt-1">{s.role}</p>
                <p className="text-xs text-amber-300 mt-2">★ {s.rating} · {s.reviews}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#fbf7f3] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Kind words</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-800">Loved by our guests</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name} custom={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-3xl bg-white border border-rose-100 p-6"
              >
                <div className="flex gap-1 text-amber-400 mb-3">{[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">“{t.text}”</p>
                <p className="font-medium text-stone-800 text-sm">{t.name}</p>
                <p className="text-xs text-rose-400">{t.service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-rose-400 to-amber-300 py-20 text-center text-stone-900">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl sm:text-5xl mb-4">Ready for a little glow?</h2>
          <p className="text-stone-800/80 mb-8">Book in under a minute. Choose your service, stylist and time — confirmation is instant.</p>
          <a href="/demo/salons-spas/book" className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white font-medium px-8 py-4 hover:bg-stone-800 transition-colors">
            Book Your Appointment <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
