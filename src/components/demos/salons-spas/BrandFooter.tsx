import { Flower2, MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';
import { brand } from './data';

export default function BrandFooter() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-amber-200 text-stone-800">
              <Flower2 className="w-5 h-5" />
            </span>
            <span className="font-serif text-2xl text-white">Lumière</span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed">
            An unhurried salon &amp; spa in the heart of San Francisco. Where craft meets calm.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="grid place-items-center w-9 h-9 rounded-full border border-stone-700 hover:border-rose-400 hover:text-rose-400 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="grid place-items-center w-9 h-9 rounded-full border border-stone-700 hover:border-rose-400 hover:text-rose-400 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/demo/salons-spas/" className="hover:text-rose-400">Home</a></li>
            <li><a href="/demo/salons-spas/services" className="hover:text-rose-400">Services &amp; Pricing</a></li>
            <li><a href="/demo/salons-spas/stylists" className="hover:text-rose-400">Stylists &amp; Gallery</a></li>
            <li><a href="/demo/salons-spas/book" className="hover:text-rose-400">Book Appointment</a></li>
            <li><a href="/demo/salons-spas/contact" className="hover:text-rose-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Visit</h4>
          <ul className="space-y-3 text-sm text-stone-400">
            <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />{brand.address}</li>
            <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />{brand.phone}</li>
            <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />{brand.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-rose-400" />Hours</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-stone-300">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Lumière Salon &amp; Spa. A demo by OrdersLift.</p>
          <p>Crafted with care · Privacy · Terms</p>
        </div>
      </div>
    </footer>
  );
}
