import { motion } from 'framer-motion';
import {
  Scale, Heart, Building2, Home as HomeIcon, ScrollText, ShieldCheck,
  Star, ArrowRight, Award, Phone, CheckCircle2, Quote,
} from 'lucide-react';
import { STATS, PRACTICE_AREAS, ATTORNEYS, TESTIMONIALS, BRAND } from './data';
import Triage from './Triage';

const ICONS: Record<string, any> = { Heart, Building2, Home: HomeIcon, Scale, ScrollText, ShieldCheck };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function Home() {
  return (
    <div className="bg-[#f7f5f0] text-slate-800">
      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#0f1a2e]">
        {/* decorative */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #fbbf24 0, transparent 40%), radial-gradient(circle at 80% 70%, #60a5fa 0, transparent 45%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-medium tracking-wide mb-6">
              <Award className="w-3.5 h-3.5" /> Established {BRAND.founded} · New York
            </motion.div>
            <motion.h1 custom={1} initial="hidden" animate="show" variants={fadeUp} className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.08] tracking-tight">
              When the stakes are high, you need <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">counsel of consequence.</span>
            </motion.h1>
            <motion.p custom={2} initial="hidden" animate="show" variants={fadeUp} className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
              {BRAND.name} {BRAND.suffix} is a full-service firm trusted for nearly four decades to protect what matters most — your family, your business, and your future.
            </motion.p>
            <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="/demo/law-firms/book" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] font-semibold shadow-xl shadow-amber-900/30 hover:-translate-y-0.5 transition-all">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href={`tel:${BRAND.phone}`} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                <Phone className="w-4 h-4" /> {BRAND.phone}
              </a>
            </motion.div>
            <motion.div custom={4} initial="hidden" animate="show" variants={fadeUp} className="mt-8 flex items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Confidential</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> No-obligation</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Same-week slots</span>
            </motion.div>
          </div>

          {/* Triage card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Triage />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0a1322] border-t border-amber-500/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
              <p className="font-serif text-3xl lg:text-4xl font-semibold text-amber-400">
                {s.value}<span className="text-amber-500/70 text-2xl">{s.suffix}</span>
              </p>
              <p className="text-xs uppercase tracking-wider text-slate-400 mt-1.5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600 font-semibold mb-3">Practice Areas</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#0f1a2e]">Deep expertise across the matters that shape your life</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_AREAS.map((p, i) => {
              const Icon = ICONS[p.icon] || Scale;
              return (
                <motion.a
                  key={p.slug}
                  href="/demo/law-firms/practice-areas"
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                  className="group bg-white rounded-lg border border-slate-200 p-7 hover:border-amber-400 hover:shadow-xl hover:shadow-slate-900/5 transition-all"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-md bg-[#0f1a2e] text-amber-400 mb-5 group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-yellow-600 group-hover:text-[#0f1a2e] transition-all">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#0f1a2e] mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.short}</p>
                  <span className="text-sm font-medium text-amber-600 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-[#0f1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 70% 20%, #fbbf24 0, transparent 50%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">Why Ashford & Vane</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold mb-6">A boutique firm with the firepower of a giant.</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              You’ll never be passed off to a junior associate you’ve never met. Every client works directly with a partner who knows their matter inside and out — backed by a team that has handled the largest, most complex cases in the city.
            </p>
            <div className="space-y-4">
              {[
                'Partner-led representation on every matter',
                'Transparent fees with written engagement letters',
                'Former prosecutors and dealmakers on your side',
                'Responsive — most clients hear back same day',
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-slate-200">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ATTORNEYS.slice(0, 4).map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-center"
              >
                <span className={`mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br ${a.accent} text-[#0f1a2e] font-serif font-bold text-lg mb-3`}>
                  {a.initials}
                </span>
                <p className="font-serif font-semibold text-sm">{a.name}</p>
                <p className="text-xs text-amber-400/80 mt-0.5">{a.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600 font-semibold mb-3">Client Outcomes</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#0f1a2e]">Trusted when it counted most</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-lg border border-slate-200 p-7 relative"
              >
                <Quote className="w-8 h-8 text-amber-200 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed text-[15px] mb-5">“{t.quote}”</p>
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-semibold text-[#0f1a2e] text-sm">{t.author}</p>
                  <p className="text-xs text-slate-500">{t.matter}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-400 to-yellow-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-[#0f1a2e] mb-4">Your first consultation is just a click away.</h2>
          <p className="text-[#0f1a2e]/80 text-lg mb-8 max-w-2xl mx-auto">Tell us about your matter and we’ll match you with the right attorney — confidential, no obligation, same-week availability.</p>
          <a href="/demo/law-firms/book" className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-[#0f1a2e] text-white font-semibold shadow-xl hover:-translate-y-0.5 transition-all">
            Book Your Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
