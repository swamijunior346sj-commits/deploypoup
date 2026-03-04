import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function NewTransaction() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { assets, categories, subCategories, addXP, refreshData } = useData();
    const [loading, setLoading] = useState(false);

    const initialType = location.state?.type as 'income' | 'expense' | 'transfer' || 'expense';

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState<'income' | 'expense' | 'transfer'>(initialType);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [status, setStatus] = useState<'entregue' | 'anulada' | 'reconciliada'>('entregue');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        if (categories.length > 0 && !categoryId) {
            setCategoryId(categories[0].id);
        }
    }, [categories]);

    const filteredSubCategories = useMemo(() => {
        return subCategories.filter(s => s.category_id === categoryId);
    }, [subCategories, categoryId]);

    useEffect(() => {
        if (filteredSubCategories.length > 0) {
            const currentSub = filteredSubCategories.find(s => s.name === subCategoryName);
            if (!currentSub) {
                setSubCategoryName(filteredSubCategories[0].name);
            }
        } else {
            setSubCategoryName('');
        }
    }, [filteredSubCategories, categoryId]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (!amount || !description) return;

        const cleanAmount = amount.replace(/[R$\s]/g, '');
        const normalizedAmount = cleanAmount.includes(',') ? cleanAmount.replace(/\./g, '').replace(',', '.') : cleanAmount;
        const parsedAmount = parseFloat(normalizedAmount);

        if (isNaN(parsedAmount)) return;

        setLoading(true);
        try {
            const selectedCategory = categories.find(c => c.id === categoryId);

            const transactionData = {
                user_id: user.id,
                amount: parsedAmount,
                description: description.trim(),
                category: type === 'transfer' ? 'Transferência' : (selectedCategory?.name || 'Geral'),
                subcategory: type === 'transfer' ? '' : subCategoryName,
                notes: notes.trim(),
                type: type,
                date: date,
                status: status,
                from_account_id: type === 'transfer' ? fromAccount : null,
                to_account_id: type === 'transfer' ? toAccount : null,
            };

            const { error } = await supabase
                .from('transactions')
                .insert([transactionData]);

            if (error) throw error;

            addXP(1);
            await refreshData();
            setShowSuccessPopup(true);

            setTimeout(() => {
                navigate('/transactions');
            }, 2000);

        } catch (error: any) {
            console.error('Exception during save:', error);
            alert(`Erro ao salvar: ${error.message || 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Nova transação" showBack />

            <ActionPopup
                isOpen={showSuccessPopup}
                title="OPERACIONALIZADO"
                description="Sua operação financeira foi atualizada com sucesso no ecossistema de elite."
                confirmText="VER TRANSAÇÕES"
                type="success"
                onConfirm={() => navigate('/transactions')}
                onCancel={() => setShowSuccessPopup(false)}
            />

            <main className="flex-grow px-6 pt-4 pb-32 relative z-10 no-scrollbar overflow-y-auto">
                <form className="space-y-12" onSubmit={handleSave}>

                    {/* Amount Input Section */}
                    <div className="flex flex-col items-center py-10 space-y-4">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em]">Volume Estratégico</span>
                        <div className="flex items-center justify-center w-full">
                            <span className="text-primary font-light text-2xl mr-2 italic">R$</span>
                            <motion.input
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-transparent border-none text-7xl font-display font-black text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900 premium-text-glow tracking-tighter italic"
                                placeholder="0,00"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                    </div>

                    {/* Transaction Type Picker */}
                    <div className="p-1.5 bg-zinc-950/50 border border-white/5 rounded-[2.5rem] flex gap-1 shadow-2xl backdrop-blur-xl">
                        {[
                            { id: 'expense' as const, label: 'Saída', color: 'text-red-500', bg: 'bg-red-500/10' },
                            { id: 'income' as const, label: 'Entrada', color: 'text-primary', bg: 'bg-primary/10' },
                            { id: 'transfer' as const, label: 'Transf.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        ].map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setType(t.id)}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl transition-all duration-500 ${type === t.id ? `${t.bg} ${t.color} border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.02)]` : 'text-zinc-600 hover:text-zinc-400'}`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Redesigned Luxury Form Card */}
                    <div className="space-y-6">
                        <div className="transparent-card-border rounded-[3rem] bg-zinc-950/40 p-10 space-y-12 border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>

                            {/* Natureza da Operação */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-zinc-500 text-sm">edit_note</span>
                                    </div>
                                    <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-60 italic">Natureza da Operação</label>
                                </div>
                                <input
                                    className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-xl text-white focus:ring-0 focus:border-primary transition-all placeholder:text-zinc-800 font-bold uppercase italic tracking-tight"
                                    placeholder="Ex: Aporte Mensal, Farmácia..."
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Eixo & Sub-Eixo */}
                            {type !== 'transfer' && (
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-xs">folder_open</span>
                                            <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic">Eixo Primário</label>
                                        </div>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-white focus:ring-0 appearance-none font-black italic uppercase"
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value)}
                                            >
                                                {categories.map(cat => (
                                                    <option key={cat.id} className="bg-black text-[14px]" value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                            <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none text-xs">keyboard_arrow_down</span>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-xs">account_tree</span>
                                            <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic">Sub-Eixo</label>
                                        </div>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-zinc-400 focus:ring-0 appearance-none font-medium italic"
                                                value={subCategoryName}
                                                onChange={(e) => setSubCategoryName(e.target.value)}
                                            >
                                                <option value="" className="bg-black">Padronizado</option>
                                                {filteredSubCategories.map(sub => (
                                                    <option key={sub.id} className="bg-black text-[14px]" value={sub.name}>{sub.name}</option>
                                                ))}
                                            </select>
                                            <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none text-xs">keyboard_arrow_down</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Transfer Accounts */}
                            {type === 'transfer' && (
                                <div className="grid grid-cols-1 gap-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-xs">outbox</span>
                                            <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic">Fonte da Liquidez</label>
                                        </div>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-white focus:ring-0 appearance-none font-black"
                                                value={fromAccount}
                                                onChange={(e) => setFromAccount(e.target.value)}
                                                required
                                            >
                                                <option value="" className="bg-black">Selecione o Ativo...</option>
                                                {assets.map(a => <option key={a.id} className="bg-black text-[14px]" value={a.id}>{a.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-xs">move_to_inbox</span>
                                            <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic">Destino da Alocação</label>
                                        </div>
                                        <div className="relative">
                                            <select
                                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-white focus:ring-0 appearance-none font-black"
                                                value={toAccount}
                                                onChange={(e) => setToAccount(e.target.value)}
                                                required
                                            >
                                                <option value="" className="bg-black">Selecione o Ativo...</option>
                                                {assets.map(a => <option key={a.id} className="bg-black text-[14px]" value={a.id}>{a.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Date & Status Row */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-zinc-600 text-xs">calendar_month</span>
                                        <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic">Data Efetiva</label>
                                    </div>
                                    <input
                                        type="date"
                                        className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-sm text-white focus:ring-0 [color-scheme:dark] font-bold"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-zinc-600 text-xs">verified_user</span>
                                        <label className="text-[9px] font-black text-white tracking-[0.3em] uppercase opacity-40 italic">Protocolo Operacional</label>
                                    </div>
                                    <div className="relative">
                                        <select
                                            className={`w-full bg-transparent border-none border-b border-white/5 pb-4 text-xs focus:ring-0 appearance-none font-black uppercase tracking-widest ${status === 'entregue' ? 'text-primary' : status === 'anulada' ? 'text-red-500' : 'text-blue-500'}`}
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value as any)}
                                        >
                                            <option value="entregue" className="bg-black text-primary">Entregue</option>
                                            <option value="anulada" className="bg-black text-red-500">Anulado</option>
                                            <option value="reconciliada" className="bg-black text-blue-500">Reconciliado</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none text-xs">check_circle</span>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Actions / Notes */}
                            <div className="space-y-4">
                                <textarea
                                    className="w-full bg-zinc-900/40 rounded-3xl border border-white/5 p-6 text-[13px] text-zinc-400 focus:ring-0 focus:border-primary/40 resize-none min-h-[100px] italic placeholder:text-zinc-800"
                                    placeholder="Observações táticas da operação..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Visual Status Indicator */}
                        <div className="flex justify-center pt-2">
                            <div className="px-6 py-2 bg-zinc-950 border border-white/5 rounded-full flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'entregue' ? 'bg-primary shadow-[0_0_8px_#0FB67F]' : status === 'anulada' ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : 'bg-blue-500 shadow-[0_0_8px_#3B82F6]'}`}></div>
                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">Estado da Operação: <span className="text-white italic">{status === 'entregue' ? 'Operacional' : status === 'anulada' ? 'Abortado' : 'Consolidado'}</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Finalize Button */}
                    <div className="pt-8 pb-12">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-20 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_60px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading ? 'opacity-50 pointer-events-none' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_60px_rgba(15,182,127,0.2)]'}`}
                        >
                            <span className="relative z-10">{loading ? 'CONSOLIDANDO...' : 'EFETIVAR TRANSAÇÃO'}</span>
                            {!loading && (
                                <motion.div
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-y-0 w-1/4 bg-white/40 skew-x-12 z-0"
                                />
                            )}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
