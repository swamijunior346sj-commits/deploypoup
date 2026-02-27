import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface CategorySpend {
    id: string;
    name: string;
    spent: number;
    planned: number;
    icon: string;
    color: string;
}

export default function Categories() {
    const navigate = useNavigate();

    const categories: CategorySpend[] = [
        { id: '1', name: 'Moradia', spent: 1250, planned: 1500, icon: 'home', color: 'bg-blue-500' },
        { id: '2', name: 'Alimentação', spent: 850, planned: 1000, icon: 'restaurant', color: 'bg-amber-500' },
        { id: '3', name: 'Transporte', spent: 450, planned: 500, icon: 'directions_car', color: 'bg-purple-500' },
        { id: '4', name: 'Lazer', spent: 600, planned: 400, icon: 'sports_esports', color: 'bg-pink-500' },
        { id: '5', name: 'Saúde', spent: 200, planned: 300, icon: 'medical_services', color: 'bg-emerald-500' },
        { id: '6', name: 'Educação', spent: 300, planned: 300, icon: 'school', color: 'bg-indigo-500' },
        { id: '7', name: 'Compras', spent: 750, planned: 600, icon: 'shopping_bag', color: 'bg-rose-500' },
        { id: '8', name: 'Outros', spent: 150, planned: 200, icon: 'more_horiz', color: 'bg-zinc-500' },
    ];

    const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
    const totalPlanned = categories.reduce((acc, cat) => acc + cat.planned, 0);

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col">
            <Header showBack title="Categorias" />

            <main className="flex-grow px-6 pb-32 space-y-8">
                <div className="bg-zinc-950 border border-zinc-900 rounded-[32px] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase mb-2">Gasto Total por Categoria</span>
                        <h2 className="text-3xl font-bold font-display text-white">R$ {totalSpent.toLocaleString('pt-BR')}</h2>
                        <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest">Limite Planejado: R$ {totalPlanned.toLocaleString('pt-BR')}</p>

                        <div className="w-full mt-6 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                <span className="text-zinc-500">Progresso Geral</span>
                                <span className={totalSpent > totalPlanned ? 'text-red-500' : 'text-primary'}>
                                    {Math.round((totalSpent / totalPlanned) * 100)}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${totalSpent > totalPlanned ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`}
                                    style={{ width: `${Math.min((totalSpent / totalPlanned) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Detalhamento</h3>
                        <button
                            onClick={() => navigate('/manage-categories')}
                            className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full active:scale-95 transition-transform"
                        >
                            Adicionar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => navigate('/edit-category', { state: { category: cat } })}
                                className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between group cursor-pointer active:bg-zinc-900 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-2xl ${cat.color}/20 flex items-center justify-center`}>
                                        <span className={`material-symbols-outlined ${cat.color.replace('bg-', 'text-')} text-2xl`}>{cat.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold">{cat.name}</h4>
                                        <p className="text-[10px] text-zinc-500 font-medium tracking-tight">
                                            R$ {cat.spent.toLocaleString('pt-BR')} / R$ {cat.planned.toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <span className={`text-xs font-bold ${cat.spent > cat.planned ? 'text-red-500' : 'text-zinc-300'}`}>
                                        {Math.round((cat.spent / cat.planned) * 100)}%
                                    </span>
                                    <div className="w-20 h-1 bg-zinc-900 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${cat.spent > cat.planned ? 'bg-red-500' : cat.color}`}
                                            style={{ width: `${Math.min((cat.spent / cat.planned) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <footer className="pt-8 pb-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-700">
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
