import { motion } from 'framer-motion';
import { BadgeCheck, ArrowRight } from 'lucide-react';
import { practitioners } from './data';

export default function TeamGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {practitioners.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-shadow"
        >
          <div className={`h-28 bg-gradient-to-br ${p.hue} relative`}>
            <div className="absolute -bottom-9 left-6 w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
              <div className={`w-full h-full rounded-xl bg-gradient-to-br ${p.hue} text-white flex items-center justify-center text-xl font-bold`}>
                {p.initials}
              </div>
            </div>
          </div>
          <div className="pt-12 px-6 pb-6">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-lg text-slate-800">{p.name}</h3>
              <BadgeCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-sm text-emerald-600 font-medium">{p.role}</p>
            <p className="text-xs text-slate-400 mt-0.5">{p.credentials}</p>
            <p className="text-sm text-slate-500 leading-relaxed mt-3">{p.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.specialties.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">{s}</span>
              ))}
            </div>
            <a href="/demo/clinics-physio/book" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              Book with {p.name.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
