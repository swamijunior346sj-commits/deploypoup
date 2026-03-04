import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import ActionPopup from '../components/ActionPopup';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function NewTransaction() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { assets, categories, subCategories, addXP, refreshData } = useData();
    const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState<'income' | 'expense' | 'transfer'>('expense');
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
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen selection:bg-primary/30">
            <Header title="NOVA TRANSAÇÃO" showBack />

            <ActionPopup
                isOpen={showSuccessPopup}
                title="Transação criada com sucesso!"
                description="Seu fluxo financeiro foi atualizado. +1 XP CONQUISTADO!"
                confirmText="Ver Histórico"
                type="success"
                onConfirm={() => navigate('/transactions')}
                onCancel={() => setShowSuccessPopup(false)}
            />

            <main className="flex-grow px-6 pt-4 pb-32 overflow-y-auto no-scrollbar">
                <form className="space-y-8" onSubmit={handleSave}>

                    {/* Amount Input Section */}
                    <div className="flex flex-col items-center py-6 space-y-2">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Valor do Lançamento</span>
                        <div className="flex items-center justify-center w-full">
                            <span className="text-primary font-bold text-2xl mr-2">R$</span>
                            <input
                                className="bg-transparent border-none text-[56px] font-display font-bold text-white focus:ring-0 p-0 text-center w-full placeholder:text-zinc-900"
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
                    <div className="p-1.5 bg-zinc-950 border border-white/5 rounded-[2rem] flex gap-1 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl transition-all duration-300 ${type === 'expense' ? 'bg-red-500/20 text-red-500 border border-red-500/10' : 'text-zinc-600 hover:text-zinc-400'}`}
                        >
                            Saída
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl transition-all duration-300 ${type === 'income' ? 'bg-primary/20 text-primary border border-primary/10' : 'text-zinc-600 hover:text-zinc-400'}`}
                        >
                            Entrada
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('transfer')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl transition-all duration-300 ${type === 'transfer' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/10' : 'text-zinc-600 hover:text-zinc-400'}`}
                        >
                            Transf.
                        </button>
                    </div>

                    {/* Form Fields Card */}
                    <div className="neon-border rounded-[32px] bg-white/[0.02] p-8 space-y-10">

                        {/* Description */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">O que você fez?</label>
                            <input
                                className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[16px] text-white focus:ring-0 focus:border-primary transition-colors placeholder:text-zinc-800"
                                placeholder="Ex: Jantar restaurante..."
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {type === 'transfer' ? (
                            <div className="grid grid-cols-1 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">Conta Origem</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 appearance-none"
                                            value={fromAccount}
                                            onChange={(e) => setFromAccount(e.target.value)}
                                            required
                                        >
                                            <option value="" className="bg-black">Selecione...</option>
                                            {assets.map(a => <option key={a.id} className="bg-black" value={a.id}>{a.name}</option>)}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-0 text-zinc-700 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">Conta Destino</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 appearance-none"
                                            value={toAccount}
                                            onChange={(e) => setToAccount(e.target.value)}
                                            required
                                        >
                                            <option value="" className="bg-black">Selecione...</option>
                                            {assets.map(a => <option key={a.id} className="bg-black" value={a.id}>{a.name}</option>)}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-0 text-zinc-700 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">Categoria</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 appearance-none"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} className="bg-black" value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-0 text-zinc-700 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">Subcategoria</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 appearance-none"
                                            value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                        >
                                            <option value="" className="bg-black">Geral</option>
                                            {filteredSubCategories.map(sub => (
                                                <option key={sub.id} className="bg-black" value={sub.name}>{sub.name}</option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-0 top-0 text-zinc-700 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Date Picker */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">Quando ocorreu?</label>
                            <input
                                type="date"
                                className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 [color-scheme:dark]"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        {/* Notes */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase block">Notas Adicionais</label>
                            <textarea
                                className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[14px] text-white focus:ring-0 resize-none min-h-[40px] placeholder:text-zinc-800"
                                placeholder="..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-16 rounded-[2rem] bg-transparent border-2 border-primary text-primary font-black tracking-[0.4em] text-[11px] uppercase transition-all duration-300 active:scale-95 active:bg-primary/5 shadow-[0_0_30px_rgba(15,182,127,0.1)] ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary/80'}`}
                        >
                            {loading ? 'Processando...' : 'Efetivar Transação'}
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
