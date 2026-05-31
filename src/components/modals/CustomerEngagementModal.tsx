import { Bell, MessageSquare, Heart, Target, Zap, CheckCircle } from 'lucide-react';

const channels = [
  {
    icon: MessageSquare,
    name: 'WhatsApp Business',
    tag: 'Highest open rate',
    items: ['Order confirmations', 'Appointment reminders', 'Special offers', 'Re-engagement nudges'],
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Bell,
    name: 'SMS',
    tag: 'Instant delivery',
    items: ['Flash sale alerts', 'Booking reminders', 'Loyalty reward alerts', 'Short-notice promos'],
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Target,
    name: 'Email',
    tag: 'Rich content',
    items: ['Monthly newsletters', 'Seasonal campaigns', 'Review requests', 'Customer surveys'],
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];

const campaigns = [
  {
    emoji: '🎂',
    title: 'Birthday Reward',
    desc: 'Auto-sends a personalised discount on the customer\'s birthday. Zero manual effort.',
    tag: 'Automated',
  },
  {
    emoji: '🔄',
    title: 'Win-Back Campaign',
    desc: 'Detects customers who haven\'t returned in 30+ days. Sends a compelling offer automatically.',
    tag: 'AI-triggered',
  },
  {
    emoji: '⭐',
    title: 'Loyalty Milestone',
    desc: 'When a customer hits 5 or 10 visits, they get an automatic reward — building long-term loyalty.',
    tag: 'Automated',
  },
  {
    emoji: '📢',
    title: 'New Service Launch',
    desc: 'When you add a new service or menu item, we notify your most relevant customer segments instantly.',
    tag: 'One-click blast',
  },
];

const CustomerEngagementModal = () => (
  <div className="space-y-8 text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/20
                      flex items-center justify-center flex-shrink-0">
        <Bell className="w-7 h-7 text-purple-400" />
      </div>
      <div>
        <p className="text-slate-300 leading-relaxed">
          Most businesses lose customers through silence. We keep your customers engaged —
          automatically — with personalised messages across WhatsApp, SMS, and email.
          You set the rules once. The AI handles the rest.
        </p>
      </div>
    </div>

    {/* Channels */}
    <div>
      <h4 className="text-white font-semibold mb-4">Engagement channels</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {channels.map((c) => (
          <div key={c.name} className={`p-4 rounded-xl bg-white/03 border ${c.border}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                <c.icon className={`w-4 h-4 ${c.color}`} />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{c.name}</div>
                <div className={`text-xs ${c.color}`}>{c.tag}</div>
              </div>
            </div>
            <ul className="space-y-1">
              {c.items.map((i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className={`w-1 h-1 rounded-full ${c.color} bg-current`} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {/* Campaign examples */}
    <div>
      <h4 className="text-white font-semibold mb-4">Automated campaign examples</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {campaigns.map((c) => (
          <div key={c.title} className="p-4 rounded-xl bg-white/03 border border-white/06">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{c.emoji}</span>
                <div className="text-white text-sm font-semibold">{c.title}</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-400
                               text-xs font-medium flex-shrink-0">
                {c.tag}
              </span>
            </div>
            <div className="text-slate-500 text-xs leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Smart segmentation */}
    <div>
      <h4 className="text-white font-semibold mb-4">Smart customer segmentation</h4>
      <div className="space-y-2">
        {[
          'High-value regulars (top 20% by spend)',
          'At-risk customers (not visited in 21+ days)',
          'New customers (first 3 visits)',
          'Service-specific segments (e.g. "always books haircuts")',
          'Birthday month customers',
        ].map((s) => (
          <div key={s} className="flex items-center gap-3 p-3 rounded-lg bg-white/03 border border-white/06">
            <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-slate-300 text-sm">{s}</span>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs mt-3">
        You choose the segment → we build the campaign → AI sends at the optimal time.
      </p>
    </div>

    {/* Impact stats */}
    <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-gradient-to-r from-purple-500/08 to-glow-500/08 border border-white/06">
      {[
        { v: '35%', l: 'More repeat visits' },
        { v: '2.5×', l: 'Customer lifetime value' },
        { v: '60%', l: 'Reduction in churn' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-glow-400
                          bg-clip-text text-transparent mb-1">{s.v}</div>
          <div className="text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </div>

    {/* Works for */}
    <div>
      <h4 className="text-white font-semibold mb-3">Works for any business</h4>
      <div className="flex flex-wrap gap-2">
        {['Restaurants', 'Salons', 'Gyms', 'Dental clinics', 'Hotels', 'Retail shops', 'Auto garages'].map((t) => (
          <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-white/05 border border-white/08 text-xs text-slate-300">
            <Zap className="w-3 h-3 text-purple-400" />
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default CustomerEngagementModal;
