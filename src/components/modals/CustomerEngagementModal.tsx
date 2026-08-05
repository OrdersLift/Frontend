import { motion } from 'framer-motion';
import { Bell, MessageSquare, Heart, Target, Zap, CheckCircle } from 'lucide-react';
import { fadeIn, staggerContainer } from '../../lib/motion';

const channels = [
  {
    icon: MessageSquare,
    name: 'WhatsApp Business',
    tag: 'Highest open rate',
    items: ['Order confirmations', 'Booking reminders', 'Special offers', 'Re-engagement nudges'],
    color: 'text-glow-600 dark:text-glow-400',
    bg: 'bg-glow-500/10',
  },
  {
    icon: Bell,
    name: 'SMS',
    tag: 'Instant delivery',
    items: ['Table ready alerts', 'Booking reminders', 'Loyalty rewards', 'Last-minute table offers'],
    color: 'text-glow-700 dark:text-glow-300',
    bg: 'bg-glow-500/10',
  },
  {
    icon: Target,
    name: 'Email',
    tag: 'Rich content',
    items: ['New menu launches', 'Seasonal campaigns', 'Review requests', 'Guest surveys'],
    color: 'text-accent-700 dark:text-accent-300',
    bg: 'bg-accent-500/10',
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
    desc: 'Spots regulars who haven\'t booked in 30+ days and sends them a reason to come back.',
    tag: 'AI-triggered',
  },
  {
    emoji: '⭐',
    title: 'Loyalty Milestone',
    desc: 'After 5 or 10 visits a guest gets an automatic reward — a free dessert, a drink on you.',
    tag: 'Automated',
  },
  {
    emoji: '📢',
    title: 'New Menu Launch',
    desc: 'Launch a new menu and the guests most likely to book hear about it the same day.',
    tag: 'One-click blast',
  },
];

const CustomerEngagementModal = () => (
  /* One level of stagger, no `whileInView` — the modal body is a scroll
     container and the panel is already animating in. */
  <motion.div
    variants={staggerContainer(0.05)}
    initial="hidden"
    animate="show"
    className="space-y-8 text-neutral-700 dark:text-slate-300"
  >
    {/* Intro */}
    <motion.div variants={fadeIn} className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-accent-500/15 border border-accent-500/25
                      flex items-center justify-center flex-shrink-0">
        <Bell className="w-7 h-7 text-accent-700 dark:text-accent-300" />
      </div>
      <div>
        <p className="text-neutral-700 dark:text-slate-300 leading-relaxed">
          Most restaurants lose regulars through silence. We keep your guests engaged —
          automatically — with personal messages across WhatsApp, SMS, and email.
          You set the rules once. The AI handles the rest.
        </p>
      </div>
    </motion.div>

    {/* Channels */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Engagement channels</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {channels.map((c) => (
          <div key={c.name} className="surface-inset p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                <c.icon className={`w-4 h-4 ${c.color}`} />
              </div>
              <div className="min-w-0">
                <div className="text-neutral-900 dark:text-white text-sm font-semibold">{c.name}</div>
                <div className={`text-xs ${c.color}`}>{c.tag}</div>
              </div>
            </div>
            <ul className="space-y-1">
              {c.items.map((i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-slate-400">
                  <span className={`w-1 h-1 rounded-full ${c.color} bg-current flex-shrink-0`} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Campaign examples */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Automated campaign examples</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {campaigns.map((c) => (
          <div key={c.title} className="surface-inset p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{c.emoji}</span>
                <div className="text-neutral-900 dark:text-white text-sm font-semibold">{c.title}</div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-600 dark:text-primary-400
                               text-xs font-medium flex-shrink-0">
                {c.tag}
              </span>
            </div>
            <div className="text-neutral-500 dark:text-slate-500 text-xs leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Smart segmentation */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Smart customer segmentation</h4>
      <div className="space-y-2">
        {[
          'High-spend regulars (top 20% by bill)',
          'At-risk regulars (not booked in 21+ days)',
          'New guests (first 3 visits)',
          'Dish-specific segments (e.g. "always orders the tasting menu")',
          'Birthday month guests',
        ].map((s) => (
          <div key={s} className="surface-inset flex items-center gap-3 p-3">
            <CheckCircle className="w-4 h-4 text-accent-700 dark:text-accent-300 flex-shrink-0" />
            <span className="text-neutral-700 dark:text-slate-300 text-sm">{s}</span>
          </div>
        ))}
      </div>
      <p className="text-neutral-500 dark:text-slate-500 text-xs mt-3">
        You choose the segment → we build the campaign → AI sends at the optimal time.
      </p>
    </motion.div>

    {/* Impact stats */}
    <motion.div variants={fadeIn} className="surface-inset-brand p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { v: '35%', l: 'More repeat bookings' },
        { v: '2.5×', l: 'Guest lifetime value' },
        { v: '60%', l: 'Reduction in churn' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-accent-600 to-glow-400
                          bg-clip-text text-transparent mb-1">{s.v}</div>
          <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </motion.div>

    {/* Works for */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-3">Works for every kind of venue</h4>
      <div className="flex flex-wrap gap-2">
        {['Restaurants', 'Cafés', 'Bars & pubs', 'Takeaways', 'Pizzerias', 'Bakeries', 'Food trucks'].map((t) => (
          <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-cream-100 dark:bg-white/[0.05] border border-primary-200/70 dark:border-white/[0.08] text-xs text-neutral-700 dark:text-slate-300">
            <Zap className="w-3 h-3 text-accent-700 dark:text-accent-300" />
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default CustomerEngagementModal;
