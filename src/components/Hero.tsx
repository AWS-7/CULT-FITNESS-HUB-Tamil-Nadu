import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';

// Move image arrays outside component to prevent re-creation
const MANJOOR_IMAGES = [
  '/images/1778161330002.jpg',
  '/images/1778161330021.jpg',
  '/images/1778161330044.jpg',
  '/images/1778161330067.jpg',
  '/images/1778161330083.jpg',
  '/images/1778161330102.jpg',
  '/images/1778161330117.jpg',
  '/images/1778161330127.jpg',
  '/images/1778161330136.jpg',
  '/images/1778161330146.jpg',
  '/images/1778161330159.jpg',
  '/images/1778161330174.jpg',
  '/images/1778161330188.jpg',
  '/images/1778161330217.jpg'
];

const SALEM_IMAGES = [
  '/images/1778161860614.jpg',
  '/images/1778161860619.jpg',
  '/images/1778161860626.jpg',
  '/images/1778161860631.jpg',
  '/images/1778161860638.jpg',
  '/images/1778161860643.jpg',
  '/images/1778161860649.jpg',
  '/images/1778161860654.jpg',
  '/images/1778161860660.jpg',
  '/images/1778161860665.jpg',
  '/images/1778161860671.jpg',
  '/images/1778161860678.jpg',
  '/images/1778161860684.jpg',
  '/images/1778161860689.jpg',
  '/images/1778161860695.jpg'
];

export default function Hero() {
  const { darkMode, setBookingModalOpen, currentBranch } = useApp();
  void darkMode;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isManjoor = currentBranch?.id === 'manjoor';
  const isSalem = currentBranch?.id === 'salem';
  
  // Use useMemo to prevent re-creation of images array
  const currentImages = useMemo(() => {
    if (isManjoor) return MANJOOR_IMAGES;
    if (isSalem) return SALEM_IMAGES;
    return [];
  }, [isManjoor, isSalem]);
  
  // Auto-rotate images for branches with multiple images
  useEffect(() => {
    if (currentImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
      }, 5000); // Change image every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [currentImages]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      {/* Background Image - Dynamic by branch */}
      <div className="absolute inset-0">
        <img
          src={
            currentBranch?.id === 'manjoor'
              ? MANJOOR_IMAGES[currentImageIndex]
              : currentBranch?.id === 'salem'
                ? SALEM_IMAGES[currentImageIndex]
                : 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=1'
          }
          alt="Gym"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-black/80 via-bg-black/60 to-bg-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-black/60 via-transparent to-bg-black/60" />
        
        {/* Image Indicators for Manjoor and Salem Branches */}
        {(isManjoor || isSalem) && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {currentImages.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-primary w-8'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Background glow — hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-primary text-sm font-medium tracking-wide">
            {currentBranch ? `${currentBranch.name} Branch` : '3 Premium Locations Across Tamil Nadu'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-none tracking-tight mb-4"
        >
          {currentBranch?.id === 'salem' ? (
            <>
              <span className="text-white">SELAS POWER</span>
              <br />
              <span className="text-gradient">HOUSE</span>
            </>
          ) : (
            <>
              <span className="text-white">UNLEASH YOUR</span>
              <br />
              <span className="text-gradient">TRUE POWER</span>
            </>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {currentBranch?.id === 'salem'
            ? "Selas Power House - The ultimate fitness destination in Anna Nagar. Premium equipment, personal training, and unmatched results."
            : "Elite training, world-class coaches, and a community that pushes you beyond limits. Your transformation starts here at CULT Fitness Hub."
          }
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {(currentBranch?.id === 'salem'
            ? [
                { value: '150+', label: 'Active Members' },
                { value: '1', label: 'Expert Trainer' },
                { value: '10+', label: 'Programs' },
                { value: '9000', label: 'Sq Ft Area' },
              ]
            : [
                { value: '1500+', label: 'Active Members' },
                { value: '26', label: 'Expert Trainers' },
                { value: '8+', label: 'Programs' },
                { value: '3', label: 'Locations' },
              ]
          ).map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <button
            onClick={() => setBookingModalOpen(true)}
            className="btn-primary text-base px-8 py-4 rounded-xl shadow-glow-orange font-semibold tracking-wide hover:scale-105 active:scale-95 transition-transform"
          >
            Start Your Journey — Free Trial
          </button>

          <a
            href="#programs"
            className="flex items-center gap-2 text-white border border-white/20 hover:border-white/50 px-8 py-4 rounded-xl transition-all duration-300 font-medium hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            Explore Programs
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
