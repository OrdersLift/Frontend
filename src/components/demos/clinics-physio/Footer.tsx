import { Leaf, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { brand } from './data';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
                <Leaf className="w-5 h-5" />
              </span>
              <span className="font-display font-bold text-xl text-white">Verdant</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {brand.tagline} Caring physiotherapy and rehab to get you back to doing what you love.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/demo/clinics-physio/" className="hover:text-emerald-400">Home</a></li>
              <li><a href="/demo/clinics-physio/treatments" className="hover:text-emerald-400">Treatments</a></li>
              <li><a href="/demo/clinics-physio/team" className="hover:text-emerald-400">Our Team</a></li>
              <li><a href="/demo/clinics-physio/info" className="hover:text-emerald-400">Patient Info &amp; FAQ</a></li>
              <li><a href="/demo/clinics-physio/book" className="hover:text-emerald-400">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" />{brand.phone}</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-400" />{brand.email}</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />{brand.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" />Hours</h4>
            <ul className="space-y-2 text-sm">
              {brand.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-slate-400">{h.day}</span>
                  <span className="text-slate-200">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Verdant Physio &amp; Health Clinic. A fictional demo.</p>
          <p>Website crafted by <span className="text-emerald-400 font-medium">OrdersLift</span> · AI for local business</p>
        </div>
      </div>
    </footer>
  );
}
