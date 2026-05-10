import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Wind, Target, Activity, Music, Leaf, User, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

const iconMap: Record<string, React.ElementType> = {
  Dumbbell, Zap, Wind, Target, Activity, Music, Leaf, User,
};

const levelColors: Record<string, string> = {
  'Beginner': 'bg-green-500/20 text-green-400',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400',
  'Advanced': 'bg-red-500/20 text-red-400',
  'All Levels': 'bg-primary/20 text-primary',
};

export default function Programs() {
  const { programs, darkMode } = useApp();
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isHovered || isDragging) return;
    const cardWidth = el.firstElementChild?.clientWidth || 320;
    const gap = 20;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft + cardWidth + gap >= maxScroll - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  }, [isHovered, isDragging]);

  useEffect(() => {
    const timer = setInterval(scrollNext, 3500);
    return () => clearInterval(timer);
  }, [scrollNext]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  return (
    <section id="programs" className={`py-24 ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Our <span className="text-gradient">Programs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-secondary-text mt-4 max-w-xl mx-auto"
          >
            Expertly designed programs for every fitness level — from beginner to elite athlete.
            Find what ignites your passion.
          </motion.p>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto snap-x snap-mandatory sm:snap-none scrollbar-hide pb-2 px-0"
        >
          {programs.map((program, i) => {
            const Icon = iconMap[program.icon] || Dumbbell;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[85vw] max-w-[320px] sm:w-auto sm:max-w-none snap-start
                  ${darkMode ? 'bg-card-grey' : 'bg-white shadow-md'}`}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300/FF6A00/FFFFFF?text=Program'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Icon badge */}
                  <div
                    className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${program.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: program.color }} />
                  </div>

                  {/* Name on image */}
                  <div className="absolute bottom-3 left-3">
                    <h3 className="font-heading text-xl font-bold text-white drop-shadow-lg">
                      {program.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"
                    style={{ background: `radial-gradient(circle at top left, ${program.color}10, transparent 70%)` }}
                  />

                  <p className="text-secondary-text text-sm leading-relaxed mb-4 relative z-10">
                    {program.description}
                  </p>

                  <div className="flex items-center justify-between relative z-10">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[program.level]}`}>
                      {program.level}
                    </span>
                    <span className="text-secondary-text text-xs">{program.duration}</span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${program.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/programs"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-primary hover:bg-primary-dark text-white hover:shadow-glow-orange"
          >
            View All Programs
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
