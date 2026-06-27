import { motion } from 'framer-motion';
import { Flame, HeartPulse, Users, Activity, ArrowRight, Quote, Zap } from 'lucide-react';
import { stats, whyUs, results, brand } from './data';

const icons: Record<string, any> = { Flame, HeartPulse, Users, Activity };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export default function HomeSections() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-black pt-32 pb-24">
        {/* neon grid + glows */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: 'linear-gradient(rgba(163,230,53,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,.4) 1px,transparent 1px)', backgroundSize: '46px 46px' }} />
        <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-lime-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="show" className="max-w-3xl">
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5 text-sm font-bold text-lime-300">
              <Zap className="h-4 w-4" /> San Francisco's #1 Strength & Conditioning Studio
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-white">
              TRAIN LOUD.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">LIVE STRONG.</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg text-zinc-400 max-w-xl">
              120 high-energy classes a week, elite coaches, and a tribe that won't let you quit. Your first 3 days are on us.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-9 flex flex-wrap gap-4">
              <a href="/demo/gyms-fitness/join" className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 font-bold text-black hover:bg-lime-300 transition shadow-[0_0_28px_rgba(163,230,53,0.5)]">
                <Flame className="h-5 w-5" /> Start Free Trial
              </a>
              <a href="/demo/gyms-fitness/classes" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-bold text-white hover:bg-white/5 transition">
                See Class Schedule <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl">
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="font-display text-3xl font-extrabold text-lime-400">{s.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-zinc-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-extrabold text-white">Why members stay <span className="text-lime-400">forged</span></h2>
            <p className="mt-3 text-zinc-400">This isn't a treadmill warehouse. It's a system built to change you.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => {
              const Icon = icons[w.icon];
              return (
                <motion.div
                  key={w.title}
                  initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover:border-lime-400/40 transition"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-lime-400/15 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{w.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{w.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-extrabold text-white">Real members. Real results.</h2>
            <p className="mt-3 text-zinc-400">No filters, no fake before/afters — just the work.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {results.map((r, i) => (
              <motion.div
                key={r.name}
                initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-7"
              >
                <Quote className="h-8 w-8 text-lime-400/40" />
                <p className="mt-3 text-zinc-300">{r.text}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-zinc-800 text-xl">{r.emoji}</span>
                    <span className="font-bold text-white">{r.name}</span>
                  </div>
                  <span className="rounded-full bg-lime-400/15 px-3 py-1 text-sm font-bold text-lime-400">{r.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-gradient-to-r from-lime-400 to-emerald-400 py-16">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-black">Stop scrolling. Start lifting.</h2>
          <p className="mt-3 text-black/70 text-lg">{brand.tagline} — claim your free 3-day trial today.</p>
          <a href="/demo/gyms-fitness/join" className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-lime-400 hover:bg-zinc-900 transition">
            <Flame className="h-5 w-5" /> Claim Free Trial
          </a>
        </div>
      </section>
    </>
  );
}
