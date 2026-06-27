import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { stylists, galleryItems } from './data';

const tags = ['All', ...Array.from(new Set(galleryItems.map((g) => g.tag)))];

export default function StylistsGallery() {
  const [tag, setTag] = useState('All');
  const shown = tag === 'All' ? galleryItems : galleryItems.filter((g) => g.tag === tag);

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Stylists */}
      <div className="grid sm:grid-cols-2 gap-6 mb-24">
        {stylists.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-5 rounded-3xl bg-white border border-rose-100 p-6 hover:shadow-lg transition-all"
          >
            <span className={`grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} text-stone-700 font-serif text-2xl shrink-0`}>
              {s.initials}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-2xl text-stone-800">{s.name}</h3>
                <span className="text-xs text-amber-500 flex items-center gap-1 shrink-0"><Star className="w-3.5 h-3.5 fill-current" />{s.rating}</span>
              </div>
              <p className="text-sm text-rose-400 mb-2">{s.role}</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">{s.bio}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.specialties.map((sp) => (
                  <span key={sp} className="text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-500">{sp}</span>
                ))}
              </div>
              <a href="/demo/salons-spas/book" className="text-sm text-stone-800 font-medium inline-flex items-center gap-1 hover:gap-2 hover:text-rose-500 transition-all">
                Book with {s.name.split(' ')[0]} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gallery */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Our work</p>
        <h2 className="font-serif text-4xl text-stone-800 mb-6">The Lumière gallery</h2>
        <div className="flex flex-wrap justify-center gap-2.5">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium border transition-all ${
                tag === t ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-600 border-rose-200 hover:border-rose-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {shown.map((g) => (
            <motion.div
              key={g.id} layout
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient}`} />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase tracking-widest text-stone-700/70 bg-white/70 rounded-full px-2.5 py-0.5">{g.tag}</span>
                <p className="font-serif text-xl text-stone-800 mt-1.5">{g.title}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
