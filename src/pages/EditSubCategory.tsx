import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

export default function EditSubCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { categories, refreshData } = useData();
    const subCategory = location.state?.subcategory || null;

    if (!subCategory) {
        navigate('/manage-categories');
        return null;
    }

    const [name, setName] = useState(subCategory.name);
    const [selectedParentId, setSelectedParentId] = useState(subCategory.category_id);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSave = async () => {
        if (!name) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('subcategories').update({
                name,
                category_id: selectedParentId
            }).eq('id', subCategory.id);

            if (error) throw error;
            await refreshData();
            setShowSuccess(true);
        } catch (err) {
            console.error('Error updating subcategory:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const { error } = await supabase.from('subcategories').delete().eq('id', subCategory.id);
            if (error) throw error;
            await refreshData();
            navigate('/manage-categories');
        } catch (err) {
            console.error('Error deleting subcategory:', err);
        }
    };

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">EDITAR SUBCATEGORIA</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-8 pb-32 pt-4">
                <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-8">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Nome da Subcategoria</label>
                    <input
                        className="w-full bg-transparent border-none p-0 text-xl font-medium text-white focus:ring-0 focus:outline-none"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="h-[1px] w-full bg-zinc-800 mt-2"></div>
                </div>

                <div className="relative mb-10 px-2">
                    <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Categoria Principal</label>
                    <div className="relative w-full">
                        <select
                            value={selectedParentId}
                            onChange={(e) => setSelectedParentId(e.target.value)}
                            className="w-full bg-transparent border-none border-b border-zinc-800 rounded-none py-3 text-sm font-semibold text-white focus:ring-0 appearance-none bg-none pr-8 focus:border-primary transition-colors"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} className="bg-black text-white" value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-0 bottom-3 text-zinc-600 pointer-events-none">expand_more</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full bg-primary py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                        {loading ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full bg-transparent border border-zinc-800 py-5 rounded-2xl text-zinc-500 font-display font-bold tracking-[0.1em] uppercase text-sm hover:bg-zinc-900/50 active:scale-[0.98] transition-all"
                    >
                        EXCLUIR SUBCATEGORIA
                    </button>
                </div>
            </main>

            <ActionPopup
                isOpen={showSuccess}
                title="Salvo!"
                description="Subcategoria atualizada com sucesso."
                confirmText="OK"
                type="success"
                onConfirm={() => navigate('/manage-categories')}
                onCancel={() => navigate('/manage-categories')}
            />

            <ActionPopup
                isOpen={showDeleteModal}
                title="Excluir?"
                description={`Deseja remover a subcategoria "${name}"?`}
                confirmText="Excluir"
                type="delete"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
}
