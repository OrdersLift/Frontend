import { BarChart3, TrendingUp, DollarSign, Calendar, Target, Users } from 'lucide-react';

const metrics = [
  { icon: TrendingUp, title: 'Revenue trends',         desc: 'Daily, weekly, monthly breakdowns with growth percentages and comparisons.', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: DollarSign, title: 'Profit margin per item', desc: 'Understand which services or products are most profitable and which drain margin.', color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { icon: Calendar,   title: 'Peak hour analysis',     desc: 'See exactly when you\'re busiest so you can staff accordingly and run better promotions.', color: 'text-accent-400', bg: 'bg-accent-500/10' },
  { icon: Target,     title: 'Goal tracking',          desc: 'Set weekly or monthly targets. Dashboard shows progress in real time with alerts.', color: 'text-glow-400', bg: 'bg-glow-500/10' },
  { icon: Users,      title: 'Customer lifetime value', desc: 'Know which customers are worth the most and focus retention efforts where they matter.', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: BarChart3,  title: 'Service performance',    desc: 'Rank your services or menu items by revenue, volume, and growth rate.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

const mockStats = [
  { label: "This Week's Revenue", value: '£8,420', change: '+14%', up: true },
  { label: 'Top Service',         value: 'Haircut + Style', change: '38 bookings', up: true },
  { label: 'Avg Booking Value',   value: '£47.50', change: '+£6 vs last month', up: true },
  { label: 'New Customers',       value: '23', change: '+8 vs last week', up: true },
];

const SalesInsightsModal = () => (
  <div className="space-y-8 text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/20
                      flex items-center justify-center flex-shrink-0">
        <BarChart3 className="w-7 h-7 text-green-400" />
      </div>
      <div>
        <p className="text-slate-300 leading-relaxed">
          Your business generates data every day. Most owners never see it clearly.
          Our dashboard turns your raw transactions into plain-English insights —
          so you always know what's working, what's not, and what to do next.
        </p>
      </div>
    </div>

    {/* Mock dashboard */}
    <div>
      <h4 className="text-white font-semibold mb-4">Example dashboard snapshot</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-xl bg-white/03 border border-white/07">
        {mockStats.map((s) => (
          <div key={s.label} className="p-3 rounded-lg bg-white/04 border border-white/06">
            <div className="text-slate-500 text-xs mb-2">{s.label}</div>
            <div className="text-white font-bold text-lg mb-1">{s.value}</div>
            <div className={`text-xs font-medium ${s.up ? 'text-green-400' : 'text-red-400'}`}>
              {s.change}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Metric cards */}
    <div>
      <h4 className="text-white font-semibold mb-4">What you'll track</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/03 border border-white/06">
            <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center flex-shrink-0`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-0.5">{m.title}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Report cadence */}
    <div>
      <h4 className="text-white font-semibold mb-4">Report cadence</h4>
      <div className="grid grid-cols-3 gap-3">
        {[
          { period: 'Daily',   desc: 'Real-time updates. Yesterday vs today at a glance.' },
          { period: 'Weekly',  desc: 'Trend analysis. What changed and why.' },
          { period: 'Monthly', desc: 'Full business review with AI-generated recommendations.' },
        ].map((r) => (
          <div key={r.period} className="p-4 rounded-xl bg-white/03 border border-white/06 text-center">
            <div className="text-xl font-bold gradient-text-blue mb-2">{r.period}</div>
            <div className="text-slate-500 text-xs">{r.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Impact */}
    <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-gradient-to-r from-green-500/08 to-accent-500/08 border border-white/06">
      {[
        { v: '25%', l: 'Average margin improvement' },
        { v: '3×',  l: 'Faster business decisions' },
        { v: '40%', l: 'Less time in spreadsheets' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">{s.v}</div>
          <div className="text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </div>
  </div>
);

export default SalesInsightsModal;
