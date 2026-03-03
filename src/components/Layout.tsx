import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const navTabs = [
  { path: '/dashboard', label: 'Início', icon: 'grid_view' },
  { path: '/transactions', label: 'Transações', icon: 'receipt_long' },
  { path: '/analysis', label: 'Análise', icon: 'bar_chart' },
  { path: '/goals', label: 'Metas', icon: 'ads_click' },
  { path: '/shop', label: 'Loja', icon: 'storefront' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/' || location.pathname === '/signup';
  const isDashboard = location.pathname === '/dashboard';

  if (isLogin) {
    return <Outlet />;
  }

  // Check if any tab matches current path
  const isTabActive = (tabPath: string) => {
    if (tabPath === '/dashboard') return location.pathname === '/dashboard';
    if (tabPath === '/transactions') return location.pathname.includes('/transaction');
    if (tabPath === '/analysis') return location.pathname.includes('/analysis') || location.pathname.includes('/asset-details') || location.pathname.includes('/investment');
    if (tabPath === '/goals') return location.pathname.includes('/goal') || location.pathname.includes('/add-goal');
    if (tabPath === '/reports') return location.pathname.includes('/report') || location.pathname.includes('/spending-analysis') || location.pathname.includes('/savings-simulator') || location.pathname.includes('/financial-performance');
    if (tabPath === '/shop') return location.pathname.includes('/shop');
    return location.pathname === tabPath;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-black text-white font-sans overflow-x-hidden">
      {/* Mini Header (fixed at top) */}
      {!isDashboard && (
        <header className="fixed top-0 left-0 right-0 z-[55] bg-background-dark/80 backdrop-blur-xl px-6 pt-12 pb-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-all bg-white/5 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-white text-xl">person</span>
          </button>

          <h1 className="text-[10px] font-display font-bold tracking-[0.4em] text-white uppercase ml-4">
            POUP
          </h1>

          <button
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 rounded-full flex items-center justify-center relative active:scale-90 transition-all bg-white/5 hover:bg-white/10"
          >
            <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-background-dark/40"></div>
            <span className="material-symbols-outlined text-white text-xl">notifications_active</span>
          </button>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-grow ${isDashboard ? 'pb-[120px]' : 'pt-[100px] pb-[120px]'}`}>
        <Outlet />
        <div className="px-6 mb-8">
          <Footer />
        </div>
      </main>

      {/* NEW PREMIUM FLOATING BOTTOM NAVIGATION */}
      <nav className="fixed bottom-8 left-6 right-6 z-[100] flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 p-2 bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
          {navTabs.map((tab) => {
            const active = isTabActive(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center justify-center min-w-[64px] h-14 rounded-[24px] transition-all duration-300 relative group
                  ${active ? 'bg-primary/20 text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <span className={`material-symbols-outlined transition-all duration-300 ${active ? 'text-xl filled scale-110 mb-0.5' : 'text-lg group-hover:scale-110'}`}>
                  {tab.icon}
                </span>
                <span className={`text-[8px] font-black uppercase tracking-widest mt-0.5 transition-all ${active ? 'opacity-100 text-primary' : 'opacity-70 text-zinc-500 group-hover:opacity-100'}`}>
                  {tab.label}
                </span>
                {active && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full animate-pulse-glow"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        /* Hide scrollbar functionality if needed elsewhere */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes aura-shine {
          0% { box-shadow: 0 0 10px rgba(15,182,127,0); }
          50% { box-shadow: 0 0 20px rgba(15,182,127,0.2); }
          100% { box-shadow: 0 0 10px rgba(15,182,127,0); }
        }
      `}</style>
    </div>
  );
}
