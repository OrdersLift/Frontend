import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { localGuide } from './data';

export default function GuideSections() {
  return (
    <div className="space-y-12">
      {localGuide.map((group, gi) => (
        <div key={group.category}>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">{group.emoji}</span>
            <h2 className="font-serif text-2xl text-stone-800">{group.category}</h2>
            <span className="flex-1 h-px bg-stone-200" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {group.items.map((item, i) => (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg text-stone-800">{item.name}</h3>
                  <span className="flex items-center gap-1 shrink-0 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />{item.detail}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
