import { useState } from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Bath, Maximize, MapPin, Check, ArrowLeft, Calendar, Image as ImageIcon, Share2, Heart } from 'lucide-react';
import { listings, formatPrice, type Listing } from './data';
import PropertyCard from './PropertyCard';

export default function PropertyDetail({ id }: { id: string }) {
  const listing = listings.find((l) => l.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!listing) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 px-4">
        <p className="font-serif text-3xl text-slate-800">Property not found</p>
        <p className="text-slate-500 mt-2">This listing may have been sold or removed.</p>
        <a href="/demo/real-estate/listings" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </a>
      </div>
    );
  }

  const galleryGradients = [
    listing.gradient,
    'from-slate-700 via-slate-600 to-emerald-700',
    'from-amber-500 via-orange-400 to-rose-400',
    'from-teal-600 via-emerald-500 to-green-500',
  ];
  const labels = ['Exterior', 'Reception', 'Kitchen', 'Garden'];

  const similar = listings.filter((l) => l.id !== listing.id && l.type === listing.type).slice(0, 3);
  const fallbackSimilar = listings.filter((l) => l.id !== listing.id).slice(0, 3);
  const related = (similar.length ? similar : fallbackSimilar);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a href="/demo/real-estate/listings" className="inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-900 mb-5">
        <ArrowLeft className="w-4 h-4" /> All listings
      </a>

      {/* Gallery */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-3 mb-8">
        <motion.div
          key={activeImg}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className={`relative h-72 sm:h-96 lg:h-[26rem] rounded-2xl overflow-hidden bg-gradient-to-br ${galleryGradients[activeImg]}`}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 0, transparent 50%)' }} />
          <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium bg-black/30 text-white backdrop-blur flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" /> {labels[activeImg]}
          </span>
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">{listing.status}</span>
        </motion.div>
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-3">
          {galleryGradients.map((g, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`relative h-20 lg:h-[6.1rem] rounded-xl overflow-hidden bg-gradient-to-br ${g} ring-2 transition ${activeImg === i ? 'ring-emerald-500' : 'ring-transparent hover:ring-emerald-300'}`}
            >
              <span className="absolute bottom-1 left-1.5 text-[10px] text-white/90 font-medium">{labels[i]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        {/* Main */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">{listing.type}</span>
              <h1 className="mt-3 font-serif text-3xl sm:text-4xl text-slate-800">{listing.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-4 h-4 text-emerald-500" /> {listing.address}, {listing.city} · {listing.lat}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSaved((s) => !s)} className={`grid place-items-center w-11 h-11 rounded-lg border transition ${saved ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'}`}>
                <Heart className={`w-5 h-5 ${saved ? 'fill-rose-500' : ''}`} />
              </button>
              <button className="grid place-items-center w-11 h-11 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 border-y border-emerald-100 py-5">
            <Spec icon={<BedDouble className="w-5 h-5" />} label="Bedrooms" value={String(listing.beds)} />
            <Spec icon={<Bath className="w-5 h-5" />} label="Bathrooms" value={String(listing.baths)} />
            <Spec icon={<Maximize className="w-5 h-5" />} label="Internal area" value={`${listing.area.toLocaleString()} ft²`} />
          </div>

          <div className="mt-8">
            <h2 className="font-serif text-2xl text-slate-800">About this home</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{listing.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="font-serif text-2xl text-slate-800">Features</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {listing.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-slate-700">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600"><Check className="w-3.5 h-3.5" /></span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* map placeholder */}
          <div className="mt-8">
            <h2 className="font-serif text-2xl text-slate-800 mb-4">Location</h2>
            <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 border border-emerald-200">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full grid place-items-center w-10 h-10 rounded-full bg-emerald-600 text-white shadow-lg">
                <MapPin className="w-5 h-5" />
              </span>
              <span className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-white/90 text-sm text-slate-700 font-medium">{listing.city}, {listing.lat}</span>
            </div>
          </div>
        </div>

        {/* Sticky CTA card */}
        <aside className="lg:sticky lg:top-40 self-start">
          <div className="rounded-2xl bg-white border border-emerald-100 shadow-lg p-6">
            <p className="text-xs uppercase tracking-wider text-emerald-600 font-semibold">Guide price</p>
            <p className="font-serif text-4xl text-slate-800 mt-1">{formatPrice(listing.price)}</p>
            <a href={`/demo/real-estate/book?property=${listing.id}`} className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-[#0b1f17] bg-gradient-to-r from-emerald-300 to-teal-400 hover:from-emerald-200 transition">
              <Calendar className="w-4 h-4" /> Book a viewing
            </a>
            <a href="/demo/real-estate/valuation" className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-50 transition">
              Value my own home
            </a>
            <div className="mt-5 pt-5 border-t border-emerald-100 flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[#0b1f17] font-bold">SC</span>
              <div>
                <p className="text-sm font-medium text-slate-800">Sophie Carrington</p>
                <p className="text-xs text-slate-500">Founding Partner · +44 20 7946 0123</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar */}
      <div className="mt-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 mb-6">You may also like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((l, i) => <PropertyCard key={l.id} listing={l} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid place-items-center w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600">{icon}</span>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
