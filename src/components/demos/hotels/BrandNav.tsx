import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';

const links = [
  { name: 'Home', href: '/demo/hotels/' },
  { name: 'Rooms & Suites', href: '/demo/hotels/rooms' },
  { name: 'Amenities', href: '/demo/hotels/amenities' },
  { name: 'Local Guide', href: '/demo/hotels/guide' },
  { name: 'Book Now', href: '/demo/hotels/book' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);
  const current = typeof window !== 'undefined' ? window.location.pathname : '';

  const isActive = (href: string) =>
    href === '/demo/hotels/'
      ? current === '/demo/hotels' || current === '/demo/hotels/'
      : current.startsWith(href);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-[#1c2b24]/95 backdrop-blur border-b border-emerald-900/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="/demo/hotels/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[#1c2b24] shadow">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="font-serif text-lg lg:text-xl tracking-wide text-amber-50">
              Maple <span className="text-amber-400">&amp;</span> Mist
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.slice(0, 4).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(l.href)
                    ? 'text-amber-300'
                    : 'text-emerald-100/80 hover:text-amber-200 hover:bg-emerald-900/40'
                }`}
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/hotels/book"
              className="ml-2 px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24] hover:from-amber-300 hover:to-orange-400 transition shadow"
            >
              Book Your Stay
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-amber-50 p-2"
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
            className="md:hidden overflow-hidden bg-[#1c2b24] border-t border-emerald-900/40"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm ${
                    isActive(l.href)
                      ? 'bg-emerald-900/60 text-amber-300'
                      : 'text-emerald-100/90 hover:bg-emerald-900/40'
                  }`}
                >
                  {l.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
