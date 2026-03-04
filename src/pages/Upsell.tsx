import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Upsell() {
    const navigate = useNavigate();

    const handleAccept = () => {
        const saved = localStorage.getItem('poup_cart');
        let cart = saved ? JSON.parse(saved) : [];
        cart.push({
            id: '11',
            title: 'Individual: 1 Mi',
            author: 'Founder POUP',
            type: 'Mentoria',
            price: 2497.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d26c?auto=format&fit=crop&q=80&w=400'
        });
        localStorage.setItem('poup_cart', JSON.stringify(cart));
        navigate('/payment');
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8 selection:bg-primary/30 relative overflow-hidden font-display">
            {/* Background Animations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-slow-rotate"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full animate-slow-rotate animation-delay-2000"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg space-y-10 text-center"
            >
                <div className="space-y-4">
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-6 py-2 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.5em] rounded-full inline-block"
                    >
                        Protocolo de Upgrade Ativado
                    </motion.span>
                    <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-[0.8]">
                        EXPANDA SUA <br /><span className="text-primary">INTELIGÊNCIA</span>
                    </h1>
                    <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                        Acesso exclusivo à Mentoria Individual. <br />Acelere seu primeiro milhão em <span className="text-white italic">10x</span>.
                    </p>
                </div>

                {/* Offer Card */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-zinc-950/80 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-3xl overflow-hidden">
                        <div className="absolute top-0 right-0 p-6">
                            <span className="material-symbols-outlined text-primary text-4xl animate-pulse-neon">workspace_premium</span>
                        </div>

                        <div className="relative w-40 h-40 mx-auto mb-8">
                            <div className="absolute inset-0 bg-primary opacity-20 blur-2xl rounded-full"></div>
                            <img
                                src="https://images.unsplash.com/photo-1521791136364-798a7bc0d26c?auto=format&fit=crop&q=80&w=400"
                                className="relative w-full h-full rounded-[2.5rem] object-cover border-2 border-primary shadow-2xl group-hover:scale-105 transition-transform duration-700"
                                alt="Mentoria"
                            />
                        </div>

                        <div className="space-y-3 mb-10">
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tight">Mentoria Individual VIP</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                                <span className="bg-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-zinc-400">4 Encontros</span>
                                <span className="bg-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-zinc-400">Suporte 24/7</span>
                                <span className="bg-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-zinc-400">Networking</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm text-zinc-600 line-through font-bold">DE R$ 2.997,00</span>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] bg-red-500 text-white font-black px-2 py-1 rounded uppercase tracking-widest italic animate-bounce">- R$ 500,00</span>
                                <span className="text-4xl font-black italic text-white premium-text-glow">R$ 2.497,00</span>
                            </div>
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Oferta válida apenas agora</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <button
                        onClick={handleAccept}
                        className="w-full py-6 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-95 transition-all hover:neon-glow-sm"
                    >
                        UPGRADE AGORA
                    </button>
                    <button
                        onClick={() => navigate('/downsell')}
                        className="w-full py-4 text-[10px] text-zinc-600 font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        DISPENSAR OPORTUNIDADE <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
