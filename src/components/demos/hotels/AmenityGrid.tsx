import { motion } from 'framer-motion';
import { Coffee, Flame, Wifi, Dog, Bike, Wine, Sparkles, Car } from 'lucide-react';
import { amenities } from './data';

const iconMap: Record<string, any> = { Coffee, Flame, Wifi, Dog, Bike, Wine, Sparkles, Car };

export default function AmenityGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {amenities.map((a, i) => {
        const Icon = iconMap[a.icon] ?? Sparkles;
        return (
          <motion.div key={a.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
            className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-[#1c2b24] mb-4">
              <Icon className="w-6 h-6" />
            </span>
            <h3 className="font-serif text-lg text-stone-800">{a.title}</h3>
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">{a.text}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
