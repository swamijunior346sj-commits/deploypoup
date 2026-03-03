import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { coursesData } from './Courses';

export default function CourseDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = coursesData.find(c => c.id === id);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!course) {
        return (
            <div className="bg-background-dark min-h-screen flex items-center justify-center text-off-white">
                <p>Curso não encontrado.</p>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 border border-primary text-primary rounded-xl">Voltar</button>
            </div>
        );
    }

    const handlePurchase = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pb-32 overflow-x-hidden selection:bg-primary/30 relative">
            {/* Header Navigation Floating */}
            <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95 text-white pointer-events-auto"
                >
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 active:scale-95 transition-all text-white pointer-events-auto"
                >
                    <span className="material-symbols-outlined text-lg">share</span>
                </button>
            </div>

            {/* Video Hero component */}
            <div className="relative w-full aspect-video flex justify-center items-center bg-black">
                <div className="absolute inset-0">
                    <img src={course.coverUrl} className="w-full h-full object-cover opacity-60" alt={course.title} />
                </div>
                {/* Play Button Overlay */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-primary/40 transition-all glow-border">
                    <span className="material-symbols-outlined text-primary text-4xl ml-1">play_arrow</span>
                </div>

                {/* Gradient bottom mask */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-dark to-transparent"></div>
            </div>

            {/* Content Details */}
            <main className="px-6 relative z-20 mt-4">
                <div className="flex flex-col mb-8">
                    {course.tag && (
                        <div className="self-start px-2 py-1 bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-[0.2em] rounded mb-3">
                            {course.tag}
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-white leading-tight font-display tracking-tight">{course.title}</h1>
                    <p className="text-light-gray text-xs mt-2">Prof. {course.author}</p>

                    <div className="flex items-center gap-4 mt-5">
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-sm tracking-wide">{course.rating}</span>
                            <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                            <span className="text-xs text-light-gray opacity-60">({course.reviews})</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-light-gray/30"></div>
                        <div className="flex items-center gap-1.5 opacity-80">
                            <span className="material-symbols-outlined text-light-gray text-sm">view_module</span>
                            <span className="text-xs text-light-gray">{course.modules} Módulos</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-light-gray/30"></div>
                        <div className="flex items-center gap-1.5 opacity-80">
                            <span className="material-symbols-outlined text-light-gray text-sm">schedule</span>
                            <span className="text-xs text-light-gray">{course.hours}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-white text-base font-bold mb-3 uppercase tracking-wider text-[11px] opacity-60">Sobre o Treinamento</h3>
                    <p className="text-light-gray text-sm leading-relaxed font-light opacity-90">{course.description}</p>
                </div>

                <div className="w-full h-px bg-white/5 my-8"></div>

                {/* Modules List Preview */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-base font-bold uppercase tracking-wider text-[11px] opacity-60">Conteúdo do Curso</h3>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Ver Completo</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/20 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center font-bold text-light-gray group-hover:text-primary transition-colors border border-white/5">01</div>
                            <div className="flex-1">
                                <h4 className="text-white text-sm font-bold">A Mente do Investidor</h4>
                                <span className="text-[10px] text-light-gray">4 Aulas • 1h 20m</span>
                            </div>
                            <span className="material-symbols-outlined text-light-gray/50 group-hover:text-primary transition-colors text-lg">lock_open</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/20 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center font-bold text-light-gray group-hover:text-primary transition-colors border border-white/5">02</div>
                            <div className="flex-1">
                                <h4 className="text-white text-sm font-bold">Fundamentos Macro</h4>
                                <span className="text-[10px] text-light-gray">6 Aulas • 2h 45m</span>
                            </div>
                            <span className="material-symbols-outlined text-light-gray/30 text-lg">lock</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-white/5 hover:border-primary/20 transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center font-bold text-light-gray group-hover:text-primary transition-colors border border-white/5">03</div>
                            <div className="flex-1">
                                <h4 className="text-white text-sm font-bold">Valuation Base</h4>
                                <span className="text-[10px] text-light-gray">8 Aulas • 4h 10m</span>
                            </div>
                            <span className="material-symbols-outlined text-light-gray/30 text-lg">lock</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Action Buy Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-[90]">
                <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-light-gray uppercase tracking-widest font-semibold mb-0.5">Acesso Imediato</span>
                        <span className="text-2xl font-bold text-white tracking-tight">{course.price}</span>
                    </div>
                    <button
                        onClick={handlePurchase}
                        className="flex-1 py-4 font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] bg-primary text-black shadow-[0_15px_30px_rgba(15,182,127,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Comprar Curso
                    </button>
                </div>
            </div>

            {/* Success Modal Simulation */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                    <div className="w-full max-w-[320px] glow-border border-primary rounded-[32px] bg-black/80 p-10 flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-primary text-[80px] font-light neon-text-glow mb-6 leading-none">
                            check_circle
                        </span>
                        <h2 className="text-white font-black text-[16px] tracking-[0.2em] uppercase mb-4">
                            Matrícula Confirmada!
                        </h2>
                        <p className="text-light-gray text-xs leading-relaxed mb-6">
                            Você já tem acesso ao primeiro módulo de {course.title}.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
