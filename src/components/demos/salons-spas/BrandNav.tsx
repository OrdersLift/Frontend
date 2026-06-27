import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flower2, CalendarHeart } from 'lucide-react';

const links = [
  { name: 'Home', href: '/demo/salons-spas/' },
  { name: 'Services', href: '/demo/salons-spas/services' },
  { name: 'Stylists', href: '/demo/salons-spas/stylists' },
  { name: 'Book', href: '/demo/salons-spas/book' },
  { name: 'Contact', href: '/demo/salons-spas/contact' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-[#fbf7f3]/85 backdrop-blur-md border-b border-rose-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/demo/salons-spas/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-amber-200 text-stone-700 shadow-sm">
              <Flower2 className="w-5 h-5" />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-wide text-stone-800">Lumière</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-rose-400">Salon &amp; Spa</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-stone-600 hover:text-rose-500 transition-colors"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/salons-spas/book"
              className="inline-flex items-center gap-2 rounded-full bg-stone-800 text-white text-sm font-medium px-5 py-2.5 hover:bg-rose-500 transition-colors shadow-sm"
            >
              <CalendarHeart className="w-4 h-4" /> Book Now
            </a>
          </div>

          <button
            className="md:hidden p-2 text-stone-700"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#fbf7f3] border-t border-rose-200/60"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-stone-700 font-medium hover:text-rose-500"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/demo/salons-spas/book"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-stone-800 text-white font-medium px-5 py-3 hover:bg-rose-500"
              >
                <CalendarHeart className="w-4 h-4" /> Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
