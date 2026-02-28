import { useNavigate } from 'react-router-dom';

export default function Budgets() {
    const navigate = useNavigate();

    const budgets = [
        { name: 'Alimentação', type: 'Despesa', icon: 'restaurant', spent: 1250, target: 2000, spentLabel: 'Gasto' },
        { name: 'Moradia', type: 'Despesa', icon: 'home', spent: 3100, target: 3500, spentLabel: 'Gasto' },
        { name: 'Salário Mensal', type: 'Receita', icon: 'payments', spent: 8000, target: 8000, spentLabel: 'Recebido' },
        { name: 'Lazer & Hobbies', type: 'Despesa', icon: 'local_activity', spent: 450, target: 500, spentLabel: 'Gasto' },
    ];

    return (
        <div className="bg-black text-[#D6D6D6] font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.3em] text-[#FCFCFC] uppercase flex-1 text-center pr-8">
                    ORÇAMENTOS
                </h1>
            </header>

            <main className="flex-1 px-6 pb-40">
                {/* New Budget Button */}
                <section className="mt-4 mb-8">
                    <button onClick={() => navigate('/new-budget')} className="w-full h-16 flex items-center justify-center space-x-3 active:scale-[0.98] transition-all bg-primary/5 rounded-2xl border-2 border-dashed border-primary/40 hover:bg-primary/10">
                        <span className="material-symbols-outlined text-primary">add_circle</span>
                        <span className="text-[11px] font-display font-bold tracking-[0.2em] text-primary uppercase">Novo Orçamento</span>
                    </button>
                </section>

                {/* Budget Cards */}
                <section className="space-y-4">
                    {budgets.map((budget) => {
                        const percentage = Math.min((budget.spent / budget.target) * 100, 100);
                        const targetLabel = budget.type === 'Receita' ? 'Previsto' : 'Meta';

                        return (
                            <div
                                key={budget.name}
                                onClick={() => navigate('/budget-details', { state: { budget } })}
                                className="bg-[#0D0E10] rounded-2xl p-5 flex items-start space-x-4 border border-zinc-900/50 cursor-pointer active:scale-[0.98] transition-transform"
                            >
                                <div className="bg-primary/10 p-3 rounded-xl">
                                    <span className="material-symbols-outlined text-primary text-2xl">{budget.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="text-[#FCFCFC] font-display font-bold text-sm">{budget.name}</h3>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{budget.type}</p>
                                        </div>
                                        <button className="p-1 hover:bg-zinc-800 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-[#A7A7A7] text-lg">edit</span>
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between items-end text-[10px] font-bold tracking-widest uppercase">
                                            <span className="text-zinc-500">{budget.spentLabel}: <span className="text-[#FCFCFC]">R$ {budget.spent.toLocaleString('pt-BR')}</span></span>
                                            <span className="text-zinc-500">{targetLabel}: <span className="text-[#FCFCFC]">R$ {budget.target.toLocaleString('pt-BR')}</span></span>
                                        </div>
                                        <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Footer */}
                <footer className="mt-16 mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2 opacity-30">
                        <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                        <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#FCFCFC]">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
