import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            navigate('/signup');
        }
    };

    const skipToStart = () => {
        navigate('/login');
    };

    return (
        <div className="bg-brand-bg min-h-screen text-brand-primaryText flex flex-col font-sans overflow-hidden">
            {/* Top Bar Navigation */}
            <div className="flex items-center justify-between p-6 z-10">
                <div className="flex items-center space-x-1">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-brand-interactive glow-interactive' : 'w-2 bg-brand-subtitle/30'
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={skipToStart}
                    className="text-brand-subtitle text-xs font-bold tracking-widest uppercase hover:text-brand-primaryText transition-colors"
                >
                    Pular
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                {step === 1 && (
                    <div className="flex flex-col items-center justify-center space-y-12 animate-[float_0.5s_ease-out]">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <div className="absolute inset-0 bg-brand-interactive/10 rounded-full blur-2xl animate-pulse-glow"></div>
                            <div className="relative z-10 w-48 h-48 bg-brand-selection/50 rounded-full border border-brand-interactive/20 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(15,182,127,0.3)] backdrop-blur-sm">
                                <span className="material-symbols-outlined text-8xl text-brand-interactive glow-interactive mb-4">
                                    trending_up
                                </span>
                                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-brand-interactive/20 to-transparent"></div>
                            </div>
                        </div>
                        <div className="text-center space-y-4 max-w-sm">
                            <h2 className="text-3xl font-display font-bold text-brand-primaryText">
                                Liberdade Financeira
                            </h2>
                            <p className="text-brand-subtitle text-sm leading-relaxed">
                                Alcance seus objetivos com a primeira plataforma que transforma sua gestão em uma jornada de crescimento real.
                            </p>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex flex-col items-center justify-center space-y-12 animate-[float_0.5s_ease-out]">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(9,109,75,0.3)_0%,_transparent_70%)]"></div>
                            <div className="relative z-10 w-48 h-48 bg-brand-indicatorBg rounded-full border border-brand-action/30 flex items-center justify-center shadow-[0_0_40px_rgba(4,32,23,0.8)] overflow-hidden">
                                <div className="absolute inset-0 bg-brand-action/10 transform rotate-45 scale-150 animate-slow-rotate"></div>
                                <span className="material-symbols-outlined text-8xl text-brand-interactive glow-interactive relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    smart_toy
                                </span>
                            </div>
                        </div>
                        <div className="text-center space-y-4 max-w-sm">
                            <h2 className="text-3xl font-display font-bold text-brand-primaryText">
                                Inteligência IA
                            </h2>
                            <p className="text-brand-subtitle text-sm leading-relaxed">
                                Nossa inteligência artificial trabalha por você, detectando oportunidades de economia e alertando sobre excessos.
                            </p>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center space-y-12 animate-[float_0.5s_ease-out]">
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            <div className="absolute inset-0 bg-brand-card/50 rounded-[3rem] rotate-12 blur-xl border border-white/5"></div>
                            <div className="relative z-10 w-48 h-48 bg-brand-card rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-interactive to-transparent opacity-50"></div>
                                <span className="material-symbols-outlined text-8xl text-brand-primaryText mb-4 drop-shadow-[0_0_15px_rgba(252,252,252,0.5)]">
                                    military_tech
                                </span>
                                <span className="absolute bottom-4 text-xs font-bold tracking-[0.2em] text-brand-interactive uppercase">Level Up</span>
                            </div>
                        </div>
                        <div className="text-center space-y-4 max-w-sm">
                            <h2 className="text-3xl font-display font-bold text-brand-primaryText">
                                Gamificação & Metas
                            </h2>
                            <p className="text-brand-subtitle text-sm leading-relaxed">
                                Ganhe XP, conquiste medalhas e suba no ranking enquanto constrói seu patrimônio de forma divertida.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pb-10 z-10">
                <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-2xl bg-brand-interactive text-brand-bg font-bold text-lg shadow-[0_0_20px_rgba(15,182,127,0.3)] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 touch-manipulation hover:bg-[#12c48a]"
                >
                    <span>{step === 3 ? 'Criar minha conta' : 'Continuar'}</span>
                    {step < 3 && <span className="material-symbols-outlined text-xl">arrow_right_alt</span>}
                </button>
            </div>
        </div>
    );
}
