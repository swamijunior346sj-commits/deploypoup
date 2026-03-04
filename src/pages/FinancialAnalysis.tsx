import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, ComposedChart, Line
} from 'recharts';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';

export default function FinancialAnalysis() {
    const navigate = useNavigate();
    const { transactions, assets, loading } = useData();
    const [activeTab, setActiveTab] = useState<'spending' | 'market' | 'projections'>('spending');

    const activeTransactions = useMemo(() => transactions.filter(t => t.status !== 'anulada'), [transactions]);

    // ── Market Ticker Data (Mock Real-time) ──
    const [marketPrices, setMarketPrices] = useState([
        { symbol: 'BTC/USD', price: '64,231.50', change: '+2.4%', color: 'text-primary' },
        { symbol: 'ETH/USD', price: '3,450.12', change: '-0.8%', color: 'text-red-500' },
        { symbol: 'IBOV', price: '128.450', change: '+1.2%', color: 'text-primary' },
        { symbol: 'USD/BRL', price: '4.95', change: '-0.2%', color: 'text-red-500' },
        { symbol: 'S&P 500', price: '5,120.40', change: '+0.5%', color: 'text-primary' },
        { symbol: 'APPLE', price: '185.92', change: '+1.1%', color: 'text-primary' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMarketPrices(prev => prev.map(item => ({
                ...item,
                price: (parseFloat(item.price.replace(',', '').replace('.', '')) * (1 + (Math.random() * 0.001 - 0.0005))).toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // ── Spending Analytics ──
    const spendingByCategory = useMemo(() => {
        const categories: Record<string, number> = {};
        activeTransactions.filter(t => t.type === 'expense').forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
        });
        return Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [activeTransactions]);

    const colors = ['#0FB67F', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444', '#EC4899'];

    // ── Projections Data ──
    const projectionsData = useMemo(() => {
        const currentBalance = assets.reduce((acc, a) => acc + Number(a.current_value), 0);
        const monthlyIncome = activeTransactions.filter(t => t.type === 'income').reduce((a, t) => a + Number(t.amount), 0) / 12 || 5000;
        const monthlyExpense = activeTransactions.filter(t => t.type === 'expense').reduce((a, t) => a + Number(t.amount), 0) / 12 || 3500;
        const monthlySavings = monthlyIncome - monthlyExpense;

        return [...Array(12)].map((_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
            return {
                month: date.toLocaleDateString('pt-BR', { month: 'short' }),
                Base: currentBalance + (monthlySavings * i),
                Optimistic: currentBalance + (monthlySavings * 1.2 * i),
                Conservative: currentBalance + (monthlySavings * 0.8 * i),
            };
        });
    }, [assets, activeTransactions]);

    if (loading) return null;

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Neural Intelligence" showBack />

            {/* ── Real-time Market Ticker ── */}
            <div className="bg-zinc-950/40 border-y border-white/5 py-3 relative z-10 overflow-hidden whitespace-nowrap">
                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-12 items-center w-max px-12"
                >
                    {[...marketPrices, ...marketPrices].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.symbol}</span>
                            <span className="text-sm font-black italic">{item.price}</span>
                            <span className={`text-[9px] font-black ${item.color}`}>{item.change}</span>
                            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                        </div>
                    ))}
                </motion.div>
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-20"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-20"></div>
            </div>

            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Navigation Tabs ── */}
                <div className="flex p-1 bg-zinc-950/60 rounded-2xl border border-white/5 gap-1">
                    {(['spending', 'market', 'projections'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeTab === tab ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-600'}`}
                        >
                            {tab === 'spending' ? 'Gastos' : tab === 'market' ? 'Mercado' : 'Projeções'}
                        </button>
                    ))}
                </div>

                {/* ── Period Filter & Analyzed Balance ── */}
                <section className="flex items-center justify-between gap-4">
                    <div className="flex-1 p-6 rounded-[2.5rem] bg-zinc-950/40 border border-white/5 flex flex-col">
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Saldo Analisado</span>
                        <span className="text-2xl font-black italic text-white premium-text-glow leading-none">R$ {(assets.reduce((acc, a) => acc + Number(a.current_value), 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button className="h-full px-6 py-5 rounded-[2.5rem] bg-zinc-950/40 border border-white/5 flex items-center justify-center text-primary active:scale-90 transition-all">
                        <span className="material-symbols-outlined mr-2">calendar_month</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">30D</span>
                    </button>
                </section>

                <AnimatePresence mode="wait">
                    {activeTab === 'spending' && (
                        <motion.section
                            key="spending"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Deep Audit</span>
                                <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Análise de Fluxo</h3>
                            </div>

                            {/* Spending Breakdown Chart */}
                            <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 border-white/5 aspect-square flex items-center justify-center relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={spendingByCategory}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={110}
                                            paddingAngle={8}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {spendingByCategory.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ background: '#000', border: '1px solid #1f1f23', borderRadius: '16px', fontSize: '10px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-1">Total Spent</span>
                                    <span className="text-2xl font-black italic text-white premium-text-glow">R$ {spendingByCategory.reduce((a, b) => a + b.value, 0).toLocaleString('pt-BR')}</span>
                                </div>
                            </div>

                            {/* Category List */}
                            <div className="space-y-4">
                                {spendingByCategory.map((item, idx) => (
                                    <div key={item.name} className="flex items-center justify-between p-6 bg-zinc-950/20 border border-white/5 rounded-3xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                                            <span className="text-xs font-black uppercase text-zinc-400 tracking-widest">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-black italic text-white">R$ {item.value.toLocaleString('pt-BR')}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {activeTab === 'market' && (
                        <motion.section
                            key="market"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Live Feed</span>
                                <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Market Pulse</h3>
                            </div>

                            {/* Market News */}
                            <div className="space-y-6">
                                {[
                                    { title: "BC sinaliza manutenção de taxas para controle inflacionário", source: "ELITE NEWS", time: "12min ago", trend: "up" },
                                    { title: "Bitcoin rompe barreira dos \$65k em movimento global", source: "CRIPTO HUB", time: "45min ago", trend: "up" },
                                    { title: "S&P 500 atinge máxima histórica com otimismo tech", source: "MARKET WATCH", time: "2h ago", trend: "neutral" },
                                ].map((news, i) => (
                                    <div key={i} className="transparent-card-border rounded-[2.5rem] p-7 bg-zinc-950 border-white/5 space-y-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
                                        <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em]">
                                            <span className="text-primary">{news.source}</span>
                                            <span className="text-zinc-600">{news.time}</span>
                                        </div>
                                        <p className="text-sm font-bold text-white leading-relaxed">{news.title}</p>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest italic pt-2">
                                            <span>Read Insights</span>
                                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Top Movers Mock */}
                            <div className="transparent-card-border rounded-[3rem] p-8 bg-black border border-primary/20 shadow-[0_0_30px_rgba(15,182,127,0.05)]">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">Top Movers (Volumetria)</h4>
                                <div className="space-y-8">
                                    {[
                                        { name: 'NVIDIA Corp', ticker: 'NVDA', val: '+4.5%', price: '875.20' },
                                        { name: 'Petrobras', ticker: 'PETR4', val: '-1.2%', price: '36.45' },
                                        { name: 'Solana', ticker: 'SOL', val: '+12.8%', price: '145.20' },
                                    ].map(item => (
                                        <div key={item.ticker} className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-white italic">{item.name}</span>
                                                <span className="text-[8px] font-black text-zinc-600 uppercase mt-0.5">{item.ticker}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-black text-white">\$ {item.price}</span>
                                                <p className={`text-[9px] font-black ${item.val.startsWith('+') ? 'text-primary' : 'text-red-500'} mt-0.5`}>{item.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {activeTab === 'projections' && (
                        <motion.section
                            key="projections"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-10"
                        >
                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Strategic Planning</span>
                                <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Projeção de Longo Prazo</h3>
                            </div>

                            <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 border-white/5">
                                <ResponsiveContainer width="100%" height={240}>
                                    <ComposedChart data={projectionsData}>
                                        <defs>
                                            <linearGradient id="projGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0FB67F" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0FB67F" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#52525b', fontWeight: 900 }} axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} hide />
                                        <Tooltip
                                            contentStyle={{ background: '#000', border: '1px solid #1f1f23', borderRadius: '16px', fontSize: '10px' }}
                                        />
                                        <Area type="monotone" dataKey="Optimistic" stroke="none" fill="url(#projGradient)" />
                                        <Line type="monotone" dataKey="Base" stroke="#0FB67F" strokeWidth={3} dot={false} />
                                        <Line type="monotone" dataKey="Conservative" stroke="#52525b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                <div className="mt-8 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Patrimônio em 12 Meses</span>
                                        <span className="text-xl font-black italic text-white premium-text-glow">R$ {projectionsData[11].Base.toLocaleString('pt-BR')}</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">+ 15.2% YoY</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/[0.03] border border-primary/20 rounded-[2.5rem] p-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                    <h5 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Insights do Estrategista</h5>
                                </div>
                                <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">
                                    "Baseado no seu fluxo médio de R$ {((activeTransactions.filter(t => t.type === 'income').reduce((a, t) => a + Number(t.amount), 0) - activeTransactions.filter(t => t.type === 'expense').reduce((a, t) => a + Number(t.amount), 0)) / 12).toFixed(2)}, você atingirá sua primeira meta de liquidez 3 meses antes do previsto."
                                </p>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
