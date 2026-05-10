import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Users, Dumbbell, Maximize2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function Locations() {
  const { locations, selectedLocation, setSelectedLocation, darkMode } = useApp();
  const { ref, inView } = useInView();

  return (
    <section id="locations" className={`py-24 ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Find Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Our <span className="text-gradient">Locations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-secondary-text mt-4 max-w-xl mx-auto"
          >
            Three premium facilities across Tamil Nadu, each equipped with state-of-the-art equipment
            and elite coaching staff.
          </motion.p>
        </div>

        {/* Location Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['all', ...locations.map(l => l.id)].map(id => (
            <button
              key={id}
              onClick={() => setSelectedLocation(id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedLocation === id
                  ? 'bg-primary text-white shadow-glow-orange'
                  : darkMode
                    ? 'bg-card-grey text-gray-300 hover:bg-white/10'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {id === 'all' ? 'All Locations' : locations.find(l => l.id === id)?.name}
            </button>
          ))}
        </motion.div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations
            .filter(l => selectedLocation === 'all' || l.id === selectedLocation)
            .map((location, i) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -8 }}
                className={`group rounded-2xl overflow-hidden
                  ${darkMode ? 'bg-card-grey' : 'bg-white shadow-lg'}
                  ${selectedLocation === location.id ? 'ring-2 ring-primary shadow-glow-orange' : ''}`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      {location.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className={`font-heading text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    CULT Fitness Hub — {location.name}
                  </h3>

                  <div className="grid grid-cols-3 gap-3 my-4">
                    {[
                      { icon: Users, value: location.members + '+', label: 'Members' },
                      { icon: Dumbbell, value: location.trainers, label: 'Trainers' },
                      { icon: Maximize2, value: location.area, label: 'Space' },
                    ].map(stat => (
                      <div key={stat.label} className={`text-center p-2 rounded-lg ${darkMode ? 'bg-bg-black/50' : 'bg-gray-50'}`}>
                        <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                        <div className="text-xs text-secondary-text">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mt-4">
                    {[
                      { icon: MapPin, text: location.address },
                      { icon: Phone, text: location.phone },
                      { icon: Clock, text: location.hours },
                      { icon: Mail, text: location.email },
                    ].map(item => (
                      <div key={item.text} className="flex items-start gap-2">
                        <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-text text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/branch/${location.id}`}
                    className={`mt-5 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                      ${darkMode
                        ? 'bg-white/5 text-gray-300 hover:bg-primary/20 hover:text-primary'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'
                      }`}
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
