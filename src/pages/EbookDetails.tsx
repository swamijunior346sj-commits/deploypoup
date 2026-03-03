import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ebooksData } from './Ebooks';

export default function EbookDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const ebook = ebooksData.find(e => e.id === id);
    const [showSuccess, setShowSuccess] = useState(false);

    if (!ebook) {
        return (
            <div className="bg-background-dark min-h-screen flex items-center justify-center text-off-white">
                <p>E-Book não encontrado.</p>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 border border-primary text-primary rounded-xl">Voltar</button>
            </div>
        );
    }

    const handlePurchase = () => {
        // Simulando fluxo de compra
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
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 active:scale-95 transition-all text-white pointer-events-auto"
                >
                    <span className="material-symbols-outlined text-lg">favorite_border</span>
                </button>
            </div>

            {/* Hero Cover Component */}
            <div className="relative w-full h-[400px] flex justify-center pt-24 pb-8 bg-gradient-to-b from-surface via-background-dark to-background-dark border-b border-white/5">
                {/* Background image reflection mask */}
                <div className="absolute inset-0 overflow-hidden opacity-20 blur-3xl mix-blend-screen">
                    <img src={ebook.coverUrl} className="w-full h-full object-cover scale-150" alt="blur-bg" />
                </div>

                {/* Cover Frame */}
                <div className="relative z-10 w-48 h-[280px] rounded-lg shadow-2xl shadow-black/80 ring-1 ring-white/10 overflow-hidden glow-border">
                    <img src={ebook.coverUrl} className="w-full h-full object-cover" alt={ebook.title} />
                    {ebook.tag && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] rounded shadow-[0_0_15px_rgba(15,182,127,0.5)]">
                            {ebook.tag}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Details */}
            <main className="px-6 relative z-20 -mt-6">
                <div className="flex flex-col mb-8">
                    <h1 className="text-2xl font-bold text-white leading-tight font-display tracking-tight text-center">{ebook.title}</h1>
                    <p className="text-light-gray text-xs mt-2 text-center">{ebook.author}</p>

                    <div className="flex items-center justify-center gap-4 mt-5">
                        <div className="flex items-center gap-1">
                            <span className="text-white font-bold text-sm tracking-wide">{ebook.rating}</span>
                            <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                            <span className="text-xs text-light-gray opacity-60">({ebook.reviews})</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-light-gray/30"></div>
                        <div className="flex items-center gap-1.5 opacity-80">
                            <span className="material-symbols-outlined text-light-gray text-sm">book</span>
                            <span className="text-xs text-light-gray">{ebook.pages} Páginas</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-light-gray/30"></div>
                        <div className="flex items-center gap-1.5 opacity-80">
                            <span className="material-symbols-outlined text-light-gray text-sm">calendar_month</span>
                            <span className="text-xs text-light-gray">{ebook.published}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-white/5 my-8"></div>

                <div className="mb-8">
                    <h3 className="text-white text-base font-bold mb-3 uppercase tracking-wider text-[11px] opacity-60">Descrição</h3>
                    <p className="text-light-gray text-sm leading-relaxed font-light opacity-90">{ebook.description}</p>
                </div>

                {/* Additional Features List */}
                <div className="space-y-3 mb-12">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/5">
                        <span className="material-symbols-outlined text-primary text-xl">verified</span>
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-wide">Acesso Vitalício</h4>
                            <p className="text-[#a7a7a7] text-[10px] mt-0.5">Leia quando e onde quiser, para sempre.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/5">
                        <span className="material-symbols-outlined text-primary text-xl">devices</span>
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-wide">Multiplataforma</h4>
                            <p className="text-[#a7a7a7] text-[10px] mt-0.5">Disponível no app, tablet e desktop.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Action Buy Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent z-[90]">
                <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-light-gray uppercase tracking-widest font-semibold mb-0.5">Valor Único</span>
                        <span className="text-2xl font-bold text-white tracking-tight">{ebook.price}</span>
                    </div>
                    <button
                        onClick={handlePurchase}
                        className="flex-1 py-4 font-black rounded-2xl text-xs uppercase tracking-[0.2em] bg-primary text-black shadow-[0_15px_30px_rgba(15,182,127,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Adquirir Agora
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
                            Compra Realizada!
                        </h2>
                        <p className="text-light-gray text-xs leading-relaxed mb-6">
                            O e-book foi adicionado à sua biblioteca com sucesso.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
