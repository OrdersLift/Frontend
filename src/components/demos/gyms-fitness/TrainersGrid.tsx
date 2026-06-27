import { motion } from 'framer-motion';
import { BadgeCheck, Target } from 'lucide-react';
import { trainers } from './data';

export default function TrainersGrid() {
  return (
    <div className="grid gap-7 sm:grid-cols-2">
      {trainers.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60"
        >
          <div className={`relative h-40 bg-gradient-to-br ${t.gradient} flex items-end p-5`}>
            <div className="pointer-events-none absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,.3), transparent 60%)' }} />
            <span className="absolute top-4 right-5 text-5xl drop-shadow-lg">{t.emoji}</span>
            <div className="relative">
              <h3 className="font-display text-2xl font-extrabold text-black">{t.name}</h3>
              <p className="font-semibold text-black/70">{t.role}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-lime-400">
              <Target className="h-4 w-4" /> {t.specialty}
            </p>
            <p className="mt-3 text-zinc-400">{t.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {t.certs.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
                  <BadgeCheck className="h-3.5 w-3.5 text-lime-400" /> {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
