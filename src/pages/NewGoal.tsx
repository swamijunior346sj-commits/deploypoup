import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

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

        if (!user || !title || !targetAmount) {
            console.error('User or required fields missing');
            return;
        }

        const cleanAmount = targetAmount.replace(/[R$\s]/g, '');
        const normalizedAmount = cleanAmount.includes(',') ? cleanAmount.replace(/\./g, '').replace(',', '.') : cleanAmount;
        const parsedAmount = parseFloat(normalizedAmount);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            console.error('Invalid amount provided:', targetAmount);
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
                color: '#0FB67F' // Using default color for now
            };

            console.log('Inserting goal into Supabase:', goalData);

            const { data, error } = await supabase
                .from('goals')
                .insert([goalData])
                .select();

            if (error) {
                console.error('Supabase error inserting goal:', error);
                throw error;
            }

            console.log('Goal saved successfully:', data);

            addXP(10); // Meta created gives more XP
            await refreshData();
            setShowSuccess(true);

            // Redirecionar após 2 segundos
            setTimeout(() => {
                navigate('/goals');
            }, 2000);

        } catch (error: any) {
            console.error('Exception during goal save:', error);
            alert(`Erro ao criar meta: ${error.message || 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 antialiased overflow-x-hidden">
            <Header title="NOVA META" showBack />

            <ActionPopup
                isOpen={showSuccess}
                title="Meta criada com sucesso!"
                description="Sua nova jornada financeira começou. Mantenha o foco!"
                confirmText="Ver Minhas Metas"
                type="success"
                onConfirm={() => navigate('/goals')}
                onCancel={() => setShowSuccess(false)}
            />

            <main className="flex-grow px-6 pt-4 pb-32 overflow-y-auto no-scrollbar">
                <form className="space-y-8 mt-4" onSubmit={handleSave}>

                    {/* Goal Icon & Title Display */}
                    <div className="flex flex-col items-center py-6 space-y-4">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-zinc-950 border border-white/5 flex items-center justify-center shadow-2xl relative group">
                            <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="material-symbols-outlined text-4xl text-primary font-bold relative z-10">{selectedIcon}</span>
                            <div className="absolute -bottom-1 -right-1 bg-primary w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
                                <span className="material-symbols-outlined text-black text-[12px] font-bold">edit</span>
                            </div>
                        </div>
                        <div className="text-center w-full px-4">
                            <input
                                className="bg-transparent border-none text-[28px] font-display font-bold text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900"
                                placeholder="Qual seu objetivo?"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                                required
                            />
                            <div className="mt-1 h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                        </div>
                    </div>

                    {/* Form Fields Card */}
                    <div className="neon-border rounded-[32px] bg-white/[0.02] p-8 space-y-10">

                        {/* Target Amount */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block px-1">Valor Total Alvo</label>
                            <div className="relative flex items-center bg-zinc-950 border border-white/5 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                <span className="text-primary font-bold text-lg mr-3">R$</span>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-xl font-display font-bold text-white focus:ring-0 placeholder:text-zinc-800"
                                    placeholder="0,00"
                                    type="text"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Deadline Date */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block px-1">Data Limite (Opcional)</label>
                            <div className="relative flex items-center bg-zinc-950 border border-white/5 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all cursor-pointer">
                                <span className="material-symbols-outlined text-zinc-500 mr-3 text-xl">calendar_today</span>
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0 [color-scheme:dark] cursor-pointer"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Icon Selection */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block px-1">Ícone da Meta</label>
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                                {icons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setSelectedIcon(icon)}
                                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 ${selectedIcon === icon
                                            ? 'bg-primary/20 text-primary border border-primary/20 shadow-[0_0_15px_rgba(15,182,127,0.2)]'
                                            : 'bg-zinc-950 border border-white/5 text-zinc-600 hover:text-zinc-400'}`}
                                    >
                                        <span className="material-symbols-outlined text-xl">{icon}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Slogan */}
                        <div className="pt-2 text-center">
                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] leading-relaxed italic">Visualize seu sucesso diariamente.</p>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-16 rounded-[2rem] bg-transparent border-2 border-primary text-primary font-black tracking-[0.4em] text-[11px] uppercase transition-all duration-300 active:scale-95 active:bg-primary/5 shadow-[0_0_30px_rgba(15,182,127,0.1)] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/80'}`}
                        >
                            {loading ? 'Processando...' : 'Iniciar Jornada'}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
