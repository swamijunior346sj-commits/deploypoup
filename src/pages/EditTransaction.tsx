import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

export default function EditTransaction() {
    const navigate = useNavigate();
    const location = useLocation();
    const { categories, subCategories, refreshData } = useData();
    const transaction = location.state?.transaction;

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDocumentAnexado, setIsDocumentAnexado] = useState(true);

    useEffect(() => {
        if (transaction) {
            setAmount(Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
            setDescription(transaction.description);
            const cat = categories.find(c => c.name === transaction.category);
            if (cat) setCategoryId(cat.id);
            setSubCategoryName(transaction.subcategory || '');
            setDate(new Date(transaction.date).toISOString().split('T')[0]);
            setNotes(transaction.notes || '');
        }
    }, [transaction, categories]);

    const filteredSubCategories = useMemo(() => {
        return subCategories.filter(s => s.category_id === categoryId);
    }, [subCategories, categoryId]);

    if (!transaction) {
        return (
            <div className="bg-background-dark text-white min-h-screen flex items-center justify-center p-8 text-center">
                <button onClick={() => navigate('/transactions')} className="text-primary font-bold uppercase tracking-widest text-[10px]">Voltar</button>
            </div>
        );
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const parsedAmount = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
            const selectedCategory = categories.find(c => c.id === categoryId);

            const { error } = await supabase
                .from('transactions')
                .update({
                    amount: parsedAmount,
                    description,
                    category: selectedCategory?.name || transaction.category,
                    subcategory: subCategoryName,
                    date,
                    notes
                })
                .eq('id', transaction.id);

            if (error) throw error;

            await refreshData();
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/transactions');
            }, 2000);
        } catch (error: any) {
            console.error('Error updating transaction:', error);
            alert('Erro ao salvar alterações');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30 relative">
            <Header showBack title="EDITAR TRANSAÇÃO" />

            <form onSubmit={handleSave} className="flex-grow flex flex-col pt-4">
                <main className="px-6 pb-32 space-y-10">
                    {/* Hero Amount Section */}
                    <div className="flex flex-col items-center text-center space-y-2 py-6">
                        <div className="w-full relative">
                            <input
                                className="w-full bg-transparent border-none text-center text-[42px] font-display font-bold text-white focus:ring-0 p-0"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full max-w-[280px]">
                            <input
                                className="w-full bg-transparent border-none text-center text-[15px] font-medium text-zinc-500 focus:ring-0 p-0 placeholder-zinc-700"
                                placeholder="Nome da transação"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Details Card */}
                        <div className="neon-border rounded-[32px] bg-white/[0.02] p-8 space-y-8">
                            <div className="relative">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase block mb-3">Data e Hora</label>
                                <input
                                    type="date"
                                    className="w-full bg-transparent border-none border-b border-white/5 pb-2 text-[14px] text-white focus:ring-0 [color-scheme:dark]"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase block mb-3">Categoria</label>
                                    <select
                                        className="w-full bg-transparent border-none border-b border-white/5 pb-2 text-[14px] text-white focus:ring-0 appearance-none rounded-none"
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} className="bg-black" value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative">
                                    <label className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase block mb-3">Subcategoria</label>
                                    <select
                                        className="w-full bg-transparent border-none border-b border-white/5 pb-2 text-[14px] text-white focus:ring-0 appearance-none rounded-none"
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

                            <div className="relative">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase block mb-3">Notas</label>
                                <textarea
                                    className="w-full bg-transparent border-none border-b border-white/5 pb-2 text-[14px] text-white focus:ring-0 min-h-[60px] resize-none"
                                    placeholder="Notas adicionais..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Document Section */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase px-2">Documento Anexado</h3>
                            <div className={`neon-border rounded-[24px] p-5 flex items-center justify-between bg-white/[0.02] transition-opacity ${!isDocumentAnexado ? 'opacity-50' : ''}`}>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-900 overflow-hidden border border-white/10 relative">
                                        <img
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover opacity-60"
                                            src="https://images.unsplash.com/photo-1554224155-1696413575b8?auto=format&fit=crop&q=80&w=200"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-zinc-400 text-[18px]">receipt_long</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-white">{isDocumentAnexado ? 'comprovante_091223.pdf' : 'Nenhum arquivo'}</span>
                                        <span className="text-[11px] text-zinc-600">{isDocumentAnexado ? '1.2 MB • PDF' : 'Anexe uma foto ou PDF'}</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsDocumentAnexado(!isDocumentAnexado)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isDocumentAnexado ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}
                                >
                                    {isDocumentAnexado ? 'Remover' : 'Anexar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Submit button follows movement (NOT fixed to bottom if that's what was meant, but actually user says "precisa acompanhar o movimento vertical da tela", which usually means it's part of the scroll or it's sticky but scrollable. If I put it in the flow, it follows movement.) */}
                <div className="p-6 pb-12 mt-auto">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-2xl bg-transparent border-2 border-primary text-primary font-bold tracking-[0.3em] text-[11px] uppercase active:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_20px_rgba(15,182,127,0.1)] mb-8"
                    >
                        {loading ? 'SALVANDO...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>

            {showSuccess && (
                <div className="fixed inset-0 bg-background-dark/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-primary font-bold animate-bounce">check</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Registro Atualizado</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Suas alterações foram salvas<br />no banco de dados</p>
                </div>
            )}
        </div>
    );
}
