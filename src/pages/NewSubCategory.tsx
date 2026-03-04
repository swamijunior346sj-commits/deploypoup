import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';
import Header from '../components/Header';

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
        'category', 'payments', 'stars', 'trending_up',
        'account_balance', 'shopping_bag', 'work', 'home',
        'receipt_long', 'redeem', 'support', 'credit_card',
        'shopping_cart', 'directions_bus', 'local_gas_station', 'medical_services',
        'school', 'celebration', 'security', 'checkroom'
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
        <div className="bg-black text-white font-sans flex flex-col min-h-screen selection:bg-primary/30 relative overflow-hidden">
            <Header title="Criar" showBack />

            <main className="flex-grow px-6 pb-40 pt-4">
                <div className="flex flex-col mb-10">
                    <h2 className="text-[24px] font-display font-black tracking-tighter uppercase text-white leading-tight">Nova<br /><span className="text-primary italic">Subcategoria</span></h2>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] mt-3 opacity-60">Refine as conexões do seu ecossistema</p>
                </div>

                <div className="transparent-card-border rounded-[2.5rem] p-8 space-y-10 mb-10">
                    <div className="space-y-4 relative">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Categoria Pai</label>
                        <div
                            onClick={() => setShowCategorySelect(!showCategorySelect)}
                            className="flex items-center justify-between group cursor-pointer bg-white/5 border border-white/5 p-4 rounded-2xl active:scale-[0.98] transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl font-extralight">{selectedParent.icon}</span>
                                </div>
                                <span className="text-lg font-bold text-white block group-hover:text-primary transition-colors">{selectedParent.name}</span>
                            </div>
                            <span className={`material-symbols-outlined text-zinc-600 transition-transform ${showCategorySelect ? 'rotate-180' : ''}`}>expand_more</span>
                        </div>

                        {showCategorySelect && (
                            <div className="absolute left-0 right-0 top-full mt-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-3 z-50 max-h-64 overflow-y-auto shadow-[0_30px_60px_rgba(0,0,0,0.5)] no-scrollbar popup-anim">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedParent(cat);
                                            setShowCategorySelect(false);
                                        }}
                                        className="w-full flex items-center gap-4 px-4 py-4 hover:bg-white/5 rounded-2xl transition-all text-left group/item"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                                            <span className="material-symbols-outlined text-primary text-lg font-extralight">{cat.icon}</span>
                                        </div>
                                        <span className="text-sm font-bold text-zinc-400 group-hover/item:text-white">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Nome da Subcategoria</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-2xl font-display font-bold text-white focus:ring-0 placeholder:text-zinc-900 focus:outline-none"
                            placeholder="Ex: Streaming, Aluguel..."
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"></div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Seletor de Ícone</label>
                        <div className="grid grid-cols-4 gap-4">
                            {icons.map((icon) => (
                                <button
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`aspect-square rounded-2xl flex items-center justify-center border transition-all duration-300 active:scale-90 ${selectedIcon === icon
                                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(15,182,127,0.2)] text-primary'
                                        : 'bg-zinc-900/40 border-white/5 text-zinc-700 hover:text-zinc-500'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-2xl ${selectedIcon === icon ? 'filled scale-110' : ''}`}>{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={!name || !selectedParent.id || loading}
                    className={`w-full h-18 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${!name || !selectedParent.id || loading ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                >
                    {loading ? 'Operacionalizando...' : 'Acoplar Subcategoria'}
                </button>
            </main>

            <ActionPopup
                isOpen={showSuccess}
                title="Sincronizado!"
                description={`A subcategoria "${name}" foi integrada ao ecossistema.`}
                confirmText="Ver Estrutura"
                type="success"
                onConfirm={() => navigate('/manage-categories')}
                onCancel={() => navigate('/manage-categories')}
            />
        </div>
    );
}
