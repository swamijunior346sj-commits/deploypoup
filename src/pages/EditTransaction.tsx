import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';
import { motion, AnimatePresence } from 'motion/react';

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
    const [type, setType] = useState<'income' | 'expense' | 'transfer'>(transaction?.type || 'expense');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [receiptUrl, setReceiptUrl] = useState<string | null>(transaction?.receipt_url || null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (transaction) {
            setAmount(Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
            setDescription(transaction.description);
            const cat = categories.find(c => c.name === transaction.category);
            if (cat) setCategoryId(cat.id);
            setSubCategoryName(transaction.subcategory || '');
            setDate(new Date(transaction.date).toISOString().split('T')[0]);
            setNotes(transaction.notes || '');
            setType(transaction.type);
        }
    }, [transaction, categories]);

    const filteredSubCategories = useMemo(() => {
        return subCategories.filter(s => s.category_id === categoryId);
    }, [subCategories, categoryId]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !transaction) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${transaction.id}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('receipts')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('receipts')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('transactions')
                .update({ receipt_url: publicUrl })
                .eq('id', transaction.id);

            if (updateError) throw updateError;

            setReceiptUrl(publicUrl);
            await refreshData();
        } catch (error: any) {
            console.error('Error uploading file:', error);
            alert('Erro ao sincronizar documento');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const cleanAmount = amount.replace(/[R$\s]/g, '');
            const normalizedAmount = cleanAmount.includes(',') ? cleanAmount.replace(/\./g, '').replace(',', '.') : cleanAmount;
            const parsedAmount = parseFloat(normalizedAmount);

            const selectedCategory = categories.find(c => c.id === categoryId);

            const { error } = await supabase
                .from('transactions')
                .update({
                    amount: parsedAmount,
                    description,
                    category: type === 'transfer' ? 'Transferência' : (selectedCategory?.name || transaction.category),
                    subcategory: type === 'transfer' ? '' : subCategoryName,
                    date,
                    notes,
                    type
                })
                .eq('id', transaction.id);

            if (error) throw error;

            await refreshData();
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/transactions');
            }, 2000);
        } catch (error: any) {
            console.error('Error updating transaction:', error);
            alert('Erro ao salvar alterações');
        } finally {
            setLoading(false);
        }
    };

    if (!transaction) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center p-8 text-center">
                <button onClick={() => navigate('/transactions')} className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Voltar ao Fluxo</button>
            </div>
        );
    }

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[40%] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header showBack title="Editar Registro" />

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif,.svg,.webp"
                onChange={handleFileUpload}
            />

            <form onSubmit={handleSave} className="flex-grow flex flex-col pb-44 px-6 pt-4 space-y-10 relative z-10">
                {/* Hero Amount Input */}
                <div className="flex flex-col items-center py-6 space-y-2">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Valor Ajustado</span>
                    <div className="flex items-center justify-center w-full">
                        <span className="text-primary font-bold text-2xl mr-2">R$</span>
                        <input
                            className="bg-transparent border-none text-[56px] font-display font-bold text-white focus:ring-0 p-0 text-center w-full premium-text-glow underline underline-offset-[10px] decoration-white/5"
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Type Selector */}
                <div className="p-1.5 bg-zinc-950/50 border border-white/5 rounded-[2.2rem] flex gap-1 shadow-2xl backdrop-blur-md">
                    {[
                        { id: 'expense' as const, label: 'Saída', color: 'text-red-500', bg: 'bg-red-500/10' },
                        { id: 'income' as const, label: 'Entrada', color: 'text-primary', bg: 'bg-primary/10' },
                        { id: 'transfer' as const, label: 'Transf.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setType(t.id)}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl transition-all duration-500 ${type === t.id ? `${t.bg} ${t.color} border border-white/5` : 'text-zinc-600 hover:text-zinc-400'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Data Fields Card */}
                <div className="transparent-card-border rounded-[2.5rem] bg-zinc-950/20 p-8 space-y-10 border border-white/5">
                    <div className="space-y-4">
                        <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Descrição do Registro</label>
                        <input
                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[16px] text-white focus:ring-0 focus:border-primary transition-colors font-medium placeholder:text-zinc-800"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Ecossistema</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 appearance-none font-bold"
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
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Sub-Eixo</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 appearance-none font-medium"
                                    value={subCategoryName}
                                    onChange={(e) => setSubCategoryName(e.target.value)}
                                >
                                    <option value="" className="bg-black">Padronizado</option>
                                    {filteredSubCategories.map(sub => (
                                        <option key={sub.id} className="bg-black" value={sub.name}>{sub.name}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined absolute right-0 top-0 text-zinc-700 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Data e Hora</label>
                        <input
                            type="date"
                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[15px] text-white focus:ring-0 [color-scheme:dark]"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[9px] font-black text-zinc-600 tracking-[0.3em] uppercase block px-1">Observações Estratégicas</label>
                        <textarea
                            className="w-full bg-transparent border-none border-b border-white/5 pb-3 text-[14px] text-zinc-400 focus:ring-0 resize-none min-h-[40px] italic"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                </div>

                {/* Submit Section */}
                <div className="pt-4 pb-12">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full h-18 rounded-[2.2rem] bg-white text-black font-black tracking-[0.4em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading ? 'opacity-50' : 'hover:bg-primary hover:shadow-[0_20px_40px_rgba(15,182,127,0.2)]'}`}
                    >
                        {loading ? 'Sincronizando...' : 'Recalibrar Registro'}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="absolute inset-0 backdrop-blur-2xl bg-black/60 transition-opacity duration-300"></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full max-w-sm transparent-card-border rounded-[3rem] p-12 bg-black/80"
                        >
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 mx-auto border border-primary/20 shadow-[0_0_40px_rgba(15,182,127,0.1)]">
                                <span className="material-symbols-outlined text-5xl text-primary font-bold animate-pulse">verified</span>
                            </div>
                            <h2 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase italic">Recalibrado</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.35em] leading-relaxed">Suas alterações foram<br />salvas com sucesso</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
