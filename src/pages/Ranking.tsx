import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';

export default function Ranking() {
  const navigate = useNavigate();
  const { xp, level, levelName, userName } = useData();

  const tiers = [
    { name: 'Elite Master', min: 10000, color: 'text-amber-400', glow: 'shadow-[0_0_20px_#fbbf24]' },
    { name: 'Diamond Pro', min: 5000, color: 'text-blue-400', glow: 'shadow-[0_0_20px_#60a5fa]' },
    { name: 'Platinum', min: 2500, color: 'text-zinc-200', glow: 'shadow-[0_0_20px_#e4e4e7]' },
    { name: 'Gold', min: 1000, color: 'text-yellow-600', glow: 'shadow-none' },
    { name: 'Silver', min: 500, color: 'text-zinc-400', glow: 'shadow-none' },
    { name: 'Bronze', min: 0, color: 'text-orange-700', glow: 'shadow-none' },
  ];

  const competitors = useMemo(() => [
    { id: 1, name: 'Marco "The Whale"', xp: 12450, avatar: 'https://i.pravatar.cc/150?u=marco' },
    { id: 2, name: 'Sofia "Alpha"', xp: 9800, avatar: 'https://i.pravatar.cc/150?u=sofia' },
    { id: 3, name: 'Crypto King 777', xp: 8200, avatar: 'https://i.pravatar.cc/150?u=king' },
    { id: 4, name: 'Beatriz Capital', xp: 7100, avatar: 'https://i.pravatar.cc/150?u=bea' },
    { id: 5, name: userName || 'Você', xp: xp, avatar: 'https://i.pravatar.cc/150?u=me', isUser: true },
    { id: 6, name: 'Dolar Master', xp: 4500, avatar: 'https://i.pravatar.cc/150?u=dolar' },
    { id: 7, name: 'Hedge Hunter', xp: 3200, avatar: 'https://i.pravatar.cc/150?u=hedge' },
  ].sort((a, b) => b.xp - a.xp), [xp, userName]);

  const userRank = competitors.findIndex(c => c.isUser) + 1;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
      {/* ── Background Aura ── */}
      <div className="fixed top-[-20%] left-[-20%] w-[80%] h-[60%] bg-primary/5 blur-[180px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <Header title="Hall of Fame" showBack subtitle="Ranking Global de Inteligência" />

      <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

        {/* ── User Status Mini-Hero ── */}
        <section className="relative p-[1px] rounded-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-white/5 to-primary/30 animate-shimmer-fast"></div>
          <div className="relative bg-zinc-950/90 backdrop-blur-3xl rounded-[2.5rem] p-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary shadow-[0_0_20px_rgba(15,182,127,0.3)]">
                  <img src="https://i.pravatar.cc/150?u=me" className="w-full h-full object-cover" alt="Avatar" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 px-2 py-0.5 rounded-lg">
                  <span className="text-[10px] font-black text-white italic">#{userRank}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Status Operacional</span>
                <h3 className="text-[13px] font-black text-white uppercase italic tracking-tighter">{levelName}</h3>
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{xp} XP Acumulado</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Temporada 01</span>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm font-black">timer</span>
                <span className="text-[10px] font-black tracking-widest">04D : 12H</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Podium (Top 3 Visual) ── */}
        <section className="flex items-end justify-center gap-4 pt-10 pb-4">
          {/* Rank 2 */}
          <div className="flex flex-col items-center space-y-3 w-24">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-zinc-400 p-1">
                <img src={competitors[1].avatar} className="w-full h-full rounded-full object-cover grayscale" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-400 text-black text-[8px] font-black px-2 py-0.5 rounded-full">2</div>
            </div>
            <span className="text-[9px] font-black text-zinc-400 uppercase truncate text-center w-full">{competitors[1].name}</span>
            <div className="w-full h-16 bg-gradient-to-t from-zinc-800/20 to-zinc-400/20 rounded-t-2xl border-t border-zinc-400/30 flex items-center justify-center">
              <span className="text-[10px] font-black text-zinc-300 italic">{competitors[1].xp}</span>
            </div>
          </div>

          {/* Rank 1 */}
          <div className="flex flex-col items-center space-y-3 w-28">
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full border-4 border-amber-400 p-1 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                <img src={competitors[0].avatar} className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="material-symbols-outlined text-amber-400 text-3xl filled drop-shadow-lg">military_tech</span>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[9px] font-black px-3 py-0.5 rounded-full">1</div>
            </motion.div>
            <span className="text-[10px] font-black text-amber-400 uppercase truncate text-center w-full italic">{competitors[0].name}</span>
            <div className="w-full h-24 bg-gradient-to-t from-amber-400/5 to-amber-400/20 rounded-t-3xl border-t-2 border-amber-400/40 flex flex-col items-center justify-center">
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">G.O.A.T.</span>
              <span className="text-sm font-black text-white italic drop-shadow-md">{competitors[0].xp}</span>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center space-y-3 w-24">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-orange-700 p-1">
                <img src={competitors[2].avatar} className="w-full h-full rounded-full object-cover grayscale opacity-80" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-700 text-white text-[8px] font-black px-2 py-0.5 rounded-full">3</div>
            </div>
            <span className="text-[9px] font-black text-orange-700 uppercase truncate text-center w-full">{competitors[2].name}</span>
            <div className="w-full h-12 bg-gradient-to-t from-orange-400/5 to-orange-400/10 rounded-t-2xl border-t border-orange-400/20 flex items-center justify-center">
              <span className="text-[10px] font-black text-orange-300 italic">{competitors[2].xp}</span>
            </div>
          </div>
        </section>

        {/* ── Full Ranking List ── */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Lista de Ativos</h4>
            <span className="text-[9px] font-bold text-zinc-600 uppercase italic">Participantes: 1.2k</span>
          </div>

          <div className="space-y-3 pb-10">
            <AnimatePresence mode="popLayout">
              {competitors.map((player, idx) => {
                const playerTier = tiers.find(t => player.xp >= t.min) || tiers[tiers.length - 1];

                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${player.isUser
                        ? 'bg-primary/10 border-primary/30 shadow-[0_10px_30px_rgba(15,182,127,0.1)] relative overflow-hidden'
                        : 'bg-zinc-950 border-white/5 hover:border-white/10'
                      }`}
                  >
                    {player.isUser && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-primary animate-pulse"></div>
                    )}

                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black italic w-5 ${idx === 0 ? 'text-amber-400' :
                          idx === 1 ? 'text-zinc-400' :
                            idx === 2 ? 'text-orange-700' : 'text-zinc-700'
                        }`}>
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 border ${player.isUser ? 'border-primary/50' : 'border-white/5'}`}>
                          <img src={player.avatar} className={`w-full h-full object-cover ${!player.isUser && 'grayscale opacity-70'}`} />
                        </div>
                        {idx < 3 && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black border border-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[10px] filled text-amber-400">workspace_premium</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h5 className={`text-[11px] font-black uppercase text-glow ${player.isUser ? 'text-white' : 'text-zinc-400'}`}>
                          {player.name}
                        </h5>
                        <span className={`text-[8px] font-bold uppercase tracking-widest ${playerTier.color}`}>
                          {playerTier.name}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-sm font-black italic ${player.isUser ? 'text-primary premium-text-glow' : 'text-zinc-300'}`}>
                        {player.xp.toLocaleString()}
                      </span>
                      <span className="block text-[7px] font-black text-zinc-600 uppercase tracking-widest">XP Intelligence</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}
