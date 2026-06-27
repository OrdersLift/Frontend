import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, CalendarClock, Phone } from 'lucide-react';

const links = [
  { name: 'Home', href: '/demo/auto-garages/' },
  { name: 'Services', href: '/demo/auto-garages/services' },
  { name: 'Quote & Book', href: '/demo/auto-garages/quote' },
  { name: 'Track Job', href: '/demo/auto-garages/track' },
  { name: 'Contact', href: '/demo/auto-garages/contact' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  const isActive = (href: string) =>
    href === '/demo/auto-garages/'
      ? path === href || path === '/demo/auto-garages'
      : path.startsWith(href);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-zinc-950/95 backdrop-blur border-b border-amber-500/20 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="/demo/auto-garages/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-600 shadow-md shadow-amber-900/40">
              <Wrench className="h-5 w-5 text-zinc-900" strokeWidth={2.5} />
            </span>
            <span className="font-display font-extrabold tracking-tight text-lg leading-none">
              <span className="text-white">IRONCLAD</span>
              <span className="block text-[10px] font-mono font-semibold uppercase tracking-[0.3em] text-amber-500">
                Auto Works
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className={`px-3.5 py-2 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive(l.href)
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/auto-garages/quote"
              className="ml-2 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-900 shadow-md shadow-orange-900/40 hover:from-amber-300 hover:to-orange-400 transition-colors"
            >
              <CalendarClock className="h-4 w-4" />
              Book Service
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-zinc-200 p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-amber-500/10 bg-zinc-950"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-md font-semibold uppercase tracking-wide text-sm ${
                    isActive(l.href)
                      ? 'text-amber-400 bg-amber-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.name}
                </a>
              ))}
              <div className="pt-3 grid grid-cols-1 gap-2">
                <a
                  href="/demo/auto-garages/quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 text-sm font-bold uppercase tracking-wide text-zinc-900"
                >
                  <CalendarClock className="h-4 w-4" />
                  Book Service
                </a>
                <a
                  href="tel:01615550147"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-amber-500/30 px-4 py-3 text-sm font-bold uppercase tracking-wide text-amber-400"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
