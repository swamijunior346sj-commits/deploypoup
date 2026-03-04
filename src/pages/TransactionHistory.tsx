import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const { transactions, loading } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
    const [showWallet, setShowWallet] = useState(false);
    const [showFabCockpit, setShowFabCockpit] = useState(false);

    const activeTransactions = useMemo(() => transactions.filter(t => t.status !== 'anulada'), [transactions]);

    // ── Date filtering ──
    const filteredByDate = useMemo(() => {
        const now = new Date();
        let cutoff = new Date(0);
        if (dateFilter === '7d') cutoff = new Date(now.getTime() - 7 * 86400000);
        if (dateFilter === '30d') cutoff = new Date(now.getTime() - 30 * 86400000);
        if (dateFilter === '90d') cutoff = new Date(now.getTime() - 90 * 86400000);
        return transactions.filter(t => new Date(t.date) >= cutoff);
    }, [transactions, dateFilter]);

    const filteredTransactions = useMemo(() => {
        if (!searchQuery) return filteredByDate;
        const q = searchQuery.toLowerCase();
        return filteredByDate.filter(t =>
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
        );
    }, [filteredByDate, searchQuery]);

    // ── KPIs ──
    const today = new Date().toISOString().split('T')[0];
    const spentToday = activeTransactions
        .filter(t => t.type === 'expense' && t.date?.startsWith(today))
        .reduce((acc, t) => acc + Number(t.amount), 0);
    const earnedToday = activeTransactions
        .filter(t => t.type === 'income' && t.date?.startsWith(today))
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const totalExpenses = filteredByDate
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + Number(t.amount), 0);
    const totalIncome = filteredByDate
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + Number(t.amount), 0);

    // ── Wallet Summary ──
    const walletData = useMemo(() => {
        const allIncome = activeTransactions
            .filter(t => t.type === 'income')
            .reduce((a, t) => a + Number(t.amount), 0);
        const allExpense = activeTransactions
            .filter(t => t.type === 'expense')
            .reduce((a, t) => a + Number(t.amount), 0);
        const balance = allIncome - allExpense;
        const totalTransactions = activeTransactions.length;
        const thisMonth = new Date().getMonth();
        const monthExpenses = activeTransactions
            .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === thisMonth)
            .reduce((a, t) => a + Number(t.amount), 0);
        const monthIncome = activeTransactions
            .filter(t => t.type === 'income' && new Date(t.date).getMonth() === thisMonth)
            .reduce((a, t) => a + Number(t.amount), 0);
        return { allIncome, allExpense, balance, totalTransactions, monthExpenses, monthIncome };
    }, [activeTransactions]);

    // ── Period comparison ──
    const periodComparison = useMemo(() => {
        const now = new Date();
        let days = 30;
        if (dateFilter === '7d') days = 7;
        if (dateFilter === '90d') days = 90;
        if (dateFilter === 'all') days = 30;
        const midpoint = new Date(now.getTime() - days * 86400000);
        const start = new Date(midpoint.getTime() - days * 86400000);

        const currentExpenses = activeTransactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const previousExpenses = activeTransactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= start && new Date(t.date) < midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const currentIncome = activeTransactions
            .filter(t => t.type === 'income' && new Date(t.date) >= midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const previousIncome = activeTransactions
            .filter(t => t.type === 'income' && new Date(t.date) >= start && new Date(t.date) < midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const expenseChange = previousExpenses === 0 ? 0 : ((currentExpenses - previousExpenses) / previousExpenses) * 100;
        const incomeChange = previousIncome === 0 ? 0 : ((currentIncome - previousIncome) / previousIncome) * 100;
        return { expenseChange, incomeChange };
    }, [activeTransactions, dateFilter]);

    // ── Chart data ──
    const chartData = useMemo(() => {
        const dayMap: Record<string, { expenses: number; income: number }> = {};
        filteredByDate.forEach(t => {
            const day = t.date?.split('T')[0] || t.date;
            if (!dayMap[day]) dayMap[day] = { expenses: 0, income: 0 };
            if (t.type === 'expense') dayMap[day].expenses += Number(t.amount);
            if (t.type === 'income') dayMap[day].income += Number(t.amount);
        });
        return Object.entries(dayMap)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, vals]) => ({
                date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
                Gastos: Number(vals.expenses.toFixed(2)),
                Receitas: Number(vals.income.toFixed(2)),
            }));
    }, [filteredByDate]);


    const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (loading) {
        return (
            <div className="bg-background-dark text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Sincronizando Transações...</div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>


            <Header showBack title="Transações de Elite" />

            <main className="flex-grow px-6 space-y-10 pb-40 pt-6 overflow-y-auto no-scrollbar relative z-10">

                {/* ── Main Stat Hero ── */}
                <div className="transparent-card-border rounded-[3rem] p-10 bg-zinc-950/20 border-white/5 relative group cursor-pointer overflow-hidden" onClick={() => setShowWallet(true)}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em] block">Disponibilidade</span>
                            <h2 className="text-4xl font-black text-white italic tracking-tighter premium-text-glow">
                                <span className="text-xl font-light text-zinc-500 mr-2">R$</span>
                                {fmt(spentToday)}
                            </h2>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_5px_#0FB67F]"></div>
                                    <span className="text-[8px] font-black text-primary uppercase tracking-widest leading-none">Status: Fluido</span>
                                </div>
                                {earnedToday > 0 && (
                                    <span className="text-[9px] font-bold text-zinc-500">+R$ {fmt(earnedToday)}</span>
                                )}
                            </div>
                        </div>
                        <div className="w-16 h-16 rounded-[2rem] bg-zinc-950 border border-white/10 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                            <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
                        </div>
                    </div>
                </div>

                {/* ── Filters ── */}
                <div className="flex p-1 gap-1 bg-zinc-950/40 rounded-2xl border border-white/5">
                    {([
                        { key: '7d' as const, label: '7D' },
                        { key: '30d' as const, label: '30D' },
                        { key: '90d' as const, label: '90D' },
                        { key: 'all' as const, label: 'ALL' },
                    ]).map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setDateFilter(key)}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all
                                ${dateFilter === key
                                    ? 'bg-zinc-900 border border-white/10 text-primary shadow-[0_5px_15px_rgba(0,0,0,0.3)]'
                                    : 'text-zinc-600 hover:text-zinc-400'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Evolution Insights ── */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Auditória de Evolução</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-[2px] bg-primary rounded-full"></div>
                                <span className="text-[8px] font-black text-zinc-600 uppercase">Receitas</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-[2px] bg-red-500 rounded-full"></div>
                                <span className="text-[8px] font-black text-zinc-600 uppercase">Gastos</span>
                            </div>
                        </div>
                    </div>

                    <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/10 border-white/5 min-h-[160px]">
                        <ResponsiveContainer width="100%" height={160}>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0FB67F" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#0FB67F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#3f3f46', fontWeight: 900 }} axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} hide />
                                <Tooltip
                                    contentStyle={{ background: '#000', border: '1px solid #1f1f23', borderRadius: '16px', fontSize: '10px' }}
                                    labelStyle={{ color: '#52525b', marginBottom: '8px', fontWeight: 900 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Gastos"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    fill="url(#gradExpense)"
                                    animationDuration={2000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Receitas"
                                    stroke="#0FB67F"
                                    strokeWidth={3}
                                    fill="url(#gradIncome)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>


                {/* ── Transaction List ── */}
                <section className="space-y-6">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Auditória de Registros</h3>
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{filteredTransactions.length} Operações</span>
                    </div>

                    <div className="flex items-center bg-zinc-950/40 border border-white/5 rounded-2xl px-5 py-4 transition-all focus-within:border-primary/20 group">
                        <span className="material-symbols-outlined text-zinc-700 mr-4 text-xl group-focus-within:text-primary transition-colors">search</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm placeholder-zinc-800 w-full p-0 text-white font-bold italic"
                            placeholder="Buscar Operação..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        {filteredTransactions.map((transaction, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={transaction.id}
                                onClick={() => navigate('/transaction-details', { state: { transaction } })}
                                className="transparent-card-border rounded-[2.5rem] p-6 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group hover:bg-white/[0.02] border-white/5"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${transaction.type === 'income'
                                        ? 'bg-primary/5 border border-primary/20 text-primary shadow-[0_0_20px_rgba(15,182,127,0.05)]'
                                        : transaction.type === 'expense'
                                            ? 'bg-red-500/5 border border-red-500/20 text-red-500'
                                            : 'bg-blue-500/5 border border-blue-500/20 text-blue-500'
                                        }`}>
                                        <span className="material-symbols-outlined text-2xl">
                                            {transaction.type === 'income' ? 'finance_chip' : (transaction.type === 'expense' ? 'receipt_long' : 'swap_horizontal_circle')}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-black text-white italic tracking-tight leading-none mb-2 ${transaction.status === 'anulada' ? 'line-through opacity-40' : ''}`}>
                                            {transaction.description}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{transaction.category}</span>
                                            <div className="w-1 h-1 rounded-full bg-zinc-900"></div>
                                            <span className="text-[8px] font-bold text-zinc-700 uppercase">{new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1.5">
                                    <span className={`text-base font-black italic tracking-tighter ${transaction.status === 'anulada'
                                        ? 'text-zinc-800'
                                        : transaction.type === 'income'
                                            ? 'text-primary'
                                            : transaction.type === 'expense'
                                                ? 'text-white'
                                                : 'text-blue-400'
                                        }`}>
                                        {transaction.type === 'expense' ? '-' : '+'} R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    {transaction.status && (
                                        <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border ${transaction.status === 'entregue' ? 'border-primary/20 text-primary' :
                                            transaction.status === 'reconciliada' ? 'border-blue-500/20 text-blue-500' :
                                                'border-red-500/20 text-red-500'
                                            }`}>
                                            {transaction.status}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* ── Transaction Cockpit (Standardized FAB) ── */}
            <div className={`fixed bottom-24 right-6 z-[150] transition-all duration-500 ${!showFabCockpit ? 'levitate-btn' : ''}`}>
                <AnimatePresence>
                    {showFabCockpit && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[90]"
                                onClick={() => setShowFabCockpit(false)}
                            />
                            <div className="absolute bottom-20 right-0 z-[110] flex flex-col items-end space-y-4">
                                {[
                                    { type: 'income', icon: 'add_circle', label: 'Nova Receita', color: 'text-primary border-primary/20 bg-primary/5' },
                                    { type: 'expense', icon: 'remove_circle', label: 'Nova Despesa', color: 'text-red-500 border-red-500/20 bg-red-500/5' },
                                    { type: 'transfer', icon: 'swap_horiz', label: 'Transferência', color: 'text-blue-500 border-blue-500/20 bg-blue-500/5' }
                                ].map((item, i) => (
                                    <motion.button
                                        key={item.type}
                                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => navigate('/new-transaction', { state: { type: item.type } })}
                                        className="flex items-center gap-4 group"
                                    >
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/5">
                                            {item.label}
                                        </span>
                                        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-2xl backdrop-blur-md ${item.color}`}>
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </>
                    )}
                </AnimatePresence>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFabCockpit(!showFabCockpit)}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] relative z-[110]"
                >
                    <motion.span
                        animate={{ rotate: showFabCockpit ? 45 : 0 }}
                        className="material-symbols-outlined text-black text-3xl font-black"
                    >
                        add
                    </motion.span>
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

            {/* ── Wallet Summary (Gaming Edition) ── */}
            <AnimatePresence>
                {showWallet && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
                            onClick={() => setShowWallet(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-sm transparent-card-border rounded-[3.5rem] bg-zinc-950 p-10 border-white/5 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>

                            <div className="relative z-10 text-center space-y-8">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-[2.5rem] bg-zinc-900 border border-primary/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(15,182,127,0.1)]">
                                        <span className="material-symbols-outlined text-primary text-4xl">account_balance_wallet</span>
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] block mb-2">Auditória Patrimonial</span>
                                    <h3 className={`text-4xl font-black italic tracking-tighter premium-text-glow ${walletData.balance >= 0 ? 'text-white' : 'text-red-500'}`}>
                                        <span className="text-xl font-light text-zinc-500 mr-1">R$</span>
                                        {fmt(walletData.balance)}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-5 text-left">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Inflows (Mês)</span>
                                        <p className="text-sm font-black text-primary italic">+R$ {fmt(walletData.monthIncome)}</p>
                                    </div>
                                    <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-5 text-left">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Outflows (Mês)</span>
                                        <p className="text-sm font-black text-red-500 italic">-R$ {fmt(walletData.monthExpenses)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 text-left border-t border-white/5 pt-8">
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Ativos Historicos</span>
                                        <span className="text-xs font-bold text-white">R$ {fmt(walletData.allIncome)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Total Operações</span>
                                        <span className="text-xs font-bold text-primary">{walletData.totalTransactions} Execuções</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowWallet(false)}
                                    className="w-full py-5 rounded-3xl bg-white text-black font-black text-[10px] tracking-[0.3em] uppercase active:scale-95 transition-all shadow-[0_15px_30px_rgba(255,255,255,0.1)]"
                                >
                                    Confirmar Leitura
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
