import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, ArrowRight, RotateCcw } from 'lucide-react';
import { TRIAGE } from './data';

export default function Triage() {
  const [picked, setPicked] = useState<number | null>(null);
  const result = picked !== null ? TRIAGE[picked] : null;

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="px-6 py-5 bg-[#0f1a2e] text-white flex items-center gap-3">
        <span className="flex items-center justify-center w-9 h-9 rounded-sm bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e]">
          <Scale className="w-5 h-5" strokeWidth={2.2} />
        </span>
        <div>
          <p className="font-serif font-semibold">Case Triage</p>
          <p className="text-xs text-amber-300/80">Find the right practice area in seconds</p>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="q"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm font-medium text-slate-700 mb-4">What brings you to us today?</p>
              <div className="space-y-2.5">
                {TRIAGE.map((t, i) => (
                  <button
                    key={t.label}
                    onClick={() => setPicked(i)}
                    className="w-full text-left px-4 py-3 rounded-md border border-slate-200 text-sm text-slate-700 hover:border-amber-400 hover:bg-amber-50/60 transition-all flex items-center justify-between group"
                  >
                    {t.label}
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="r"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xs uppercase tracking-wider text-amber-600 font-semibold mb-1">Recommended practice</p>
              <h3 className="font-serif text-xl text-[#0f1a2e] font-semibold mb-3">{result.area}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{result.note}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`/demo/law-firms/book?matter=${encodeURIComponent(result.area)}`}
                  className="flex-1 text-center px-5 py-3 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] text-sm font-semibold shadow-lg shadow-amber-900/20 hover:-translate-y-0.5 transition-all"
                >
                  Book about {result.area.split(' ')[0]}
                </a>
                <button
                  onClick={() => setPicked(null)}
                  className="px-5 py-3 rounded-md border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Start over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
