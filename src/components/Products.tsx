import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, MessageSquare, Brain, LayoutDashboard, Server, Shield, ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: Globe,
    title: 'Full Custom Website',
    subtitle: 'Your complete digital presence',
    description:
      'We design and build a fully custom website tailored to your brand and industry. ' +
      'Includes admin panel so you control everything — menus, services, bookings, content — ' +
      'without touching code.',
    features: [
      'Bespoke design & branding',
      'Admin panel with full control',
      'Mobile-first responsive',
      'SEO optimised from day one',
      'Fast-loading & accessible',
    ],
    gradient: 'from-primary-600/30 to-primary-800/10',
    border: 'border-primary-500/20',
    glow: 'hover:shadow-primary-500/10',
    iconBg: 'bg-primary-500/20',
    iconColor: 'text-primary-400',
    badge: 'Core',
  },
  {
    icon: MessageSquare,
    title: 'AI Customer Chatbot',
    subtitle: 'Your 24/7 front-desk agent',
    description:
      'An intelligent chatbot trained on your specific business — services, prices, hours, FAQs. ' +
      'Customers get instant answers any time of day. Supports voice and text. ' +
      'Integrates directly into your website.',
    features: [
      'Natural language understanding',
      'Voice & text capable',
      'Trained on your data',
      'WhatsApp & SMS integration',
      'Handoff to human when needed',
    ],
    gradient: 'from-glow-600/30 to-glow-800/10',
    border: 'border-glow-500/20',
    glow: 'hover:shadow-glow-500/10',
    iconBg: 'bg-glow-500/20',
    iconColor: 'text-glow-400',
    badge: 'AI-Powered',
  },
  {
    icon: Brain,
    title: 'Internal RAG Bot',
    subtitle: 'Your team\'s AI knowledge engine',
    description:
      'Connect your own data — databases, documents, Google Drive, Notion, your POS — ' +
      'and let your staff and owner ask questions in plain English. ' +
      '"How much did we make last week?" "Which service is most popular?" Instant answers.',
    features: [
      'Connects to your databases',
      'Reads PDFs, docs, spreadsheets',
      'Google Drive / Notion integration',
      'Multi-source RAG pipeline',
      'Private & secure — your data stays yours',
    ],
    gradient: 'from-accent-600/30 to-accent-800/10',
    border: 'border-accent-500/20',
    glow: 'hover:shadow-accent-500/10',
    iconBg: 'bg-accent-500/20',
    iconColor: 'text-accent-400',
    badge: 'Exclusive',
  },
];

const extras = [
  { icon: LayoutDashboard, label: 'Analytics Dashboard' },
  { icon: Server,          label: 'Managed Hosting' },
  { icon: Shield,          label: '2 Years Free Maintenance' },
];

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="products" ref={ref} className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-600/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-glow-600/05 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass border border-glow-500/30
                           text-glow-300 text-sm font-medium mb-6">
            What We Build For You
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            Three Pillars of Your{' '}
            <span className="gradient-text">AI Platform</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Every client gets a complete platform — not just a website. We handle the full stack
            so you never have to think about tech again.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative rounded-2xl border ${p.border} bg-gradient-to-b ${p.gradient}
                         p-8 flex flex-col card-hover hover:shadow-2xl ${p.glow} transition-all duration-300`}
            >
              {/* Badge */}
              <span className="absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full
                               bg-white/08 text-slate-400 border border-white/10">
                {p.badge}
              </span>

              <div className={`w-14 h-14 rounded-2xl ${p.iconBg} flex items-center justify-center mb-6`}>
                <p.icon className={`w-7 h-7 ${p.iconColor}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
              <p className={`text-sm font-medium mb-4 ${p.iconColor}`}>{p.subtitle}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.description}</p>

              <ul className="space-y-2 mt-auto">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.iconColor} bg-current flex-shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Extras bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="glass rounded-2xl border border-white/07 p-6 flex flex-col sm:flex-row
                     items-center justify-between gap-6"
        >
          <p className="text-slate-400 text-sm font-medium">Every package also includes:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {extras.map((e) => (
              <div key={e.label} className="flex items-center gap-2 text-slate-300 text-sm">
                <e.icon className="w-4 h-4 text-primary-400" />
                {e.label}
              </div>
            ))}
          </div>
          <a href="/#contact" className="btn-primary text-sm py-2.5 px-6 flex-shrink-0">
            Get Your Platform
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
