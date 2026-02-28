import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === '/';

  if (isLogin) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-dark text-white font-sans">
      {/* Fixed Top Bar with Profile & Notifications */}
      <div className="fixed top-0 left-0 right-0 z-[55] bg-background-dark/90 backdrop-blur-xl border-b border-zinc-800">
        <div className="flex items-center justify-end px-6 pt-12 pb-3 gap-3">
          <button onClick={() => navigate('/notifications')} className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden relative active:scale-95 transition-all hover:bg-zinc-700">
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-zinc-800 z-10"></div>
            <span className="material-symbols-outlined text-white text-xl">notifications</span>
          </button>
          <button onClick={() => navigate('/profile')} className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden active:scale-95 transition-all hover:bg-zinc-700">
            <span className="material-symbols-outlined text-white text-xl">person</span>
          </button>
        </div>
      </div>

      <main className="flex-grow pt-[88px]">
        <Outlet />
        <div className="px-6">
          <Footer />
        </div>
      </main>

      <div className="h-32"></div> {/* Spacer for bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-zinc-900 px-8 py-4 pb-8 flex justify-between items-center z-50">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center justify-center group w-16">
          <span className={`material-symbols-outlined transition-colors ${location.pathname === '/dashboard' ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'} mb-0.5`}>home</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${location.pathname === '/dashboard' ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>Início</span>
        </button>
        <button onClick={() => navigate('/transactions')} className="flex flex-col items-center justify-center group w-16">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/transaction') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'} mb-0.5`}>account_balance_wallet</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${location.pathname.includes('/transaction') ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>Transações</span>
        </button>
        <button onClick={() => navigate('/missions')} className="flex flex-col items-center justify-center group w-16">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/missions') || location.pathname.includes('/ranking') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'} mb-0.5`}>emoji_events</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${location.pathname.includes('/missions') || location.pathname.includes('/ranking') ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>Missões</span>
        </button>
        <button onClick={() => navigate('/investment-portfolio')} className="flex flex-col items-center justify-center group w-16">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/investment-portfolio') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'} mb-0.5`}>account_balance_wallet</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${location.pathname.includes('/investment-portfolio') ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>Carteira</span>
        </button>
        <button onClick={() => navigate('/reports')} className="flex flex-col items-center justify-center group w-16">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/analysis') || location.pathname.includes('/reports') || location.pathname.includes('/planning') || location.pathname.includes('/investments') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'} mb-0.5`}>analytics</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${location.pathname.includes('/analysis') || location.pathname.includes('/reports') || location.pathname.includes('/planning') || location.pathname.includes('/investments') ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>Relatórios</span>
        </button>
        <button onClick={() => navigate('/compound-interest')} className="flex flex-col items-center justify-center group w-16">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/compound-interest') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'} mb-0.5`}>calculate</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${location.pathname.includes('/compound-interest') ? 'text-primary' : 'text-zinc-500 group-hover:text-primary'}`}>Simulador</span>
        </button>
      </nav>
    </div>
  );
}
