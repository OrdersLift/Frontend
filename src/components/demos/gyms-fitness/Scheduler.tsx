import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Zap, CheckCircle2, X, CalendarCheck } from 'lucide-react';
import { schedule, days, intensityColors, type ClassSlot } from './data';

export default function Scheduler() {
  const [activeDay, setActiveDay] = useState('Mon');
  const [spots, setSpots] = useState<Record<string, number>>(
    Object.fromEntries(schedule.map((s) => [s.id, s.spots]))
  );
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [confirm, setConfirm] = useState<ClassSlot | null>(null);

  const dayClasses = useMemo(
    () => schedule.filter((s) => s.day === activeDay),
    [activeDay]
  );

  const book = (c: ClassSlot) => {
    if (booked.has(c.id) || spots[c.id] <= 0) return;
    setSpots((p) => ({ ...p, [c.id]: p[c.id] - 1 }));
    setBooked((p) => new Set(p).add(c.id));
    setConfirm(c);
  };

  return (
    <div>
      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {days.map((d) => {
          const count = schedule.filter((s) => s.day === d).length;
          const active = d === activeDay;
          return (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                active
                  ? 'bg-lime-400 text-black shadow-[0_0_18px_rgba(163,230,53,0.5)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {d}
              <span className={`ml-1.5 text-xs ${active ? 'text-black/60' : 'text-zinc-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Class cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {dayClasses.map((c, i) => {
            const left = spots[c.id];
            const isBooked = booked.has(c.id);
            const full = left <= 0 && !isBooked;
            const pct = Math.round(((c.capacity - left) / c.capacity) * 100);
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400">{c.tag}</span>
                    <h3 className="font-display text-xl font-extrabold text-white">{c.name}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${intensityColors[c.intensity]}`}>
                    <Zap className="inline h-3 w-3 -mt-0.5 mr-0.5" />{c.intensity}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-zinc-500" />{c.time} · {c.duration}</span>
                  <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-zinc-500" />{c.coach}</span>
                </div>

                {/* capacity bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={left <= 3 && left > 0 ? 'text-orange-400 font-bold' : 'text-zinc-500'}>
                      {full ? 'Class full' : `${left} of ${c.capacity} spots left`}
                    </span>
                    <span className="text-zinc-600">{pct}% booked</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${full ? 'bg-rose-500' : 'bg-lime-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => book(c)}
                  disabled={isBooked || full}
                  className={`mt-4 w-full rounded-xl py-2.5 text-sm font-bold transition-all ${
                    isBooked
                      ? 'bg-emerald-500/15 text-emerald-400 cursor-default'
                      : full
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      : 'bg-lime-400 text-black hover:bg-lime-300'
                  }`}
                >
                  {isBooked ? (
                    <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="h-4 w-4" />Booked!</span>
                  ) : full ? 'Waitlist Only' : 'Book Spot'}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {confirm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl border border-lime-400/30 bg-zinc-950 p-7 text-center"
            >
              <button onClick={() => setConfirm(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-lime-400/15">
                <CalendarCheck className="h-8 w-8 text-lime-400" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white">You're in! 🔥</h3>
              <p className="mt-2 text-zinc-400">
                <span className="font-bold text-white">{confirm.name}</span> on {confirm.day} at {confirm.time} with {confirm.coach}.
              </p>
              <p className="mt-1 text-sm text-zinc-500">A confirmation was sent to your email (demo).</p>
              <button
                onClick={() => setConfirm(null)}
                className="mt-6 w-full rounded-xl bg-lime-400 py-3 font-bold text-black hover:bg-lime-300"
              >
                Let's go
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
