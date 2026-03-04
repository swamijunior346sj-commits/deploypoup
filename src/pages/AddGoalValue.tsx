import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';

export default function AddGoalValue() {
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshData } = useData();
    const goal = location.state?.goal || { id: '', name: 'Reserva de Emergência', current_amount: 0, target_amount: 10000 };

    const [amount, setAmount] = useState('0');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const percentage = Math.round((goal.current_amount / (goal.target_amount || 1)) * 100);

    const handleConfirm = async () => {
        const numericAmount = parseFloat(amount.replace(/[^0-9,.-]+/g, "").replace(',', '.'));
        if (isNaN(numericAmount) || numericAmount <= 0) return;

        if (goal.id) {
            setLoading(true);
            try {
                const { error } = await supabase
                    .from('goals')
                    .update({ current_amount: goal.current_amount + numericAmount })
                    .eq('id', goal.id);

                if (error) throw error;

                await refreshData();
                setShowSuccess(true);
            } catch (error) {
                console.error('Error adding value to goal:', error);
                alert('Erro ao confirmar aporte.');
            } finally {
                setLoading(false);
            }
        } else {
            setShowSuccess(true);
        }
    };

    const handleQuickAdd = (value: number) => {
        const currentNumeric = parseFloat(amount.replace(/[^0-9,.-]+/g, "").replace(',', '.')) || 0;
        const newAmount = currentNumeric + value;
        setAmount(newAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            const numericValue = parseInt(value, 10) / 100;
            setAmount(numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        } else {
            setAmount('0,00');
        }
    };

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Alocação de Valor" showBack />

            <main className="flex-grow px-6 pt-12 pb-32 overflow-y-auto no-scrollbar relative z-10 space-y-16">

                {/* Numeric Entry Section */}
                <section className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Montante a Sincronizar</span>
                    <div className="flex items-baseline justify-center gap-2 group">
                        <span className="text-zinc-700 font-light text-3xl">R$</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={amount}
                            onChange={handleAmountChange}
                            className="bg-transparent border-none text-6xl font-display font-black text-white placeholder:text-zinc-950 p-0 outline-none focus:ring-0 text-center w-full tracking-tighter italic premium-text-glow"
                            placeholder="0,00"
                            autoFocus
                        />
                    </div>
                    <div className="mt-8 flex gap-3">
                        {[100, 500, 1000].map((val) => (
                            <motion.button
                                key={val}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuickAdd(val)}
                                className="px-6 py-3 rounded-2xl bg-zinc-950/40 border border-white/5 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all shadow-xl"
                            >
                                + R$ {val}
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Logistics Section */}
                <section className="space-y-6">
                    <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 border-white/5 flex items-center justify-between group cursor-pointer hover:bg-zinc-900/30 transition-all">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 relative overflow-hidden">
                                <span className="text-[12px] font-black text-primary relative z-10">{percentage}%</span>
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 bg-primary/10"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${percentage}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Direcionar para</h4>
                                <p className="text-sm font-black text-white italic truncate max-w-[150px]">{goal.name}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors">rocket_launch</span>
                    </div>

                    <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 border-white/5 flex items-center justify-between group cursor-pointer hover:bg-zinc-900/30 transition-all">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-zinc-400 text-2xl">account_balance_wallet</span>
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Origem do Protocolo</h4>
                                <p className="text-sm font-black text-white italic">Carteira Integrada</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-zinc-700">unfold_more</span>
                    </div>
                </section>

                {/* Protocol Execution Button */}
                <div className="pt-8">
                    <button
                        onClick={handleConfirm}
                        disabled={loading || amount === '0,00' || amount === '0'}
                        className={`w-full h-20 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || amount === '0,00' || amount === '0' ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                    >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            {loading ? 'SINCRONIZANDO...' : 'EXECUTAR APORTE'}
                            {!loading && <span className="material-symbols-outlined text-base">bolt</span>}
                        </div>
                        <motion.div
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-1/3 bg-white/40 skew-x-12 z-0"
                        />
                    </button>
                    <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em] text-center mt-10 italic opacity-60">"CADA APORTE É UM PASSO PARA O TOPO."</p>
                </div>
            </main>

            {/* ── Success Overlay ── */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-[600] flex flex-col items-center justify-center p-8">
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => navigate('/dashboard')}></div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full max-w-[320px] transparent-card-border rounded-[40px] p-12 flex flex-col items-center text-center shadow-[0_0_100px_rgba(15,182,127,0.1)]"
                        >
                            <span className="material-symbols-outlined text-primary text-6xl mb-8 animate-pulse italic">check_circle</span>
                            <h2 className="text-white font-black text-xl tracking-[0.2em] uppercase italic mb-12 text-balance leading-tight">Protocolo Concluído com Êxito</h2>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-5 rounded-2xl border-2 border-primary bg-transparent text-primary text-[10px] font-black uppercase tracking-[0.3em] active:bg-primary/20 transition-all hover:bg-primary/5 italic"
                            >
                                Finalizar
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
