import React, { createContext, useContext, useState, useEffect } from 'react';
import locationsData from '../data/locations.json';
import trainersData from '../data/trainers.json';
import programsData from '../data/programs.json';
import testimonialsData from '../data/testimonials.json';
import bookingsData from '../data/bookings.json';

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  members: number;
  trainers: number;
  area: string;
}

export interface Trainer {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: string;
  speciality: string;
  image: string;
  instagram: string;
  linkedin: string;
  certifications: string[];
}

export interface Program {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  duration: string;
  level: string;
  color: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
  program: string;
  achievement: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  location: string;
  program: string;
  date: string;
  status: string;
  contacted: boolean;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedLocation: string;
  setSelectedLocation: (id: string) => void;
  selectedBranch: string | null;
  setSelectedBranch: (id: string | null) => void;
  currentBranch: Location | null;
  locations: Location[];
  trainers: Trainer[];
  setTrainers: React.Dispatch<React.SetStateAction<Trainer[]>>;
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
  testimonials: Testimonial[];
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  addBooking: (booking: Omit<Booking, 'id' | 'date' | 'status' | 'contacted'>) => void;
  deleteBooking: (id: string) => void;
  toggleContacted: (id: string) => void;
  visitorStats: { total: number; byBranch: Record<string, number> };
  recordVisit: (branchId?: string) => void;
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const currentBranch = selectedBranch
    ? locationsData.find(l => l.id === selectedBranch) || null
    : null;
  const [trainers, setTrainers] = useState<Trainer[]>(trainersData);
  const [programs, setPrograms] = useState<Program[]>(programsData);
  const [bookings, setBookings] = useState<Booking[]>(bookingsData);
  const [visitorStats, setVisitorStats] = useState<{ total: number; byBranch: Record<string, number> }>({ total: 0, byBranch: { salem: 0, coonoor: 0, manjoor: 0 } });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev: boolean) => !prev);

  const addBooking = (data: Omit<Booking, 'id' | 'date' | 'status' | 'contacted'>) => {
    const newBooking: Booking = {
      ...data,
      id: `b${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      contacted: false,
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const toggleContacted = (id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, contacted: !b.contacted } : b))
    );
  };

  const recordVisit = (branchId?: string) => {
    setVisitorStats(prev => ({
      total: prev.total + 1,
      byBranch: branchId ? { ...prev.byBranch, [branchId]: (prev.byBranch[branchId] || 0) + 1 } : prev.byBranch
    }));
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        selectedLocation,
        setSelectedLocation,
        selectedBranch,
        setSelectedBranch,
        currentBranch,
        locations: locationsData,
        trainers,
        setTrainers,
        programs,
        setPrograms,
        testimonials: testimonialsData,
        bookings,
        setBookings,
        addBooking,
        deleteBooking,
        toggleContacted,
        visitorStats,
        recordVisit,
        bookingModalOpen,
        setBookingModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
