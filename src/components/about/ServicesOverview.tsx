import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star, Zap, Shield, Clock, DollarSign } from 'lucide-react';

const ServicesOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      title: "One-Time Full Purchase",
      subtitle: "Complete Ownership",
      price: "Starting from $1,999",
      description: "Own your AI-powered restaurant website completely. Perfect for established restaurants looking for full control and long-term investment.",
      features: [
        "Complete website ownership",
        "All AI features included",
        "Lifetime access to admin dashboard",
        "Free hosting for 1 year",
        "Basic SEO optimization",
        "Mobile responsive design",
        "Payment gateway integration",
        "Order management system"
      ],
      maintenance: "Additional features and major updates available at extra cost",
      popular: false
    },
    {
      title: "Monthly Subscription",
      subtitle: "Flexible & Scalable",
      price: "Starting from $199/month",
      description: "Perfect for growing restaurants that want ongoing support, maintenance, and continuous improvements without large upfront costs.",
      features: [
        "Complete AI-powered website",
        "All features included",
        "24/7 technical support",
        "Regular updates & maintenance",
        "Performance monitoring",
        "Security updates",
        "Backup & recovery",
        "Analytics & reporting"
      ],
      maintenance: "All maintenance, updates, and new features included",
      popular: true
    }
  ];

  return (
    <section id="services" ref={ref} className="py-20 bg-gray-50">
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
            <DollarSign className="w-4 h-4 mr-2" />
            Our Service Plans
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We offer two flexible service options to meet the unique needs of every restaurant. 
            Whether you prefer complete ownership or ongoing support, we have the perfect solution for you.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative ${service.popular ? 'lg:scale-105' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-full">
                    <Star className="w-4 h-4 mr-2 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 h-full">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">{service.subtitle}</p>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{service.price}</div>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Maintenance & Support</h5>
                      <p className="text-gray-600 text-sm">{service.maintenance}</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full mt-8 py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    service.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
            What Happens After Purchase?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Setup & Launch</h4>
              <p className="text-gray-600">
                We'll set up your website, integrate your menu, and launch your AI-powered 
                restaurant platform within 2-3 weeks.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Training & Support</h4>
              <p className="text-gray-600">
                Get comprehensive training on using your admin dashboard and 24/7 support 
                to ensure smooth operations.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Ongoing Success</h4>
              <p className="text-gray-600">
                We monitor your performance, provide insights, and continuously improve 
                your platform to maximize your success.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview; 