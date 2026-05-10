import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import GalleryComponent from '../components/Gallery';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Gallery() {
  const [searchParams] = useSearchParams();
  const { setSelectedBranch, setSelectedLocation, recordVisit } = useApp();

  useEffect(() => {
    const branch = searchParams.get('branch');
    setSelectedBranch(branch);
    if (branch) setSelectedLocation(branch);
    // Record visit - only once per session per branch
    const sessionKey = `visited_gallery_${branch || 'home'}_${Date.now()}`;
    if (!sessionStorage.getItem(sessionKey)) {
      recordVisit(branch || undefined);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, [searchParams, setSelectedBranch, setSelectedLocation]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <GalleryComponent />
      </main>
      <Footer />
      <BookingModal />
      <WhatsAppButton />
    </>
  );
}
