import { motion } from 'framer-motion';
import { ZoomIn, Grid3x3, Maximize2, Filter, Heart, Share2, Camera } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

const galleryCategories = [
  { id: 'all', name: 'All Photos', icon: Grid3x3 },
  { id: 'training', name: 'Training', icon: Camera },
  { id: 'equipment', name: 'Equipment', icon: Maximize2 },
  { id: 'studio', name: 'Studio', icon: Filter },
];

const generalGalleryImages = [
  { id: 1, src: '/images/1778160906823.jpg', category: 'training', title: 'Weight Training', likes: 245 },
  { id: 2, src: '/images/1778160906819.jpg', category: 'equipment', title: 'Cardio Zone', likes: 189 },
  { id: 3, src: '/images/1778160906813.jpg', category: 'training', title: 'Strength Training', likes: 312 },
  { id: 4, src: '/images/1778160906809.jpg', category: 'studio', title: 'Group Fitness', likes: 428 },
  { id: 5, src: '/images/1778160906804.jpg', category: 'training', title: 'Crossfit Area', likes: 267 },
  { id: 6, src: '/images/1778160703643.jpg', category: 'studio', title: 'Yoga Studio', likes: 534 },
  { id: 7, src: '/images/1778160703634.jpg', category: 'training', title: 'Boxing Ring', likes: 389 },
  { id: 8, src: '/images/1778160703629.jpg', category: 'studio', title: 'Recovery Zone', likes: 298 },
];

const salemGalleryImages = [
  { id: 101, src: '/images/salem-20AM.jpg?v=2026051001', category: 'training', title: 'Salem Weight Training', likes: 156 },
  { id: 102, src: '/images/salem-21AM.jpg?v=2026051001', category: 'equipment', title: 'Salem Equipment Zone', likes: 234 },
  { id: 103, src: '/images/salem-22AM1.jpg?v=2026051001', category: 'studio', title: 'Salem Studio Space', likes: 189 },
  { id: 104, src: '/images/salem-22AM.jpg?v=2026051001', category: 'training', title: 'Salem Training Area', likes: 267 },
  { id: 105, src: '/images/salem-23AM.jpg?v=2026051001', category: 'equipment', title: 'Salem Cardio Section', likes: 145 },
  { id: 106, src: '/images/salem-24AM1.jpg?v=2026051001', category: 'studio', title: 'Salem Group Fitness', likes: 298 },
  { id: 107, src: '/images/salem-24AM2.jpg?v=2026051001', category: 'training', title: 'Salem Personal Training', likes: 178 },
  { id: 108, src: '/images/salem-24AM.jpg?v=2026051001', category: 'equipment', title: 'Salem Gym Floor', likes: 234 },
  { id: 109, src: '/images/salem-25AM1.jpg?v=2026051001', category: 'studio', title: 'Salem Yoga Space', likes: 156 },
  { id: 110, src: '/images/salem-25AM2.jpg?v=2026051001', category: 'training', title: 'Salem Strength Area', likes: 289 },
  { id: 111, src: '/images/salem-25AM3.jpg?v=2026051001', category: 'equipment', title: 'Salem Machines', likes: 167 },
  { id: 112, src: '/images/salem-25AM.jpg?v=2026051001', category: 'studio', title: 'Salem Lounge', likes: 134 },
  { id: 113, src: '/images/salem-26AM1.jpg?v=2026051001', category: 'training', title: 'Salem Functional Training', likes: 201 },
  { id: 114, src: '/images/salem-26AM2.jpg?v=2026051001', category: 'equipment', title: 'Salem Free Weights', likes: 245 },
  { id: 115, src: '/images/salem-26AM.jpg?v=2026051001', category: 'studio', title: 'Salem Reception', likes: 189 },
];

