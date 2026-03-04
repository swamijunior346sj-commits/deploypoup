import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';
import { motion, AnimatePresence } from 'motion/react';

export default function TransactionDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshData } = useData();
    const transaction = location.state?.transaction;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [receiptUrl, setReceiptUrl] = useState<string | null>(transaction?.receipt_url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!transaction) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center p-8 text-center">
                <div className="space-y-6">
                    <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px]">Transação não identificada</p>
                    <button onClick={() => navigate('/transactions')} className="text-primary font-black uppercase tracking-[0.2em] text-[10px] border border-primary/20 px-8 py-3 rounded-2xl bg-primary/5 active:scale-95 transition-all">Voltar ao Fluxo</button>
                </div>
            </div>
        );
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
            alert('Erro ao sincronizar documento: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.from('transactions').delete().eq('id', transaction.id);
            if (error) throw error;

            await refreshData();
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/transactions');
            }, 2000);
        } catch (error: any) {
            console.error('Error deleting transaction:', error);
            alert('Erro ao neutralizar registro');
        } finally {
            setLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const fmtNum = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header showBack title="Detalhes" />

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif,.svg,.webp"
                onChange={handleFileUpload}
            />

            <main className="flex-grow px-6 pt-4 pb-48 space-y-8 relative z-10">
                {/* Transaction Hero Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="transparent-card-border rounded-[2.5rem] bg-zinc-950/20 p-8 flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4">
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${transaction.type === 'income' ? 'border-primary/20 text-primary bg-primary/5' : (transaction.type === 'expense' ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5')}`}>
                            {transaction.type === 'income' ? 'Entrada' : (transaction.type === 'expense' ? 'Saída' : 'Transferência')}
                        </span>
                    </div>

                    <div className={`w-20 h-20 rounded-[1.8rem] ${transaction.type === 'income' ? 'bg-primary/10 border border-primary/20 text-primary shadow-[0_0_30px_rgba(15,182,127,0.1)]' : (transaction.type === 'expense' ? 'bg-red-500/10 border border-red-500/20 text-red-500' : 'bg-blue-500/10 border border-blue-500/20 text-blue-500')} flex items-center justify-center mb-6`}>
                        <span className="material-symbols-outlined text-[36px]">
                            {transaction.type === 'income' ? 'payments' : (transaction.type === 'transfer' ? 'sync_alt' : 'shopping_bag')}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-5xl font-display font-black tracking-tighter text-white premium-text-glow">
                            <span className="text-2xl font-light text-zinc-600 mr-2">R$</span>
                            {fmtNum(Number(transaction.amount))}
                        </h2>
                        <p className="text-lg font-bold text-zinc-400 tracking-tight">{transaction.description}</p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/[0.05] w-full space-y-5">
                        <div className="flex justify-between items-center text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Cronologia</span>
                            <span className="text-[12px] text-white font-bold">{new Date(transaction.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })} • {new Date(transaction.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex justify-between items-center text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Ecossistema</span>
                            <span className="text-[12px] text-white font-bold italic">{transaction.category}</span>
                        </div>
                        {transaction.subcategory && (
                            <div className="flex justify-between items-center text-left">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Sub-Eixo</span>
                                <span className="text-[12px] text-zinc-400 font-medium">{transaction.subcategory}</span>
                            </div>
                        )}
                        {transaction.notes && (
                            <div className="pt-2 text-left bg-white/[0.02] p-5 rounded-[1.5rem] border border-white/5">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 block mb-2">Observações Estratégicas</span>
                                <p className="text-xs text-zinc-500 leading-relaxed font-medium italic">"{transaction.notes}"</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Attached Document Section */}
                <section className="space-y-5">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black tracking-[0.4em] text-zinc-600 uppercase">Documentação</h3>
                    </div>

                    {!receiptUrl ? (
                        <motion.div
                            whileTap={{ scale: 0.98 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="transparent-card-border border-dashed border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center bg-zinc-950/20 hover:border-primary/40 transition-all cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 flex items-center justify-center mb-4 border border-white/5 group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
                                <span className="material-symbols-outlined text-zinc-600 group-hover:text-primary transition-colors text-3xl">add_a_photo</span>
                            </div>
                            <span className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                                {uploading ? 'Processando...' : 'Vincular Comprovante'}
                            </span>
                        </motion.div>
                    ) : (
                        <div className="transparent-card-border rounded-[2.5rem] p-5 flex items-center justify-between bg-zinc-950/20">
                            <div className="flex items-center space-x-5">
                                <div className="w-16 h-16 rounded-[1.2rem] bg-zinc-900 overflow-hidden border border-white/10 relative group">
                                    {receiptUrl.toLowerCase().endsWith('.pdf') ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-red-500/5">
                                            <span className="material-symbols-outlined text-red-500 text-[28px]">picture_as_pdf</span>
                                        </div>
                                    ) : (
                                        <img
                                            alt="Document"
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                            src={receiptUrl}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-bold text-white tracking-tight">Comprovante Digital</span>
                                    <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mt-0.5">Ativo Verificado</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => window.open(receiptUrl, '_blank')}
                                    className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center active:scale-90 transition-all shadow-[0_5px_15px_rgba(15,182,127,0.1)]"
                                >
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 flex items-center justify-center active:scale-90 transition-all"
                                >
                                    <span className="material-symbols-outlined">sync</span>
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* Premium Footer Actions */}
            <footer className="fixed bottom-0 left-0 right-0 p-8 glass-nav z-50">
                <div className="flex space-x-4 max-w-sm mx-auto">
                    <button
                        onClick={() => navigate('/edit-transaction', { state: { transaction } })}
                        className="flex-1 h-16 rounded-[1.8rem] border border-primary/30 bg-primary/5 text-primary font-black tracking-[0.3em] text-[10px] uppercase active:scale-95 transition-all shadow-[0_10px_30px_rgba(15,182,127,0.1)]"
                    >
                        Reajustar
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex-1 h-16 rounded-[1.8rem] border border-red-500/20 bg-red-500/5 text-red-500 font-black tracking-[0.3em] text-[10px] uppercase active:scale-95 transition-all"
                    >
                        Neutralizar
                    </button>
                </div>
            </footer>

            <ActionPopup
                isOpen={showDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="NEUTRALIZAR REGISTRO"
                description="Esta transação será removida permanentemente do seu fluxo estratégico."
                confirmText="CONFIRMAR"
                type="delete"
            />

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
                            <h2 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase italic">Neutralizado</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.35em] leading-relaxed">Fluxo recalibrado<br />com sucesso</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
