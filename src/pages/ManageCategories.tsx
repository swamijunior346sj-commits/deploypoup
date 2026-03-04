import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';
import { supabase } from '../lib/supabase';
import ActionPopup from '../components/ActionPopup';

export default function ManageCategories() {
    const navigate = useNavigate();
    const { categories, subCategories, transactions, loading, refreshData } = useData();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deletingType, setDeletingType] = useState<'category' | 'subcategory'>('category');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showCockpit, setShowCockpit] = useState(false);

    // Calculate stats for each category
    const categoryStats = useMemo(() => {
        return categories.map(cat => {
            const catSpent = transactions
                .filter(t => t.category === cat.name && t.type === 'expense')
                .reduce((acc, t) => acc + t.amount, 0);

            const subs = subCategories.filter(s => s.category_id === cat.id);

            return {
                ...cat,
                spent: catSpent,
                subcategoriesCount: subs.length,
                subs
            };
        });
    }, [categories, subCategories, transactions]);

    const handleDelete = async () => {
        if (!deletingId) return;
        try {
            const table = deletingType === 'category' ? 'categories' : 'subcategories';
            const { error } = await supabase.from(table).delete().eq('id', deletingId);
            if (error) throw error;
            await refreshData();
            setShowDeleteConfirm(false);
        } catch (err) {
            console.error('Error deleting:', err);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary text-xs font-bold uppercase tracking-widest">Sincronizando Ecossistema...</div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <Header title="Gerenciamento" showBack />

            <main className="flex-grow px-6 pb-40 pt-4">
                <div className="flex flex-col mb-10">
                    <h2 className="text-[28px] font-display font-black tracking-tighter uppercase text-white leading-tight">Estrutura de<br /><span className="text-primary italic">Categorias</span></h2>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] mt-3 opacity-60">Organize sua vida financeira com precisão</p>
                </div>

                <div className="space-y-6">
                    {categoryStats.length > 0 ? (
                        categoryStats.map((cat) => (
                            <div key={cat.id} className="group popup-anim">
                                <div
                                    className={`transparent-card-border rounded-[2.5rem] p-6 transition-all duration-500 overflow-hidden ${expandedCategory === cat.id ? 'border-primary/30 z-10' : 'hover:border-white/10'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="flex items-center gap-5 flex-grow cursor-pointer"
                                            onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                        >
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                                                style={{ borderColor: `${cat.color}30`, backgroundColor: `${cat.color}08`, color: cat.color }}
                                            >
                                                <span className="material-symbols-outlined text-3xl font-extralight">{cat.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{cat.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-none">{cat.subcategoriesCount} SUB CATEGORIAS</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                                    <span className="text-[9px] text-primary font-bold uppercase tracking-widest leading-none">R$ {cat.spent.toLocaleString('pt-BR')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => navigate('/edit-category', { state: { category: cat } })}
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/5 transition-all active:scale-90"
                                            >
                                                <span className="material-symbols-outlined text-xl">edit</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeletingType('category');
                                                    setDeletingId(cat.id);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-800 hover:text-red-500 hover:bg-red-500/5 transition-all active:scale-90"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                            <span
                                                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                                className={`material-symbols-outlined text-zinc-600 transition-transform cursor-pointer p-2 ${expandedCategory === cat.id ? 'rotate-180 text-primary' : ''}`}
                                            >
                                                expand_more
                                            </span>
                                        </div>
                                    </div>

                                    {expandedCategory === cat.id && (
                                        <div className="mt-8 pt-6 border-t border-white/5 space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                                            {cat.subs.map((sub) => (
                                                <div key={sub.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/sub hover:bg-white/10 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                                                            <span className="material-symbols-outlined text-zinc-400 text-lg">{sub.icon || 'circle'}</span>
                                                        </div>
                                                        <span className="text-sm font-medium text-zinc-300 group-hover/sub:text-white transition-colors">{sub.name}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => navigate('/edit-subcategory', { state: { subcategory: sub, categoryName: cat.name } })}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/10 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDeletingType('subcategory');
                                                                setDeletingId(sub.id);
                                                                setShowDeleteConfirm(true);
                                                            }}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-800 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => navigate('/new-subcategory', { state: { category: cat } })}
                                                className="w-full py-5 border-2 border-dashed border-zinc-800 rounded-2xl text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-3 active:scale-95 mt-4"
                                            >
                                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                                Acoplar Nova Subcategoria
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-24 text-center flex flex-col items-center transparent-card-border rounded-[3rem] p-10 bg-zinc-900/5">
                            <div className="w-20 h-20 rounded-full bg-zinc-900/40 border border-zinc-800 flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-5xl text-zinc-800">category</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Panteão Vazio</h3>
                            <p className="text-zinc-600 text-xs font-medium max-w-[200px] leading-relaxed">Sua estrutura de categorias ainda não foi inicializada no ecossistema.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* ── Cockpit FAB Menu ── */}
            <div className="fixed bottom-28 right-6 z-[300] flex flex-col items-end gap-4">
                {showCockpit && (
                    <div className="flex flex-col gap-3 mb-2 animate-in fade-in slide-in-from-bottom-10 duration-500">
                        <button
                            onClick={() => {
                                setShowCockpit(false);
                                navigate('/new-category');
                            }}
                            className="bg-zinc-900 border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-4 shadow-2xl active:scale-90 transition-all hover:bg-zinc-800"
                        >
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Nova Categoria</span>
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-xl">category</span>
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                setShowCockpit(false);
                                navigate('/new-subcategory');
                            }}
                            className="bg-zinc-900 border border-white/10 px-5 py-4 rounded-2xl flex items-center gap-4 shadow-2xl active:scale-90 transition-all hover:bg-zinc-800"
                        >
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Nova Subcategoria</span>
                            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-xl">folder_zip</span>
                            </div>
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setShowCockpit(!showCockpit)}
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-[0_20px_50px_rgba(15,182,127,0.3)] transition-all duration-500 active:scale-90 group ${showCockpit ? 'bg-zinc-800 rotate-45' : 'bg-primary'}`}
                >
                    <span className={`material-symbols-outlined text-3xl font-black transition-colors ${showCockpit ? 'text-primary' : 'text-black'}`}>
                        add
                    </span>
                </button>
            </div>

            {showCockpit && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1900] animate-in fade-in duration-300"
                    onClick={() => setShowCockpit(false)}
                ></div>
            )}

            <ActionPopup
                isOpen={showDeleteConfirm}
                title={`Excluir ${deletingType === 'category' ? 'Categoria' : 'Subcategoria'}?`}
                description={deletingType === 'category' ? "Esta ação removerá permanentemente a categoria e suas conexões." : "Deseja remover esta subcategoria do ecossistema?"}
                confirmText="Excluir"
                type="delete"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </div>
    );
}
