import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<{ id: string, title: string, price: number, quantity: number, image: string, author: string, type: string }[]>(() => {
        const saved = localStorage.getItem('poup_cart');
        return saved ? JSON.parse(saved) : [];
    });

    const recommendations = allProducts.filter(p => !cartItems.find(item => item.id === p.id)).slice(0, 3);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal;

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => {
            const next = prev.map(item => {
                if (item.id === id) {
                    const newQty = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            }).filter(item => item.quantity > 0);
            localStorage.setItem('poup_cart', JSON.stringify(next));
            return next;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('poup_cart');
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* Background Aura */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <Header title="Carrinho de Elite" showBack />

            <main className="flex-grow px-6 pt-8 pb-48 space-y-12 relative z-10 overflow-y-auto no-scrollbar">

                {cartItems.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Protocolos em Ordem</h3>
                            <button onClick={clearCart} className="text-[9px] font-black text-red-500/60 uppercase tracking-widest hover:text-red-500 transition-colors">Limpar Terminal</button>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="flex gap-5 p-6 rounded-[2.5rem] bg-zinc-950/40 border border-white/5 relative group"
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0 group-hover:border-primary/30 transition-all">
                                            <img src={item.image} className="w-full h-full object-cover opacity-80" alt={item.title} />
                                        </div>
                                        <div className="flex flex-col justify-between flex-1 min-w-0">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[8px] font-black text-primary uppercase tracking-widest">{item.type}</span>
                                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">• {item.author}</span>
                                                </div>
                                                <h4 className="text-sm font-black text-white italic uppercase tracking-tight truncate leading-none">{item.title}</h4>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-lg font-black italic text-white premium-text-glow leading-none">
                                                    R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>

                                                <div className="flex items-center gap-4 bg-white/5 rounded-2xl px-3 py-1.5 border border-white/5 shadow-inner">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-500 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[18px] font-black">remove</span>
                                                    </button>
                                                    <span className="text-xs font-black italic w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-500 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[18px] font-black">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Card */}
                        <div className="bg-gradient-to-br from-zinc-900/60 to-black border border-white/10 rounded-[3rem] p-10 space-y-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <span className="material-symbols-outlined text-6xl">receipt_long</span>
                            </div>

                            <div className="space-y-3 relative z-10">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                    <span>Valor Base</span>
                                    <span className="text-white">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                    <span>Taxa de Processamento</span>
                                    <span className="text-primary italic">PROTOCOLO ZERO</span>
                                </div>
                                <div className="h-px bg-white/5 my-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Liquidação Final</span>
                                        <span className="text-4xl font-black italic text-white premium-text-glow leading-none">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-primary/20 text-primary text-[9px] font-black px-3 py-1 rounded-full border border-primary/20">
                                            + {Math.round(total / 5)} XP
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations Section (ML Style) */}
                        <section className="space-y-6">
                            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">Pode turbinar seus resultados</h3>
                            <div className="flex overflow-x-auto no-scrollbar gap-4 px-2">
                                {recommendations.map(prod => (
                                    <div
                                        key={prod.id}
                                        onClick={() => navigate(`/product-details/${prod.id}`)}
                                        className="w-40 shrink-0 bg-white/5 border border-white/5 rounded-3xl p-4 space-y-3 hover:border-primary/30 transition-all cursor-pointer"
                                    >
                                        <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900">
                                            <img src={prod.image} className="w-full h-full object-cover opacity-70" alt={prod.title} />
                                        </div>
                                        <div>
                                            <h4 className="text-[9px] font-black text-white uppercase italic truncate">{prod.title}</h4>
                                            <p className="text-[10px] font-black text-primary mt-1">{prod.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center relative"
                        >
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                            <span className="material-symbols-outlined text-zinc-800 text-6xl relative z-10">shopping_cart_off</span>
                        </motion.div>
                        <div className="space-y-3 px-8">
                            <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">Terminal Vazio</h2>
                            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed max-w-xs mx-auto opacity-60">Sua ordem de aquisição não possui protocolos ativos. Explore nossa base de conhecimento de elite.</p>
                        </div>
                        <button
                            onClick={() => navigate('/shop')}
                            className="px-12 py-5 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-105 shadow-[0_15px_30px_rgba(15,182,127,0.3)]"
                        >
                            ACESSAR MARKETPLACE
                        </button>
                    </div>
                )}
            </main>

            {/* Bottom Action (Fixed) */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-8 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-[160] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 border-luxury"
                    >
                        <span className="material-symbols-outlined font-black">shopping_bag</span>
                        FINALIZAR ORDEM
                    </button>
                    <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em] text-center mt-4">Processamento via rede segura POUP Intelligence</p>
                </div>
            )}
        </div>
    );
}
