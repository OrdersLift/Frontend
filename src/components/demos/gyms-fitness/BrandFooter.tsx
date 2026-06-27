import { Dumbbell, MapPin, Phone, Mail, Instagram, Youtube, Facebook } from 'lucide-react';
import { brand } from './data';

export default function BrandFooter() {
  return (
    <footer className="bg-black border-t border-lime-400/20 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400 text-black shadow-[0_0_18px_rgba(163,230,53,0.6)]">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-extrabold text-white">
              PULSE<span className="text-lime-400">FORGE</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">{brand.tagline}</p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-white/5 hover:bg-lime-400 hover:text-black transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/demo/gyms-fitness/" className="hover:text-lime-400">Home</a></li>
            <li><a href="/demo/gyms-fitness/classes" className="hover:text-lime-400">Classes & Schedule</a></li>
            <li><a href="/demo/gyms-fitness/membership" className="hover:text-lime-400">Membership</a></li>
            <li><a href="/demo/gyms-fitness/trainers" className="hover:text-lime-400">Trainers</a></li>
            <li><a href="/demo/gyms-fitness/join" className="hover:text-lime-400">Join Now</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Hours</h4>
          <ul className="space-y-2 text-sm">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-zinc-500">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Visit</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />{brand.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />{brand.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 text-lime-400 shrink-0 mt-0.5" />{brand.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        © 2026 PULSE FORGE (demo). Built by OrdersLift. Fictional brand for demonstration.
      </div>
    </footer>
  );
}
