import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Leaf, Flame, ShoppingBag, Star } from 'lucide-react';
import { menu, categories } from './data';
import { cartStore, useCart, cartCount } from './cartStore';

const dietFilters = [
  { id: 'all', label: 'All' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gf', label: 'Gluten-free' },
  { id: 'spicy', label: 'Spicy' },
];

const tagStyle: Record<string, string> = {
  vegan: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  vegetarian: 'bg-lime-500/15 text-lime-300 border-lime-500/30',
  gf: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  spicy: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  nuts: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
};

export default function MenuView() {
  const [diet, setDiet] = useState('all');
  const [added, setAdded] = useState<string | null>(null);
  const cart = useCart();
  const count = cartCount(cart);

  const visible = (catId: string) =>
    menu.filter((d) => d.category === catId && (diet === 'all' || d.tags.includes(diet)));

  const handleAdd = (id: string) => {
    const dish = menu.find((d) => d.id === id)!;
    cartStore.add(dish);
    setAdded(id);
    setTimeout(() => setAdded((a) => (a === id ? null : a)), 1200);
  };

  return (
    <div className="bg-[#140d07] min-h-screen">
      {/* header band */}
      <div className="pt-32 pb-12 bg-gradient-to-b from-[#1a120b] to-[#140d07] border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">
            The Menu
          </motion.h1>
          <p className="mt-3 text-amber-100/60 max-w-xl mx-auto">
            Everything is cooked over live coals. Prices in EUR, service not included.
          </p>
        </div>
      </div>

      {/* diet filter */}
      <div className="sticky top-[7.5rem] lg:top-[8.5rem] z-30 bg-[#140d07]/95 backdrop-blur border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {dietFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setDiet(f.id)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                diet === f.id
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white border-transparent'
                  : 'border-amber-500/30 text-amber-100/70 hover:bg-amber-500/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {categories.map((cat) => {
          const dishes = visible(cat.id);
          if (!dishes.length) return null;
          return (
            <section key={cat.id}>
              <h2 className="font-serif text-2xl font-bold text-amber-50 mb-1 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" /> {cat.label}
              </h2>
              <div className="h-px bg-gradient-to-r from-amber-500/40 to-transparent mb-6" />
              <div className="space-y-4">
                <AnimatePresence>
                  {dishes.map((d) => (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="group flex gap-4 rounded-2xl bg-[#1a120b] border border-amber-500/15 p-4 hover:border-amber-400/40 transition"
                    >
                      <div className="shrink-0 w-16 h-16 rounded-xl grid place-items-center bg-gradient-to-br from-amber-600/20 to-rose-700/20 text-3xl">
                        {d.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold text-amber-50 flex items-center gap-1.5">
                            {d.name}
                            {d.signature && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                          </h3>
                          <span className="font-semibold text-amber-300 whitespace-nowrap">€{d.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-amber-100/60 mt-1">{d.desc}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {d.tags.map((t) => (
                            <span key={t} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tagStyle[t] || 'bg-amber-500/10 text-amber-200 border-amber-500/30'}`}>
                              {t === 'vegan' && <Leaf className="w-3 h-3" />}{t}
                            </span>
                          ))}
                          {d.allergens.length > 0 && (
                            <span className="text-[11px] text-amber-100/40">Allergens: {d.allergens.join(', ')}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAdd(d.id)}
                        className={`self-center shrink-0 grid place-items-center w-10 h-10 rounded-full transition ${
                          added === d.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-500/15 text-amber-300 hover:bg-gradient-to-br hover:from-amber-500 hover:to-rose-600 hover:text-white'
                        }`}
                        aria-label={`Add ${d.name}`}
                      >
                        {added === d.id ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          );
        })}
      </div>

      {/* sticky cart bar */}
      <AnimatePresence>
        {count > 0 && (
          <motion.a
            href="/demo/restaurants/order"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-xl shadow-rose-900/40"
          >
            <ShoppingBag className="w-5 h-5" />
            View Order ({count})
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
