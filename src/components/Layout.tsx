import React, { useState, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const navTabs = [
  { path: '/dashboard', label: 'Início', icon: 'grid_view' },
  { path: '/transactions', label: 'Transações', icon: 'swap_vert' },
  { path: '/investments', label: 'Carteira', icon: 'account_balance_wallet' },
  { path: '/missions', label: 'Missões', icon: 'ads_click' },
  { path: '/shop', label: 'Shop', icon: 'workspace_premium' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastIndex, setLastIndex] = useState(0);

  const getTabIndex = (path: string) => {
    if (path.includes('/dashboard')) return 0;
    if (path.includes('/transaction')) return 1;
    if (path.includes('/investment') || path.includes('/asset-details')) return 2;
    if (path.includes('/mission')) return 3;
    if (path.includes('/shop')) return 4;
    return -1;
  };

  const currentIndex = useMemo(() => getTabIndex(location.pathname), [location.pathname]);
  const direction = currentIndex >= lastIndex ? 1 : -1;

  const isLogin = location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/onboarding';
  const isShopFlow = location.pathname === '/cart' ||
    location.pathname === '/checkout' ||
    location.pathname === '/payment' ||
    location.pathname === '/upsell' ||
    location.pathname === '/downsell' ||
    location.pathname.includes('/product-details') ||
    location.pathname.includes('/ebook/') ||
    location.pathname.includes('/course/') ||
    location.pathname.includes('/mentorship/');

  const hideNav = isLogin || isShopFlow;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  const handleNav = (path: string, index: number) => {
    setLastIndex(currentIndex);
    navigate(path);
  };

  if (isLogin) return <Outlet />;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
      <style>{`
        .glass-nav {
            background: rgba(10, 10, 10, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .nav-active-glow {
            box-shadow: 0 0 20px rgba(15, 182, 127, 0.15);
        }
      `}</style>

      {/* ── Main Content Area with Motion Carousel ── */}
      <main className={`flex-grow flex flex-col relative ${hideNav ? 'pb-0' : 'pb-[100px]'}`}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={location.pathname}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="flex-grow w-full h-full flex flex-col pt-4"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── PREMIUM BOTTOM NAVIGATION ── */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-[200] pb-8 pt-2 glass-nav px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <div className="mx-auto max-w-lg flex items-center justify-between relative h-14">
            {navTabs.map((tab, idx) => {
              const active = currentIndex === idx;
              return (
                <button
                  key={tab.path}
                  onClick={() => handleNav(tab.path, idx)}
                  className={`relative flex flex-col items-center justify-center flex-1 transition-all duration-300 isolate pt-1 h-full
                  ${active ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}
                >
                  {/* Active Indicator Backdrop */}
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-y-1 inset-x-1 bg-white/[0.03] rounded-2xl -z-10 border border-white/[0.05] nav-active-glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <span className={`material-symbols-outlined transition-all duration-300 ${active ? 'text-[24px] mb-0' : 'text-[22px] mb-1'}`}>
                    {tab.icon}
                  </span>

                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-75 h-0 overflow-hidden'}`}>
                    {tab.label}
                  </span>

                  {/* Animated Dot */}
                  {active && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#0FB67F]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
