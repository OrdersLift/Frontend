import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Flame, ShoppingBag } from 'lucide-react';
import { useCart, cartCount } from './cartStore';
import { brand } from './data';

const links = [
  { name: 'Home', href: '/demo/restaurants/' },
  { name: 'Menu', href: '/demo/restaurants/menu' },
  { name: 'Order Online', href: '/demo/restaurants/order' },
  { name: 'Reservations', href: '/demo/restaurants/reservations' },
  { name: 'About', href: '/demo/restaurants/about' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const count = cartCount(cart);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-[#1a120b]/95 backdrop-blur border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <a href="/demo/restaurants/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-lg shadow-amber-900/40">
              <Flame className="w-5 h-5" />
            </span>
            <span className="font-serif text-lg lg:text-xl font-semibold tracking-tight text-amber-50">
              Saffron <span className="text-amber-400">&amp;</span> Ember
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-amber-100/70 hover:text-amber-50 rounded-lg hover:bg-amber-500/10 transition-colors"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/restaurants/order"
              className="relative ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 hover:brightness-110 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Order
              {count > 0 && (
                <span className="absolute -top-2 -right-2 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-emerald-400 text-[11px] font-bold text-emerald-950">
                  {count}
                </span>
              )}
            </a>
            <a
              href="/demo/restaurants/reservations"
              className="ml-2 inline-flex items-center rounded-full border border-amber-400/40 px-4 py-2 text-sm font-semibold text-amber-100 hover:bg-amber-400/10 transition"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <a href="/demo/restaurants/order" className="relative p-2 text-amber-100">
              <ShoppingBag className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-emerald-400 text-[11px] font-bold text-emerald-950">
                  {count}
                </span>
              )}
            </a>
            <button onClick={() => setOpen((o) => !o)} className="p-2 text-amber-100" aria-label="Menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#1a120b] border-t border-amber-500/20"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-2.5 rounded-lg text-amber-100/80 hover:bg-amber-500/10 hover:text-amber-50 font-medium"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="/demo/restaurants/reservations"
                className="block text-center mt-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-4 py-2.5 font-semibold text-white"
              >
                Book a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
