import { motion } from 'framer-motion';
import {
  Scale, Heart, Building2, Home as HomeIcon, ScrollText, ShieldCheck,
  Check, ArrowRight, Gavel,
} from 'lucide-react';
import { PRACTICE_AREAS } from './data';

const ICONS: Record<string, any> = { Heart, Building2, Home: HomeIcon, Scale, ScrollText, ShieldCheck };

export default function PracticeAreas() {
  return (
    <div className="bg-[#f7f5f0] text-slate-800">
      {/* header band */}
      <section className="pt-32 pb-16 bg-[#0f1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, #fbbf24 0, transparent 45%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-medium mb-5">
            <Gavel className="w-3.5 h-3.5" /> Practice Areas
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold max-w-3xl leading-tight">Comprehensive counsel, exacting standards.</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl">Six core practices, one consistent promise: partner-led representation tailored to the realities of your matter.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
          {PRACTICE_AREAS.map((p, i) => {
            const Icon = ICONS[p.icon] || Scale;
            return (
              <motion.div
                key={p.slug}
                id={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden grid lg:grid-cols-3"
              >
                <div className="lg:col-span-1 bg-[#0f1a2e] p-8 flex flex-col justify-center">
                  <span className="flex items-center justify-center w-14 h-14 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] mb-5">
                    <Icon className="w-7 h-7" strokeWidth={1.8} />
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-white mb-2">{p.name}</h2>
                  <p className="text-amber-400/90 text-sm font-medium">{p.startingFee}</p>
                </div>
                <div className="lg:col-span-2 p-8">
                  <p className="text-slate-600 leading-relaxed mb-6">{p.description}</p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                    {p.services.map((s) => (
                      <div key={s} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Check className="w-4 h-4 text-amber-500 shrink-0" /> {s}
                      </div>
                    ))}
                  </div>
                  <a
                    href={`/demo/law-firms/book?matter=${encodeURIComponent(p.matterType)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#0f1a2e] text-white text-sm font-semibold hover:bg-[#162540] transition-colors"
                  >
                    Discuss a {p.name.split(' ')[0]} matter <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-amber-400 to-yellow-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#0f1a2e] mb-4">Not sure which applies to you?</h2>
          <p className="text-[#0f1a2e]/80 mb-7">Book a consultation and we’ll route you to the right attorney — or ask Lexi, our assistant, anytime.</p>
          <a href="/demo/law-firms/book" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#0f1a2e] text-white font-semibold hover:-translate-y-0.5 transition-all">
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
