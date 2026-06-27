import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Users, Clock, CheckCircle2, Phone, Mail } from 'lucide-react';
import { timeSlots, fullSlots, brand } from './data';

type Errors = Partial<Record<'name' | 'email' | 'date' | 'time', string>>;

export default function ReservationView() {
  const today = new Date().toISOString().split('T')[0];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [party, setParty] = useState(2);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Errors = {};
    if (name.trim().length < 2) errs.name = 'Please tell us your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = 'Enter a valid email';
    if (!date) errs.date = 'Pick a date';
    else if (date < today) errs.date = 'Date must be in the future';
    if (!time) errs.time = 'Pick a time';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setDone(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (done) {
    return (
      <div className="bg-[#140d07] min-h-screen pt-32 pb-24 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto rounded-3xl bg-[#1a120b] border border-emerald-500/30 p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }}>
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-amber-50 mt-5">Table booked!</h1>
          <p className="text-amber-100/70 mt-2">See you soon, {name.split(' ')[0]}.</p>
          <div className="mt-6 rounded-2xl bg-amber-500/10 p-5 text-left space-y-2 text-amber-100/80">
            <div className="flex justify-between"><span>Date</span><span className="font-semibold text-amber-50">{new Date(date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
            <div className="flex justify-between"><span>Time</span><span className="font-semibold text-amber-50">{time}</span></div>
            <div className="flex justify-between"><span>Party</span><span className="font-semibold text-amber-50">{party} guest{party > 1 ? 's' : ''}</span></div>
          </div>
          <p className="text-sm text-amber-100/50 mt-4">A confirmation has been sent to {email}. We hold tables for 15 minutes.</p>
          <a href="/demo/restaurants/" className="mt-7 inline-block rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white">Back home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#140d07] min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
        {/* info side */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200 mb-5">
            <CalendarCheck className="w-3.5 h-3.5" /> Reservations
          </span>
          <h1 className="font-serif text-4xl font-bold text-amber-50">Reserve your table</h1>
          <p className="mt-4 text-amber-100/70 leading-relaxed">
            Weekends book out fast — secure your spot at {brand.name}. For parties over 8 or private dining, reach us directly.
          </p>
          <div className="mt-6 space-y-3 text-amber-100/70">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" /> {brand.phone}</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400" /> {brand.email}</p>
          </div>
          <div className="mt-8 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <p className="text-amber-200 font-semibold text-sm">Good to know</p>
            <ul className="mt-2 space-y-1.5 text-sm text-amber-100/70 list-disc list-inside">
              <li>Closed Mondays</li>
              <li>Last seating 30 min before close</li>
              <li>Allergies? Note them below — we adapt most dishes</li>
            </ul>
          </div>
        </motion.div>

        {/* form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="rounded-3xl bg-[#1a120b] border border-amber-500/20 p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-amber-100/70 mb-1.5">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50" placeholder="Jane Doe" />
              {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm text-amber-100/70 mb-1.5">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50" placeholder="you@email.com" />
              {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-amber-100/70 mb-1.5">Date</label>
              <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-amber-500/10 text-amber-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50 [color-scheme:dark]" />
              {errors.date && <p className="text-rose-400 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm text-amber-100/70 mb-1.5 flex items-center gap-1"><Users className="w-4 h-4" /> Party size</label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setParty((p) => Math.max(1, p - 1))} className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-200 font-bold">−</button>
                <span className="flex-1 text-center font-semibold text-amber-50 bg-amber-500/5 rounded-xl py-2.5">{party}</span>
                <button type="button" onClick={() => setParty((p) => Math.min(8, p + 1))} className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-200 font-bold">+</button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-amber-100/70 mb-1.5 flex items-center gap-1"><Clock className="w-4 h-4" /> Time</label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((t) => {
                const full = fullSlots.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    disabled={full}
                    onClick={() => setTime(t)}
                    className={`rounded-xl py-2 text-sm font-medium border transition ${
                      full
                        ? 'border-amber-500/10 text-amber-100/25 line-through cursor-not-allowed'
                        : time === t
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white border-transparent'
                        : 'border-amber-500/30 text-amber-100/80 hover:bg-amber-500/10'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            {errors.time && <p className="text-rose-400 text-xs mt-1">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-sm text-amber-100/70 mb-1.5">Notes / allergies (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50 resize-none" placeholder="Window table, nut allergy, celebrating..." />
          </div>

          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-900/30 hover:brightness-110 transition">
            Confirm reservation
          </button>
          <p className="text-[11px] text-amber-100/40 text-center">Demo only — no real booking is made.</p>
        </motion.form>
      </div>
    </div>
  );
}
