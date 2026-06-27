import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import { storeInfo } from './data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = 'Required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'Enter a valid email';
    if (form.message.trim().length < 5) er.message = 'Tell us a little more';
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800">
      <div className="bg-gradient-to-br from-emerald-900 to-teal-800 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white">Visit & say hello</h1>
          <p className="text-emerald-200 mt-2">Questions about a plant, an order, or just want to chat greenery? We're here.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-10">
        {/* Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-5">
          {[
            { icon: MapPin, title: 'Our storefront', lines: [storeInfo.address] },
            { icon: Phone, title: 'Call us', lines: [storeInfo.phone] },
            { icon: Mail, title: 'Email', lines: [storeInfo.email] },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 rounded-3xl bg-white border border-stone-200 p-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-stone-800">{c.title}</p>
                {c.lines.map((l) => <p key={l} className="text-sm text-stone-500">{l}</p>)}
              </div>
            </div>
          ))}

          <div className="rounded-3xl bg-white border border-stone-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><Clock className="w-5 h-5" /></div>
              <p className="font-semibold text-stone-800">Opening hours</p>
            </div>
            <ul className="space-y-1.5 text-sm">
              {storeInfo.hours.map((h) => (
                <li key={h.day} className="flex justify-between text-stone-600">
                  <span>{h.day}</span><span className="font-medium text-stone-800">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* faux map */}
          <div className="relative rounded-3xl overflow-hidden h-48 bg-gradient-to-br from-emerald-200 to-lime-200 border border-stone-200">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 2px, transparent 2px), radial-gradient(circle at 70% 60%, white 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <MapPin className="w-9 h-9 text-emerald-800" />
              <span className="text-xs font-semibold text-emerald-900 bg-white/80 px-2 py-0.5 rounded-full mt-1">Fernweh</span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-3xl bg-white border border-stone-200 p-7">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-lime-200 text-emerald-800 flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl font-bold text-emerald-900">Message sent!</h2>
              <p className="text-stone-500 mt-2">Thanks {form.name.split(' ')[0]} — we'll reply within one business day. 🌿</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-emerald-900">Send us a note</h2>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.name ? 'border-rose-300' : 'border-stone-200'}`} />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.email ? 'border-rose-300' : 'border-stone-200'}`} />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 ${errors.message ? 'border-rose-300' : 'border-stone-200'}`} />
                {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors">
                <Send className="w-4 h-4" /> Send message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
