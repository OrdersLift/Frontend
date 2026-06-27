import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, HeartPulse, Hand, Waves, Syringe, Flower2, PersonStanding, Leaf, Clock, ArrowRight,
} from 'lucide-react';
import { treatments } from './data';

const iconMap: Record<string, any> = {
  Activity, HeartPulse, Hand, Waves, Syringe, Flower2, PersonStanding, Leaf,
};

const cats = ['All', 'Rehab', 'Sports', 'Massage', 'Wellness'] as const;

export default function TreatmentsList() {
  const [cat, setCat] = useState<string>('All');
  const list = cat === 'All' ? treatments : treatments.filter((t) => t.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              cat === c ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30' : 'bg-white text-slate-600 border border-emerald-100 hover:border-emerald-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {list.map((t) => {
            const Icon = iconMap[t.icon] ?? Activity;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-300 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">{t.category}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 mb-1.5">{t.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{t.blurb}</p>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{t.duration}</p>
                    <p className="font-bold text-slate-800 text-lg">${t.price}</p>
                  </div>
                  <a href="/demo/clinics-physio/book" className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg transition-shadow">
                    Book <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