const manjoorGalleryImages = [
  { id: 201, src: '/images/manjoor-505.jpg?v=2026051001', category: 'training', title: 'Manjoor Weight Training', likes: 189 },
  { id: 202, src: '/images/manjoor-512.jpg?v=2026051001', category: 'equipment', title: 'Manjoor Equipment Zone', likes: 267 },
  { id: 203, src: '/images/manjoor-521.jpg?v=2026051001', category: 'studio', title: 'Manjoor Studio Space', likes: 145 },
  { id: 204, src: '/images/manjoor-531.jpg?v=2026051001', category: 'training', title: 'Manjoor Training Area', likes: 234 },
  { id: 205, src: '/images/manjoor-538.jpg?v=2026051001', category: 'equipment', title: 'Manjoor Cardio Section', likes: 178 },
  { id: 206, src: '/images/manjoor-547.jpg?v=2026051001', category: 'studio', title: 'Manjoor Group Fitness', likes: 298 },
  { id: 207, src: '/images/manjoor-558.jpg?v=2026051001', category: 'training', title: 'Manjoor Personal Training', likes: 156 },
  { id: 208, src: '/images/manjoor-608.jpg?v=2026051001', category: 'equipment', title: 'Manjoor Gym Floor', likes: 289 },
  { id: 209, src: '/images/manjoor-618.jpg?v=2026051001', category: 'studio', title: 'Manjoor Yoga Space', likes: 167 },
  { id: 210, src: '/images/manjoor-627.jpg?v=2026051001', category: 'training', title: 'Manjoor Strength Area', likes: 134 },
  { id: 211, src: '/images/manjoor-633.jpg?v=2026051001', category: 'equipment', title: 'Manjoor Machines', likes: 201 },
  { id: 212, src: '/images/manjoor-647.jpg?v=2026051001', category: 'studio', title: 'Manjoor Lounge', likes: 245 },
];

export default function Gallery() {
  const { darkMode, currentBranch } = useApp();
  const { ref, inView } = useInView();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const galleryImages = useMemo(() => 
    currentBranch?.id === 'salem' ? salemGalleryImages : 
    currentBranch?.id === 'manjoor' ? manjoorGalleryImages : 
    generalGalleryImages,
    [currentBranch]
  );

  const filteredImages = useMemo(() => 
    selectedCategory === 'all' 
      ? galleryImages 
      : galleryImages.filter((img: any) => img.category === selectedCategory),
    [selectedCategory, galleryImages]
  );

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

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
            className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {currentBranch?.id === 'salem' ? (
              <>Explore Our <span className="text-gradient">Salem Fitness World</span></>
            ) : currentBranch?.id === 'manjoor' ? (
              <>Explore Our <span className="text-gradient">Manjoor Fitness World</span></>
            ) : (
              <>Explore Our <span className="text-gradient">Fitness World</span></>
            )}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Get inspired by our state-of-the-art facilities and vibrant fitness community
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {galleryCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : darkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Masonry Grid - Horizontal scroll on mobile */}
        <div className="w-full">
          {/* Mobile Horizontal Scroll */}
          <div className="sm:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4">
            {filteredImages.map((image: any, index: number) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: Math.min(index * 0.01, 0.2), duration: 0.2 }}
                className="flex-shrink-0 w-72 snap-start"
              >
                <div className="group relative overflow-hidden rounded-xl cursor-pointer h-48"
                     onClick={() => setLightbox(image.id)}>
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(image.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          likedImages.has(image.id)
                            ? 'bg-red-500 text-white'
                            : darkMode
                              ? 'bg-black/50 text-white hover:bg-black/70'
                              : 'bg-white/50 text-gray-800 hover:bg-white/70'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 rounded-full backdrop-blur-sm transition-colors hover:scale-110"
                      >
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    
                    {/* Title & Stats */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                      <div className="flex items-center gap-3 text-white/80 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ZoomIn className="w-3 h-3" />
                          <span>View</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop Masonry Grid */}
          <div className="hidden sm:block columns-1 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredImages.map((image: any, index: number) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: Math.min(index * 0.01, 0.2), duration: 0.2 }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setLightbox(image.id)}
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        likedImages.has(image.id)
                          ? 'bg-red-500 text-white'
                          : darkMode
                            ? 'bg-black/50 text-white hover:bg-black/70'
                            : 'bg-white/50 text-gray-800 hover:bg-white/70'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-2 rounded-full backdrop-blur-sm transition-colors hover:scale-110"
                    >
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Title & Stats */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ZoomIn className="w-3 h-3" />
                        <span>View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        
        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <a
            href="/gallery"
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'
                : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            View All Gallery
          </a>
        </motion.div>

        {/* Lightbox */}
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages.find((img: any) => img.id === lightbox)?.src}
                alt="Gallery"
                className="max-w-full max-h-[90vh] object-contain rounded-xl"
              />
              
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
