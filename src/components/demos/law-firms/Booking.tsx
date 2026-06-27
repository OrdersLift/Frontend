import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, ArrowLeft, Calendar, Clock, ShieldCheck,
  User, Scale, FileText, CalendarCheck,
} from 'lucide-react';
import { MATTER_TYPES, TIME_SLOTS, URGENCY, PRACTICE_AREAS, BRAND } from './data';

type Form = {
  matter: string;
  urgency: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  details: string;
};

const empty: Form = { matter: '', urgency: '', name: '', email: '', phone: '', date: '', time: '', details: '' };

const STEPS = ['Matter', 'Details', 'Schedule', 'Confirm'];

function attorneyFor(matter: string) {
  const map: Record<string, string> = {
    'Family Law': 'Priya N. Kapoor',
    'Corporate & Commercial': 'Eleanor R. Ashford',
    'Real Estate & Property': 'David O. Lindqvist',
    'Criminal Defense': 'Marcus T. Vane',
    'Estate Planning & Probate': 'Eleanor R. Ashford',
    'Personal Injury': 'Marcus T. Vane',
  };
  return map[matter] || 'an Ashford & Vane partner';
}

export default function Booking() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState(false);
  const ref = 'AV-' + Math.floor(100000 + Math.random() * 900000);

  // preselect matter from URL ?matter=
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('matter');
    if (p && MATTER_TYPES.includes(p)) setForm((f) => ({ ...f, matter: p }));
  }, []);

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (s === 0 && !form.matter) e.matter = 'Please choose a matter type.';
    if (s === 0 && !form.urgency) e.urgency = 'Please indicate urgency.';
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Your name is required.';
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.';
      if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number.';
    }
    if (s === 2) {
      if (!form.date) e.date = 'Pick a date.';
      if (!form.time) e.time = 'Pick a time.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step === STEPS.length - 1) setDone(true);
    else setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const today = new Date().toISOString().split('T')[0];
  const inputCls = 'w-full px-4 py-3 rounded-md border bg-white text-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-400';

  if (done) {
    return (
      <div className="bg-[#f7f5f0] min-h-screen">
        <section className="pt-32 pb-20 bg-[#0f1a2e] text-white">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] mb-7">
              <CheckCircle2 className="w-11 h-11" />
            </motion.div>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold mb-3">Consultation requested</h1>
            <p className="text-slate-300 mb-2">Thank you, {form.name.split(' ')[0]}. Your request is confirmed.</p>
            <p className="text-amber-400 text-sm font-medium">Reference {ref}</p>
          </div>
        </section>

        <section className="py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-6">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="px-7 py-5 border-b border-slate-100 bg-amber-50/60">
                <p className="font-serif text-lg font-semibold text-[#0f1a2e]">Your appointment summary</p>
              </div>
              <dl className="divide-y divide-slate-100">
                {[
                  ['Matter type', form.matter],
                  ['Assigned attorney', attorneyFor(form.matter)],
                  ['Date & time', `${form.date} at ${form.time}`],
                  ['Urgency', form.urgency],
                  ['Contact', `${form.email} · ${form.phone}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-7 py-4">
                    <dt className="text-sm text-slate-500">{k}</dt>
                    <dd className="text-sm font-medium text-[#0f1a2e] text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6 rounded-lg bg-[#0f1a2e] p-6 text-slate-300 text-sm leading-relaxed">
              <p className="text-white font-medium mb-2 flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-amber-400" /> What happens next</p>
              A confirmation has been sent to {form.email}. {attorneyFor(form.matter)}’s office will call you to confirm the slot and explain what to bring. Everything you share is fully confidential. This is a demo — no real appointment has been booked.
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="/demo/law-firms/" className="flex-1 text-center px-5 py-3 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] font-semibold">Back to home</a>
              <button onClick={() => { setForm(empty); setStep(0); setDone(false); }} className="px-5 py-3 rounded-md border border-slate-300 text-slate-600 font-medium hover:bg-slate-50">Book another</button>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5f0]">
      <section className="pt-32 pb-14 bg-[#0f1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, #fbbf24 0, transparent 45%)' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-medium mb-5">
            <ShieldCheck className="w-3.5 h-3.5" /> Confidential · No obligation
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold mb-3">Book a Consultation</h1>
          <p className="text-slate-300">Four quick steps. We’ll route you to the right attorney and confirm your slot.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-6">
          {/* stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold transition-colors ${i < step ? 'bg-amber-500 text-white' : i === step ? 'bg-[#0f1a2e] text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-[11px] font-medium ${i <= step ? 'text-[#0f1a2e]' : 'text-slate-400'}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 -mt-5 ${i < step ? 'bg-amber-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-900/5">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                {step === 0 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#0f1a2e] mb-1 flex items-center gap-2"><Scale className="w-5 h-5 text-amber-500" /> What is your matter about?</h2>
                    <p className="text-sm text-slate-500 mb-5">We’ll connect you with the partner who specializes in it.</p>
                    <div className="grid sm:grid-cols-2 gap-2.5 mb-2">
                      {PRACTICE_AREAS.map((p) => (
                        <button
                          key={p.matterType}
                          onClick={() => set('matter', p.matterType)}
                          className={`text-left px-4 py-3 rounded-md border text-sm transition-all ${form.matter === p.matterType ? 'border-amber-500 bg-amber-50 text-[#0f1a2e] font-medium ring-1 ring-amber-400' : 'border-slate-200 text-slate-600 hover:border-amber-300'}`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                    {errors.matter && <p className="text-xs text-rose-500 mb-3">{errors.matter}</p>}

                    <p className="text-sm font-medium text-slate-700 mt-5 mb-2">How urgent is it?</p>
                    <div className="space-y-2">
                      {URGENCY.map((u) => (
                        <button
                          key={u}
                          onClick={() => set('urgency', u)}
                          className={`w-full text-left px-4 py-2.5 rounded-md border text-sm transition-all ${form.urgency === u ? 'border-amber-500 bg-amber-50 text-[#0f1a2e] font-medium' : 'border-slate-200 text-slate-600 hover:border-amber-300'}`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                    {errors.urgency && <p className="text-xs text-rose-500 mt-2">{errors.urgency}</p>}
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#0f1a2e] mb-1 flex items-center gap-2"><User className="w-5 h-5 text-amber-500" /> Your contact details</h2>
                    <p className="text-sm text-slate-500 mb-5">Kept strictly confidential under attorney-client privilege.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full name</label>
                        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Doe" className={`${inputCls} ${errors.name ? 'border-rose-400' : 'border-slate-300'}`} />
                        {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                          <input value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="jane@email.com" className={`${inputCls} ${errors.email ? 'border-rose-400' : 'border-slate-300'}`} />
                          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone</label>
                          <input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(212) 555-0190" className={`${inputCls} ${errors.phone ? 'border-rose-400' : 'border-slate-300'}`} />
                          {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1.5 block flex items-center gap-1.5"><FileText className="w-4 h-4 text-amber-500" /> Briefly, what’s going on? <span className="text-slate-400 font-normal">(optional)</span></label>
                        <textarea value={form.details} onChange={(e) => set('details', e.target.value)} rows={4} placeholder="A few sentences help us prepare for your call…" className={`${inputCls} border-slate-300 resize-none`} />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#0f1a2e] mb-1 flex items-center gap-2"><Calendar className="w-5 h-5 text-amber-500" /> Choose a time</h2>
                    <p className="text-sm text-slate-500 mb-5">Same-week appointments are usually available.</p>
                    <div className="mb-5">
                      <label className="text-sm font-medium text-slate-700 mb-1.5 block">Preferred date</label>
                      <input type="date" min={today} value={form.date} onChange={(e) => set('date', e.target.value)} className={`${inputCls} ${errors.date ? 'border-rose-400' : 'border-slate-300'}`} />
                      {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
                    </div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-500" /> Preferred time</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TIME_SLOTS.map((t) => (
                        <button key={t} onClick={() => set('time', t)} className={`px-3 py-2.5 rounded-md border text-sm transition-all ${form.time === t ? 'border-amber-500 bg-amber-50 text-[#0f1a2e] font-medium ring-1 ring-amber-400' : 'border-slate-200 text-slate-600 hover:border-amber-300'}`}>{t}</button>
                      ))}
                    </div>
                    {errors.time && <p className="text-xs text-rose-500 mt-2">{errors.time}</p>}
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-[#0f1a2e] mb-1 flex items-center gap-2"><CalendarCheck className="w-5 h-5 text-amber-500" /> Review & confirm</h2>
                    <p className="text-sm text-slate-500 mb-5">Please confirm the details below.</p>
                    <dl className="rounded-md border border-slate-200 divide-y divide-slate-100 mb-4">
                      {[
                        ['Matter', form.matter],
                        ['Attorney', attorneyFor(form.matter)],
                        ['Urgency', form.urgency],
                        ['Name', form.name],
                        ['Contact', `${form.email} · ${form.phone}`],
                        ['Date & time', `${form.date} at ${form.time}`],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 px-4 py-3">
                          <dt className="text-sm text-slate-500">{k}</dt>
                          <dd className="text-sm font-medium text-[#0f1a2e] text-right">{v || '—'}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="text-xs text-slate-400 leading-relaxed">By confirming you agree to be contacted about your matter. No attorney-client relationship is formed until a written engagement is signed. This is a demo — no real booking occurs.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* nav */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button onClick={back} disabled={step === 0} className={`inline-flex items-center gap-1.5 text-sm font-medium ${step === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-[#0f1a2e]'}`}>
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={next} className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] text-sm font-semibold shadow-lg shadow-amber-900/20 hover:-translate-y-0.5 transition-all">
                {step === STEPS.length - 1 ? 'Confirm booking' : 'Continue'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">{BRAND.hours}</p>
        </div>
      </section>
    </div>
  );
}
