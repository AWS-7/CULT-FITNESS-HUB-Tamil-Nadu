import { motion } from 'framer-motion';
import { Award, Shield, TrendingUp, Heart, User, Star, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';
import aboutImage from '/images/Screenshot 2026-05-10 140617.png';

const values = [
  { icon: Award, title: 'World-Class Coaches', desc: 'Internationally certified trainers with 5–15 years of professional experience.' },
  { icon: Shield, title: 'Safe Environment', desc: 'State-of-the-art equipment maintained daily for a safe and optimal training experience.' },
  { icon: TrendingUp, title: 'Proven Results', desc: 'Data-driven approach with regular assessments to track and accelerate your progress.' },
  { icon: Heart, title: 'Community First', desc: 'A supportive, inclusive community that celebrates every milestone together.' },
];

export default function About() {
  const { darkMode } = useApp();
  const { ref, inView } = useInView();

  return (
    <section id="about" className={`py-24 relative overflow-hidden ${darkMode ? 'bg-card-grey' : 'bg-white'}`}>
      {/* Background accent - desktop only */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image stack */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={aboutImage}
                alt="About CULT"
                className="w-full h-96 lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -right-6 bg-primary rounded-2xl p-5 shadow-glow-orange"
            >
              <div className="text-white text-center">
                <div className="font-heading text-3xl font-bold">10+</div>
                <div className="text-xs font-medium opacity-90">Years of Excellence</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              About Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className={`section-title mt-2 mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              More Than a <span className="text-gradient">Gym</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-secondary-text leading-relaxed mb-4"
            >
              CULT Fitness Hub was founded with one mission: to democratize elite fitness across
              Tamil Nadu. We believe that world-class training, expert coaching, and a transformative
              community should be accessible to everyone.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="text-secondary-text leading-relaxed mb-10"
            >
              From Coonoor's misty hills to Selas's vibrant city center — each branch offers the same
              uncompromising standard of excellence that has made CULT Fitness Hub the most trusted fitness
              brand in the region.
            </motion.p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`p-4 rounded-xl ${darkMode ? 'bg-bg-black/60' : 'bg-gray-50'}`}
                >
                  <v.icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{v.title}</h4>
                  <p className="text-secondary-text text-xs leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Team Member Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-bg-black/60' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${darkMode ? 'bg-primary/20' : 'bg-primary/10'}`}>
                    <User className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Flavin Martis
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nutritionist</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fitness Coach</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Zumba Master</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Counselor</span>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Posted on May 5, 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
