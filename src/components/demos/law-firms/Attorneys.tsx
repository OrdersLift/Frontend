import { motion } from 'framer-motion';
import { Mail, GraduationCap, MapPin, ArrowRight, Users } from 'lucide-react';
import { ATTORNEYS } from './data';

export default function Attorneys() {
  return (
    <div className="bg-[#f7f5f0] text-slate-800">
      <section className="pt-32 pb-16 bg-[#0f1a2e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #60a5fa 0, transparent 45%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-medium mb-5">
            <Users className="w-3.5 h-3.5" /> Our Attorneys
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold max-w-3xl leading-tight">The people who will personally handle your matter.</h1>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl">No call centers, no rotating associates. Just seasoned advocates who answer the phone.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-7">
          {ATTORNEYS.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 transition-all"
            >
              <div className="flex items-center gap-5 p-6 border-b border-slate-100">
                <span className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${a.accent} text-[#0f1a2e] font-serif font-bold text-2xl shrink-0 shadow-lg`}>
                  {a.initials}
                </span>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#0f1a2e]">{a.name}</h2>
                  <p className="text-amber-600 text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Admitted: {a.bar}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{a.bio}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {a.focus.map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-[#0f1a2e]/5 text-[#0f1a2e] font-medium border border-slate-200">{f}</span>
                  ))}
                </div>

                <div className="space-y-1.5 mb-5">
                  {a.education.map((e) => (
                    <p key={e} className="text-xs text-slate-500 flex items-center gap-2"><GraduationCap className="w-3.5 h-3.5 text-amber-500" /> {e}</p>
                  ))}
                </div>

                <a href={`mailto:${a.email}`} className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700">
                  <Mail className="w-4 h-4" /> {a.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#0f1a2e]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl font-semibold text-white mb-4">Speak with one of our attorneys</h2>
          <p className="text-slate-300 mb-7">Request a confidential consultation and we’ll connect you with the right advocate for your matter.</p>
          <a href="/demo/law-firms/book" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e] font-semibold hover:-translate-y-0.5 transition-all">
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
