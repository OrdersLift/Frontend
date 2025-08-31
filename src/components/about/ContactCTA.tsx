import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone, Mail, MessageSquare } from 'lucide-react';

const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Ready to Transform Your Restaurant?
            </h2>
            
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Join 500+ restaurants that have already revolutionized their online presence with OrdersLift. 
              Let's discuss how we can help you boost sales, reduce costs, and create exceptional customer experiences.
            </p>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center space-x-3 text-primary-100">
                <Phone className="w-5 h-5" />
                <span className="font-medium">(+91) 63939 74340</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-primary-100">
                <Mail className="w-5 h-5" />
                <span className="font-medium">restaurantorderlift@gmail.com</span>
              </div>
              {/* <div className="flex items-center justify-center space-x-3 text-primary-100">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Live Chat Available</span>
              </div> */}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-xl flex items-center"
            >
              <MessageSquare className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            
            <motion.a
              href="tel:+15551234567"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center px-8 py-4 rounded-lg font-semibold text-lg text-white hover:text-primary-100 transition-colors duration-200 border-2 border-white/30 hover:border-white/50"
            >
              <Phone className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Call Us Now
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-white/20 pt-8"
          >
            <p className="text-primary-100 text-sm mb-4">Trusted by restaurants nationwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="text-white/60 text-sm">✓ Free Consultation</div>
              <div className="text-white/60 text-sm">✓ No Setup Fees</div>
              <div className="text-white/60 text-sm">✓ 30-Day Money Back</div>
              <div className="text-white/60 text-sm">✓ 24/7 Support</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA; 