import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area, CartesianGrid
} from 'recharts';
import Header from '../components/Header';

export default function SpendingAnalysis() {
    const navigate = useNavigate();
    const { transactions, budgets, loading } = useData();
    const [period, setPeriod] = useState<'mensal' | 'semanal' | 'anual'>('mensal');
    const [simulationValue, setSimulationValue] = useState(10); // Percentage to save

    // ── Data Processing ──
    const now = new Date();
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const tDate = new Date(t.date);
            if (period === 'semanal') {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                return tDate >= weekAgo;
            } else if (period === 'mensal') {
                return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
            } else {
                return tDate.getFullYear() === now.getFullYear();
            }
        });
    }, [transactions, period]);

    const totalIncome = useMemo(() =>
        filteredTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
        , [filteredTransactions]);

    const totalExpense = useMemo(() =>
        filteredTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0)
        , [filteredTransactions]);

    const analyzedBalance = totalIncome - totalExpense;

    const categoryData = useMemo(() => {
        const counts: Record<string, number> = {};
        filteredTransactions.filter(t => t.type === 'expense').forEach(t => {
            counts[t.category] = (counts[t.category] || 0) + Number(t.amount);
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }, [filteredTransactions]);

    const COLORS = ['#0FB67F', '#3B82F6', '#A855F7', '#F59E0B', '#EF4444'];

    // ── Simulation Logic ──
    const projectedSavings = (totalExpense * (simulationValue / 100));
    const annualProjected = projectedSavings * 12;

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-6">
                <div className="relative w-20 h-20">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-primary/10 border-t-primary rounded-full shadow-[0_0_40px_rgba(15,182,127,0.2)]"
                    />
                    <div className="absolute inset-4 border border-blue-500/20 rounded-full animate-pulse"></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 animate-pulse">Cruzando Dados Financeiros...</span>
            </div>
        );
    }

    const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[50%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <Header title="Análise de Fluxo" showBack />

            <main className="flex-grow px-6 pt-6 pb-40 relative z-10 space-y-12 overflow-y-auto no-scrollbar">

                {/* ── Period Selector & Analyzed Balance ── */}
                <section className="space-y-8">
                    <div className="flex p-1 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-md max-w-[320px] mx-auto">
                        {(['semanal', 'mensal', 'anual'] as const).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`flex-1 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${period === p ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em]">Saldo Analisado ({period})</span>
                        <div className="relative">
                            <h1 className={`text-6xl font-display font-black tracking-tighter premium-text-glow leading-tight ${analyzedBalance >= 0 ? 'text-white' : 'text-red-500'}`}>
                                <span className="text-2xl font-light text-zinc-600 mr-2">R$</span>
                                {fmt(analyzedBalance)}
                            </h1>
                            {analyzedBalance < 0 && (
                                <div className="absolute -top-4 -right-8 px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded-full">
                                    <span className="text-[7px] font-black text-red-500 uppercase">Déficit</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 border-white/5 flex flex-col items-center gap-2">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Entradas</span>
                            <p className="text-xl font-black text-primary italic tracking-tighter">R$ {fmt(totalIncome)}</p>
                        </div>
                        <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 border-white/5 flex flex-col items-center gap-2">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Saídas</span>
                            <p className="text-xl font-black text-white italic tracking-tighter">R$ {fmt(totalExpense)}</p>
                        </div>
                    </div>
                </section>

                {/* ── Main Analysis Section ── */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Raio-X de Consumo</h3>
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">Categorias em Foco</span>
                    </div>

                    <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/30 space-y-10">
                        {categoryData.length > 0 ? (
                            <>
                                <div className="h-[240px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={categoryData} layout="vertical">
                                            <XAxis type="number" hide />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                width={80}
                                                tick={{ fill: '#52525b', fontSize: 10, fontWeight: 900 }}
                                            />
                                            <Tooltip
                                                cursor={{ fill: 'transparent' }}
                                                contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10', borderRadius: '16px' }}
                                                itemStyle={{ color: '#0FB67F', fontSize: '10px', fontWeight: 900 }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                radius={[0, 10, 10, 0]}
                                                barSize={12}
                                            >
                                                {categoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="space-y-4">
                                    {categoryData.map((cat, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{cat.name}</span>
                                            </div>
                                            <span className="text-sm font-black text-white italic">R$ {fmt(cat.value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="py-12 text-center opacity-40 italic text-zinc-500 text-[10px] uppercase tracking-widest">
                                Sem movimentações para este período.
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Savings Simulation Tool ── */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-500 text-lg">model_training</span>
                        </div>
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Simulador de Economia</h3>
                    </div>

                    <div className="transparent-card-border rounded-[3rem] p-10 bg-gradient-to-br from-zinc-950 to-black border-blue-500/10 space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end px-2">
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Meta de Otimização</span>
                                <span className="text-3xl font-black text-blue-500 italic tracking-tighter">{simulationValue}%</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={simulationValue}
                                onChange={(e) => setSimulationValue(Number(e.target.value))}
                                className="w-full h-1 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="flex justify-between text-[8px] font-black text-zinc-700 uppercase tracking-[0.2em] px-1">
                                <span>Poupador</span>
                                <span>Estrategista</span>
                                <span>Hardcore</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] flex flex-col items-center text-center space-y-4">
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Capital Resgatado (Mensal)</span>
                                <h4 className="text-4xl font-black text-white italic tracking-tighter">
                                    <span className="text-lg font-light text-zinc-600 mr-2">R$</span>
                                    {fmt(projectedSavings)}
                                </h4>
                                <div className="h-[1px] w-12 bg-blue-500/20"></div>
                                <span className="text-[7px] font-black text-blue-500/60 uppercase tracking-[0.4em]">Impacto Anual: R$ {fmt(annualProjected)}</span>
                            </div>
                        </div>

                        <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-start gap-4">
                            <span className="material-symbols-outlined text-blue-500 text-xl mt-0.5">lightbulb</span>
                            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed italic">
                                Ao economizar <span className="text-white">{simulationValue}%</span>, você gera um aporte equivalente a <span className="text-blue-500 font-black">R$ {fmt(annualProjected)}</span> extras por ano para reinvestir.
                            </p>
                        </div>
                    </div>
                </section>


            </main>

            {/* ── Standardized Luxury FAB ── */}
            <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/new-transaction')}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
                >
                    <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
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
        </div>
    );
}
