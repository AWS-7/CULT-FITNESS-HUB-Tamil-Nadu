import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ParkingSection from '../components/ParkingSection';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Programs from '../components/Programs';
import Trainers from '../components/Trainers';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import BMICalculator from '../components/BMICalculator';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  const [searchParams] = useSearchParams();
  const { setSelectedBranch, setSelectedLocation, recordVisit, currentBranch } = useApp();
  const isCoonoor = currentBranch?.id === 'coonoor';

  useEffect(() => {
    const branch = searchParams.get('branch');
    setSelectedBranch(branch);
    if (branch) setSelectedLocation(branch);
    // Record visit - only once per session per branch
    const sessionKey = `visited_${branch || 'home'}_${Date.now()}`;
    if (!sessionStorage.getItem(sessionKey)) {
      recordVisit(branch || undefined);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, [searchParams, setSelectedBranch, setSelectedLocation, currentBranch]); // Remove recordVisit to prevent infinite loop

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Gallery />
        <Trainers />
        <Pricing />
        {isCoonoor && <ParkingSection />}
        <BMICalculator />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BookingModal />
      <WhatsAppButton />
    </>
  );
}
