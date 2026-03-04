import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
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

  const totalLiquidity = useMemo(() =>
    accounts.reduce((acc, a) => acc + (a.current_value || 0), 0),
    [accounts]
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
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">Sincronizando Ativos...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col selection:bg-primary/30 relative overflow-hidden">
      {/* ── Background Aura ── */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

      <Header showBack title="Contas e Cartões" />

      <main className="flex-grow px-6 pt-6 pb-40 space-y-12 relative z-10 overflow-y-auto no-scrollbar">

        {/* ── Liquidity Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="transparent-card-border rounded-[3rem] p-10 bg-zinc-950/20 border-white/5 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Patrimônio Líquido</span>
              <div className="size-10 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined text-primary text-xl">account_balance_wallet</span>
              </div>
            </div>
            <h2 className="text-4xl font-black text-white italic tracking-tighter premium-text-glow">
              <span className="text-xl font-light text-zinc-500 mr-2">R$</span>
              {totalLiquidity.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#0FB67F]"></div>
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none">Status: Ecossistema Fluido</span>
            </div>
          </div>
        </motion.section>

        {/* ── Accounts Section ── */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Fontes de Liquidez</h3>
            <span className="text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-full">{accounts.length} ATIVOS</span>
          </div>

          <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-6 px-6 py-4">
            {accounts.length > 0 ? (
              accounts.map((asset, idx) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => navigate(`/asset-details/${asset.id}`)}
                  className="min-w-[220px] transparent-card-border rounded-[2.5rem] p-8 bg-zinc-950/40 border-white/5 relative group cursor-pointer hover:bg-zinc-900/40 transition-all active:scale-95"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${idx % 2 === 0 ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-blue-500/5 border-blue-500/20 text-blue-500'}`}>
                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                      </div>
                      <button
                        onClick={(e) => openDeleteConfirm(e, asset.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-red-500 transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2 line-clamp-1">{asset.name}</p>
                      <p className="text-xl font-black text-white italic tracking-tighter">
                        <span className="text-sm font-light text-zinc-600 mr-1">R$</span>
                        {Number(asset.current_value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div
                onClick={() => navigate('/add-account')}
                className="w-full h-40 border border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 bg-zinc-950/20 cursor-pointer hover:border-primary/40 transition-colors group"
              >
                <span className="material-symbols-outlined text-zinc-800 text-4xl group-hover:text-primary transition-colors">add_card</span>
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em]">Conectar nova fonte</span>
              </div>
            )}
          </div>
        </section>

        {/* ── Credit Cards Section ── */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Linhas de Crédito</h3>
            <button
              onClick={() => navigate('/add-card')}
              className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:brightness-125 transition-all"
            >
              <span className="material-symbols-outlined text-sm">add_circle</span>
              Novo Cartão
            </button>
          </div>

          <div className="space-y-4">
            {cards.length > 0 ? (
              cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  onClick={() => navigate(`/asset-details/${card.id}`)}
                  className="transparent-card-border rounded-[2.5rem] p-6 bg-gradient-to-r from-zinc-950 to-zinc-900 border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-2 left-2 w-4 h-3 bg-zinc-700/50 rounded-sm"></div> {/* Simulated Chip */}
                      <span className="material-symbols-outlined text-zinc-500 opacity-20 text-3xl absolute -right-2 -bottom-2">credit_card</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white italic tracking-tight">{card.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Limite Alocado:</span>
                        <span className="text-[9px] font-bold text-primary">R$ {Number(card.current_value || 0).toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-[1px] bg-white/5"></div>
                    <button
                      onClick={(e) => openDeleteConfirm(e, card.id)}
                      className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-700 hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center transparent-card-border rounded-[2.5rem] bg-zinc-950/20 border-white/5">
                <span className="material-symbols-outlined text-zinc-800 text-4xl mb-3">credit_card_off</span>
                <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest">Nenhum cartão no inventário</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── Standardized FAB ── */}
      <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/add-account')}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] relative group"
        >
          <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
        </motion.button>
      </div>

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

      <ActionPopup
        isOpen={showDeleteConfirm}
        title="REMOVER ATIVO?"
        description="Esta operação removerá permanentemente o ativo do seu ecossistema financeiro."
        confirmText="REMOVER AGORA"
        type="delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <ActionPopup
        isOpen={showDeleteSuccess}
        title="DESCONECTADO"
        description="O ativo foi removido com sucesso da sua base tática."
        confirmText="OK"
        type="success"
        onConfirm={() => setShowDeleteSuccess(false)}
        onCancel={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
}
