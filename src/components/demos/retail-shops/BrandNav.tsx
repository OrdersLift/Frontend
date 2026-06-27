import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, ShoppingBag } from 'lucide-react';
import { subscribe, getCount } from './cartStore';

const links = [
  { name: 'Home', href: '/demo/retail-shops/' },
  { name: 'Shop', href: '/demo/retail-shops/shop' },
  { name: 'Cart', href: '/demo/retail-shops/cart' },
  { name: 'Contact', href: '/demo/retail-shops/contact' },
];

export default function BrandNav() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCount());
    const unsub = subscribe(() => setCount(getCount()));
    return () => unsub();
  }, []);

  return (
    <nav className="sticky top-16 lg:top-20 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/demo/retail-shops/" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-700 text-white shadow-sm group-hover:bg-emerald-800 transition-colors">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-emerald-900">
              Fernweh
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.name}
                href={l.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
              >
                {l.name}
              </a>
            ))}
            <a
              href="/demo/retail-shops/cart"
              className="ml-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Cart
              {count > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold">
                  {count}
                </span>
              )}
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/demo/retail-shops/cart"
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-700 text-white"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold">
                  {count}
                </span>
              )}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-emerald-900 hover:bg-emerald-50"
              aria-label="Menu"
            >
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
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-stone-50 border-t border-stone-200"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-stone-700 hover:bg-emerald-50 hover:text-emerald-800"
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
