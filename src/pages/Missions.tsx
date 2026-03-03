import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';

export default function Missions() {
  const navigate = useNavigate();
  const { xp, level, levelName, currentMaxXP, addXP } = useData();
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  // Unique missions for 60 days
  const allMissions = useMemo(() => {
    const categories = [
      { name: "Economia", icon: "savings", color: "text-primary" },
      { name: "Investimento", icon: "trending_up", color: "text-blue-400" },
      { name: "Educação", icon: "menu_book", color: "text-purple-400" },
      { name: "Gestão", icon: "receipt_long", color: "text-amber-400" }
    ];

    return Array.from({ length: 30 }, (_, dayIdx) => {
      const day = dayIdx + 1;
      return [
        {
          id: day * 2 - 1,
          day,
          title: `Missão 1 - Dia ${day}`,
          desc: "Foco em controle e disciplina financeira.",
          reward: 5,
          cat: categories[day % categories.length]
        },
        {
          id: day * 2,
          day,
          title: `Missão 2 - Dia ${day}`,
          desc: "Foco em expansão de patrimônio e conhecimento.",
          reward: 10,
          cat: categories[(day + 1) % categories.length]
        }
      ];
    }).flat();
  }, []);

  const todayMissions = allMissions.slice(0, 2);
  const futureMissions = allMissions.slice(2);

  const handleComplete = (id: number, xpAmount: number) => {
    if (completedMissions.includes(id)) return;
    setCompletedMissions(prev => [...prev, id]);
    addXP(xpAmount);
  };

  return (
    <div className="bg-black font-display text-white min-h-screen pb-32 overflow-x-hidden selection:bg-primary/30">
      <style>{`
            .mission-card-glow {
                box-shadow: 0 0 20px rgba(15, 182, 127, 0.05);
            }
            .mission-card-glow:hover {
                box-shadow: 0 0 30px rgba(15, 182, 127, 0.15);
            }
        `}</style>
      <Header showBack title="Missões Diárias" onBack={() => navigate('/dashboard')} />

      <main className="px-6 pt-6">
        {/* Level Info Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Status de Evolução</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-black text-white">{levelName}</h2>
              <span className="text-primary text-sm font-bold">Lvl {level}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black text-zinc-600 leading-none">XP</span>
            <span className="text-lg font-black text-white">{xp}</span>
          </div>
        </div>

        {/* Today's Focus */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Missões de Hoje</h3>
            <span className="text-[10px] font-black text-primary px-2 py-1 bg-primary/10 rounded border border-primary/20 uppercase tracking-tighter">Reseta em 12h</span>
          </div>
          <div className="space-y-4">
            {todayMissions.map(m => {
              const isDone = completedMissions.includes(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => handleComplete(m.id, m.reward)}
                  className={`relative overflow-hidden p-6 rounded-[2rem] border transition-all cursor-pointer mission-card-glow ${isDone ? 'bg-zinc-900/40 border-primary/20 opacity-60' : 'bg-zinc-900 border-white/10 active:scale-[0.98]'
                    }`}
                >
                  <div className="flex items-center gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-black border border-white/5 ${m.cat.color}`}>
                      <span className="material-symbols-outlined text-3xl">{isDone ? 'check' : m.cat.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1 block">{m.cat.name} • Dia {m.day}</span>
                      <h4 className={`text-lg font-black ${isDone ? 'text-zinc-500 line-through' : 'text-white'}`}>{m.title}</h4>
                      <p className="text-xs text-zinc-500 mt-1">{m.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-zinc-700 font-black uppercase mb-1">Recompensa</span>
                      <span className={`text-xl font-black ${isDone ? 'text-zinc-700' : 'text-primary'}`}>+{m.reward} XP</span>
                    </div>
                  </div>
                  {!isDone && <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 blur-2xl rounded-full"></div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Challenges */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Próximos Desafios</h3>
            <span className="text-[10px] text-zinc-600 font-bold">{completedMissions.length}/60 CONCLUÍDOS</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {futureMissions.map(m => {
              const isDone = completedMissions.includes(m.id);
              return (
                <div
                  key={m.id}
                  onClick={() => handleComplete(m.id, m.reward)}
                  className={`p-4 rounded-2xl flex items-center gap-4 transition-all border ${isDone ? 'bg-zinc-900/40 border-primary/20 opacity-60' : 'bg-zinc-900 border-white/5 cursor-pointer hover:border-white/10 active:scale-[0.99]'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-black border border-white/5 ${isDone ? 'text-primary' : 'text-zinc-600'}`}>
                    <span className="material-symbols-outlined text-xl">{isDone ? 'check' : m.cat.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold truncate ${isDone ? 'text-zinc-500 line-through' : 'text-white'}`}>{m.title}</h4>
                    <span className="text-[8px] text-zinc-600 uppercase tracking-widest">Dia {m.day} • {m.cat.name}</span>
                  </div>
                  <span className={`text-[10px] font-black ${isDone ? 'text-zinc-800' : 'text-zinc-500'}`}>+{m.reward} XP</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
