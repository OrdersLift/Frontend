import { motion } from 'framer-motion';
import { Mic, Phone, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { fadeIn, staggerContainer } from '../../lib/motion';

const capabilities = [
  { icon: Phone,        title: 'Answers every call',       desc: 'Picks up when the pass is slammed, greets the caller, and handles the usual requests — no missed bookings.', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10' },
  { icon: Calendar,     title: 'Takes reservations',       desc: 'Checks real table availability and books straight into your system.', color: 'text-glow-600 dark:text-glow-400', bg: 'bg-glow-500/10' },
  { icon: MessageSquare, title: 'Answers the usual questions', desc: 'Opening hours, parking, dietary options, directions — handled naturally by voice.', color: 'text-accent-700 dark:text-accent-300', bg: 'bg-accent-500/10' },
  { icon: Clock,        title: 'Routes complex calls',     desc: 'When a query needs a human, it transfers gracefully with a summary of what was discussed.', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10' },
];

const callExamples = [
  { caller: 'Guest calls to book:', transcript: '"Hi, table for four next Tuesday evening?" → Bot checks availability, offers times, confirms the booking.' },
  { caller: 'Guest calls about the menu:', transcript: '"Do you have a set menu and what does it cost?" → Bot answers instantly with current pricing.' },
  { caller: 'Guest asks for directions:', transcript: '"How do I get to you from the town centre?" → Bot gives directions and texts a maps link.' },
];

const RestaurantAnalyticsModal = () => (
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
      <div className="w-14 h-14 rounded-2xl bg-accent-500/15 border border-accent-500/20
                      flex items-center justify-center flex-shrink-0">
        <Mic className="w-7 h-7 text-accent-700 dark:text-accent-300" />
      </div>
      <div>
        <p className="text-neutral-700 dark:text-slate-300 leading-relaxed">
          Every missed call is an empty table. Our voice agent answers your phone 24/7,
          takes reservations, answers questions, and passes anything tricky to your team —
          all in a natural, conversational voice that represents your brand.
        </p>
      </div>
    </motion.div>

    {/* What it does */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">What the Voice AI handles</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((c) => (
          <div key={c.title} className="surface-inset flex items-start gap-4 p-4">
            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </div>
            <div>
              <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-0.5">{c.title}</div>
              <div className="text-neutral-500 dark:text-slate-500 text-xs leading-relaxed">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Example calls */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Real call examples</h4>
      <div className="space-y-3">
        {callExamples.map((e) => (
          <div key={e.caller} className="surface-inset p-4">
            <div className="text-xs text-neutral-500 dark:text-slate-500 font-medium mb-2">{e.caller}</div>
            <div className="text-sm text-neutral-800 dark:text-slate-200 leading-relaxed">{e.transcript}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-accent-700 dark:text-accent-300" />
              <span className="text-xs text-accent-700 dark:text-accent-300">Handled without human involvement</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Call transcription — a tinted callout keeps its own colour, but takes the system radius */}
    <motion.div variants={fadeIn} className="p-5 rounded-[var(--radius-inset)] bg-accent-50 dark:bg-accent-500/[0.05]
                    border border-accent-300 dark:border-accent-500/15">
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-3">Every call is transcribed & logged</h4>
      <p className="text-neutral-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
        Full transcripts of every call appear in your admin panel. Review what guests are asking,
        spot recurring issues, and use the data to improve your service.
      </p>
      <div className="flex flex-wrap gap-2">
        {['Full transcripts', 'Caller intent summary', 'Booking confirmations', 'Missed call alerts', 'Call volume analytics'].map((f) => (
          <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                    bg-cream-100 dark:bg-white/[0.05] border border-primary-200/70 dark:border-white/[0.08] text-xs text-neutral-700 dark:text-slate-300">
            <CheckCircle className="w-3 h-3 text-accent-700 dark:text-accent-300" />
            {f}
          </span>
        ))}
      </div>
    </motion.div>

    {/* Stats */}
    <motion.div variants={fadeIn} className="surface-inset-brand p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { v: '100%', l: 'Calls answered' },
        { v: '24/7', l: 'No holidays, no sick days' },
        { v: '70%', l: 'Calls handled without staff' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold text-accent-700 dark:text-accent-300 mb-1">{s.v}</div>
          <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </motion.div>

    {/* Works for */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-3">Busiest for</h4>
      <div className="flex flex-wrap gap-2">
        {['Friday & Saturday service', 'Sunday lunch bookings', 'Christmas party season', 'Valentine\'s Day', 'Large group enquiries', 'Bank holidays'].map((t) => (
          <span key={t} className="px-3 py-1.5 rounded-full bg-cream-100 dark:bg-white/[0.05] border border-primary-200/70 dark:border-white/[0.08] text-xs text-neutral-700 dark:text-slate-300">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default RestaurantAnalyticsModal;
