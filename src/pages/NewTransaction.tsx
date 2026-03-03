import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function NewTransaction() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Alimentação');
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !amount || !description) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('transactions').insert([
                {
                    user_id: user.id,
                    amount: parseFloat(amount.replace(',', '.')),
                    description,
                    category,
                    type,
                    date,
                }
            ]);

            if (error) throw error;
            navigate(-1);
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Erro ao salvar transação');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen">
            <Header title="NOVA TRANSAÇÃO" showBack />

            <main className="flex-grow px-8 pb-32 mt-2">
                <form className="space-y-8" onSubmit={handleSave}>
                    <div className="relative py-4">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Valor</label>
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-bold text-2xl">R$</span>
                            <input
                                className="ios-underlined-input w-full py-2 text-3xl font-bold placeholder:text-zinc-800 text-white focus:ring-0"
                                placeholder="0,00"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 p-1 bg-white/[0.03] rounded-xl border border-white/5">
                        <button
                            type="button"
                            onClick={() => setType('expense')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${type === 'expense' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'text-zinc-500'}`}
                        >
                            Despesa
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('income')}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${type === 'income' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-zinc-500'}`}
                        >
                            Receita
                        </button>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Descrição</label>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500">edit_note</span>
                            <input
                                className="ios-underlined-input w-full py-3 text-sm placeholder:text-zinc-700 text-white focus:ring-0"
                                placeholder="Ex: Supermercado Semanal"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Categoria</label>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500">category</span>
                            <select
                                className="ios-underlined-input w-full py-3 text-sm text-white focus:ring-0 appearance-none"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option className="bg-black" value="Moradia">Moradia</option>
                                <option className="bg-black" value="Alimentação">Alimentação</option>
                                <option className="bg-black" value="Transporte">Transporte</option>
                                <option className="bg-black" value="Lazer">Lazer</option>
                                <option className="bg-black" value="Saúde">Saúde</option>
                                <option className="bg-black" value="Educação">Educação</option>
                                <option className="bg-black" value="Investimentos">Investimentos</option>
                                <option className="bg-black" value="Assinaturas">Assinaturas</option>
                                <option className="bg-black" value="Outros">Outros</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-0 bottom-3 text-zinc-600 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Data</label>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500">calendar_today</span>
                            <input
                                className="ios-underlined-input w-full py-3 text-sm text-white focus:ring-0"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-8 space-y-4">
                        <button
                            className="w-full bg-primary text-black py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-transform flex items-center justify-center disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'SALVANDO...' : 'SALVAR TRANSAÇÃO'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
