import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
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
      const { error } = await supabase.from('assets').insert([
        {
          user_id: user.id,
          name: cardName,
          ticker: 'CARD',
          type: 'Cartão de Crédito',
          institution: 'Cartão Master',
          current_value: parseFloat(limit.replace(',', '.')),
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
    <div className="bg-black min-h-screen text-white">
      <Header showBack title="Adicionar Cartão" />

      <div className="px-8 space-y-8 pb-32 pt-6">
        <div className="relative h-56 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-8 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse"></div>
          <div className="flex justify-between items-start relative z-10 mb-12">
            <div className="w-14 h-11 bg-zinc-800/80 rounded-xl border border-zinc-700/50 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-yellow-500 text-3xl filled">grid_view</span>
            </div>
            <span className="material-symbols-outlined text-text-label text-4xl">contactless</span>
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-zinc-500 text-[9px] tracking-[0.3em] uppercase mb-2 font-bold opacity-60">Titular do Cartão</p>
              <p className="text-xl font-bold tracking-tight text-white uppercase drop-shadow-md">
                {cardName || 'NOME DO TITULAR'}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex gap-8">
                <div>
                  <p className="text-zinc-500 text-[8px] tracking-[0.3em] uppercase mb-1 font-bold opacity-60">Expira</p>
                  <p className="text-zinc-300 font-mono text-xs tracking-widest font-black">12/28</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-[8px] tracking-[0.3em] uppercase mb-1 font-bold opacity-60">Limite</p>
                  <p className="text-primary font-mono text-sm tracking-widest font-black">
                    R$ {parseFloat(limit.replace(',', '.')) ? parseFloat(limit.replace(',', '.')).toLocaleString('pt-BR') : '0.00'}
                  </p>
                </div>
              </div>
              <div className="flex -space-x-3 opacity-60">
                <div className="w-10 h-10 rounded-full bg-red-500/80 border border-white/5 shadow-xl"></div>
                <div className="w-10 h-10 rounded-full bg-orange-500/80 border border-white/5 -ml-4 shadow-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSave}>
          <div className="relative">
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Nome do Cartão</label>
            <div className="flex items-center gap-3 border-b border-white/10 focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-zinc-500">credit_card</span>
              <input
                className="bg-transparent w-full py-4 text-sm placeholder:text-zinc-800 text-white focus:outline-none"
                placeholder="Ex: Nubank Platinum"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>

          <div className="relative py-2">
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Limite Total</label>
            <div className="flex items-center gap-3 border-b border-white/10 focus-within:border-primary transition-all">
              <span className="text-primary font-bold text-2xl">R$</span>
              <input
                className="bg-transparent w-full py-4 text-2xl font-bold placeholder:text-zinc-900 text-white focus:outline-none"
                placeholder="0,00"
                type="text"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Fechamento</label>
              <div className="flex items-center gap-3 border-b border-white/10 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-zinc-500 text-xl">event_repeat</span>
                <input
                  className="bg-transparent w-full py-4 text-sm placeholder:text-zinc-800 text-white focus:outline-none"
                  max="31" min="1" placeholder="Dia 05"
                  type="number"
                  value={fechamento}
                  onChange={(e) => setFechamento(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Vencimento</label>
              <div className="flex items-center gap-3 border-b border-white/10 focus-within:border-primary transition-all">
                <span className="material-symbols-outlined text-zinc-500 text-xl">event_available</span>
                <input
                  className="bg-transparent w-full py-4 text-sm placeholder:text-zinc-800 text-white focus:outline-none"
                  max="31" min="1" placeholder="Dia 12"
                  type="number"
                  value={vencimento}
                  onChange={(e) => setVencimento(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              disabled={loading || !cardName || !limit}
              className="w-full bg-transparent border border-primary text-primary py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-transform shadow-lg shadow-primary/10 disabled:opacity-50"
              type="submit"
            >
              {loading ? 'Processando...' : 'SALVAR CARTÃO'}
            </button>
          </div>
        </form>
      </div>

      <ActionPopup
        isOpen={showSuccess}
        title="Cartão Adicionado"
        description="Seu cartão de crédito foi sincronizado com sucesso."
        confirmText="Ver Meus Cartões"
        type="success"
        onConfirm={() => navigate('/accounts')}
        onCancel={() => setShowSuccess(false)}
      />
    </div>
  );
}
