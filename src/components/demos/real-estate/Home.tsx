import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Quote, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { listings, testimonials, stats, propertyTypes, formatShort } from './data';
import PropertyCard from './PropertyCard';

export default function Home() {
  const [type, setType] = useState('All');
  const [maxPrice, setMaxPrice] = useState('7000000');
  const [q, setQ] = useState('');

  const goSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== 'All') params.set('type', type);
    if (q.trim()) params.set('q', q.trim());
    window.location.href = `/demo/real-estate/listings?${params.toString()}`;
  };

  const featured = listings.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0b1f17] pt-32 pb-24 lg:pb-32">
        {/* decorative gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-20 w-[34rem] h-[34rem] rounded-full bg-emerald-600/25 blur-3xl" />
          <div className="absolute top-20 right-0 w-[30rem] h-[30rem] rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
              <Star className="w-3.5 h-3.5 fill-emerald-300" /> Rated 4.9/5 by 600+ clients
            </span>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-emerald-50">
              Find a home worthy<br className="hidden sm:block" /> of the life you imagine.
            </h1>
            <p className="mt-5 text-lg text-emerald-100/70 max-w-xl">
              Aurelia is London's quietly exceptional estate agency — curating prime residences and handling every sale with discretion and care.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.form
            onSubmit={goSearch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-9 rounded-2xl bg-white/95 backdrop-blur p-3 shadow-2xl shadow-emerald-950/40 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]"
          >
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Area or postcode" className="w-full pl-9 pr-3 py-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300">
              {propertyTypes.map((t) => <option key={t}>{t === 'All' ? 'Any type' : t}</option>)}
            </select>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="px-3 py-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300">
              {['2000000', '3500000', '5000000', '7000000'].map((p) => <option key={p} value={p}>Up to {formatShort(Number(p))}</option>)}
            </select>
            <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 transition">
              <Search className="w-4 h-4" /> Search
            </button>
          </motion.form>

          {/* stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl sm:text-3xl text-emerald-50">{s.value}</p>
                <p className="text-xs text-emerald-300/70 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-emerald-50/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">Curated selection</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-slate-800">Featured residences</h2>
            </div>
            <a href="/demo/real-estate/listings" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition">
              View all listings <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((l, i) => <PropertyCard key={l.id} listing={l} index={i} />)}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <a href="/demo/real-estate/listings" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">View all listings <ArrowRight className="w-4 h-4" /></a>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">The Aurelia difference</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-slate-800">Boutique service, exceptional results.</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We deliberately take on fewer clients so each receives the full attention of a senior partner — from first viewing to final handover.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {[
                { icon: ShieldCheck, t: 'Discreet', d: 'Off-market access & total confidentiality.' },
                { icon: Clock, t: 'Fast', d: '23 days to offer, on average.' },
                { icon: Award, t: 'Proven', d: '99.2% of guide achieved.' },
              ].map((f) => (
                <motion.div key={f.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-emerald-100 p-5 bg-emerald-50/40">
                  <f.icon className="w-6 h-6 text-emerald-600" />
                  <p className="mt-3 font-serif text-lg text-slate-800">{f.t}</p>
                  <p className="text-sm text-slate-500 mt-1">{f.d}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/demo/real-estate/valuation" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition">
                Get an instant valuation <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/demo/real-estate/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transition">
                Book a viewing
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-500 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, white 0, transparent 50%)' }} />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 backdrop-blur p-5 shadow-lg">
                <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">Just sold</p>
                <p className="font-serif text-xl text-slate-800 mt-1">Thornbury Glass House</p>
                <p className="text-sm text-slate-500">£4.51M · 6% over guide · 11 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#0b1f17] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-semibold">In their words</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-emerald-50">Clients who trusted us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl bg-emerald-950/40 border border-emerald-800/50 p-6">
                <Quote className="w-7 h-7 text-emerald-500/60" />
                <p className="mt-3 text-emerald-100/85 leading-relaxed">{t.quote}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[#0b1f17] text-sm font-bold">{t.initials}</span>
                  <div>
                    <p className="text-emerald-50 text-sm font-medium">{t.name}</p>
                    <p className="text-emerald-400/70 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">Thinking of selling?</h2>
          <p className="mt-3 text-emerald-50/90 max-w-xl mx-auto">See what your home could be worth in 30 seconds — then let us achieve it.</p>
          <a href="/demo/real-estate/valuation" className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-emerald-800 bg-white hover:bg-emerald-50 transition shadow-lg">
            Get my instant valuation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
