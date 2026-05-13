import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Dumbbell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookingModal() {
  const { bookingModalOpen, setBookingModalOpen, locations, programs, darkMode, currentBranch } = useApp();
  const [form, setForm] = useState({ name: '', phone: '', location: currentBranch?.id || '', program: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (bookingModalOpen && currentBranch) {
      setForm(p => ({ ...p, location: currentBranch.id }));
    }
  }, [bookingModalOpen, currentBranch]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone';
    if (!form.location) e.location = 'Please select a location';
    if (!form.program) e.program = 'Please select a program';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Get location and program names for the message
    const locationName = locations.find(l => l.id === form.location)?.name || form.location;
    const programName = programs.find(p => p.name === form.program)?.name || form.program;
    
    // Create WhatsApp message
    const message = encodeURIComponent(
      `🏋️‍♂️ *CULT Fitness Hub - Free Trial Request*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Location:* ${locationName}\n` +
      `*Program:* ${programName}\n\n` +
      `I'm interested in booking a free trial session. Please contact me to schedule an appointment.`
    );
    
    // WhatsApp number for booking trial requests
    const whatsappNumber = '918667336409'; // +91 866 733 6409
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Close modal after opening WhatsApp
    setBookingModalOpen(false);
    setForm({ name: '', phone: '', location: '', program: '' });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-sm
    ${darkMode
      ? `bg-bg-black border-white/10 text-white placeholder-gray-500 ${errors[field] ? 'border-red-500' : 'focus:border-primary focus:shadow-glow-orange'}`
      : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 ${errors[field] ? 'border-red-400' : 'focus:border-primary focus:ring-2 focus:ring-primary/20'}`
    }`;

  return (
    <AnimatePresence>
      {bookingModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setBookingModalOpen(false)}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col
                ${darkMode ? 'bg-card-grey' : 'bg-white'}`}
            >
            {/* Header */}
            <div className="relative bg-primary px-6 py-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-heading text-2xl font-bold text-white uppercase">Book a Free Trial</h2>
                <p className="text-orange-100 text-sm mt-0.5">Start your transformation journey today</p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="flex-shrink-0 text-white/70 hover:text-white transition-colors -mr-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <motion.form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> Full Name</span>
                      </label>
                      <input
                        className={inputClass('name')}
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> Phone Number</span>
                      </label>
                      <input
                        className={inputClass('phone')}
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        maxLength={10}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Location */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> Preferred Location</span>
                      </label>
                      <select
                        className={inputClass('location')}
                        value={form.location}
                        onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                      >
                        <option value="">Select a location</option>
                        {locations.map(l => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                      </select>
                      {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
                    </div>

                    {/* Program */}
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="flex items-center gap-1.5"><Dumbbell className="w-3.5 h-3.5 text-primary" /> Interested Program</span>
                      </label>
                      <select
                        className={inputClass('program')}
                        value={form.program}
                        onChange={e => setForm(p => ({ ...p, program: e.target.value }))}
                      >
                        <option value="">Select a program</option>
                        {programs.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                      {errors.program && <p className="text-red-400 text-xs mt-1">{errors.program}</p>}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-primary w-full py-3.5 mt-2"
                    >
                      Book Now
                    </motion.button>
                    <p className="text-center text-secondary-text text-xs">
                      Click to open WhatsApp with pre-filled message
                    </p>
                  </motion.form>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
