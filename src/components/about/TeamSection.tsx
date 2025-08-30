import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Mail, Users } from 'lucide-react';

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former restaurant owner with 15+ years in the industry. Passionate about helping restaurants thrive in the digital age.",
      linkedin: "#",
      twitter: "#",
      email: "sarah@orderslift.com"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "AI/ML expert with experience at Google and Amazon. Leads our technology innovation and product development.",
      linkedin: "#",
      twitter: "#",
      email: "michael@orderslift.com"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Restaurant consultant with expertise in operations and customer experience. Ensures every client achieves success.",
      linkedin: "#",
      twitter: "#",
      email: "emily@orderslift.com"
    },
    {
      name: "David Kim",
      role: "Lead Product Designer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "UX/UI specialist focused on creating intuitive restaurant websites that convert visitors into customers.",
      linkedin: "#",
      twitter: "#",
      email: "david@orderslift.com"
    },
    {
      name: "Lisa Thompson",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      bio: "Digital marketing expert specializing in restaurant growth strategies and customer acquisition.",
      linkedin: "#",
      twitter: "#",
      email: "lisa@orderslift.com"
    },
    {
      name: "Alex Patel",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack developer with expertise in AI integration and restaurant technology platforms.",
      linkedin: "#",
      twitter: "#",
      email: "alex@orderslift.com"
    }
  ];

  return (
    <section id="team" ref={ref} className="py-20 bg-white">
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
            <Users className="w-4 h-4 mr-2" />
            Meet Our Team
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            The Minds Behind OrdersLift
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our team combines deep restaurant industry expertise with cutting-edge technology 
            to create solutions that truly understand and serve the needs of restaurant owners.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Member Image */}
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  <motion.a
                    href={member.linkedin}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-lg transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={member.twitter}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-lg transition-colors duration-200"
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${member.email}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-lg transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-8">
            Our Team's Expertise
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Years Restaurant Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">AI Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection; 