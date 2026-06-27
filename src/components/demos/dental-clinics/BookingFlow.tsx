import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, CalendarCheck, Stethoscope, Clock, User, PartyPopper } from 'lucide-react';
import { treatments, dentists, timeSlots } from './data';

const steps = ['Treatment', 'Dentist', 'Date & Time', 'Your Details'];

function nextDays(n: number) {
  const out: { label: string; date: string }[] = [];
  const d = new Date();
  for (let i = 1; out.length < n; i++) {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    if (day.getDay() === 0) continue; // skip Sundays
    out.push({
      label: day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      date: day.toISOString().slice(0, 10),
    });
  }
  return out;
}

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState('');
  const [dentist, setDentist] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const days = nextDays(6);

  const canNext = () => {
    if (step === 0) return !!treatment;
    if (step === 1) return !!dentist;
    if (step === 2) return !!date && !!time;
    return true;
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email.';
    if (phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (validateDetails()) setDone(true);
  };

  const selT = treatments.find((t) => t.id === treatment);
  const selD = dentists.find((d) => d.id === dentist);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center bg-white rounded-3xl shadow-xl border border-teal-100 p-8 sm:p-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.15 }}
          className="mx-auto w-16 h-16 grid place-items-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white mb-5"
        >
          <PartyPopper className="w-8 h-8" />
        </motion.div>
        <h3 className="font-display font-extrabold text-2xl text-slate-800">You're booked!</h3>
        <p className="text-slate-500 mt-2">
          A confirmation is on its way to <span className="font-medium text-slate-700">{email}</span>.
        </p>

        <div className="mt-6 text-left bg-teal-50 rounded-2xl p-5 space-y-2.5 text-sm">
          <Row label="Treatment" value={selT?.name} />
          <Row label="Dentist" value={selD?.name} />
          <Row label="Date" value={days.find((d) => d.date === date)?.label} />
          <Row label="Time" value={`${time} ${Number(time.split(':')[0]) < 8 ? 'PM' : time.startsWith('1') || time.startsWith('2') || time.startsWith('4') ? 'PM' : 'AM'}`} />
          <Row label="Name" value={name} />
        </div>

        <button
          onClick={() => {
            setDone(false); setStep(0); setTreatment(''); setDentist(''); setDate(''); setTime(''); setName(''); setEmail(''); setPhone('');
          }}
          className="mt-6 px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
        >
          Book another appointment
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 grid place-items-center rounded-full text-sm font-semibold transition-colors ${
                  i < step
                    ? 'bg-teal-500 text-white'
                    : i === step
                    ? 'bg-teal-100 text-teal-700 ring-2 ring-teal-500'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`mt-1.5 text-[11px] font-medium hidden sm:block ${i <= step ? 'text-slate-700' : 'text-slate-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded ${i < step ? 'bg-teal-500' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-teal-100 p-6 sm:p-8 min-h-[22rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            {step === 0 && (
              <>
                <Heading icon={<Stethoscope className="w-5 h-5" />} title="What do you need?" />
                <div className="grid sm:grid-cols-2 gap-3">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTreatment(t.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        treatment === t.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{t.duration} · from ${t.priceFrom}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <Heading icon={<User className="w-5 h-5" />} title="Choose your dentist" />
                <div className="grid gap-3">
                  {dentists.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDentist(d.id)}
                      className={`flex items-center gap-4 text-left p-4 rounded-2xl border-2 transition-all ${
                        dentist === d.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <span className={`grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br ${d.accent} text-white font-bold shrink-0`}>
                        {d.initials}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{d.name}</p>
                        <p className="text-xs text-slate-500">{d.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Heading icon={<Clock className="w-5 h-5" />} title="Pick a date & time" />
                <p className="text-xs font-medium text-slate-500 mb-2">Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {days.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => setDate(d.date)}
                      className={`shrink-0 px-4 py-3 rounded-2xl border-2 text-sm font-medium transition-all ${
                        date === d.date ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600 hover:border-teal-300'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-500 mt-5 mb-2">Time</p>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => {
                    const pm = ['1:00', '2:30', '4:00'].includes(t);
                    return (
                      <button
                        key={t}
                        disabled={!date}
                        onClick={() => setTime(t)}
                        className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all disabled:opacity-40 ${
                          time === t ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600 hover:border-teal-300'
                        }`}
                      >
                        {t} {pm ? 'PM' : 'AM'}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <Heading icon={<CalendarCheck className="w-5 h-5" />} title="Almost done" />
                <div className="space-y-4">
                  <Field label="Full name" value={name} onChange={setName} error={errors.name} placeholder="Jane Doe" />
                  <Field label="Email" value={email} onChange={setEmail} error={errors.email} placeholder="jane@email.com" type="email" />
                  <Field label="Phone" value={phone} onChange={setPhone} error={errors.phone} placeholder="(415) 555-0100" type="tel" />
                </div>
                <div className="mt-5 bg-teal-50 rounded-2xl p-4 text-sm text-slate-600 space-y-1">
                  <p><span className="font-semibold text-slate-800">{selT?.name}</span> with {selD?.name}</p>
                  <p>{days.find((d) => d.date === date)?.label} at {time}</p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-0 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        {step < 3 ? (
          <button
            onClick={() => canNext() && setStep((s) => s + 1)}
            disabled={!canNext()}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow-md disabled:opacity-40 hover:-translate-y-0.5 transition-all"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow-md hover:-translate-y-0.5 transition-all"
          >
            Confirm booking <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Heading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h3 className="flex items-center gap-2 font-display font-bold text-xl text-slate-800 mb-5">
      <span className="text-teal-600">{icon}</span> {title}
    </h3>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800 text-right">{value}</span>
    </div>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors ${
          error ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-teal-400'
        }`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
