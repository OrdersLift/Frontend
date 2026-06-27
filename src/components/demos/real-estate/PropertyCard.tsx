import { motion } from 'framer-motion';
import { BedDouble, Bath, Maximize, MapPin } from 'lucide-react';
import { type Listing, formatShort } from './data';

const statusStyle: Record<Listing['status'], string> = {
  New: 'bg-emerald-500 text-white',
  'For Sale': 'bg-white/90 text-slate-800',
  Reduced: 'bg-rose-500 text-white',
};

export default function PropertyCard({ listing, index = 0 }: { listing: Listing; index?: number }) {
  return (
    <motion.a
      href={`/demo/real-estate/property/${listing.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="group block rounded-2xl overflow-hidden bg-white border border-emerald-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* image placeholder */}
      <div className={`relative h-52 bg-gradient-to-br ${listing.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 0, transparent 45%)' }} />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyle[listing.status]}`}>
          {listing.status}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/30 text-white backdrop-blur-sm">
          {listing.type}
        </span>
        <span className="absolute bottom-3 left-3 font-serif text-2xl text-white drop-shadow-md">
          {formatShort(listing.price)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg text-slate-800 group-hover:text-emerald-700 transition">{listing.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
          {listing.address}, {listing.city} · {listing.lat}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-600 border-t border-emerald-100/70 pt-3">
          <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4 text-emerald-500" />{listing.beds}</span>
          <span className="flex items-center gap-1.5"><Bath className="w-4 h-4 text-emerald-500" />{listing.baths}</span>
          <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-emerald-500" />{listing.area.toLocaleString()} ft²</span>
        </div>
      </div>
    </motion.a>
  );
}
