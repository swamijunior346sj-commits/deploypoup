import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ManageSubCategories() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialCategory = location.state?.category?.id || 'moradia';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    const subcategories = [
        { id: '1', name: 'Aluguel' },
        { id: '2', name: 'Condomínio' },
        { id: '3', name: 'Energia' },
        { id: '4', name: 'Internet' },
    ];

    const mainCategories = [
        { id: 'moradia', name: 'Moradia', icon: 'home' },
        { id: 'alimentacao', name: 'Alimentação', icon: 'restaurant' },
        { id: 'transporte', name: 'Transporte', icon: 'directions_car' },
        { id: 'lazer', name: 'Lazer', icon: 'celebration' },
        { id: 'saude', name: 'Saúde', icon: 'medical_services' },
        { id: 'educacao', name: 'Educação', icon: 'school' },
        { id: 'investimentos', name: 'Investimentos', icon: 'savings' },
        { id: 'assinaturas', name: 'Assinaturas', icon: 'subscriptions' },
        { id: 'outros', name: 'Outros', icon: 'more_horiz' },
    ];

    const currentIcon = mainCategories.find(c => c.id === selectedCategory.toLowerCase())?.icon || 'home';

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-zinc-400 text-sm">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">GERENCIAR SUBCATEGORIAS</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-8 pb-32">
                <div className="relative mb-10">
                    <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Categoria Principal</label>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary filled">{currentIcon}</span>
                        <div className="relative w-full">
                            <select
                                value={selectedCategory.toLowerCase()}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full bg-transparent border-none border-b border-zinc-800 rounded-none py-3 text-sm font-semibold text-white focus:ring-0 appearance-none bg-none pr-8 focus:border-primary transition-colors"
                            >
                                {mainCategories.map((cat) => (
                                    <option key={cat.id} className="bg-black text-white" value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-0 bottom-3 text-zinc-600 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {subcategories.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between py-4 border-b border-zinc-900/50 group">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-zinc-700 cursor-grab active:cursor-grabbing">drag_indicator</span>
                                <span className="text-sm text-zinc-200">{sub.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate('/edit-subcategory', { state: { subcategory: { ...sub, parentCategory: selectedCategory } } })}
                                    className="text-zinc-500 hover:text-white transition-colors active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                </button>
                                <button className="text-zinc-700 hover:text-red-500 transition-colors active:scale-90">
                                    <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <button
                        onClick={() => navigate('/new-subcategory', { state: { category: mainCategories.find(c => c.id === selectedCategory) || mainCategories[0] } })}
                        className="w-full py-4 border border-zinc-800 rounded-xl flex items-center justify-center gap-2 text-zinc-400 hover:bg-zinc-900 hover:text-primary transition-all active:scale-95 group"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-sm">add</span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Adicionar Subcategoria</span>
                    </button>
                </div>

                <footer className="mt-20 py-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
