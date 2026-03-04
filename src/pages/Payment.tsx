import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';

interface MPPaymentData {
    id: number;
    qr_code: string;
    qr_code_base64: string;
    status: string;
}

export default function Payment() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [paid, setPaid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState<MPPaymentData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const saved = localStorage.getItem('poup_cart');
    const cartItems = saved ? JSON.parse(saved) : [];
    const total = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

    // Initial QR Code Generation
    useEffect(() => {
        const generatePayment = async () => {
            try {
                setLoading(true);
                const { data, error: funcError } = await supabase.functions.invoke('poup-pix-payment', {
                    body: {
                        amount: total,
                        email: 'poup_user@example.com', // In production, get from auth context
                        description: `Compra POUP - ${cartItems.length} itens`
                    }
                });

                if (funcError) throw funcError;
                if (data.error) throw new Error(data.error);

                setPaymentData(data);
            } catch (err: any) {
                console.error('Erro ao gerar PIX:', err);
                setError('Falha ao conectar com o terminal de pagamento.');
            } finally {
                setLoading(false);
            }
        };

        if (total > 0 && !paymentData) {
            generatePayment();
        }
    }, [total]);

    // Check payment status (Polling)
    useEffect(() => {
        let interval: any;
        if (paymentData && !paid) {
            interval = setInterval(async () => {
                try {
                    // This would ideally hit another edge function that check Mercado Pago status
                    // For now, we simulate success for demo purposes or keep it in 'pending'
                    // Example real check: 
                    // const { data } = await supabase.functions.invoke('check-payment', { body: { id: paymentData.id } });
                    // if (data.status === 'approved') setPaid(true);
                } catch (err) {
                    console.error('Polling error:', err);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [paymentData, paid]);

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

    const copyToClipboard = () => {
        if (paymentData?.qr_code) {
            navigator.clipboard.writeText(paymentData.qr_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSimulateSuccess = () => {
        // Since we don't have a real webhook setup for the local dev, 
        // we keep the manual confirm button but it will redirect correctly
        setPaid(true);
        setTimeout(() => {
            localStorage.removeItem('poup_cart');
            navigate('/dashboard');
        }, 3000);
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Terminal de Liquidação" showBack />

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
                            <span className="text-4xl font-black italic tracking-tighter premium-text-glow leading-none">{formatTime(timeLeft)}</span>
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mt-1">Sessão Expirando</span>
                        </div>
                    </div>
                </div>

                {/* ── PIX QR Code Area ── */}
                <section className="space-y-6 text-center">
                    <div className="space-y-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Protocolo de Pagamento</h3>
                        <p className="text-[9px] text-primary font-black uppercase tracking-widest">Aguardando Sincronização da Rede</p>
                    </div>

                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-zinc-950/80 border border-white/10 rounded-[3.5rem] p-10 backdrop-blur-3xl overflow-hidden min-w-[280px] min-h-[280px] flex items-center justify-center">

                            {loading ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Gerando Chave de Elite...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center p-4">
                                    <span className="material-symbols-outlined text-4xl text-red-500 mb-2">signal_disconnected</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{error}</p>
                                    <button onClick={() => window.location.reload()} className="mt-4 text-[9px] text-primary font-bold uppercase underline">Tentar Novamente</button>
                                </div>
                            ) : paymentData && (
                                <div className="relative">
                                    <div className="bg-white p-4 rounded-[2rem] shadow-2xl overflow-hidden grayscale contrast-125">
                                        <img
                                            src={`data:image/jpeg;base64,${paymentData.qr_code_base64}`}
                                            className="w-48 h-48 object-contain"
                                            alt="QR Code PIX"
                                        />
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary flex items-center justify-center rounded-2xl shadow-lg border-luxury">
                                        <span className="material-symbols-outlined text-black font-black">pix</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={copyToClipboard}
                            className={`px-8 py-4 bg-zinc-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 mx-auto transition-all active:scale-95 ${copied ? 'text-primary border-primary/40' : 'text-zinc-400'}`}
                        >
                            <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
                            {copied ? 'CADEIA COPIADA' : 'PIX COPIA E COLA'}
                        </button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="bg-gradient-to-br from-zinc-900/60 to-black border border-white/5 rounded-[2.5rem] p-8 flex justify-between items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <span className="material-symbols-outlined text-6xl">verified</span>
                        </div>
                        <div className="flex flex-col relative z-10">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Montante Devido</span>
                            <span className="text-3xl font-black italic text-white premium-text-glow leading-none">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex flex-col items-end relative z-10">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Status Global</span>
                            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_#EAB308]"></span>
                                Pendente
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 px-4">
                        <div className="flex-1 h-px bg-zinc-900"></div>
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.5em]">Transação Criptografada</span>
                        <div className="flex-1 h-px bg-zinc-900"></div>
                    </div>
                </section>

            </main>

            <div className="fixed bottom-0 left-0 right-0 p-8 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-[160] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <button
                    onClick={handleSimulateSuccess}
                    disabled={loading || !!error}
                    className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 border-luxury disabled:opacity-50"
                >
                    <span className="material-symbols-outlined font-black">refresh</span>
                    {paid ? 'ORDEM SINCRONIZADA' : 'VERIFICAR RECEBIMENTO'}
                </button>
            </div>

            {/* Success Animation Overlay */}
            <AnimatePresence>
                {paid && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center text-center p-8 font-display"
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full"></div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{ type: 'spring', damping: 12 }}
                            className="w-40 h-40 rounded-full bg-primary flex items-center justify-center mb-10 shadow-[0_0_80px_#0FB67F] border-4 border-black/20"
                        >
                            <span className="material-symbols-outlined text-black text-7xl font-black">check_circle</span>
                        </motion.div>
                        <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter premium-text-glow mb-4">CONEXÃO ESTABELECIDA</h2>
                        <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-[0.3em] max-w-xs mx-auto mb-12">O protocolo de elite foi sincronizado com seu terminal. Acesso liberado.</p>

                        <div className="flex gap-4">
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-primary"></motion.div>
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary"></motion.div>
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary"></motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
