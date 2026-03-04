import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Downsell() {
    const navigate = useNavigate();

    const handleAccept = () => {
        const saved = localStorage.getItem('poup_cart');
        let cart = saved ? JSON.parse(saved) : [];
        cart.push({
            id: 'pb1',
            title: 'A Jornada do Investidor',
            author: 'POUP Press',
            type: 'Livro Físico',
            price: 59.90, // Discounted from 89.90
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400'
        });
        localStorage.setItem('poup_cart', JSON.stringify(cart));
        navigate('/payment');
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8 selection:bg-primary/30 relative overflow-hidden font-display">
            {/* Background Animations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[50%] bg-orange-500/10 blur-[150px] rounded-full animate-slow-rotate"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-zinc-800/20 blur-[150px] rounded-full animate-slow-rotate animation-delay-2000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg space-y-10 text-center"
            >
                <div className="space-y-4">
                    <span className="px-6 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.5em] rounded-full inline-block">
                        Oferta de Resgate Final
                    </span>
                    <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-[0.8]">
                        FUNDAMENTOS DO <br /><span className="text-orange-500">SUCESSO</span>
                    </h1>
                    <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                        Não saia de mãos vazias. Obtenha nossa edição de luxo <span className="text-white">física</span> com desconto exclusivo.
                    </p>
                </div>

                {/* Offer Card */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-orange-500/20 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-zinc-950/80 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-3xl">

                        <div className="relative w-40 h-56 mx-auto mb-8 perspective-1000">
                            <motion.img
                                initial={{ rotateY: -20 }}
                                animate={{ rotateY: 10 }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400"
                                className="w-full h-full rounded-xl object-cover border-2 border-orange-500/50 shadow-[0_30px_60px_rgba(249,115,22,0.3)]"
                                alt="Livro"
                            />
                        </div>

                        <div className="space-y-3 mb-10">
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tight">A Jornada do Investidor</h4>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">O guia físico definitivo para o mercado</p>
                            <div className="flex items-center justify-center gap-2 text-primary">
                                <span className="material-symbols-outlined text-sm">local_shipping</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.3em]">Frete Grátis incluso</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-zinc-600 line-through font-bold">DE R$ 89,90</span>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-black italic text-white premium-text-glow">R$ 59,90</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <button
                        onClick={handleAccept}
                        className="w-full py-6 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_20px_40px_rgba(249,115,22,0.4)] active:scale-95 transition-all hover:shadow-orange-500/60"
                    >
                        ADICIONAR AO PROTOCOLO
                    </button>
                    <button
                        onClick={() => navigate('/payment')}
                        className="w-full py-4 text-[10px] text-zinc-600 font-black uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        NÃO OBRIGADO, FINALIZAR ORDEM <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
