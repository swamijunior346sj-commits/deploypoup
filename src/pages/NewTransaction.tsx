import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

export default function NewTransaction() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { assets, categories, subCategories, addXP, refreshData } = useData();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [notes, setNotes] = useState('');
    const [type, setType] = useState<'income' | 'expense' | 'transfer'>('expense');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');

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
            setSubCategoryName(filteredSubCategories[0].name);
        } else {
            setSubCategoryName('');
        }
    }, [filteredSubCategories]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !amount || !description) {
            alert('Por favor, preencha valor e descrição.');
            return;
        }

        const parsedAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
        if (isNaN(parsedAmount)) {
            alert('Valor inválido');
            return;
        }

        setLoading(true);
        try {
            const selectedCategory = categories.find(c => c.id === categoryId);

            const transactionData = {
                user_id: user.id,
                amount: parsedAmount,
                description,
                category: type === 'transfer' ? 'Transferência' : (selectedCategory?.name || 'Geral'),
                subcategory: type === 'transfer' ? '' : subCategoryName,
                notes,
                type,
                date,
                from_account_id: type === 'transfer' ? fromAccount : null,
                to_account_id: type === 'transfer' ? toAccount : null,
            };

            const { error } = await supabase.from('transactions').insert([transactionData]);

            if (error) throw error;

            addXP(2);
            await refreshData();
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                navigate('/transactions');
            }, 2000);
        } catch (error: any) {
            console.error('Error saving transaction:', error);
            alert(`Erro ao salvar transação: ${error.message || 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary font-bold animate-bounce">check</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Transação Salva!</h2>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Seu financeiro acaba de ser atualizado</p>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold">
                    <span className="text-[10px] uppercase tracking-tighter">+2 XP</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen">
            <Header title="NOVA TRANSAÇÃO" showBack />

            <main className="flex-grow px-8 pb-32 mt-2">
                <form className="space-y-8" onSubmit={handleSave}>
                    <div className="relative py-4 text-center">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Valor</label>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-primary font-bold text-2xl">R$</span>
                            <input
                                className="w-1/2 bg-transparent border-none py-2 text-4xl font-bold placeholder:text-zinc-800 text-white focus:ring-0 text-center"
                                placeholder="0,00"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="h-[2px] w-1/3 mx-auto bg-primary/20 mt-1"></div>
                    </div>

                    <div className="flex gap-2 p-1 bg-white/[0.03] rounded-2xl border border-white/5">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all ${type === 'expense' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'text-zinc-500'}`}
                        >
                            Despesa
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all ${type === 'income' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-zinc-500'}`}
                        >
                            Receita
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('transfer')}
                            className={`flex-1 py-3 text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all ${type === 'transfer' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30' : 'text-zinc-500'}`}
                        >
                            Transf.
                        </button>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Descrição</label>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500 text-xl">edit_note</span>
                            <input
                                className="w-full py-3 text-sm placeholder:text-zinc-700 text-white focus:ring-0 bg-transparent border-none border-b border-zinc-900 rounded-none focus:border-primary transition-colors"
                                placeholder="Ex: Almoço de Domingo"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {type === 'transfer' ? (
                        <div className="grid grid-cols-1 gap-6">
                            <div className="relative">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Conta de Origem</label>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-zinc-500">upload</span>
                                    <select
                                        className="w-full py-3 text-sm text-white focus:ring-0 appearance-none bg-transparent border-none border-b border-zinc-900 rounded-none focus:border-primary"
                                        value={fromAccount}
                                        onChange={(e) => setFromAccount(e.target.value)}
                                        required
                                    >
                                        <option value="" className="bg-black">Selecione a conta</option>
                                        {assets.map(a => <option key={a.id} className="bg-black" value={a.id}>{a.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Conta de Destino</label>
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-zinc-500">download</span>
                                    <select
                                        className="w-full py-3 text-sm text-white focus:ring-0 appearance-none bg-transparent border-none border-b border-zinc-900 rounded-none focus:border-primary"
                                        value={toAccount}
                                        onChange={(e) => setToAccount(e.target.value)}
                                        required
                                    >
                                        <option value="" className="bg-black">Selecione a conta</option>
                                        {assets.map(a => <option key={a.id} className="bg-black" value={a.id}>{a.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Categoria</label>
                                <select
                                    className="w-full py-3 text-sm text-white focus:ring-0 appearance-none bg-transparent border-none border-b border-zinc-900 rounded-none focus:border-primary"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} className="bg-black" value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Subcategoria</label>
                                <select
                                    className="w-full py-3 text-sm text-white focus:ring-0 appearance-none bg-transparent border-none border-b border-zinc-900 rounded-none focus:border-primary"
                                    value={subCategoryName}
                                    onChange={(e) => setSubCategoryName(e.target.value)}
                                >
                                    <option value="" className="bg-black">Geral</option>
                                    {filteredSubCategories.map(sub => (
                                        <option key={sub.id} className="bg-black" value={sub.name}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Notas (Opcional)</label>
                        <textarea
                            className="w-full py-3 text-sm placeholder:text-zinc-700 text-white focus:ring-0 bg-transparent border-none border-b border-zinc-900 rounded-none focus:border-primary min-h-[60px]"
                            placeholder="Notas adicionais..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Data</label>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500 text-xl">calendar_today</span>
                            <input
                                className="w-full py-3 text-sm text-white focus:ring-0 appearance-none bg-transparent border-none border-b border-zinc-900 rounded-none [color-scheme:dark]"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            className="w-full bg-primary py-5 rounded-2xl font-bold text-black text-xs tracking-[0.3em] uppercase active:scale-[0.98] shadow-[0_0_20px_#0fb67f30] transition-all disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'PROCESSANDO...' : 'SALVAR TRANSAÇÃO'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
