import { Truck, Link, Zap, MapPin, Clock, CheckCircle } from 'lucide-react';

const integrations = [
  { letter: 'D', name: 'DoorDash Drive', color: 'text-primary-700 dark:text-primary-300',    bg: 'bg-primary-500/15',    border: 'border-primary-500/25' },
  { letter: 'U', name: 'UberDirect',     color: 'text-glow-600 dark:text-glow-400',  bg: 'bg-glow-500/15',  border: 'border-glow-500/25' },
  { letter: 'G', name: 'GrubHub',        color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/15', border: 'border-primary-500/25' },
  { letter: 'S', name: 'Stuart',         color: 'text-glow-700 dark:text-glow-300',   bg: 'bg-glow-500/15',   border: 'border-glow-500/25' },
  { letter: 'P', name: 'Porter',         color: 'text-accent-700 dark:text-accent-300', bg: 'bg-accent-500/15', border: 'border-accent-500/25' },
  { letter: '+', name: 'Your local provider', color: 'text-neutral-600 dark:text-slate-400', bg: 'bg-cream-100 dark:bg-white/[0.05]', border: 'border-primary-200/70 dark:border-white/10' },
];

const capabilities = [
  { icon: Link,   title: 'Multi-platform in one place', desc: 'All your delivery & booking partners managed from a single dashboard. No tab-switching.' },
  { icon: Zap,    title: 'Automatic order routing',     desc: 'Customer places order → system dispatches to the right partner automatically.' },
  { icon: MapPin, title: 'Real-time tracking',          desc: 'Live status updates pushed to your dashboard and optionally to the customer.' },
  { icon: Clock,  title: 'Menu sync across platforms',  desc: 'Change a price or availability once — it updates everywhere instantly.' },
];

const DeliveryIntegrationModal = () => (
  <div className="space-y-8 text-neutral-700 dark:text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/25
                      flex items-center justify-center flex-shrink-0">
        <Truck className="w-7 h-7 text-primary-600 dark:text-primary-400" />
      </div>
      <div>
        <p className="text-neutral-700 dark:text-slate-300 leading-relaxed">
          Stop juggling five different apps. We connect your website directly to your delivery
          and service partners so everything flows automatically — orders, status updates,
          cancellations — all in one place.
        </p>
      </div>
    </div>

    {/* Capabilities */}
    <div>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">What the integration does</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((c) => (
          <div key={c.title} className="p-4 rounded-xl bg-cream-100 dark:bg-white/[0.03] border border-primary-200/70 dark:border-white/[0.06]">
            <div className="flex items-center gap-3 mb-2">
              <c.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <div className="text-neutral-900 dark:text-white text-sm font-semibold">{c.title}</div>
            </div>
            <div className="text-neutral-500 dark:text-slate-500 text-xs leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Partner logos */}
    <div>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Supported delivery partners</h4>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {integrations.map((p) => (
          <div key={p.name} className={`flex flex-col items-center gap-2 p-3 rounded-xl
                                        ${p.bg} border ${p.border} text-center`}>
            <div className={`text-2xl font-bold ${p.color}`}>{p.letter}</div>
            <div className="text-xs text-neutral-600 dark:text-slate-400 leading-tight">{p.name}</div>
          </div>
        ))}
      </div>
      <p className="text-neutral-500 dark:text-slate-500 text-xs mt-3">
        Don't see yours? We build custom connectors for any delivery or booking platform with an API.
      </p>
    </div>

    {/* How it works */}
    <div>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">How the integration works</h4>
      <div className="space-y-3">
        {[
          { n: '01', t: 'We connect your accounts',   d: 'Secure API authentication with each partner. No credentials shared with third parties.' },
          { n: '02', t: 'Menu & services are synced', d: 'Your offerings push to every platform automatically. One source of truth.' },
          { n: '03', t: 'Orders flow into one inbox', d: 'Every order, regardless of source, appears in your admin panel in real time.' },
          { n: '04', t: 'Status updates are automated', d: 'Accepted, in-progress, delivered — all tracked and communicated automatically.' },
        ].map((s) => (
          <div key={s.n} className="flex items-start gap-4">
            <span className="text-3xl font-bold text-primary-500/30 font-display leading-none flex-shrink-0 w-10">{s.n}</span>
            <div className="pt-0.5">
              <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-0.5">{s.t}</div>
              <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Benefits */}
    <div className="p-5 rounded-xl bg-gradient-to-r from-primary-500/10 to-glow-500/10 border border-primary-500/25">
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Impact on your business</h4>
      <div className="grid grid-cols-3 gap-4">
        {[
          { v: '80%', l: 'Less time managing orders manually' },
          { v: '15–30%', l: 'Commission saved vs. marketplace-only' },
          { v: '1 panel', l: 'To manage all platforms' },
        ].map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-1">{s.v}</div>
            <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Works for */}
    <div>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-3">Works for any business type</h4>
      <div className="flex flex-wrap gap-2">
        {['Restaurants', 'Ghost kitchens', 'Meal prep', 'Grocery', 'Flower shops', 'Pharmacy delivery', 'Laundry services'].map((t) => (
          <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-cream-100 dark:bg-white/[0.05] border border-primary-200/70 dark:border-white/[0.08] text-xs text-neutral-700 dark:text-slate-300">
            <CheckCircle className="w-3 h-3 text-glow-600 dark:text-glow-400" />
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default DeliveryIntegrationModal;
