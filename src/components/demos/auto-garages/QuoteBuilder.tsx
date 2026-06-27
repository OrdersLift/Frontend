import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench, Check, Car, Calendar, Clock, User, Mail, Phone, CheckCircle2,
  Plus, Minus, ShieldCheck, ArrowRight, RotateCcw,
} from 'lucide-react';
import { services, vehicleSizes, fuelTypes, timeSlots } from './data';

const todayISO = () => new Date().toISOString().split('T')[0];

export default function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>(['mot']);
  const [sizeId, setSizeId] = useState('medium');
  const [fuel, setFuel] = useState('Petrol');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', reg: '', date: todayISO(), slot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<null | { ref: string }>(null);

  const size = vehicleSizes.find((v) => v.id === sizeId)!;

  const chosen = useMemo(
    () => services.filter((s) => selected.includes(s.id)),
    [selected]
  );

  const subtotal = chosen.reduce((sum, s) => sum + s.price, 0);
  const adjusted = Math.round(subtotal * size.mult);
  const vat = Math.round(adjusted * 0.2);
  const total = adjusted + vat;

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[0-9 +()-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.reg.trim()) e.reg = 'Enter your registration';
    if (!form.slot) e.slot = 'Pick a time slot';
    if (selected.length === 0) e.services = 'Select at least one service';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const ref = 'IRN-' + Math.floor(4900 + Math.random() * 99);
    setConfirmed({ ref });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setConfirmed(null);
    setSelected(['mot']);
    setForm({ name: '', email: '', phone: '', reg: '', date: todayISO(), slot: '' });
    setErrors({});
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 min-h-screen">
      {/* header band */}
      <section className="bg-zinc-950 text-white pt-32 pb-14 relative overflow-hidden">
        <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Quote & Book</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold">
            Instant estimate, instant booking
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Pick your services and vehicle, see a live price, then lock in a slot. No payment needed today.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {confirmed ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 shadow-xl text-center"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold">Booking confirmed!</h2>
              <p className="mt-2 text-zinc-600">
                Thanks {form.name.split(' ')[0]} — we've reserved your slot. A confirmation is on its way to {form.email}.
              </p>

              <div className="mt-6 rounded-2xl bg-zinc-900 p-6 text-left text-zinc-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm text-zinc-400">Your reference</span>
                  <span className="font-mono text-xl font-bold text-amber-400">{confirmed.ref}</span>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><dt className="text-zinc-400">Vehicle</dt><dd className="font-semibold">{form.reg.toUpperCase()} · {fuel}</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-400">When</dt><dd className="font-semibold">{form.date} at {form.slot}</dd></div>
                  <div className="flex justify-between"><dt className="text-zinc-400">Services</dt><dd className="font-semibold text-right">{chosen.map((s) => s.name).join(', ')}</dd></div>
                  <div className="flex justify-between border-t border-white/10 pt-2 mt-2"><dt className="text-zinc-400">Estimated total (inc. VAT)</dt><dd className="font-display text-lg font-extrabold text-amber-400">£{total}</dd></div>
                </dl>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a
                  href="/demo/auto-garages/track"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-bold uppercase tracking-wide text-zinc-900 hover:from-amber-300 hover:to-orange-400 transition-colors"
                >
                  Track this job <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-6 py-3 font-bold uppercase tracking-wide text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" /> New booking
                </button>
              </div>
              <p className="mt-4 text-xs text-zinc-400">
                Tip: try ref <span className="font-mono font-semibold">IRN-4821</span> on the tracker to see a live job.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* LEFT: selections */}
              <div className="lg:col-span-2 space-y-8">
                {/* services */}
                <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-amber-400 text-sm font-bold">1</span>
                    <h2 className="font-display text-xl font-bold">Choose your services</h2>
                  </div>
                  {errors.services && <p className="text-sm text-rose-600 ml-10 mb-2">{errors.services}</p>}
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {services.map((s) => {
                      const on = selected.includes(s.id);
                      return (
                        <button
                          type="button"
                          key={s.id}
                          onClick={() => toggle(s.id)}
                          className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                            on
                              ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                              : 'border-zinc-200 bg-white hover:border-zinc-300'
                          }`}
                        >
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded ${on ? 'bg-amber-500 text-white' : 'border border-zinc-300'}`}>
                            {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3 w-3 text-zinc-400" />}
                          </span>
                          <span className="flex-1">
                            <span className="block font-semibold text-sm">{s.name}</span>
                            <span className="block text-xs text-zinc-500">£{s.price}{s.unit ? ` ${s.unit}` : ''} · {s.duration}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* vehicle */}
                <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-amber-400 text-sm font-bold">2</span>
                    <h2 className="font-display text-xl font-bold">Your vehicle</h2>
                  </div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Vehicle size</label>
                  <div className="grid gap-2">
                    {vehicleSizes.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => setSizeId(v.id)}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition-all ${
                          sizeId === v.id ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-zinc-200 hover:border-zinc-300'
                        }`}
                      >
                        <Car className={`h-5 w-5 ${sizeId === v.id ? 'text-amber-600' : 'text-zinc-400'}`} />
                        <span className="flex-1 font-medium">{v.label}</span>
                        <span className="text-xs font-mono text-zinc-500">×{v.mult}</span>
                      </button>
                    ))}
                  </div>
                  <label className="block text-sm font-semibold text-zinc-700 mt-4 mb-1.5">Fuel type</label>
                  <div className="flex flex-wrap gap-2">
                    {fuelTypes.map((f) => (
                      <button
                        type="button"
                        key={f}
                        onClick={() => setFuel(f)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                          fuel === f ? 'bg-zinc-900 text-amber-400' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* details */}
                <div className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-amber-400 text-sm font-bold">3</span>
                    <h2 className="font-display text-xl font-bold">Your details & slot</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field icon={User} label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} placeholder="Jamie Driver" />
                    <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} placeholder="you@email.com" />
                    <Field icon={Phone} label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} placeholder="07700 900000" />
                    <Field icon={Car} label="Registration" value={form.reg} onChange={(v) => setForm({ ...form, reg: v.toUpperCase() })} error={errors.reg} placeholder="AB12 CDE" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mb-1.5">
                        <Calendar className="h-4 w-4 text-zinc-400" /> Date
                      </label>
                      <input
                        type="date"
                        min={todayISO()}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mb-1.5">
                        <Clock className="h-4 w-4 text-zinc-400" /> Time slot
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setForm({ ...form, slot: t })}
                            className={`rounded-lg px-3 py-2 text-sm font-mono font-semibold transition-colors ${
                              form.slot === t ? 'bg-amber-500 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {errors.slot && <p className="text-sm text-rose-600 mt-1">{errors.slot}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-40 rounded-2xl border border-zinc-200 bg-white p-6 shadow-lg">
                  <h3 className="font-display text-lg font-bold flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-amber-500" /> Your estimate
                  </h3>
                  <div className="mt-4 space-y-2 text-sm">
                    {chosen.length === 0 && <p className="text-zinc-400">No services selected yet.</p>}
                    {chosen.map((s) => (
                      <div key={s.id} className="flex justify-between gap-2">
                        <span className="text-zinc-600">{s.name}</span>
                        <span className="font-semibold">£{s.price}</span>
                      </div>
                    ))}
                  </div>
                  {chosen.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm">
                      <Row label="Subtotal" value={`£${subtotal}`} />
                      <Row label={`Vehicle factor (${size.label.split(' ')[0]})`} value={`×${size.mult}`} muted />
                      <Row label="Net" value={`£${adjusted}`} />
                      <Row label="VAT (20%)" value={`£${vat}`} muted />
                      <div className="flex justify-between items-end border-t border-zinc-200 pt-3 mt-1">
                        <span className="font-display font-bold">Total</span>
                        <span className="font-display text-2xl font-extrabold text-zinc-900">£{total}</span>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3.5 font-bold uppercase tracking-wide text-zinc-900 hover:from-amber-300 hover:to-orange-400 transition-colors"
                  >
                    Confirm booking <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Estimate only — no payment today
                  </p>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={muted ? 'text-zinc-400' : 'text-zinc-600'}>{label}</span>
      <span className={muted ? 'text-zinc-400 font-mono' : 'font-semibold'}>{value}</span>
    </div>
  );
}

function Field({
  icon: Icon, label, value, onChange, error, placeholder, type = 'text',
}: {
  icon: any; label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mb-1.5">
        <Icon className="h-4 w-4 text-zinc-400" /> {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${
          error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500'
        }`}
      />
      {error && <p className="text-sm text-rose-600 mt-1">{error}</p>}
    </div>
  );
}
