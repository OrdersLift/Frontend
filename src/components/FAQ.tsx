import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How long does it take to set up our AI-powered restaurant website?",
      answer: "Our standard setup takes 2-3 weeks from initial consultation to launch. This includes AI chatbot training, menu integration, delivery partner setup, and analytics configuration. We also offer expedited setup for urgent needs within 1 week."
    },
    {
      question: "What makes your AI chatbot different from regular chatbots?",
      answer: "Our AI chatbot understands natural language queries about your specific menu, can read menu items aloud, handles dietary restrictions, and learns from customer interactions. It's specifically trained on restaurant operations and can answer complex questions about ingredients, preparation methods, and special requests."
    },
    {
      question: "How much can we expect to increase our direct sales?",
      answer: "Our clients typically see a 200-400% increase in direct sales within the first 3 months. This is achieved by reducing dependency on third-party delivery apps (saving 15-30% commission), improving customer experience, and leveraging AI-driven insights for menu optimization."
    },
    {
      question: "Do you integrate with existing delivery services we already use?",
      answer: "Yes, we integrate with all major delivery platforms including Dunzo, Swiggy Genie, UberDirect, and local delivery services. We can also set up your own delivery fleet management system. The integration is seamless and doesn't require any changes to your existing delivery partnerships."
    },
    {
      question: "What kind of analytics and insights will we receive?",
      answer: "You'll get comprehensive analytics including best-selling dishes, peak ordering hours, customer lifetime value, seasonal trends, and profit margins per item. Our AI also provides predictive insights for menu optimization, pricing strategies, and inventory management recommendations."
    },
    {
      question: "Is there ongoing support and maintenance included?",
      answer: "Yes, we provide 24/7 technical support, regular AI model updates, menu synchronization, and performance monitoring. Our team handles all maintenance, updates, and optimizations to ensure your website continues to perform at peak efficiency."
    },
    {
      question: "Can we customize the features based on our restaurant's specific needs?",
      answer: "Absolutely! Our platform is modular, so you can choose which features to implement. Whether you need just the AI chatbot, full analytics suite, or specific delivery integrations, we tailor the solution to your restaurant's unique requirements and budget."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" ref={ref} className="py-20 bg-gray-50">
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
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Got Questions?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our AI-powered restaurant website platform. 
            Can't find the answer you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-4"
        >
          <div className="space-y-4 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className={`accordion-item [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] border-2 ${
                  openIndex === index 
                    ? 'border-primary-600 hover:border-primary-600' 
                    : 'border-transparent hover:border-primary-600'
                } rounded-lg transition-all`}
                role="accordion"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="accordion-button cursor-pointer w-full text-base font-medium text-left p-5 text-slate-900 flex items-center"
                >
                  <span className="mr-4">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`arrow w-[15px] h-[15px] fill-current ml-auto shrink-0 transition-transform duration-500 ease-in-out ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 451.847 451.847"
                  >
                    <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                  </svg>
                </button>
                <div 
                  className={`accordion-content overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="pb-5 px-5">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-primary-600/25"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Contact Our Support Team
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 