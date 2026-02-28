import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="bg-background-dark text-white font-display min-h-screen flex flex-col">
            {/* ======================== STEP 1 ======================== */}
            {step === 1 && (
                <>
                    <header className="flex items-center justify-between p-6">
                        <button onClick={() => navigate(-1)} className="text-white flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors active:scale-95">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <div className="text-primary font-bold text-lg tracking-tight">POUP</div>
                        <div className="w-10"></div>
                    </header>

                    <main className="flex-1 flex flex-col items-center px-6">
                        {/* Hero Illustration */}
                        <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center my-8">
                            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#042017]/40 blur-[40px] rounded-full"></div>
                            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center bg-gradient-to-br from-[#042017] to-black border border-primary/20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <span className="material-symbols-outlined text-[120px] text-primary drop-shadow-[0_0_15px_rgba(15,182,127,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                            trending_up
                                        </span>
                                        <div className="absolute -top-4 -right-4 bg-primary text-black p-2 rounded-xl shadow-lg">
                                            <span className="material-symbols-outlined text-sm font-bold">payments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 right-0 bg-background-dark border border-primary/30 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                </div>
                                <div>
                                    <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">IA Insight</div>
                                    <div className="text-sm font-bold">+24% Savings</div>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center mt-8 max-w-sm">
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#FCFCFC] mb-4">
                                Sua Jornada para a Liberdade Financeira
                            </h1>
                            <p className="text-base font-normal leading-relaxed text-[#D6D6D6] px-2">
                                Controle gastos, invista com inteligência e conquiste suas metas com o poder da nossa IA.
                            </p>
                        </div>

                        {/* Progress Indicators */}
                        <div className="flex items-center justify-center gap-2 mt-10">
                            <div className="h-1.5 w-6 rounded-full bg-primary transition-all"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-[#A7A7A7]"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-[#A7A7A7]"></div>
                        </div>
                    </main>

                    <footer className="p-6 pb-10 flex flex-col items-center gap-6">
                        <button
                            onClick={handleNext}
                            className="w-full bg-primary hover:bg-primary/90 text-black font-extrabold py-5 rounded-full text-sm tracking-[1px] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                        >
                            PRÓXIMO
                        </button>
                    </footer>
                </>
            )}

            {/* ======================== STEP 2 ======================== */}
            {step === 2 && (
                <>
                    {/* Header / Skip */}
                    <div className="flex items-center p-6 justify-end">
                        <button onClick={() => navigate('/dashboard')} className="text-[#A7A7A7] text-sm font-bold tracking-wider uppercase">Pular</button>
                    </div>

                    {/* Central Visualization */}
                    <main className="flex-1 flex flex-col items-center justify-center px-6">
                        <div className="relative w-full aspect-square max-w-[280px] mb-8 flex items-center justify-center">
                            {/* Abstract AI Brain/Network Visualization */}
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="relative w-full h-full rounded-full border border-primary/20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#042017] to-background-dark">
                                <span className="material-symbols-outlined text-primary text-8xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 200" }}>
                                    neurology
                                </span>
                                {/* Decorative nodes */}
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary/60 rounded-full animate-pulse"></div>
                                <div className="absolute top-1/2 right-10 w-2 h-2 bg-primary/40 rounded-full"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="text-center mb-8">
                            <h1 className="text-[#FCFCFC] text-3xl font-extrabold leading-tight mb-4 px-2">
                                Inteligência que trabalha para você
                            </h1>
                            <p className="text-[#D6D6D6] text-base font-normal leading-relaxed px-4">
                                Receba insights automáticos, alertas de excessos e sugestões reais de economia todos os dias.
                            </p>
                        </div>

                        {/* IA Alert Card */}
                        <div className="w-full p-1 bg-gradient-to-r from-primary/30 to-transparent rounded-xl">
                            <div className="flex items-center gap-4 rounded-xl bg-[#0D0E10] p-5 shadow-xl border border-primary/10">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <span className="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-primary text-xs font-bold uppercase tracking-widest">IA Insight</p>
                                    <p className="text-primary text-lg font-bold leading-tight">Economia detectada: R$ 150/mês</p>
                                    <p className="text-zinc-400 text-xs font-medium">Baseado no seu perfil de consumo</p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Footer Navigation */}
                    <div className="p-8 flex flex-col gap-8">
                        {/* Step Indicator */}
                        <div className="flex justify-center gap-2">
                            <div className="h-1.5 w-4 rounded-full bg-zinc-700"></div>
                            <div className="h-1.5 w-8 rounded-full bg-primary"></div>
                            <div className="h-1.5 w-4 rounded-full bg-zinc-700"></div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button onClick={() => setStep(1)} className="text-[#A7A7A7] font-bold text-sm tracking-widest uppercase py-3 px-4 active:scale-95 transition-transform">
                                Anterior
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-primary hover:bg-primary/90 text-background-dark font-extrabold text-sm tracking-widest uppercase py-4 px-10 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-95"
                            >
                                Próximo
                            </button>
                        </div>
                    </div>

                    {/* iOS Home Indicator */}
                    <div className="flex justify-center pb-2">
                        <div className="h-1.5 w-32 rounded-full bg-zinc-800"></div>
                    </div>
                </>
            )}

            {/* ======================== STEP 3 ======================== */}
            {step === 3 && (
                <div className="relative flex flex-col flex-1 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center p-4 pb-2 justify-between">
                        <button onClick={() => setStep(2)} className="text-white flex size-12 shrink-0 items-center cursor-pointer active:scale-95 transition-transform">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Onboarding</h2>
                    </div>

                    {/* Progress Indicator (Step 3 of 3) */}
                    <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
                        <div className="h-1.5 w-8 rounded-full bg-primary/20"></div>
                        <div className="h-1.5 w-8 rounded-full bg-primary/20"></div>
                        <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_8px_rgba(15,182,127,0.6)]"></div>
                    </div>

                    {/* Visual Gamification Area */}
                    <div className="px-6 py-4 flex flex-col gap-8 flex-grow overflow-y-auto no-scrollbar">
                        {/* Badges Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-[#0D0E10] border border-primary/30 rounded-full flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(15, 182, 127, 0.2)' }}>
                                    <span className="material-symbols-outlined text-primary text-4xl">workspace_premium</span>
                                </div>
                                <span className="text-xs font-medium text-[#D6D6D6]">Mestre</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-[#0D0E10] border border-primary/10 rounded-full flex items-center justify-center opacity-80">
                                    <span className="material-symbols-outlined text-primary/40 text-4xl">military_tech</span>
                                </div>
                                <span className="text-xs font-medium text-[#D6D6D6]/50">Elite</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-[#0D0E10] border border-primary/10 rounded-full flex items-center justify-center opacity-80">
                                    <span className="material-symbols-outlined text-primary/40 text-4xl">rewarded_ads</span>
                                </div>
                                <span className="text-xs font-medium text-[#D6D6D6]/50">Expert</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <h1 className="text-white tracking-tight text-3xl font-extrabold leading-tight text-center">
                                Transforme Finanças em Conquistas
                            </h1>
                            <p className="text-[#D6D6D6] text-base font-normal leading-relaxed text-center px-4">
                                Ganhe XP, suba de nível e desbloqueie medalhas exclusivas enquanto organiza sua vida financeira.
                            </p>
                        </div>

                        {/* Gamified Card */}
                        <div className="bg-[#0D0E10] border border-primary/10 rounded-xl p-5 shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Missão Diária</span>
                                    <span className="text-lg font-bold text-white">Registrar Gasto Mensal</span>
                                </div>
                                <div className="h-10 w-10 bg-[#096D4B]/20 rounded-full flex items-center justify-center border border-[#096D4B]/40">
                                    <span className="material-symbols-outlined text-primary font-bold">check</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-[#D6D6D6] mb-1">
                                    <span>Progresso de Nível</span>
                                    <span className="text-primary font-bold">850 / 1000 XP</span>
                                </div>
                                <div className="w-full bg-zinc-800 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(15,182,127,0.4)]" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Decoration (Mock XP floaters) */}
                        <div className="relative h-12 flex justify-center gap-4 opacity-40">
                            <div className="flex items-center gap-1 text-primary animate-pulse">
                                <span className="material-symbols-outlined text-sm">bolt</span>
                                <span className="text-xs font-bold">+50 XP</span>
                            </div>
                            <div className="flex items-center gap-1 text-primary animate-pulse" style={{ animationDelay: '1s' }}>
                                <span className="material-symbols-outlined text-sm">stars</span>
                                <span className="text-xs font-bold">LEVEL UP</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
                        <button
                            onClick={handleNext}
                            className="w-full bg-primary text-black font-extrabold py-4 rounded-xl text-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-tight shadow-[0_8px_30px_rgb(15,182,127,0.3)]"
                        >
                            Começar
                        </button>
                        <p className="text-center text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.2em]">
                            Ao continuar você aceita nossos termos e condições
                        </p>
                    </div>

                    {/* Decorative Background Gradients */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none rounded-full"></div>
                </div>
            )}
        </div>
    );
}
