import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewBudget() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(2500);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAmountChange = (val: number) => {
        setAmount(Math.max(0, Math.min(10000, val)));
    };

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate('/budgets');
        }, 2000);
    };

    if (showSuccess) {
        return (
            <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <style>{`
                    @keyframes check-bounce {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                    }
                    .animate-check { animation: check-bounce 0.5s ease-in-out; }
                `}</style>
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary font-bold animate-check">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Orçamento Criado!</h2>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                    Sua nova diretriz financeira<br />foi estabelecida com sucesso
                </p>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold">
                    <span className="text-[10px] uppercase tracking-tighter">+5 XP POR PLANEJAMENTO</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black font-display antialiased min-h-screen flex flex-col relative overflow-x-hidden">
            {/* Grid Overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-20 z-0"
                style={{
                    backgroundImage: 'linear-gradient(#0FB67F10 1px, transparent 1px), linear-gradient(90deg, #0FB67F10 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between p-6 bg-black/80 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white hover:text-primary transition-colors flex items-center justify-center active:scale-95"
                >
                    <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                </button>
                <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white flex-1 text-center pr-10">Novo Orçamento</h1>
            </header>

            <main className="relative z-10 flex-1 flex flex-col max-w-lg mx-auto w-full p-6 space-y-8">
                {/* Amount Selector Section */}
                <section className="text-center pt-8">
                    <span className="text-[10px] font-semibold tracking-[0.3em] text-[#D6D6D6] uppercase mb-2 block">Valor Previsto</span>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => handleAmountChange(amount - 100)}
                            className="text-primary hover:opacity-70 transition-opacity active:scale-90"
                        >
                            <span className="material-symbols-outlined select-none text-3xl">remove_circle_outline</span>
                        </button>
                        <h2 className="text-5xl font-extralight tracking-tight text-text-value min-w-[240px]">
                            R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h2>
                        <button
                            onClick={() => handleAmountChange(amount + 100)}
                            className="text-primary hover:opacity-70 transition-opacity active:scale-90"
                        >
                            <span className="material-symbols-outlined select-none text-3xl">add_circle_outline</span>
                        </button>
                    </div>

                    <div className="mt-8 px-4">
                        <input
                            className="w-full h-[2px] bg-[#D6D6D6]/30 appearance-none cursor-pointer accent-primary outline-none"
                            max="10000"
                            min="0"
                            step="100"
                            type="range"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                        <div className="flex justify-between mt-2 text-[10px] font-mono text-[#D6D6D6] tracking-tighter">
                            <span>MIN: R$ 0,00</span>
                            <span>MAX: R$ 10.000,00</span>
                        </div>
                    </div>
                </section>

                {/* Impact Projection Section */}
                <section className="border border-white/10 rounded-xl p-6 backdrop-blur-sm bg-primary/[0.02] shadow-[0_0_15px_rgba(15,182,127,0.05)]">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#D6D6D6] uppercase">Projeção de Impacto</h3>
                            <p className="text-2xl font-light text-white mt-1">-12.4% <span className="text-xs font-normal text-primary/70 tracking-normal ml-1">do limite livre</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-mono text-[#D6D6D6]">ID: HUD-992-B</p>
                            <p className="text-[10px] font-mono text-primary uppercase">Calculado em Tempo Real</p>
                        </div>
                    </div>

                    <div className="h-32 w-full relative">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                            <defs>
                                <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.2"></stop>
                                    <stop offset="100%" stopColor="#0FB67F" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,80 Q50,75 100,90 T200,40 T300,60 T400,20 L400,120 L0,120 Z" fill="url(#lineGradient)"></path>
                            <path d="M0,80 Q50,75 100,90 T200,40 T300,60 T400,20" fill="none" stroke="#0FB67F" strokeWidth="1.5"></path>
                            <circle cx="400" cy="20" fill="#0FB67F" r="3"></circle>
                            <line stroke="#71717A" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="400" y1="100" y2="100"></line>
                        </svg>
                        <div className="flex justify-between mt-2 text-[9px] font-mono text-[#D6D6D6] uppercase tracking-widest px-1">
                            <span>S01</span>
                            <span>S02</span>
                            <span>S03</span>
                            <span>S04</span>
                        </div>
                    </div>
                </section>

                {/* Summary Grid */}
                <section className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                        <p className="text-[10px] font-semibold tracking-[0.1em] text-[#D6D6D6] uppercase">Limite Atual</p>
                        <p className="text-lg font-light text-white mt-1">R$ 12.000</p>
                    </div>
                    <div className="border border-white/10 p-4 rounded-lg bg-white/5">
                        <p className="text-[10px] font-semibold tracking-[0.1em] text-[#D6D6D6] uppercase">Comprometido</p>
                        <p className="text-lg font-light text-white mt-1">R$ 4.250</p>
                    </div>
                </section>

                {/* Category Parameters */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#D6D6D6] uppercase">Parâmetros de Categoria</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-sm transition-transform group-hover:scale-110">shopping_cart</span>
                                <span className="text-xs font-medium text-white">Consumo Geral</span>
                            </div>
                            <span className="text-xs font-mono text-[#D6D6D6]">35%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-sm transition-transform group-hover:scale-110">restaurant</span>
                                <span className="text-xs font-medium text-white">Alimentação</span>
                            </div>
                            <span className="text-xs font-mono text-[#D6D6D6]">20%</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer with Fixed Action Button */}
            <footer className="relative z-10 p-6 mt-auto bg-black/80 backdrop-blur-md sticky bottom-0 border-t border-white/5">
                <button
                    onClick={handleSave}
                    className="w-full py-4 rounded-full border border-primary text-white font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary/10 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(15,182,127,0.1)]"
                >
                    Criar Orçamento
                </button>
            </footer>
        </div>
    );
}
