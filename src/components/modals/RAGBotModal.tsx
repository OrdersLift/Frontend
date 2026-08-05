import { motion } from 'framer-motion';
import { Brain, Database, FileText, MessageSquare, Lock, Zap, CheckCircle } from 'lucide-react';
import { fadeIn, staggerContainer } from '../../lib/motion';

const sources = [
  { icon: Database,    label: 'Your database (SQL / NoSQL)',   color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-500/10' },
  { icon: FileText,    label: 'PDFs, docs, spreadsheets',      color: 'text-glow-600 dark:text-glow-400',    bg: 'bg-glow-500/10' },
  { icon: MessageSquare, label: 'Google Drive / Notion',       color: 'text-accent-700 dark:text-accent-300',  bg: 'bg-accent-500/10' },
  { icon: Zap,         label: 'POS & booking exports',         color: 'text-primary-600 dark:text-primary-400',  bg: 'bg-primary-500/10' },
];

const questions = [
  { role: 'Owner asks:',   q: '"What did we take last month compared to the month before?"' },
  { role: 'Manager asks:', q: '"How many no-shows did we have on Saturday night?"' },
  { role: 'Staff asks:',   q: '"What\'s our policy on splitting bills for large parties?"' },
  { role: 'Owner asks:',   q: '"Which five dishes made us the most money this month?"' },
];

const RAGBotModal = () => (
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
      <div className="w-14 h-14 rounded-2xl bg-glow-500/15 border border-glow-500/20
                      flex items-center justify-center flex-shrink-0">
        <Brain className="w-7 h-7 text-glow-600 dark:text-glow-400" />
      </div>
      <div>
        <p className="text-neutral-700 dark:text-slate-300 leading-relaxed">
          RAG (Retrieval-Augmented Generation) means the AI reads <em className="text-neutral-900 dark:text-white not-italic font-medium">your actual data</em> —
          not the internet — before answering. Your team and owner ask questions in plain English
          and get real answers from your own restaurant data. No dashboards needed.
        </p>
      </div>
    </motion.div>

    {/* What it connects to */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">What data sources it connects to</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sources.map((s) => (
          <div key={s.label} className="surface-inset flex items-center gap-3 p-4">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-slate-300">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="text-neutral-500 dark:text-slate-500 text-xs mt-3">
        If your data lives somewhere, we can build a connector. We also support custom APIs and CRM exports.
      </p>
    </motion.div>

    {/* Example questions */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Questions your team can ask</h4>
      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.q} className="surface-inset p-4">
            <div className="text-xs text-neutral-500 dark:text-slate-500 font-medium mb-1.5">{q.role}</div>
            <div className="text-sm text-neutral-800 dark:text-slate-200 italic">{q.q}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-glow-600 dark:text-glow-400" />
              <span className="text-xs text-glow-600 dark:text-glow-400">Answered instantly from your live data</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* RAG methods */}
    <motion.div variants={fadeIn}>
      <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">RAG methods we implement</h4>
      <div className="space-y-3">
        {[
          { name: 'Document RAG',    desc: 'Upload PDFs, SOPs, manuals — bot answers from them instantly.' },
          { name: 'Database RAG',    desc: 'Connect live database — bot queries real numbers, not cached summaries.' },
          { name: 'Menu RAG',        desc: 'Reads your live menu — the bot always quotes the current price.' },
          { name: 'Multi-source RAG', desc: 'Combine docs + database + calendar in one unified bot.' },
        ].map((m) => (
          <div key={m.name} className="surface-inset flex items-start gap-3 p-4">
            <span className="w-2 h-2 rounded-full bg-glow-400 flex-shrink-0 mt-1.5" />
            <div>
              <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-0.5">{m.name}</div>
              <div className="text-neutral-500 dark:text-slate-500 text-xs">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Privacy — a tinted callout keeps its own colour, but takes the system radius */}
    <motion.div variants={fadeIn} className="flex items-start gap-4 p-5 rounded-[var(--radius-inset)]
                    bg-glow-50 dark:bg-glow-500/[0.05] border border-glow-300 dark:border-glow-500/15">
      <Lock className="w-5 h-5 text-glow-600 dark:text-glow-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="text-neutral-900 dark:text-white text-sm font-semibold mb-1">Your data never leaves your control</div>
        <p className="text-neutral-600 dark:text-slate-400 text-xs leading-relaxed">
          The bot runs on your own infrastructure or a private cloud. Your restaurant data is never
          shared with third parties, never used to train public models. Full data sovereignty.
        </p>
      </div>
    </motion.div>

    {/* Stats */}
    <motion.div variants={fadeIn} className="surface-inset-brand p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { v: '< 2s',  l: 'Answer time' },
        { v: '100%',  l: 'Your private data' },
        { v: 'Any',   l: 'Data source we can connect' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-glow-400 to-primary-400
                          bg-clip-text text-transparent mb-1">{s.v}</div>
          <div className="text-neutral-500 dark:text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </motion.div>
  </motion.div>
);

export default RAGBotModal;
