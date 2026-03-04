import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';

export default function NewGoal() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshData, addXP } = useData();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [title, setTitle] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('savings');

    const icons = [
        'savings', 'home', 'directions_car', 'flight', 'laptop_mac',
        'celebration', 'shopping_bag', 'school', 'favorite', 'diamond'
    ];

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !title || !targetAmount) return;

        const cleanAmount = targetAmount.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
        const parsedAmount = parseFloat(cleanAmount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('Valor inválido');
            return;
        }

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

            addXP(25);
            await refreshData();
            setShowSuccess(true);
            setTimeout(() => navigate('/goals'), 2000);

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

            <Header title="Estratégia" showBack />

            <ActionPopup
                isOpen={showSuccess}
                title="OBJETIVO TRAÇADO!"
                description="Sua nova jornada financeira começou. Mantenha o foco absoluto!"
                confirmText="Ver Minhas Metas"
                type="success"
                onConfirm={() => navigate('/goals')}
                onCancel={() => setShowSuccess(false)}
            />

            <main className="flex-grow px-6 pt-4 pb-32 overflow-y-auto no-scrollbar relative z-10">
                <form className="space-y-10 mt-6" onSubmit={handleSave}>

                    {/* Goal Header Section */}
                    <div className="flex flex-col items-center space-y-6 pt-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 rounded-[2.5rem] bg-zinc-950/40 border border-primary/20 flex items-center justify-center shadow-2xl relative group"
                        >
                            <span className="material-symbols-outlined text-5xl text-primary font-light relative z-10">{selectedIcon}</span>
                            <div className="absolute -inset-1 bg-primary/5 rounded-[2.8rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </motion.div>

                        <div className="text-center w-full px-4 space-y-2">
                            <input
                                className="bg-transparent border-none text-[32px] font-display font-black text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900 border-b border-white/[0.03]"
                                placeholder="Qual seu sonho?"
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
                        className="transparent-card-border rounded-[3rem] bg-zinc-950/20 p-10 space-y-12"
                    >
                        {/* Target Amount */}
                        <div className="space-y-5">
                            <label className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase block px-1">Patrimônio Alvo</label>
                            <div className="relative flex items-center justify-center gap-4">
                                <span className="text-zinc-700 font-light text-3xl">R$</span>
                                <input
                                    className="bg-transparent border-none p-0 text-5xl font-display font-black text-white focus:ring-0 placeholder:text-zinc-900 w-full text-center tracking-tighter"
                                    placeholder="0,00"
                                    type="text"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"></div>
                        </div>

                        {/* Deadline Date */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase block px-1 text-center">Data Limite da Missão</label>
                            <div className="relative flex items-center bg-black/40 border border-white/5 rounded-2xl px-6 py-5 active:border-primary/40 transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-zinc-600 mr-4 text-2xl">event</span>
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0 [color-scheme:dark] cursor-pointer"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Icon Selection Scroll */}
                        <div className="space-y-5">
                            <label className="text-[10px] font-black text-zinc-600 tracking-[0.4em] uppercase block px-1 text-center">Ícone Estratégico</label>
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 scroll-smooth">
                                {icons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setSelectedIcon(icon)}
                                        className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 active:scale-90 ${selectedIcon === icon
                                            ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(15,182,127,0.1)] scale-110'
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
                            className={`w-full h-18 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || !title || !targetAmount ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                        >
                            {loading ? 'Delineando...' : 'Formalizar Meta'}
                        </button>
                        <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.2em] text-center mt-6 italic opacity-60">"O primeiro passo para o sucesso é a visualização."</p>
                    </div>

                </form>
            </main>
        </div>
    );
}
