import { motion } from 'framer-motion';
import { Users, BedDouble, Maximize, Check } from 'lucide-react';
import type { Room } from './data';

export default function RoomCard({
  room,
  index = 0,
  ctaLabel = 'Reserve',
  onSelect,
  disabled = false,
}: {
  room: Room;
  index?: number;
  ctaLabel?: string;
  onSelect?: (room: Room) => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-shadow"
    >
      {/* "Photo" */}
      <div className={`relative h-48 bg-gradient-to-br ${room.gradient}`}>
        <div className="absolute inset-0 flex items-center justify-center text-6xl drop-shadow-sm select-none">
          {room.emoji}
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/25 text-white backdrop-blur">
            {room.view} view
          </span>
          {room.popular && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-[#1c2b24]">
              Popular
            </span>
          )}
        </div>
        {disabled && (
          <div className="absolute inset-0 bg-stone-900/55 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-full bg-white text-stone-700 text-sm font-semibold">
              Sold out for these dates
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-wide text-emerald-700/80 font-semibold">{room.category}</span>
            <h3 className="font-serif text-xl text-stone-800 leading-tight">{room.name}</h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-semibold text-stone-800">${room.price}</p>
            <p className="text-xs text-stone-400">/ night</p>
          </div>
        </div>

        <p className="mt-2 text-sm text-stone-500 italic">{room.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-600">
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-amber-500" />Up to {room.maxGuests}</span>
          <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-amber-500" />{room.beds}</span>
          <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-amber-500" />{room.size}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 4).map((a) => (
            <span key={a} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs">
              <Check className="w-3 h-3 text-emerald-600" />{a}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-xs">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <button
          onClick={() => onSelect?.(room)}
          disabled={disabled}
          className={`mt-5 w-full py-2.5 rounded-full font-semibold text-sm transition ${
            disabled
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-orange-500 text-[#1c2b24] hover:from-amber-300 hover:to-orange-400'
          }`}
        >
          {disabled ? 'Unavailable' : ctaLabel}
        </button>
      </div>
    </motion.div>
  );
}
