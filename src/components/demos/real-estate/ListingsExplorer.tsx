import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { listings, propertyTypes, formatShort, type PropertyType } from './data';
import PropertyCard from './PropertyCard';

const priceMarks = [1_000_000, 2_000_000, 3_500_000, 5_000_000, 7_000_000];

export default function ListingsExplorer({ initialType }: { initialType?: string }) {
  const [type, setType] = useState<'All' | PropertyType>(
    (propertyTypes.includes(initialType as any) ? initialType : 'All') as any
  );
  const [maxPrice, setMaxPrice] = useState(7_000_000);
  const [minBeds, setMinBeds] = useState(0);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    const qp = params.get('q');
    if (t && propertyTypes.includes(t as any)) setType(t as any);
    if (qp) setQuery(qp);
  }, []);

  const results = useMemo(() => {
    let r = listings.filter((l) => {
      if (type !== 'All' && l.type !== type) return false;
      if (l.price > maxPrice) return false;
      if (l.beds < minBeds) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!(l.title + l.city + l.address + l.lat + l.type).toLowerCase().includes(q)) return false;
      }
      return true;
    });
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price);
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [type, maxPrice, minBeds, query, sort]);

  const reset = () => {
    setType('All');
    setMaxPrice(7_000_000);
    setMinBeds(0);
    setQuery('');
    setSort('featured');
  };

  const active = type !== 'All' || maxPrice < 7_000_000 || minBeds > 0 || query.trim() !== '';

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-8">
      {/* Filter rail */}
      <aside className="lg:sticky lg:top-40 self-start">
        <div className="rounded-2xl bg-white border border-emerald-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="flex items-center gap-2 font-serif text-lg text-slate-800">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> Filters
            </h3>
            {active && (
              <button onClick={reset} className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center gap-1">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Area, postcode, name…"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-emerald-50/50 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-slate-700"
            />
          </div>

          {/* Type */}
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Property type</label>
            <div className="flex flex-wrap gap-1.5">
              {propertyTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    type === t ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Max price */}
          <div className="mb-5">
            <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              <span>Max price</span>
              <span className="text-emerald-700 font-bold normal-case tracking-normal">{formatShort(maxPrice)}</span>
            </label>
            <input
              type="range"
              min={1_000_000}
              max={7_000_000}
              step={250_000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              {priceMarks.map((m) => <span key={m}>{formatShort(m)}</span>)}
            </div>
          </div>

          {/* Beds */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Min bedrooms</label>
            <div className="flex gap-1.5">
              {[0, 2, 3, 4, 5].map((b) => (
                <button
                  key={b}
                  onClick={() => setMinBeds(b)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                    minBeds === b ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {b === 0 ? 'Any' : `${b}+`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-800">{results.length}</span> {results.length === 1 ? 'property' : 'properties'} found
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="px-3 py-2 rounded-lg text-sm bg-white border border-emerald-100 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>

        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-emerald-200 bg-white p-12 text-center"
          >
            <p className="font-serif text-xl text-slate-700 mb-2">No matches just yet</p>
            <p className="text-sm text-slate-500 mb-4">Try widening your price range or clearing filters.</p>
            <button onClick={reset} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition">
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.map((l, i) => (
              <PropertyCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
