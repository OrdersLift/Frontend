import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, CalendarHeart, Clock, User, Stethoscope, PartyPopper } from 'lucide-react';
import { treatments, practitioners, timeSlots } from './data';

const days = (() => {
  const out: { label: string; sub: string; value: string }[] = [];
  const base = new Date('2026-06-29T00:00:00');
  for (let i = 0; i < 6; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      sub: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: d.toISOString().slice(0, 10),
    });
  }
  return out;
})();

const steps = ['Treatment', 'Practitioner', 'Date & Time', 'Your Details'];

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState<string | null>(null);
  const [pract, setPract] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const selTreatment = treatments.find((t) => t.id === treatment);
  const selPract = practitioners.find((p) => p.id === pract);
  const selDay = days.find((d) => d.value === day);

  const canNext =
    (step === 0 && treatment) ||
    (step === 1 && pract) ||
    (step === 2 && day && slot) ||
    step === 3;

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = 'Please enter your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (validate()) setConfirmed(true);
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 p-8 sm:p-12 text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-6"
        >
          <PartyPopper className="w-10 h-10" />
        </motion.div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-800 mb-2">You’re all booked, {name.split(' ')[0]}!</h2>
        <p className="text-slate-500 mb-8">A confirmation has been sent to <span className="font-medium text-slate-700">{email}</span>. We can’t wait to see you.</p>

        <div className="text-left bg-emerald-50/60 rounded-2xl border border-emerald-100 p-6 space-y-3 mb-8">
          <Row label="Treatment" value={`${selTreatment?.name} · ${selTreatment?.duration}`} />
          <Row label="Practitioner" value={selPract?.name ?? ''} />
          <Row label="When" value={`${selDay?.label} ${selDay?.sub} at ${slot}`} />
          <Row label="Estimated fee" value={`$${selTreatment?.price}`} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/demo/clinics-physio/" className="px-6 py-3 rounded-full font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">Back to home</a>
          <button
            onClick={() => {
              setConfirmed(false); setStep(0); setTreatment(null); setPract(null); setDay(null); setSlot(null); setName(''); setEmail(''); setPhone('');
            }}
            className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg transition-shadow"
          >
            Book another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 shadow-xl shadow-emerald-900/5 p-6 sm:p-8 max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`mt-1.5 text-[10px] sm:text-xs font-medium hidden sm:block ${i === step ? 'text-emerald-700' : 'text-slate-400'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 mx-1 sm:mx-2 ${i < step ? 'bg-emerald-400' : 'bg-slate-100'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
          {step === 0 && (
            <div>
              <Heading icon={<Stethoscope className="w-5 h-5" />} title="Which treatment?" />
              <div className="grid sm:grid-cols-2 gap-3">
                {treatments.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTreatment(t.id)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      treatment === t.id ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.duration} · ${t.price}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <Heading icon={<User className="w-5 h-5" />} title="Choose your practitioner" />
              <div className="space-y-3">
                {practitioners.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPract(p.id)}
                    className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      pract === p.id ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <span className={`w-12 h-12 rounded-full bg-gradient-to-br ${p.hue} text-white flex items-center justify-center font-semibold`}>{p.initials}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Heading icon={<CalendarHeart className="w-5 h-5" />} title="Pick a date" />
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                {days.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDay(d.value)}
                    className={`py-3 rounded-xl border text-center transition-all ${
                      day === d.value ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <p className="text-xs font-medium text-slate-500">{d.label}</p>
                    <p className="text-sm font-semibold text-slate-800">{d.sub}</p>
                  </button>
                ))}
              </div>
              <Heading icon={<Clock className="w-5 h-5" />} title="And a time" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSlot(t)}
                    className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      slot === t ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-200 text-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <Heading icon={<User className="w-5 h-5" />} title="Your details" />
              <div className="space-y-4">
                <Field label="Full name" value={name} onChange={setName} error={errors.name} placeholder="Jordan Lee" />
                <Field label="Email" value={email} onChange={setEmail} error={errors.email} placeholder="you@email.com" type="email" />
                <Field label="Phone" value={phone} onChange={setPhone} error={errors.phone} placeholder="(415) 555-0100" type="tel" />
              </div>
              <div className="mt-6 bg-emerald-50/60 rounded-2xl border border-emerald-100 p-4 text-sm space-y-1.5">
                <p className="font-semibold text-slate-700 mb-1">Booking summary</p>
                <p className="text-slate-600">{selTreatment?.name} with {selPract?.name}</p>
                <p className="text-slate-600">{selDay?.label} {selDay?.sub} at {slot} · est. ${selTreatment?.price}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full font-medium text-slate-500 disabled:opacity-0 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        {step < 3 ? (
          <button
            onClick={() => canNext && setStep((s) => s + 1)}
            disabled={!canNext}
            className="inline-flex items-center gap-1 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 disabled:opacity-40 hover:shadow-lg transition-all"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg transition-all"
          >
            <Check className="w-4 h-4" /> Confirm booking
          </button>
        )}
      </div>
    </div>
  );
}

function Heading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600">{icon}</span>
      <h3 className="font-display font-bold text-lg text-slate-800">{title}</h3>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all ${
          error ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-emerald-300 focus:border-emerald-400'
        }`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800 text-right">{value}</span>
    </div>
  );
}
