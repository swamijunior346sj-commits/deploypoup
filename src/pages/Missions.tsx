import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Missions() {
  const navigate = useNavigate();
  const { xp, level, levelName, currentMaxXP, addXP } = useData();
  const [completedMissions, setCompletedMissions] = useState<number[]>(() => {
    const saved = localStorage.getItem('poup_completed_missions');
    return saved ? JSON.parse(saved) : [];
  });

  // ── Quest Categories ──
  const categories = {
    ECONOMIA: { name: "Auditória", icon: "savings", color: "text-primary", bg: "bg-primary/5" },
    INVESTIMENTO: { name: "Expansão", icon: "rocket_launch", color: "text-blue-500", bg: "bg-blue-500/5" },
    EDUCACAO: { name: "Cognição", icon: "psychology", color: "text-purple-500", bg: "bg-purple-500/5" },
    GESTAO: { name: "Operacional", icon: "rebase_edit", color: "text-amber-500", bg: "bg-amber-500/5" }
  };

  // ── Mission Database ──
  const allMissions = useMemo(() => {
    const questData = [
      { id: 1, title: "Protocolo de Entrada", desc: "Registre sua primeira receita do dia para validar as transações.", reward: 50, type: 'ECONOMIA', req: "Registrar Receita" },
      { id: 2, title: "Aporte Estratégico", desc: "Direcione capital para qualquer ativo em custódia.", reward: 150, type: 'INVESTIMENTO', req: "Novo Investimento" },
      { id: 3, title: "Cognição de Mercado", desc: "Analise um relatório detalhado de ativos.", reward: 30, type: 'EDUCACAO', req: "Ver Detalhes de Ativo" },
      { id: 4, title: "Sincronização Fiscal", desc: "Categorize 3 transações pendentes no extrato.", reward: 80, type: 'GESTAO', req: "Editar Transações" },
      { id: 5, title: "Muralha de Proteção", desc: "Crie ou ajuste um orçamento de segurança.", reward: 100, type: 'ECONOMIA', req: "Novo Orçamento" },
      { id: 6, title: "Visão Alpha", desc: "Utilize a análise de IA para ler seus gastos.", reward: 200, type: 'GESTAO', req: "Neural Insight" },
      { id: 7, title: "Alvo Formalizado", desc: "Defina uma nova meta de médio prazo.", reward: 120, type: 'ECONOMIA', req: "Nova Meta" },
      { id: 8, title: "Feedback Holístico", desc: "Atualize seus dados de perfil de investidor.", reward: 40, type: 'EDUCACAO', req: "Editar Perfil" },
    ];
    return questData;
  }, []);

  const handleComplete = (id: number, reward: number) => {
    if (completedMissions.includes(id)) return;
    const newCompleted = [...completedMissions, id];
    setCompletedMissions(newCompleted);
    localStorage.setItem('poup_completed_missions', JSON.stringify(newCompleted));
    addXP(reward);
  };

  const [showLevelModal, setShowLevelModal] = useState(false);

  const xpPercentage = (xp / currentMaxXP) * 100;

  return (
    <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
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

      {/* ── Background Aura ── */}
      <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Header showBack title="Central de Missões" />

      <main className="flex-grow px-6 pt-8 pb-32 relative z-10 space-y-12 overflow-y-auto no-scrollbar">

        {/* ── Progress Hero Card (One-Click) ── */}
        <section
          onClick={() => setShowLevelModal(true)}
          className="transparent-card-border rounded-[3.5rem] p-10 bg-zinc-950/20 relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl opacity-40 rounded-full"></div>

          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Patente Atual</span>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-display font-black tracking-tighter italic premium-text-glow">{levelName}</h2>
                <span className="material-symbols-outlined text-primary text-sm animate-pulse">keyboard_arrow_down</span>
              </div>
            </div>
            <div className="w-16 h-16 rounded-[1.8rem] bg-black border border-white/10 flex items-center justify-center shadow-2xl">
              <span className="text-2xl font-black text-primary italic">L{level}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sincronização de XP</span>
              <span className="text-[10px] font-bold text-white tracking-widest">{xp} / {currentMaxXP}</span>
            </div>
            <div className="h-2 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                className="h-full bg-gradient-to-r from-primary to-blue-500 shadow-[0_0_15px_rgba(15,182,127,0.4)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:50px_50px] animate-[pulse_2s_infinite]"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Active Quests ── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Quests Disponíveis</h3>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#0FB67F]"></span>
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Reset em 08:42:15</span>
            </div>
          </div>

          <div className="space-y-6">
            {allMissions.map((mission, idx) => {
              const isDone = completedMissions.includes(mission.id);
              const isLocked = !isDone && idx > completedMissions.length + 1; // Logic for locking future missions
              const cat = categories[mission.type as keyof typeof categories];

              return (
                <motion.div
                  key={mission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileTap={!isLocked && !isDone ? { scale: 0.98 } : {}}
                  className={`transparent-card-border rounded-[2.5rem] p-8 transition-all duration-500 relative overflow-hidden group 
                                        ${isDone ? 'bg-zinc-900/10 border-primary/10 opacity-60' :
                      isLocked ? 'bg-zinc-950/40 border-white/5 grayscale saturate-50 opacity-40' :
                        'bg-zinc-950/20 border-white/5 hover:border-primary/30 hover:bg-zinc-900/10'}`}
                >
                  {/* Locked Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                      <span className="material-symbols-outlined text-3xl text-zinc-700 mb-2">lock</span>
                      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em]">Protocolo Bloqueado</span>
                    </div>
                  )}

                  <div className="flex items-start gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-black border border-white/5 shadow-2xl group-hover:border-primary/30 transition-all ${cat.color}`}>
                      <span className="material-symbols-outlined text-3xl font-light">
                        {isDone ? 'verified' : isLocked ? 'lock' : cat.icon}
                      </span>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-[8px] font-black uppercase tracking-widest ${cat.color} bg-black/40 px-3 py-1 rounded-full border border-white/5`}>
                          {cat.name}
                        </span>
                        {isDone && (
                          <span className="text-[8px] font-black uppercase tracking-widest text-primary italic">Concluído</span>
                        )}
                      </div>
                      <h4 className={`text-xl font-display font-black italic tracking-tighter ${isDone ? 'text-zinc-500 line-through' : 'text-white'}`}>
                        {mission.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500 font-medium leading-relaxed uppercase tracking-wider">
                        {mission.desc}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between self-stretch">
                      <div className="text-right">
                        <span className="block text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">Impacto</span>
                        <span className={`text-lg font-black italic ${isDone ? 'text-zinc-700' : 'text-primary'}`}>
                          +{mission.reward}XP
                        </span>
                      </div>

                      {!isDone && !isLocked && (
                        <button
                          onClick={() => handleComplete(mission.id, mission.reward)}
                          className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full active:scale-90 transition-all shadow-xl hover:bg-primary"
                        >
                          Claim
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Action Requirement Hint */}
                  {!isDone && !isLocked && (
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Requisito Operacional:</span>
                      <span className="text-[8px] font-black text-white uppercase tracking-widest italic">{mission.req}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Legendary Unlock Alert ── */}
        <section className="pb-12">
          <div className="transparent-card-border rounded-[2.5rem] p-8 bg-gradient-to-br from-zinc-950 to-black border-yellow-500/10 flex items-center justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-black border border-yellow-500/20 flex items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined text-yellow-500 text-3xl animate-pulse">military_tech</span>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em] mb-1">Quest de Prestígio</h4>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest italic">Complete todas as missões para desbloquear recompensa épica.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Level Modal ── */}
      <AnimatePresence>
        {showLevelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setShowLevelModal(false)}></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm transparent-card-border bg-zinc-950 rounded-[3rem] p-8 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="text-center mb-8">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-2 block">Espectro de Evolução</span>
                <h3 className="text-2xl font-display font-black text-white italic tracking-tighter uppercase">Hierarquia POUP</h3>
              </div>

              <div className="space-y-3 max-h-[40vh] overflow-y-auto no-scrollbar py-2">
                {useData().levelNames.map((name, i) => {
                  const current = level === i + 1;
                  const isDone = level > i + 1;
                  return (
                    <div
                      key={name}
                      className={`p-4 rounded-2xl flex items-center justify-between border transition-all duration-500 ${current ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(15,182,127,0.1)]' :
                        isDone ? 'bg-zinc-900/40 border-primary/20 opacity-60' :
                          'bg-black/40 border-white/5 opacity-30'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${current ? 'bg-primary text-black' :
                          isDone ? 'bg-primary/20 text-primary' :
                            'bg-zinc-800 text-zinc-600'
                          }`}>
                          {i + 1}
                        </div>
                        <div>
                          <h4 className={`text-[11px] font-black uppercase tracking-tight ${current ? 'text-white' : 'text-zinc-500'}`}>{name}</h4>
                          <span className="text-[7px] font-black text-zinc-600 uppercase">Patente Nível {i + 1}</span>
                        </div>
                      </div>
                      {isDone && <span className="material-symbols-outlined text-primary text-lg">verified</span>}
                      {current && <span className="material-symbols-outlined text-primary text-lg animate-pulse">stars</span>}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setShowLevelModal(false)}
                className="w-full h-16 mt-8 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] active:scale-95 transition-all shadow-xl hover:bg-primary"
              >
                Sincronizar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Standardized Luxury FAB ── */}
      <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/dashboard')}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
        >
          <span className="material-symbols-outlined font-black text-3xl group-hover:scale-110 transition-transform">dashboard</span>
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
