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

    // Calculate spent for each category
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
                <div className="animate-pulse text-primary text-xs font-bold uppercase tracking-widest">Carregando Categorias...</div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col">
            <Header title="Gerenciar Categorias" showBack />

            <main className="flex-grow px-6 pb-40 pt-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Personalize seus gastos</p>
                    </div>
                    <button
                        onClick={() => navigate('/new-category')}
                        className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {categoryStats.length > 0 ? (
                        categoryStats.map((cat) => (
                            <div key={cat.id} className="group">
                                <div
                                    className={`bg-[#121212] border border-white/5 rounded-[2rem] p-5 transition-all duration-300 ${expandedCategory === cat.id ? 'ring-1 ring-primary/30 border-primary/20 shadow-[0_0_20px_rgba(15,182,127,0.05)]' : 'hover:bg-zinc-900/40'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="flex items-center gap-4 flex-grow cursor-pointer"
                                            onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                                                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                                            >
                                                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-base tracking-tight">{cat.name}</h3>
                                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{cat.subcategoriesCount} Subcategorias</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate('/edit-category', { state: { category: cat } })}
                                                className="p-2 text-zinc-600 hover:text-white transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-xl">edit</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeletingType('category');
                                                    setDeletingId(cat.id);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className="p-2 text-zinc-800 hover:text-red-500 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                            <span
                                                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                                                className={`material-symbols-outlined text-zinc-600 transition-transform cursor-pointer ${expandedCategory === cat.id ? 'rotate-180' : ''}`}
                                            >
                                                expand_more
                                            </span>
                                        </div>
                                    </div>

                                    {expandedCategory === cat.id && (
                                        <div className="mt-6 pt-6 border-t border-white/5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            {cat.subs.map((sub) => (
                                                <div key={sub.id} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
                                                    <div className="flex items-center gap-3">
                                                        <span className="material-symbols-outlined text-zinc-600 text-lg">{sub.icon || 'circle'}</span>
                                                        <span className="text-sm font-medium text-zinc-300">{sub.name}</span>
                                                    </div>
                                                    <div className="flex gap-2 text-zinc-800">
                                                        <button
                                                            onClick={() => navigate('/edit-subcategory', { state: { subcategory: sub, categoryName: cat.name } })}
                                                            className="hover:text-white p-1 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-base">edit</span>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDeletingType('subcategory');
                                                                setDeletingId(sub.id);
                                                                setShowDeleteConfirm(true);
                                                            }}
                                                            className="hover:text-red-500 p-1 transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-base">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => navigate('/new-subcategory', { state: { category: cat } })}
                                                className="w-full py-4 border border-dashed border-zinc-800 rounded-2xl text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-base">add_circle</span>
                                                Nova Subcategoria
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center flex flex-col items-center border border-dashed border-white/10 rounded-[2.5rem] bg-zinc-900/20">
                            <span className="material-symbols-outlined text-6xl text-zinc-900 mb-4">category</span>
                            <p className="text-zinc-500 text-sm font-medium">Nenhuma categoria encontrada</p>
                            <button
                                onClick={() => navigate('/new-category')}
                                className="mt-6 px-6 py-3 bg-primary text-black font-bold text-[10px] uppercase tracking-widest rounded-full"
                            >
                                Criar Primeira Categoria
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <ActionPopup
                isOpen={showDeleteConfirm}
                title={`Excluir ${deletingType === 'category' ? 'Categoria' : 'Subcategoria'}?`}
                description={deletingType === 'category' ? "Isso removerá permanentemente esta categoria e todas as suas subcategorias." : "Deseja remover esta subcategoria?"}
                confirmText="Excluir"
                type="delete"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </div>
    );
}
