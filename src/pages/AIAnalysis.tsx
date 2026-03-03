import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function AIAnalysis() {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-sans text-[#FCFCFC] flex flex-col min-h-screen">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .glow-interactive {
                    filter: drop-shadow(0 0-8px rgba(15, 182, 127, 0.4));
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
                    <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARoQpVuOA1P7pvcmCUaudfQYfcmtIJhE-4m0s9a0NXPwZpr_-ul0DCqdm78RWpTmkHMwkFY4JDwKgi0r7MkgBGU6WK8hfB-k74SfNxWZLn7zpTzwT7HvlXdLhLFcXy3Kr7kNG5JkvRW0NeFvrtZebXNDB2Tey3SZd1Ha7k90cnbai1hV81KXCWDBW-0hL_ETIISR_aQbWzFKXKz9QHsEZV7-x9hHDqGGaXuMYQyPQxAhDJLwNvk-vokQt1MElRMv5LRloV8ESpr_0" />
                </div>
            </header>

            <main className="flex-grow px-6 space-y-8 pb-48">
                <section className="mt-2">
                    <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
                        <div className="flex-shrink-0 flex flex-col items-center space-y-2">
                            <div className="w-16 h-16 rounded-full p-[2px] story-gradient">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-black">
                                    <span className="material-symbols-outlined text-[#0FB67F] text-2xl">auto_awesome</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-[#A7A7A7] uppercase">Resumo</span>
                        </div>
                        <div className="flex-shrink-0 w-64 bg-transparent rounded-2xl p-4 border border-white/10 flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-[#042017]/50 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#0FB67F] text-xl">trending_up</span>
                            </div>
                            <div>
                                <p className="text-[11px] text-[#D6D6D6] leading-tight">Você economizou <span className="text-[#FCFCFC] font-bold">R$ 150</span> a mais que semana passada.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="space-y-6">
                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2 px-1">
                            <div className="w-6 h-6 rounded-full bg-transparent border border-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[14px] text-[#A7A7A7]">smart_toy</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#A7A7A7] tracking-widest uppercase">Análise de Gastos</span>
                        </div>
                        <div className="bg-transparent rounded-2xl rounded-tl-none p-5 border border-white/10 space-y-4 max-w-[90%]">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-orange-500">restaurant</span>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-[#FCFCFC]">Alimentação</h4>
                                    <p className="text-[11px] text-[#A7A7A7]">80% do orçamento mensal</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#0FB67F] shadow-[0_0_10px_rgba(15,182,127,0.4)] w-[80%] rounded-full"></div>
                                </div>
                                <p className="text-sm text-[#D6D6D6]">
                                    Você já gastou <span className="font-bold text-[#0FB67F]">80%</span> do seu orçamento mensal aqui. Recomendo cautela nos próximos 10 dias.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2 px-1">
                            <div className="w-6 h-6 rounded-full bg-transparent border border-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[14px] text-[#A7A7A7]">query_stats</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#A7A7A7] tracking-widest uppercase">Simulação de Economia</span>
                        </div>
                        <div className="bg-transparent border border-white/10 rounded-2xl rounded-tl-none p-6 space-y-6 max-w-[95%]">
                            <p className="text-sm text-[#D6D6D6]">Arraste para ver como reduzir gastos em <span className="text-[#FCFCFC] font-semibold">Lazer</span> impacta seu saldo futuro:</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-[#A7A7A7] uppercase tracking-tighter">Redução</span>
                                    <span className="text-2xl font-display font-bold text-[#0FB67F]">-15%</span>
                                </div>
                                <input className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#0FB67F]" max="100" min="0" type="range" defaultValue="15" />
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-xs text-[#A7A7A7]">Saldo projetado (30 dias)</span>
                                <div className="text-right">
                                    <span className="text-xs text-[#A7A7A7] line-through block">R$ 2.400</span>
                                    <span className="text-lg font-bold text-[#0FB67F]">R$ 2.750</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <div className="bg-transparent border border-dashed border-white/10 rounded-2xl p-4 flex items-start space-x-3">
                            <span className="material-symbols-outlined text-[#096D4B]">lightbulb</span>
                            <p className="text-xs text-[#A7A7A7] leading-relaxed italic">
                                "Dica: Pagar faturas antes do vencimento este mês pode liberar R$ 45 em cashback adicional."
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="flex flex-col items-center py-4 opacity-40">
                    <div className="flex items-center space-x-2">
                        <span className="material-symbols-outlined text-[12px] text-[#A7A7A7]">verified</span>
                        <p className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#A7A7A7]">Powered by POUP Intelligence</p>
                    </div>
                </footer>
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
