import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditBudget() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { budget?: { name: string; spent: number; target: number; icon: string } };

    // Dados baseados no que foi passado ou padrão
    const budgetName = state?.budget?.name || 'Alimentação';
    const currentSpent = state?.budget?.spent || 842.50;
    const initialTarget = state?.budget?.target || 5000;
    const totalGlobal = 5000; // Limite máximo simulação do HTML

    const [limit, setLimit] = useState(initialTarget);
    const [showSuccess, setShowSuccess] = useState(false);

    const percentageOfTotal = Math.round((limit / totalGlobal) * 100);
    const usedPercentage = Math.round((currentSpent / limit) * 100);
    const available = Math.max(0, limit - currentSpent);

    // Calculo do SVG stroke-dashoffset (raio de 120 -> 2*PI*R = 753.98)
    const circumference = 753.98;
    const strokeDashoffset = Math.max(0, circumference - (Math.min(100, usedPercentage) / 100) * circumference);

    const handleConfirm = () => {
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            navigate(-1);
        }, 2000);
    };

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pb-6 overflow-x-hidden selection:bg-primary/30">
            <div className="flex flex-col flex-1 mx-auto w-full max-w-md">
                {/* Header */}
                <header className="flex items-center justify-between p-6 pt-8 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-off-white/60 hover:text-off-white transition-colors active:scale-95 absolute left-6 p-2 rounded-full hover:bg-white/5"
                    >
                        <span className="material-symbols-outlined text-[28px]">arrow_back_ios</span>
                    </button>
                    <h1 className="text-lg font-bold text-slate-100 flex-1 text-center font-display">
                        {budgetName}
                    </h1>
                </header>

                {/* Circular Gauge Section */}
                <section className="flex flex-col items-center px-6 mb-2 py-12">
                    <div className="relative w-[260px] h-[260px] mb-6">
                        <svg height="260" viewBox="0 0 260 260" width="260" className="-rotate-90">
                            <defs>
                                <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                                    <feGaussianBlur result="blur" stdDeviation="4"></feGaussianBlur>
                                    <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                                </filter>
                            </defs>
                            <circle cx="130" cy="130" fill="transparent" r="120" stroke="#1A1A1A" strokeWidth="2"></circle>
                            <circle
                                cx="130" cy="130" fill="transparent" filter="url(#glow)" r="120"
                                stroke="#0FB67F"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                strokeWidth="3"
                                className="transition-all duration-500 ease-out"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#71717A] mb-1">{budgetName}</span>
                            <span className="text-5xl text-slate-100 font-extralight">{usedPercentage}%</span>
                            <span className="text-primary text-sm mt-2 font-light">R$ {currentSpent.toLocaleString('pt-BR')} / {limit.toLocaleString('pt-BR')}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-slate-100 text-xl font-bold">Limite Mensal</h2>
                        <p className="text-[#71717A] text-sm mt-1">Defina o quanto deseja gastar nesta categoria</p>
                    </div>
                </section>

                {/* Category Adjustments */}
                <main className="flex-1 px-6 py-4 space-y-8">
                    <div className="flex flex-col items-center justify-center space-y-8 py-10">
                        <div className="text-center">
                            <span className="text-[#71717A] text-sm block mb-2 font-medium">Valor do Limite</span>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-2xl font-bold text-primary">R$</span>
                                <input
                                    className="bg-transparent border-none text-5xl text-slate-100 focus:ring-0 p-0 w-48 text-center font-extralight"
                                    type="number"
                                    value={limit}
                                    onChange={(e) => setLimit(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="w-full px-4">
                            <div className="flex justify-between text-xs text-[#71717A] mb-4">
                                <span>R$ 0</span>
                                <span>R$ {totalGlobal.toLocaleString('pt-BR')}</span>
                            </div>
                            <input
                                className="w-full h-1.5 bg-highlight rounded-full appearance-none cursor-pointer glow-slider accent-primary outline-none"
                                max={totalGlobal}
                                min="0"
                                step="50"
                                type="range"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                            />
                            <p className="text-center text-primary text-xs mt-6 font-bold uppercase tracking-wider">
                                {percentageOfTotal}% do seu orçamento total
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-transparent p-4 rounded-xl border border-highlight/50">
                                <p className="text-[#71717A] text-[10px] uppercase mb-1 font-medium tracking-wider">Gasto Atual</p>
                                <p className="text-slate-100 font-semibold text-sm">R$ {currentSpent.toLocaleString('pt-BR')}</p>
                            </div>
                            <div className="bg-transparent p-4 rounded-xl border border-highlight/50">
                                <p className="text-[#71717A] text-[10px] uppercase mb-1 font-medium tracking-wider">Disponível</p>
                                <p className="text-primary font-semibold text-sm">R$ {available.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Action Button */}
                <footer className="p-6">
                    <button
                        onClick={handleConfirm}
                        className="w-full py-3 bg-transparent border border-primary text-slate-100 font-bold hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2 rounded-full"
                    >
                        <span>CONFIRMAR ALTERAÇÕES</span>
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </button>
                </footer>
            </div>

            {/* Success Modal Simulation */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                    <div className="w-full max-w-[320px] glow-border border-primary rounded-[32px] bg-black/80 p-10 flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-primary text-[80px] font-light neon-text-glow mb-6 leading-none">
                            check_circle
                        </span>
                        <h2 className="text-white font-black text-[16px] tracking-[0.2em] uppercase mb-4">
                            Orçamento Atualizado!
                        </h2>
                        <p className="text-light-gray text-xs leading-relaxed mb-6">
                            Seus limites foram ajustados com sucesso.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
