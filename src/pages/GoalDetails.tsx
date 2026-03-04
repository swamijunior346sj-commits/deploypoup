import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { motion } from 'motion/react';
import Header from '../components/Header';

export default function GoalDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { goals, transactions, loading } = useData();

    const goal = goals.find(g => g.id === id);

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full shadow-[0_0_20px_rgba(15,182,127,0.3)]"
                />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">Sincronizando Meta...</span>
            </div>
        );
    }

    if (!goal) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-xl font-black mb-4 uppercase tracking-tighter italic">Meta não encontrada</h2>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-4 bg-primary text-black rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all"
                >
                    Retornar ao Dashboard
                </button>
            </div>
        );
    }

    const percentage = Math.min(100, Math.round((goal.current_amount / (goal.target_amount || 1)) * 100));
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference - (circumference * percentage) / 100;

    // Filter relevant transactions (contributions)
    // Assuming transactions are linked to goals or we just show recent activity as placeholder if not linked
    const contributions = transactions.filter(t => t.type === 'income' && t.category === 'Meta').slice(0, 5);

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Detalhes da Meta" showBack onAction={() => navigate('/edit-goal', { state: { goal } })} actionIcon="settings" />

            <main className="flex-grow px-6 pt-10 pb-40 relative z-10 space-y-12 overflow-y-auto no-scrollbar">

                {/* ── Hero Progress Section ── */}
                <section className="flex flex-col items-center text-center">
                    <div className="relative flex items-center justify-center">
                        {/* Circular Progress (Luxury Ring) */}
                        <svg className="w-64 h-64 -rotate-90">
                            <circle
                                className="text-zinc-900"
                                cx="128" cy="128" fill="transparent" r={radius}
                                stroke="currentColor" strokeWidth="2"
                            />
                            <motion.circle
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: dashoffset }}
                                transition={{ duration: 2, ease: "circOut" }}
                                className="text-primary"
                                cx="128" cy="128" fill="transparent" r={radius}
                                stroke="currentColor"
                                strokeDasharray={circumference}
                                strokeLinecap="round" strokeWidth="3"
                                style={{ filter: 'drop-shadow(0 0 15px rgba(15, 182, 127, 0.5))' }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-1">Seu Progresso</span>
                            <h2 className="text-6xl font-display font-black text-white italic tracking-tighter premium-text-glow">
                                {percentage}%
                            </h2>
                            <div className="flex items-center gap-1 mt-2">
                                <div className="w-1 h-1 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#0FB67F]"></div>
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest italic">Protocolo Ativo</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 w-full space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-black text-white italic tracking-tight uppercase">{goal.name}</h1>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic opacity-60">"O FOCO É A CHAVE PARA A CONQUISTA"</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="transparent-card-border rounded-[2.2rem] p-6 bg-zinc-950/20 flex flex-col items-center gap-2 border-white/5">
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Saldo Acumulado</span>
                                <p className="text-lg font-black text-white italic">R$ {goal.current_amount.toLocaleString('pt-BR')}</p>
                            </div>
                            <div className="transparent-card-border rounded-[2.2rem] p-6 bg-zinc-950/20 flex flex-col items-center gap-2 border-white/5">
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Total Faltante</span>
                                <p className="text-lg font-black text-primary italic">R$ {(goal.target_amount - goal.current_amount).toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Visual Stats Grid ── */}
                <section className="grid grid-cols-2 gap-4">
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/40 space-y-4 group overflow-hidden border-white/5"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-xl">local_fire_department</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-white italic">14 Dias</h4>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Sequência Poupando</p>
                        </div>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full"></div>
                    </motion.div>

                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/40 space-y-4 group overflow-hidden border-white/5"
                    >
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <span className="material-symbols-outlined text-blue-500 text-xl">auto_awesome</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-white italic">+250 XP</h4>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">XP Acumulado</p>
                        </div>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-2xl rounded-full"></div>
                    </motion.div>
                </section>

                {/* ── Deposit History ── */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Auditória de Depósitos</h3>
                        <span className="text-[8px] font-black text-primary uppercase tracking-widest">Ver Tudo</span>
                    </div>

                    <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 space-y-8 border-white/5">
                        {contributions.length > 0 ? (
                            contributions.map((t, idx) => (
                                <div key={t.id} className="relative pl-10">
                                    {/* Timeline Glow Link */}
                                    {idx !== contributions.length - 1 && (
                                        <div className="absolute left-[7px] top-6 bottom-[-32px] w-[1px] bg-gradient-to-b from-primary/30 to-transparent"></div>
                                    )}

                                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-black border-2 border-primary flex items-center justify-center shadow-[0_0_10px_rgba(15,182,127,0.3)] z-10">
                                        <div className="w-1 h-1 rounded-full bg-primary"></div>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-white uppercase tracking-tight italic">Alocação de Meta</p>
                                            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-primary italic">+ R$ {Number(t.amount).toLocaleString('pt-BR')}</p>
                                            <div className="flex items-center gap-1 justify-end mt-1">
                                                <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Protocolo Concluído</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <span className="material-symbols-outlined text-zinc-800 text-5xl mb-4">history</span>
                                <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">Nenhum registro encontrado</p>
                            </div>
                        )}
                    </div>
                </section>

            </main>

            {/* ── Standardized Luxury FAB ── */}
            <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/add-goal-value', { state: { goal } })}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
                >
                    <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
                </motion.button>
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
        </div>
    );
}
