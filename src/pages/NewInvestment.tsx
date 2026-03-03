import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function NewInvestment() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState('0,00');
    const [name, setName] = useState('');
    const [type, setType] = useState('Renda Fixa');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [rate, setRate] = useState('');

    const handleSave = async () => {
        if (!user || !amount || !name) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('assets').insert([
                {
                    user_id: user.id,
                    name,
                    type,
                    value: parseFloat(amount.replace(',', '.')),
                    purchase_date: date,
                    estimated_yield: parseFloat(rate) || 0,
                    change_24h: 0, // Default for new assets
                }
            ]);

            if (error) throw error;
            navigate('/analysis');
        } catch (error) {
            console.error('Error saving investment:', error);
            alert('Erro ao salvar investimento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-sm font-display font-bold tracking-[0.25em] text-white uppercase flex-1 text-center pr-8">
                    NOVO INVESTIMENTO
                </h1>
            </header>

            <main className="flex-1 px-6 pb-32">
                {/* Value Input */}
                <div className="mt-8 mb-10 text-center">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2 block">VALOR APLICADO</label>
                    <div className="flex justify-center items-center">
                        <span className="text-primary text-4xl font-display font-bold mr-2" style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}>R$</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-primary text-5xl font-display font-bold text-center p-0 w-48 outline-none"
                            style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Nome do Ativo</label>
                            <input
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                placeholder="Ex: Bitcoin, Tesouro Direto"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Tipo de Ativo</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option>Renda Fixa</option>
                                    <option>Renda Variável</option>
                                    <option>FIIs</option>
                                    <option>Cripto</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Data da Compra</label>
                            <input
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none [color-scheme:dark]"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Rentabilidade Estimada (%)</label>
                            <input
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                placeholder="0.00%"
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-10">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full bg-primary text-black font-display font-bold py-5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all tracking-widest uppercase text-sm disabled:opacity-50"
                        style={{ boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)' }}
                    >
                        {loading ? 'SALVANDO...' : 'SALVAR INVESTIMENTO'}
                    </button>
                </div>
            </main>
        </div>
    );
}
