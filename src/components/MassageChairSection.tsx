import { motion } from 'framer-motion';
import { Sofa, CheckCircle, Sparkles, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function MassageChairSection() {
  const { darkMode } = useApp();
  const { ref, inView } = useInView();

  return (
    <section id="massage-chair" className={`py-12 ${darkMode ? 'bg-card-grey' : 'bg-gray-100'} relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-primary' : 'bg-orange-300'}`} />
        <div className={`absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${darkMode ? 'bg-primary' : 'bg-orange-200'}`} />
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
            Relax & Rejuvenate
          </span>
          <h2 className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Massage Chair <span className="text-gradient">Zone</span>
          </h2>
          <p className="text-secondary-text mt-4 max-w-2xl mx-auto">
            Unwind after an intense workout with our premium massage chairs — exclusively available at our Coonoor branch.
          </p>
        </motion.div>

        {/* Main massage chair card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`relative rounded-3xl overflow-hidden ${darkMode ? 'bg-gradient-to-br from-primary/20 to-bg-black border border-primary/30' : 'bg-gradient-to-br from-orange-50 to-white border border-orange-200'}`}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Image */}
            <div className="relative h-64 md:h-full overflow-hidden">
              <img
                src="https://i.pinimg.com/1200x/5a/95/39/5a9539772818d2d6be079139e2dc4886.jpg"
                alt="Massage Chair at Coonoor Branch"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://images.pexels.com/photos/6628651/pexels-photo-6628651.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=1'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/40" />
            </div>

            {/* Right: Info */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Coonoor Branch Exclusive
                </span>
              </div>

              <h3 className={`text-xl md:text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Premium Massage Chairs Available
              </h3>

              <p className={`text-sm md:text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Relax and recover in our dedicated <span className="text-primary font-medium">Massage Chair Zone</span>. 
                Perfect for post-workout recovery, relieving muscle tension, and enhancing your overall wellness experience at CULT Fitness Hub Coonoor.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Full-body shiatsu & roller massage
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Free for all gym members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Zero-gravity recline for deep relaxation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Improves blood circulation & reduces stress
                  </span>
                </div>
              </div>

              <div className={`mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg self-start ${darkMode ? 'bg-primary/20 text-primary' : 'bg-orange-100 text-orange-700'}`}>
                <Sofa className="w-5 h-5" />
                <span className="font-semibold text-sm">2 Premium Massage Chairs</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
