import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Calendar, Target, Users } from 'lucide-react';
import { fadeIn, staggerContainer } from '../../lib/motion';

const metrics = [
  { icon: TrendingUp, title: 'Revenue trends',         desc: 'Daily, weekly, monthly breakdowns with growth percentages and comparisons.', color: 'text-glow-600 dark:text-glow-400', bg: 'bg-glow-500/10' },
  { icon: DollarSign, title: 'Profit margin per dish', desc: 'See which dishes actually make money and which quietly drain your margin.', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10' },
  { icon: Calendar,   title: 'Peak hour analysis',     desc: 'See exactly when you\'re busiest so you can roster properly instead of guessing.', color: 'text-accent-700 dark:text-accent-300', bg: 'bg-accent-500/10' },
  { icon: Target,     title: 'Goal tracking',          desc: 'Set weekly or monthly targets. Dashboard shows progress in real time with alerts.', color: 'text-glow-600 dark:text-glow-400', bg: 'bg-glow-500/10' },
  { icon: Users,      title: 'Guest lifetime value',   desc: 'Know which regulars are worth the most and look after them properly.', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10' },
  { icon: BarChart3,  title: 'Menu performance',       desc: 'Rank every dish by revenue, covers sold, and growth week on week.', color: 'text-accent-700 dark:text-accent-300', bg: 'bg-accent-500/10' },
];

const mockStats = [
  { label: "This Week's Revenue", value: '£8,420', change: '+14%', up: true },
  { label: 'Top Dish',            value: 'Truffle Risotto', change: '38 covers', up: true },
  { label: 'Avg Spend Per Head',  value: '£47.50', change: '+£6 vs last month', up: true },
  { label: 'New Guests',          value: '23', change: '+8 vs last week', up: true },
];

const SalesInsightsModal = () => (
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
      <div className="w-14 h-14 rounded-2xl bg-glow-500/15 border border-glow-500/25
                      flex items-center justify-center flex-shrink-0">
        <BarChart3 className="w-7 h-7 text-glow-600 dark:text-glow-400" />
      </div>
      <div>
        <p className="text-neutral-700 dark:text-slate-300 leading-relaxed">
          Your restaurant generates data every service. Most owners never see it clearly.
          Our dashboard turns your raw transactions into plain-English insights —
          so you always know what's selling, what isn't, and what to change.
        </p>
      </div>
    </motion.div>

    {/* Mock dashboard — the one legitimate two-level nest: tiles inside a panel */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Example dashboard snapshot</h4>
      <div className="surface-card p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {mockStats.map((s) => (
          <div key={s.label} className="surface-inset p-3">
            <div className="text-neutral-500 dark:text-slate-500 text-xs mb-2">{s.label}</div>
            <div className="text-neutral-900 dark:text-white font-bold text-lg mb-1">{s.value}</div>
            <div className={`text-xs font-medium ${s.up ? 'text-glow-600 dark:text-glow-400' : 'text-primary-700 dark:text-primary-300'}`}>
              {s.change}
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Metric cards */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">What you'll track</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.title} className="surface-inset flex items-start gap-4 p-4">
            <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center flex-shrink-0`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div>
              <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-0.5">{m.title}</div>
              <div className="text-neutral-500 dark:text-slate-500 text-xs leading-relaxed">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Report cadence */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Report cadence</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { period: 'Daily',   desc: 'Real-time updates. Yesterday vs today at a glance.' },
          { period: 'Weekly',  desc: 'Trend analysis. What changed and why.' },
          { period: 'Monthly', desc: 'Full business review with AI-generated recommendations.' },
        ].map((r) => (
          <div key={r.period} className="surface-inset p-4 text-center">
            <div className="text-xl font-bold gradient-text-blue mb-2">{r.period}</div>
            <div className="text-neutral-500 dark:text-slate-500 text-xs">{r.desc}</div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Impact */}
    <motion.div variants={fadeIn} className="surface-inset-brand p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { v: '25%', l: 'Average margin improvement' },
        { v: '3×',  l: 'Faster business decisions' },
        { v: '40%', l: 'Less time on paperwork' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold text-glow-600 dark:text-glow-400 mb-1">{s.v}</div>
          <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

export default SalesInsightsModal;
