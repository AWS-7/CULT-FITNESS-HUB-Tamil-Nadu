import { motion } from 'framer-motion';
import { Instagram, Linkedin, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function Trainers() {
  const { trainers, selectedLocation, darkMode } = useApp();
  const { ref, inView } = useInView();

  const filtered = selectedLocation === 'all'
    ? trainers
    : trainers.filter(t => t.location === selectedLocation);

  return (
    <section id="trainers" className={`py-24 ${darkMode ? 'bg-card-grey' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Meet the Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Elite <span className="text-gradient">Trainers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-secondary-text mt-4 max-w-xl mx-auto"
          >
            Our internationally certified coach dedicated to unlocking your maximum potential.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((trainer, i) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x500/FF6A00/FFFFFF?text=Trainer'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Social icons — revealed on hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={trainer.instagram}
                    className="w-9 h-9 bg-black/40 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                  <a
                    href={trainer.linkedin}
                    className="w-9 h-9 bg-black/40 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-1 text-primary text-xs mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="capitalize">{trainer.location}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-gray-300 text-sm">{trainer.role}</p>
                  
                  {/* Phone number */}
                  {trainer.phone && (
                    <div className="flex items-center gap-1 text-primary text-xs mt-1">
                      <Phone className="w-3 h-3" />
                      <span>{trainer.phone}</span>
                    </div>
                  )}

                  {/* Certs — slide up on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500">
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {trainer.certifications.map(cert => (
                        <span key={cert} className="text-xs bg-primary/30 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs mt-2">{trainer.experience} exp • {trainer.speciality}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-secondary-text py-12"
          >
            No trainer available for this location.
          </motion.p>
        )}
      </div>
    </section>
  );
}
