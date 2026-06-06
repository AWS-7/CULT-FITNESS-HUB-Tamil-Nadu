import { motion } from 'framer-motion';
import { Camera, Play, Pause, ArrowRight } from 'lucide-react';
import { useMemo, useRef, useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

const generalGalleryImages = [
  { id: 1, src: '/images/1778160906823.jpg', category: 'training', title: 'Weight Training', likes: 245 },
  { id: 2, src: '/images/1778160906819.jpg', category: 'equipment', title: 'Cardio Zone', likes: 189 },
  { id: 3, src: '/images/1778160906813.jpg', category: 'training', title: 'Strength Training', likes: 312 },
  { id: 4, src: '/images/1778160906809.jpg', category: 'studio', title: 'Group Fitness', likes: 428 },
  { id: 5, src: '/images/1778160906804.jpg', category: 'training', title: 'Crossfit Area', likes: 267 },
  { id: 6, src: '/images/1778160703643.jpg', category: 'studio', title: 'Yoga Studio', likes: 534 },
];

const salemGalleryImages = [
  { id: 101, src: '/images/salem-whatsapp-1.jpg', category: 'training', title: 'Salem Weight Training', likes: 156 },
  { id: 102, src: '/images/salem-whatsapp-2.jpg', category: 'equipment', title: 'Salem Equipment Zone', likes: 234 },
  { id: 103, src: '/images/salem-whatsapp-3.jpg', category: 'studio', title: 'Salem Studio Space', likes: 189 },
  { id: 104, src: '/images/salem-whatsapp-4.jpg', category: 'training', title: 'Salem Training Area', likes: 267 },
  { id: 105, src: '/images/salem-whatsapp-5.jpg', category: 'equipment', title: 'Salem Cardio Section', likes: 145 },
  { id: 106, src: '/images/salem-whatsapp-6.jpg', category: 'studio', title: 'Salem Group Fitness', likes: 298 },
  { id: 107, src: '/images/salem-whatsapp-7.jpg', category: 'training', title: 'Salem Personal Training', likes: 178 },
  { id: 108, src: '/images/salem-whatsapp-8.jpg', category: 'equipment', title: 'Salem Gym Floor', likes: 234 },
];

const manjoorGalleryImages = [
  { id: 204, src: '/images/1778160703596.jpg', category: 'training', title: 'Manjoor Training Area', likes: 234 },
  { id: 205, src: '/images/1778160703606.jpg', category: 'equipment', title: 'Manjoor Cardio Section', likes: 178 },
  { id: 206, src: '/images/1778160703611.jpg', category: 'studio', title: 'Manjoor Group Fitness', likes: 298 },
  { id: 207, src: '/images/Screenshot 2026-05-10 133647.png', category: 'training', title: 'Manjoor Workout Session', likes: 156 },
  { id: 208, src: '/images/Screenshot 2026-05-10 133633.png', category: 'equipment', title: 'Manjoor Equipment Training', likes: 189 },
  { id: 209, src: '/images/Screenshot 2026-05-10 133627.png', category: 'studio', title: 'Manjoor Fitness Studio', likes: 234 },
  { id: 210, src: '/images/Screenshot 2026-05-10 133618.png', category: 'training', title: 'Manjoor Strength Training', likes: 167 },
  { id: 211, src: '/images/Screenshot 2026-05-10 133608.png', category: 'equipment', title: 'Manjoor Gym Equipment', likes: 145 },
  { id: 212, src: '/images/Screenshot 2026-05-10 133558.png', category: 'studio', title: 'Manjoor Group Class', likes: 298 },
  { id: 213, src: '/images/Screenshot 2026-05-10 133547.png', category: 'training', title: 'Manjoor Personal Training', likes: 178 },
  { id: 214, src: '/images/Screenshot 2026-05-10 133538.png', category: 'equipment', title: 'Manjoor Cardio Zone', likes: 234 },
  { id: 215, src: '/images/Screenshot 2026-05-10 133531.png', category: 'studio', title: 'Manjoor Yoga Session', likes: 189 },
  { id: 216, src: '/images/Screenshot 2026-05-10 133521.png', category: 'training', title: 'Manjoor HIIT Training', likes: 156 },
  { id: 217, src: '/images/Screenshot 2026-05-10 133512.png', category: 'equipment', title: 'Manjoor Weight Lifting', likes: 267 },
  { id: 218, src: '/images/Screenshot 2026-05-10 133505.png', category: 'studio', title: 'Manjoor Fitness Center', likes: 145 },
];

const coonoorGalleryImages = [
  { id: 401, src: '/images/coonoor-new-1.png', category: 'equipment', title: 'Coonoor Equipment Zone', likes: 234 },
  { id: 402, src: '/images/coonoor-new-2.png', category: 'studio', title: 'Coonoor Studio Space', likes: 189 },
  { id: 403, src: '/images/coonoor-new-3.png', category: 'training', title: 'Coonoor Weight Training', likes: 201 },
  { id: 404, src: '/images/coonoor-new-4.png', category: 'equipment', title: 'Coonoor Cardio Section', likes: 156 },
  { id: 405, src: '/images/coonoor-new-5.png', category: 'studio', title: 'Coonoor Group Fitness', likes: 267 },
  { id: 406, src: '/images/coonoor-new-6.png', category: 'training', title: 'Coonoor Workout Area', likes: 198 },
  { id: 407, src: '/images/coonoor-new-7.png', category: 'equipment', title: 'Coonoor Gym Floor', likes: 245 },
  { id: 408, src: '/images/coonoor-new-8.png', category: 'studio', title: 'Coonoor Fitness Studio', likes: 178 },
  { id: 409, src: '/images/coonoor-new-9.png', category: 'training', title: 'Coonoor Strength Training', likes: 289 },
  { id: 410, src: '/images/coonoor-new-10.png', category: 'equipment', title: 'Coonoor Exercise Zone', likes: 167 },
  { id: 411, src: '/images/coonoor-new-11.png', category: 'studio', title: 'Coonoor Training Center', likes: 234 },
  { id: 412, src: 'https://images.pexels.com/photos/6628651/pexels-photo-6628651.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1', category: 'massage', title: 'Massage Chair Zone', likes: 312 },
  { id: 413, src: 'https://images.pexels.com/photos/3757943/pexels-photo-3757943.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1', category: 'massage', title: 'Relaxation Area', likes: 278 },
  { id: 414, src: 'https://images.pexels.com/photos/5796693/pexels-photo-5796693.jpeg?auto=compress&cs=tinysrgb&w=800&dpr=1', category: 'massage', title: 'Recovery & Wellness', likes: 245 },
];

export default function Gallery() {
  const { currentBranch, darkMode } = useApp();
  const { ref, inView } = useInView();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  
  const galleryImages = useMemo(() => 
    currentBranch?.id === 'selas' ? salemGalleryImages : 
    currentBranch?.id === 'manjoor' ? manjoorGalleryImages : 
    currentBranch?.id === 'coonoor' ? coonoorGalleryImages :
    generalGalleryImages,
    [currentBranch]
  );

  // Auto-scroll functionality - only for mobile
  useEffect(() => {
    // Only enable auto-scroll on mobile devices (lg breakpoint and below) and when auto-scroll is enabled
    const isMobile = window.innerWidth < 1024;
    if (!isMobile || !isAutoScroll) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5; // pixels per frame
    const scrollInterval = 50; // milliseconds between frames
    let intervalId: NodeJS.Timeout;

    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += scrollSpeed;
      
      // Reset to beginning when reaching the end
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
    };

    const startScroll = () => {
      intervalId = setInterval(scroll, scrollInterval);
    };

    const stopScroll = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    startScroll();

    return () => {
      stopScroll();
    };
  }, [isAutoScroll]);

  return (
    <section id="gallery" className={`py-20 ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
          >
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold tracking-wider uppercase">GALLERY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {currentBranch ? `${currentBranch.name} Gallery` : 'Our Gallery'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}
          >
            Explore our state-of-the-art facilities and training sessions
          </motion.p>
        </div>

        {/* Gallery Grid - Desktop / Auto-scrolling Gallery - Mobile */}
        <div className="hidden lg:block">
          {/* Desktop Static Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs capitalize">{image.category}</span>
                      <span className="text-white/80 text-xs">{image.likes} likes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          {/* Mobile Scroll Controls */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoScroll(!isAutoScroll)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isAutoScroll 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {isAutoScroll ? (
                  <>
                    <Pause className="w-3 h-3" />
                    Auto Scroll ON
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Manual Scroll
                  </>
                )}
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isAutoScroll ? 'Auto-scrolling' : 'Swipe to navigate'}
              </span>
            </div>
            <button
              onClick={() => window.open('/gallery', '_blank')}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-medium hover:bg-primary-dark transition-colors"
            >
              View All
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          
          {/* Mobile Gallery */}
          <div 
            ref={scrollContainerRef}
            className={`overflow-x-auto ${isAutoScroll ? 'scrollbar-hide' : ''}`}
            style={{ scrollbarWidth: isAutoScroll ? 'none' : 'auto', msOverflowStyle: isAutoScroll ? 'none' : 'auto' }}
          >
            <div className="flex gap-4 py-4" style={{ width: 'max-content' }}>
              {galleryImages.concat(galleryImages).map((image, index) => (
                <motion.div
                  key={`${image.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: (index % galleryImages.length) * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                  style={{ width: '280px', height: '224px' }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs capitalize">{image.category}</span>
                        <span className="text-white/80 text-xs">{image.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

  
