import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: { name: string; email: string; phone: string; message: string };
}

export default function ContactModal({ isOpen, onClose, formData }: ContactModalProps) {
  const { darkMode } = useApp();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl
                ${darkMode ? 'bg-card-grey' : 'bg-white'}`}
            >
              {/* Header */}
              <div className="relative bg-primary px-6 py-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-heading text-xl font-bold text-white uppercase flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Message Sent!
                  </h2>
                  <p className="text-orange-100 text-sm mt-0.5">Thank you for reaching out</p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-white/70 hover:text-white transition-colors -mr-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className={`font-heading text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-secondary-text text-sm mb-4">
                    Your message has been received. Our team will get back to you within 24 hours.
                  </p>

                  {/* Message Preview */}
                  <div className={`w-full rounded-xl p-4 text-left ${darkMode ? 'bg-bg-black/50' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Your Message
                    </p>
                    <p className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formData.message}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="btn-primary w-full mt-6 py-3"
                  >
                    Got It!
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
