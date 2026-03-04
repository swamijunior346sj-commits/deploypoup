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
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8 selection:bg-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg space-y-12 text-center"
            >
                <div>
                    <span className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/40 text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6 inline-block">
                        ESPERE! UMA ÚLTIMA OFERTA
                    </span>
                    <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-none mb-6">
                        Biblioteca <br />de Fundações
                    </h1>
                    <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest max-w-sm mx-auto">
                        Leve o best-seller físico <span className="text-orange-500 italic">"A Jornada do Investidor"</span> por apenas R$ 59,90.
                    </p>
                </div>

                <div className="transparent-card-border rounded-[3.5rem] p-10 bg-zinc-950 border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.1)] relative group">
                    <img
                        src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400"
                        className="w-40 h-56 rounded-xl mx-auto mb-8 object-cover border-2 border-orange-500 shadow-2xl group-hover:scale-110 transition-transform shadow-orange-500/20"
                        alt="Livro"
                    />

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-zinc-600 line-through">De R$ 89,90</span>
                        <span className="text-4xl font-black italic text-white premium-text-glow">R$ 59,90</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleAccept}
                        className="w-full py-6 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(249,115,22,0.3)] active:scale-95 transition-all"
                    >
                        ADICIONAR LIVRO À ORDEM
                    </button>
                    <button
                        onClick={() => navigate('/payment')}
                        className="w-full py-4 text-[10px] text-zinc-600 font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Não, prosseguir com a ordem original
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
