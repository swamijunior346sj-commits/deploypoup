import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';

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
        if (isNaN(numericAmount) || numericAmount <= 0) {
            return;
        }

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
            // Modo de visualização/Fallback
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
        <div className="bg-background-dark font-display min-h-screen flex flex-col overflow-x-hidden justify-center text-off-white selection:bg-primary/30">
            {/* Main Content Container */}
            <div className={`flex flex-col w-full max-w-md mx-auto px-6 pt-12 transition-all duration-500 ${showSuccess ? 'blur-md opacity-40 pointer-events-none select-none' : ''}`}>

                {/* Header Navigation */}
                <div className="absolute top-6 left-6 z-50">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors active:scale-90">
                        <span className="material-symbols-outlined text-light-gray">arrow_back</span>
                    </button>
                </div>

                {/* Header */}
                <header className="text-center mb-12">
                    <h2 className="text-light-gray tracking-[0.2em] text-xs font-light leading-tight uppercase opacity-80">
                        Adicionar Valor
                    </h2>
                </header>

                {/* Amount Display */}
                <div className="text-center mb-16 relative w-full flex justify-center">
                    <div className="relative inline-flex items-center justify-center">
                        <span className="text-off-white text-5xl font-extralight tracking-tight mr-2">R$</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={amount}
                            onChange={handleAmountChange}
                            className="bg-transparent border-none text-off-white text-5xl font-extralight tracking-tight p-0 outline-none focus:ring-0 text-left w-auto min-w-[120px]"
                            style={{ width: `${Math.max(3, amount.length)}ch` }}
                            placeholder="0,00"
                        />
                    </div>
                </div>

                {/* Inputs & Selections */}
                <div className="space-y-4">
                    {/* Destination Goal Selection */}
                    <div className="bg-surface rounded-xl p-5 flex items-center justify-between thin-border group active:bg-surface/80 transition-colors cursor-pointer">
                        <div className="flex items-center gap-5">
                            {/* Circular Progress Indicator */}
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-full circular-progress">
                                <span className="text-[10px] font-medium text-primary">{percentage}%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-light-gray text-[10px] uppercase tracking-wider font-medium">Meta de Destino</span>
                                <span className="text-off-white text-base font-light">{goal.name}</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-light-gray/40 text-xl">chevron_right</span>
                    </div>

                    {/* Origin Account Selection */}
                    <div className="bg-surface rounded-xl p-5 flex items-center justify-between thin-border active:bg-surface/80 transition-colors cursor-pointer">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-full bg-background-dark flex items-center justify-center thin-border">
                                <span className="material-symbols-outlined text-primary font-light text-2xl">account_balance_wallet</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-light-gray text-[10px] uppercase tracking-wider font-medium">Conta de Origem</span>
                                <span className="text-off-white text-base font-light">Saldo: R$ 12.450,00</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-light-gray/40 text-xl">chevron_right</span>
                    </div>
                </div>

                {/* Quick Add Options */}
                <div className="flex gap-3 mt-10 justify-center">
                    <button
                        onClick={() => handleQuickAdd(100)}
                        className="bg-surface thin-border rounded-lg px-5 py-2.5 text-off-white text-sm font-light hover:border-primary/50 transition-colors active:scale-95"
                    >
                        + R$ 100
                    </button>
                    <button
                        onClick={() => handleQuickAdd(500)}
                        className="bg-surface thin-border rounded-lg px-5 py-2.5 text-off-white text-sm font-light hover:border-primary/50 transition-colors active:scale-95"
                    >
                        + R$ 500
                    </button>
                    <button
                        onClick={() => handleQuickAdd(1000)}
                        className="bg-surface thin-border rounded-lg px-5 py-2.5 text-off-white text-sm font-light hover:border-primary/50 transition-colors active:scale-95"
                    >
                        + R$ 1.000
                    </button>
                </div>

                {/* Bottom Action Button */}
                <div className="w-full max-w-md mx-auto pb-12 mt-12">
                    <button
                        onClick={handleConfirm}
                        disabled={loading || amount === '0,00' || amount === '0'}
                        className="w-full py-5 rounded-xl border border-primary/40 flex items-center justify-center gap-2 group hover:bg-primary/5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
                    >
                        <span className="text-primary tracking-[0.15em] text-xs font-semibold uppercase">
                            {loading ? 'Processando...' : 'Confirmar Aporte'}
                        </span>
                        {!loading && <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110] flex flex-col items-center justify-center p-8">
                    <div className="w-full max-w-[320px] glow-border border-primary rounded-[40px] bg-black/60 backdrop-blur-xl p-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="mb-8">
                            <span className="material-symbols-outlined text-primary text-[84px] font-light neon-text-glow leading-none">
                                check_circle
                            </span>
                        </div>
                        <h2 className="text-[#FCFCFC] font-display font-bold text-[18px] tracking-[0.2em] uppercase mb-12">
                            Aporte Confirmado!
                        </h2>
                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                navigate('/goals');
                            }}
                            className="w-full py-4 rounded-2xl border border-primary bg-transparent text-primary text-[14px] font-bold uppercase tracking-[0.3em] active:bg-primary/10 transition-all font-display"
                        >
                            Concluir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
