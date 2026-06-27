import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Sparkles } from 'lucide-react';
import { tiers } from './data';

const accentMap: Record<string, { ring: string; text: string; btn: string; glow: string; chip: string }> = {
  cyan: { ring: 'ring-cyan-400/40', text: 'text-cyan-300', btn: 'bg-cyan-400 hover:bg-cyan-300 text-black', glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]', chip: 'bg-cyan-400/15 text-cyan-300' },
  lime: { ring: 'ring-lime-400/60', text: 'text-lime-300', btn: 'bg-lime-400 hover:bg-lime-300 text-black', glow: 'shadow-[0_0_40px_rgba(163,230,53,0.35)]', chip: 'bg-lime-400/15 text-lime-300' },
  fuchsia: { ring: 'ring-fuchsia-400/40', text: 'text-fuchsia-300', btn: 'bg-fuchsia-400 hover:bg-fuchsia-300 text-black', glow: 'shadow-[0_0_30px_rgba(232,121,249,0.25)]', chip: 'bg-fuchsia-400/15 text-fuchsia-300' },
};

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState('forge');

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className={`text-sm font-semibold ${!annual ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className="relative h-7 w-14 rounded-full bg-zinc-800 transition-colors"
          aria-label="Toggle billing"
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`absolute top-1 h-5 w-5 rounded-full bg-lime-400 ${annual ? 'left-8' : 'left-1'}`}
          />
        </button>
        <span className={`text-sm font-semibold ${annual ? 'text-white' : 'text-zinc-500'}`}>
          Annual <span className="text-lime-400">(save 20%)</span>
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3 items-start">
        {tiers.map((t, i) => {
          const a = accentMap[t.accent];
          const isSel = selected === t.id;
          const price = annual ? Math.round(t.monthly * 0.8) : t.monthly;
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => setSelected(t.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-left rounded-3xl border bg-zinc-900/60 p-7 ring-2 transition-all ${
                isSel ? `${a.ring} ${a.glow} border-transparent -translate-y-1` : 'ring-transparent border-white/10 hover:border-white/20'
              } ${t.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
                  <Star className="h-3 w-3 fill-black" /> MOST POPULAR
                </span>
              )}

              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-extrabold text-white">{t.name}</h3>
                {isSel && (
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${a.chip}`}>
                    <Check className="h-3 w-3" /> Selected
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-400">{t.blurb}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className={`font-display text-5xl font-extrabold ${a.text}`}>${price}</span>
                <span className="mb-1.5 text-zinc-500">/mo</span>
              </div>
              {annual && <p className="text-xs text-zinc-500 mt-1">Billed ${price * 12}/yr</p>}

              <ul className="mt-6 space-y-2.5">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className={`h-4 w-4 shrink-0 mt-0.5 ${a.text}`} />
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href="/demo/gyms-fitness/join"
                onClick={(e) => e.stopPropagation()}
                className={`mt-7 block rounded-xl py-3 text-center text-sm font-bold transition-all ${a.btn}`}
              >
                Choose {t.name}
              </a>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={selected + String(annual)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center text-sm text-zinc-400 flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-lime-400" />
          You picked <span className="font-bold text-white">
            {tiers.find((t) => t.id === selected)?.name}
          </span> at ${annual ? Math.round((tiers.find((t) => t.id === selected)!.monthly) * 0.8) : tiers.find((t) => t.id === selected)?.monthly}/mo. No contracts, cancel anytime.
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
