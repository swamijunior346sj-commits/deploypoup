import { useNavigate } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';

export default function AIAnalysis() {
    const navigate = useNavigate();
    const { transactions, assets, budgets } = useData();
    const [reduction, setReduction] = useState(15);

    // Calculate real data
    const categorySpending = useMemo(() => {
        const spending: Record<string, number> = {};
        transactions.forEach(t => {
            if (t.type === 'expense') {
                spending[t.category] = (spending[t.category] || 0) + Number(t.amount);
            }
        });
        return spending;
    }, [transactions]);

    const topCategory: [string, number] = useMemo(() => {
        const sorted = Object.entries(categorySpending).sort((a, b) => (b[1] as number) - (a[1] as number));
        const top = sorted[0];
        return top ? [top[0], top[1] as number] : ['Nenhum', 0];
    }, [categorySpending]);

    const totalAssetsValue = useMemo(() =>
        assets.reduce((acc, a) => acc + Number(a.current_value || 0), 0)
        , [assets]);

    const projectedBalance = useMemo(() => {
        const currentBalance = totalAssetsValue;
        const potentialSavings = (topCategory[1] * reduction) / 100;
        return currentBalance + potentialSavings;
    }, [totalAssetsValue, topCategory, reduction]);

    return (
        <div className="bg-black font-sans text-[#FCFCFC] flex flex-col min-h-screen">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .glow-interactive {
                    filter: drop-shadow(0 0 8px rgba(15, 182, 127, 0.4));
                }
                .ai-gradient-border {
                    position: relative;
                    background: #222426;
                    border-radius: 1rem;
                }
                .ai-gradient-border::before {
                    content: "";
                    position: absolute;
                    inset: -1px;
                    border-radius: 1rem;
                    padding: 1px;
                    background: linear-gradient(to right, #6D28D9, #0FB67F);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }
                .purple-glow {
                    box-shadow: 0 0 20px rgba(109, 40, 217, 0.15);
                }
                .story-gradient {
                    background: linear-gradient(45deg, #096D4B, #0FB67F);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-xl z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-transparent border border-white/5 flex items-center justify-center active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-[#A7A7A7] text-xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.3em] uppercase text-[#FCFCFC]">Assistente IA & Análise</h1>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/5">
                    <img
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                    />
                </div>
            </header>

            <main className="flex-grow px-6 space-y-8 pb-48">
                <section className="mt-2 text-center py-6 border border-white/5 rounded-3xl bg-primary/5">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Saldo Mensal Analisado</span>
                    <p className="text-3xl font-display font-light mt-1">R$ {totalAssetsValue.toLocaleString('pt-BR')}</p>
                </section>

                <div className="space-y-6">
                    {/* Real Category Analysis */}
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2 px-1">
                            <div className="w-6 h-6 rounded-full bg-transparent border border-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[14px] text-[#A7A7A7]">smart_toy</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#A7A7A7] tracking-widest uppercase">Análise de Gastos Atuais</span>
                        </div>
                        <div className="bg-transparent rounded-2xl rounded-tl-none p-5 border border-white/10 space-y-4 max-w-[90%]">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">analytics</span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#FCFCFC]">{topCategory[0]}</h4>
                                    <p className="text-[11px] text-[#A7A7A7]">Maior volume de gastos: R$ {topCategory[1].toLocaleString('pt-BR')}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-[#D6D6D6]">
                                    Sua maior categoria de gastos é <span className="font-bold text-primary">{topCategory[0]}</span>.
                                    Isso representa uma parte significativa das suas saídas este mês.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Functional Simulation */}
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2 px-1">
                            <div className="w-6 h-6 rounded-full bg-transparent border border-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[14px] text-[#A7A7A7]">query_stats</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#A7A7A7] tracking-widest uppercase">Simulação de Economia</span>
                        </div>
                        <div className="bg-transparent border border-white/10 rounded-2xl rounded-tl-none p-6 space-y-6 max-w-[95%]">
                            <p className="text-sm text-[#D6D6D6]">Ajuste para ver como reduzir gastos em <span className="text-[#FCFCFC] font-semibold">{topCategory[0]}</span> impacta seu saldo:</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-[#A7A7A7] uppercase tracking-tighter">Redução</span>
                                    <span className="text-2xl font-display font-bold text-[#0FB67F]">-{reduction}%</span>
                                </div>
                                <input
                                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0FB67F]"
                                    max="100"
                                    min="0"
                                    type="range"
                                    value={reduction}
                                    onChange={(e) => setReduction(Number(e.target.value))}
                                />
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-xs text-[#A7A7A7]">Novo Saldo Projetado</span>
                                <div className="text-right">
                                    <span className="text-xs text-[#A7A7A7] line-through block">R$ {totalAssetsValue.toLocaleString('pt-BR')}</span>
                                    <span className="text-lg font-bold text-[#0FB67F]">R$ {projectedBalance.toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-24 left-0 right-0 px-6 z-50">
                <div className="ai-gradient-border p-[1px] purple-glow">
                    <div className="bg-[#222426]/95 backdrop-blur-xl rounded-[15px] p-2 flex items-center space-x-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-[#0FB67F] flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                        </div>
                        <input className="bg-transparent border-none focus:ring-0 text-sm text-[#FCFCFC] placeholder-[#A7A7A7] w-full font-medium" placeholder="Como posso economizar hoje?" type="text" />
                        <button className="w-10 h-10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#0FB67F] glow-interactive text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
