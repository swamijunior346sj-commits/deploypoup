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
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8 selection:bg-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg space-y-12 text-center"
            >
                <div>
                    <span className="px-4 py-1.5 bg-primary/20 border border-primary/40 text-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6 inline-block animate-pulse">
                        OPORTUNIDADE ÚNICA: UPGRADE
                    </span>
                    <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-none mb-6">
                        Domine o <br />Próximo Nível
                    </h1>
                    <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest max-w-sm mx-auto">
                        Adicione a Mentoria Individual com o Fundador e economize <span className="text-primary italic">R$ 500,00</span> na aquisição hoje.
                    </p>
                </div>

                <div className="transparent-card-border rounded-[3.5rem] p-10 bg-zinc-950 border-primary/20 shadow-[0_0_50px_rgba(15,182,127,0.1)] relative group">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-50"></div>
                    <img
                        src="https://images.unsplash.com/photo-1521791136364-798a7bc0d26c?auto=format&fit=crop&q=80&w=400"
                        className="w-32 h-32 rounded-3xl mx-auto mb-8 object-cover border-2 border-primary shadow-2xl group-hover:scale-110 transition-transform"
                        alt="Mentoria"
                    />
                    <div className="space-y-2 mb-8">
                        <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Mentoria Individual POUP</h4>
                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">Sua independência financeira em alta velocidade.</p>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-zinc-600 line-through">De R$ 2.997,00</span>
                        <span className="text-4xl font-black italic text-white premium-text-glow">R$ 2.497,00</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleAccept}
                        className="w-full py-6 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all"
                    >
                        SIM, ADICIONAR AO PROTOCOLO
                    </button>
                    <button
                        onClick={() => navigate('/downsell')}
                        className="w-full py-4 text-[10px] text-zinc-600 font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                        Não, prosseguir com a ordem atual
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
