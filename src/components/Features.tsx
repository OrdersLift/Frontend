import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  Truck, 
  Bell, 
  Zap,
  ArrowRight
} from 'lucide-react';
import Modal from './Modal';
import AIChatbotModal from './modals/AIChatbotModal';
import SalesInsightsModal from './modals/SalesInsightsModal';
import DeliveryIntegrationModal from './modals/DeliveryIntegrationModal';
import CustomerEngagementModal from './modals/CustomerEngagementModal';
import RestaurantAnalyticsModal from './modals/RestaurantAnalyticsModal';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openModal, setOpenModal] = useState<string | null>(null);

  const features = [
    {
      id: 1,
      title: "AI Menu Chatbot",
      subtitle: "Voice & Text Intelligence",
      description: "Our advanced AI chatbot understands natural language queries about your menu, specials, and restaurant information. Customers can ask questions like 'What's for breakfast?' or 'Do you have vegetarian options?' and get instant, accurate responses. The chatbot can also read menu items aloud and handle complex dietary restrictions.",
      benefits: [
        "24/7 customer support",
        "Natural language processing",
        "Voice and text capabilities",
        "Instant menu information"
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
      modalKey: "ai-chatbot"
    },
    {
      id: 2,
      title: "Sales Insights Dashboard",
      subtitle: "Data-Driven Decisions",
      description: "Get comprehensive analytics and insights into your restaurant's performance. Track best-selling dishes, identify slow movers, analyze peak hours, and understand customer preferences. Our dashboard provides actionable data to optimize your menu, pricing, and operations for maximum profitability.",
      benefits: [
        "Real-time sales analytics",
        "Menu performance tracking",
        "Customer behavior insights",
        "Profit optimization tools"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      icon: BarChart3,
      color: "from-green-500 to-green-600",
      modalKey: "sales-insights"
    },
    {
      id: 3,
      title: "Direct Delivery Integration",
      subtitle: "Seamless Order Fulfillment",
      description: "Connect directly with delivery partners like DoorDash Drive, UberDirect, GrubHub etc. When customers place orders on your website, they're automatically dispatched to your preferred delivery service. No more juggling multiple apps - everything flows seamlessly from your website.",
      benefits: [
        "Multi-platform integration",
        "Automatic order routing",
        "Real-time tracking",
        "Reduced commission fees"
      ],
      image: "https://images.unsplash.com/photo-1695654390723-479197a8c4a3?q=80&w=1434&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: Truck,
      color: "from-orange-500 to-orange-600",
      modalKey: "delivery-integration"
    },
    {
      id: 4,
      title: "Smart Customer Engagement",
      subtitle: "Automated Marketing",
      description: "Automatically notify customers about special offers, discounts, and seasonal menus via WhatsApp or SMS. Our AI generates personalized reminder calls to regular customers, boosting repeat orders and building customer loyalty through intelligent engagement.",
      benefits: [
        "Automated notifications",
        "Personalized messaging",
        "WhatsApp & SMS integration",
        "Customer loyalty building"
      ],
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop",
      icon: Bell,
      color: "from-purple-500 to-purple-600",
      modalKey: "customer-engagement"
    },
    {
      id: 5,
      title: "Restaurant Analytics",
      subtitle: "Performance Intelligence",
      description: "Advanced analytics that go beyond basic sales data. Track customer lifetime value, order patterns, seasonal trends, and competitive insights. Our AI-powered analytics help you make informed decisions about menu changes, pricing strategies, and business expansion.",
      benefits: [
        "Customer lifetime value tracking",
        "Seasonal trend analysis",
        "Competitive insights",
        "Predictive analytics"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      icon: Zap,
      color: "from-red-500 to-red-600",
      modalKey: "restaurant-analytics"
    }
  ];

  const getModalContent = (modalKey: string) => {
    switch (modalKey) {
      case "ai-chatbot":
        return <AIChatbotModal />;
      case "sales-insights":
        return <SalesInsightsModal />;
      case "delivery-integration":
        return <DeliveryIntegrationModal />;
      case "customer-engagement":
        return <CustomerEngagementModal />;
      case "restaurant-analytics":
        return <RestaurantAnalyticsModal />;
      default:
        return null;
    }
  };

  const getModalTitle = (modalKey: string) => {
    switch (modalKey) {
      case "ai-chatbot":
        return "AI Menu Chatbot";
      case "sales-insights":
        return "Sales Insights Dashboard";
      case "delivery-integration":
        return "Direct Delivery Integration";
      case "customer-engagement":
        return "Smart Customer Engagement";
      case "restaurant-analytics":
        return "Restaurant Analytics";
      default:
        return "";
    }
  };

  return (
    <section id="features" ref={ref} className="py-20 bg-white" role="region" aria-label="AI Features for Restaurants">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Features
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            What Features We Provide
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We don't just build websites - we create intelligent restaurant platforms that work 24/7. 
            Our AI-powered features are designed to boost your sales, reduce operational costs, and provide 
            your customers with an exceptional ordering experience. Each feature is carefully crafted to 
            address real restaurant challenges and drive measurable results.
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-primary-600 font-medium">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => setOpenModal(feature.modalKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </div>

              {/* Image Side */}
              <div className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-primary-600/25"
          >
            <Zap className="w-5 h-5 mr-2" />
            Get These Features for Your Restaurant
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={openModal ? getModalTitle(openModal) : ""}
      >
        {openModal && getModalContent(openModal)}
      </Modal>
    </section>
  );
};

export default Features; 