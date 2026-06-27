import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, Info } from 'lucide-react';
import { treatments } from './data';

export default function CostEstimator() {
  const [selected, setSelected] = useState<string[]>(['cleaning']);
  const [insured, setInsured] = useState(true);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const { low, high } = useMemo(() => {
    const picked = treatments.filter((t) => selected.includes(t.id));
    const l = picked.reduce((a, t) => a + t.priceFrom, 0);
    const h = picked.reduce((a, t) => a + t.priceTo, 0);
    const factor = insured ? 0.4 : 1; // estimate ~60% covered
    return { low: Math.round(l * factor), high: Math.round(h * factor) };
  }, [selected, insured]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr,1fr]">
      <div>
        <h3 className="font-display font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-teal-600" /> Select treatments
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {treatments.map((t) => {
            const on = selected.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${
                  on
                    ? 'border-teal-500 bg-teal-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-teal-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-800 text-sm">{t.name}</span>
                  <span
                    className={`grid place-items-center w-5 h-5 rounded-full shrink-0 ${
                      on ? 'bg-teal-500 text-white' : 'bg-slate-100'
                    }`}
                  >
                    {on && <Check className="w-3.5 h-3.5" />}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  ${t.priceFrom}–${t.priceTo}
                </p>
              </button>
            );
          })}
        </div>

        <label className="mt-5 flex items-center gap-3 cursor-pointer select-none">
          <span
            onClick={() => setInsured((i) => !i)}
            className={`relative w-12 h-7 rounded-full transition-colors ${insured ? 'bg-teal-500' : 'bg-slate-300'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                insured ? 'translate-x-5' : ''
              }`}
            />
          </span>
          <span className="text-sm text-slate-700">I have PPO dental insurance</span>
        </label>
      </div>

      <motion.div
        layout
        className="rounded-3xl bg-gradient-to-br from-slate-900 to-teal-900 text-white p-7 h-fit lg:sticky lg:top-40"
      >
        <p className="text-teal-200 text-sm font-medium">Estimated out-of-pocket</p>
        <motion.p
          key={`${low}-${high}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold text-4xl mt-1"
        >
          ${low.toLocaleString()}
          <span className="text-2xl text-teal-200"> – ${high.toLocaleString()}</span>
        </motion.p>
        <p className="text-xs text-teal-100/70 mt-2">
          {insured
            ? 'Assumes a typical PPO covering ~60% after deductible.'
            : 'Self-pay estimate before any membership discount.'}
        </p>

        <div className="mt-5 pt-5 border-t border-white/10 space-y-1.5 text-sm">
          {treatments
            .filter((t) => selected.includes(t.id))
            .map((t) => (
              <div key={t.id} className="flex justify-between text-teal-50/90">
                <span>{t.name}</span>
                <span>${t.priceFrom}–${t.priceTo}</span>
              </div>
            ))}
          {selected.length === 0 && (
            <p className="text-teal-200/70">Pick a treatment to see an estimate.</p>
          )}
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs text-teal-100/70">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          A demo estimate only. We confirm exact pricing with your plan before any treatment.
        </p>
        <a
          href="/demo/dental-clinics/book"
          className="mt-5 block text-center w-full py-3 rounded-full bg-white text-teal-700 font-semibold hover:bg-teal-50 transition-colors"
        >
          Book a free consult
        </a>
      </motion.div>
    </div>
  );
}
