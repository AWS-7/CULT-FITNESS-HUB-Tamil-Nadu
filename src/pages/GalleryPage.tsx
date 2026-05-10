import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Filter, Heart } from 'lucide-react';

// Import all gallery images from the Gallery component
const generalGalleryImages = [
  { id: 1, src: '/images/1778160906823.jpg', category: 'training', title: 'Weight Training', likes: 245 },
  { id: 2, src: '/images/1778160906819.jpg', category: 'equipment', title: 'Cardio Zone', likes: 189 },
  { id: 3, src: '/images/1778160906813.jpg', category: 'training', title: 'Strength Training', likes: 312 },
  { id: 4, src: '/images/1778160906809.jpg', category: 'studio', title: 'Group Fitness', likes: 428 },
  { id: 5, src: '/images/1778160906804.jpg', category: 'training', title: 'Crossfit Area', likes: 267 },
  { id: 6, src: '/images/1778160703643.jpg', category: 'studio', title: 'Yoga Studio', likes: 534 },
];

const selasGalleryImages = [
  { id: 101, src: '/images/salem-whatsapp-1.jpg', category: 'training', title: 'Selas Weight Training', likes: 156 },
  { id: 102, src: '/images/salem-whatsapp-2.jpg', category: 'equipment', title: 'Selas Equipment Zone', likes: 234 },
  { id: 103, src: '/images/salem-whatsapp-3.jpg', category: 'studio', title: 'Selas Studio Space', likes: 189 },
  { id: 104, src: '/images/salem-whatsapp-4.jpg', category: 'training', title: 'Selas Training Area', likes: 267 },
  { id: 105, src: '/images/salem-whatsapp-5.jpg', category: 'equipment', title: 'Selas Cardio Section', likes: 145 },
  { id: 106, src: '/images/salem-whatsapp-6.jpg', category: 'studio', title: 'Selas Group Fitness', likes: 298 },
  { id: 107, src: '/images/salem-whatsapp-7.jpg', category: 'training', title: 'Selas Personal Training', likes: 178 },
  { id: 108, src: '/images/salem-whatsapp-8.jpg', category: 'equipment', title: 'Selas Gym Floor', likes: 234 },
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
  { id: 302, src: '/images/Screenshot 2026-05-10 134106.png', category: 'equipment', title: 'Coonoor Equipment Zone', likes: 234 },
  { id: 303, src: '/images/Screenshot 2026-05-10 134117.png', category: 'studio', title: 'Coonoor Studio Space', likes: 189 },
  { id: 304, src: '/images/Screenshot 2026-05-10 134132.png', category: 'training', title: 'Coonoor Weight Training', likes: 201 },
  { id: 305, src: '/images/Screenshot 2026-05-10 134142.png', category: 'equipment', title: 'Coonoor Cardio Section', likes: 156 },
  { id: 306, src: '/images/Screenshot 2026-05-10 134153.png', category: 'studio', title: 'Coonoor Group Fitness', likes: 267 },
];

export default function GalleryPage() {
  const { darkMode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  // Get all images based on selected branch
  const allGalleryImages = useMemo(() => {
    const images = [];
    
    if (selectedBranch === 'all' || selectedBranch === 'selas') {
      images.push(...selasGalleryImages);
    }
    if (selectedBranch === 'all' || selectedBranch === 'manjoor') {
      images.push(...manjoorGalleryImages);
    }
    if (selectedBranch === 'all' || selectedBranch === 'coonoor') {
      images.push(...coonoorGalleryImages);
    }
    if (selectedBranch === 'all') {
      images.push(...generalGalleryImages);
    }
    
    return images;
  }, [selectedBranch]);

  // Filter images by category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') return allGalleryImages;
    return allGalleryImages.filter(img => img.category === selectedCategory);
  }, [allGalleryImages, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allGalleryImages.map(img => img.category));
    return ['all', ...Array.from(cats)];
  }, [allGalleryImages]);

  // Get branch options
  const branches = [
    { value: 'all', label: 'All Branches' },
    { value: 'selas', label: 'Selas' },
    { value: 'manjoor', label: 'Manjoor' },
    { value: 'coonoor', label: 'Coonoor' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-bg-black' : 'bg-gray-50'} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold tracking-wider uppercase">COMPLETE GALLERY</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            All Branch Gallery
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Explore our complete collection of facilities, training sessions, and fitness moments across all branches
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Branch Filter */}
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <button
                  key={branch.value}
                  onClick={() => setSelectedBranch(branch.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedBranch === branch.value
                      ? 'bg-primary text-white'
                      : darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {branch.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  darkMode
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-gray-900 border-gray-300'
                } border`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Image Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {filteredImages.length} images
            {selectedBranch !== 'all' && ` from ${branches.find(b => b.value === selectedBranch)?.label}`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={`${image.id}-${selectedBranch}-${selectedCategory}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
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
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-white/80" />
                      <span className="text-white/80 text-xs">{image.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No images found
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your filters to see more images
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
