import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Target, Users, Zap, Shield, Clock } from 'lucide-react';

const AboutAgency = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
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
            <Building2 className="w-4 h-4 mr-2" />
            About OrdersLift
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Who We Are
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're a team of restaurant industry experts and technology innovators who believe 
            every restaurant deserves a website that works as hard as they do.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To revolutionize how restaurants operate online by providing AI-powered websites 
                that don't just showcase your food, but actively drive sales, reduce operational 
                costs, and create exceptional customer experiences.
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                What We Provide
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We're not just another web development agency. We're your restaurant's digital 
                transformation partner. We provide complete AI-powered website solutions that 
                include customer-facing websites and comprehensive admin dashboards for restaurant owners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 text-primary-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Customer Websites</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Beautiful, responsive websites that showcase your menu, handle orders, and provide 
                  seamless customer experiences with AI-powered features.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center mb-3">
                  <Shield className="w-6 h-6 text-primary-600 mr-3" />
                  <h4 className="font-semibold text-gray-900">Admin Dashboards</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Powerful management tools for restaurant owners to track orders, manage inventory, 
                  analyze performance, and control every aspect of their business.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="OrdersLift Team"
                className="w-full h-96 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Restaurants Transformed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-display font-bold text-gray-900 mb-12">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Results-Driven</h4>
              <p className="text-gray-600">
                We measure success by the tangible business results our clients achieve - 
                increased sales, reduced costs, and improved customer satisfaction.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Innovation-First</h4>
              <p className="text-gray-600">
                We stay at the forefront of AI and restaurant technology to provide 
                cutting-edge solutions that give our clients a competitive advantage.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Always Available</h4>
              <p className="text-gray-600">
                We understand restaurants never sleep, so our AI systems and support 
                team are available 24/7 to ensure your business runs smoothly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutAgency; 