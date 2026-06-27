import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import { dentists } from './data';

export default function DentistGrid() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {dentists.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow"
        >
          <div className={`h-28 bg-gradient-to-br ${d.accent} relative`}>
            <span className="absolute -bottom-8 left-6 grid place-items-center w-20 h-20 rounded-2xl bg-white shadow-lg">
              <span className={`grid place-items-center w-16 h-16 rounded-xl bg-gradient-to-br ${d.accent} text-white font-display font-extrabold text-2xl`}>
                {d.initials}
              </span>
            </span>
          </div>
          <div className="pt-12 px-6 pb-6">
            <h3 className="font-display font-bold text-xl text-slate-800">{d.name}</h3>
            <p className="text-teal-600 font-medium text-sm">{d.role}</p>
            <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <Award className="w-3.5 h-3.5" /> {d.years} years of experience
            </p>
            <p className="text-sm text-slate-500 mt-3">{d.bio}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {d.focus.map((f) => (
                <span key={f} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">{f}</span>
              ))}
            </div>
            <a href="/demo/dental-clinics/book" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold text-teal-600 hover:gap-2 transition-all">
              Book with {d.name.split(' ')[1]} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
