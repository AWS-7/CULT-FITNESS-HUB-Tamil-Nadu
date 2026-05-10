import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useMemo } from 'react';
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
  { id: 201, src: '/images/1778160703576.jpg', category: 'training', title: 'Manjoor Weight Training', likes: 189 },
  { id: 202, src: '/images/1778160703582.jpg', category: 'equipment', title: 'Manjoor Equipment Zone', likes: 267 },
  { id: 203, src: '/images/1778160703587.jpg', category: 'studio', title: 'Manjoor Studio Space', likes: 145 },
  { id: 204, src: '/images/1778160703596.jpg', category: 'training', title: 'Manjoor Training Area', likes: 234 },
  { id: 205, src: '/images/1778160703606.jpg', category: 'equipment', title: 'Manjoor Cardio Section', likes: 178 },
  { id: 206, src: '/images/1778160703611.jpg', category: 'studio', title: 'Manjoor Group Fitness', likes: 298 },
];

const coonoorGalleryImages = [
  { id: 302, src: '/images/Screenshot 2026-05-10 134106.png', category: 'equipment', title: 'Coonoor Equipment Zone', likes: 234 },
  { id: 303, src: '/images/Screenshot 2026-05-10 134117.png', category: 'studio', title: 'Coonoor Studio Space', likes: 189 },
  { id: 304, src: '/images/Screenshot 2026-05-10 134132.png', category: 'training', title: 'Coonoor Weight Training', likes: 201 },
  { id: 305, src: '/images/Screenshot 2026-05-10 134142.png', category: 'equipment', title: 'Coonoor Cardio Section', likes: 156 },
  { id: 306, src: '/images/Screenshot 2026-05-10 134153.png', category: 'studio', title: 'Coonoor Group Fitness', likes: 267 },
];

export default function Gallery() {
  const { currentBranch, darkMode } = useApp();
  const { ref, inView } = useInView();
  
  const galleryImages = useMemo(() => 
    currentBranch?.id === 'salem' ? salemGalleryImages : 
    currentBranch?.id === 'manjoor' ? manjoorGalleryImages : 
    currentBranch?.id === 'coonoor' ? coonoorGalleryImages :
    generalGalleryImages,
    [currentBranch]
  );

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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  );
}

  
