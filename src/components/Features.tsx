import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  MessageSquare, BarChart3, Truck, Bell, Brain, Mic, Star, ArrowRight
} from 'lucide-react';
import Modal from './Modal';
import AIChatbotModal from './modals/AIChatbotModal';
import RAGBotModal from './modals/RAGBotModal';
import SalesInsightsModal from './modals/SalesInsightsModal';
import DeliveryIntegrationModal from './modals/DeliveryIntegrationModal';
import CustomerEngagementModal from './modals/CustomerEngagementModal';
import RestaurantAnalyticsModal from './modals/RestaurantAnalyticsModal';

const features = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'AI Customer Chatbot',
    subtitle: 'Voice & Text Intelligence',
    description:
      'A 24/7 intelligent assistant trained on your specific business — services, prices, FAQs, ' +
      'hours, and more. Customers ask in plain language, get instant accurate answers. ' +
      'Works on web, WhatsApp, and SMS.',
    bullets: ['Natural language processing', '24/7 availability', 'Voice & text support', 'Trained on your data'],
    color: 'from-primary-600 to-primary-400',
    glow: 'primary',
    modalKey: 'ai-chatbot',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Internal RAG Bot',
    subtitle: 'Your Business Brain',
    description:
      'Connect your databases, documents, POS, and internal systems. Your team and owner ' +
      'can ask any question — revenue, inventory, customer trends — and get instant answers ' +
      'without logging into dashboards.',
    bullets: ['Multi-source RAG pipeline', 'Database + document integration', 'Natural language queries', 'Private & secure'],
    color: 'from-glow-600 to-glow-400',
    glow: 'purple',
    modalKey: 'rag-bot',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Delivery & Service Integrations',
    subtitle: 'Seamless Operations',
    description:
      'Connect directly with delivery partners, booking systems, POS tools, and payment gateways. ' +
      'Orders flow automatically from your website. No manual juggling across apps.',
    bullets: ['DoorDash, UberDirect, GrubHub & more', 'POS system sync', 'Automatic order routing', 'Real-time tracking'],
    color: 'from-orange-500 to-amber-400',
    glow: 'primary',
    modalKey: 'delivery-integration',
  },
  {
    id: 4,
    icon: Bell,
    title: 'Smart Customer Engagement',
    subtitle: 'Automated Marketing',
    description:
      'Automatically notify customers about offers, new services, and reminders via WhatsApp or SMS. ' +
      'AI generates personalised messages based on customer history to boost repeat business.',
    bullets: ['WhatsApp & SMS automation', 'Personalised messaging', 'Loyalty & rewards', 'Seasonal campaigns'],
    color: 'from-purple-600 to-pink-500',
    glow: 'purple',
    modalKey: 'customer-engagement',
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Analytics & Insights',
    subtitle: 'Data-Driven Decisions',
    description:
      'Understand your business like never before. Track revenue, customer lifetime value, ' +
      'peak hours, and top services. AI-powered predictions help you optimise pricing and operations.',
    bullets: ['Real-time dashboards', 'Customer lifetime value', 'Predictive analytics', 'Exportable reports'],
    color: 'from-green-500 to-teal-400',
    glow: 'accent',
    modalKey: 'restaurant-analytics',
  },
  {
    id: 6,
    icon: Mic,
    title: 'Voice AI & Phone Agent',
    subtitle: 'Never Miss a Call',
    description:
      'An AI phone agent that answers calls, books appointments, answers FAQs, and routes ' +
      'complex queries to your team. Available 24/7 — no missed calls, no lost leads.',
    bullets: ['AI-powered call handling', 'Appointment booking via phone', 'FAQ automation', 'Call transcription'],
    color: 'from-accent-500 to-blue-500',
    glow: 'accent',
    modalKey: 'voice-ai',
  },
];

const glowMap: Record<string, string> = {
  primary: 'hover:shadow-primary-500/15',
  purple:  'hover:shadow-glow-500/15',
  accent:  'hover:shadow-accent-500/15',
};

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openModal, setOpenModal] = useState<string | null>(null);

  const getModalContent = (key: string) => {
    switch (key) {
      case 'ai-chatbot':           return <AIChatbotModal />;
      case 'rag-bot':              return <RAGBotModal />;
      case 'sales-insights':       return <SalesInsightsModal />;
      case 'delivery-integration': return <DeliveryIntegrationModal />;
      case 'customer-engagement':  return <CustomerEngagementModal />;
      case 'voice-ai':             return <RestaurantAnalyticsModal />;
      default:                     return null;
    }
  };

  const getModalTitle = (key: string) => {
    const f = features.find((f) => f.modalKey === key);
    return f?.title ?? '';
  };

  return (
    <section id="features" ref={ref} className="py-24 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                           border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            AI Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-5">
            Everything Your Business Needs —{' '}
            <span className="gradient-text">Powered by AI</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We don't just build websites — we create intelligent platforms that work around the clock
            to grow your revenue, reduce costs, and delight your customers.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-7 flex flex-col transition-all duration-300
                         hover:shadow-2xl ${glowMap[f.glow]} card-hover`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color}
                              flex items-center justify-center mb-5 opacity-90`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-primary-400 font-medium mb-3">{f.subtitle}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{f.description}</p>

              <ul className="space-y-1.5 mb-6 mt-auto">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1 h-1 rounded-full bg-primary-400 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setOpenModal(f.modalKey)}
                className="inline-flex items-center text-sm text-primary-400 hover:text-primary-300
                           font-medium transition-colors duration-200 mt-auto group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={openModal ? getModalTitle(openModal) : ''}
      >
        {openModal && getModalContent(openModal)}
      </Modal>
    </section>
  );
};

export default Features;
