import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

export default function AddCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshData } = useData();
  const [cardName, setCardName] = useState('');
  const [limit, setLimit] = useState('');
  const [fechamento, setFechamento] = useState('05');
  const [vencimento, setVencimento] = useState('12');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !cardName || !limit) return;
    setLoading(true);
    try {
      const cleanLimit = limit.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
      const parsedLimit = parseFloat(cleanLimit);

      const { error } = await supabase.from('assets').insert([
        {
          user_id: user.id,
          name: cardName,
          ticker: 'CARD',
          type: 'Cartão de Crédito',
          institution: 'Cartão Master',
          current_value: parsedLimit,
          amount: 1,
          purchase_date: new Date().toISOString().split('T')[0],
          notes: `Fechamento: ${fechamento}, Vencimento: ${vencimento}`
        }
      ]);

      if (error) throw error;
      await refreshData();
      setShowSuccess(true);
    } catch (err) {
      console.error('Error saving card:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
      {/* ── Background Aura ── */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

      <Header showBack title="Configurar Cartão" />

      <main className="flex-grow px-8 pt-6 pb-32 space-y-12 relative z-10 overflow-y-auto no-scrollbar">

        {/* ── Card Preview ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-60 rounded-[3rem] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-white/5 p-10 shadow-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[80px] animate-pulse"></div>

          <div className="flex justify-between items-start relative z-10 mb-14">
            <div className="w-16 h-12 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="w-full h-[1px] bg-black/20 absolute top-1/2 -translate-y-1/2"></div>
              <div className="h-full w-[1px] bg-black/20 absolute left-1/2 -translate-x-1/2"></div>
              <span className="material-symbols-outlined text-black/40 text-3xl">grid_view</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-4xl italic">contactless</span>
          </div>

          <div className="relative z-10 space-y-8">
            <div>
              <p className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.4em] mb-1 italic">Operador Designado</p>
              <p className="text-xl font-black tracking-tight text-white uppercase italic premium-text-glow">
                {cardName || 'IDENTIFICAÇÃO DO CARTÃO'}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.4em] italic">Limite de Crédito</p>
                <p className="text-primary font-display text-2xl tracking-tighter font-black italic">
                  <span className="text-xs font-light text-primary/50 mr-1 italic">R$</span>
                  {parseFloat(limit.replace(',', '.')) ? Number(limit.replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                </p>
              </div>
              <div className="flex -space-x-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <div className="w-12 h-12 rounded-full bg-red-600/80 border border-white/10 shadow-2xl backdrop-blur-md"></div>
                <div className="w-12 h-12 rounded-full bg-orange-500/80 border border-white/10 shadow-2xl backdrop-blur-md"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Form Section ── */}
        <form className="space-y-10" onSubmit={handleSave}>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase italic ml-2">Identificação do Ativo</label>
            <div className="flex items-center gap-4 bg-zinc-950/40 border border-white/5 rounded-3xl px-6 py-2 focus-within:border-primary/40 transition-all">
              <span className="material-symbols-outlined text-zinc-500 text-xl">credit_card</span>
              <input
                className="bg-transparent w-full py-4 text-sm font-bold placeholder:text-zinc-800 text-white focus:outline-none italic"
                placeholder="NOME DO CARTÃO (EX: NUBANK ULTRA)"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase italic ml-2">Teto de Crédito</label>
            <div className="flex items-center gap-4 bg-zinc-950/40 border border-white/5 rounded-3xl px-6 py-2 focus-within:border-primary/40 transition-all">
              <span className="text-primary font-light text-2xl italic tracking-tighter">R$</span>
              <input
                className="bg-transparent w-full py-4 text-3xl font-black placeholder:text-zinc-900 text-white focus:outline-none italic premium-text-glow"
                placeholder="0,00"
                type="text"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase italic ml-2">Fechamento</label>
              <div className="flex items-center gap-4 bg-zinc-950/40 border border-white/5 rounded-3xl px-6 py-2 focus-within:border-primary/40 transition-all">
                <span className="material-symbols-outlined text-zinc-500 text-xl">event_repeat</span>
                <input
                  className="bg-transparent w-full py-4 text-sm font-bold text-white focus:outline-none italic"
                  max="31" min="1" placeholder="DIA 05"
                  type="number"
                  value={fechamento}
                  onChange={(e) => setFechamento(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase italic ml-2">Vencimento</label>
              <div className="flex items-center gap-4 bg-zinc-950/40 border border-white/5 rounded-3xl px-6 py-2 focus-within:border-primary/40 transition-all">
                <span className="material-symbols-outlined text-zinc-500 text-xl">event_available</span>
                <input
                  className="bg-transparent w-full py-4 text-sm font-bold text-white focus:outline-none italic"
                  max="31" min="1" placeholder="DIA 12"
                  type="number"
                  value={vencimento}
                  onChange={(e) => setVencimento(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-10">
            <button
              disabled={loading || !cardName || !limit}
              className={`w-full h-20 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || !cardName || !limit ? 'opacity-50 pointer-events-none' : 'hover:bg-primary hover:shadow-[0_20px_60px_rgba(15,182,127,0.2)]'}`}
              type="submit"
            >
              <span className="relative z-10">{loading ? 'ALOCANDO CRÉDITO...' : 'SALVAR CARTÃO'}</span>
              {!loading && cardName && limit && (
                <motion.div
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-1/4 bg-white/40 skew-x-12 z-0"
                />
              )}
            </button>
          </div>
        </form>
      </main>

      <ActionPopup
        isOpen={showSuccess}
        title="CARTÃO SINCRONIZADO"
        description="Sua nova linha de crédito foi integrada com sucesso ao seu inventário estratégico."
        confirmText="VER MEUS CARTÕES"
        type="success"
        onConfirm={() => navigate('/accounts')}
        onCancel={() => setShowSuccess(false)}
      />
    </div>
  );
}
