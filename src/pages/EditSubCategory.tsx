import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';
import Header from '../components/Header';

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
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <Header title="Ajustes" showBack />

            <main className="flex-grow px-6 pb-40 pt-4">
                <div className="flex flex-col mb-10">
                    <h2 className="text-[24px] font-display font-black tracking-tighter uppercase text-white leading-tight">Refinar<br /><span className="text-primary italic">Subcategoria</span></h2>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] mt-3 opacity-60">Ajuste as ramificações do seu ecossistema</p>
                </div>

                <div className="transparent-card-border rounded-[2.5rem] p-8 space-y-10 mb-10">
                    <div className="space-y-4 relative">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Categoria Principal</label>
                        <select
                            value={selectedParentId}
                            onChange={(e) => setSelectedParentId(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-lg font-bold text-white focus:ring-1 focus:ring-primary/30 appearance-none transition-all outline-none"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} className="bg-zinc-900 text-white" value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 bottom-4 pointer-events-none">
                            <span className="material-symbols-outlined text-zinc-500">expand_more</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Nome da Subcategoria</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-2xl font-display font-bold text-white focus:ring-0 placeholder:text-zinc-900 focus:outline-none"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`w-full h-18 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                    >
                        {loading ? 'Operacionalizando...' : 'Atualizar Subcategoria'}
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full h-18 rounded-[2.5rem] bg-zinc-950/50 border border-red-500/20 text-red-500 font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 hover:bg-red-500/5 shadow-2xl"
                    >
                        Excluir Subcategoria
                    </button>
                </div>
            </main>

            <ActionPopup
                isOpen={showSuccess}
                title="Sincronizado!"
                description="As ramificações foram atualizadas com sucesso."
                confirmText="Prosseguir"
                type="success"
                onConfirm={() => navigate('/manage-categories')}
                onCancel={() => navigate('/manage-categories')}
            />

            <ActionPopup
                isOpen={showDeleteModal}
                title="EXCLUIR?"
                description={`Deseja remover a subcategoria "${name}" do ecossistema?`}
                confirmText="EXCLUIR"
                type="delete"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
}
