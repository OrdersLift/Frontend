import { MessageCircle, Mic, Brain, Zap, Users, Clock, CheckCircle } from 'lucide-react';

const capabilities = [
  {
    icon: Mic,
    title: 'Voice & Text',
    desc: 'Customers interact by typing or speaking. The bot responds naturally in both modes.',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10',
  },
  {
    icon: Brain,
    title: 'Trained on Your Data',
    desc: 'Understands your specific services, prices, hours, FAQs — not a generic bot.',
    color: 'text-glow-400',
    bg: 'bg-glow-500/10',
  },
  {
    icon: Zap,
    title: 'Instant Answers',
    desc: 'Zero wait time. Customers get accurate answers 24/7 without human intervention.',
    color: 'text-accent-400',
    bg: 'bg-accent-500/10',
  },
  {
    icon: Users,
    title: 'Personalised',
    desc: 'Remembers returning customers and tailors responses based on history.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
];

const steps = [
  { n: '01', title: 'We learn your business', desc: 'Services, prices, FAQs, hours, policies — all fed into the AI.' },
  { n: '02', title: 'We build & embed the bot', desc: 'A branded widget integrated directly into your website.' },
  { n: '03', title: 'Goes live, stays updated', desc: 'AI improves automatically. You update services → bot updates too.' },
];

const examples = [
  { label: 'Dental patient asks:', q: '"Do you accept NHS patients and what are your opening hours?"' },
  { label: 'Gym member asks:', q: '"What time is the Thursday spin class and how do I book a spot?"' },
  { label: 'Restaurant customer asks:', q: '"Do you have gluten-free options under £12?"' },
];

const AIChatbotModal = () => (
  <div className="space-y-8 text-slate-300">
    {/* Intro */}
    <div className="flex items-start gap-5">
      <div className="w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/20
                      flex items-center justify-center flex-shrink-0">
        <MessageCircle className="w-7 h-7 text-primary-400" />
      </div>
      <div>
        <p className="text-slate-300 leading-relaxed">
          A 24/7 AI assistant trained specifically on your business. It handles customer questions
          instantly — freeing your staff for the work that actually needs a human.
          Works on your website, WhatsApp, and SMS.
        </p>
      </div>
    </div>

    {/* Capabilities */}
    <div>
      <h4 className="text-white font-semibold mb-4">What it can do</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {capabilities.map((c) => (
          <div key={c.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/03 border border-white/06">
            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
              <c.icon className={`w-4 h-4 ${c.color}`} />
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-1">{c.title}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Real examples */}
    <div>
      <h4 className="text-white font-semibold mb-4">Real conversation examples</h4>
      <div className="space-y-3">
        {examples.map((e) => (
          <div key={e.label} className="p-4 rounded-xl bg-white/03 border border-white/06">
            <div className="text-xs text-slate-500 mb-2 font-medium">{e.label}</div>
            <div className="text-sm text-slate-200 italic">{e.q}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400">Bot answers instantly, correctly</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* How it works */}
    <div>
      <h4 className="text-white font-semibold mb-4">How we set it up</h4>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.n} className="flex items-start gap-4">
            <span className="text-3xl font-bold text-primary-500/30 font-display leading-none flex-shrink-0 w-10">{s.n}</span>
            <div className="pt-0.5">
              <div className="text-white text-sm font-semibold mb-0.5">{s.title}</div>
              <div className="text-slate-500 text-xs">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-gradient-to-r from-primary-500/08 to-glow-500/08 border border-white/06">
      {[
        { v: '24/7', l: 'Always available' },
        { v: '<1s',  l: 'Response time' },
        { v: '85%',  l: 'Queries resolved without human' },
      ].map((s) => (
        <div key={s.l} className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400
                          bg-clip-text text-transparent mb-1">{s.v}</div>
          <div className="text-slate-500 text-xs">{s.l}</div>
        </div>
      ))}
    </div>

    {/* Channels */}
    <div>
      <h4 className="text-white font-semibold mb-3">Works across channels</h4>
      <div className="flex flex-wrap gap-2">
        {['Website widget', 'WhatsApp Business', 'SMS', 'Embedded chat bubble', 'Facebook Messenger'].map((c) => (
          <span key={c} className="px-3 py-1.5 rounded-full bg-white/05 border border-white/08
                                   text-slate-300 text-xs font-medium">
            {c}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default AIChatbotModal;
