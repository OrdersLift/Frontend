import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench, ClipboardCheck, Droplet, Disc, Cog, RotateCw, BatteryCharging,
  CircleDot, Crosshair, Snowflake, Gauge, Zap, Clock, ArrowRight,
} from 'lucide-react';
import { services } from './data';

const iconMap: Record<string, any> = {
  Wrench, ClipboardCheck, Droplet, Disc, Cog, RotateCw, BatteryCharging,
  CircleDot, Crosshair, Snowflake, Gauge, Zap,
};

const categories = ['All', 'Essentials', 'Repairs', 'Tyres & Wheels', 'Diagnostics'] as const;

export default function ServicesList() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const list = active === 'All' ? services : services.filter((s) => s.category === active);

  return (
    <div className="bg-zinc-100 text-zinc-900 min-h-screen">
      {/* header band */}
      <section className="bg-zinc-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">Services & Prices</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold">
            Clear prices. No hidden extras.
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            Every price below is a guide starting point. Use the Quote Builder for an exact figure
            tailored to your vehicle, then book in one go.
          </p>
        </div>
      </section>

      {/* filters */}
      <div className="sticky top-[7.5rem] lg:top-[8.5rem] z-30 bg-zinc-100/90 backdrop-blur border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                active === c
                  ? 'bg-zinc-900 text-amber-400'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Wrench;
            return (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
                className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all"
              >
                {s.popular && (
                  <span className="absolute top-5 right-5 rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-700">
                    Popular
                  </span>
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900 mb-4">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <h3 className="font-display text-lg font-bold">{s.name}</h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wide">From</span>
                    <p className="font-display text-2xl font-extrabold leading-none">
                      £{s.price}
                      {s.unit && <span className="text-xs font-medium text-zinc-500"> {s.unit}</span>}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500">
                    <Clock className="h-3.5 w-3.5" /> {s.duration}
                  </span>
                </div>
                <a
                  href="/demo/auto-garages/quote"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-amber-400 hover:bg-zinc-800 transition-colors"
                >
                  Add to quote <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-zinc-900 p-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-white">Not sure what you need?</h2>
          <p className="mt-2 text-zinc-400 max-w-lg mx-auto">
            Build a custom quote across multiple services and book it in one go — or ask Sparky, our AI service desk, bottom-right.
          </p>
          <a
            href="/demo/auto-garages/quote"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 font-bold uppercase tracking-wide text-zinc-900 hover:from-amber-300 hover:to-orange-400 transition-colors"
          >
            Open the Quote Builder <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
