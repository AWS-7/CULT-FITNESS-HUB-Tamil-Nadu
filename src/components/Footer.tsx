import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '/images/Screenshot_2026-05-10_140628-removebg-preview.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Programs', href: '#programs' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'BMI Calculator', href: '#bmi' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/cultfitnesshub?igsh=c250eXd0enUwbzk=' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const { darkMode, currentBranch } = useApp();

  return (
    <footer className={`${darkMode ? 'bg-card-grey border-t border-white/5' : 'bg-gray-100 border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3 mb-4">
              <img 
                src={logoImg} 
                alt="CULT Fitness Hub Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="font-heading text-xl font-bold">
                <span className="text-primary">CULT</span>
                <span className={darkMode ? 'text-white' : 'text-gray-900'}> FITNESS HUB</span>
              </span>
            </a>
            <p className="text-secondary-text text-sm leading-relaxed max-w-xs">
              Transforming lives through elite fitness coaching and community across Tamil Nadu since 2015.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300
                    ${darkMode ? 'bg-bg-black text-gray-400 hover:bg-primary hover:text-white' : 'bg-white text-gray-500 hover:bg-primary hover:text-white border border-gray-200'}`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-heading text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-secondary-text hover:text-primary text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href="/admin" className="text-secondary-text hover:text-primary text-sm transition-colors">
                Admin
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className={`font-heading text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Working Hours
            </h4>
            <div className="space-y-2 text-sm">
              {currentBranch ? (
                <>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>All Days</span>
                    <span className="text-primary font-medium">{currentBranch.hours}</span>
                  </div>
                  <p className="text-secondary-text text-xs mt-2">{currentBranch.name} Branch</p>
                </>
              ) : (
                <>
                  {[
                    { day: 'Mon – Fri', hours: '5:00 AM – 11:00 PM' },
                    { day: 'Saturday', hours: '5:00 AM – 10:00 PM' },
                    { day: 'Sunday', hours: '6:00 AM – 8:00 PM' },
                  ].map(row => (
                    <div key={row.day} className="flex justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{row.day}</span>
                      <span className="text-primary font-medium">{row.hours}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-gray-200'} flex flex-col items-center gap-3 text-sm text-secondary-text`}>
          <p>© {new Date().getFullYear()} CULT Fitness Hub{currentBranch ? ` — ${currentBranch.name}` : ''}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <p className="text-xs">Developed By AWS-Agni Web Solution-9080700642</p>
        </div>
      </div>
    </footer>
  );
}
