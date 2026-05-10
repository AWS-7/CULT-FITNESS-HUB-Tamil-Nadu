import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Preloader from './components/Preloader';
import EntryPage from './pages/EntryPage';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import BranchDetail from './pages/BranchDetail';
import GalleryPage from './pages/GalleryPage';

function AppContent() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const handleLoadingComplete = () => {
    setPreloaderComplete(true);
  };

  return (
    <>
      {/* Preloader - only show on initial load */}
      {!preloaderComplete && <Preloader onLoadingComplete={handleLoadingComplete} />}
      
      {/* Main Content - always interactive */}
      <div className={`transition-opacity duration-500 ${preloaderComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/branch/:branchId" element={<BranchDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
