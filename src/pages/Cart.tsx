import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<{ id: string, title: string, price: number, quantity: number, image: string, author: string, type: string }[]>(() => {
        const saved = localStorage.getItem('poup_cart');
        return saved ? JSON.parse(saved) : [];
    });

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
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Meu Carrinho" showBack />

            <main className="flex-grow px-6 pt-8 pb-48 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                {cartItems.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Protocolos Selecionados</h3>
                            <button onClick={clearCart} className="text-[9px] font-black text-red-500 uppercase tracking-widest">Esvaziar</button>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex gap-4 p-5 rounded-[2.5rem] bg-zinc-950/20 border border-white/5 relative overflow-hidden"
                                    >
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover opacity-60" alt={item.title} />
                                        </div>
                                        <div className="flex flex-col justify-center flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[8px] font-black text-primary uppercase tracking-widest">{item.type}</span>
                                                <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{item.author}</span>
                                            </div>
                                            <h4 className="text-sm font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{item.title}</h4>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-sm font-black italic text-white premium-text-glow">R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>

                                                <div className="flex items-center gap-4 bg-white/5 rounded-full px-4 py-1.5 border border-white/5">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-500 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[16px] font-black">remove</span>
                                                    </button>
                                                    <span className="text-xs font-black italic w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-500 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-[16px] font-black">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Totals Summary */}
                        <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 border-white/5 space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                <span>Subtotal</span>
                                <span className="text-white">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                <span>Custos Operacionais</span>
                                <span className="text-primary">FREE</span>
                            </div>
                            <div className="h-px bg-white/5 my-2"></div>
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Investimento Total</span>
                                    <span className="text-3xl font-black italic text-white premium-text-glow leading-none">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">+ 150 EXP</span>
                                    <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Bônus de Aquisição</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <div className="w-24 h-24 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center">
                            <span className="material-symbols-outlined text-zinc-800 text-5xl">shopping_cart_off</span>
                        </div>
                        <div className="space-y-2 px-8">
                            <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">Seu Arsenal está Vazio</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Você ainda não selecionou nenhum protocolo de elite para acelerar seus resultados.</p>
                        </div>
                        <button
                            onClick={() => navigate('/shop')}
                            className="px-10 py-5 bg-white/5 border border-white/10 text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-primary/10"
                        >
                            Explorar Marketplace
                        </button>
                    </div>
                )}
            </main>

            {/* Bottom Action */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-8 glass-nav z-[160] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined font-black">payments</span>
                        PROSSEGUIR PARA O CHECKOUT
                    </button>
                </div>
            )}
        </div>
    );
}
