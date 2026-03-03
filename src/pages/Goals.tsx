import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';

export default function Goals() {
    const { xp, level, levelName, currentMaxXP, levelNames } = useData();
    const [showLevelModal, setShowLevelModal] = useState(false);

    const achievements = [
        { id: 1, title: 'Iniciante', icon: 'rocket_launch', status: 'completed', desc: 'Sua jornada começou.' },
        { id: 2, title: 'Poupador Flash', icon: 'bolt', status: 'completed', desc: 'Economizou R$ 100 em 1 dia.' },
        { id: 3, title: 'Mestre da Renda', icon: 'payments', status: 'locked', desc: 'Receba R$ 500 em proventos.' },
        { id: 4, title: 'Baleia', icon: 'water_drop', status: 'locked', desc: 'Atinja R$ 10k em ativos.' },
    ];

    return (
        <div className="bg-black font-display text-white min-h-screen pb-32 overflow-x-hidden selection:bg-primary/30">
            <style>{`
                @keyframes badge-ring-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-badge-ring {
                    animation: badge-ring-rotate 6s opacity linear infinite;
                }
                @keyframes badge-icon-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-badge-icon {
                    animation: badge-icon-float 3s ease-in-out infinite;
                }
                .neon-text-glow {
                    text-shadow: 0 0 10px rgba(15, 182, 127, 0.5);
                }
            `}</style>

            <Header title="Metas & Conquistas" />

            <main className="px-6 pt-6">
                {/* Level Card */}
                <section
                    onClick={() => setShowLevelModal(true)}
                    className="relative p-8 rounded-[2.5rem] bg-zinc-900 border border-white/5 overflow-hidden active:scale-[0.98] transition-all cursor-pointer shadow-2xl group"
                >
                    <div className="flex justify-between items-start mb-10 relative z-10">
                        <div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2 block">Seu Nível Atual</span>
                            <h2 className="text-4xl font-black text-white leading-none neon-text-glow">{levelName}</h2>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-primary shadow-inner">
                            <span className="text-2xl font-black">{level}</span>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className="text-zinc-500">Exp. de Jornada</span>
                            <span className="text-white">{xp} / {currentMaxXP} XP</span>
                        </div>
                        <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <div
                                className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(15,182,127,0.4)] transition-all duration-1000"
                                style={{ width: `${(xp / currentMaxXP) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/5 blur-3xl rounded-full"></div>
                </section>

                {/* Achievements Grid */}
                <section className="mt-12">
                    <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-2">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Badges de Honra</h3>
                        <span className="text-[10px] text-primary font-black uppercase tracking-tighter cursor-pointer hover:underline">Ver Todos</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {achievements.map((ach, idx) => (
                            <div key={ach.id} className="bg-zinc-900/40 p-6 rounded-[2rem] border border-white/5 flex flex-col items-center text-center group hover:bg-zinc-900 transition-colors">
                                <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                                    {/* Rotating Ring */}
                                    {ach.status === 'completed' && (
                                        <div className="absolute inset-0 animate-[badge-ring-rotate_8s_linear_infinite] border border-dashed border-primary/30 rounded-full"></div>
                                    )}

                                    {/* Icon with levitation */}
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 ${ach.status === 'completed' ? 'bg-black shadow-[0_0_20px_rgba(15,182,127,0.1)] animate-badge-icon' : 'bg-transparent border border-white/5 opacity-20'}`}>
                                        <span className={`material-symbols-outlined text-4xl ${ach.status === 'completed' ? 'text-primary' : 'text-zinc-600'}`}>{ach.icon}</span>
                                    </div>

                                    {/* Completed Check Badge Overlay */}
                                    {ach.status === 'completed' && (
                                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-zinc-900 z-20">
                                            <span className="material-symbols-outlined text-black text-[14px] font-black">check</span>
                                        </div>
                                    )}
                                </div>

                                <h4 className={`text-xs font-black uppercase tracking-widest mb-1 ${ach.status === 'completed' ? 'text-white' : 'text-zinc-700'}`}>{ach.title}</h4>
                                <p className="text-[9px] text-zinc-600 leading-tight font-medium">{ach.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Level Comparison Modal */}
            {showLevelModal && (
                <div className="fixed inset-0 z-[200] flex items-end justify-center px-4 pb-12 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowLevelModal(false)}></div>
                    <div className="relative w-full max-w-md bg-zinc-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
                        <div className="p-8 pb-4">
                            <h3 className="text-2xl font-black text-white mb-1">Escala de Evolução</h3>
                            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Cada nível desbloqueia novas taxas e benefícios</p>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2 no-scrollbar">
                            {levelNames.map((name, i) => {
                                const current = level === i + 1;
                                const isDone = level > i + 1;
                                return (
                                    <div
                                        key={name}
                                        className={`p-5 rounded-[1.5rem] flex items-center justify-between border transition-all ${current ? 'bg-primary/10 border-primary shadow-lg scale-[1.02]' : isDone ? 'bg-zinc-900 border-primary/20 opacity-60' : 'bg-black/20 border-white/5 opacity-30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${current ? 'bg-primary text-black' : isDone ? 'bg-primary/20 text-primary' : 'bg-zinc-800 text-zinc-600'}`}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-black uppercase tracking-tight ${current ? 'text-white' : 'text-zinc-500'}`}>{name}</h4>
                                                <span className="text-[8px] font-black text-zinc-600 uppercase">Benefício Nível {i + 1}</span>
                                            </div>
                                        </div>
                                        {isDone && <span className="material-symbols-outlined text-primary text-xl">check_circle</span>}
                                        {current && <span className="material-symbols-outlined text-primary text-xl animate-pulse">stars</span>}
                                        {!isDone && !current && <span className="material-symbols-outlined text-zinc-800 text-xl">lock</span>}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-8 pt-4">
                            <button
                                onClick={() => setShowLevelModal(false)}
                                className="w-full py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
                            >
                                Prosseguir Jornada
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
