import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Check, Clock, Car, User, MapPin, AlertCircle, CheckCircle2,
  Wrench, Receipt, ArrowRight,
} from 'lucide-react';
import { tickets, type Ticket } from './data';

export default function JobTracker() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Ticket | null>(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const lookup = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    const q = query.trim().toUpperCase();
    setSearched(true);
    if (!q) {
      setError('Please enter a reference number.');
      setResult(null);
      return;
    }
    const found = tickets.find((t) => t.ref.toUpperCase() === q || t.reg.toUpperCase() === q);
    if (found) {
      setError('');
      setResult(found);
    } else {
      setResult(null);
      setError(`No job found for "${q}". Check your reference and try again.`);
    }
  };

  const quick = (ref: string) => {
    setQuery(ref);
    const found = tickets.find((t) => t.ref === ref)!;
    setResult(found);
    setError('');
    setSearched(true);
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 min-h-screen">
      <section className="bg-zinc-950 text-white pt-32 pb-14 relative overflow-hidden">
        <div className="absolute -top-20 right-16 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Live Job Tracker</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold">Where's my car?</h1>
          <p className="mt-4 text-zinc-400">
            Enter your reference number (or registration) to see real-time progress, your assigned
            technician and an estimated ready time.
          </p>

          <form onSubmit={lookup} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. IRN-4821 or MA19 KLP"
                className="w-full rounded-lg bg-white/10 border border-white/20 pl-12 pr-4 py-3.5 text-white placeholder-zinc-500 uppercase font-mono tracking-wide outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 font-bold uppercase tracking-wide text-zinc-900 hover:from-amber-300 hover:to-orange-400 transition-colors"
            >
              Track
            </button>
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="text-zinc-500">Try:</span>
            {tickets.map((t) => (
              <button
                key={t.ref}
                onClick={() => quick(t.ref)}
                className="rounded-full border border-white/20 px-3 py-1 font-mono text-amber-300 hover:bg-white/10 transition-colors"
              >
                {t.ref}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {error && searched && (
            <motion.div
              key="err"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-4 text-rose-700"
            >
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key={result.ref}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* summary card */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-sm font-bold text-orange-600">{result.ref}</span>
                    <h2 className="font-display text-2xl font-extrabold mt-0.5">{result.vehicle}</h2>
                    <p className="text-sm text-zinc-500 font-mono mt-0.5">{result.reg}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                      result.progress === 100
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {result.progress === 100 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                    {result.statusLabel}
                  </span>
                </div>

                {/* progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs font-semibold text-zinc-500 mb-1.5">
                    <span>Progress</span>
                    <span>{result.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-zinc-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                    />
                  </div>
                </div>

                {/* meta */}
                <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                  <Meta icon={Wrench} label="Service" value={result.service} />
                  <Meta icon={User} label="Technician" value={result.tech} />
                  <Meta icon={MapPin} label="Bay" value={`Bay ${result.bay}`} />
                  <Meta icon={Clock} label="Est. ready" value={result.estReady} highlight={result.progress === 100} />
                </div>
              </div>

              {/* timeline */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold flex items-center gap-2 mb-5">
                  <Car className="h-5 w-5 text-amber-500" /> Job timeline
                </h3>
                <ol className="relative border-l-2 border-zinc-200 ml-3 space-y-6">
                  {result.stages.map((st, i) => {
                    const active = !st.done && (i === 0 || result.stages[i - 1].done);
                    return (
                      <li key={i} className="ml-6">
                        <span
                          className={`absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${
                            st.done ? 'bg-emerald-500' : active ? 'bg-amber-500' : 'bg-zinc-300'
                          }`}
                        >
                          {st.done ? (
                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                          ) : active ? (
                            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                          ) : null}
                        </span>
                        <div className="flex items-center justify-between gap-3">
                          <p className={`font-semibold ${st.done ? 'text-zinc-900' : active ? 'text-amber-700' : 'text-zinc-400'}`}>
                            {st.label}
                          </p>
                          {st.time && <span className="text-xs font-mono text-zinc-400">{st.time}</span>}
                        </div>
                        {st.note && <p className="text-sm text-zinc-500 mt-1 leading-relaxed">{st.note}</p>}
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* footer card */}
              <div className="rounded-2xl bg-zinc-900 p-6 text-white flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Receipt className="h-7 w-7 text-amber-400" />
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wide">Running total</p>
                    <p className="font-display text-2xl font-extrabold text-amber-400">£{result.cost}</p>
                  </div>
                </div>
                <a
                  href="/demo/auto-garages/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-white/5 transition-colors"
                >
                  Question about this job? <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}

          {!result && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                <Search className="h-7 w-7" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-zinc-700">Enter a reference to begin</p>
              <p className="mt-1 text-sm text-zinc-500">Your reference looks like IRN-XXXX and is on your booking confirmation.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function Meta({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-3">
      <Icon className="h-5 w-5 text-zinc-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-zinc-400 uppercase tracking-wide font-semibold">{label}</p>
        <p className={`font-semibold ${highlight ? 'text-emerald-600' : 'text-zinc-900'}`}>{value}</p>
      </div>
    </div>
  );
}
