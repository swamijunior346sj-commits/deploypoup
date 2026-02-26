import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
            <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-4xl text-zinc-600">person</span>
            </div>
          </div>
          <h2 className="text-xl font-display font-bold mb-2">{user?.email?.split('@')[0] || 'Investidor'}</h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">{user?.email}</p>
          <button className="px-4 py-1.5 border border-zinc-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-zinc-900 transition-colors">
            Editar Perfil
          </button>
        </div>

        <div className="space-y-1">
          <div onClick={() => navigate('/accounts')} className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
              <span className="text-sm font-medium text-zinc-300">Contas e Cartões</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">account_circle</span>
              <span className="text-sm font-medium text-zinc-300">Dados Pessoais</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">track_changes</span>
              <span className="text-sm font-medium text-zinc-300">Minhas Metas</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
          <div onClick={() => navigate('/security')} className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="text-sm font-medium text-zinc-300">Segurança</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">notifications</span>
              <span className="text-sm font-medium text-zinc-300">Notificações</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-zinc-900 group cursor-pointer">
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined text-primary">settings</span>
              <span className="text-sm font-medium text-zinc-300">Configurações do App</span>
            </div>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
          </div>
        </div>

        <div className="mt-12">
          <button onClick={handleSignOut} className="w-full py-4 flex items-center justify-center space-x-2 text-red-500 font-semibold bg-red-500/5 rounded-2xl border border-red-500/10 active:bg-red-500/10 transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
            <span className="text-sm">Sair da Conta</span>
          </button>
        </div>

      </div>
    </div>
  );
}
