import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageSquare, Clock, Star, TrendingUp, Users, Zap } from 'lucide-react';
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

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-bg-black' : 'bg-gray-50'} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with trending badge */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Trending Contact</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Get In <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Touch</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Ready to start your fitness journey? Our expert team is here to help you achieve your goals with personalized guidance and support.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold text-primary">500+</span>
              <span className="text-gray-500">Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-500">4.9</span>
              <span className="text-gray-500">Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">24/7</span>
              <span className="text-gray-500">Support</span>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-3xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50' 
                  : 'bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl border border-gray-200/50'
              } shadow-2xl`}
            >
              {/* Form Header */}
              <div className="p-8 border-b border-gray-200/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-orange-500 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Send us a Message
                    </h3>
                    <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Your Name *
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm ${
                        darkMode
                          ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-primary focus:shadow-glow-orange'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number *
                    </label>
                    <input
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm ${
                        darkMode
                          ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-primary focus:shadow-glow-orange'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm ${
                      darkMode
                        ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-primary focus:shadow-glow-orange'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 outline-none text-sm resize-none ${
                      darkMode
                        ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-primary focus:shadow-glow-orange'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                    placeholder="Tell us about your fitness goals and how we can help..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                  <Zap className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-3xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50' 
                  : 'bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl border border-gray-200/50'
              } shadow-2xl p-8`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Quick Contact
                  </h3>
                  <p className="text-gray-500 text-sm">Call us anytime</p>
                </div>
              </div>

              <div className="space-y-4">
                {currentBranch ? (
                  <>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          {currentBranch.name}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <a href={`tel:${currentBranch.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                          <Phone className="w-4 h-4" />
                          <span>{currentBranch.phone}</span>
                        </a>
                        <a href={`mailto:${currentBranch.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                          <Mail className="w-4 h-4" />
                          <span>{currentBranch.email}</span>
                        </a>
                        <div className="flex items-start gap-3 text-sm">
                          <MapPin className="w-4 h-4 mt-0.5" />
                          <span>{currentBranch.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{currentBranch.hours}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} border-t-2 border-primary/30`}>
                      <p className={`font-semibold text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Direct Contact</p>
                      <div className="space-y-2">
                        <a href="tel:+918667336409" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span>+91 866 733 6409 (Flavin Martis)</span>
                        </a>
                        <a href="tel:7010535928" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="font-bold text-primary">70105 35928 (Arokiadass)</span>
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  locations.map(loc => (
                    <div key={loc.id} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                      <h4 className={`font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {loc.name} Branch
                      </h4>
                      <div className="space-y-2">
                        <a href={`tel:${loc.phone}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <Phone className="w-3 h-3" />
                          <span>{loc.phone}</span>
                        </a>
                        <a href={`mailto:${loc.email}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                          <Mail className="w-3 h-3" />
                          <span>{loc.email}</span>
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5 }}
              className={`relative overflow-hidden rounded-3xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50' 
                  : 'bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl border border-gray-200/50'
              } shadow-2xl`}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Find Us
                    </h3>
                    <p className="text-gray-500 text-sm">Visit our locations</p>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <iframe
                    src={
                      currentBranch?.id === 'manjoor'
                        ? "https://maps.google.com/maps?q=CULT%20FITNESS%20HUB%2C%20OPPOSITE%20TO%20FINE%20GOLD%2C%20MANJOOR%2C%20Manjoor%2C%20Tamil%20Nadu%20643219&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        : currentBranch?.id === 'coonoor'
                        ? "https://maps.google.com/maps?q=81%20Grays%20Hill%2C%20Behind%20Bagaicha%20Restaurant%20Bedfort%2C%20coonoor%2C%20Tamil%20Nadu%20643102&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        : currentBranch?.id === 'selas'
                        ? "https://maps.google.com/maps?q=CULT%20FITNESS%20HUB%2C%20No.2%2F344B%2C%20Bazaar%2C%20Selas%2C%20Huligal%2C%20Tamil%20Nadu%20643123&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        : "https://maps.google.com/maps?q=Coonoor%2C%20Nilgiris%2C%20Tamil%20Nadu&t=&z=12&ie=UTF8&iwloc=&output=embed"
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="CULT Fitness Hub Locations"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={showModal}
        onClose={handleCloseModal}
        formData={form}
      />
    </section>
  );
}
