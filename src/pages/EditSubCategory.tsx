import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditSubCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const subcategory = location.state?.subcategory || { id: '1', name: 'Aluguel', parentCategory: 'Moradia' };

    const [name, setName] = useState(subcategory.name);
    const [selectedParent, setSelectedParent] = useState(subcategory.parentCategory || 'Moradia');

    const mainCategories = [
        'Moradia', 'Alimentação', 'Transporte', 'Lazer',
        'Saúde', 'Educação', 'Investimentos', 'Assinaturas', 'Outros'
    ];

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-zinc-400 text-sm">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">EDITAR SUBCATEGORIA</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-8 pb-32">
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
                            value={selectedParent}
                            onChange={(e) => setSelectedParent(e.target.value)}
                            className="w-full bg-transparent border-none border-b border-zinc-800 rounded-none py-3 text-sm font-semibold text-white focus:ring-0 appearance-none bg-none pr-8 focus:border-primary transition-colors"
                        >
                            {mainCategories.map((cat) => (
                                <option key={cat} className="bg-black text-white" value={cat}>{cat}</option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-0 bottom-3 text-zinc-600 pointer-events-none">expand_more</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-primary py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                        SALVAR ALTERAÇÕES
                    </button>
                    <button
                        className="w-full bg-transparent border border-zinc-800 py-5 rounded-2xl text-zinc-500 font-display font-bold tracking-[0.1em] uppercase text-sm hover:bg-zinc-900/50 active:scale-[0.98] transition-all"
                    >
                        EXCLUIR SUBCATEGORIA
                    </button>
                </div>

                <footer className="mt-20 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">POWERED BY POUP INTELLIGENCE</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
