import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

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
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    if (!transaction) {
        return (
            <div className="bg-background-dark text-white min-h-screen flex items-center justify-center p-8 text-center">
                <div>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Transação não encontrada</p>
                    <button onClick={() => navigate('/transactions')} className="text-primary font-bold uppercase tracking-widest text-[10px] border border-primary/20 px-6 py-2 rounded-full">Voltar</button>
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
            const fileName = `${transaction.id}_${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
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
            alert('Erro ao fazer upload: ' + error.message);
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
            alert('Erro ao excluir transação');
        } finally {
            setLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30">
            <Header showBack title="Detalhes da Transação" />

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
            />

            <main className="flex-grow px-6 pt-4 pb-48 space-y-8">
                {/* Transaction Main Card */}
                <div className="neon-border rounded-[32px] bg-white/[0.02] p-8 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-2xl ${transaction.type === 'income' ? 'bg-primary/10 border-primary/30 text-primary' : (transaction.type === 'expense' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-500')} border flex items-center justify-center mb-6`}>
                        <span className="material-symbols-outlined text-[32px] neon-glow-icon">
                            {transaction.type === 'income' ? 'payments' : (transaction.type === 'transfer' ? 'sync_alt' : 'shopping_bag')}
                        </span>
                    </div>
                    <h2 className="text-4xl font-display font-bold tracking-tight text-white mb-2">
                        {transaction.type === 'expense' ? '-' : (transaction.type === 'income' ? '+' : '')} R$ {Number(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </h2>
                    <p className="text-lg font-medium text-text-secondary">{transaction.description}</p>

                    <div className="mt-8 pt-8 border-t border-white/5 w-full space-y-5">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Data e Hora</span>
                            <span className="text-[13px] text-white font-medium">{new Date(transaction.date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' })} • {new Date(transaction.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Fluxo</span>
                            <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${transaction.type === 'income' ? 'bg-primary/10 text-primary' : (transaction.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500')}`}>
                                {transaction.type === 'income' ? 'Entrada' : (transaction.type === 'expense' ? 'Saída' : 'Transferência')}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Categoria</span>
                            <span className="text-[13px] text-white font-medium">{transaction.category}</span>
                        </div>
                        {transaction.subcategory && (
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Subcategoria</span>
                                <span className="text-[13px] text-white font-medium">{transaction.subcategory}</span>
                            </div>
                        )}
                        {transaction.notes && (
                            <div className="pt-2 text-left bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 block mb-2">Observações</span>
                                <p className="text-xs text-zinc-400 leading-relaxed font-medium">{transaction.notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Attached Document Section */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase px-2">Comprovante</h3>

                    {!receiptUrl ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center mb-3 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                                <span className="material-symbols-outlined text-zinc-500 group-hover:text-primary transition-colors">upload_file</span>
                            </div>
                            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-primary transition-colors">
                                {uploading ? 'Enviando...' : 'Importar Comprovante'}
                            </span>
                        </div>
                    ) : (
                        <div className="border border-white/10 rounded-2xl p-4 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 rounded-lg bg-zinc-900 overflow-hidden border border-white/10 relative">
                                    {receiptUrl.toLowerCase().endsWith('.pdf') ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                                            <span className="material-symbols-outlined text-red-500 text-[24px]">picture_as_pdf</span>
                                        </div>
                                    ) : (
                                        <img
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover opacity-80"
                                            src={receiptUrl}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-medium text-white truncate max-w-[150px]">Comprovante Anexado</span>
                                    <span className="text-[11px] text-zinc-600 uppercase font-bold tracking-tighter">Clique para ver</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => window.open(receiptUrl, '_blank')}
                                    className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all"
                                >
                                    Abrir
                                </button>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-500 active:scale-95 transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Sticky Footer Actions */}
            <footer className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent z-50">
                <div className="flex space-x-4 max-w-sm mx-auto">
                    <button
                        onClick={() => navigate('/edit-transaction', { state: { transaction } })}
                        className="flex-1 h-14 rounded-2xl border border-primary text-primary font-bold tracking-[0.2em] text-[10px] uppercase active:bg-primary/10 transition-all"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex-1 h-14 rounded-2xl border border-red-500/30 text-red-500 font-bold tracking-[0.2em] text-[10px] uppercase active:bg-red-500/10 transition-all"
                    >
                        Excluir
                    </button>
                </div>
            </footer>

            <ActionPopup
                isOpen={showDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="EXCLUIR TRANSAÇÃO"
                description="Esta ação é permanente. Deseja remover este registro do seu histórico?"
                confirmText="EXCLUIR"
                type="delete"
            />

            {showSuccess && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-primary font-bold animate-bounce">check</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Transação Removida</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Registro excluído com sucesso<br />do seu histórico financeiro</p>
                </div>
            )}
        </div>
    );
}
