import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Budgets() {
    const navigate = useNavigate();

    const budgets = [
        { name: 'Alimentação', type: 'Despesa', icon: 'restaurant', spent: 2360, target: 2000, spentLabel: 'Gasto' },
        { name: 'Moradia', type: 'Despesa', icon: 'home', spent: 3100, target: 3500, spentLabel: 'Gasto' },
        { name: 'Salário Mensal', type: 'Receita', icon: 'payments', spent: 8000, target: 8000, spentLabel: 'Recebido' },
        { name: 'Lazer & Hobbies', type: 'Despesa', icon: 'local_activity', spent: 450, target: 500, spentLabel: 'Gasto' },
    ];

    const [alertBudget, setAlertBudget] = useState<{ name: string; spent: number; target: number; percentage: number } | null>(null);

    useEffect(() => {
        const exceeded = budgets.find(b => b.type === 'Despesa' && b.spent > b.target);
        if (exceeded) {
            const exceededPercent = Math.round(((exceeded.spent - exceeded.target) / exceeded.target) * 100);
            setAlertBudget({
                name: exceeded.name,
                spent: exceeded.spent,
                target: exceeded.target,
                percentage: exceededPercent
            });
        }
    }, []);

    return (
        <div className={`bg-black text-[#D6D6D6] font-sans flex flex-col min-h-screen overflow-x-hidden ${alertBudget ? 'overflow-hidden' : ''}`}>
            <div className={alertBudget ? 'fixed inset-0 z-0 overflow-y-auto filter blur-sm pointer-events-none' : ''}>
                <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-20">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95">
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

            {/* AI Alert Modal */}
            {alertBudget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-[2px]">
                    <div className="w-full max-w-sm bg-[#0D0E10] border border-zinc-800 rounded-[32px] p-8 relative overflow-hidden" style={{ boxShadow: '0 0 25px rgba(15, 182, 127, 0.4)' }}>
                        <div className="flex justify-center mb-6">
                            <div className="bg-primary/10 p-4 rounded-full animate-pulse">
                                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                            </div>
                        </div>

                        <div className="text-center space-y-3 mb-8">
                            <h2 className="text-[#FCFCFC] font-display font-bold text-base tracking-[0.2em] uppercase">ALERTA DE ORÇAMENTO</h2>
                            <p className="text-sm text-[#D6D6D6] leading-relaxed font-medium">
                                Detectamos que você excedeu seu limite mensal de <span className="text-[#FCFCFC] font-bold">{alertBudget.name}</span> em <span className="text-primary font-bold">{alertBudget.percentage}%</span>.
                            </p>
                        </div>

                        <div className="bg-zinc-900/50 rounded-2xl p-5 mb-8 border border-zinc-800/50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Gasto Atual</span>
                                <span className="text-primary font-display font-bold text-base">R$ {alertBudget.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-full"></div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Limite</span>
                                <span className="text-[#FCFCFC] font-medium text-sm">R$ {alertBudget.target.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { setAlertBudget(null); navigate('/budget-details', { state: { budget: budgets.find(b => b.name === alertBudget.name) } }); }}
                                className="w-full bg-primary hover:bg-primary/90 text-black font-display font-bold text-xs py-5 rounded-2xl transition-all active:scale-95 tracking-[0.1em]"
                            >
                                AJUSTAR PLANEJAMENTO
                            </button>
                            <button
                                onClick={() => setAlertBudget(null)}
                                className="w-full bg-transparent border border-zinc-800 hover:bg-zinc-800/30 text-[#D6D6D6] font-display font-bold text-[10px] py-4 rounded-2xl transition-all active:scale-95 tracking-[0.2em]"
                            >
                                FECHAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
