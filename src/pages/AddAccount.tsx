import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
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
      const { error } = await supabase.from('assets').insert([
        {
          user_id: user.id,
          name: bank,
          ticker: bank.substring(0, 4).toUpperCase(),
          type: accountType,
          institution: bank,
          current_value: parseFloat(balance.replace(',', '.')),
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
    <div className="bg-black min-h-screen text-white">
      <Header showBack title="Adicionar Conta" />

      <div className="px-8 space-y-8 pb-32">
        <section className="py-8 text-center">
          <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-2">Saldo Inicial</label>
          <div className="flex items-center justify-center gap-2">
            <span className="text-primary font-bold text-2xl mt-1">R$</span>
            <input
              className="bg-transparent border-none text-5xl font-bold text-primary placeholder:text-zinc-900 focus:ring-0 w-full max-w-[240px] text-center"
              placeholder="0,00"
              type="text"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-4">Tipo de Conta</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'Conta Corrente', icon: 'account_balance' },
                { id: 'Conta Poupança', icon: 'savings' },
                { id: 'Carteira', icon: 'account_balance_wallet' },
                { id: 'Conta Investimento', icon: 'trending_up' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAccountType(type.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95 ${accountType === type.id ? 'bg-primary/5 border-primary text-primary' : 'bg-transparent border-white/10 text-zinc-500'
                    }`}
                >
                  <span className="material-symbols-outlined mb-2 text-2xl">{type.icon}</span>
                  <span className="text-[10px] font-bold tracking-tight uppercase">{type.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-4">Instituição Financeira</label>
            <div className="space-y-2">
              {banks.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBank(b.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all ${bank === b.name ? 'border-primary/50 bg-primary/5' : 'border-white/5 bg-zinc-900/30'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${b.color} flex items-center justify-center text-[10px] font-bold`}>{b.icon}</div>
                  <span className="text-sm font-medium text-zinc-300">{b.name}</span>
                  {bank === b.name && <span className="material-symbols-outlined ml-auto text-primary text-sm font-bold">check_circle</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleSave}
              disabled={loading || !balance}
              className="w-full bg-transparent border border-primary text-primary py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'SALVAR CONTA'}
            </button>
          </div>
        </section>
      </div>

      <ActionPopup
        isOpen={showSuccess}
        title="Conta Adicionada"
        description="Sua nova conta foi vinculada com sucesso ao seu patrimônio."
        confirmText="Ver Minhas Contas"
        type="success"
        onConfirm={() => navigate('/accounts')}
        onCancel={() => setShowSuccess(false)}
      />
    </div>
  );
}
