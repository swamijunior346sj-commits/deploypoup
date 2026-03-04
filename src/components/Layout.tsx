import React, { useRef, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const navTabs = [
  { path: '/dashboard', label: 'Início', icon: 'grid_view' },
  { path: '/transactions', label: 'Transações', icon: 'receipt_long' },
  { path: '/analysis', label: 'Investimentos', icon: 'bar_chart' },
  { path: '/goals', label: 'Metas', icon: 'ads_click' },
  { path: '/shop', label: 'Loja', icon: 'storefront' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPathRef = useRef(location.pathname);

  const isLogin = location.pathname === '/' || location.pathname === '/signup';
  const isDashboard = location.pathname === '/dashboard';

  // Check if any tab matches current path
  const getTabIndex = (path: string) => {
    if (path === '/dashboard' || path.includes('/dashboard')) return 0;
    if (path.includes('/transaction')) return 1;
    if (path.includes('/analysis') || path.includes('/asset-details') || path.includes('/investment')) return 2;
    if (path.includes('/goal') || path.includes('/add-goal')) return 3;
    if (path.includes('/shop')) return 4;
    return -1;
  };

  const isTabActive = (tabPath: string) => {
    const idx = navTabs.findIndex(t => t.path === tabPath);
    return getTabIndex(location.pathname) === idx;
  };

  // Detect direction for carousel animation
  useEffect(() => {
    const prevIdx = getTabIndex(prevPathRef.current);
    const currIdx = getTabIndex(location.pathname);

    if (prevIdx !== currIdx && prevIdx >= 0 && currIdx >= 0) {
      setSlideDir(currIdx > prevIdx ? 'left' : 'right');
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setSlideDir(null);
      }, 350);
      prevPathRef.current = location.pathname;
      return () => clearTimeout(timer);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  if (isLogin) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-black text-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes slide-in-left {
          from { transform: translateX(60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(-60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .carousel-left {
          animation: slide-in-left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .carousel-right {
          animation: slide-in-right 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes nav-dot-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .nav-dot-active {
          animation: nav-dot-pulse 2s ease-in-out infinite;
        }

        /* Hide scrollbar functionality */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Mini Header (fixed at top) */}
      {!isDashboard && (
        <header className="fixed top-0 left-0 right-0 z-[55] bg-background-dark/80 backdrop-blur-xl px-6 pt-12 pb-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all overflow-hidden active:scale-90"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
          </button>

          <h1 className="text-[10px] font-display font-bold tracking-[0.4em] text-white uppercase ml-4">
            POUP
          </h1>

          <div className="w-10"></div>
        </header>
      )}

      {/* Main Content Area with Carousel Transition */}
      <main
        className={`flex-grow ${isDashboard ? 'pb-[120px]' : 'pt-[100px] pb-[120px]'} ${isAnimating && slideDir === 'left' ? 'carousel-left' :
            isAnimating && slideDir === 'right' ? 'carousel-right' : ''
          }`}
      >
        <Outlet />
        <div className="px-6 mb-8">
          <Footer />
        </div>
      </main>

      {/* ── PREMIUM FLOATING BOTTOM NAVIGATION ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-6 pt-3 px-4 pointer-events-none">
        {/* Glass background */}
        <div className="pointer-events-auto mx-auto max-w-md relative">
          {/* Glow behind the nav */}
          <div className="absolute -inset-2 bg-primary/[0.03] rounded-[40px] blur-2xl pointer-events-none"></div>

          <div className="relative flex items-center justify-between p-1.5 bg-zinc-950/70 backdrop-blur-3xl border border-white/[0.06] rounded-[28px] shadow-[0_-10px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]">
            {navTabs.map((tab) => {
              const active = isTabActive(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex flex-col items-center justify-center flex-1 py-2.5 rounded-[22px] transition-all duration-300 relative group
                    ${active ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {/* Active background pill */}
                  {active && (
                    <div className="absolute inset-1 bg-primary/[0.08] rounded-[18px] border border-primary/10"></div>
                  )}

                  <span className={`material-symbols-outlined relative z-10 transition-all duration-300 ${active ? 'text-[22px] scale-110' : 'text-[20px] group-hover:scale-105'}`}>
                    {tab.icon}
                  </span>
                  <span className={`text-[7px] font-black uppercase tracking-[0.12em] mt-1 relative z-10 transition-all ${active ? 'opacity-100 text-primary' : 'opacity-50'}`}>
                    {tab.label}
                  </span>

                  {/* Active indicator dot */}
                  {active && (
                    <div className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full nav-dot-active z-10"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
