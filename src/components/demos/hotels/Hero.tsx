import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#1c2b24] pt-32 pb-24 sm:pb-32">
      {/* layered scenery */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#243a30] via-[#1c2b24] to-[#16221c]" />
        {/* sun glow */}
        <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-amber-400/30 blur-3xl" />
        {/* mountains */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden>
          <path fill="#16221c" d="M0,224 L240,120 L480,224 L720,96 L960,224 L1200,144 L1440,224 L1440,320 L0,320 Z" />
          <path fill="#101a15" opacity="0.8" d="M0,288 L360,200 L720,288 L1080,208 L1440,288 L1440,320 L0,320 Z" />
        </svg>
        {/* mist */}
        <div className="absolute bottom-10 left-0 w-full h-24 bg-gradient-to-t from-emerald-100/10 to-transparent blur-xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-amber-200 text-sm mb-6">
          <MapPin className="w-4 h-4" /> Aldergrove Valley · est. 1924
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl text-amber-50 leading-tight">
          Where the mountains
          <br />
          <span className="text-amber-400 italic">keep your secrets</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl mx-auto text-emerald-100/80 text-lg">
          A six-room boutique B&amp;B wrapped in maples and morning mist. Slow
          breakfasts, crackling hearths, and trails right out the door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/demo/hotels/book"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24] font-semibold hover:from-amber-300 hover:to-orange-400 transition shadow-lg">
            Check availability
          </a>
          <a href="/demo/hotels/rooms"
            className="px-7 py-3 rounded-full border border-emerald-600/60 text-amber-100 hover:bg-emerald-900/50 transition">
            Explore rooms
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-amber-200 text-sm">
          <span className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</span>
          4.9 · 312 guest reviews
        </motion.div>
      </div>
    </section>
  );
}
