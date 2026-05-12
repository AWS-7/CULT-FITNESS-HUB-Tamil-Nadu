import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Zap, Wind, Target, Activity, Music, Leaf, User, ArrowLeft, Clock, BarChart3, Users, X, CheckCircle, Flame, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const iconMap: Record<string, React.ElementType> = {
  Dumbbell, Zap, Wind, Target, Activity, Music, Leaf, User,
};

const levelColors: Record<string, string> = {
  'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30',
  'All Levels': 'bg-primary/20 text-primary border-primary/30',
};

const categoryLabels: Record<string, string> = {
  'strength': 'Strength Training',
  'cardio': 'Cardio & HIIT',
  'flexibility': 'Flexibility & Recovery',
  'mind': 'Mind & Body',
};

// Sample benefits data for programs
const programBenefits: Record<string, string[]> = {
  'strength-training': ['Build lean muscle mass', 'Increase bone density', 'Boost metabolism', 'Improve posture'],
  'hiit-cardio': ['Burn calories fast', 'Improve heart health', 'Increase stamina', 'Time efficient workouts'],
  'yoga-flow': ['Improve flexibility', 'Reduce stress', 'Enhance balance', 'Mind-body connection'],
  'pilates-core': ['Core strength', 'Muscle tone', 'Injury prevention', 'Better alignment'],
  'crossfit-elite': ['Full body conditioning', 'Functional fitness', 'Community support', 'Challenge yourself'],
  'zumba-dance': ['Fun cardio workout', 'Improve coordination', 'Stress relief', 'Social fitness'],
  'boxing-kickboxing': ['Full body workout', 'Self-defense skills', 'Stress relief', 'Build confidence'],
  'spin-cycling': ['Low impact cardio', 'Leg strength', 'Endurance building', 'High calorie burn'],
};

export default function Programs() {
  const navigate = useNavigate();
  const { programs, darkMode, setBookingModalOpen } = useApp();
  const { ref, inView } = useInView();
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  // Group programs by category
  const groupedPrograms = programs.reduce((acc, program) => {
    const cat = program.category || 'general';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(program);
    return acc;
  }, {} as Record<string, typeof programs>);

  return (
    <div className={darkMode ? 'bg-bg-black' : 'bg-gray-50'}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-secondary-text hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Explore Our Offerings
            </span>
            <h1 className={`font-heading text-4xl sm:text-5xl md:text-6xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              All <span className="text-gradient">Programs</span>
            </h1>
            <p className="text-secondary-text mt-4 max-w-2xl mx-auto text-base sm:text-lg">
              Discover our comprehensive range of fitness programs designed for every goal, 
              fitness level, and lifestyle. From strength training to mind-body wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Dumbbell, value: programs.length, label: 'Programs' },
              { icon: Users, value: '50+', label: 'Expert Trainers' },
              { icon: Clock, value: '24/7', label: 'Gym Access' },
              { icon: BarChart3, value: '150+', label: 'Members' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`text-center p-4 rounded-xl ${darkMode ? 'bg-card-grey/50' : 'bg-white'} border border-white/5`}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-heading text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-secondary-text text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section ref={ref} className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedPrograms).map(([category, categoryPrograms], categoryIndex) => (
            <div key={category} className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-8"
              >
                <h2 className={`font-heading text-2xl sm:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full mt-2" />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryPrograms.map((program, i) => {
                  const Icon = iconMap[program.icon] || Dumbbell;
                  return (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.05 * i }}
                      whileHover={{ y: -8 }}
                      className={`group relative rounded-2xl overflow-hidden cursor-pointer
                        ${darkMode ? 'bg-card-grey border border-white/5 hover:border-primary/30' : 'bg-white shadow-lg border border-gray-100 hover:border-primary/30'}
                        transition-all duration-300`}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={program.image}
                          alt={program.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300/FF6A00/FFFFFF?text=Program'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Level Badge */}
                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[program.level]}`}>
                          {program.level}
                        </div>

                        {/* Icon */}
                        <div
                          className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm"
                          style={{ background: `${program.color}40` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: program.color }} />
                        </div>

                        {/* Name */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-heading text-xl font-bold text-white drop-shadow-lg">
                            {program.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-secondary-text text-sm leading-relaxed mb-4 line-clamp-2">
                          {program.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{program.duration}</span>
                          </div>
                          <button 
                            onClick={() => setSelectedProgram(program)}
                            className="text-primary text-sm font-medium hover:underline"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>

                      {/* Hover Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 0%, ${program.color}10, transparent 60%)` }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Details Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${darkMode ? 'bg-card-grey border border-white/10' : 'bg-white border border-gray-200'} shadow-2xl`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProgram(null)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Program Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300/FF6A00/FFFFFF?text=Program'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Program Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${levelColors[selectedProgram.level]}`}>
                    {selectedProgram.level}
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                    {selectedProgram.name}
                  </h2>
                </div>
              </div>

              {/* Program Details */}
              <div className="p-6 sm:p-8">
                {/* Description */}
                <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedProgram.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-bg-black/50' : 'bg-gray-50'}`}>
                    <Clock className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-gray-400">Duration</p>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProgram.duration}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-bg-black/50' : 'bg-gray-50'}`}>
                    <BarChart3 className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-gray-400">Category</p>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {categoryLabels[selectedProgram.category] || selectedProgram.category}
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${darkMode ? 'bg-bg-black/50' : 'bg-gray-50'}`}>
                    <Flame className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-gray-400">Intensity</p>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedProgram.level === 'Beginner' ? 'Low' : selectedProgram.level === 'Intermediate' ? 'Medium' : 'High'}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className={`font-heading text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Program Benefits
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(programBenefits[selectedProgram.id] || programBenefits['strength-training'] || []).map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule Info */}
                <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-primary/10 border border-primary/20' : 'bg-orange-50 border border-orange-100'}`}>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Class Schedule</p>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Available Monday through Saturday with multiple time slots. 
                        Morning: 6AM - 10AM, Evening: 4PM - 9PM. Sunday classes available on request.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedProgram(null);
                      setBookingModalOpen(true);
                    }}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book This Program
                  </button>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BookingModal />
    </div>
  );
}
