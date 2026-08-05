import { motion } from 'framer-motion';
import { MessageCircle, Mic, Brain, Zap, Users, Clock, CheckCircle } from 'lucide-react';
import { fadeIn, staggerContainer } from '../../lib/motion';

const capabilities = [
  {
    icon: Mic,
    title: 'Voice & Text',
    desc: 'Customers interact by typing or speaking. The bot responds naturally in both modes.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    icon: Brain,
    title: 'Trained on Your Data',
    desc: 'Knows your dishes, prices, allergens and opening hours — not a generic bot.',
    color: 'text-glow-600 dark:text-glow-400',
    bg: 'bg-glow-500/10',
  },
  {
    icon: Zap,
    title: 'Instant Answers',
    desc: 'Zero wait time. Customers get accurate answers 24/7 without human intervention.',
    color: 'text-accent-700 dark:text-accent-300',
    bg: 'bg-accent-500/10',
  },
  {
    icon: Users,
    title: 'Personalised',
    desc: 'Remembers regulars and what they usually order, and answers accordingly.',
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-500/10',
  },
];

const steps = [
  { n: '01', title: 'We learn your menu', desc: 'Dishes, prices, allergens, hours, booking rules — all fed into the AI.' },
  { n: '02', title: 'We build & embed the bot', desc: 'A branded widget integrated directly into your website.' },
  { n: '03', title: 'Goes live, stays updated', desc: 'Change a dish or a price and the bot knows immediately.' },
];

const examples = [
  { label: 'Guest asks:', q: '"Do you have gluten-free pasta and is there parking nearby?"' },
  { label: 'Guest asks:', q: '"Can I book a table for six on Friday at 8pm?"' },
  { label: 'Guest asks:', q: '"Is the kitchen still open? What time is last orders?"' },
];

const AIChatbotModal = () => (
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
      <div className="w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/20
                      flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-7 h-7 text-primary-600 dark:text-primary-400" />
      </div>
      <div>
        <p className="text-neutral-700 dark:text-slate-300 leading-relaxed">
          A 24/7 assistant trained on your menu and your restaurant. It handles guest questions
          instantly — so your team can stay on the floor instead of on the phone.
          Works on your website, WhatsApp, and SMS.
        </p>
      </div>
    </motion.div>

    {/* Capabilities */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">What it can do</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((c) => (
          <div key={c.title} className="surface-inset flex items-start gap-4 p-4">
            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </div>
            <div>
              <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-1">{c.title}</div>
              <div className="text-neutral-500 dark:text-slate-500 text-xs leading-relaxed">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Real examples */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Real conversation examples</h4>
      <div className="space-y-3">
        {examples.map((e) => (
          <div key={e.label} className="surface-inset p-4">
            <div className="text-xs text-neutral-500 dark:text-slate-500 mb-2 font-medium">{e.label}</div>
            <div className="text-sm text-neutral-800 dark:text-slate-200 italic">{e.q}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-glow-600 dark:text-glow-400" />
              <span className="text-xs text-glow-600 dark:text-glow-400">Bot answers instantly, correctly</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* How it works */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">How we set it up</h4>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.n} className="flex items-start gap-4">
            <span className="text-3xl font-bold text-primary-500/30 font-display leading-none flex-shrink-0 w-10">{s.n}</span>
            <div className="pt-0.5">
              <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-0.5">{s.title}</div>
              <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Stats */}
    <motion.div variants={fadeIn} className="surface-inset-brand p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { v: '24/7', l: 'Always available' },
        { v: '<1s',  l: 'Response time' },
        { v: '85%',  l: 'Questions answered without staff' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400
                          bg-clip-text text-transparent mb-1">{s.v}</div>
          <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </motion.div>

    {/* Channels */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-3">Works across channels</h4>
      <div className="flex flex-wrap gap-2">
        {['Website widget', 'WhatsApp Business', 'SMS', 'Embedded chat bubble', 'Facebook Messenger'].map((c) => (
          <span key={c} className="px-3 py-1.5 rounded-full bg-cream-100 dark:bg-white/[0.05] border border-primary-200/70 dark:border-white/[0.08]
                                   text-neutral-700 dark:text-slate-300 text-xs font-medium">
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default AIChatbotModal;
