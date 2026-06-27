import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Flame } from 'lucide-react';
import { brand, hours, story } from './data';

export default function AboutView() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [err, setErr] = useState<Partial<Record<'name' | 'email' | 'msg', string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof err = {};
    if (form.name.trim().length < 2) errs.name = 'Required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Valid email required';
    if (form.msg.trim().length < 5) errs.msg = 'Tell us a little more';
    setErr(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
  };

  return (
    <div className="bg-[#140d07] min-h-screen">
      {/* hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#1a120b] to-[#140d07] border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200 mb-5">
            <Flame className="w-3.5 h-3.5" /> Since {story.founded}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">Our Story</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-5 text-amber-100/70 leading-relaxed text-lg">
            {story.text}
          </motion.p>
          <p className="mt-5 font-serif text-amber-300 italic">— {story.chef}, Founder &amp; Head Chef</p>
        </div>
      </section>

      {/* values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-3 gap-6">
        {[
          { icon: '🔥', t: 'Live fire only', s: 'Every plate touches real coals — no shortcuts, no gas.' },
          { icon: '🌶️', t: 'House-made spice', s: 'We toast and grind our own masalas daily.' },
          { icon: '🐟', t: 'Lisbon-caught', s: 'Seafood from the Tejo estuary markets each morning.' },
        ].map((v, i) => (
          <motion.div key={v.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-[#1a120b] border border-amber-500/20 p-6 text-center">
            <div className="text-4xl">{v.icon}</div>
            <h3 className="font-serif text-lg font-semibold text-amber-50 mt-3">{v.t}</h3>
            <p className="text-sm text-amber-100/60 mt-2">{v.s}</p>
          </motion.div>
        ))}
      </section>

      {/* contact + map + hours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid lg:grid-cols-2 gap-8 items-start">
        {/* left: map placeholder + details */}
        <div className="space-y-6">
          <div className="relative h-64 rounded-3xl overflow-hidden border border-amber-500/20 bg-[#1a120b]">
            {/* CSS map placeholder */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.15),transparent_60%)]" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(245,158,11,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.15) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-rose-600 text-white mx-auto animate-pulse">
                  <MapPin className="w-6 h-6" />
                </span>
                <p className="mt-2 text-amber-100/70 text-sm font-medium">Alfama, Lisbon</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-[#1a120b] border border-amber-500/20 p-6 space-y-4">
            <p className="flex items-start gap-3 text-amber-100/80"><MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />{brand.address}</p>
            <p className="flex items-center gap-3 text-amber-100/80"><Phone className="w-5 h-5 text-amber-400 shrink-0" />{brand.phone}</p>
            <p className="flex items-center gap-3 text-amber-100/80"><Mail className="w-5 h-5 text-amber-400 shrink-0" />{brand.email}</p>
          </div>
          <div className="rounded-3xl bg-[#1a120b] border border-amber-500/20 p-6">
            <h3 className="font-serif text-lg font-semibold text-amber-50 flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-amber-400" /> Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between"><span className="text-amber-100/70">{h.day}</span><span className={h.time === 'Closed' ? 'text-rose-400/80' : 'text-amber-200 font-medium'}>{h.time}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* right: contact form */}
        <div className="rounded-3xl bg-[#1a120b] border border-amber-500/20 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-amber-50">Say hello</h2>
          <p className="text-amber-100/60 mt-1 text-sm">Private dining, press or just a question — drop us a line.</p>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="mt-3 text-amber-50 font-semibold">Message sent!</p>
              <p className="text-sm text-amber-100/60 mt-1">We'll reply to {form.email} within a day.</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50" />
                {err.name && <p className="text-rose-400 text-xs mt-1">{err.name}</p>}
              </div>
              <div>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50" />
                {err.email && <p className="text-rose-400 text-xs mt-1">{err.email}</p>}
              </div>
              <div>
                <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={4} placeholder="Your message" className="w-full bg-amber-500/10 text-amber-50 placeholder-amber-200/40 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/50 resize-none" />
                {err.msg && <p className="text-rose-400 text-xs mt-1">{err.msg}</p>}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white hover:brightness-110 transition">
                Send message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
