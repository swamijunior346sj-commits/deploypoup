import { useNavigate } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const { transactions, loading } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dateFilter, setDateFilter] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
    const [showWallet, setShowWallet] = useState(false);

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
    const spentToday = transactions
        .filter(t => t.type === 'expense' && t.date?.startsWith(today))
        .reduce((acc, t) => acc + Number(t.amount), 0);
    const earnedToday = transactions
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
        const allIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((a, t) => a + Number(t.amount), 0);
        const allExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((a, t) => a + Number(t.amount), 0);
        const balance = allIncome - allExpense;
        const totalTransactions = transactions.length;
        const thisMonth = new Date().getMonth();
        const monthExpenses = transactions
            .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === thisMonth)
            .reduce((a, t) => a + Number(t.amount), 0);
        const monthIncome = transactions
            .filter(t => t.type === 'income' && new Date(t.date).getMonth() === thisMonth)
            .reduce((a, t) => a + Number(t.amount), 0);
        return { allIncome, allExpense, balance, totalTransactions, monthExpenses, monthIncome };
    }, [transactions]);

    // ── Period comparison ──
    const periodComparison = useMemo(() => {
        const now = new Date();
        let days = 30;
        if (dateFilter === '7d') days = 7;
        if (dateFilter === '90d') days = 90;
        if (dateFilter === 'all') days = 30;
        const midpoint = new Date(now.getTime() - days * 86400000);
        const start = new Date(midpoint.getTime() - days * 86400000);

        const currentExpenses = transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const previousExpenses = transactions
            .filter(t => t.type === 'expense' && new Date(t.date) >= start && new Date(t.date) < midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const currentIncome = transactions
            .filter(t => t.type === 'income' && new Date(t.date) >= midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const previousIncome = transactions
            .filter(t => t.type === 'income' && new Date(t.date) >= start && new Date(t.date) < midpoint)
            .reduce((a, t) => a + Number(t.amount), 0);
        const expenseChange = previousExpenses === 0 ? 0 : ((currentExpenses - previousExpenses) / previousExpenses) * 100;
        const incomeChange = previousIncome === 0 ? 0 : ((currentIncome - previousIncome) / previousIncome) * 100;
        return { expenseChange, incomeChange };
    }, [transactions, dateFilter]);

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

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            navigate('/spending-analysis');
        }, 3000);
    };

    const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
                .levitate-btn { animation: levitate 3s ease-in-out infinite; }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .shimmer-line {
                    background: linear-gradient(90deg, transparent 25%, rgba(15,182,127,0.15) 50%, transparent 75%);
                    background-size: 200% 100%;
                    animation: shimmer 3s ease-in-out infinite;
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 8px rgba(15,182,127,0.1); }
                    50% { box-shadow: 0 0 20px rgba(15,182,127,0.2); }
                }
                .pulse-card { animation: pulse-glow 3s ease-in-out infinite; }
            `}</style>

            {/* ── Analyzing Overlay ── */}
            {isAnalyzing && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center animate-fade-in">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#0FB67F] animate-scan z-50"></div>
                    <div className="relative w-48 h-48 mb-10">
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

            {/* ── Wallet Summary Popup ── */}
            {showWallet && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                    <div className="absolute inset-0 backdrop-blur-premium transition-opacity duration-300" onClick={() => setShowWallet(false)}></div>
                    <div className="relative w-full max-w-sm transparent-card-border rounded-[2.5rem] p-8 popup-anim">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-primary text-[30px]">account_balance_wallet</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Resumo da Carteira</h3>
                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-6">Visão geral do seu patrimônio</p>

                            <div className="w-full space-y-4 mb-6">
                                {/* Balance */}
                                <div className="text-center py-4 border-b border-white/5">
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-1">Saldo Geral</p>
                                    <p className={`text-3xl font-display font-bold tracking-tight ${walletData.balance >= 0 ? 'text-primary' : 'text-red-500'}`}>
                                        R$ {fmt(walletData.balance)}
                                    </p>
                                </div>

                                {/* Month summary */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border border-white/5 rounded-xl p-3 text-left">
                                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Receita do mês</p>
                                        <p className="text-sm font-bold text-primary">+R$ {fmt(walletData.monthIncome)}</p>
                                    </div>
                                    <div className="border border-white/5 rounded-xl p-3 text-left">
                                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Gasto do mês</p>
                                        <p className="text-sm font-bold text-red-400">-R$ {fmt(walletData.monthExpenses)}</p>
                                    </div>
                                </div>

                                {/* Lifetime totals */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border border-white/5 rounded-xl p-3 text-left">
                                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total Receitas</p>
                                        <p className="text-sm font-bold text-white">R$ {fmt(walletData.allIncome)}</p>
                                    </div>
                                    <div className="border border-white/5 rounded-xl p-3 text-left">
                                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total Gastos</p>
                                        <p className="text-sm font-bold text-white">R$ {fmt(walletData.allExpense)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 pt-1">
                                    <span className="material-symbols-outlined text-zinc-700 text-sm">swap_horiz</span>
                                    <span className="text-[9px] text-zinc-600 font-bold">{walletData.totalTransactions} transações registradas</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowWallet(false)}
                                className="w-full py-4 rounded-2xl bg-transparent border border-white/10 text-primary font-bold text-xs tracking-[0.2em] uppercase active:scale-95 transition-all hover:bg-primary/5 shadow-[0_10px_20px_rgba(15,182,127,0.1)]"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Header showBack title="Transações" />

            <main className="flex-grow px-6 space-y-6 pb-40 pt-2 mt-2 overflow-y-auto no-scrollbar">

                {/* ── Animated Daily Spending Card ── */}
                <div className="transparent-card-border rounded-[2.5rem] p-8 relative overflow-hidden pulse-card">
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] shimmer-line"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Gasto Hoje</p>
                            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                                R$ {fmt(spentToday)}
                            </h2>
                            {earnedToday > 0 && (
                                <p className="text-[10px] text-primary font-bold tracking-wider">
                                    <span className="text-zinc-600 mr-1">Recebido:</span> +R$ {fmt(earnedToday)}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => setShowWallet(true)}
                            className="w-14 h-14 rounded-2xl border border-primary/20 flex items-center justify-center active:scale-90 transition-all hover:bg-primary/5 group"
                        >
                            <span className="material-symbols-outlined text-primary text-[28px] group-hover:scale-110 transition-transform">account_balance_wallet</span>
                        </button>
                    </div>
                </div>

                {/* ── Date Filter Pills ── */}
                <div className="flex gap-2">
                    {([
                        { key: '7d' as const, label: '7 dias' },
                        { key: '30d' as const, label: '30 dias' },
                        { key: '90d' as const, label: '90 dias' },
                        { key: 'all' as const, label: 'Todos' },
                    ]).map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setDateFilter(key)}
                            className={`flex-1 py-3 text-[9px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-300 active:scale-95
                                ${dateFilter === key
                                    ? 'bg-primary/10 text-primary border border-primary/15'
                                    : 'border border-white/[0.04] text-zinc-600 hover:text-zinc-400'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── KPI Row ── */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="border border-white/[0.04] rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Gastos</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${periodComparison.expenseChange > 0 ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                                {periodComparison.expenseChange > 0 ? '↑' : '↓'} {Math.abs(periodComparison.expenseChange).toFixed(1)}%
                            </span>
                        </div>
                        <p className="text-lg font-display font-bold text-red-400 tracking-tight">R$ {fmt(totalExpenses)}</p>
                    </div>
                    <div className="border border-white/[0.04] rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Receitas</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${periodComparison.incomeChange >= 0 ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                                {periodComparison.incomeChange >= 0 ? '↑' : '↓'} {Math.abs(periodComparison.incomeChange).toFixed(1)}%
                            </span>
                        </div>
                        <p className="text-lg font-display font-bold text-primary tracking-tight">R$ {fmt(totalIncome)}</p>
                    </div>
                </div>

                {/* ── Spending Evolution Chart ── */}
                {chartData.length > 1 && (
                    <div className="space-y-3">
                        <h3 className="text-[9px] font-black tracking-[0.3em] text-zinc-600 uppercase px-1">Evolução de Gastos</h3>
                        <div className="transparent-card-border rounded-[2rem] p-6">
                            <ResponsiveContainer width="100%" height={130}>
                                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                                    <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#52525b' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 8, fill: '#52525b' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 11, padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                        labelStyle={{ color: '#a1a1aa', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Gastos']}
                                    />
                                    <Area type="monotone" dataKey="Gastos" stroke="#ef4444" strokeWidth={2} fill="url(#gradExpense)" dot={false} activeDot={{ r: 4, fill: '#ef4444' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* ── Income Evolution Chart ── */}
                {chartData.length > 1 && (
                    <div className="space-y-3">
                        <h3 className="text-[9px] font-black tracking-[0.3em] text-zinc-600 uppercase px-1">Evolução de Receitas</h3>
                        <div className="transparent-card-border rounded-[2rem] p-6">
                            <ResponsiveContainer width="100%" height={100}>
                                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                                    <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#52525b' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 8, fill: '#52525b' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ background: '#000000', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 11, padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                        labelStyle={{ color: '#a1a1aa', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                        formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, 'Receitas']}
                                    />
                                    <Bar dataKey="Receitas" fill="#0FB67F" radius={[6, 6, 0, 0]} barSize={12} opacity={0.9} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* ── AI Analysis Button ── */}
                <button
                    onClick={handleAnalyze}
                    className="w-full flex items-center justify-center gap-3 py-4 border border-primary/15 rounded-2xl group hover:bg-primary/5 transition-all active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-primary text-lg group-hover:rotate-12 transition-transform">auto_awesome</span>
                    <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase">Análise de Gastos IA</span>
                </button>

                {/* ── Search ── */}
                <div className="flex items-center border border-white/[0.04] rounded-xl px-4 py-3 transition-all focus-within:border-primary/20">
                    <span className="material-symbols-outlined text-zinc-700 mr-3 text-[18px]">search</span>
                    <input
                        className="bg-transparent border-none focus:ring-0 text-[13px] placeholder-zinc-800 w-full p-0 text-text-value font-medium"
                        placeholder="Buscar transação…"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="ml-2">
                            <span className="material-symbols-outlined text-zinc-600 text-[16px]">close</span>
                        </button>
                    )}
                </div>

                {/* ── Transaction List ── */}
                <section className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-[9px] font-black tracking-[0.3em] text-zinc-600 uppercase">Histórico</h3>
                        <span className="text-[9px] font-bold text-zinc-700">{filteredTransactions.length} registros</span>
                    </div>

                    <div className="space-y-2">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    onClick={() => navigate('/transaction-details', { state: { transaction } })}
                                    className="transparent-card-border rounded-[2rem] p-5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group hover:bg-white/[0.02]"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${transaction.type === 'income'
                                            ? 'bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/15'
                                            : transaction.type === 'transfer'
                                                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-500 group-hover:bg-blue-500/15'
                                                : 'bg-red-500/10 border border-red-500/20 text-red-500 group-hover:bg-red-500/15'
                                            }`}>
                                            <span className="material-symbols-outlined text-[20px]">
                                                {transaction.type === 'income' ? 'payments' : (transaction.type === 'transfer' ? 'sync_alt' : 'shopping_bag')}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[13px] font-semibold text-text-value leading-tight truncate max-w-[160px]">{transaction.description}</p>
                                            <div className="flex items-center space-x-1.5 mt-0.5">
                                                <span className="text-[8px] text-zinc-600 font-bold tracking-wider uppercase">{transaction.category}</span>
                                                <span className="w-[3px] h-[3px] rounded-full bg-zinc-800"></span>
                                                <span className="text-[8px] text-zinc-700 font-medium">
                                                    {new Date(transaction.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-[13px] font-bold font-display tracking-tight ${transaction.type === 'income' ? 'text-primary' : (transaction.type === 'transfer' ? 'text-blue-400' : 'text-text-value')
                                            }`}>
                                            {transaction.type === 'expense' ? '-' : (transaction.type === 'income' ? '+' : '')} R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-16 text-center rounded-[32px] border border-white/[0.04] border-dashed">
                                <span className="material-symbols-outlined text-zinc-800 text-4xl block mb-3">receipt_long</span>
                                <p className="text-[10px] text-zinc-700 uppercase tracking-widest font-bold">Nenhuma transação encontrada</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* ── FAB ── */}
            <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
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
