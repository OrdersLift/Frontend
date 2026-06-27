import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Check } from 'lucide-react';
import { brand } from './data';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [err, setErr] = useState<{ [k: string]: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: { [k: string]: string } = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid email.';
    if (form.message.trim().length < 5) er.message = 'Tell us a little more.';
    setErr(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
      {/* Info */}
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Say hello</p>
        <h2 className="font-serif text-4xl text-stone-800 mb-6">We’d love to see you</h2>
        <p className="text-stone-500 leading-relaxed mb-8 max-w-md">
          Have a question, a special occasion, or just want to say hi? Reach out — or use the booking page for instant confirmation.
        </p>

        <ul className="space-y-5 mb-10">
          <li className="flex gap-4">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-rose-50 text-rose-500 shrink-0"><MapPin className="w-5 h-5" /></span>
            <div><p className="font-medium text-stone-800">Visit</p><p className="text-sm text-stone-500">{brand.address}</p></div>
          </li>
          <li className="flex gap-4">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-rose-50 text-rose-500 shrink-0"><Phone className="w-5 h-5" /></span>
            <div><p className="font-medium text-stone-800">Call</p><p className="text-sm text-stone-500">{brand.phone}</p></div>
          </li>
          <li className="flex gap-4">
            <span className="grid place-items-center w-11 h-11 rounded-full bg-rose-50 text-rose-500 shrink-0"><Mail className="w-5 h-5" /></span>
            <div><p className="font-medium text-stone-800">Email</p><p className="text-sm text-stone-500">{brand.email}</p></div>
          </li>
        </ul>

        <div className="rounded-3xl bg-white border border-rose-100 p-6">
          <p className="font-medium text-stone-800 flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-rose-400" />Opening hours</p>
          <ul className="space-y-2 text-sm">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex justify-between text-stone-500"><span>{h.day}</span><span className="text-stone-800">{h.time}</span></li>
            ))}
          </ul>
        </div>

        {/* faux map */}
        <div className="mt-6 h-44 rounded-3xl overflow-hidden relative bg-gradient-to-br from-emerald-100 via-stone-100 to-rose-100">
          <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(120,113,108,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.15)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-rose-500 text-white shadow-lg animate-bounce">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="absolute bottom-3 left-3 text-xs bg-white/80 rounded-full px-3 py-1 text-stone-600">Maiden Lane · Union Square</span>
        </div>
      </div>

      {/* Form */}
      <div>
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white border border-rose-100 shadow-sm p-10 text-center h-full grid place-items-center"
          >
            <div>
              <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-5"><Check className="w-7 h-7" /></div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">Message sent!</h3>
              <p className="text-stone-500 text-sm">Thanks {form.name.split(' ')[0]} — we’ll be in touch within one business day.</p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="rounded-3xl bg-white border border-rose-100 shadow-sm p-8 space-y-5">
            <h3 className="font-serif text-2xl text-stone-800">Send us a note</h3>
            <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={err.name} placeholder="Jane Doe" />
            <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={err.email} placeholder="jane@email.com" />
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Message</span>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="How can we help?"
                className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
              />
              {err.message && <span className="text-xs text-rose-500 mt-1 block">{err.message}</span>}
            </label>
            <button type="submit" className="w-full rounded-full bg-stone-800 text-white font-medium py-3.5 hover:bg-rose-500 transition-colors">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder }: { label: string; value: string; onChange: (v: string) => void; error?: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
      {error && <span className="text-xs text-rose-500 mt-1 block">{error}</span>}
    </label>
  );
}
