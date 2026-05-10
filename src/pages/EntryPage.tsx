import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Users, Dumbbell, Instagram, Facebook, Youtube, Twitter, Phone, Mail, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from '/images/Screenshot_2026-05-10_140628-removebg-preview.png';
import trainers from '../data/trainers.json';

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/cultfitnesshub?igsh=c250eXd0enUwbzk=' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function EntryPage() { 
  const navigate = useNavigate();
  const { locations, recordVisit } = useApp();

  useEffect(() => {
    // Record entry page visit once per session
    if (!sessionStorage.getItem('visited_entry')) {
      recordVisit();
      sessionStorage.setItem('visited_entry', 'true');
    }
  }, [recordVisit]);

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-x-hidden">
      {/* Background gradient - reduced for mobile performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Desktop only heavy effects */}
        <div className="hidden sm:block absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="hidden sm:block absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
        {/* Mobile light effect */}
        <div className="sm:hidden absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[40px]" />
        <div className="sm:hidden absolute bottom-0 right-0 w-40 h-40 bg-orange-500/5 rounded-full blur-[30px]" />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {/* Title - CSS animation for mobile performance */}
          <div className="text-center mb-6 sm:mb-10 pt-4 sm:pt-8 animate-fade-in">
            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <img
                src={logo}
                alt="CULT Fitness Hub Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
              <span className="text-primary">CULT</span>
              <span className="text-white"> FITNESS HUB</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-sm mx-auto">
              Choose your branch to begin
            </p>
          </div>

          {/* Branch Cards - Modern mobile stacked layout */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-6">
            {locations.map((loc, i) => (
              <button
                key={loc.id}
                onClick={() => navigate(`/home?branch=${loc.id}`)}
                className="group relative flex items-center gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 text-left w-full active:scale-[0.98]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Branch Image - Small thumbnail on mobile */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200x200/FF6A00/FFFFFF?text=Gym'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Branch Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">{loc.area}</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-white truncate">{loc.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-1">{loc.address}</p>
                  
                  {/* Mobile stats row */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
                      {loc.members}+
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-3 h-3 text-primary" />
                      {loc.trainers} trainers
                    </span>
                  </div>
                  
                  {/* Featured Trainer */}
                  {(() => {
                    // Show specific branch coaches
                    const branchTrainers = {
                      'selas': trainers.find(t => t.name === 'Bala'),
                      'coonoor': trainers.find(t => t.name === 'Ronaldo'),
                      'manjoor': trainers.find(t => t.name === 'Rajesh')
                    };
                    const branchTrainer = branchTrainers[loc.id as keyof typeof branchTrainers];
                    
                    if (branchTrainer) {
                      return (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                          <img
                            src={branchTrainer.image}
                            alt={branchTrainer.name}
                            className="w-6 h-6 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div className="min-w-0">
                            <p className="text-white text-xs font-medium truncate">{branchTrainer.name}</p>
                            <p className="text-gray-500 text-[10px] truncate">{branchTrainer.role}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors" />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-gray-500 text-xs mt-6 sm:mt-8 opacity-0 animate-fade-in-delayed">
            3 Premium Locations • Tamil Nadu
          </p>
        </div>
      </main>

      {/* Footer - Mobile optimized */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={logo}
                  alt="CULT Fitness Hub Logo"
                  className="w-8 h-8 rounded-lg object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="font-heading text-lg font-bold">
                  <span className="text-primary">CULT</span>
                  <span className="text-white"> FITNESS HUB</span>
                </span>
              </div>
              <p className="text-secondary-text text-xs sm:text-sm leading-relaxed max-w-xs">
                Transforming lives through elite fitness coaching across Tamil Nadu.
              </p>
              {/* Social icons - Mobile optimized */}
              <div className="flex gap-2 mt-4">
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* All Branches - Mobile optimized */}
            <div>
              <h4 className="font-heading text-sm font-bold mb-3 text-white">Our Branches</h4>
              <div className="space-y-2">
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => navigate(`/home?branch=${loc.id}`)}
                    className="flex items-start gap-2 text-left w-full group"
                  >
                    <MapPin className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs sm:text-sm font-medium group-hover:text-primary transition-colors">{loc.name}</p>
                      <p className="text-gray-500 text-xs line-clamp-1">{loc.phone}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-sm font-bold mb-3 text-white">Quick Links</h4>
              <div className="space-y-2">
                <a href="/home" className="block text-secondary-text hover:text-primary text-xs sm:text-sm transition-colors">
                  Home
                </a>
                <a href="/home#programs" className="block text-secondary-text hover:text-primary text-xs sm:text-sm transition-colors">
                  Programs
                </a>
                <a href="/home#pricing" className="block text-secondary-text hover:text-primary text-xs sm:text-sm transition-colors">
                  Pricing
                </a>
                <a href="/home#contact" className="block text-secondary-text hover:text-primary text-xs sm:text-sm transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading text-sm font-bold mb-3 text-white">Contact</h4>
              <div className="space-y-2">
                <a href="tel:+918667336409" className="flex items-center gap-2 text-secondary-text hover:text-primary text-xs sm:text-sm transition-colors">
                  <Phone className="w-3 h-3" />
                  +91 86673 36409
                </a>
                <a href="mailto:martisflavin@gmail.com" className="flex items-center gap-2 text-secondary-text hover:text-primary text-xs sm:text-sm transition-colors">
                  <Mail className="w-3 h-3" />
                  martisflavin@gmail.com
                </a>
                <div className="flex items-center gap-2 text-secondary-text text-xs sm:text-sm">
                  <Clock className="w-3 h-3 text-primary" />
                  <span>Morning: 6AM - 10AM</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-text text-xs sm:text-sm pl-5">
                  <span>Evening: 4PM - 9PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright - Mobile optimized */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} CULT Fitness Hub. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-primary text-xs transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-primary text-xs transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
