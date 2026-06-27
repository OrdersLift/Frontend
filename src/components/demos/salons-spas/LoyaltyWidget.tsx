import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Plus, Sparkles } from 'lucide-react';
import { loyaltyTiers } from './data';

export default function LoyaltyWidget() {
  const [points, setPoints] = useState(240);

  const current = [...loyaltyTiers].reverse().find((t) => points >= t.min) ?? loyaltyTiers[0];
  const next = loyaltyTiers.find((t) => t.min > points);
  const progress = next
    ? Math.min(100, ((points - current.min) / (next.min - current.min)) * 100)
    : 100;

  return (
    <div className="rounded-3xl bg-white border border-rose-100 shadow-sm p-7">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-rose-50 text-rose-500">
            <Gift className="w-5 h-5" />
          </span>
          <div>
            <p className="font-serif text-xl text-stone-800">Lumière Rewards</p>
            <p className="text-xs text-stone-500">Member · {current.name} tier</p>
          </div>
        </div>
        <div className="text-right">
          <motion.p
            key={points}
            initial={{ scale: 1.3, color: '#f43f5e' }}
            animate={{ scale: 1, color: '#292524' }}
            className="text-3xl font-semibold text-stone-800"
          >
            {points}
          </motion.p>
          <p className="text-xs text-stone-500">points</p>
        </div>
      </div>

      <div className="mb-2 flex justify-between text-xs text-stone-500">
        <span>{current.name}</span>
        <span>{next ? `${next.min - points} pts to ${next.name}` : 'Top tier reached ✨'}</span>
      </div>
      <div className="h-2.5 rounded-full bg-rose-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-300"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-stone-600">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Current perk: <span className="text-stone-800 font-medium">{current.perk}</span></span>
      </div>

      <button
        onClick={() => setPoints((p) => p + 70)}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-stone-800 text-white text-sm font-medium py-3 hover:bg-rose-500 transition-colors"
      >
        <Plus className="w-4 h-4" /> Simulate a $70 visit
      </button>
      <p className="mt-2 text-center text-[11px] text-stone-400">Demo widget · earn 1 point per $1 spent</p>
    </div>
  );
}
