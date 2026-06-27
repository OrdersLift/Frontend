import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { guidanceOptions, treatments } from './data';

export default function SymptomFinder() {
  const [picked, setPicked] = useState<string | null>(null);
  const option = guidanceOptions.find((o) => o.id === picked);
  const recs = option ? treatments.filter((t) => option.recommends.includes(t.id)) : [];

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600">
          <Sparkles className="w-5 h-5" />
        </span>
        <h3 className="font-display font-bold text-xl text-slate-800">Symptom Finder</h3>
      </div>
      <p className="text-slate-500 text-sm mb-6">Tell us what’s bothering you and we’ll suggest where to start. Not a diagnosis — just a friendly nudge.</p>

      <AnimatePresence mode="wait">
        {!option ? (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {guidanceOptions.map((o) => (
              <button
                key={o.id}
                onClick={() => setPicked(o.id)}
                className="group text-left flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-300 transition-all"
              >
                <span className="text-2xl">{o.emoji}</span>
                <span className="font-medium text-slate-700 text-sm flex-1">{o.label}</span>
                <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 mb-5">
              <p className="text-sm leading-relaxed">{option.message}</p>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-3">Suggested for you</p>
            <div className="space-y-3">
              {recs.map((t) => (
                <a
                  key={t.id}
                  href="/demo/clinics-physio/book"
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.duration} · ${t.price}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">Book <ArrowRight className="w-3.5 h-3.5" /></span>
                </a>
              ))}
            </div>
            <button
              onClick={() => setPicked(null)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600"
            >
              <RotateCcw className="w-4 h-4" /> Start over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
