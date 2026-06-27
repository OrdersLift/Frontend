import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, FileText, ArrowRight, BookOpen } from 'lucide-react';
import { FAQS } from './data';

const GUIDES = [
  { title: 'What to Expect at Your First Consultation', tag: 'Getting Started', mins: '4 min read' },
  { title: 'Understanding Legal Fees: Hourly vs. Flat vs. Contingency', tag: 'Fees', mins: '6 min read' },
  { title: 'Documents to Gather Before You Meet a Lawyer', tag: 'Preparation', mins: '3 min read' },
  { title: 'Divorce in New York: A Step-by-Step Overview', tag: 'Family Law', mins: '8 min read' },
  { title: 'Estate Planning Basics: Wills, Trusts & Probate', tag: 'Estate', mins: '7 min read' },
  { title: 'If You’re Arrested: Your Rights in the First 24 Hours', tag: 'Criminal', mins: '5 min read' },
];

export default function Resources() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-[#f7f5f0] text-slate-800">
      <section className="pt-32 pb-16 bg-[#0f1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 75% 30%, #fbbf24 0, transparent 45%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-medium mb-5">
            <BookOpen className="w-3.5 h-3.5" /> Resources & FAQ
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold max-w-3xl leading-tight">Clear answers, before you ever sign an engagement.</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl">Plain-English guidance on process, fees, and how to prepare — so you walk in informed.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          {/* FAQ */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-semibold text-[#0f1a2e] mb-6 flex items-center gap-2.5">
              <HelpCircle className="w-6 h-6 text-amber-500" /> Frequently Asked
            </h2>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <div key={i} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium text-[#0f1a2e] text-[15px]">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-[#0f1a2e] mb-6 flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-amber-500" /> Client Guides
            </h2>
            <div className="space-y-3">
              {GUIDES.map((g, i) => (
                <motion.a
                  key={g.title}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-amber-400 hover:shadow-md transition-all group"
                >
                  <span className="text-[11px] uppercase tracking-wider text-amber-600 font-semibold">{g.tag}</span>
                  <p className="font-medium text-[#0f1a2e] text-sm mt-1 leading-snug group-hover:text-amber-700 transition-colors">{g.title}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{g.mins}</p>
                </motion.a>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-[#0f1a2e] p-6 text-center">
              <p className="text-white font-serif font-semibold mb-2">Still have questions?</p>
              <p className="text-slate-400 text-sm mb-4">Ask Lexi, our assistant, or book a consultation.</p>
              <a href="/demo/law-firms/book" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] text-sm font-semibold">
                Book Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
