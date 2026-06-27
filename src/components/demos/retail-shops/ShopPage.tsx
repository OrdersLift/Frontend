import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, SlidersHorizontal, Check } from 'lucide-react';
import { products, categories } from './data';
import { addToCart } from './cartStore';

const lights = ['Low', 'Medium', 'Bright'] as const;
const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const [cat, setCat] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState(150);
  const [lightSel, setLightSel] = useState<string[]>([]);
  const [petOnly, setPetOnly] = useState(false);
  const [sort, setSort] = useState('featured');
  const [added, setAdded] = useState<string | null>(null);

  // pick up ?cat= from url on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('cat');
    if (c && categories.includes(c as any)) setCat(c);
  }, []);

  const toggleLight = (l: string) =>
    setLightSel((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cat !== 'All' && p.category !== cat) return false;
      if (p.price > maxPrice) return false;
      if (lightSel.length && !lightSel.includes(p.light)) return false;
      if (petOnly && !p.petSafe) return false;
      return true;
    });
    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [cat, maxPrice, lightSel, petOnly, sort]);

  const reset = () => {
    setCat('All'); setMaxPrice(150); setLightSel([]); setPetOnly(false); setSort('featured');
  };

  const handleAdd = (p: typeof products[number]) => {
    addToCart({
      id: p.id, name: p.name, variant: p.variants[0].label,
      price: p.variants[0].price, emoji: p.emoji, gradient: p.gradient,
    });
    setAdded(p.id);
    setTimeout(() => setAdded((a) => (a === p.id ? null : a)), 1200);
  };

  return (
    <div className="bg-stone-50 text-stone-800 min-h-screen">
      {/* header band */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-800 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-white">The Shop</h1>
          <p className="text-emerald-200 mt-2">{products.length} botanicals, pots and tools — filter to find your match.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Filters */}
        <aside className="space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-emerald-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </h2>
            <button onClick={reset} className="text-xs text-emerald-700 hover:underline">Reset</button>
          </div>

          {/* Category */}
          <div>
            <p className="text-sm font-semibold text-stone-700 mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    cat === c ? 'bg-emerald-700 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-emerald-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="flex justify-between text-sm font-semibold text-stone-700 mb-2">
              <span>Max price</span>
              <span className="text-emerald-700">${maxPrice}</span>
            </div>
            <input
              type="range" min={16} max={150} step={1} value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-700"
            />
          </div>

          {/* Light */}
          <div>
            <p className="text-sm font-semibold text-stone-700 mb-2">Light needs</p>
            <div className="space-y-1.5">
              {lights.map((l) => (
                <label key={l} className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center ${lightSel.includes(l) ? 'bg-emerald-700 border-emerald-700' : 'border-stone-300 bg-white'}`}>
                    {lightSel.includes(l) && <Check className="w-3.5 h-3.5 text-white" />}
                  </span>
                  <input type="checkbox" className="sr-only" checked={lightSel.includes(l)} onChange={() => toggleLight(l)} />
                  {l} light
                </label>
              ))}
            </div>
          </div>

          {/* Pet safe */}
          <label className="flex items-center justify-between text-sm font-semibold text-stone-700 cursor-pointer">
            🐾 Pet-safe only
            <button
              type="button"
              onClick={() => setPetOnly((v) => !v)}
              className={`w-11 h-6 rounded-full transition-colors relative ${petOnly ? 'bg-emerald-700' : 'bg-stone-300'}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${petOnly ? 'left-5' : 'left-0.5'}`} />
            </button>
          </label>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">{filtered.length} {filtered.length === 1 ? 'product' : 'products'}</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm rounded-full border border-stone-200 bg-white px-4 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 p-16 text-center text-stone-500">
              <p className="text-4xl mb-3">🌵</p>
              No plants match these filters. <button onClick={reset} className="text-emerald-700 underline">Reset filters</button>
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((p) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group rounded-3xl border border-stone-200 overflow-hidden bg-white hover:shadow-xl transition-shadow flex flex-col"
                  >
                    <a href={`/demo/retail-shops/product/${p.id}`} className={`relative aspect-square bg-gradient-to-br ${p.gradient} flex items-center justify-center`}>
                      <span className="text-7xl drop-shadow-md group-hover:scale-110 transition-transform">{p.emoji}</span>
                      <span className="absolute top-3 right-3 text-[11px] px-2 py-1 rounded-full bg-white/90 text-stone-700 font-medium">{p.category}</span>
                      {p.petSafe && (
                        <span className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-full bg-white/90 text-emerald-800 font-semibold">🐾</span>
                      )}
                      {p.inStock <= 12 && (
                        <span className="absolute bottom-3 left-3 text-[11px] px-2 py-1 rounded-full bg-amber-400 text-emerald-950 font-semibold">Only {p.inStock} left</span>
                      )}
                    </a>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {p.rating}
                        <span className="text-stone-400">({p.reviews})</span>
                        <span className="ml-auto text-stone-400">{p.light} light</span>
                      </div>
                      <a href={`/demo/retail-shops/product/${p.id}`} className="font-semibold text-stone-800 hover:text-emerald-700">{p.name}</a>
                      <p className="text-sm text-stone-500 flex-1 mt-0.5">{p.tagline}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-display text-lg font-bold text-emerald-800">${p.price}</span>
                        <button
                          onClick={() => handleAdd(p)}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            added === p.id ? 'bg-lime-500 text-emerald-950' : 'bg-emerald-700 text-white hover:bg-emerald-800'
                          }`}
                        >
                          {added === p.id ? '✓ Added' : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
