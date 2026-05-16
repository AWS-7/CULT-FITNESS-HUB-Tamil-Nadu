import { motion } from 'framer-motion';
import { Instagram, Linkedin, MapPin, Phone, Star, ChevronRight, Zap, Target, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function Trainers() {
  const { trainers, selectedLocation, darkMode } = useApp();
  const { ref, inView } = useInView();

  const filtered = selectedLocation === 'all'
    ? trainers
    : trainers.filter(t => t.location === selectedLocation);

  return (
    <section id="trainers" className={`py-16 ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Meet Our <span className="text-primary">Expert Trainers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}
          >
            Professional fitness experts dedicated to helping you achieve your goals
          </motion.p>
        </div>

        {/* Horizontal Card Layout */}
        <div className="space-y-6">
          {filtered.map((trainer, i) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ x: 10 }}
              className={`group relative overflow-hidden rounded-2xl ${
                darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="relative w-full md:w-80 h-64 md:h-auto">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/320x400/FF6A00/FFFFFF?text=Trainer'; }}
                  />
                  
                  {/* Overlay badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                      <MapPin className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-medium capitalize">{trainer.location}</span>
                    </div>
                    {trainer.phone && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm">
                        <Phone className="w-3 h-3 text-white" />
                        <span className="text-white text-xs font-medium">{trainer.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/90 backdrop-blur-sm">
                      <Star className="w-3 h-3 text-white fill-white" />
                      <span className="text-white text-xs font-bold">5</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {trainer.name}
                      </h3>
                      <p className="text-primary font-medium text-lg">{trainer.role}</p>
                    </div>
                    
                    {/* Social links */}
                    <div className="flex gap-2">
                      <a
                        href={trainer.instagram}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a
                        href={trainer.linkedin}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      <div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {trainer.experience}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Experience</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {trainer.speciality}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Speciality</div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            darkMode 
                              ? 'bg-primary/20 text-primary border border-primary/30' 
                              : 'bg-primary/10 text-primary border border-primary/20'
                          }`}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      darkMode 
                        ? 'bg-primary hover:bg-primary/90 text-white' 
                        : 'bg-primary hover:bg-primary/90 text-white'
                    }`}
                  >
                    Book Training Session
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          >
            <Users className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No trainers available
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try selecting a different location
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
