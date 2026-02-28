import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const navTabs = [
  { path: '/dashboard', label: 'INÍCIO' },
  { path: '/transactions', label: 'TRANSAÇÕES' },
  { path: '/investment-portfolio', label: 'CARTEIRA' },
  { path: '/reports', label: 'RELATÓRIOS' },
  { path: '/missions', label: 'MISSÕES' },
  { path: '/compound-interest', label: 'SIMULADOR' },
];

const pageTitles: Record<string, string> = {
  '/dashboard': 'POUP',
  '/transactions': 'POUP',
  '/transaction-details': 'POUP',
  '/new-transaction': 'POUP',
  '/missions': 'POUP',
  '/ranking': 'POUP',
  '/investment-portfolio': 'POUP',
  '/new-investment': 'POUP',
  '/asset-details': 'POUP',
  '/reports': 'POUP',
  '/compound-interest': 'POUP',
  '/savings-simulator': 'POUP',
  '/spending-analysis': 'POUP',
  '/budgets': 'POUP',
  '/new-budget': 'POUP',
  '/budget-details': 'POUP',
  '/accounts': 'POUP',
  '/profile': 'POUP',
  '/personal-data': 'POUP',
  '/categories': 'POUP',
  '/notifications': 'POUP',
  '/financial-performance': 'POUP',
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/' || location.pathname === '/signup';

  if (isLogin) {
    return <Outlet />;
  }

  const pageTitle = pageTitles[location.pathname] || 'POUP';

  // Check if any tab matches current path
  const isTabActive = (tabPath: string) => {
    if (tabPath === '/dashboard') return location.pathname === '/dashboard';
    if (tabPath === '/transactions') return location.pathname.includes('/transaction');
    if (tabPath === '/investment-portfolio') return location.pathname.includes('/investment') || location.pathname.includes('/asset');
    if (tabPath === '/reports') return location.pathname.includes('/report') || location.pathname.includes('/spending-analysis') || location.pathname.includes('/savings-simulator');
    if (tabPath === '/missions') return location.pathname.includes('/mission') || location.pathname.includes('/ranking');
    if (tabPath === '/compound-interest') return location.pathname.includes('/compound');
    return location.pathname === tabPath;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white font-sans">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-[55] bg-background-dark/90 backdrop-blur-xl border-b border-zinc-800">
        {/* Top Row: Menu + Title + Notifications */}
        <div className="flex items-center justify-between px-6 pt-12 pb-3">
          <button
            onClick={() => navigate('/profile')}
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-all hover:bg-zinc-800/50"
          >
            <span className="material-symbols-outlined text-white text-2xl">menu</span>
          </button>

          <h1 className="text-[10px] font-display font-bold tracking-[0.4em] text-white uppercase">
            {pageTitle}
          </h1>

          <button
            onClick={() => navigate('/notifications')}
            className="w-11 h-11 rounded-full flex items-center justify-center relative active:scale-95 transition-all hover:bg-zinc-800/50"
          >
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background-dark z-10"></div>
            <span className="material-symbols-outlined text-white text-2xl">notifications</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-1">
          {navTabs.map((tab) => {
            const active = isTabActive(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`whitespace-nowrap pb-3 px-3 text-[10px] font-bold tracking-widest transition-colors ${active
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-zinc-500'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <main className="flex-grow pt-[120px]">
        <Outlet />
        <div className="px-6">
          <Footer />
        </div>
      </main>

      <div className="h-8"></div>
    </div>
  );
}
