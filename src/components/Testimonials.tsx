import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function Testimonials() {
  const { testimonials, darkMode } = useApp();
  const { ref, inView } = useInView();
  const [current, setCurrent] = useState(0);

  const go = useCallback((dir: number) => {
    setCurrent(p => (p + dir + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      go(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [go]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className={`py-24 relative overflow-hidden ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      {/* Background blur - desktop only */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Real <span className="text-gradient">Results</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Carousel — CSS crossfade instead of AnimatePresence remounts */}
          <div className={`rounded-3xl p-8 md:p-12 ${darkMode ? 'bg-card-grey' : 'bg-white shadow-xl'}`}>
            <div className="grid md:grid-cols-3 gap-8 items-center transition-opacity duration-500">
              {/* Photo */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-28 h-28 mb-4">
                  <img
                    key={t.id}
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full rounded-full object-cover ring-4 ring-primary/30"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200x200/FF6A00/FFFFFF?text=User'; }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1.5">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
                <h4 className={`font-heading text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t.name}
                </h4>
                <p className="text-primary text-sm font-medium">{t.program}</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="mt-4 bg-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30">
                  {t.achievement}
                </div>
              </div>

              {/* Quote */}
              <div className="md:col-span-2">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className={`text-lg leading-relaxed italic ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-2 text-secondary-text text-sm">
                  <span className="capitalize">{t.location} Branch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className={`p-2.5 rounded-full border transition-all ${darkMode ? 'border-white/20 hover:border-primary hover:bg-primary text-white' : 'border-gray-200 hover:border-primary hover:bg-primary hover:text-white text-gray-600'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : darkMode ? 'bg-white/20' : 'bg-gray-300'}`}
              />
            ))}

            <button
              onClick={() => go(1)}
              className={`p-2.5 rounded-full border transition-all ${darkMode ? 'border-white/20 hover:border-primary hover:bg-primary text-white' : 'border-gray-200 hover:border-primary hover:bg-primary hover:text-white text-gray-600'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
