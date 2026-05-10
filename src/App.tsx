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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Preloader onLoadingComplete={handleLoadingComplete} />
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<EntryPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/branch/:branchId" element={<BranchDetail />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </div>
    </>
  );
}
