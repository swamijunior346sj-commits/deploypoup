import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';

export default function Budgets() {
    const navigate = useNavigate();
    const { budgets, loading } = useData();

    const totalSpent = (budgets || []).reduce((acc, b) => acc + (b.spent || 0), 0);
    const totalTarget = (budgets || []).reduce((acc, b) => acc + (b.target || b.amount || 0), 0);
    const remaining = Math.max(0, totalTarget - totalSpent);
    const progressPercent = totalTarget > 0 ? Math.round((totalSpent / totalTarget) * 100) : 0;

    const [alertBudget, setAlertBudget] = useState<{ name: string; spent: number; target: number; percentage: number } | null>(null);

    useEffect(() => {
        if (loading || !budgets) return;
        const exceeded = (budgets || []).find(b => b.type === 'Despesa' && (b.spent || 0) > (b.target || b.amount || 0));
        if (exceeded) {
            const target = exceeded.target || exceeded.amount;
            const exceededPercent = Math.round(((exceeded.spent - target) / target) * 100);
            setAlertBudget({
                name: exceeded.name,
                spent: exceeded.spent,
                target: target,
                percentage: exceededPercent
            });
        } else {
            setAlertBudget(null);
        }
    }, [budgets, loading]);

    if (loading) {
        return (
            <div className="bg-black text-primary min-h-screen flex items-center justify-center">
                <div className="animate-pulse tracking-[0.3em] uppercase font-bold text-xs">Sincronizando Orçamentos...</div>
            </div>
        );
    }

    return (
        <div className={`relative flex min-h-screen w-full flex-col bg-black overflow-x-hidden max-w-md mx-auto font-display antialiased ${alertBudget ? 'overflow-hidden' : ''}`}>

            <div className={alertBudget ? 'fixed inset-0 z-0 overflow-y-auto filter blur-sm pointer-events-none' : ''}>
                {/* Header */}
                <header className="flex items-center justify-between p-6 pt-8">
                    <button onClick={() => navigate(-1)} className="text-off-white/60 hover:text-off-white transition-colors active:scale-95">
                        <span className="material-symbols-outlined text-[28px]">arrow_back_ios</span>
                    </button>
                    <div className="text-center">
                        <h1 className="text-off-white text-xl font-light tracking-widest uppercase">Orçamentos</h1>
                        <p className="text-primary text-xs font-medium tracking-[0.2em] mt-1">OUTUBRO 2023</p>
                    </div>
                    <button className="text-off-white/60 hover:text-off-white transition-colors">
                        <span className="material-symbols-outlined text-[28px]">calendar_today</span>
                    </button>
                </header>

                {/* Main Circular Chart Section */}
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="relative w-[240px] h-[240px] rounded-full flex items-center justify-center" style={{ background: `conic-gradient(#0FB67F ${Math.min(360, (progressPercent / 100) * 360)}deg, #1A1A1A 0deg)` }}>
                        <div className="absolute w-[236px] h-[236px] rounded-full bg-black"></div>
                        <div className="relative z-10 text-center flex flex-col items-center">
                            <p className="text-off-white/40 text-[10px] uppercase tracking-[0.3em] mb-1">Gasto Total</p>
                            <p className="text-off-white text-4xl font-extralight tracking-tight">R$ {totalSpent.toLocaleString('pt-BR')}</p>
                            <div className="w-8 h-[1px] bg-primary mx-auto my-3 opacity-50"></div>
                            <p className="text-primary/80 text-xs font-light tracking-wide italic">de R$ {totalTarget.toLocaleString('pt-BR')}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-8">
                        <div className="text-center">
                            <p className="text-off-white/40 text-[10px] uppercase tracking-widest mb-1">Restante</p>
                            <p className="text-off-white text-sm font-light">R$ {remaining.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-off-white/40 text-[10px] uppercase tracking-widest mb-1">Progresso</p>
                            <p className="text-primary text-sm font-light">{progressPercent}%</p>
                        </div>
                    </div>
                </div>

                {/* Budget Categories List */}
                <div className="px-6 pb-28 space-y-8">
                    <h2 className="text-off-white/40 text-[10px] uppercase tracking-[0.4em] font-medium mb-4">Categorias</h2>

                    {budgets.map((budget) => {
                        const pct = Math.min((budget.spent / budget.target) * 100, 100);
                        return (
                            <div key={budget.name} onClick={() => navigate('/budget-details')} className="space-y-3 group cursor-pointer active:scale-[0.98] transition-all">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl font-light">{budget.icon}</span>
                                        <span className="text-off-white text-sm font-light tracking-wide">{budget.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <span className="text-off-white text-sm font-medium tracking-tight">R$ {budget.spent.toLocaleString('pt-BR')}</span>
                                            <span className="text-off-white/30 text-[11px] font-light ml-1">/ {budget.target.toLocaleString('pt-BR')}</span>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate('/edit-budget', { state: { budget } });
                                            }}
                                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors ml-1"
                                        >
                                            <span className="material-symbols-outlined text-[#A7A7A7] text-[16px]">edit</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-white/10 overflow-hidden">
                                    <div className={`h-full ${budget.spent > budget.target ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${pct}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <style>{`
                    @keyframes levitate {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                    .levitate-btn {
                        animation: levitate 3s ease-in-out infinite;
                    }
                `}</style>
                <div className="fixed bottom-32 right-6 z-[150] levitate-btn">
                    <button
                        onClick={() => navigate('/new-budget')}
                        className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
                    >
                        <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[-1]">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
                </div>
            </div>

            {/* AI Alert Modal */}
            {alertBudget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-[2px]">
                    <div className="w-full max-w-sm bg-transparent border border-zinc-800 rounded-[32px] p-8 relative overflow-hidden">
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
                                <div className="bg-red-500 h-full w-full"></div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Limite</span>
                                <span className="text-[#FCFCFC] font-medium text-sm">R$ {alertBudget.target.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { setAlertBudget(null); navigate('/edit-budget', { state: { budget: budgets.find(b => b.name === alertBudget.name) } }); }}
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
