import { Leaf, Phone, Mail, MapPin } from 'lucide-react';
import { contact, hours } from './data';

export default function BrandFooter() {
  return (
    <footer className="bg-[#1c2b24] text-emerald-100/80">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[#1c2b24]">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="font-serif text-xl text-amber-50">
              Maple <span className="text-amber-400">&amp;</span> Mist
            </span>
          </div>
          <p className="text-sm leading-relaxed text-emerald-100/60">
            A boutique B&amp;B tucked into Aldergrove Valley. Slow mornings,
            scenic trails, and a fire always crackling.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-amber-200 mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/demo/hotels/" className="hover:text-amber-200">Home</a></li>
            <li><a href="/demo/hotels/rooms" className="hover:text-amber-200">Rooms &amp; Suites</a></li>
            <li><a href="/demo/hotels/amenities" className="hover:text-amber-200">Amenities</a></li>
            <li><a href="/demo/hotels/guide" className="hover:text-amber-200">Local Guide</a></li>
            <li><a href="/demo/hotels/book" className="hover:text-amber-200">Book Now</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-amber-200 mb-3">Visit</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-amber-400" />{contact.address}</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400" />{contact.phone}</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400" />{contact.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-amber-200 mb-3">Good to know</h4>
          <ul className="space-y-2 text-sm">
            <li>Check-in: {hours.checkIn}</li>
            <li>Check-out: {hours.checkOut}</li>
            <li>Front desk: {hours.frontDesk}</li>
            <li>Breakfast: {hours.breakfast}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-900/50 py-5 text-center text-xs text-emerald-100/50">
        © {new Date().getFullYear()} Maple &amp; Mist B&amp;B · A demo crafted by{' '}
        <span className="text-amber-300">OrdersLift</span>. Not a real hotel.
      </div>
    </footer>
  );
}
