import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast loading simulation
    const simulateNetworkLoading = async () => {
      try {
        const loadingSteps = [
          { progress: 25, delay: 100 },
          { progress: 50, delay: 100 },
          { progress: 75, delay: 100 },
          { progress: 100, delay: 100 }
        ];

        for (const step of loadingSteps) {
          await new Promise(resolve => setTimeout(resolve, step.delay));
          setLoadingProgress(step.progress);
        }

        // Minimal delay for smooth transition
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
        
        // Ensure callback is called
        if (onLoadingComplete && typeof onLoadingComplete === 'function') {
          onLoadingComplete();
        }
      } catch (error) {
        // Fallback - complete loading immediately
        setIsLoading(false);
        if (onLoadingComplete && typeof onLoadingComplete === 'function') {
          onLoadingComplete();
        }
      }
    };

    simulateNetworkLoading();
    
    // Fallback timeout - complete loading after 3 seconds max
    const fallbackTimeout = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete && typeof onLoadingComplete === 'function') {
        onLoadingComplete();
      }
    }, 3000);

    return () => clearTimeout(fallbackTimeout);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-bg-black via-gray-900 to-bg-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 animate-pulse" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 md:w-40 md:h-40 relative"
          >
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/20" />
            
            {/* Inner Ring */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-primary/80 border-r-primary/40 border-b-primary/20 border-l-primary/10 animate-reverse-spin" />
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/Screenshot_2026-05-10_140628-removebg-preview.png"
                alt="CULT Fitness Hub"
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            CULT FITNESS HUB
          </h1>
          <p className="text-primary text-sm md:text-base font-medium">
            Loading Your Fitness Journey...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 w-48 md:w-52"
        >
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-400 font-medium">
              {loadingProgress}%
            </span>
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-2 mt-6"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 3s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </motion.div>
  );
}
