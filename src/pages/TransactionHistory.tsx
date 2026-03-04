import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const { transactions, loading } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const filteredTransactions = transactions.filter(t =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const today = new Date().toISOString().split('T')[0];
    const spentToday = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(today))
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            navigate('/spending-analysis');
        }, 3000);
    };

    if (loading) {
        return (
            <div className="bg-background-dark text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Sincronizando Fluxo...</div>
            </div>
        );
    }

    return (
        <div className="bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
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
            {/* Analyzing Overlay */}
            {isAnalyzing && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-fade-in">
                    {/* Scanning Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#0FB67F] animate-scan z-50"></div>

                    <div className="relative w-48 h-48 mb-10">
                        {/* Rotating Rings */}
                        <div className="absolute inset-0 border-[1px] border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-[3px] border-primary border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-4 border-[1px] border-primary/40 border-b-transparent rounded-full animate-spin-slow"></div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-5xl animate-pulse">auto_awesome</span>
                        </div>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-display font-light text-text-value tracking-[0.2em] uppercase">Analisando Padrões</h2>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] text-primary font-bold tracking-[0.4em] uppercase opacity-70">Processamento Neural em curso</p>
                            <div className="w-48 h-[1px] bg-zinc-800 relative overflow-hidden rounded-full">
                                <div className="absolute inset-0 bg-primary animate-progress shadow-[0_0_10px_#0FB67F]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header / Subheader */}
            <div className="px-6 pt-2 pb-4 flex items-center justify-between relative z-10 mt-[80px]">
                <div className="flex items-center space-x-4">
                    <h1 className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-zinc-400">Evolução de Gastos</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleAnalyze}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-xl group hover:bg-primary/20 transition-all active:scale-95 shadow-[0_0_15px_rgba(15,182,127,0.1)]"
                    >
                        <span className="material-symbols-outlined text-primary text-sm group-hover:rotate-12 transition-transform">auto_awesome</span>
                        <span className="text-[9px] font-bold text-primary tracking-widest uppercase">Análise de gastos IA</span>
                    </button>
                    <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-400 text-[20px]">more_vert</span>
                    </button>
                </div>
            </div>

            <main className="flex-grow px-6 space-y-8 pb-12 pt-2">
                {/* Evolution Chart Section */}
                <section className="space-y-8">
                    <div className="flex items-end justify-between h-32 px-4 relative">
                        <div className="absolute inset-x-0 top-0 h-px bg-white/5"></div>
                        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5"></div>

                        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
                            <div key={day} className="flex flex-col items-center gap-4 h-full justify-end">
                                <div className={`w-[2px] rounded-full ${i === new Date().getDay() - 1 ? 'bg-primary neon-glow-sm h-full shadow-[0_0_10px_#0FB67F]' : 'bg-primary/20 h-[30%]'}`}></div>
                                <span className={`text-[8px] font-bold uppercase tracking-tighter ${i === new Date().getDay() - 1 ? 'text-primary' : 'text-zinc-600'}`}>{day}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Summary Card and Search */}
                <div className="space-y-4">
                    <div className="bg-transparent neon-border rounded-[28px] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700 mb-2">Total Gasto Hoje</p>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-4xl font-display font-bold text-text-value">R$ {spentToday.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                                </div>
                            </div>
                            <div className="flex items-end space-x-1 h-10">
                                <div className="w-1 bg-primary/20 h-3 rounded-full"></div>
                                <div className="w-1 bg-primary/40 h-6 rounded-full"></div>
                                <div className="w-1 bg-primary/60 h-4 rounded-full"></div>
                                <div className="w-1 bg-primary h-8 shadow-[0_0_10px_#0FB67F] rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div className="flex-grow flex items-center bg-transparent border border-white/10 rounded-xl px-4 py-3 transition-all focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(15,182,127,0.1)]">
                                <span className="material-symbols-outlined text-zinc-700 mr-3 text-[18px]">search</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-[13px] placeholder-zinc-800 w-full p-0 text-text-value font-medium"
                                    placeholder="Buscar no histórico..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <section className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-[9px] font-bold tracking-[0.3em] text-zinc-600 uppercase">Fluxo Analítico</h3>
                        </div>

                        <div className="space-y-3">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        onClick={() => navigate('/transaction-details', { state: { transaction } })}
                                        className="bg-transparent border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group hover:border-primary/20"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-11 h-11 rounded-xl border border-white/5 flex items-center justify-center bg-white/[0.02] group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
                                                <span className="material-symbols-outlined text-primary text-[22px]">
                                                    {transaction.type === 'income' ? 'payments' : 'shopping_bag'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-[14px] font-semibold text-text-value leading-tight">{transaction.description}</p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-[9px] text-zinc-600 font-bold tracking-wider uppercase">{transaction.category}</span>
                                                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-800"></span>
                                                    <span className="text-[9px] text-zinc-600 font-medium">
                                                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-[14px] font-bold font-display tracking-tight ${transaction.type === 'income' ? 'text-primary glow-text' : 'text-text-value'}`}>
                                                {transaction.type === 'expense' ? '-' : '+'} R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center bg-white/[0.01] rounded-[32px] border border-white/5 border-dashed">
                                    <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Nenhuma transação encontrada</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <div className="fixed bottom-32 right-6 z-[150] levitate-btn">
                <button
                    onClick={() => navigate('/new-transaction')}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
                >
                    <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
                </button>
            </div>

        </div>
    );
}
