import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, User, MessageSquare, Navigation,
} from 'lucide-react';
import { brand } from './data';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Please enter your name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Enter a valid email';
    if (form.message.trim().length < 5) err.message = 'Tell us a little more';
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };

  return (
    <div className="bg-zinc-100 text-zinc-900 min-h-screen">
      <section className="bg-zinc-950 text-white pt-32 pb-14 relative overflow-hidden">
        <div className="absolute -top-20 left-16 h-72 w-72 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold">Pop in or drop us a line</h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Free parking, a comfy waiting lounge and a friendly team. We'll always tell you straight.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10">
        {/* info + map */}
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard icon={Phone} title="Call us" lines={[brand.phone]} href="tel:01615550147" />
            <InfoCard icon={Mail} title="Email" lines={[brand.email]} href={`mailto:${brand.email}`} />
            <InfoCard icon={MapPin} title="Visit" lines={brand.address.split(', ')} />
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                  <Clock className="h-5 w-5" />
                </span>
                <h3 className="font-display font-bold">Opening hours</h3>
              </div>
              <ul className="space-y-1.5 text-sm">
                {brand.hours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span className="text-zinc-600">{h.day}</span>
                    <span className="font-mono font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* faux map */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 shadow-sm h-64">
            <div
              className="absolute inset-0 bg-zinc-200"
              style={{
                backgroundImage:
                  'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px), linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%)',
                backgroundSize: '44px 44px, 44px 44px, 100% 100%',
              }}
            />
            <div className="absolute left-1/3 top-0 bottom-0 w-6 bg-amber-300/60 -rotate-12" />
            <div className="absolute left-0 right-0 top-1/2 h-5 bg-zinc-300/70" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg ring-4 ring-white animate-bounce">
                <MapPin className="h-6 w-6" />
              </span>
              <span className="mt-1 rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-bold text-amber-400 shadow">
                Ironclad Auto Works
              </span>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-white/90 backdrop-blur px-3 py-2 text-xs font-bold text-zinc-700 shadow"
            >
              <Navigation className="h-3.5 w-3.5 text-orange-600" /> Get directions
            </a>
          </div>
        </div>

        {/* form */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-lg">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-9 w-9" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-extrabold">Message sent!</h2>
                <p className="mt-2 text-zinc-600">
                  Thanks {form.name.split(' ')[0]} — we'll get back to you within one working day.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-6 rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-zinc-700 hover:bg-zinc-50"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-display text-2xl font-extrabold">Send us a message</h2>
                <p className="mt-1 text-sm text-zinc-500">Booking, quote query or just a quick question — fire away.</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mb-1.5">
                      <User className="h-4 w-4 text-zinc-400" /> Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jamie Driver"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.name ? 'border-rose-400 focus:ring-rose-500' : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500'}`}
                    />
                    {errors.name && <p className="text-sm text-rose-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mb-1.5">
                      <Mail className="h-4 w-4 text-zinc-400" /> Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500'}`}
                    />
                    {errors.email && <p className="text-sm text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 mb-1.5">
                      <MessageSquare className="h-4 w-4 text-zinc-400" /> Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help?"
                      className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 resize-none ${errors.message ? 'border-rose-400 focus:ring-rose-500' : 'border-zinc-300 focus:border-amber-500 focus:ring-amber-500'}`}
                    />
                    {errors.message && <p className="text-sm text-rose-600 mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3.5 font-bold uppercase tracking-wide text-zinc-900 hover:from-amber-300 hover:to-orange-400 transition-colors"
                  >
                    <Send className="h-4 w-4" /> Send message
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const inner = (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display font-bold">{title}</h3>
      </div>
      {lines.map((l, i) => (
        <p key={i} className="text-sm text-zinc-600 leading-relaxed">{l}</p>
      ))}
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
