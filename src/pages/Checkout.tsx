import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';

export default function Checkout() {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [isApplying, setIsApplying] = useState(false);
    const [step, setStep] = useState(1); // 1: Resumo, 2: Entrega/Acesso, 3: Pagamento

    const saved = localStorage.getItem('poup_cart');
    const cartItems = saved ? JSON.parse(saved) : [];
    const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    const handleApplyCoupon = async () => {
        if (!coupon) return;
        setIsApplying(true);
        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('*')
                .eq('code', coupon.toUpperCase())
                .eq('active', true)
                .single();

            if (data && !error) {
                if (data.current_uses < data.max_uses) {
                    setAppliedDiscount(data.discount_percent);
                    // Add a notification here if possible, or just local feedback
                } else {
                    alert('Este cupom atingiu o limite de usos.');
                    setAppliedDiscount(0);
                }
            } else {
                alert('Cupom inválido ou expirado.');
                setAppliedDiscount(0);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsApplying(false);
        }
    };

    const handleProceed = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Navigate to Upsell before final payment
            localStorage.setItem('poup_discount_percent', appliedDiscount.toString());
            navigate('/upsell');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* Background elements */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <Header title="Finalizar Aquisição" showBack onBack={step > 1 ? () => setStep(step - 1) : undefined} />

            {/* Step Progress Indicator (ML Style) */}
            <div className="px-6 pt-6 flex items-center justify-between relative">
                <div className="absolute top-[calc(50%+12px)] left-12 right-12 h-[2px] bg-zinc-900 -translate-y-1/2">
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${(step - 1) * 50}%` }}
                        className="h-full bg-primary"
                    />
                </div>
                {[1, 2, 3].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s ? 'bg-primary border-primary text-black shadow-[0_0_15px_#0FB67F]' : 'bg-zinc-950 border-white/10 text-zinc-600'}`}>
                            {step > s ? (
                                <span className="material-symbols-outlined text-lg font-black">check</span>
                            ) : (
                                <span className="text-xs font-black">{s}</span>
                            )}
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-zinc-600'}`}>
                            {s === 1 ? 'Resumo' : s === 2 ? 'Acesso' : 'Pagamento'}
                        </span>
                    </div>
                ))}
            </div>

            <main className="flex-grow px-6 pt-10 pb-40 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.section
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Itens da Ordem</h3>
                                <button onClick={() => navigate('/cart')} className="text-[9px] font-black text-primary uppercase">Editar</button>
                            </div>
                            <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-6 space-y-4">
                                {cartItems.map((item: any) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-black text-white truncate uppercase italic">{item.title}</h4>
                                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{item.quantity}x {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Cupom de Desconto</h3>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="CÓDIGO_ELITE"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="flex-1 bg-zinc-950 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-primary placeholder:text-zinc-800 focus:outline-none focus:border-primary/40 transition-all"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={isApplying}
                                        className="bg-primary/10 border border-primary/20 px-6 rounded-2xl text-[8px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all disabled:opacity-50"
                                    >
                                        {isApplying ? '...' : 'Aplicar'}
                                    </button>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {step === 2 && (
                        <motion.section
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Método de Entrega</h3>
                            <div className="bg-zinc-950/40 border-2 border-primary/20 rounded-[2.5rem] p-8 flex items-center gap-6 relative overflow-hidden">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative z-10">
                                    <span className="material-symbols-outlined text-3xl filled">bolt</span>
                                </div>
                                <div className="relative z-10 flex-1">
                                    <h4 className="text-sm font-black text-white italic uppercase tracking-tight">Entrega Instantânea</h4>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 leading-relaxed">Acesso liberado segundos após a transação.</p>
                                </div>
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="material-symbols-outlined text-primary text-xl filled">check_circle</span>
                                </div>
                            </div>

                            <div className="bg-zinc-950/20 border border-white/5 rounded-[2.5rem] p-8 space-y-4 opacity-50">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Informações de Acesso</h4>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-zinc-600">mail</span>
                                    <span className="text-xs font-bold text-zinc-400">seu_email@exemplo.com.br</span>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {step === 3 && (
                        <motion.section
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Escolha a Liquidação</h3>
                            <div className="space-y-4">
                                <div className="bg-zinc-950 border-2 border-primary rounded-[2.5rem] p-6 flex items-center justify-between cursor-pointer group shadow-[0_0_20px_rgba(15,182,127,0.1)]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-2xl">pix</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-white opacity-90 uppercase tracking-widest italic">Pix Instantâneo</h4>
                                            <p className="text-[8px] text-primary font-bold uppercase tracking-widest mt-0.5">Aprovação em segundos</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-primary filled">radio_button_checked</span>
                                </div>

                                <div className="bg-zinc-950/40 border border-white/10 rounded-[2.5rem] p-6 flex items-center justify-between cursor-not-allowed opacity-40">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-600">
                                            <span className="material-symbols-outlined text-2xl">credit_card</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest italic">Cartão de Crédito</h4>
                                            <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Indisponível no momento</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-zinc-800">radio_button_unchecked</span>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Purchase Summary (Always visible at the bottom of the scroller or floating) */}
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[2.5rem] p-8 space-y-4 shadow-2xl">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        <span>Produtos</span>
                        <span className="text-white">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        <span>Encargos</span>
                        <span className="text-primary">ISENTO</span>
                    </div>
                    {appliedDiscount > 0 && (
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            <span>Cupom APLICADO ({appliedDiscount}%)</span>
                            <span>- R$ {((total * appliedDiscount) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                    )}
                    <div className="h-px bg-white/5"></div>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Pagamento Total</span>
                            <span className="text-3xl font-black italic text-white premium-text-glow leading-none">
                                R$ {(total * (1 - appliedDiscount / 100)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest mb-1 italic">Você Ganha</p>
                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em]">+ {Math.round(total / 10)} XP</span>
                        </div>
                    </div>
                </div>

            </main>

            {/* Float Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-[160] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <button
                    onClick={handleProceed}
                    className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 border-luxury"
                >
                    <span className="material-symbols-outlined font-black">{step === 3 ? 'lock' : 'arrow_forward'}</span>
                    {step === 3 ? 'CONFIRMAR E PAGAR' : 'PROSSEGUIR'}
                </button>
            </div>
        </div>
    );
}
