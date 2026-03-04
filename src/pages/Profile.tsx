import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { clearAllData } = useData();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-8">
      <Header showBack title="Perfil e Ajustes" />

      <div className="px-6 space-y-8">
        <div className="flex flex-col items-center mt-4 mb-10">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-transparent border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-4xl text-text-label">person</span>
            </div>
          </div>
          <h2 className="text-xl font-display font-bold mb-2 text-text-value">{user?.email?.split('@')[0] || 'Investidor'}</h2>
          <p className="text-[10px] text-text-label font-bold uppercase tracking-widest mb-4">{user?.email}</p>
          <button className="px-4 py-1.5 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-900 transition-colors">
            Editar Perfil
          </button>
        </div>

        <div className="space-y-1">
          <div onClick={() => navigate('/personal-data')} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">account_circle</span>
              <span className="text-sm font-medium text-text-value">Dados Pessoais</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>

          <div onClick={() => navigate('/budgets')} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              <span className="text-sm font-medium text-text-value">Orçamentos</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
          <div onClick={() => navigate('/security')} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="text-sm font-medium text-text-value">Segurança</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>

          <div onClick={() => navigate('/accounts')} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              <span className="text-sm font-medium text-text-value">Contas e Cartões</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>

          <div onClick={() => navigate('/my-orders')} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              <span className="text-sm font-medium text-text-value">Meus Pedidos</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>

          <div onClick={() => navigate('/categories')} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">category</span>
              <span className="text-sm font-medium text-text-value">Gerenciar Categorias</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">settings</span>
              <span className="text-sm font-medium text-text-value">Configurações do App</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <button onClick={handleSignOut} className="w-full py-4 flex items-center justify-center space-x-2 text-red-500 font-semibold bg-transparent rounded-2xl border border-red-500/20 active:bg-red-500/10 transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="text-sm">Sair da Conta</span>
          </button>

          <button
            onClick={async () => {
              if (window.confirm('TEM CERTEZA? Isso apagará permanentemente todos os seus dados no app e no banco de dados. Esta ação não pode ser desfeita.')) {
                await clearAllData();
                alert('Todos os dados foram resetados com sucesso.');
                navigate('/dashboard');
              }
            }}
            className="w-full py-4 flex flex-col items-center justify-center space-y-1 text-zinc-600 font-bold bg-transparent rounded-2xl border border-dashed border-zinc-800 hover:border-red-900/40 hover:text-red-900 transition-all active:scale-95"
          >
            <span className="text-[10px] uppercase tracking-widest">Zona de Perigo</span>
            <span className="text-[11px] uppercase tracking-[0.2em]">Limpar todos os dados</span>
          </button>
        </div>

      </div>
    </div>
  );
}
