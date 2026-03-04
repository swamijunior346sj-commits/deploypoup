import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';

export default function Payment() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [paid, setPaid] = useState(false);

    const saved = localStorage.getItem('poup_cart');
    const cartItems = saved ? JSON.parse(saved) : [];
    const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleConfirm = () => {
        setPaid(true);
        setTimeout(() => {
            localStorage.removeItem('poup_cart');
            navigate('/dashboard');
        }, 3000);
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Pagamento via Pix" showBack />

            <main className="flex-grow px-6 pt-8 pb-40 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Gamified Countdown ── */}
                <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-zinc-900" />
                            <motion.circle
                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="4" fill="transparent"
                                className="text-primary"
                                strokeDasharray={2 * Math.PI * 88}
                                initial={{ strokeDashoffset: 0 }}
                                animate={{ strokeDashoffset: (2 * Math.PI * 88) * (1 - timeLeft / 600) }}
                                transition={{ duration: 1, ease: "linear" }}
                                style={{ strokeLinecap: 'round', filter: 'drop-shadow(0 0 10px #0FB67F)' }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black italic tracking-tighter premium-text-glow">{formatTime(timeLeft)}</span>
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Sessão Segura</span>
                        </div>
                    </div>
                </div>

                {/* ── PIX QR Code Area ── */}
                <section className="space-y-6 text-center">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Aguardando Transferência</h3>
                    <div className="transparent-card-border rounded-[3.5rem] p-10 bg-zinc-950 border-white/5 inline-block mx-auto relative group">
                        <div className="absolute inset-0 bg-primary/5 blur-2xl opacity-50"></div>
                        <div className="relative w-56 h-56 bg-white rounded-3xl p-4 shadow-2xl transition-transform group-hover:scale-105">
                            {/* Simulate QR Code */}
                            <div className="w-full h-full bg-black flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-8xl">qr_code_2</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 mx-auto">
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                            Copiar Código Copia e Cola
                        </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="transparent-card-border rounded-[2.5rem] bg-zinc-950/40 border-white/5 p-8 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Montante Devido</span>
                            <span className="text-2xl font-black italic text-white premium-text-glow">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Status</span>
                            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                Pendente
                            </span>
                        </div>
                    </div>
                </section>

            </main>

            <div className="fixed bottom-0 left-0 right-0 p-8 glass-nav z-[160] border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <button
                    onClick={handleConfirm}
                    className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <span className="material-symbols-outlined font-black">sync</span>
                    CONFIRMAR RECEBIMENTO
                </button>
            </div>

            {/* Success Animation Overlay */}
            <AnimatePresence>
                {paid && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center text-center p-8"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{ type: 'spring', damping: 10 }}
                            className="w-32 h-32 rounded-full bg-primary flex items-center justify-center mb-8 shadow-[0_0_50px_#0FB67F]"
                        >
                            <span className="material-symbols-outlined text-black text-6xl font-black">check</span>
                        </motion.div>
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter premium-text-glow mb-4">Acesso Liberado</h2>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Protocolo sincronizado com seu ecossistema.</p>
                        <div className="mt-12 flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
