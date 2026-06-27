import { motion } from 'framer-motion';
import {
  Activity, HeartPulse, Hand, Waves, ShieldCheck, Clock, Award, Smile,
  Leaf, ArrowRight, Star, MapPin, Phone, Quote,
} from 'lucide-react';
import { treatments, testimonials, brand } from './data';
import SymptomFinder from './SymptomFinder';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const featured = treatments.slice(0, 4);
const iconMap: Record<string, any> = { Activity, HeartPulse, Hand, Waves };

const reassurance = [
  { icon: ShieldCheck, title: 'No referral needed', text: 'Book directly with us — no GP letter required to get started.' },
  { icon: Clock, title: 'Same-day treatment', text: 'Most patients begin care on their very first visit, not weeks later.' },
  { icon: Award, title: 'Senior clinicians', text: 'Every plan is led by an experienced, fully-accredited physiotherapist.' },
  { icon: Smile, title: 'Honest timelines', text: 'Clear, realistic recovery plans — never endless open-ended sessions.' },
];

export default function HomeContent() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-b from-emerald-700 via-emerald-600 to-teal-600">
        {/* soft blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-teal-400/30 blur-3xl" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-lime-300/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-emerald-50 text-xs font-medium backdrop-blur-sm mb-5">
              <Leaf className="w-3.5 h-3.5" /> Caring physiotherapy in Bayfield
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5">
              Move well.<br />Live well.
            </h1>
            <p className="text-emerald-50/90 text-lg max-w-md mb-8">
              Expert, reassuring physiotherapy and rehab to get you out of pain and back to doing what you love — at a pace that feels right.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/demo/clinics-physio/book" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-emerald-700 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Book an appointment <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/demo/clinics-physio/treatments" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors">
                View treatments
              </a>
            </div>
            <div className="flex items-center gap-5 mt-8 text-emerald-50/90 text-sm">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-lime-300 text-lime-300" /> 4.9 · 600+ reviews</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Bayfield</span>
            </div>
          </motion.div>

          {/* hero card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl bg-white/95 backdrop-blur p-6 shadow-2xl shadow-emerald-900/30">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                  <HeartPulse className="w-6 h-6" />
                </span>
                <div>
                  <p className="font-display font-bold text-slate-800">Your recovery, mapped out</p>
                  <p className="text-xs text-slate-500">A clear plan from day one</p>
                </div>
              </div>
              <div className="space-y-3">
                {['Assess the root cause', 'Hands-on treatment', 'Personalised home plan', 'Back to full strength'].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'}`}>{i + 1}</span>
                    <span className="text-sm text-slate-700">{s}</span>
                  </div>
                ))}
              </div>
              <a href="/demo/clinics-physio/book" className="mt-5 block text-center py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm hover:bg-emerald-100 transition-colors">
                Start your plan →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="py-16 bg-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reassurance.map((r, i) => (
            <motion.div
              key={r.title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <r.icon className="w-5 h-5" />
              </span>
              <h3 className="font-semibold text-slate-800 mb-1">{r.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES + SYMPTOM FINDER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-bold text-3xl text-slate-800 mb-2">How we can help</h2>
            <p className="text-slate-500 mb-8">From sports injuries to post-op rehab and therapeutic massage — care tailored to you.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {featured.map((t, i) => {
                const Icon = iconMap[t.icon] ?? Activity;
                return (
                  <motion.a
                    key={t.id}
                    href="/demo/clinics-physio/treatments"
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group bg-white rounded-2xl p-5 border border-emerald-100 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 transition-all"
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-3">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-semibold text-slate-800">{t.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{t.blurb}</p>
                    <p className="text-sm font-semibold text-emerald-600 mt-3 flex items-center gap-1">From ${t.price} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" /></p>
                  </motion.a>
                );
              })}
            </div>
            <a href="/demo/clinics-physio/treatments" className="inline-flex items-center gap-2 mt-6 font-semibold text-emerald-600 hover:text-emerald-700">
              See all treatments & prices <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <SymptomFinder />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gradient-to-b from-teal-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-white text-center mb-3">Patients who got their lives back</h2>
          <p className="text-emerald-50/80 text-center mb-12 max-w-xl mx-auto">Real stories of recovery from the Verdant family.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-xl"
              >
                <Quote className="w-7 h-7 text-emerald-300 mb-3" />
                <p className="text-slate-700 text-sm leading-relaxed mb-5">“{t.quote}”</p>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-semibold text-sm">
                    {t.name[0]}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-10 sm:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <h2 className="relative font-display font-bold text-3xl sm:text-4xl mb-3">Ready to feel better?</h2>
            <p className="relative text-emerald-50/90 mb-8 max-w-lg mx-auto">Book online in under a minute, or call us — we’ll find the right time and the right clinician for you.</p>
            <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/demo/clinics-physio/book" className="px-7 py-3.5 rounded-full font-semibold text-emerald-700 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all">Book online</a>
              <a href={`tel:${brand.phone}`} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white border border-white/40 hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" /> {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
