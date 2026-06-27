import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Clock, CalendarCheck, Scissors, User, CalendarDays, Sparkles } from 'lucide-react';
import { serviceCategories, stylists, timeSlots } from './data';

const allServices = serviceCategories.flatMap((c) =>
  c.items.map((i) => ({ ...i, category: c.name, catId: c.id })),
);

const steps = ['Service', 'Stylist', 'Date & Time', 'Details'];

function nextDays(n: number) {
  const out: { label: string; sub: string; iso: string }[] = [];
  const base = new Date('2026-06-29T00:00:00');
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      sub: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      iso: d.toISOString().slice(0, 10),
    });
  }
  return out;
}
const days = nextDays(6);

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<typeof allServices[number] | null>(null);
  const [stylist, setStylist] = useState<typeof stylists[number] | null>(null);
  const [day, setDay] = useState<typeof days[number] | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [confirmed, setConfirmed] = useState(false);

  const canNext =
    (step === 0 && service) ||
    (step === 1 && stylist) ||
    (step === 2 && day && slot) ||
    step === 3;

  const validateAndConfirm = () => {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[\d\s()+-]{7,}$/.test(phone.trim())) e.phone = 'Enter a valid phone number.';
    setErrors(e);
    if (Object.keys(e).length === 0) setConfirmed(true);
  };

  const reset = () => {
    setStep(0); setService(null); setStylist(null); setDay(null);
    setSlot(null); setName(''); setPhone(''); setErrors({}); setConfirmed(false);
  };

  if (confirmed && service && stylist && day && slot) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-white border border-rose-100 shadow-lg p-8 sm:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-5"
        >
          <Check className="w-8 h-8" />
        </motion.div>
        <h3 className="font-serif text-3xl text-stone-800 mb-2">You’re booked!</h3>
        <p className="text-stone-500 mb-7">A confirmation has been sent to {name.split(' ')[0]}. We can’t wait to see you.</p>

        <div className="text-left max-w-sm mx-auto rounded-2xl bg-[#fbf7f3] border border-rose-100 p-6 space-y-3">
          <Row icon={<Scissors className="w-4 h-4" />} label="Service" value={`${service.name} · $${service.price}`} />
          <Row icon={<User className="w-4 h-4" />} label="Stylist" value={stylist.name} />
          <Row icon={<CalendarDays className="w-4 h-4" />} label="Date" value={`${day.label}, ${day.sub}`} />
          <Row icon={<Clock className="w-4 h-4" />} label="Time" value={slot} />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4" /> You earned {service.price} Lumière points
        </div>

        <div className="mt-8">
          <button onClick={reset} className="text-sm text-stone-500 underline hover:text-rose-500">
            Book another appointment
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-rose-100 shadow-lg overflow-hidden">
      {/* Stepper */}
      <div className="flex border-b border-rose-100 bg-[#fbf7f3]">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 px-2 py-4 text-center relative">
            <div className={`mx-auto mb-1.5 grid place-items-center w-7 h-7 rounded-full text-xs font-semibold transition-colors ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-rose-400 text-white' : 'bg-rose-100 text-rose-400'
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[11px] sm:text-xs font-medium ${i === step ? 'text-stone-800' : 'text-stone-400'}`}>{s}</span>
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8 min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {allServices.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setService(s)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      service?.name === s.name
                        ? 'border-rose-400 bg-rose-50 ring-1 ring-rose-300'
                        : 'border-stone-200 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-medium text-stone-800">{s.name}</span>
                      <span className="text-rose-500 font-semibold shrink-0">${s.price}</span>
                    </div>
                    <p className="text-xs text-stone-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{s.duration} min · {s.category}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {stylists.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStylist(st)}
                    className={`flex items-center gap-4 text-left p-4 rounded-2xl border transition-all ${
                      stylist?.id === st.id
                        ? 'border-rose-400 bg-rose-50 ring-1 ring-rose-300'
                        : 'border-stone-200 hover:border-rose-200'
                    }`}
                  >
                    <span className={`grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br ${st.gradient} text-stone-700 font-serif text-lg shrink-0`}>
                      {st.initials}
                    </span>
                    <div>
                      <p className="font-medium text-stone-800">{st.name}</p>
                      <p className="text-xs text-stone-400">{st.role}</p>
                      <p className="text-xs text-amber-500 mt-0.5">★ {st.rating} · {st.reviews} reviews</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-sm font-medium text-stone-700 mb-3">Choose a day</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-7">
                  {days.map((d) => (
                    <button
                      key={d.iso}
                      onClick={() => setDay(d)}
                      className={`py-3 rounded-2xl border text-center transition-all ${
                        day?.iso === d.iso ? 'border-rose-400 bg-rose-50 ring-1 ring-rose-300' : 'border-stone-200 hover:border-rose-200'
                      }`}
                    >
                      <span className="block text-xs text-stone-400">{d.label}</span>
                      <span className="block text-sm font-medium text-stone-800">{d.sub}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm font-medium text-stone-700 mb-3">Available times</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      disabled={!day}
                      onClick={() => setSlot(t)}
                      className={`py-2.5 rounded-xl border text-sm transition-all disabled:opacity-40 ${
                        slot === t ? 'border-rose-400 bg-rose-50 text-rose-600 ring-1 ring-rose-300' : 'border-stone-200 hover:border-rose-200 text-stone-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="max-w-md mx-auto">
                <div className="rounded-2xl bg-[#fbf7f3] border border-rose-100 p-5 mb-6 space-y-2 text-sm">
                  <Row icon={<Scissors className="w-4 h-4" />} label="Service" value={`${service?.name} · $${service?.price}`} />
                  <Row icon={<User className="w-4 h-4" />} label="Stylist" value={stylist?.name ?? ''} />
                  <Row icon={<CalendarDays className="w-4 h-4" />} label="When" value={`${day?.label} ${day?.sub} · ${slot}`} />
                </div>
                <label className="block mb-4">
                  <span className="text-sm font-medium text-stone-700">Full name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="(415) 555-0100"
                  />
                  {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone}</span>}
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-t border-rose-100 bg-[#fbf7f3]">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 text-sm text-stone-500 disabled:opacity-30 hover:text-stone-800"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {step < 3 ? (
          <button
            onClick={() => canNext && setStep((s) => s + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-2 rounded-full bg-stone-800 text-white text-sm font-medium px-6 py-3 hover:bg-rose-500 transition-colors disabled:opacity-40 disabled:hover:bg-stone-800"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={validateAndConfirm}
            className="inline-flex items-center gap-2 rounded-full bg-rose-500 text-white text-sm font-medium px-6 py-3 hover:bg-rose-600 transition-colors"
          >
            <CalendarCheck className="w-4 h-4" /> Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-stone-400">{icon}{label}</span>
      <span className="text-stone-800 font-medium text-right">{value}</span>
    </div>
  );
}
