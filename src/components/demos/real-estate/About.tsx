import { motion } from 'framer-motion';
import { Gem, Target, HeartHandshake, ArrowRight } from 'lucide-react';
import { team, stats, offices } from './data';

export default function About() {
  return (
    <>
      <section className="bg-[#0b1f17] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute -top-24 -left-10 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
            <Gem className="w-3.5 h-3.5" /> Est. 2009
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl text-emerald-50 leading-tight">A different kind of estate agency.</h1>
          <p className="mt-4 text-lg text-emerald-100/70">
            Aurelia was founded on a simple belief: that buying or selling a home should feel considered, calm and personal — not transactional. Fifteen years on, that conviction still guides everything we do.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 text-center">
              <p className="font-serif text-3xl text-emerald-700">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          {[
            { icon: Target, t: 'Our promise', d: 'Senior-partner attention on every instruction, transparent 1.2% fees, and no upfront costs. We only succeed when you do.' },
            { icon: HeartHandshake, t: 'Our approach', d: 'We take on fewer clients deliberately, giving us the time to truly understand what home means to each one.' },
          ].map((b, i) => (
            <motion.div key={b.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-white border border-emerald-100 p-8">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600"><b.icon className="w-6 h-6" /></span>
              <h3 className="mt-4 font-serif text-2xl text-slate-800">{b.t}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">The people</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-slate-800">Meet our partners</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-emerald-100 overflow-hidden bg-white">
                <div className="h-40 bg-gradient-to-br from-emerald-600 to-teal-500 grid place-items-center">
                  <span className="grid place-items-center w-20 h-20 rounded-full bg-white/20 backdrop-blur text-white font-serif text-2xl">{m.initials}</span>
                </div>
                <div className="p-5">
                  <p className="font-serif text-lg text-slate-800">{m.name}</p>
                  <p className="text-sm text-emerald-700">{m.role}</p>
                  <p className="text-xs text-slate-500 mt-1">{m.area}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1f17] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl text-emerald-50">Visit us</h2>
            <div className="mt-5 space-y-4">
              {offices.map((o) => (
                <div key={o.area} className="rounded-xl border border-emerald-800/50 bg-emerald-950/40 p-5">
                  <p className="font-serif text-lg text-emerald-50">{o.area}</p>
                  <p className="text-sm text-emerald-100/70">{o.address}</p>
                  <a href={`tel:${o.phone}`} className="text-sm text-emerald-300 hover:text-emerald-200">{o.phone}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="font-serif text-2xl text-white">Ready to make a move?</h3>
            <p className="mt-2 text-emerald-50/90">Book a viewing or get an instant valuation today.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/demo/real-estate/book" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-emerald-800 bg-white hover:bg-emerald-50 transition">Book a viewing <ArrowRight className="w-4 h-4" /></a>
              <a href="/demo/real-estate/valuation" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white border border-white/40 hover:bg-white/10 transition">Instant valuation</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
