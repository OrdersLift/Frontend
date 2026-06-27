import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, Flame, AlertCircle } from 'lucide-react';
import { tiers } from './data';

interface Errors { name?: string; email?: string; phone?: string; goal?: string; }

const goals = ['Lose weight', 'Build muscle', 'Boost endurance', 'Reduce stress', 'Just getting started'];

export default function JoinForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', plan: 'forge', goal: '', start: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Tell us your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone';
    if (!form.goal) e.goal = 'Pick a goal';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setDone(true);
  };

  if (done) {
    const plan = tiers.find((t) => t.id === form.plan);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-lime-400/30 bg-zinc-900/70 p-10 text-center shadow-[0_0_40px_rgba(163,230,53,0.2)]"
      >
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-lime-400/15">
          <PartyPopper className="h-10 w-10 text-lime-400" />
        </div>
        <h2 className="font-display text-3xl font-extrabold text-white">Welcome to the tribe, {form.name.split(' ')[0]}! 🎉</h2>
        <p className="mt-3 text-zinc-400">
          Your <span className="font-bold text-lime-400">{plan?.name}</span> 3-day FREE trial is locked in.
          A coach will text {form.phone} to schedule your intro session.
        </p>
        <div className="mt-6 inline-block rounded-2xl bg-black/40 px-6 py-4 text-left text-sm">
          <p className="text-zinc-500">Goal</p>
          <p className="font-bold text-white">{form.goal}</p>
          <p className="mt-2 text-zinc-500">Plan after trial</p>
          <p className="font-bold text-white">{plan?.name} — ${plan?.monthly}/mo</p>
        </div>
        <div className="mt-7">
          <a href="/demo/gyms-fitness/classes" className="inline-block rounded-xl bg-lime-400 px-7 py-3 font-bold text-black hover:bg-lime-300">
            Book your first class
          </a>
        </div>
      </motion.div>
    );
  }

  const field = (k: keyof Errors, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold text-zinc-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={(form as any)[k]}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl bg-zinc-800/80 px-4 py-3 text-white placeholder-zinc-600 outline-none ring-1 transition focus:ring-2 ${
          errors[k] ? 'ring-rose-500/60 focus:ring-rose-500' : 'ring-white/10 focus:ring-lime-400/60'
        }`}
      />
      {errors[k] && (
        <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
          <AlertCircle className="h-3.5 w-3.5" />{errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-7 sm:p-9 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Full name', 'text', 'Alex Morgan')}
        {field('email', 'Email', 'email', 'you@email.com')}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field('phone', 'Phone', 'tel', '(415) 555-0100')}
        <div>
          <label className="block text-sm font-semibold text-zinc-300 mb-1.5">Preferred start date</label>
          <input
            type="date"
            value={form.start}
            onChange={(e) => set('start', e.target.value)}
            className="w-full rounded-xl bg-zinc-800/80 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-lime-400/60 [color-scheme:dark]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-300 mb-2">Choose your plan</label>
        <div className="grid grid-cols-3 gap-2">
          {tiers.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => set('plan', t.id)}
              className={`rounded-xl border px-3 py-3 text-center transition ${
                form.plan === t.id
                  ? 'border-lime-400 bg-lime-400/10 text-lime-300'
                  : 'border-white/10 text-zinc-400 hover:border-white/20'
              }`}
            >
              <span className="block font-display font-bold">{t.name}</span>
              <span className="text-xs">${t.monthly}/mo</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-300 mb-2">Primary goal</label>
        <div className="flex flex-wrap gap-2">
          {goals.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => set('goal', g)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                form.goal === g ? 'bg-lime-400 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {errors.goal && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
            <AlertCircle className="h-3.5 w-3.5" />{errors.goal}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-lime-400 py-4 font-display text-lg font-extrabold text-black hover:bg-lime-300 transition shadow-[0_0_25px_rgba(163,230,53,0.4)] flex items-center justify-center gap-2"
      >
        <Flame className="h-5 w-5" /> Claim My Free 3-Day Trial
      </button>
      <p className="text-center text-xs text-zinc-500">No card required · Cancel anytime · Demo form (no data is sent)</p>
    </form>
  );
}
