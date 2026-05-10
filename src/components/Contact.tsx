import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';
import ContactModal from './ContactModal';

export default function Contact() {
  const { darkMode, locations, currentBranch } = useApp();
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm
    ${darkMode
      ? 'bg-bg-black border-white/10 text-white placeholder-gray-500 focus:border-primary focus:shadow-glow-orange'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20'
    }`;

  return (
    <section id="contact" className={`py-24 ${darkMode ? 'bg-card-grey' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Contact <span className="text-gradient">Us</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <input
                    className={inputClass}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone
                  </label>
                  <input
                    className={inputClass}
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  rows={5}
                  className={inputClass + ' resize-none'}
                  placeholder="Tell us about your fitness goals..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>

            <ContactModal
              isOpen={showModal}
              onClose={handleCloseModal}
              formData={form}
            />
          </motion.div>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick contacts — branch-specific */}
            <div className="space-y-4">
              {currentBranch ? (
                <div className={`p-5 rounded-xl ${darkMode ? 'bg-bg-black/50 border border-white/5' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                      {currentBranch.name}
                    </span>
                    <span className="text-secondary-text text-xs">Selected Branch</span>
                  </div>
                  <div className="space-y-2.5">
                    <a href={`tel:${currentBranch.phone}`} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" /> {currentBranch.phone}
                    </a>
                    <a href={`mailto:${currentBranch.email}`} className="flex items-center gap-2 text-sm text-secondary-text hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" /> {currentBranch.email}
                    </a>
                    <span className="flex items-center gap-2 text-sm text-secondary-text">
                      <MapPin className="w-4 h-4" /> {currentBranch.address}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-secondary-text">
                      <span className="w-4 h-4 flex items-center justify-center text-primary text-xs font-bold">H</span>
                      {currentBranch.hours}
                    </span>
                  </div>
                </div>
              ) : (
                locations.map(loc => (
                  <div key={loc.id} className={`p-4 rounded-xl ${darkMode ? 'bg-bg-black/50' : 'bg-gray-50'}`}>
                    <h4 className={`font-heading text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {loc.name} Branch
                    </h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <a href={`tel:${loc.phone}`} className="flex items-center gap-1.5 text-sm text-secondary-text hover:text-primary transition-colors">
                        <Phone className="w-3.5 h-3.5" /> {loc.phone}
                      </a>
                      <a href={`mailto:${loc.email}`} className="flex items-center gap-1.5 text-sm text-secondary-text hover:text-primary transition-colors">
                        <Mail className="w-3.5 h-3.5" /> {loc.email}
                      </a>
                      <span className="flex items-center gap-1.5 text-sm text-secondary-text">
                        <MapPin className="w-3.5 h-3.5" /> {loc.address}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125426.37461254226!2d78.06225824316406!3d11.664304199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1cad579c351%3A0x8d5d7b2f4e949879!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CULT Fitness Hub Locations"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
