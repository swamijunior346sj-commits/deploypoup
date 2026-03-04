import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
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
        console.log('Attempting to save transaction...');

        if (!user) {
            console.error('No user found');
            return;
        }
        if (!amount || !description) {
            console.error('Missing amount or description');
            return;
        }

        const cleanAmount = amount.replace(/[R$\s]/g, '');
        const normalizedAmount = cleanAmount.includes(',') ? cleanAmount.replace(/\./g, '').replace(',', '.') : cleanAmount;
        const parsedAmount = parseFloat(normalizedAmount);

        if (isNaN(parsedAmount)) {
            console.error('Invalid amount:', amount);
            return;
        }

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
                from_account_id: type === 'transfer' ? fromAccount : null,
                to_account_id: type === 'transfer' ? toAccount : null,
            };

            console.log('Inserting data into Supabase:', transactionData);

            const { data, error } = await supabase
                .from('transactions')
                .insert([transactionData])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            console.log('Transaction saved successfully:', data);

            addXP(1);
            await refreshData();
            setShowSuccessPopup(true);

            // Redirecionar após 2 segundos
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

            <Header title="REGISTRO DE OPERAÇÃO" showBack />

            <ActionPopup
                isOpen={showSuccessPopup}
                title="OPERACIONALIZADO"
                description="Seu fluxo financeiro foi atualizado com sucesso no ecossistema de elite."
                confirmText="VER FLUXO"
                type="success"
                onConfirm={() => navigate('/transactions')}
                onCancel={() => setShowSuccessPopup(false)}
            />

            <main className="flex-grow px-6 pt-4 pb-32 relative z-10 no-scrollbar overflow-y-auto">
                <form className="space-y-12" onSubmit={handleSave}>

                    {/* Amount Input Section */}
                    <div className="flex flex-col items-center py-6 space-y-2">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Volume Estratégico</span>
                        <div className="flex items-center justify-center w-full">
                            <span className="text-primary font-light text-2xl mr-2">R$</span>
                            <input
                                className="bg-transparent border-none text-[64px] font-display font-black text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900 premium-text-glow tracking-tighter italic"
                                placeholder="0,00"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                    </div>

                    {/* Transaction Picker */}
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

                    {/* Form Fields Card */}
                    <div className="transparent-card-border rounded-[2.5rem] bg-zinc-950/20 p-8 space-y-10 border border-white/5">

                        {/* Description */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Natureza da Operação</label>
                            <input
                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[17px] text-white focus:ring-0 focus:border-primary transition-colors placeholder:text-zinc-800 font-bold"
                                placeholder="Ex: Aporte Mensal, Farmácia..."
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {type === 'transfer' ? (
                            <div className="grid grid-cols-1 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Fonte da Liquidez</label>
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
                                        <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none">stat_0</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Destino da Alocação</label>
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
                                        <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none">stat_minus_1</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Eixo Primário</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-white focus:ring-0 appearance-none font-black"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} className="bg-black text-[14px]" value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Sub-Eixo</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-white focus:ring-0 appearance-none font-medium italic text-zinc-400"
                                            value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                        >
                                            <option value="" className="bg-black">Padronizado</option>
                                            {filteredSubCategories.map(sub => (
                                                <option key={sub.id} className="bg-black text-[14px]" value={sub.name}>{sub.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-1 text-zinc-700 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Date Picker */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Cronograma de Registro</label>
                            <input
                                type="date"
                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] text-white focus:ring-0 [color-scheme:dark] font-bold"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        {/* Notes */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Observações Estratégicas</label>
                            <textarea
                                className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[14px] text-zinc-400 focus:ring-0 resize-none min-h-[40px] italic placeholder:text-zinc-900"
                                placeholder="..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-8 pb-12">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-18 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                        >
                            {loading ? 'Operacionalizando...' : 'Confirmar Efetivação'}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
