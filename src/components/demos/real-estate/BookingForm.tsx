import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, User, Mail, Phone, Home, Video, MapPin, RotateCcw } from 'lucide-react';
import { listings } from './data';

const times = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'date' | 'time', string>>;

export default function BookingForm({ presetProperty }: { presetProperty?: string }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    property: presetProperty ?? listings[0].id,
    mode: 'In person' as 'In person' | 'Video',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState<typeof form | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (presetProperty) return;
    const p = new URLSearchParams(window.location.search).get('property');
    if (p && listings.some((l) => l.id === p)) setForm((f) => ({ ...f, property: p }));
  }, []);

  const validate = (): boolean => {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number';
    if (!form.date) e.date = 'Choose a date';
    if (!form.time) e.time = 'Choose a time';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setConfirmed(form);
  };

  const selectedProp = listings.find((l) => l.id === form.property);
  const minDate = new Date().toISOString().split('T')[0];

  if (confirmed) {
    const prop = listings.find((l) => l.id === confirmed.property);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto rounded-2xl bg-white border border-emerald-100 shadow-xl overflow-hidden"
      >
        <div className="bg-[#0b1f17] p-8 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-500/20 blur-3xl" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="mx-auto w-16 h-16 grid place-items-center rounded-full bg-emerald-400 text-[#0b1f17] mb-4"
          >
            <CheckCircle2 className="w-9 h-9" />
          </motion.div>
          <h2 className="font-serif text-2xl text-emerald-50">Viewing requested</h2>
          <p className="text-sm text-emerald-100/70 mt-1">A confirmation has been sent to {confirmed.email}</p>
        </div>
        <div className="p-8 space-y-3 text-sm">
          <Row label="Reference" value={'AUR-' + Math.floor(100000 + Math.random() * 899999)} />
          <Row label="Property" value={prop ? `${prop.title}, ${prop.city}` : '—'} />
          <Row label="Type" value={confirmed.mode === 'Video' ? 'Private video viewing' : 'In-person viewing'} />
          <Row label="When" value={`${new Date(confirmed.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at ${confirmed.time}`} />
          <Row label="Name" value={confirmed.name} />
          <Row label="Phone" value={confirmed.phone} />
          {confirmed.notes && <Row label="Notes" value={confirmed.notes} />}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a href="/demo/real-estate/listings" className="flex-1 text-center py-3 rounded-lg font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 transition">
              Browse more homes
            </a>
            <button onClick={() => { setConfirmed(null); setForm((f) => ({ ...f, date: '', time: '', notes: '' })); }} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition">
              <RotateCcw className="w-4 h-4" /> Book another
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto rounded-2xl bg-white border border-emerald-100 shadow-sm p-6 sm:p-8">
      <h2 className="font-serif text-2xl text-slate-800 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-emerald-600" /> Arrange a viewing
      </h2>
      <p className="text-sm text-slate-500 mt-1 mb-6">7 days a week, in person or by private video tour.</p>

      <Field label="Property" icon={<Home className="w-4 h-4" />}>
        <select value={form.property} onChange={(e) => set('property', e.target.value)} className="field-input">
          {listings.map((l) => <option key={l.id} value={l.id}>{l.title} — {l.city}</option>)}
        </select>
      </Field>

      {selectedProp && (
        <div className={`-mt-2 mb-5 flex items-center gap-3 rounded-lg p-3 bg-gradient-to-r ${selectedProp.gradient}`}>
          <span className="text-white/90 text-sm font-medium flex items-center gap-1.5"><MapPin className="w-4 h-4" />{selectedProp.address}, {selectedProp.lat}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" icon={<User className="w-4 h-4" />} error={errors.name}>
          <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Smith" className="field-input" />
        </Field>
        <Field label="Phone" icon={<Phone className="w-4 h-4" />} error={errors.phone}>
          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="07700 900123" className="field-input" />
        </Field>
      </div>

      <Field label="Email" icon={<Mail className="w-4 h-4" />} error={errors.email}>
        <input value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="jane@email.com" className="field-input" />
      </Field>

      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Viewing type</label>
        <div className="grid grid-cols-2 gap-2">
          {([['In person', <MapPin className="w-4 h-4" key="m" />], ['Video', <Video className="w-4 h-4" key="v" />]] as const).map(([m, ic]) => (
            <button type="button" key={m} onClick={() => set('mode', m)} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${form.mode === m ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
              {ic} {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Date" error={errors.date}>
          <input type="date" min={minDate} value={form.date} onChange={(e) => set('date', e.target.value)} className="field-input" />
        </Field>
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Time {errors.time && <span className="text-rose-500 normal-case font-normal tracking-normal">— {errors.time}</span>}</label>
          <div className="grid grid-cols-3 gap-1.5">
            {times.map((t) => (
              <button type="button" key={t} onClick={() => set('time', t)} className={`py-2 rounded-lg text-sm font-medium transition ${form.time === t ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Field label="Notes (optional)">
        <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="Anything we should know?" className="field-input resize-none" />
      </Field>

      <button type="submit" className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 hover:to-teal-300 shadow-lg shadow-emerald-900/20 transition">
        Confirm viewing request
      </button>

      <style>{`
        .field-input{width:100%;padding:0.625rem 0.875rem;border-radius:0.5rem;background:rgba(236,253,245,0.5);border:1px solid #d1fae5;color:#334155;font-size:0.875rem;outline:none}
        .field-input:focus{box-shadow:0 0 0 2px #6ee7b7}
      `}</style>
    </form>
  );
}

function Field({ label, icon, error, children }: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        {icon && <span className="text-emerald-500">{icon}</span>}
        {label}
        {error && <span className="text-rose-500 normal-case font-normal tracking-normal">— {error}</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-emerald-50 pb-2">
      <span className="text-slate-400 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-slate-800 font-medium text-right">{value}</span>
    </div>
  );
}
