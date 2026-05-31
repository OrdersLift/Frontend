import { Truck, Link, Zap, MapPin, Clock, CheckCircle } from 'lucide-react';

const integrations = [
  { letter: 'D', name: 'DoorDash Drive', color: 'text-red-400',    bg: 'bg-red-500/15',    border: 'border-red-500/20' },
  { letter: 'U', name: 'UberDirect',     color: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-500/20' },
  { letter: 'G', name: 'GrubHub',        color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/20' },
  { letter: 'S', name: 'Stuart',         color: 'text-blue-400',   bg: 'bg-blue-500/15',   border: 'border-blue-500/20' },
  { letter: 'P', name: 'Porter',         color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/20' },
  { letter: '+', name: 'Your local provider', color: 'text-slate-400', bg: 'bg-white/05', border: 'border-white/10' },
];

const capabilities = [
  { icon: Link,   title: 'Multi-platform in one place', desc: 'All your delivery & booking partners managed from a single dashboard. No tab-switching.' },
  { icon: Zap,    title: 'Automatic order routing',     desc: 'Customer places order → system dispatches to the right partner automatically.' },
  { icon: MapPin, title: 'Real-time tracking',          desc: 'Live status updates pushed to your dashboard and optionally to the customer.' },
  { icon: Clock,  title: 'Menu sync across platforms',  desc: 'Change a price or availability once — it updates everywhere instantly.' },
];

const DeliveryIntegrationModal = () => (
  <div className="space-y-8 text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/20
                      flex items-center justify-center flex-shrink-0">
        <Truck className="w-7 h-7 text-orange-400" />
      </div>
      <div>
        <p className="text-slate-300 leading-relaxed">
          Stop juggling five different apps. We connect your website directly to your delivery
          and service partners so everything flows automatically — orders, status updates,
          cancellations — all in one place.
        </p>
      </div>
    </div>

    {/* Capabilities */}
    <div>
      <h4 className="text-white font-semibold mb-4">What the integration does</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((c) => (
          <div key={c.title} className="p-4 rounded-xl bg-white/03 border border-white/06">
            <div className="flex items-center gap-3 mb-2">
              <c.icon className="w-4 h-4 text-orange-400" />
              <div className="text-white text-sm font-semibold">{c.title}</div>
            </div>
            <div className="text-slate-500 text-xs leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Partner logos */}
    <div>
      <h4 className="text-white font-semibold mb-4">Supported delivery partners</h4>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {integrations.map((p) => (
          <div key={p.name} className={`flex flex-col items-center gap-2 p-3 rounded-xl
                                        ${p.bg} border ${p.border} text-center`}>
            <div className={`text-2xl font-bold ${p.color}`}>{p.letter}</div>
            <div className="text-xs text-slate-400 leading-tight">{p.name}</div>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs mt-3">
        Don't see yours? We build custom connectors for any delivery or booking platform with an API.
      </p>
    </div>

    {/* How it works */}
    <div>
      <h4 className="text-white font-semibold mb-4">How the integration works</h4>
      <div className="space-y-3">
        {[
          { n: '01', t: 'We connect your accounts',   d: 'Secure API authentication with each partner. No credentials shared with third parties.' },
          { n: '02', t: 'Menu & services are synced', d: 'Your offerings push to every platform automatically. One source of truth.' },
          { n: '03', t: 'Orders flow into one inbox', d: 'Every order, regardless of source, appears in your admin panel in real time.' },
          { n: '04', t: 'Status updates are automated', d: 'Accepted, in-progress, delivered — all tracked and communicated automatically.' },
        ].map((s) => (
          <div key={s.n} className="flex items-start gap-4">
            <span className="text-3xl font-bold text-orange-500/25 font-display leading-none flex-shrink-0 w-10">{s.n}</span>
            <div className="pt-0.5">
              <div className="text-white text-sm font-semibold mb-0.5">{s.t}</div>
              <div className="text-slate-500 text-xs">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Benefits */}
    <div className="p-5 rounded-xl bg-gradient-to-r from-orange-500/08 to-amber-500/08 border border-orange-500/15">
      <h4 className="text-white font-semibold mb-4">Impact on your business</h4>
      <div className="grid grid-cols-3 gap-4">
        {[
          { v: '80%', l: 'Less time managing orders manually' },
          { v: '15–30%', l: 'Commission saved vs. marketplace-only' },
          { v: '1 panel', l: 'To manage all platforms' },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-xl font-bold text-orange-400 mb-1">{s.v}</div>
            <div className="text-slate-500 text-xs">{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Works for */}
    <div>
      <h4 className="text-white font-semibold mb-3">Works for any business type</h4>
      <div className="flex flex-wrap gap-2">
        {['Restaurants', 'Ghost kitchens', 'Meal prep', 'Grocery', 'Flower shops', 'Pharmacy delivery', 'Laundry services'].map((t) => (
          <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-white/05 border border-white/08 text-xs text-slate-300">
            <CheckCircle className="w-3 h-3 text-green-400" />
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default DeliveryIntegrationModal;
