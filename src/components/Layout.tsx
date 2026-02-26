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
      <main className="flex-grow">
        <Outlet />
        <div className="px-6">
          <Footer />
        </div>
      </main>

      <div className="h-32"></div> {/* Spacer for bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/80 backdrop-blur-xl border-t border-zinc-900 px-8 py-4 pb-8 flex justify-between items-center z-50">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${location.pathname === '/dashboard' ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'}`}>home</span>
          {location.pathname === '/dashboard' && <div className="w-1 h-1 rounded-full bg-primary mt-1"></div>}
        </button>
        <button onClick={() => navigate('/missions')} className="flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/missions') || location.pathname.includes('/ranking') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'}`}>emoji_events</span>
          {(location.pathname.includes('/missions') || location.pathname.includes('/ranking')) && <div className="w-1 h-1 rounded-full bg-primary mt-1"></div>}
        </button>
        <button onClick={() => navigate('/analysis')} className="flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/analysis') || location.pathname.includes('/reports') || location.pathname.includes('/planning') || location.pathname.includes('/investments') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'}`}>analytics</span>
          {(location.pathname.includes('/analysis') || location.pathname.includes('/reports') || location.pathname.includes('/planning') || location.pathname.includes('/investments')) && <div className="w-1 h-1 rounded-full bg-primary mt-1"></div>}
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center group">
          <span className={`material-symbols-outlined transition-colors ${location.pathname.includes('/profile') || location.pathname.includes('/security') ? 'text-primary filled' : 'text-zinc-500 group-hover:text-primary'}`}>person</span>
          {(location.pathname.includes('/profile') || location.pathname.includes('/security')) && <div className="w-1 h-1 rounded-full bg-primary mt-1"></div>}
        </button>
      </nav>
    </div>
  );
}
