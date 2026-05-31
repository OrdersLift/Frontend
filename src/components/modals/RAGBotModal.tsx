import { Brain, Database, FileText, MessageSquare, Lock, Zap, CheckCircle } from 'lucide-react';

const sources = [
  { icon: Database,    label: 'Your database (SQL / NoSQL)',   color: 'text-primary-400', bg: 'bg-primary-500/10' },
  { icon: FileText,    label: 'PDFs, docs, spreadsheets',      color: 'text-glow-400',    bg: 'bg-glow-500/10' },
  { icon: MessageSquare, label: 'Google Drive / Notion',       color: 'text-accent-400',  bg: 'bg-accent-500/10' },
  { icon: Zap,         label: 'POS & booking system exports',  color: 'text-orange-400',  bg: 'bg-orange-500/10' },
];

const questions = [
  { role: 'Owner asks:',   q: '"What was our total revenue last month compared to the month before?"' },
  { role: 'Manager asks:', q: '"Which service had the most no-shows this week?"' },
  { role: 'Staff asks:',   q: '"What\'s our refund policy for missed appointments?"' },
  { role: 'Owner asks:',   q: '"Show me the top 5 customers by lifetime value."' },
];

const RAGBotModal = () => (
  <div className="space-y-8 text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-glow-500/15 border border-glow-500/20
                      flex items-center justify-center flex-shrink-0">
        <Brain className="w-7 h-7 text-glow-400" />
      </div>
      <div>
        <p className="text-slate-300 leading-relaxed">
          RAG (Retrieval-Augmented Generation) means the AI reads <em className="text-white not-italic font-medium">your actual data</em> —
          not the internet — before answering. Your team and owner ask questions in plain English
          and get accurate, real answers from your own business data. No dashboards needed.
        </p>
      </div>
    </div>

    {/* What it connects to */}
    <div>
      <h4 className="text-white font-semibold mb-4">What data sources it connects to</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sources.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-4 rounded-xl bg-white/03 border border-white/06">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <span className="text-sm text-slate-300">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs mt-3">
        If your data lives somewhere, we can build a connector. We also support custom APIs and CRM exports.
      </p>
    </div>

    {/* Example questions */}
    <div>
      <h4 className="text-white font-semibold mb-4">Questions your team can ask</h4>
      <div className="space-y-3">
        {questions.map((q) => (
          <div key={q.q} className="p-4 rounded-xl bg-white/03 border border-white/06">
            <div className="text-xs text-slate-500 font-medium mb-1.5">{q.role}</div>
            <div className="text-sm text-slate-200 italic">{q.q}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-glow-400" />
              <span className="text-xs text-glow-400">Answered instantly from your live data</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* RAG methods */}
    <div>
      <h4 className="text-white font-semibold mb-4">RAG methods we implement</h4>
      <div className="space-y-3">
        {[
          { name: 'Document RAG',    desc: 'Upload PDFs, SOPs, manuals — bot answers from them instantly.' },
          { name: 'Database RAG',    desc: 'Connect live database — bot queries real numbers, not cached summaries.' },
          { name: 'Website RAG',     desc: 'Crawl your website — instant knowledge base, zero setup from you.' },
          { name: 'Multi-source RAG', desc: 'Combine docs + database + calendar in one unified bot.' },
        ].map((m) => (
          <div key={m.name} className="flex items-start gap-3 p-4 rounded-xl bg-white/03 border border-white/06">
            <span className="w-2 h-2 rounded-full bg-glow-400 flex-shrink-0 mt-1.5" />
            <div>
              <div className="text-white text-sm font-semibold mb-0.5">{m.name}</div>
              <div className="text-slate-500 text-xs">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Privacy */}
    <div className="flex items-start gap-4 p-5 rounded-xl bg-glow-500/05 border border-glow-500/15">
      <Lock className="w-5 h-5 text-glow-400 flex-shrink-0 mt-0.5" />
      <div>
        <div className="text-white text-sm font-semibold mb-1">Your data never leaves your control</div>
        <p className="text-slate-400 text-xs leading-relaxed">
          The RAG bot runs on your own infrastructure or a private cloud. Your business data is never
          shared with third parties, never used to train public models. Full data sovereignty.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-gradient-to-r from-glow-500/08 to-primary-500/08 border border-white/06">
      {[
        { v: '< 2s',  l: 'Answer time' },
        { v: '100%',  l: 'Your private data' },
        { v: 'Any',   l: 'Data source we can connect' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-glow-400 to-primary-400
                          bg-clip-text text-transparent mb-1">{s.v}</div>
          <div className="text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </div>
  </div>
);

export default RAGBotModal;
