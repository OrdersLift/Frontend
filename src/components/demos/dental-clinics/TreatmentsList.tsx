import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Shield, Anchor, AlignCenter, Activity, Clock, ArrowRight } from 'lucide-react';
import { treatments } from './data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles, sun: Sun, shield: Shield, anchor: Anchor,
  'align-center': AlignCenter, activity: Activity,
};

const categories = ['All', ...Array.from(new Set(treatments.map((t) => t.category)))];

export default function TreatmentsList() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? treatments : treatments.filter((t) => t.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              cat === c ? 'bg-teal-500 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-teal-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 gap-5">
        {list.map((t, i) => {
          const Icon = iconMap[t.icon] ?? Sparkles;
          return (
            <motion.div
              layout
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between">
                <span className="grid place-items-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">{t.category}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-slate-800 mt-4">{t.name}</h3>
              <p className="text-sm text-slate-500 mt-2 flex-1">{t.blurb}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                <div>
                  <p className="font-display font-extrabold text-xl text-slate-800">${t.priceFrom}<span className="text-sm text-slate-400 font-normal">–${t.priceTo}</span></p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {t.duration}</p>
                </div>
                <a href="/demo/dental-clinics/book" className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors">
                  Book <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
