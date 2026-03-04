import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';

export default function Checkout() {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState('');

    const saved = localStorage.getItem('poup_cart');
    const cartItems = saved ? JSON.parse(saved) : [];
    const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    const handleProceed = () => {
        // Navigate to Upsell before payment
        navigate('/upsell');
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Finalizar Aquisição" showBack />

            <main className="flex-grow px-6 pt-8 pb-40 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Progress Stepper ── */}
                <div className="flex justify-between items-center px-8 relative">
                    <div className="absolute top-1/2 left-8 right-8 h-px bg-zinc-800 -translate-y-1/2 z-0"></div>
                    <div className="relative z-10 w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center font-black text-xs shadow-[0_0_15px_#0FB67F]">1</div>
                    <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-900 border border-white/5 text-zinc-600 flex items-center justify-center font-black text-xs">2</div>
                    <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-900 border border-white/5 text-zinc-600 flex items-center justify-center font-black text-xs">3</div>
                </div>

                {/* ── Review Section ── */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Resumo da Ordem</h3>
                    <div className="transparent-card-border rounded-[2.5rem] bg-zinc-950/40 border-white/5 p-8 space-y-6">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <span className="text-xs font-black text-white italic uppercase tracking-tight">{item.title}</span>
                                <span className="text-[10px] font-black text-zinc-400">R$ {(item.price * item.quantity).toLocaleString('pt-BR')}</span>
                            </div>
                        ))}
                        <div className="h-px bg-white/5"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black text-white uppercase tracking-widest">Total Geral</span>
                            <span className="text-xl font-black italic text-primary premium-text-glow">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </section>

                {/* ── Coupon Section ── */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Código de Acesso</h3>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="CUPOM_ELITE"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="flex-1 bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-primary placeholder:text-zinc-800 focus:outline-none focus:border-primary/40 transition-all"
                        />
                        <button className="bg-white/5 border border-white/10 px-6 rounded-2xl text-[8px] font-black uppercase tracking-widest text-primary">APLICAR</button>
                    </div>
                </section>

                {/* ── Payment Methods Preview ── */}
                <section className="space-y-6">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Método de Liquidação</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-zinc-950/60 border-2 border-primary/20 flex flex-col items-center gap-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2"><span className="material-symbols-outlined text-[14px] text-primary filled">check_circle</span></div>
                            <span className="material-symbols-outlined text-3xl text-primary">pix</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">PIX INSTANTÂNEO</span>
                        </div>
                        <div className="p-6 rounded-3xl bg-zinc-950/20 border border-white/5 flex flex-col items-center gap-3 opacity-40 grayscale">
                            <span className="material-symbols-outlined text-3xl text-zinc-600">credit_card</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">CARTÃO ELITE</span>
                        </div>
                    </div>
                </section>

            </main>

            <div className="fixed bottom-0 left-0 right-0 p-8 glass-nav z-[160] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <button
                    onClick={handleProceed}
                    className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <span className="material-symbols-outlined font-black">login</span>
                    AVANÇAR PARA PAGAMENTO
                </button>
            </div>
        </div>
    );
}
