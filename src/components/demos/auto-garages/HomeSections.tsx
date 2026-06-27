import { motion } from 'framer-motion';
import {
  Wrench, ClipboardCheck, Droplet, Disc, Cog, RotateCw, BatteryCharging,
  CircleDot, Crosshair, Snowflake, Gauge, Zap, ShieldCheck, BadgePoundSterling,
  Car, Award, Star, ArrowRight, CalendarClock, Search, PhoneCall, Quote,
} from 'lucide-react';
import { services, guarantees, testimonials, brand } from './data';

const iconMap: Record<string, any> = {
  Wrench, ClipboardCheck, Droplet, Disc, Cog, RotateCw, BatteryCharging,
  CircleDot, Crosshair, Snowflake, Gauge, Zap, ShieldCheck, BadgePoundSterling,
  Car, Award,
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function HomeSections() {
  const popular = services.filter((s) => s.popular);

  return (
    <div className="bg-zinc-100 text-zinc-900">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-zinc-950 text-white pt-32 pb-24">
        {/* hazard top edge already covered by header band */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 56px), repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 56px)',
          }}
        />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400"
            >
              <Award className="h-3.5 w-3.5" /> IMI-Accredited · Est. {brand.founded}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]"
            >
              Honest repairs.
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Zero surprises.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-zinc-400 max-w-lg"
            >
              {brand.name} is your local workshop for MOTs, servicing, tyres and diagnostics —
              with transparent quotes and a live job tracker so you always know what's happening.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/demo/auto-garages/quote"
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 font-bold uppercase tracking-wide text-zinc-900 shadow-lg shadow-orange-900/40 hover:from-amber-300 hover:to-orange-400 transition-colors"
              >
                <CalendarClock className="h-5 w-5" /> Get a Quote & Book
              </a>
              <a
                href="/demo/auto-garages/track"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3.5 font-bold uppercase tracking-wide text-white hover:bg-white/5 transition-colors"
              >
                <Search className="h-5 w-5" /> Track My Job
              </a>
            </motion.div>
          </div>

          {/* stat panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="relative"
          >
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-600">
                  <Wrench className="h-6 w-6 text-zinc-900" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="font-display font-bold text-white text-lg">Workshop, live</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> 6 of 6 bays active
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {brand.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-black/30 p-4 border border-white/5">
                    <p className="font-display text-2xl font-extrabold text-amber-400">{s.value}</p>
                    <p className="text-xs text-zinc-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== GUARANTEES STRIP ===== */}
      <section className="bg-zinc-900 border-y border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, i) => {
            const Icon = iconMap[g.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={g.title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">{g.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{g.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== POPULAR SERVICES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">What we do</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-zinc-900">
              Most-booked services
            </h2>
            <p className="mt-3 text-zinc-600">
              Upfront prices, master technicians and a 12-month warranty on every job.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.map((s, i) => {
              const Icon = iconMap[s.icon] ?? Wrench;
              return (
                <motion.div
                  key={s.id}
                  custom={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900">
                      <Icon className="h-6 w-6" strokeWidth={2.2} />
                    </span>
                    <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">
                      Popular
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-zinc-900">{s.name}</h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-2xl font-extrabold text-zinc-900">
                      £{s.price}
                      {s.unit && <span className="text-xs font-medium text-zinc-500"> {s.unit}</span>}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">{s.duration}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <a
              href="/demo/auto-garages/services"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-orange-600 hover:text-orange-700"
            >
              View all services & prices <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Simple & transparent</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-zinc-900">
              From quote to keys in 3 steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CalendarClock, title: 'Quote & book online', text: 'Pick your services, get an instant estimate and choose a slot — under 2 minutes.' },
              { icon: Wrench, title: 'We do the work', text: 'Master techs carry out the job. We call for approval before any extra work.' },
              { icon: Search, title: 'Track it live', text: 'Watch real-time progress with your reference number, then collect when ready.' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative text-center"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-amber-400">
                  <step.icon className="h-7 w-7" />
                </span>
                <span className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 font-display text-5xl font-extrabold text-zinc-100 -z-0">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-zinc-900">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-xs mx-auto">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Trusted locally</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-zinc-900">
              Drivers who keep coming back
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm"
              >
                <Quote className="h-8 w-8 text-amber-400 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-700 leading-relaxed">“{t.quote}”</p>
                <div className="mt-5 pt-4 border-t border-zinc-100">
                  <p className="font-display font-bold text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.car}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="relative overflow-hidden bg-zinc-950 py-16">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 24px, transparent 24px, transparent 48px)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Car due a service? Let's sort it.
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Book online in minutes or give us a ring — we'll get you back on the road safely.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/demo/auto-garages/quote"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3.5 font-bold uppercase tracking-wide text-zinc-900 hover:from-amber-300 hover:to-orange-400 transition-colors"
            >
              <CalendarClock className="h-5 w-5" /> Book a Service
            </a>
            <a
              href="tel:01615550147"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 font-bold uppercase tracking-wide text-white hover:bg-white/5 transition-colors"
            >
              <PhoneCall className="h-5 w-5" /> {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
