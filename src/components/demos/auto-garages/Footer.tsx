import { Wrench, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { brand } from './data';

export default function Footer() {
  const links = [
    { name: 'Home', href: '/demo/auto-garages/' },
    { name: 'Services & Prices', href: '/demo/auto-garages/services' },
    { name: 'Get a Quote & Book', href: '/demo/auto-garages/quote' },
    { name: 'Track My Job', href: '/demo/auto-garages/track' },
    { name: 'Contact', href: '/demo/auto-garages/contact' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-amber-500/20 text-zinc-400">
      {/* hazard stripe */}
      <div
        className="h-2 w-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 16px, #18181b 16px, #18181b 32px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-600">
              <Wrench className="h-5 w-5 text-zinc-900" strokeWidth={2.5} />
            </span>
            <span className="font-display font-extrabold text-white text-lg">IRONCLAD</span>
          </div>
          <p className="text-sm leading-relaxed">{brand.tagline}</p>
          <p className="text-xs mt-4 text-zinc-600">Est. {brand.founded} · IMI-accredited workshop</p>
        </div>

        <div>
          <h4 className="font-display font-bold text-white uppercase text-sm tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="hover:text-amber-400 transition-colors">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white uppercase text-sm tracking-wider mb-4">
            Get In Touch
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
              <a href="tel:01615550147" className="hover:text-amber-400">{brand.phone}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
              <a href={`mailto:${brand.email}`} className="hover:text-amber-400 break-all">{brand.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
              <span>{brand.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white uppercase text-sm tracking-wider mb-4">
            Opening Hours
          </h4>
          <ul className="space-y-2 text-sm">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  {h.day}
                </span>
                <span className="font-mono text-zinc-300">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved. Demo site.</p>
          <p>
            Crafted by <span className="text-amber-500 font-semibold">OrdersLift</span> · AI websites that convert
          </p>
        </div>
      </div>
    </footer>
  );
}
