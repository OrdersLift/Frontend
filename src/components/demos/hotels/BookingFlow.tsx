import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Search, CheckCircle2, ArrowLeft, Tag } from 'lucide-react';
import { rooms, unavailableRoomIds, type Room } from './data';
import RoomCard from './RoomCard';

type Step = 'search' | 'results' | 'confirm' | 'done';

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const d = (new Date(b).getTime() - new Date(a).getTime()) / 86400000;
  return d > 0 ? Math.round(d) : 0;
}

const today = new Date().toISOString().split('T')[0];

export default function BookingFlow() {
  const [step, setStep] = useState<Step>('search');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Room | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formErr, setFormErr] = useState('');
  const [confCode, setConfCode] = useState('');

  const nights = nightsBetween(checkIn, checkOut);
  const soldOut = useMemo(() => unavailableRoomIds(checkIn), [checkIn]);

  const available = useMemo(
    () => rooms.filter((r) => r.maxGuests >= guests),
    [guests]
  );

  const runSearch = () => {
    setError('');
    if (!checkIn || !checkOut) return setError('Please choose both check-in and check-out dates.');
    if (nights <= 0) return setError('Check-out must be after check-in.');
    setStep('results');
  };

  const pick = (room: Room) => {
    setSelected(room);
    setStep('confirm');
  };

  const confirm = () => {
    setFormErr('');
    if (!name.trim()) return setFormErr('Please enter your name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setFormErr('Please enter a valid email.');
    setConfCode('MM-' + Math.random().toString(36).slice(2, 7).toUpperCase());
    setStep('done');
  };

  const subtotal = selected ? selected.price * nights : 0;
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal - discount;

  return (
    <div className="rounded-3xl bg-white border border-stone-200 shadow-lg overflow-hidden">
      {/* Search bar */}
      <div className="bg-[#1c2b24] p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Check-in" icon={<Calendar className="w-4 h-4" />}>
            <input type="date" min={today} value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent text-amber-50 focus:outline-none text-sm" />
          </Field>
          <Field label="Check-out" icon={<Calendar className="w-4 h-4" />}>
            <input type="date" min={checkIn || today} value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-amber-50 focus:outline-none text-sm" />
          </Field>
          <Field label="Guests" icon={<Users className="w-4 h-4" />}>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-amber-50 focus:outline-none text-sm">
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="text-stone-800">{n} guest{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </Field>
          <button onClick={runSearch}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24] font-semibold py-3 hover:from-amber-300 hover:to-orange-400 transition">
            <Search className="w-4 h-4" /> Search rooms
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        {nights > 0 && !error && (
          <p className="mt-3 text-sm text-emerald-200/80">
            {nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''} · direct-booking gets 10% off
          </p>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-8 bg-[#fbf7ef]">
        <AnimatePresence mode="wait">
          {step === 'search' && (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-10 text-stone-500">
              <p className="text-lg font-serif text-stone-700">Find your perfect retreat</p>
              <p className="text-sm mt-1">Choose your dates and number of guests above to see live availability.</p>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="r" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-2xl text-stone-800">
                  {available.filter((r) => !soldOut.includes(r.id)).length} rooms available
                </h3>
                <span className="text-sm text-stone-500">{nights} night{nights > 1 ? 's' : ''}</span>
              </div>
              {available.length === 0 ? (
                <p className="text-stone-500 py-8 text-center">No rooms fit {guests} guests — try fewer guests.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {available.map((r, i) => (
                    <RoomCard key={r.id} room={r} index={i} ctaLabel="Select & continue"
                      disabled={soldOut.includes(r.id)} onSelect={pick} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 'confirm' && selected && (
            <motion.div key="c" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto">
              <button onClick={() => setStep('results')}
                className="flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to rooms
              </button>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`rounded-2xl bg-gradient-to-br ${selected.gradient} h-40 flex items-center justify-center text-6xl`}>
                  {selected.emoji}
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-stone-800">{selected.name}</h3>
                  <p className="text-sm text-stone-500 italic mb-3">{selected.tagline}</p>
                  <div className="space-y-1.5 text-sm text-stone-600 border-t border-stone-200 pt-3">
                    <Row label="Check-in" value={checkIn} />
                    <Row label="Check-out" value={checkOut} />
                    <Row label="Guests" value={`${guests}`} />
                    <Row label={`$${selected.price} × ${nights} night${nights > 1 ? 's' : ''}`} value={`$${subtotal}`} />
                    <Row label={<span className="flex items-center gap-1 text-emerald-700"><Tag className="w-3.5 h-3.5" />Direct booking −10%</span>} value={`−$${discount}`} />
                    <div className="flex justify-between pt-2 border-t border-stone-200 font-semibold text-stone-800 text-base">
                      <span>Total</span><span>${total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                  className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address"
                  className="px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              {formErr && <p className="mt-2 text-sm text-rose-500">{formErr}</p>}
              <button onClick={confirm}
                className="mt-4 w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24] font-semibold hover:from-amber-300 hover:to-orange-400 transition">
                Confirm booking · ${total}
              </button>
              <p className="mt-2 text-center text-xs text-stone-400">No card needed for this demo. Free cancellation up to 48h before arrival.</p>
            </motion.div>
          )}

          {step === 'done' && selected && (
            <motion.div key="d" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-3xl text-stone-800 mt-4">You're all booked!</h3>
              <p className="text-stone-500 mt-2">
                We can't wait to welcome you, {name.split(' ')[0]}. A confirmation is on its way to {email}.
              </p>
              <div className="mt-6 rounded-2xl bg-white border border-stone-200 p-5 text-left text-sm text-stone-600 space-y-1.5">
                <Row label="Confirmation" value={<span className="font-mono font-semibold text-stone-800">{confCode}</span>} />
                <Row label="Room" value={selected.name} />
                <Row label="Dates" value={`${checkIn} → ${checkOut}`} />
                <Row label="Guests" value={`${guests}`} />
                <Row label="Total" value={<span className="font-semibold text-stone-800">${total}</span>} />
              </div>
              <button onClick={() => { setStep('search'); setSelected(null); setName(''); setEmail(''); }}
                className="mt-6 text-sm text-emerald-700 hover:text-emerald-900 underline underline-offset-2">
                Make another booking
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block rounded-xl bg-emerald-950/40 border border-emerald-800/50 px-3 py-2">
      <span className="flex items-center gap-1.5 text-xs text-amber-300/90 mb-0.5">{icon}{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-stone-500">{label}</span>
      <span className="text-stone-700 text-right">{value}</span>
    </div>
  );
}
