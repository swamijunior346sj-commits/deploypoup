import { useNavigate } from 'react-router-dom';

interface SubCategory {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    subcategories: SubCategory[];
}

export default function ManageCategories() {
    const navigate = useNavigate();

    const categories: Category[] = [
        {
            id: '1',
            name: 'Moradia',
            icon: 'home',
            color: 'text-primary',
            subcategories: [
                { id: '1-1', name: 'Aluguel' },
                { id: '1-2', name: 'Condomínio' },
            ],
        },
        {
            id: '2',
            name: 'Alimentação',
            icon: 'restaurant',
            color: 'text-primary',
            subcategories: [
                { id: '2-1', name: 'Supermercado' },
            ],
        },
        {
            id: '3',
            name: 'Lazer',
            icon: 'celebration',
            color: 'text-primary',
            subcategories: [
                { id: '3-1', name: 'Streaming' },
            ],
        },
        {
            id: '4',
            name: 'Saúde',
            icon: 'medical_services',
            color: 'text-primary',
            subcategories: [],
        },
    ];

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-zinc-400 text-sm">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">GERENCIAR CATEGORIAS</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-6 pb-40">
                <div className="space-y-4">
                    {categories.map((cat) => (
                        <details key={cat.id} className="group bg-zinc-900/20 rounded-2xl overflow-hidden border border-zinc-900/50">
                            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-900/40 transition-colors list-none">
                                <div className="flex items-center gap-4">
                                    <span className={`material-symbols-outlined ${cat.color} filled`}>{cat.icon}</span>
                                    <span className="text-sm font-semibold text-zinc-100">{cat.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('/edit-category', { state: { category: cat } });
                                        }}
                                        className="text-zinc-600 hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                    </button>
                                    <span className="material-symbols-outlined text-zinc-600 transition-transform duration-200 group-open:rotate-180">expand_more</span>
                                </div>
                            </summary>
                            <div className="px-4 pb-4 space-y-1">
                                {cat.subcategories.map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between py-3 border-b border-zinc-800/30 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-zinc-700 text-lg cursor-grab active:cursor-grabbing">drag_indicator</span>
                                            <span className="text-sm text-zinc-400">{sub.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate('/edit-subcategory', { state: { subcategory: { ...sub, parentCategory: cat.name } } })}
                                                className="text-zinc-600 hover:text-white transition-colors active:scale-95"
                                            >
                                                <span className="material-symbols-outlined text-base">edit</span>
                                            </button>
                                            <button className="text-zinc-800 hover:text-red-500 transition-colors">
                                                <span className="material-symbols-outlined text-base">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => navigate('/new-subcategory', { state: { category: cat } })}
                                    className="w-full pt-4 pb-2 flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase">Adicionar Subcategoria</span>
                                </button>
                            </div>
                        </details>
                    ))}
                </div>

                <footer className="mt-20 py-4 pb-12">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>

            <button
                onClick={() => navigate('/new-category')}
                className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-black rounded-full shadow-lg shadow-primary/20 flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-transform"
            >
                <span className="material-symbols-outlined text-3xl font-bold">add</span>
            </button>
        </div>
    );
}
