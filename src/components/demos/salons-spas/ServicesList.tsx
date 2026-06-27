import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { serviceCategories } from './data';

const filters = [{ id: 'all', name: 'All', icon: '🌸' }, ...serviceCategories.map((c) => ({ id: c.id, name: c.name, icon: c.icon }))];

export default function ServicesList() {
  const [active, setActive] = useState('all');
  const cats = active === 'all' ? serviceCategories : serviceCategories.filter((c) => c.id === active);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f.id)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border transition-all ${
              active === f.id
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-white text-stone-600 border-rose-200 hover:border-rose-400'
            }`}
          >
            <span>{f.icon}</span> {f.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="space-y-14"
        >
          {cats.map((c) => (
            <div key={c.id}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <h2 className="font-serif text-3xl text-stone-800">{c.name}</h2>
                  <p className="text-sm text-stone-500">{c.blurb}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {c.items.map((item) => (
                  <div key={item.name} className="rounded-2xl bg-white border border-rose-100 p-5 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start gap-3 mb-1.5">
                      <h3 className="font-medium text-stone-800">{item.name}</h3>
                      <span className="font-serif text-lg text-rose-500 shrink-0">${item.price}</span>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed mb-3">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400 flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration} min</span>
                      <a href="/demo/salons-spas/book" className="text-xs text-rose-500 inline-flex items-center gap-1 hover:gap-2 transition-all font-medium">
                        Book <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
