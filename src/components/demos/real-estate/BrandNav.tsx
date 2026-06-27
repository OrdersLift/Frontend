import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Gem } from 'lucide-react';

const links = [
  { name: 'Home', href: '/demo/real-estate/' },
  { name: 'Listings', href: '/demo/real-estate/listings' },
  { name: 'Valuation', href: '/demo/real-estate/valuation' },
  { name: 'About', href: '/demo/real-estate/about' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-16 lg:top-20 z-40 bg-[#0b1f17]/95 backdrop-blur-md border-b border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="/demo/real-estate/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 text-[#0b1f17] shadow-lg shadow-emerald-900/40">
              <Gem className="w-5 h-5" strokeWidth={2.2} />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-lg lg:text-xl tracking-tight text-emerald-50 group-hover:text-emerald-200 transition">
                Aurelia
              </span>
              <span className="block text-[10px] uppercase tracking-[0.32em] text-emerald-400/80">
                Estates
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="px-3.5 py-2 text-sm font-medium text-emerald-100/80 hover:text-white rounded-md hover:bg-emerald-500/10 transition"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/real-estate/book"
              className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 hover:to-teal-300 shadow-lg shadow-emerald-900/40 transition"
            >
              Book a Viewing
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-10 h-10 rounded-md text-emerald-100 hover:bg-emerald-500/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-emerald-900/60 bg-[#0b1f17]"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-md text-emerald-100/90 hover:bg-emerald-500/10 font-medium flex items-center gap-2"
                >
                  <Home className="w-4 h-4 text-emerald-400" /> {l.name}
                </a>
              ))}
              <a
                href="/demo/real-estate/book"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-3 rounded-md font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400"
              >
                Book a Viewing
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
