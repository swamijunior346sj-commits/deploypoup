import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);

    const product = useMemo(() => allProducts.find(p => p.id === id), [id]);

    if (!product) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-zinc-800 mb-4">error</span>
                <h1 className="text-xl font-black uppercase tracking-widest text-zinc-500">Produto não encontrado</h1>
                <button onClick={() => navigate('/shop')} className="mt-8 text-primary font-black uppercase tracking-widest text-xs">Voltar para a Loja</button>
            </div>
        );
    }

    const addToCart = () => {
        const saved = localStorage.getItem('poup_cart');
        let cart = saved ? JSON.parse(saved) : [];
        if (!cart.find((item: any) => item.id === product.id)) {
            const priceVal = parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0;
            cart.push({ ...product, price: priceVal, quantity: 1 });
            localStorage.setItem('poup_cart', JSON.stringify(cart));
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } else {
            navigate('/cart');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Detalhes do Produto" showBack />

            <main className="flex-grow px-6 pt-8 pb-40 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Image Hero ── */}
                <div className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl group">
                    <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[2s]" alt={product.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                    {product.tag && (
                        <div className="absolute top-8 left-8 z-20">
                            <span className="px-4 py-1.5 bg-primary text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-full shadow-[0_10px_20px_rgba(15,182,127,0.4)]">
                                {product.tag}
                            </span>
                        </div>
                    )}
                </div>

                {/* ── Info Section ── */}
                <div className="space-y-8">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">{product.type}</span>
                            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">{product.author}</span>
                        </div>
                        <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-none">
                            {product.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-8 py-6 border-y border-white/5">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Avaliação</span>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-primary filled">star</span>
                                <span className="text-sm font-black italic">{product.rating}</span>
                                <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tight">({product.reviews})</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Conteúdo</span>
                            <span className="text-sm font-black italic text-white">
                                {product.pages} {product.type === 'E-Book' ? 'Páginas' : product.type === 'Curso' ? 'Aulas' : 'Protocolo'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Sobre este Protocolo</h3>
                        <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
                            {product.description}
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col gap-2">
                            <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-tight">Suporte Prioritário 24/7</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex flex-col gap-2">
                            <span className="material-symbols-outlined text-blue-500 text-xl">update</span>
                            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-tight">Atualizações Vitalícias</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Buy Section ── */}
            <div className="fixed bottom-0 left-0 right-0 p-8 glass-nav z-[160] flex items-center justify-between gap-6 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Investimento Alvo</span>
                    <span className="text-3xl font-black italic text-white premium-text-glow leading-none">{product.price}</span>
                </div>
                <button
                    onClick={addToCart}
                    className="flex-1 py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <AnimatePresence mode="wait">
                        {added ? (
                            <motion.span
                                key="added"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined font-black">check</span>
                                ADICIONADO
                            </motion.span>
                        ) : (
                            <motion.span
                                key="buy"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined font-black">bolt</span>
                                ADQUIRIR AGORA
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </div>
    );
}
