import { motion } from 'framer-motion';
import { Car, MapPin, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function ParkingSection() {
  const { darkMode } = useApp();
  const { ref, inView } = useInView();

  return (
    <section id="parking" className={`py-20 ${darkMode ? 'bg-bg-black' : 'bg-white'} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-primary' : 'bg-green-300'}`} />
        <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-primary' : 'bg-green-200'}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Convenience at its Best
          </span>
          <h2 className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Big Car Parking <span className="text-gradient">Gym</span>
          </h2>
          <p className="text-secondary-text mt-4 max-w-2xl mx-auto">
            The only gym in the Nilgiris district with a dedicated, spacious parking facility for members and visitors.
          </p>
        </motion.div>

        {/* Main parking banner card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`relative rounded-3xl overflow-hidden ${darkMode ? 'bg-gradient-to-br from-primary/20 to-bg-black border border-primary/30' : 'bg-gradient-to-br from-green-50 to-white border border-green-200'}`}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: visual / icon area */}
            <div className={`p-10 flex flex-col items-center justify-center text-center ${darkMode ? 'bg-primary/10' : 'bg-green-100/50'}`}>
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 ${darkMode ? 'bg-primary/30' : 'bg-green-200'}`}>
                <Car className={`w-12 h-12 ${darkMode ? 'text-white' : 'text-green-700'}`} />
              </div>
              <div className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                20
              </div>
              <div className={`text-lg font-semibold ${darkMode ? 'text-primary' : 'text-green-700'}`}>
                Car Parking Spaces
              </div>
            </div>

            {/* Right: info */}
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Nilgiris District, Coonoor
                </span>
              </div>

              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Parking Facility Available
              </h3>

              <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Located in the beautiful <span className="text-primary font-medium">Nilgiris district</span>, our Coonoor branch offers convenient on-site parking for members and visitors. No need to worry about parking space — drive in comfortably and focus on your fitness journey.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Safe & secure parking area
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Free for all gym members
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Visitor parking also available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
