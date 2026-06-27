import { motion } from 'framer-motion';
import {
  Sparkles, Sun, Shield, Anchor, AlignCenter, Activity,
  Star, CalendarHeart, ShieldCheck, HeartHandshake, Clock, ArrowRight, Quote,
} from 'lucide-react';
import { treatments, testimonials, stats, brand } from './data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles, sun: Sun, shield: Shield, anchor: Anchor,
  'align-center': AlignCenter, activity: Activity,
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function HomeSections() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-teal-900 to-teal-700 pt-32 pb-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(45,212,191,0.5), transparent 40%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.4), transparent 45%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur text-teal-100 text-sm font-medium border border-white/15"
            >
              <Star className="w-4 h-4 fill-teal-300 text-teal-300" /> Rated 4.9 by 12,000+ patients
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-5 leading-[1.05]"
            >
              Dentistry that finally feels <span className="text-teal-300">calm.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg text-teal-50/90 mt-5 max-w-md"
            >
              {brand.tagline}. Book your visit online in under two minutes — no phone calls, no waiting on hold.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a href="/demo/dental-clinics/book" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-teal-700 font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
                <CalendarHeart className="w-5 h-5" /> Book appointment
              </a>
              <a href="/demo/dental-clinics/treatments" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors">
                View treatments <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white text-xl">😁</span>
                <div>
                  <p className="font-semibold text-slate-800">Next available</p>
                  <p className="text-sm text-slate-500">Tomorrow, 9:30 AM</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 text-center">
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="bg-teal-50 rounded-2xl py-3">
                    <p className="font-display font-extrabold text-xl text-teal-700">{s.value}</p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <a href="/demo/dental-clinics/book" className="mt-4 block text-center w-full py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold">
                Grab this slot
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: 'Gentle & pain-free', text: 'Modern, low-vibration tools and calming sedation options.' },
            { icon: HeartHandshake, title: 'Transparent pricing', text: 'Clear estimates up front. We check your insurance for you.' },
            { icon: Clock, title: 'Same-week slots', text: '92% of patients are seen within a week of booking.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="flex gap-4 p-5 rounded-2xl bg-teal-50/50"
            >
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white shrink-0">
                <f.icon className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">{f.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-teal-600 font-semibold">Our care</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 mt-2">
              Everything for a healthy smile
            </h2>
            <p className="text-slate-500 mt-3">From routine cleanings to full smile makeovers, all under one calm roof.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {treatments.map((t, i) => {
              const Icon = iconMap[t.icon] ?? Sparkles;
              return (
                <motion.a
                  key={t.id}
                  href="/demo/dental-clinics/treatments"
                  variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="group bg-white rounded-3xl p-6 border border-slate-100 hover:border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <span className="grid place-items-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </span>
                  <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mt-4">{t.category}</p>
                  <h3 className="font-display font-bold text-lg text-slate-800 mt-1">{t.name}</h3>
                  <p className="text-sm text-slate-500 mt-2">{t.blurb}</p>
                  <p className="text-sm font-semibold text-slate-700 mt-4">From ${t.priceFrom}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-teal-600 font-semibold">Loved by patients</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 mt-2">Smiles speak louder</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="bg-teal-50/60 rounded-3xl p-7 relative"
              >
                <Quote className="w-8 h-8 text-teal-300 mb-3" />
                <p className="text-slate-700">{t.text}</p>
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-semibold text-slate-800 mt-2">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">Ready for a brighter smile?</h2>
          <p className="text-teal-50 mt-3 max-w-lg mx-auto">Book online now — no phone calls, instant confirmation, and a friendly reminder before your visit.</p>
          <a href="/demo/dental-clinics/book" className="inline-flex items-center gap-2 mt-7 px-8 py-4 rounded-full bg-white text-teal-700 font-bold shadow-lg hover:-translate-y-0.5 transition-all">
            <CalendarHeart className="w-5 h-5" /> Book your appointment
          </a>
        </div>
      </section>
    </>
  );
}
