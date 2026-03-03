import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const { transactions, loading } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    const filteredTransactions = transactions.filter(t =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const today = new Date().toISOString().split('T')[0];
    const spentToday = transactions
        .filter(t => t.type === 'expense' && t.date.startsWith(today))
        .reduce((acc, t) => acc + Number(t.amount), 0);

    if (loading) {
        return (
            <div className="bg-background-dark text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Sincronizando Fluxo...</div>
            </div>
        );
    }

    return (
        <div className="bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30">
            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background-dark/95 backdrop-blur-xl z-50">
                <div className="flex items-center space-x-4">
                    <h1 className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-zinc-400">Evolução de Gastos</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-400 text-[20px]">more_vert</span>
                    </button>
                </div>
            </header>

            <main className="flex-grow px-6 space-y-8 pb-12 pt-2">
                {/* Evolution Chart Section (keeping visuals but making them slightly more reactive if possible, or just keeping it premium) */}
                <section className="space-y-8">
                    <div className="flex items-end justify-between h-32 px-4 relative">
                        <div className="absolute inset-x-0 top-0 h-px bg-white/5"></div>
                        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5"></div>

                        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
                            <div key={day} className="flex flex-col items-center gap-4 h-full justify-end">
                                <div className={`w-[2px] rounded-full ${i === new Date().getDay() - 1 ? 'bg-primary neon-glow-sm h-full' : 'bg-primary/20 h-[30%]'}`}></div>
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
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Total Gasto Hoje</p>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-3xl font-display font-bold text-text-main">R$ {spentToday.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                                </div>
                            </div>
                            <div className="flex items-end space-x-0.5 h-8">
                                <div className="w-0.5 bg-primary/20 h-2 rounded-full"></div>
                                <div className="w-0.5 bg-primary/30 h-4 rounded-full"></div>
                                <div className="w-0.5 bg-primary/40 h-3 rounded-full"></div>
                                <div className="w-0.5 bg-primary/60 h-6 rounded-full"></div>
                                <div className="w-0.5 bg-primary h-5 rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div className="flex-grow flex items-center bg-transparent border border-[#222426] rounded-xl px-4 py-2.5 transition-colors focus-within:border-primary/40">
                                <span className="material-symbols-outlined text-zinc-600 mr-3 text-[18px]">search</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-[13px] placeholder-zinc-700 w-full p-0 text-text-main"
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
                            <h3 className="text-[9px] font-bold tracking-[0.25em] text-zinc-600 uppercase">Fluxo Analítico</h3>
                        </div>

                        <div className="space-y-2">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        onClick={() => setSelectedTransaction(transaction)}
                                        className="bg-transparent neon-border rounded-2xl p-3.5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center bg-white/[0.02]">
                                                <span className="material-symbols-outlined text-primary text-[20px]">
                                                    {transaction.type === 'income' ? 'payments' : 'shopping_bag'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-[13px] font-medium text-text-main leading-tight">{transaction.description}</p>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="text-[9px] text-zinc-600 font-bold tracking-wider uppercase">{transaction.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                                                    <span className="text-[9px] text-zinc-600 font-medium">
                                                        {new Date(transaction.date).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-[13px] font-bold font-display tracking-tight ${transaction.type === 'income' ? 'text-primary' : 'text-text-main'}`}>
                                                {transaction.type === 'expense' ? '-' : '+'} R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center bg-white/[0.02] rounded-2xl border border-white/5">
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Nenhuma transação encontrada</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <footer className="pt-8 pb-12 flex justify-center">
                        <div className="w-12 h-1 bg-white/10 rounded-full"></div>
                    </footer>
                </div>
            </main>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate('/new-transaction')}
                className="fixed right-6 bottom-32 w-14 h-14 bg-primary text-black rounded-full shadow-2xl shadow-primary/20 flex items-center justify-center z-[70] active:scale-90 transition-all cursor-pointer"
            >
                <span className="material-symbols-outlined font-bold text-2xl">add</span>
            </button>

            {/* Transaction Details Popup */}
            {selectedTransaction && (
                <div className="fixed inset-0 z-[110] bg-black flex flex-col animate-in fade-in slide-in-from-bottom duration-300 overflow-y-auto hide-scrollbar">
                    {/* Header */}
                    <header className="px-6 pt-14 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-lg z-50">
                        <button
                            onClick={() => setSelectedTransaction(null)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-white text-[20px]">arrow_back_ios_new</span>
                        </button>
                        <h1 className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-zinc-500">Detalhes da Transação</h1>
                        <div className="w-10"></div>
                    </header>

                    <main className="flex-grow px-6 pt-4 pb-32 space-y-8">
                        {/* Transaction Main Card */}
                        <div className="neon-border rounded-[32px] bg-transparent p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-[32px] neon-glow-icon">
                                    {selectedTransaction.type === 'income' ? 'payments' : 'shopping_bag'}
                                </span>
                            </div>
                            <h2 className="text-4xl font-display font-bold tracking-tight text-text-main mb-2">R$ {Number(selectedTransaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                            <p className="text-lg font-medium text-text-secondary">{selectedTransaction.description}</p>

                            <div className="mt-8 pt-8 border-t border-white/5 w-full space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Data e Hora</span>
                                    <span className="text-[13px] text-text-main">{new Date(selectedTransaction.date).toLocaleString('pt-BR')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Método</span>
                                    <span className="text-[13px] text-text-main">{selectedTransaction.method || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Categoria</span>
                                    <span className="text-[13px] text-text-main">{selectedTransaction.category}</span>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Sticky Footer Actions */}
                    <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent pb-10">
                        <div className="flex space-x-4 max-w-md mx-auto">
                            <button
                                onClick={() => navigate('/edit-transaction', { state: { transaction: selectedTransaction } })}
                                className="flex-1 h-14 rounded-2xl border border-primary text-primary font-bold tracking-widest text-[12px] uppercase active:bg-primary/10 transition-all"
                            >
                                Editar
                            </button>
                            <button className="flex-1 h-14 rounded-2xl border border-zinc-700 text-zinc-500 font-bold tracking-widest text-[12px] uppercase active:bg-zinc-900 transition-all">
                                Excluir
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}
