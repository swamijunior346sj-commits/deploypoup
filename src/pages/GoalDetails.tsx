import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export default function GoalDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { goals, loading } = useData();

    const goal = goals.find(g => g.id === id);

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Carregando Detalhes...</div>
            </div>
        );
    }

    if (!goal) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-xl font-bold mb-4">Meta não encontrada</h2>
                <button
                    onClick={() => navigate('/goals')}
                    className="px-6 py-2 bg-primary text-black rounded-full font-bold uppercase text-xs"
                >
                    Voltar para Metas
                </button>
            </div>
        );
    }

    const percentage = Math.round((goal.current_amount / (goal.target_amount || 1)) * 100);
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference - (circumference * percentage) / 100;

    return (
        <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen bg-black overflow-x-hidden pb-24 font-display">
            {/* Top Navigation */}
            <div className="flex items-center justify-between p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/50 text-slate-100 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold tracking-tight text-white">{goal.name}</h1>
                <button
                    onClick={() => navigate('/edit-goal', { state: { goal } })}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/50 text-slate-100"
                >
                    <span className="material-symbols-outlined text-primary">edit</span>
                </button>
            </div>

            {/* Hero Progress Circle */}
            <div className="flex flex-col items-center justify-center py-8 relative">
                <div className="relative flex items-center justify-center">
                    {/* Circular Progress */}
                    <svg className="w-64 h-64">
                        <circle
                            className="text-slate-900"
                            cx="128" cy="128" fill="transparent" r={radius}
                            stroke="currentColor" strokeWidth="2"
                        ></circle>
                        <circle
                            className="text-primary progress-ring"
                            cx="128" cy="128" fill="transparent" r={radius}
                            stroke="currentColor"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashoffset}
                            strokeLinecap="round" strokeWidth="2"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(15, 182, 127, 0.4))' }}
                        ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-extrabold tracking-tighter text-white">{percentage}%</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-primary mt-2 font-semibold">Concluído</span>
                    </div>
                </div>
                <div className="mt-8 text-center px-6 w-full">
                    <p className="text-slate-400 text-sm font-medium">Você está quase lá!</p>
                    <div className="flex justify-around mt-6 bg-slate-900/30 p-4 rounded-2xl border border-white/5">
                        <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Saldo Atual</span>
                            <span className="text-xl font-bold text-white mt-1">R$ {goal.current_amount.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="w-px h-10 bg-slate-800 self-center"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Faltam</span>
                            <span className="text-xl font-bold text-primary mt-1">R$ {(goal.target_amount - goal.current_amount).toLocaleString('pt-BR')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gamified Stats Cards */}
            <div className="grid grid-cols-2 gap-4 px-6 mt-4">
                <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-slate-900/20 p-5 neon-glow">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-3xl">local_fire_department</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-white text-lg font-bold">5 meses</h2>
                        <p className="text-slate-500 text-xs font-medium">Sequência poupando</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-slate-900/20 p-5 neon-glow">
                    <div className="text-primary">
                        <span className="material-symbols-outlined text-3xl">token</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-white text-lg font-bold">+450 XP</h2>
                        <p className="text-slate-500 text-xs font-medium">XP Acumulado</p>
                    </div>
                </div>
            </div>

            {/* Monthly Evolution Chart */}
            <div className="px-6 mt-10">
                <h3 className="text-white text-lg font-bold mb-6">Evolução Mensal</h3>
                <div className="relative h-32 w-full">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                        <defs>
                            <linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.15"></stop>
                                <stop offset="100%" stopColor="#0FB67F" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <path d="M 0 80 Q 40 75, 80 65 T 160 55 T 240 40 T 320 25 T 400 15 V 100 H 0 Z" fill="url(#chart-gradient)"></path>
                        <path d="M 0 80 Q 40 75, 80 65 T 160 55 T 240 40 T 320 25 T 400 15" fill="none" stroke="#0FB67F" strokeLinecap="round" strokeWidth="1.5"></path>
                        <circle cx="0" cy="80" fill="#0FB67F" r="2"></circle>
                        <circle cx="80" cy="65" fill="#0FB67F" r="2"></circle>
                        <circle cx="160" cy="55" fill="#0FB67F" r="2"></circle>
                        <circle cx="240" cy="40" fill="#0FB67F" r="2"></circle>
                        <circle cx="320" cy="25" fill="#0FB67F" r="2"></circle>
                        <circle cx="400" cy="15" fill="#0FB67F" r="2"></circle>
                    </svg>
                    <div className="flex justify-between mt-4">
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Maio</span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Jun</span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Jul</span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Ago</span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">Set</span>
                        <span className="text-[10px] text-slate-100 font-bold uppercase tracking-tighter">Out</span>
                    </div>
                </div>
            </div>

            {/* Contribution History Timeline */}
            <div className="px-6 mt-10">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-lg font-bold">Histórico de Depósitos</h3>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Ver tudo</span>
                </div>
                <div className="space-y-0 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-800"></div>
                    <div className="relative pl-10 pb-8">
                        <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-black border-2 border-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-100 font-bold">Depósito Mensal</p>
                                <p className="text-slate-500 text-xs mt-1">12 de Outubro, 2023</p>
                            </div>
                            <p className="text-primary font-bold">+ R$ 2.500</p>
                        </div>
                    </div>
                    {/* Placeholder for more history items */}
                    <div className="relative pl-10 pb-4">
                        <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-black border-2 border-slate-800 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-100 font-bold">Rendimento Estimado</p>
                                <p className="text-slate-500 text-xs mt-1">01 de Outubro, 2023</p>
                            </div>
                            <p className="text-slate-100 font-bold">+ R$ 412,50</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate('/add-goal-value', { state: { goal } })}
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_30px_rgba(15,182,127,0.4)] active:scale-95 transition-transform z-[110]"
            >
                <span className="material-symbols-outlined text-3xl font-bold">add</span>
            </button>

            {/* Subtle Bottom Shadow Mask */}
            <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-[100]"></div>
        </div>
    );
}
