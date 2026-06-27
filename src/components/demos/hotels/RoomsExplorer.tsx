import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { rooms, type Room } from './data';
import RoomCard from './RoomCard';

const categories = ['All', 'Room', 'Suite', 'Cabin'] as const;
const views = ['Any', 'Mountain', 'Garden', 'Lake'] as const;
const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'guests', label: 'Sleeps most' },
] as const;

export default function RoomsExplorer() {
  const [cat, setCat] = useState<(typeof categories)[number]>('All');
  const [view, setView] = useState<(typeof views)[number]>('Any');
  const [maxPrice, setMaxPrice] = useState(450);
  const [sort, setSort] = useState<(typeof sorts)[number]['id']>('featured');

  const filtered = useMemo(() => {
    let list = rooms.filter(
      (r) =>
        (cat === 'All' || r.category === cat) &&
        (view === 'Any' || r.view === view) &&
        r.price <= maxPrice
    );
    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'guests') list.sort((a, b) => b.maxGuests - a.maxGuests);
    if (sort === 'featured') list.sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
    return list;
  }, [cat, view, maxPrice, sort]);

  const pill = (active: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm transition border ${
      active
        ? 'bg-[#1c2b24] text-amber-200 border-[#1c2b24]'
        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
    }`;

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-5 mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-400 mr-1">Type</span>
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={pill(cat === c)}>{c}</button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-400 mr-1">View</span>
              {views.map((v) => (
                <button key={v} onClick={() => setView(v)} className={pill(view === v)}>{v}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="text-sm text-stone-600">
              <span className="block text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">
                Max ${maxPrice}/night
              </span>
              <input type="range" min={150} max={450} step={10} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-44 accent-amber-500" />
            </label>
            <label className="text-sm text-stone-600">
              <span className="block text-xs font-semibold uppercase tracking-wide text-stone-400 mb-1">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-3 py-2 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="text-sm text-stone-500 mb-5">
        Showing <span className="font-semibold text-stone-700">{filtered.length}</span> of {rooms.length} rooms
      </p>

      {filtered.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-stone-500 py-16">
          No rooms match those filters — try raising the price or changing the view.
        </motion.p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r: Room, i) => (
            <RoomCard key={r.id} room={r} index={i} ctaLabel="View & book"
              onSelect={() => (window.location.href = '/demo/hotels/book')} />
          ))}
        </div>
      )}
    </div>
  );
}
