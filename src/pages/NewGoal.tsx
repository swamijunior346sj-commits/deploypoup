import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

export default function NewGoal() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshData, addXP } = useData();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [title, setTitle] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('diamond');

    const icons = [
        'diamond', 'savings', 'home', 'directions_car', 'flight', 'laptop_mac',
        'celebration', 'shopping_bag', 'school', 'favorite', 'rocket_launch'
    ];

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !title || !targetAmount) return;

        const cleanAmount = targetAmount.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
        const parsedAmount = parseFloat(cleanAmount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) return;

        setLoading(true);
        try {
            const goalData = {
                user_id: user.id,
                name: title.trim(),
                target_amount: parsedAmount,
                current_amount: 0,
                deadline: deadline || null,
                color: '#0FB67F'
            };

            const { error } = await supabase.from('goals').insert([goalData]);

            if (error) throw error;

            addXP(50);
            await refreshData();
            setShowSuccess(true);
        } catch (error: any) {
            console.error('Goal creation failed:', error);
            alert(`Erro ao criar meta: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Nova Estratégia" showBack />

            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => navigate('/dashboard')}></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="relative w-full max-w-[320px] transparent-card-border rounded-[3rem] p-10 flex flex-col items-center text-center shadow-[0_0_80px_rgba(15,182,127,0.2)]"
                        >
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-8 shadow-[0_0_20px_rgba(15,182,127,0.2)]">
                                <span className="material-symbols-outlined text-4xl text-primary animate-pulse">check_circle</span>
                            </div>
                            <h2 className="text-xl font-black text-white tracking-widest uppercase italic mb-4">Objetivo Traçado</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mb-10 leading-relaxed italic">
                                "Sua nova jornada financeira começou. Mantenha o foco absoluto!"
                            </p>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl"
                            >
                                Iniciar Missão
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <main className="flex-grow px-6 pt-4 pb-32 overflow-y-auto no-scrollbar relative z-10">
                <form className="space-y-12 mt-6" onSubmit={handleSave}>

                    {/* Header Visual Section */}
                    <div className="flex flex-col items-center space-y-8 pt-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 rounded-[3rem] bg-zinc-950/40 border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden"
                        >
                            <span className="material-symbols-outlined text-5xl text-primary font-light relative z-10">{selectedIcon}</span>
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            {/* Scanning Light Effect */}
                            <motion.div
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-px bg-primary/40 blur-sm z-20"
                            />
                        </motion.div>

                        <div className="text-center w-full space-y-2 px-4">
                            <input
                                className="bg-transparent border-none text-[32px] font-display font-black text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900 border-b border-white/[0.03] uppercase italic"
                                placeholder="QUAL SEU SONHO?"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                required
                            />
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.5em]">NOME DO PROJETO</p>
                        </div>
                    </div>

                    {/* Numeric Input Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="transparent-card-border rounded-[3.5rem] bg-zinc-950/20 p-10 space-y-12 border-white/5"
                    >
                        {/* Target Amount */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase block px-1 text-center">Patrimônio Alvo</label>
                            <div className="relative flex items-center justify-center gap-3">
                                <span className="text-zinc-700 font-light text-3xl">R$</span>
                                <input
                                    className="bg-transparent border-none p-0 text-5xl font-display font-black text-white focus:ring-0 placeholder:text-zinc-900 w-full text-center tracking-tighter italic"
                                    placeholder="0,00"
                                    type="text"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"></div>
                        </div>

                        {/* Deadline Date */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase block px-1 text-center">Data Final da Missão</label>
                            <div className="relative flex items-center bg-zinc-900/40 border border-white/5 rounded-[1.8rem] px-6 py-5 focus-within:border-primary/40 transition-all cursor-pointer group">
                                <span className="material-symbols-outlined text-zinc-600 mr-4 text-2xl group-hover:text-primary transition-colors">calendar_month</span>
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-none p-0 text-sm font-black text-white focus:ring-0 [color-scheme:dark] cursor-pointer italic uppercase tracking-widest"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Icon Selection Scroll */}
                        <div className="space-y-6">
                            <label className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase block px-1 text-center">Selo de Identificação</label>
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 scroll-smooth">
                                {icons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setSelectedIcon(icon)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all duration-500 active:scale-90 ${selectedIcon === icon
                                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_25px_rgba(15,182,127,0.1)] scale-110'
                                            : 'bg-black/40 border border-white/5 text-zinc-700 hover:text-zinc-500 hover:border-white/10'}`}
                                    >
                                        <span className="material-symbols-outlined text-2xl">{icon}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Premium Submit Button */}
                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={loading || !title || !targetAmount}
                            className={`w-full h-20 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || !title || !targetAmount ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                        >
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? 'ESCALANDO DADOS...' : 'ESTABELECER META'}
                                {!loading && <span className="material-symbols-outlined text-base">bolt</span>}
                            </div>
                            {/* Inner Shine Animation */}
                            <motion.div
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-y-0 w-1/3 bg-white/40 skew-x-12 opacity-0 group-hover:opacity-100 z-0"
                            />
                        </button>
                        <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em] text-center mt-8 italic opacity-60">"PROTOCOLOS DE ELITE EXIGEM DISCIPLINA."</p>
                    </div>

                </form>
            </main>
        </div>
    );
}
