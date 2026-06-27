import { Scale, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BRAND, PRACTICE_AREAS } from './data';

export default function Footer() {
  return (
    <footer className="bg-[#0a1322] text-slate-400 border-t border-amber-500/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-sm bg-gradient-to-br from-amber-400 to-yellow-600 text-[#0f1a2e]">
                <Scale className="w-5 h-5" strokeWidth={2.2} />
              </span>
              <span className="font-serif text-lg font-semibold text-white">
                {BRAND.name} <span className="text-amber-400/80 text-sm">{BRAND.suffix}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {BRAND.tagline}. Serving clients across New York and beyond since {BRAND.founded}.
            </p>
          </div>

          {/* Practice */}
          <div>
            <h4 className="text-white font-serif font-semibold mb-4 text-sm tracking-wide uppercase">Practice Areas</h4>
            <ul className="space-y-2 text-sm">
              {PRACTICE_AREAS.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <a href="/demo/law-firms/practice-areas" className="hover:text-amber-300 transition-colors">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm */}
          <div>
            <h4 className="text-white font-serif font-semibold mb-4 text-sm tracking-wide uppercase">The Firm</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/demo/law-firms/" className="hover:text-amber-300 transition-colors">Home</a></li>
              <li><a href="/demo/law-firms/attorneys" className="hover:text-amber-300 transition-colors">Our Attorneys</a></li>
              <li><a href="/demo/law-firms/resources" className="hover:text-amber-300 transition-colors">Resources & FAQ</a></li>
              <li><a href="/demo/law-firms/book" className="hover:text-amber-300 transition-colors">Book a Consultation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5"><MapPin className="w-4 h-4 mt-0.5 text-amber-400/80 shrink-0" /><span>{BRAND.address}</span></li>
              <li className="flex gap-2.5"><Phone className="w-4 h-4 mt-0.5 text-amber-400/80 shrink-0" /><a href={`tel:${BRAND.phone}`} className="hover:text-amber-300">{BRAND.phone}</a></li>
              <li className="flex gap-2.5"><Mail className="w-4 h-4 mt-0.5 text-amber-400/80 shrink-0" /><a href={`mailto:${BRAND.email}`} className="hover:text-amber-300">{BRAND.email}</a></li>
              <li className="flex gap-2.5"><Clock className="w-4 h-4 mt-0.5 text-amber-400/80 shrink-0" /><span>{BRAND.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BRAND.name} {BRAND.suffix}. All rights reserved. Attorney advertising.</p>
          <p className="text-slate-600">
            A demo crafted by <span className="text-amber-400/70">OrdersLift</span> · Prior results do not guarantee a similar outcome.
          </p>
        </div>
      </div>
    </footer>
  );
}
