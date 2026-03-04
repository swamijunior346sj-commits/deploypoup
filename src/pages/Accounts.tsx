import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';
import { supabase } from '../lib/supabase';
import ActionPopup from '../components/ActionPopup';

export default function Accounts() {
  const navigate = useNavigate();
  const { assets, loading, refreshData } = useData();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const accounts = useMemo(() =>
    assets.filter(a => a.type?.toLowerCase().includes('conta') || a.type?.toLowerCase().includes('carteira')),
    [assets]
  );

  const cards = useMemo(() =>
    assets.filter(a => a.type?.toLowerCase().includes('cartão') || a.type?.toLowerCase().includes('card')),
    [assets]
  );

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const { error } = await supabase.from('assets').delete().eq('id', deletingId);
      if (error) throw error;
      await refreshData();
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
    } catch (err) {
      console.error('Error deleting asset:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const openDeleteConfirm = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    setShowDeleteConfirm(true);
  };

  if (loading) {
    return (
      <div className="bg-black text-primary min-h-screen flex items-center justify-center font-display">
        <div className="animate-pulse tracking-[0.3em] uppercase font-bold text-xs font-sans">Sincronizando Ativos...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white space-y-6 pb-40">
      <style>{`
        @keyframes levitate {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .levitate-btn {
          animation: levitate 3s ease-in-out infinite;
        }
      `}</style>
      <Header
        showBack
        title="Contas e Cartões"
      />

      <div className="px-6 space-y-10">
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Minhas Contas</h3>
            <span className="text-[10px] text-primary font-bold">{accounts.length} ATIVAS</span>
          </div>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-6 px-6 py-2">
            {accounts.length > 0 ? (
              accounts.map((asset) => (
                <div key={asset.id} className="relative group min-w-[180px]">
                  <Card
                    onClick={() => navigate(`/asset-details/${asset.id}`)}
                    className="rounded-[2rem] p-5 flex flex-col space-y-6 cursor-pointer hover:border-primary/50 transition-all bg-zinc-900/40 border-white/5"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
                      </div>
                      <button
                        onClick={(e) => openDeleteConfirm(e, asset.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-500/50 hover:text-red-500 transition-all font-bold"
                      >
                        EXCLUIR
                      </button>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest truncate mb-1">{asset.name}</p>
                      <p className="text-lg font-black font-display text-white">
                        R$ {Number(asset.current_value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div className="w-full py-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-zinc-900/20">
                <span className="material-symbols-outlined text-zinc-800 text-4xl mb-2">account_balance_wallet</span>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black">Nenhuma conta vinculada</p>
                <button onClick={() => navigate('/add-account')} className="mt-4 text-[10px] text-primary font-black uppercase tracking-[0.2em] px-4 py-2 border border-primary/20 rounded-full">Vincular Agora</button>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Cartões de Crédito</h3>
            <button onClick={() => navigate('/add-card')} className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Novo Cartão
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {cards.length > 0 ? (
              cards.map(card => (
                <div key={card.id} className="relative group">
                  <div
                    onClick={() => navigate(`/asset-details/${card.id}`)}
                    className="bg-gradient-to-r from-zinc-900 to-black border border-white/5 rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-500 text-2xl">credit_card</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{card.name}</h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Limite: R$ {Number(card.current_value || 0).toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => openDeleteConfirm(e, card.id)}
                      className="material-symbols-outlined text-zinc-800 hover:text-red-500 transition-colors"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center border border-dashed border-white/10 rounded-[2rem] bg-zinc-900/20">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Nenhum cartão registrado</p>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Controle de Gastos</h3>
          <Card className="rounded-[2.5rem] p-8 border-white/5 bg-zinc-900/20 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Saldo Disponível Total</p>
                <p className="text-2xl font-black text-white">R$ {accounts.reduce((acc, a) => acc + (a.current_value || 0), 0).toLocaleString('pt-BR')}</p>
              </div>
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">account_balance_wallet</span>
              </div>
            </div>
            <div className="h-[1px] w-full bg-white/5"></div>
            <p className="text-[9px] text-zinc-600 leading-relaxed italic">Este valor representa a soma de todas as suas contas correntes e carteiras ativas.</p>
          </Card>
        </section>
      </div>

      <div className="fixed bottom-32 right-6 z-[150] levitate-btn">
        <button
          onClick={() => navigate('/add-account')}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
        >
          <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
        </button>
      </div>

      <ActionPopup
        isOpen={showDeleteConfirm}
        title="Excluir Ativo?"
        description="Você deseja remover esta conta ou cartão permanentemente do seu patrimônio?"
        confirmText="Excluir agora"
        type="delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <ActionPopup
        isOpen={showDeleteSuccess}
        title="Removido!"
        description="O ativo foi excluído com sucesso da sua lista."
        confirmText="OK"
        type="success"
        onConfirm={() => setShowDeleteSuccess(false)}
        onCancel={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
}
