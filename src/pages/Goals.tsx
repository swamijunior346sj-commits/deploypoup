import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';

export default function Goals() {
    const navigate = useNavigate();
    const { xp, level, levelName, currentMaxXP, levelNames } = useData();
    const [showLevelModal, setShowLevelModal] = useState(false);

    const [showBadgesModal, setShowBadgesModal] = useState(false);

    const achievements = [
        { id: 1, title: 'Iniciante', icon: 'rocket_launch', status: 'completed', desc: 'Sua jornada começou.' },
        { id: 2, title: 'Poupador Flash', icon: 'bolt', status: 'completed', desc: 'Economizou R$ 100 em 1 dia.' },
        { id: 3, title: 'Mestre da Renda', icon: 'payments', status: 'locked', desc: 'Receba R$ 500 em proventos.' },
        { id: 4, title: 'Baleia', icon: 'water_drop', status: 'locked', desc: 'Atinja R$ 10k em ativos.' },
    ];

    const allAppBadges = [
        { title: 'Iniciante', icon: 'rocket_launch' },
        { title: 'Poupador Flash', icon: 'bolt' },
        { title: 'Mestre da Renda', icon: 'payments' },
        { title: 'Baleia', icon: 'water_drop' },
        { title: 'Falcão', icon: 'visibility' },
        { title: 'Leão', icon: 'psychology' },
        { title: 'Tubarão', icon: 'monitoring' },
        { title: 'Diamante', icon: 'diamond' },
        { title: 'Explorador', icon: 'explore' },
        { title: 'Sentinela', icon: 'shield' },
        { title: 'Arquiteto', icon: 'architecture' },
        { title: 'Visionário', icon: 'auto_awesome' },
        { title: 'Alfa', icon: 'star' },
        { title: 'Líder', icon: 'groups' },
        { title: 'Gênio', icon: 'lightbulb' },
        { title: 'Estrategista', icon: 'tactic' },
        { title: 'Poupador Real', icon: 'currency_exchange' },
        { title: 'Investidor Global', icon: 'public' },
        { title: 'Mestre FII', icon: 'apartment' },
        { title: 'Ações Elite', icon: 'trending_up' },
        { title: 'Cripto Rei', icon: 'currency_bitcoin' },
        { title: 'Fênix', icon: 'moving' },
        { title: 'Titã', icon: 'workspace_premium' },
        { title: 'Lenda', icon: 'military_tech' }
    ];

    return (
        <div className="bg-black font-display text-white min-h-screen pb-32 overflow-x-hidden selection:bg-primary/30">
            <style>{`
                @keyframes badge-ring-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .animate-badge-ring {
                    animation: badge-ring-rotate 6s linear infinite;
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
                @keyframes levitate {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .levitate-btn {
                    animation: levitate 3s ease-in-out infinite;
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

                {/* Mission Center Widget */}
                <section className="mt-10">
                    <div
                        onClick={() => navigate('/missions')}
                        className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 flex items-center justify-between group active:scale-95 transition-all cursor-pointer overflow-hidden relative"
                    >
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 blur-2xl rounded-full"></div>
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-primary text-2xl animate-pulse">auto_awesome</span>
                            </div>
                            <div>
                                <h3 className="text-white text-sm font-black uppercase tracking-tight">Central de Missões</h3>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Desafios Diários Ativos</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors">arrow_forward</span>
                    </div>
                </section>

                {/* Achievements Grid */}
                <section className="mt-12">
                    <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-2">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Badges de Honra</h3>
                        <span onClick={() => setShowBadgesModal(true)} className="text-[10px] text-primary font-black uppercase tracking-tighter cursor-pointer hover:underline">Ver Todos</span>
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

            {/* Levitating Floating Button for New Goal */}
            <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
                <button
                    onClick={() => navigate('/new-goal')}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
                >
                    <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
                </button>
            </div>

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

            {/* All Badges Modal */}
            {showBadgesModal && (
                <div onClick={() => setShowBadgesModal(false)} className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
                    <div onClick={e => e.stopPropagation()} className="w-full max-w-md bg-zinc-900/50 border border-white/10 rounded-[3rem] p-8 max-h-[85dvh] overflow-y-auto hide-scrollbar relative">
                        <button
                            onClick={() => setShowBadgesModal(false)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-zinc-500">close</span>
                        </button>

                        <div className="text-center mb-10">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 block">Galeria de Conquistas</span>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Panteão de Badges</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pb-6">
                            {allAppBadges.map((badge, idx) => {
                                const isUnlocked = idx < 2;
                                return (
                                    <div key={idx} className="flex flex-col items-center gap-3">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative ${isUnlocked ? 'bg-primary/10 border border-primary/30' : 'bg-white/5 border border-white/5 opacity-30'}`}>
                                            <span className={`material-symbols-outlined text-3xl ${isUnlocked ? 'text-primary' : 'text-zinc-600'}`}>{badge.icon}</span>
                                            {isUnlocked && <span className="material-symbols-outlined absolute -top-1 -right-1 text-primary text-sm filled">check_circle</span>}
                                        </div>
                                        <span className="text-[8px] font-black text-center uppercase text-zinc-500">{badge.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
