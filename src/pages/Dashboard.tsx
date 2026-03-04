import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transactions, assets, goals, loading, xp, level, levelName, currentMaxXP } = useData();

  const totalAssetsValue = assets.reduce((acc, asset) => acc + Number(asset.current_value || 0), 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netWorth = totalAssetsValue + totalIncome - totalExpenses;

  const assetCategories = [
    { name: 'Renda Fixa', color: '#0FB67F' },
    { name: 'Renda Variável', color: '#3B82F6' },
    { name: 'FIIs', color: '#A855F7' },
    { name: 'Cripto', color: '#F59E0B' },
    { name: 'Outros', color: '#52525b' },
  ];

  const allocationData = assetCategories.map(cat => {
    const value = assets
      .filter(a => a.type === cat.name)
      .reduce((acc, a) => acc + Number(a.current_value || 0), 0);
    return { ...cat, value };
  }).filter(d => d.value > 0);

  const chartData = allocationData.length > 0 ? allocationData : [{ name: 'Sem Dados', value: 1, color: '#18181b' }];

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full shadow-[0_0_20px_rgba(15,182,127,0.3)]"
        />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">Sincronizando Ecossistema...</span>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
      {/* ── Background Aura ── */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

      {/* ── Premium Header ── */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/60 backdrop-blur-xl z-50 border-b border-white/[0.03]">
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/profile')}
            className="w-11 h-11 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center group overflow-hidden"
          >
            <span className="material-symbols-outlined text-zinc-400 group-hover:text-white transition-colors">person</span>
          </motion.button>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Olá, de elite</span>
            <span className="text-sm font-bold text-white tracking-tight">{user?.email?.split('@')[0] || 'Investidor'}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-1">Ecossistema Elite</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#0FB67F]"></div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{levelName}</span>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/notifications')}
          className="w-11 h-11 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center group"
        >
          <span className="material-symbols-outlined text-zinc-400 group-hover:text-primary transition-colors">notifications</span>
        </motion.button>
      </header>

      <main className="flex-grow px-6 pt-8 pb-32 relative z-10 space-y-12">
        {/* ── Net Worth Hero ── */}
        <section className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em] block">Patrimônio Líquido</span>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white premium-text-glow leading-tight">
              <span className="text-2xl font-light text-zinc-500 mr-2">R$</span>
              {netWorth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h1>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Ativos</span>
                <span className="text-base font-bold text-white tracking-tight">R$ {totalAssetsValue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.2em]">Passivos</span>
                <span className="text-base font-bold text-white tracking-tight">R$ {totalExpenses.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── AI Insights ── */}
        <motion.section
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/ai-analysis')}
          className="cursor-pointer"
        >
          <div className="ai-gradient-border p-[1px] rounded-[2.5rem]">
            <div className="bg-[#050505] rounded-[2.5rem] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 animate-pulse-glow border border-purple-500/20">
                <span className="material-symbols-outlined text-purple-400">auto_awesome</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">IA Insight Profissional</h4>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">
                  "Analisei seu fluxo de caixa corporativo: Sua saúde financeira é {netWorth > 0 ? 'ELITE' : 'EM EVOLUÇÃO'}. Considere novos aportes estratégicos."
                </p>
                <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest mt-2">
                  <span>Ver Análise Completa</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Allocation Section ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Alocação Estratégica</h3>
            <button onClick={() => navigate('/investments')} className="text-[9px] font-black text-primary uppercase tracking-widest">Detalhes</button>
          </div>

          <div className="transparent-card-border rounded-[2.5rem] p-8 flex items-center gap-10 min-h-[160px]">
            <div className="w-32 h-32 flex-shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={38}
                    outerRadius={50}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Status</span>
                <span className="text-xs font-bold text-white italic">MASTER</span>
              </div>
            </div>

            <div className="flex-grow space-y-4">
              {chartData.slice(0, 3).map((item, idx) => {
                const percentage = allocationData.length > 0 ? ((item.value / totalAssetsValue) * 100) : 0;
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest truncate max-w-[80px]">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-white italic">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Financial Tips Card ── */}
        <motion.section
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/financial-tips')}
          className="transparent-card-border rounded-[2.5rem] p-8 space-y-5 bg-primary/[0.03] border-primary/20 cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-2xl">lightbulb</span>
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-white tracking-tight">Diretrizes POUP</h4>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Maestria do Ecossistema</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">
            "Aloque 20% do orçamento para investimentos constantes. O tempo é seu maior aliado corporativo."
          </p>
          <div className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest">
            <span>Acessar Diretrizes</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </div>
        </motion.section>

        {/* ── XP & Leveling ── */}
        <section className="space-y-6">
          <div className="transparent-card-border rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden group border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Progresso de Nível</span>
                <h3 className="text-4xl font-display font-black text-white italic">Nível {level}</h3>
              </div>
              <span className="text-[11px] font-black text-primary uppercase tracking-widest">{xp} / {currentMaxXP} XP</span>
            </div>
            <div className="space-y-6">
              <div className="thin-progress-bar h-[4px] bg-zinc-900/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp / currentMaxXP) * 100}%` }}
                  className="thin-progress-fill"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div onClick={() => navigate('/missions')} className="bg-zinc-900/40 p-5 rounded-[1.5rem] border border-white/5 flex flex-col gap-3">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Missões</span>
                </motion.div>
                <motion.div onClick={() => navigate('/shop')} className="bg-zinc-900/40 p-5 rounded-[1.5rem] border border-white/5 flex flex-col gap-3">
                  <span className="material-symbols-outlined text-amber-500">workspace_premium</span>
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Loja Elite</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Goals ── */}
        <section className="space-y-6 pb-12">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Metas em Evolução</h3>
            <button onClick={() => navigate('/goals')} className="text-[9px] font-black text-primary uppercase tracking-widest">Ver Todas</button>
          </div>
          <div className="space-y-4">
            {goals.length > 0 ? (
              goals.slice(0, 2).map((goal) => {
                const progress = Math.min(100, Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100)) || 0;
                return (
                  <motion.div key={goal.id} onClick={() => navigate(`/goal-details/${goal.id}`)} className="transparent-card-border rounded-[2.5rem] p-7 space-y-5 hover:bg-white/[0.02] cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-colors text-primary italic">
                          <span className="material-symbols-outlined">flag</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-bold text-white tracking-tight">{goal.name}</span>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Meta Corporativa</span>
                        </div>
                      </div>
                      <span className="text-xl font-display font-black text-primary italic">{progress}%</span>
                    </div>
                    <div className="thin-progress-bar h-[3px] bg-zinc-900/50 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="transparent-card-border rounded-[2.5rem] p-10 text-center border-dashed border-zinc-800">
                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">Nenhuma meta estratégica ativa</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
