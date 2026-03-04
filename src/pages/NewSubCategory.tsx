import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

export default function NewSubCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { categories, refreshData } = useData();
    const initialCategory = location.state?.category || (categories.length > 0 ? categories[0] : { id: '', name: 'Selecionar Categoria', icon: 'category' });

    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('description');
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [selectedParent, setSelectedParent] = useState(initialCategory);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const icons = [
        'description', 'receipt_long', 'water_drop', 'bolt',
        'wifi', 'cleaning_services', 'weekend', 'key'
    ];

    const handleSave = async () => {
        if (!name || !selectedParent.id) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('subcategories').insert([
                {
                    category_id: selectedParent.id,
                    name,
                    icon: selectedIcon
                }
            ]);

            if (error) throw error;
            await refreshData();
            setShowSuccess(true);
        } catch (err) {
            console.error('Error creating subcategory:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">NOVA SUBCATEGORIA</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-6 pb-40">
                <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-4 relative">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Categoria Pai</label>
                    <div
                        onClick={() => setShowCategorySelect(!showCategorySelect)}
                        className="flex items-center justify-between group cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-xl">{selectedParent.icon}</span>
                            </div>
                            <div>
                                <span className="text-lg font-medium text-white block">{selectedParent.name}</span>
                            </div>
                        </div>
                        <span className={`material-symbols-outlined text-zinc-600 transition-transform ${showCategorySelect ? 'rotate-180' : ''}`}>expand_more</span>
                    </div>

                    {showCategorySelect && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-[#18181b] border border-zinc-800 rounded-2xl p-2 z-50 max-h-60 overflow-y-auto shadow-2xl">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedParent(cat);
                                        setShowCategorySelect(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 rounded-xl transition-colors text-left"
                                >
                                    <span className="material-symbols-outlined text-primary text-lg">{cat.icon}</span>
                                    <span className="text-sm font-medium">{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-8">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Nome da Subcategoria</label>
                    <input
                        className="w-full bg-transparent border-none p-0 text-xl font-medium focus:ring-0 placeholder:text-zinc-700 text-white focus:outline-none"
                        placeholder="Ex: Aluguel, Condomínio..."
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="h-px w-full bg-zinc-800 mt-2"></div>
                </div>

                <div className="mb-12">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-6 px-2">Ícone</label>
                    <div className="grid grid-cols-4 gap-4">
                        {icons.map((icon) => (
                            <button
                                key={icon}
                                onClick={() => setSelectedIcon(icon)}
                                className={`aspect-square rounded-xl flex items-center justify-center border transition-all active:scale-90 ${selectedIcon === icon
                                    ? 'bg-primary/10 border-primary/40 text-primary'
                                    : 'bg-zinc-900/50 border-zinc-800/50 text-white/20'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-2xl ${selectedIcon === icon ? 'filled' : ''}`}>{icon}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={!name || loading}
                    className={`w-full py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-xl transition-all ${name && !loading ? 'bg-primary shadow-primary/20 hover:opacity-90 active:scale-[0.98]' : 'bg-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed'
                        }`}
                >
                    {loading ? 'CRIANDO...' : 'CRIAR SUBCATEGORIA'}
                </button>
            </main>

            <ActionPopup
                isOpen={showSuccess}
                title="Sucesso!"
                description={`A subcategoria "${name}" foi adicionada.`}
                confirmText="OK"
                type="success"
                onConfirm={() => navigate('/manage-categories')}
                onCancel={() => navigate('/manage-categories')}
            />
        </div>
    );
}
