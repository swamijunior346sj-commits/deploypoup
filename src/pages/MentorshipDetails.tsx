import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mentorshipsData } from './Mentorships';

export default function MentorshipDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const mentorship = mentorshipsData.find(m => m.id === id);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!mentorship) {
        return (
            <div className="bg-background-dark min-h-screen flex items-center justify-center text-off-white">
                <p>Mentoria não encontrada.</p>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 border border-primary text-primary rounded-xl">Voltar</button>
            </div>
        );
    }

    const handleBooking = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pb-32 overflow-x-hidden selection:bg-primary/30 relative">
            {/* Header Navigation Floating */}
            <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 active:scale-95 transition-all text-white pointer-events-auto"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <div className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest pointer-events-auto">
                    {mentorship.category}
                </div>
            </div>

            {/* Profile Hero Component */}
            <div className="relative w-full pt-28 pb-10 flex flex-col items-center bg-gradient-to-b from-surface via-background-dark to-background-dark border-b border-white/5">
                <div className="absolute inset-0 overflow-hidden opacity-20 blur-3xl mix-blend-screen">
                    <img src={mentorship.coverUrl} className="w-full h-full object-cover scale-150" alt="blur-bg" />
                </div>

                <div className="relative z-10 w-32 h-32 rounded-full ring-4 ring-primary/20 p-1 mb-4 glow-border">
                    <img src={mentorship.coverUrl} className="w-full h-full object-cover rounded-full" alt={mentorship.author} />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-background-dark flex items-center justify-center">
                        <span className="material-symbols-outlined text-black text-sm">verified</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-white leading-tight font-display tracking-tight text-center px-6 relative z-10">
                    {mentorship.title}
                </h1>
                <p className="text-light-gray text-xs mt-2 relative z-10 font-semibold text-primary">Com {mentorship.author}</p>

                <div className="flex items-center gap-4 mt-5 relative z-10">
                    <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-sm tracking-wide">{mentorship.rating}</span>
                        <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                        <span className="text-xs text-light-gray opacity-60">({mentorship.reviews})</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-light-gray/30"></div>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <span className="material-symbols-outlined text-light-gray text-sm">schedule</span>
                        <span className="text-xs text-light-gray">{mentorship.duration}</span>
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <main className="px-6 relative z-20 mt-6">
                <div className="mb-8">
                    <h3 className="text-white text-base font-bold mb-3 uppercase tracking-wider text-[11px] opacity-60">Objetivo da Sessão</h3>
                    <p className="text-light-gray text-sm leading-relaxed font-light opacity-90">{mentorship.description}</p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-transparent border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-primary text-2xl mb-2">video_camera_front</span>
                        <h4 className="text-white text-xs font-bold uppercase">100% Online</h4>
                        <p className="text-[#a7a7a7] text-[10px] mt-1">Via Google Meet</p>
                    </div>
                    <div className="bg-transparent border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <span className="material-symbols-outlined text-primary text-2xl mb-2">event_available</span>
                        <h4 className="text-white text-xs font-bold uppercase">Agenda Flex</h4>
                        <p className="text-[#a7a7a7] text-[10px] mt-1">Escolha o horário</p>
                    </div>
                </div>

                <div className="w-full h-px bg-white/5 my-8"></div>

                <div className="mb-10">
                    <h3 className="text-white text-base font-bold mb-4 uppercase tracking-wider text-[11px] opacity-60">Como Funciona</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 border border-primary/30">1</div>
                            <p className="text-sm text-light-gray leading-tight mt-0.5">Agende o dia e horário que for melhor para você via calendário exclusivo.</p>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 border border-primary/30">2</div>
                            <p className="text-sm text-light-gray leading-tight mt-0.5">Preencha um formulário rápido sobre seu perfil de investidor atual.</p>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 border border-primary/30">3</div>
                            <p className="text-sm text-light-gray leading-tight mt-0.5">Participe da chamada ao vivo e receba um plano de ação em PDF logo após.</p>
                        </li>
                    </ul>
                </div>
            </main>

            {/* Fixed Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-[90]">
                <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-light-gray uppercase tracking-widest font-semibold mb-0.5">Investimento</span>
                        <span className="text-2xl font-bold text-white tracking-tight">{mentorship.price}</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="flex-1 py-4 font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] bg-primary text-black shadow-[0_15px_30px_rgba(15,182,127,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Agendar Horário
                    </button>
                </div>
            </div>

            {/* Success Modal Simulation */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                    <div className="w-full max-w-[320px] glow-border border-primary rounded-[32px] bg-black/80 p-10 flex flex-col items-center text-center">
                        <span className="material-symbols-outlined text-primary text-[80px] font-light neon-text-glow mb-6 leading-none">
                            event_available
                        </span>
                        <h2 className="text-white font-black text-[16px] tracking-[0.2em] uppercase mb-4">
                            Pagamento Aprovado!
                        </h2>
                        <p className="text-light-gray text-xs leading-relaxed mb-6">
                            Sua assessoria está confirmada. Verifique o seu e-mail para acessar o calendário do especialista.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
