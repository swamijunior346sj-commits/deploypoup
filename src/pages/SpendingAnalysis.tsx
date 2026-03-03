import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export default function SpendingAnalysis() {
    const navigate = useNavigate();
    const { budgets, transactions } = useData();

    // Mock/Calc data points
    const totalSpent = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const totalLimit = budgets.reduce((acc, b) => acc + Number(b.amount || b.target), 0) || 0;
    const consumptionPercent = Math.min(Math.round((totalSpent / totalLimit) * 100), 100);

    const categories = budgets.map(b => {
        const spent = transactions
            .filter(t => t.category === b.name && t.type === 'expense')
            .reduce((acc, t) => acc + Number(t.amount), 0);
        return {
            name: b.name,
            icon: b.icon || 'category',
            spent: spent,
            limit: b.amount,
            remaining: Math.max(Number(b.amount) - spent, 0),
            percent: Math.min(Math.round((spent / Number(b.amount)) * 100), 100)
        };
    }).slice(0, 3); // Showing top 3 for the premium preview

    return (
        <div className="bg-black text-[#A1A1AA] font-sans flex flex-col min-h-screen overflow-x-hidden selection:bg-primary/30">
            <header className="pt-14 pb-2 px-6 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
                <div className="flex items-center justify-between mb-8">
                    <div className="w-6"></div> {/* Spacer for symmetry */}
                    <h1 className="text-[10px] font-display font-semibold tracking-[0.5em] text-text-value uppercase opacity-80">ANÁLISE DE GASTOS</h1>
                    <div className="w-6"></div> {/* Spacer for symmetry */}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-12">
                <section className="p-6">
                    <div className="glow-border rounded-[40px] bg-transparent p-10 flex flex-col items-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

                        <h2 className="text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-8 relative z-10">ORÇAMENTO TOTAL</h2>

                        <div className="relative w-56 h-56 flex items-center justify-center z-10">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" fill="transparent" r="48" stroke="#1A1A1A" strokeWidth="0.5"></circle>
                                <circle
                                    className="glow-line transition-all duration-1000"
                                    cx="50" cy="50" fill="transparent" r="48"
                                    stroke="#0FB67F"
                                    strokeDasharray="301.59"
                                    strokeDashoffset={301.59 - (301.59 * consumptionPercent / 100)}
                                    strokeLinecap="round"
                                    strokeWidth="1.5"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-5xl font-display font-extralight text-text-value tracking-tight">
                                    {consumptionPercent}<span className="text-xl font-light opacity-60">%</span>
                                </span>
                                <span className="text-[8px] font-bold text-primary tracking-[0.3em] uppercase mt-2 glow-text">Consumido</span>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-12 w-full relative z-10">
                            <div className="text-center">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">Gasto</p>
                                <p className="text-xl font-light text-text-value tracking-tight">R$ {Math.round(totalSpent).toLocaleString('pt-BR')}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1">Limite</p>
                                <p className="text-xl font-light text-zinc-400 tracking-tight">R$ {totalLimit.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 space-y-4">
                    <h3 className="text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase px-2 mb-4">Detalhamento</h3>
                    {categories.map((cat, i) => (
                        <div key={i} className="glow-border rounded-3xl bg-transparent p-6 group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 group-hover:bg-primary/10 transition-colors">
                                    <span className="material-symbols-outlined text-primary font-extralight !text-[24px]">{cat.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-end">
                                        <h4 className="text-xs font-medium tracking-wide text-zinc-400">{cat.name}</h4>
                                        <span className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase">RESTAM R$ {Math.round(cat.remaining)}</span>
                                    </div>
                                    <div className="mt-1">
                                        <span className="text-lg font-light text-text-value">R$ {cat.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-zinc-900 overflow-hidden rounded-full">
                                <div className="h-full bg-primary glow-line transition-all duration-1000" style={{ width: `${cat.percent}%` }}></div>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="p-6">
                    <div className="glow-border rounded-3xl bg-transparent p-6 relative overflow-hidden">
                        <div className="flex items-start gap-5">
                            <div className="mt-1">
                                <span className="material-symbols-outlined text-primary font-light !text-[20px] glow-text animate-pulse">auto_awesome</span>
                            </div>
                            <div>
                                <h3 className="text-[9px] font-bold tracking-[0.3em] text-primary uppercase mb-3 glow-text">IA INSIGHT</h3>
                                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                                    {transactions.length > 5 ? (
                                        <>
                                            <span className="text-text-value font-medium">Análise preditiva:</span> O consumo em <span className="text-text-value">{categories[0]?.name || 'Geral'}</span> está acelerado. Projeção de excedente em 8% caso o padrão se mantenha.
                                        </>
                                    ) : (
                                        "Aguardando registros reais suficientes para processar insights preditivos."
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
