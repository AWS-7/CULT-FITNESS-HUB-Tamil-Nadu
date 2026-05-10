import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, LogOut, Flame, Menu, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u === 'admin' && p === 'admin') { onLogin(); }
    else setErr('Invalid credentials. Try admin / admin');
  };

  return (
    <div className="min-h-screen bg-bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0">
        <img src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=1" alt="" className="w-full h-full object-cover opacity-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-sm bg-card-grey rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow-orange">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-heading text-lg font-bold text-white"><span className="text-primary">CULT</span> FITNESS HUB</div>
            <div className="text-xs text-secondary-text">Visitor Stats</div>
          </div>
        </div>

        <h2 className="font-heading text-2xl text-white font-bold mb-1">Welcome Back</h2>
        <p className="text-secondary-text text-sm mb-6">Sign in to view visitor statistics</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Username</label>
            <input
              value={u}
              onChange={e => setU(e.target.value)}
              className="w-full bg-bg-black border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              value={p}
              onChange={e => setP(e.target.value)}
              className="w-full bg-bg-black border border-white/10 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              placeholder="••••••"
            />
          </div>
          {err && <p className="text-red-400 text-xs">{err}</p>}
          <button type="submit" className="btn-primary w-full py-3 mt-2">Sign In</button>
        </form>
        <p className="text-secondary-text text-xs text-center mt-4">Use: admin / admin</p>
      </motion.div>
    </div>
  );
}

export default function Admin() {
  const { locations, visitorStats } = useApp();
  const [authed, setAuthed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-bg-black flex">
      {/* Sidebar backdrop on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-card-grey border-r border-white/5 z-30 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-glow-orange">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-heading text-base font-bold text-white"><span className="text-primary">CULT</span> FITNESS HUB</div>
              <div className="text-xs text-secondary-text">Visitor Stats</div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="bg-bg-black/50 rounded-xl p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-heading font-bold text-white">{visitorStats.total}</div>
            <div className="text-secondary-text text-xs mt-1">Total Visitors</div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setAuthed(false)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <a
            href="/admin/dashboard"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-primary/10 hover:text-primary transition-all mt-1"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics Dashboard
          </a>
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all mt-1"
          >
            View Site
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-bg-black/90 backdrop-blur-xl border-b border-white/5 px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-heading text-xl font-bold text-white">Visitor Statistics</h1>
              <p className="text-secondary-text text-xs">CULT Fitness Hub Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Total Visitors Card */}
            <div className="bg-card-grey rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-white mb-2">{visitorStats.total}</h2>
                  <p className="text-secondary-text">Total Website Visitors</p>
                </div>
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Branch-wise Visitors */}
            <div className="bg-card-grey rounded-2xl p-6">
              <h3 className="font-heading text-xl text-white font-bold mb-6">Visitors by Branch</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {locations.map(loc => (
                  <div key={loc.id} className="bg-bg-black/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-heading font-bold text-primary mb-2">
                      {visitorStats.byBranch[loc.id] || 0}
                    </div>
                    <div className="text-white font-medium">{loc.name}</div>
                    <div className="text-secondary-text text-sm mt-1">Branch Visits</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

              </div>
  );
}
