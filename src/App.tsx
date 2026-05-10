import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import EntryPage from './pages/EntryPage';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import BranchDetail from './pages/BranchDetail';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/branch/:branchId" element={<BranchDetail />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
