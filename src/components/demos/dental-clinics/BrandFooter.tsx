import { Smile, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { brand, navLinks } from './data';

export default function BrandFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white">
                <Smile className="w-5 h-5" />
              </span>
              <span className="font-display font-extrabold text-lg text-white">{brand.name}</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{brand.tagline}.</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-teal-300 transition-colors">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-teal-400" /> {brand.phone}</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-teal-400" /> {brand.email}</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-teal-400 mt-0.5" /> {brand.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" /> Hours
            </h4>
            <ul className="space-y-2 text-sm">
              {brand.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-slate-400">{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {brand.name}. A fictional demo by OrdersLift.</p>
          <p>Designed & powered by OrdersLift AI</p>
        </div>
      </div>
    </footer>
  );
}
