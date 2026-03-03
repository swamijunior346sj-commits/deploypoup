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
        const saved = localStorage.getItem('poup_cart');
        let cart = saved ? JSON.parse(saved) : [];
        if (!cart.find((item: any) => item.id === mentorship.id)) {
            const priceVal = mentorship.price === 'Grátis' ? 0 : parseFloat(mentorship.price.replace('R$', '').replace('.', '').replace(',', '.').trim());
            cart.push({
                ...mentorship,
                price: priceVal,
                image: mentorship.coverUrl,
                quantity: 1
            });
            localStorage.setItem('poup_cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
            navigate('/cart');
        } else {
            navigate('/cart');
        }
    };

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pb-48 overflow-x-hidden selection:bg-primary/30 relative">
            <style>{`
                @keyframes levitate {
                    0% { transform: translateY(0px) translateX(-50%); }
                    50% { transform: translateY(-10px) translateX(-50%); }
                    100% { transform: translateY(0px) translateX(-50%); }
                }
                .levitate-btn {
                    animation: levitate 3s ease-in-out infinite;
                }
            `}</style>

            {/* Header Navigation Floating */}
            <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95 text-white pointer-events-auto"
                >
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
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
                    <p className="text-light-gray text-sm leading-relaxed font-light opacity-90">{(mentorship as any).description || 'Aprimore suas estratégias financeiras com acompanhamento individualizado de um especialista.'}</p>
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

            {/* Floating levitating checkout button */}
            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md z-[150] levitate-btn">
                <button
                    onClick={handleBooking}
                    className="w-full flex items-center justify-between p-2 pl-6 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] active:scale-95 transition-all group"
                >
                    <div className="flex flex-col items-start px-2">
                        <span className="text-[10px] text-zinc-500 uppercase font-black tracking-tighter">Investimento</span>
                        <span className="text-xl font-black text-white tracking-tight">{mentorship.price}</span>
                    </div>
                    <div className="h-14 px-8 bg-primary rounded-[20px] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(15,182,127,0.3)]">
                        <span className="text-black text-[11px] font-black uppercase tracking-[0.15em]">Adicionar ao carrinho</span>
                        <span className="material-symbols-outlined text-black text-sm font-bold">shopping_cart</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
