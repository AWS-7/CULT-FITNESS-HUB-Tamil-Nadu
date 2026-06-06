import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, Users, Dumbbell, Maximize2,
  ArrowLeft, Flame, Calendar, Zap, Wind, Target,
  Activity, Music, Leaf, User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import BookingModal from '../components/BookingModal';
import MassageChairSection from '../components/MassageChairSection';

const iconMap: Record<string, React.ElementType> = {
  Dumbbell, Zap, Wind, Target, Activity, Music, Leaf, User,
};

const levelColors: Record<string, string> = {
  'Beginner': 'bg-green-500/20 text-green-400',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400',
  'Advanced': 'bg-red-500/20 text-red-400',
  'All Levels': 'bg-primary/20 text-primary',
};

export default function BranchDetail() {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate = useNavigate();
  const { locations, trainers, programs, darkMode, setBookingModalOpen } = useApp();

  const branch = locations.find(l => l.id === branchId);
  const branchTrainers = trainers.filter(t => t.location === branchId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [branchId]);

  const infoRef = useInView();
  const trainersRef = useInView();
  const programsRef = useInView();

  if (!branch) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Branch Not Found</h1>
          <p className="text-secondary-text mb-6">The branch you are looking for does not exist.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'bg-bg-black' : 'bg-gray-50'}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <img
          src={branch.image}
          alt={branch.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x800/FF6A00/FFFFFF?text=CULT+Fitness'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-black via-bg-black/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {branch.name} Branch
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mt-4 uppercase tracking-wide">
              CULT Fitness Hub <span className="text-gradient">{branch.name}</span>
            </h1>
            <p className="text-secondary-text mt-4 max-w-xl text-lg">
              Experience world-class fitness at our {branch.name} facility. State-of-the-art equipment, 
              expert coaches, and a community that pushes you forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats & Info */}
      <section className={`py-20 ${darkMode ? 'bg-bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={infoRef.ref} className="grid lg:grid-cols-3 gap-8">
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={infoRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className={`lg:col-span-2 rounded-2xl p-8 ${darkMode ? 'bg-card-grey' : 'bg-gray-50 border border-gray-200'}`}
            >
              <h2 className={`font-heading text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Branch Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: MapPin, label: 'Address', text: branch.address },
                  { icon: Phone, label: 'Phone', text: branch.phone },
                  { icon: Mail, label: 'Email', text: branch.email },
                  { icon: Clock, label: 'Hours', text: branch.hours },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-secondary-text text-xs uppercase tracking-wider">{item.label}</div>
                      <div className={`text-sm font-medium mt-0.5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={infoRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className={`rounded-2xl p-8 ${darkMode ? 'bg-card-grey' : 'bg-gray-50 border border-gray-200'}`}
            >
              <h2 className={`font-heading text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Stats
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Users, value: branch.members + '+', label: 'Active Members' },
                  { icon: Dumbbell, value: branch.trainers, label: 'Expert Trainers' },
                  { icon: Maximize2, value: branch.area, label: 'Facility Space' },
                  { icon: Calendar, value: '7 Days', label: 'Open Per Week' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                      <div className="text-secondary-text text-sm">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className={`py-20 ${darkMode ? 'bg-card-grey' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={trainersRef.ref} className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              animate={trainersRef.inView ? { opacity: 1 } : {}}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Expert Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={trainersRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className={`font-heading text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Trainers at <span className="text-gradient">{branch.name}</span>
            </motion.h2>
          </div>

          {branchTrainers.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchTrainers.map((trainer, i) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={trainersRef.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * i }}
                  className={`rounded-2xl overflow-hidden group ${darkMode ? 'bg-bg-black' : 'bg-white shadow-md'}`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300/FF6A00/FFFFFF?text=Trainer'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-heading text-xl font-bold">{trainer.name}</h3>
                      <p className="text-gray-300 text-sm">{trainer.role}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {trainer.certifications.map(cert => (
                        <span key={cert} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                    <p className="text-secondary-text text-sm">{trainer.experience} experience</p>
                    <p className="text-secondary-text text-sm mt-1">Speciality: {trainer.speciality}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={trainersRef.inView ? { opacity: 1 } : {}}
              className="text-center text-secondary-text"
            >
              No trainers listed for this branch yet.
            </motion.p>
          )}
        </div>
      </section>

      {/* Programs */}
      <section className={`py-20 ${darkMode ? 'bg-bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={programsRef.ref} className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              animate={programsRef.inView ? { opacity: 1 } : {}}
              className="text-primary text-sm font-semibold tracking-widest uppercase"
            >
              Available Programs
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={programsRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className={`font-heading text-4xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              What You Can <span className="text-gradient">Train</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program, i) => {
              const Icon = iconMap[program.icon] || Dumbbell;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={programsRef.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.07 * i }}
                  whileHover={{ y: -6 }}
                  className={`group relative rounded-2xl overflow-hidden
                    ${darkMode ? 'bg-card-grey' : 'bg-gray-50 border border-gray-200'}`}
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
                    <div
                      className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${program.color}30` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: program.color }} />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-heading text-xl font-bold text-white drop-shadow-lg">
                        {program.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 relative">
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
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: `linear-gradient(to right, ${program.color}, transparent)` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Massage Chair - Coonoor Only */}
      {branchId === 'coonoor' && <MassageChairSection />}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-black via-transparent to-bg-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-orange">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Join <span className="text-gradient">{branch.name}</span>?
            </h2>
            <p className="text-secondary-text text-lg mb-8 max-w-xl mx-auto">
              Start your fitness journey today. Book a free trial session and experience the CULT Fitness Hub difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setBookingModalOpen(true)} className="btn-primary text-lg px-8 py-4">
                Book Free Trial
              </button>
              <Link to="/" className="btn-outline text-lg px-8 py-4">
                View All Branches
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <BookingModal />
    </div>
  );
}
