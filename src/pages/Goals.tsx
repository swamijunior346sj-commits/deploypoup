import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export default function Goals() {
    const navigate = useNavigate();
    const { goals, loading } = useData();

    // Real data for gamification elements (Level/XP)
    const level = 1;
    const currentXP = 0;
    const maxXP = 100;

    if (loading) {
        return (
            <div className="bg-black text-text-value min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Calculando Metas...</div>
            </div>
        );
    }

    return (
        <div className="bg-black font-display text-text-value min-h-screen pb-32 overflow-x-hidden">
            {/* Gamification Level Bar */}
            <section className="px-6 py-6">
                <div className="rounded-xl p-5 relative overflow-hidden neon-glow">
                    <div className="flex justify-between items-end mb-3">
                        <div>
                            <span className="text-primary text-xs font-bold uppercase tracking-wider">Nível Atual</span>
                            <h2 className="text-3xl font-black text-text-value leading-none">Nível {level}</h2>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-300 text-xs font-medium">{currentXP} / {maxXP} XP</p>
                        </div>
                    </div>
                    <div className="w-full thin-line bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary shadow-[0_0_15px_rgba(0,255,162,0.5)] animate-progress"
                            style={{ width: `${(currentXP / maxXP) * 100}%` } as any}
                        ></div>
                    </div>
                    <p className="mt-3 text-[10px] text-slate-400">Faltam <span className="text-primary font-bold">{maxXP - currentXP} XP</span> para o próximo nível</p>
                    <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                </div>
            </section>

            {/* Main Goal Indicators (Circular) */}
            <section className="px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Progresso Geral</h3>
                    <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {goals.length > 0 ? (
                        goals.slice(0, 2).map((goal) => {
                            const percentage = Math.round((goal.current_amount / (goal.target_amount || 1)) * 100);
                            const dashoffset = 226.2 - (226.2 * percentage) / 100;
                            return (
                                <div
                                    key={goal.id}
                                    onClick={() => navigate(`/goal-details/${goal.id}`)}
                                    className="rounded-xl p-4 flex flex-col items-center text-center bg-transparent border border-white/10 cursor-pointer active:scale-95 transition-transform"
                                >
                                    <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                            <circle className="text-text-value/5" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="2"></circle>
                                            <circle
                                                className="text-primary transition-all duration-1000"
                                                cx="40" cy="40" fill="transparent" r="36"
                                                stroke="currentColor"
                                                strokeDasharray="226.2"
                                                strokeDashoffset={dashoffset}
                                                strokeWidth="2"
                                                style={{ filter: 'drop-shadow(0 0 3px rgba(15, 182, 127, 0.4))' }}
                                            ></circle>
                                        </svg>
                                        <span className="absolute text-sm font-light text-text-value">{percentage}%</span>
                                    </div>
                                    <p className="text-xs font-medium text-text-value mb-1 truncate w-full px-1">{goal.name}</p>
                                    <p className="text-[9px] text-text-label">R$ {goal.current_amount.toLocaleString('pt-BR')} / {goal.target_amount.toLocaleString('pt-BR')}</p>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-2 py-8 text-center border border-dashed border-zinc-800 rounded-2xl">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">Nenhuma meta ativa</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Goal Cards */}
            <section className="px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Suas Metas Ativas</h3>
                    <button className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider">
                        Ver Todas <span className="material-symbols-outlined text-xs">chevron_right</span>
                    </button>
                </div>
                <div className="space-y-4">
                    {goals.map((goal) => {
                        const percentage = Math.round((goal.current_amount / (goal.target_amount || 1)) * 100);
                        return (
                            <div
                                key={goal.id}
                                onClick={() => navigate(`/goal-details/${goal.id}`)}
                                className="rounded-xl p-4 flex gap-4 items-center glow-border bg-zinc-900/30 cursor-pointer active:scale-95 transition-transform"
                            >
                                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary text-2xl">target</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-white">{goal.name}</h4>
                                    <div className="flex justify-between text-[9px] text-zinc-500 mb-1.5 mt-1 uppercase tracking-wider">
                                        <span>R$ {goal.current_amount.toLocaleString('pt-BR')} / {goal.target_amount?.toLocaleString('pt-BR')}</span>
                                        <span>{percentage}%</span>
                                    </div>
                                    <div className="w-full thin-line-goal bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-1000"
                                            style={{ width: `${percentage}%`, boxShadow: '0 0 5px rgba(15, 182, 127, 0.3)' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Achievements Section */}
            <section className="px-6 py-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Conquistas</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {/* Poupador Flash (Completed) */}
                    <div className="flex flex-col items-center gap-2 min-w-[100px] opacity-100">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center border border-primary/60 shadow-[0_0_10px_rgba(15,182,127,0.2)] bg-black">
                                <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 border border-black">
                                <span className="material-symbols-outlined text-[10px] text-black font-bold">check</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-white">Poupador Flash</p>
                            <p className="text-[8px] text-slate-500 leading-tight mt-0.5">Poupe R$ 500 em um mês</p>
                            <p className="text-[8px] font-bold text-primary mt-1 uppercase tracking-tighter">Concluído</p>
                        </div>
                    </div>
                    {/* Primeiros 10k (In Progress) */}
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                        <div className="relative w-14 h-14 mb-1">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                                <circle className="text-white/5" cx="20" cy="20" fill="transparent" r="18" stroke="currentColor" strokeWidth="1"></circle>
                                <circle
                                    className="text-primary" cx="20" cy="20" fill="transparent" r="18"
                                    stroke="currentColor" strokeDasharray="113" strokeDashoffset="17"
                                    strokeWidth="1" style={{ filter: 'drop-shadow(0 0 2px rgba(15, 182, 127, 0.4))' }}
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400 text-xl">savings</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-300">Primeiros 10k</p>
                            <p className="text-[8px] text-slate-500 leading-tight mt-0.5">Alcance seus primeiros R$ 10k</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <div className="w-8 h-0.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                                </div>
                                <span className="text-[8px] font-bold text-primary">85%</span>
                            </div>
                        </div>
                    </div>
                    {/* Investidor Fiel (In Progress) */}
                    <div className="flex flex-col items-center gap-2 min-w-[100px]">
                        <div className="relative w-14 h-14 mb-1">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                                <circle className="text-white/5" cx="20" cy="20" fill="transparent" r="18" stroke="currentColor" strokeWidth="1"></circle>
                                <circle className="text-primary/40" cx="20" cy="20" fill="transparent" r="18" stroke="currentColor" strokeDasharray="113" strokeDashoffset="56.5" strokeWidth="1"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-400 text-xl">military_tech</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-300">Investidor Fiel</p>
                            <p className="text-[8px] text-slate-500 leading-tight mt-0.5">Invista por 6 meses seguidos</p>
                            <div className="flex items-center justify-center gap-1 mt-1">
                                <div className="w-8 h-0.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary/40" style={{ width: '50%' }}></div>
                                </div>
                                <span className="text-[8px] font-bold text-slate-400">50%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Add Button */}
            <div className="fixed bottom-24 right-6 flex justify-center z-[110]">
                <button
                    onClick={() => navigate('/new-goal')}
                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(15,182,127,0.4)] transition-transform active:scale-95"
                >
                    <span className="material-symbols-outlined text-black font-bold text-3xl">add</span>
                </button>
            </div>
        </div>
    );
}
