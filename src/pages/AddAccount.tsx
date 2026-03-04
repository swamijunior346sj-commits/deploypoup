import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

export default function AddAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshData } = useData();
  const [balance, setBalance] = useState('');
  const [accountType, setAccountType] = useState('Conta Corrente');
  const [bank, setBank] = useState('Nubank');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const banks = [
    { name: 'Nubank', color: 'bg-purple-700', icon: 'NU' },
    { name: 'Banco Itaú', color: 'bg-orange-600', icon: 'IT' },
    { name: 'Santander', color: 'bg-red-600', icon: 'SA' },
    { name: 'Banco do Brasil', color: 'bg-blue-600', icon: 'BB' },
    { name: 'Inter', color: 'bg-orange-500', icon: 'IN' },
  ];

  const handleSave = async () => {
    if (!user || !balance || !bank) return;
    setLoading(true);
    try {
      const cleanBalance = balance.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
      const parsedBalance = parseFloat(cleanBalance);

      const { error } = await supabase.from('assets').insert([
        {
          user_id: user.id,
          name: bank,
          ticker: bank.substring(0, 4).toUpperCase(),
          type: accountType,
          institution: bank,
          current_value: parsedBalance,
          amount: 1,
          purchase_date: new Date().toISOString().split('T')[0],
        }
      ]);

      if (error) throw error;
      await refreshData();
      setShowSuccess(true);
    } catch (err) {
      console.error('Error saving account:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
      {/* ── Background Aura ── */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

      <Header showBack title="Configurar Ativo" />

      <main className="flex-grow px-8 pt-6 pb-32 space-y-12 relative z-10 overflow-y-auto no-scrollbar">

        {/* ── Balance Input Section ── */}
        <section className="py-10 text-center space-y-4">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em]">Aporte de Liquidez</span>
          <div className="flex items-center justify-center w-full">
            <span className="text-primary font-light text-2xl mr-2 italic">R$</span>
            <motion.input
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-transparent border-none text-6xl font-display font-black text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900 premium-text-glow tracking-tighter italic"
              placeholder="0,00"
              type="text"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              autoFocus
            />
          </div>
        </section>

        <div className="space-y-10">
          {/* ── Account Type Grid ── */}
          <div className="space-y-6">
            <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic ml-2">Natureza do Ativo</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'Conta Corrente', icon: 'account_balance_wallet', sub: 'Operacional' },
                { id: 'Conta Poupança', icon: 'savings', sub: 'Reserva' },
                { id: 'Carteira', icon: 'wallet', sub: 'Liquidez Imediata' },
                { id: 'Conta Investimento', icon: 'trending_up', sub: 'Multiplicação' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAccountType(type.id)}
                  className={`flex items-center gap-4 p-5 rounded-[2rem] border transition-all duration-500 text-left relative overflow-hidden group ${accountType === type.id ? 'bg-zinc-950 border-primary/30 shadow-[0_0_20px_rgba(15,182,127,0.1)]' : 'bg-transparent border-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:border-white/10'}`}
                >
                  <div className={`size-10 rounded-xl flex items-center justify-center transition-all ${accountType === type.id ? 'bg-primary/10 text-primary shadow-[0_0_10px_rgba(15,182,127,0.2)]' : 'bg-zinc-900 text-zinc-500'}`}>
                    <span className="material-symbols-outlined text-xl">{type.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-tight text-white uppercase italic">{type.id}</span>
                    <span className="text-[7px] font-bold text-zinc-600 uppercase tracking-widest">{type.sub}</span>
                  </div>
                  {accountType === type.id && (
                    <motion.div layoutId="active-bg" className="absolute inset-0 bg-primary/[0.02] z-[-1]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Bank Selection ── */}
          <div className="space-y-6">
            <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic ml-2">Instituição Emissora</label>
            <div className="grid grid-cols-1 gap-3">
              {banks.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBank(b.name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-3xl border transition-all duration-300 ${bank === b.name ? 'border-white/20 bg-zinc-950 shadow-2xl scale-[1.02]' : 'border-white/5 bg-zinc-900/10 hover:border-white/10'}`}
                >
                  <div className={`size-10 rounded-xl ${b.color} flex items-center justify-center text-[10px] font-black shadow-lg shadow-black/40`}>{b.icon}</div>
                  <span className={`text-sm tracking-tight font-black italic ${bank === b.name ? 'text-white' : 'text-zinc-600'}`}>{b.name}</span>
                  {bank === b.name && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                      <span className="material-symbols-outlined text-primary text-xl">verified</span>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Action Section ── */}
        <div className="pt-8">
          <button
            onClick={handleSave}
            disabled={loading || !balance}
            className={`w-full h-20 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || !balance ? 'opacity-50 pointer-events-none' : 'hover:bg-primary hover:shadow-[0_20px_60px_rgba(15,182,127,0.2)]'}`}
          >
            <span className="relative z-10">{loading ? 'SINCRONIZANDO...' : 'VINCULAR ATIVO'}</span>
            {!loading && balance && (
              <motion.div
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/4 bg-white/40 skew-x-12 z-0"
              />
            )}
          </button>
        </div>
      </main>

      <ActionPopup
        isOpen={showSuccess}
        title="ATIVO VINCULADO"
        description="Seu novo ativo estratégico foi integrado com sucesso ao ecossistema de elite."
        confirmText="VER MEUS ATIVOS"
        type="success"
        onConfirm={() => navigate('/accounts')}
        onCancel={() => setShowSuccess(false)}
      />
    </div>
  );
}
