import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '/images/1778161330002.jpg';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Programs', href: '#programs' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'BMI', href: '#bmi' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { darkMode, toggleDarkMode, setBookingModalOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(l => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navBg = scrolled
    ? darkMode
      ? 'bg-bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-lg'
      : 'bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-lg'
    : 'bg-transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="CULT Fitness Hub"
                className="w-9 h-9 rounded-lg object-cover shadow-glow-orange group-hover:shadow-glow-orange-lg transition-all"
                loading="lazy"
                decoding="async"
              />
              <span className="font-heading text-xl font-bold tracking-wider">
                <span className="text-primary">CULT</span>
                <span className={darkMode ? 'text-white' : 'text-gray-900'}> FITNESS HUB</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group
                    ${activeSection === link.href.slice(1)
                      ? 'text-primary'
                      : darkMode
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300
                  ${darkMode ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-600 hover:bg-black/10'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="hidden sm:flex btn-primary text-sm py-2 px-5"
              >
                Join Now
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${darkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-black/10'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-full w-72 z-50 ${darkMode ? 'bg-bg-black' : 'bg-white'} shadow-2xl`}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="font-heading text-lg font-bold">
                  <span className="text-primary">CULT</span> FITNESS HUB
                </span>
                <button onClick={() => setMobileOpen(false)} className="p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center px-6 py-3.5 text-base font-medium transition-colors
                      ${activeSection === link.href.slice(1)
                        ? 'text-primary border-r-2 border-primary'
                        : darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="px-6 pt-4">
                  <button
                    onClick={() => { setBookingModalOpen(true); setMobileOpen(false); }}
                    className="btn-primary w-full text-center"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
