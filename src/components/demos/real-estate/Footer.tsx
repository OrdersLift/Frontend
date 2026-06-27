import { Gem, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { offices, hours } from './data';

export default function Footer() {
  return (
    <footer className="bg-[#0b1f17] text-emerald-100/80 border-t border-emerald-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 text-[#0b1f17]">
                <Gem className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-serif text-lg text-emerald-50">Aurelia</span>
                <span className="block text-[10px] uppercase tracking-[0.32em] text-emerald-400/80">Estates</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-100/60">
              Prime residential sales, lettings and valuations across London's finest addresses since 2009.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-emerald-50 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/demo/real-estate/" className="hover:text-white transition">Home</a></li>
              <li><a href="/demo/real-estate/listings" className="hover:text-white transition">Listings</a></li>
              <li><a href="/demo/real-estate/valuation" className="hover:text-white transition">Instant Valuation</a></li>
              <li><a href="/demo/real-estate/book" className="hover:text-white transition">Book a Viewing</a></li>
              <li><a href="/demo/real-estate/about" className="hover:text-white transition">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-emerald-50 mb-4">Offices</h4>
            <ul className="space-y-3 text-sm">
              {offices.map((o) => (
                <li key={o.area} className="flex gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                  <span>
                    <span className="block text-emerald-50">{o.area}</span>
                    {o.address} · <a href={`tel:${o.phone}`} className="hover:text-white">{o.phone}</a>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-emerald-50 mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-emerald-400" />{h.day}</span>
                  <span className="text-emerald-50">{h.time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="tel:+442079460123" className="flex items-center gap-2 hover:text-white"><Phone className="w-3.5 h-3.5 text-emerald-400" />+44 20 7946 0123</a>
              <a href="mailto:hello@aurelia.estate" className="flex items-center gap-2 hover:text-white"><Mail className="w-3.5 h-3.5 text-emerald-400" />hello@aurelia.estate</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-100/50">
          <p>© {new Date().getFullYear()} Aurelia Estates. A fictional demo by OrdersLift.</p>
          <p className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Complaints</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
