import { motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import {
  MessageSquare, BarChart3, Truck, Bell, Brain, Mic, Star, ArrowRight
} from 'lucide-react';
import {
  cardHover, cardTap, fadeUp, staggerContainer, staggerFor, viewportOnce,
} from '../lib/motion';
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
    title: 'AI Menu & Booking Bot',
    subtitle: 'Answers guests day and night',
    description:
      "Trained on your menu, hours, allergens and location. Guests ask \"is there parking?\" or \"do you do vegan?\" and get the right answer instantly — and it can take the booking there and then.",
    bullets: ["Knows your full menu", "Takes bookings in chat", "Allergen & dietary answers", "Works on web and WhatsApp"],
    color: 'from-primary-600 to-primary-400',
    modalKey: 'ai-chatbot',
  },
  {
    id: 2,
    icon: Brain,
    title: 'Ask Your Own Numbers',
    subtitle: 'Your data, in plain English',
    description:
      "Connect your POS and booking data, then just ask. \"What did we take last Saturday?\" \"Which starter sells worst?\" Answers in seconds, without opening a spreadsheet.",
    bullets: ["Connects to your POS", "Top and worst-selling dishes", "Covers and revenue by day", "Private — your data stays yours"],
    color: 'from-glow-600 to-glow-400',
    modalKey: 'rag-bot',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Delivery & Order Integrations',
    subtitle: 'One inbox for every order',
    description:
      "Connect the delivery apps you already use, plus direct orders from your own site. Everything lands in one place, and your menu updates everywhere at once.",
    bullets: ["Deliveroo, Uber Eats, DoorDash & more", "Menu syncs across every platform", "All orders in one screen", "Commission-free direct ordering"],
    color: 'from-primary-500 to-glow-500',
    modalKey: 'delivery-integration',
  },
  {
    id: 4,
    icon: Bell,
    title: 'Bring Guests Back',
    subtitle: 'Automatic, not annoying',
    description:
      "Booking reminders that cut no-shows, a message when you launch a new menu, and a birthday offer that goes out on its own. Set the rules once and leave it running.",
    bullets: ["Booking reminders by SMS", "New menu announcements", "Birthday & loyalty offers", "Win back guests who stopped coming"],
    color: 'from-primary-700 to-accent-600',
    modalKey: 'customer-engagement',
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Covers & Revenue Insights',
    subtitle: 'Know your busiest hours',
    description:
      "See covers, average spend per head, peak nights and which dishes actually make money. Staff to match demand instead of guessing.",
    bullets: ["Covers and average spend", "Peak hours and quiet nights", "Profit per dish", "Weekly summary to your inbox"],
    color: 'from-glow-600 to-accent-500',
    modalKey: 'restaurant-analytics',
  },
  {
    id: 6,
    icon: Mic,
    title: 'Phone Reservations, Answered',
    subtitle: 'Nobody hangs up waiting',
    description:
      "A voice agent picks up when the pass is slammed. It takes the reservation, answers the usual questions, and puts it straight in your booking system.",
    bullets: ["Answers every call", "Books tables by phone", "Reads back your opening hours", "Full call transcripts"],
    color: 'from-accent-600 to-primary-500',
    modalKey: 'voice-ai',
  },
];

const Features = () => {
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
    <MotionConfig reducedMotion="user">
      <section id="features" className="scroll-mt-28 py-16 sm:py-20 lg:py-24 bg-white dark:bg-black relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass
                             border border-primary-500/30 text-primary-700 dark:text-primary-300
                             text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Automation Features
            </span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-white mb-5">
              The Jobs You'll Never{' '}
              <span className="gradient-text">Do Again</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Answering the same questions, chasing no-shows, reprinting menus, adding up the week.
              All of it runs on its own while you get on with service.
            </p>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            variants={staggerContainer(staggerFor(features.length))}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
          >
            {features.map((f) => (
              <motion.div
                key={f.id}
                variants={fadeUp}
                whileHover={cardHover}
                whileTap={cardTap}
                className="surface-card surface-interactive p-6 sm:p-7 flex flex-col h-full"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color}
                                flex items-center justify-center mb-5`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">{f.subtitle}</p>
                <p className="text-neutral-600 dark:text-slate-400 text-sm leading-relaxed mb-5">{f.description}</p>

                <ul className="surface-inset p-4 space-y-1.5 mb-5 mt-auto">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-slate-300">
                      <span className="w-1 h-1 rounded-full bg-primary-500 dark:bg-primary-400 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setOpenModal(f.modalKey)}
                  className="focus-ring inline-flex items-center min-h-[44px] lg:min-h-0
                             rounded-lg px-1 py-1 -mx-1
                             text-sm text-primary-600 hover:text-primary-700
                             dark:text-primary-400 dark:hover:text-primary-300
                             font-medium transition-colors duration-200 mt-auto group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
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
    </MotionConfig>
  );
};

export default Features;
