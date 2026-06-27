import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import {
  valuationAreas,
  conditionFactor,
  estimateValue,
  formatPrice,
  type PropertyType,
} from './data';

const types: (PropertyType | 'House')[] = ['House', 'Apartment', 'Villa', 'Penthouse', 'Townhouse'];

export default function Valuation() {
  const [area, setArea] = useState('Hampstead');
  const [sqft, setSqft] = useState(1800);
  const [beds, setBeds] = useState(3);
  const [condition, setCondition] = useState('Good');
  const [propertyType, setPropertyType] = useState<PropertyType | 'House'>('House');
  const [addr, setAddr] = useState('');
  const [result, setResult] = useState<{ low: number; mid: number; high: number } | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(estimateValue({ area, sqft, beds, condition, propertyType }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Form */}
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-6 sm:p-8"
      >
        <h2 className="font-serif text-2xl text-slate-800 flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-600" /> Your property
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">Enter a few details for an instant indicative figure.</p>

        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Address (optional)</label>
        <input
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          placeholder="e.g. 14 Marlowe Crescent"
          className="w-full mb-5 px-3.5 py-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
        />

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Area</label>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300">
              {valuationAreas.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Property type</label>
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as any)} className="w-full px-3 py-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300">
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
            <span>Internal area</span>
            <span className="text-emerald-700 font-bold normal-case tracking-normal">{sqft.toLocaleString()} ft²</span>
          </label>
          <input type="range" min={400} max={6000} step={50} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} className="w-full accent-emerald-600" />
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Bedrooms</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((b) => (
              <button type="button" key={b} onClick={() => setBeds(b)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${beds === b ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                {b}{b === 6 ? '+' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Condition</label>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.keys(conditionFactor).map((c) => (
              <button type="button" key={c} onClick={() => setCondition(c)} className={`py-2 rounded-lg text-sm font-medium transition ${condition === c ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 hover:to-teal-300 shadow-lg shadow-emerald-900/20 transition">
          <Sparkles className="w-4 h-4" /> Calculate estimate
        </button>
      </motion.form>

      {/* Result */}
      <div className="lg:sticky lg:top-40">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="res"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-[#0b1f17] text-white p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl" />
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Indicative valuation
              </p>
              <p className="mt-3 text-sm text-emerald-100/70">{addr ? addr + ', ' : ''}{area}</p>
              <motion.p
                key={result.mid}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-2 font-serif text-5xl sm:text-6xl text-emerald-50"
              >
                {formatPrice(result.mid)}
              </motion.p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <div>
                  <p className="text-emerald-400/80 text-xs uppercase tracking-wider">Lower</p>
                  <p className="font-semibold text-emerald-50">{formatPrice(result.low)}</p>
                </div>
                <div className="flex-1 mx-4 h-1.5 rounded-full bg-emerald-900/60 relative">
                  <div className="absolute inset-y-0 left-[10%] right-[10%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow" />
                </div>
                <div className="text-right">
                  <p className="text-emerald-400/80 text-xs uppercase tracking-wider">Upper</p>
                  <p className="font-semibold text-emerald-50">{formatPrice(result.high)}</p>
                </div>
              </div>

              <p className="mt-6 text-xs text-emerald-100/50 leading-relaxed">
                This is an automated estimate based on the details provided and is not a formal valuation. For an accurate figure, book a free in-person appraisal with an Aurelia valuer.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="/demo/real-estate/book" className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 transition">
                  Book a valuation <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={() => setResult(null)} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-emerald-700 text-emerald-100 hover:bg-emerald-900/40 transition">
                  <RotateCcw className="w-4 h-4" /> Redo
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-emerald-200 bg-white p-10 text-center"
            >
              <div className="mx-auto w-14 h-14 grid place-items-center rounded-full bg-emerald-50 text-emerald-500 mb-4">
                <TrendingUp className="w-7 h-7" />
              </div>
              <p className="font-serif text-xl text-slate-700">Your estimate appears here</p>
              <p className="text-sm text-slate-500 mt-2">Fill in the details and hit calculate for an instant figure with a confidence range.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
