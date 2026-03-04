import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';

export default function Categories() {
    const navigate = useNavigate();
    const { categories, transactions, loading } = useData();

    const categoryStats = useMemo(() => {
        return categories.map(cat => {
            const spent = transactions
                .filter(t => t.category === cat.name && t.type === 'expense')
                .reduce((acc, t) => acc + Number(t.amount || 0), 0);

            const planned = Number(cat.planned_budget || 500); // Default placeholder

            return {
                ...cat,
                spent,
                planned
            };
        });
    }, [categories, transactions]);

    const totalSpent = useMemo(() => categoryStats.reduce((acc, cat) => acc + cat.spent, 0), [categoryStats]);
    const totalPlanned = useMemo(() => categoryStats.reduce((acc, cat) => acc + cat.planned, 0), [categoryStats]);

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Analisando Categorias...</div>
            </div>
        );
    }

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col">
            <Header showBack title="Categorias" />

            <main className="flex-grow px-6 pb-32 space-y-8">
                <div className="bg-zinc-950 border border-zinc-900 rounded-[32px] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase mb-2">Gasto Total por Categoria</span>
                        <h2 className="text-3xl font-bold font-display text-white">R$ {totalSpent.toLocaleString('pt-BR')}</h2>
                        <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest">Planejado: R$ {totalPlanned.toLocaleString('pt-BR')}</p>

                        <div className="w-full mt-6 space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                <span className="text-zinc-500">Saldo Planejado</span>
                                <span className={totalSpent > totalPlanned ? 'text-red-500' : 'text-primary'}>
                                    {totalPlanned > 0 ? Math.round((totalSpent / totalPlanned) * 100) : 0}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${totalSpent > totalPlanned ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`}
                                    style={{ width: `${Math.min((totalSpent / (totalPlanned || 1)) * 100, 100)}%` }}
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
                            Gerenciar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {categoryStats.length > 0 ? (
                            categoryStats.map((cat) => (
                                <div
                                    key={cat.id}
                                    onClick={() => navigate('/edit-category', { state: { category: cat } })}
                                    className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between group cursor-pointer active:bg-zinc-900 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{ backgroundColor: `${cat.color}20` }}
                                        >
                                            <span className="material-symbols-outlined text-2xl" style={{ color: cat.color }}>{cat.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white tracking-tight">{cat.name}</h4>
                                            <p className="text-[10px] text-zinc-500 font-medium tracking-tight">
                                                R$ {cat.spent.toLocaleString('pt-BR')} / R$ {cat.planned.toLocaleString('pt-BR')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                        <span className={`text-[10px] font-bold ${cat.spent > cat.planned ? 'text-red-500' : 'text-zinc-500'}`}>
                                            {cat.planned > 0 ? Math.round((cat.spent / cat.planned) * 100) : 0}%
                                        </span>
                                        <div className="w-20 h-1 bg-zinc-900 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${cat.spent > cat.planned ? 'bg-red-500' : ''}`}
                                                style={{
                                                    width: `${Math.min((cat.spent / (cat.planned || 1)) * 100, 100)}%`,
                                                    backgroundColor: cat.spent <= cat.planned ? cat.color : undefined
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center flex flex-col items-center border border-dashed border-zinc-900 rounded-[2rem]">
                                <span className="material-symbols-outlined text-zinc-900 text-5xl mb-3">dashboard_customize</span>
                                <p className="text-zinc-700 text-xs font-bold uppercase tracking-widest">Crie suas próprias categorias</p>
                                <button
                                    onClick={() => navigate('/manage-categories')}
                                    className="mt-4 px-6 py-2 bg-primary/10 text-primary font-bold text-[9px] uppercase tracking-widest rounded-full"
                                >
                                    Configurar Agora
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
