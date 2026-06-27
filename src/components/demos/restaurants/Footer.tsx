import { Flame, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { brand, hours } from './data';

export default function Footer() {
  return (
    <footer className="bg-[#140d07] text-amber-100/70 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 text-white">
              <Flame className="w-5 h-5" />
            </span>
            <span className="font-serif text-lg font-semibold text-amber-50">
              Saffron <span className="text-amber-400">&amp;</span> Ember
            </span>
          </div>
          <p className="text-sm leading-relaxed">{brand.tagline}</p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="p-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition" aria-label="Instagram">
              <Instagram className="w-4 h-4 text-amber-300" />
            </a>
            <a href="#" className="p-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 transition" aria-label="Facebook">
              <Facebook className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-amber-50 mb-4 text-sm uppercase tracking-wider">Visit</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />{brand.address}</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />{brand.phone}</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />{brand.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-amber-50 mb-4 text-sm uppercase tracking-wider">Hours</h4>
          <ul className="space-y-1.5 text-sm">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.time === 'Closed' ? 'text-rose-400/80' : 'text-amber-200'}>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-amber-50 mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/demo/restaurants/menu" className="hover:text-amber-300 transition">Menu</a></li>
            <li><a href="/demo/restaurants/order" className="hover:text-amber-300 transition">Order Online</a></li>
            <li><a href="/demo/restaurants/reservations" className="hover:text-amber-300 transition">Reservations</a></li>
            <li><a href="/demo/restaurants/about" className="hover:text-amber-300 transition">About &amp; Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-100/40">
          <p>© {new Date().getFullYear()} Saffron &amp; Ember — {brand.city}. A demo by OrdersLift.</p>
          <p>Crafted with fire 🔥 and AI.</p>
        </div>
      </div>
    </footer>
  );
}
