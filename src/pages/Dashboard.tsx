import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Line } from 'recharts';
import React, { useState, useMemo } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { transactions, assets, goals, loading, xp, level, levelName, currentMaxXP } = useData();

  const activeTransactions = transactions.filter(t => t.status !== 'anulada');

  const totalAssetsValue = assets.reduce((acc, asset) => acc + Number(asset.current_value || 0), 0);
  const totalExpenses = activeTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const totalIncome = activeTransactions
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

  // Evolution Data Logic
  const evolutionData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayExpenses = activeTransactions
        .filter(t => t.type === 'expense' && t.date.split('T')[0] === date)
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const dayIncome = activeTransactions
        .filter(t => t.type === 'income' && t.date.split('T')[0] === date)
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
        Gastos: dayExpenses,
        Receitas: dayIncome
      };
    });
  }, [activeTransactions]);

  // Calendar Logic
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarDays = useMemo(() => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days = [];

    // Padding for first week
    for (let i = 0; i < start.getDay(); i++) days.push(null);

    for (let i = 1; i <= end.getDate(); i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
    }
    return days;
  }, [currentMonth]);

  // Net Profit Data (Last 14 days)
  const netProfitData = useMemo(() => {
    const days = [...Array(14)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      return d.toISOString().split('T')[0];
    });
    return days.map(date => {
      const income = activeTransactions.filter(t => t.type === 'income' && t.date.split('T')[0] === date).reduce((s, t) => s + Number(t.amount), 0);
      const expense = activeTransactions.filter(t => t.type === 'expense' && t.date.split('T')[0] === date).reduce((s, t) => s + Number(t.amount), 0);
      return {
        date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit' }),
        Lucro: income - expense
      };
    });
  }, [activeTransactions]);

  // Daily Summary (Today's Breakdown)
  const dailySummary = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const items = activeTransactions.filter(t => t.date.split('T')[0] === today);
    const income = items.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    const expense = items.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    const count = items.length;
    return { income, expense, count, profit: income - expense };
  }, [activeTransactions]);

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

        {/* ── Level Mastery Card (Minimalist Neon) ── */}
        <section>
          <div className="relative p-[1px] rounded-[2rem] overflow-hidden">
            {/* Neon Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-blue-500/50 to-primary/50 animate-shimmer-fast opacity-30"></div>

            <div className="relative bg-zinc-950/90 backdrop-blur-3xl rounded-[2rem] p-6 border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(15,182,127,0.2)]">
                    <span className="text-primary font-black text-xs">LV{level}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{levelName}</span>
                    <span className="text-[8px] font-bold text-primary uppercase tracking-[0.1em]">Ecossistema Ativo</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-white italic tracking-tighter">{xp} / {currentMaxXP} XP</span>
                </div>
              </div>

              <div className="relative h-1.5 w-full bg-zinc-900/50 rounded-full overflow-hidden">
                {/* Neon Filling */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp / currentMaxXP) * 100}%` }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="absolute h-full bg-gradient-to-r from-primary to-blue-500 shadow-[0_0_10px_#0FB67F,0_0_20px_#0FB67F]"
                />
                {/* Moving Light Highlight */}
                <motion.div
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-y-0 w-20 bg-white/20 skew-x-12 blur-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── AI Analysis Section (Transparent with Simulation Background) ── */}
        <section className="relative h-44 flex items-center justify-center overflow-hidden rounded-[2.5rem] group cursor-pointer" onClick={() => navigate('/ai-analysis')}>
          {/* AI Simulation Animation Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-conic from-purple-500/30 via-primary/30 to-blue-500/30 blur-[80px]"
            />
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-20">
              {[...Array(18)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                  className="border border-white/5"
                />
              ))}
            </div>
          </div>

          <div className="relative z-20 flex flex-col items-center text-center space-y-4 px-8">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <span className="material-symbols-outlined text-3xl text-white group-hover:scale-110 transition-transform">insights</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Análise de Gastos de IA</h3>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest opacity-60">Sincronização em tempo real com o ecossistema</p>
            </div>
          </div>
        </section>

        {/* ── Lucro Líquido Chart (Luxury Line/Area) ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Lucro Líquido Estratégico</h3>
            <span className="text-[8px] font-black text-primary uppercase tracking-widest">Últimos 14 dias</span>
          </div>
          <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/40 backdrop-blur-md border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={netProfitData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0FB67F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0FB67F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#52525b', fontWeight: 900 }} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} hide />
                <Tooltip
                  contentStyle={{ background: '#000', border: '1px solid #1f1f23', borderRadius: '16px', fontSize: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  labelStyle={{ color: '#52525b', marginBottom: '4px', fontWeight: 900 }}
                />
                <Area
                  type="monotone"
                  dataKey="Lucro"
                  stroke="#0FB67F"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#profitGradient)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between items-center mt-4 px-2">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Média Diária</span>
                <span className="text-xs font-bold text-white">R$ {(netProfitData.reduce((a, b) => a + b.Lucro, 0) / 14).toFixed(2)}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Daily Summary (Luxury Analytics) ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Resumo de Operações</h3>
            <span className="text-[8px] font-black text-primary uppercase tracking-widest">Hoje</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="transparent-card-border rounded-[2.2rem] p-6 bg-zinc-950/20 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full"></div>
              <span className="material-symbols-outlined text-primary mb-3 block">add_circle</span>
              <div className="space-y-1">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Entregues</span>
                <span className="text-lg font-black text-white italic">R$ {dailySummary.income.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            <div className="transparent-card-border rounded-[2.2rem] p-6 bg-zinc-950/20 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl rounded-full"></div>
              <span className="material-symbols-outlined text-red-500 mb-3 block">remove_circle</span>
              <div className="space-y-1">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Liquidados</span>
                <span className="text-lg font-black text-white italic">R$ {dailySummary.expense.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <div className="transparent-card-border rounded-[2.5rem] p-8 bg-black border-primary/20 shadow-[0_0_30px_rgba(15,182,127,0.05)]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Performance Diária</span>
                <h4 className={`text-2xl font-black italic ${dailySummary.profit >= 0 ? 'text-primary' : 'text-red-500'}`}>
                  {dailySummary.profit >= 0 ? '+' : ''}R$ {dailySummary.profit.toLocaleString('pt-BR')}
                </h4>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">{dailySummary.count} Movimentações</span>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (dailySummary.count > 5 ? 5 : dailySummary.count) ? 'bg-primary shadow-[0_0_8px_#0FB67F]' : 'bg-zinc-800'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Evolution Charts Section (Expenses & Income) ── */}
        <section className="space-y-8">
          {/* Expense Chart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Evolução de Gastos</h3>
              <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Últimos 7 dias</span>
            </div>
            <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/40 backdrop-blur-md border border-white/10 group cursor-pointer" onClick={() => navigate('/transaction-history')}>
              <div className="absolute inset-0 bg-red-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={evolutionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#52525b', fontWeight: 900 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 8, fill: '#52525b' }} axisLine={false} tickLine={false} hide />
                  <Tooltip
                    contentStyle={{ background: '#000', border: '1px solid #1f1f23', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#ef4444' }}
                  />
                  <Area type="monotone" dataKey="Gastos" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorGastos)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Income Chart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Evolução de Receitas</h3>
              <span className="text-[8px] font-black text-primary uppercase tracking-widest">Últimos 7 dias</span>
            </div>
            <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/40 backdrop-blur-md border border-white/10 group cursor-pointer" onClick={() => navigate('/transaction-history')}>
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={evolutionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="date" tick={{ fontSize: 8, fill: '#52525b', fontWeight: 900 }} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} hide />
                  <Tooltip
                    contentStyle={{ background: '#000', border: '1px solid #1f1f23', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#0FB67F' }}
                  />
                  <Bar dataKey="Receitas" fill="#0FB67F" radius={[4, 4, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* ── Allocation Section (Luxury Update) ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Distribuição Patrimonial</h3>
            <button onClick={() => navigate('/investments')} className="text-[9px] font-black text-primary uppercase tracking-widest">Gerenciar</button>
          </div>

          <div className="transparent-card-border rounded-[2.5rem] p-8 flex items-center gap-10 min-h-[160px] bg-zinc-950/20 border-white/5">
            <div className="w-32 h-32 flex-shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={38}
                    outerRadius={52}
                    paddingAngle={6}
                    dataKey="value"
                    stroke="none"
                    animationDuration={2000}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em]">Mix</span>
                <span className="text-[10px] font-black text-white italic">ELITE</span>
              </div>
            </div>

            <div className="flex-grow space-y-5">
              {chartData.slice(0, 3).map((item, idx) => {
                const percentage = totalAssetsValue > 0 ? ((item.value / totalAssetsValue) * 100) : 0;
                return (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">{item.name}</span>
                      </div>
                      <span className="text-[9px] font-black text-white italic">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-[1.5px] w-full bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 2, ease: "circOut" }}
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

        {/* ── Calendar Widget ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Calendário Estratégico</h3>
            <span className="text-[9px] font-black text-white uppercase tracking-widest">{currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
          </div>

          <div className="transparent-card-border rounded-[2.5rem] p-8 space-y-6 border-white/5">
            <div className="grid grid-cols-7 gap-1">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                <span key={d} className="text-[8px] font-black text-zinc-700 text-center uppercase">{d}</span>
              ))}
              {calendarDays.map((day, i) => {
                const isToday = day && day.toDateString() === new Date().toDateString();
                const hasTransaction = day && activeTransactions.some(t => new Date(t.date).toDateString() === day.toDateString());

                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center relative">
                    {day ? (
                      <>
                        <span className={`text-[10px] font-bold ${isToday ? 'text-primary' : 'text-zinc-500'}`}>{day.getDate()}</span>
                        {hasTransaction && (
                          <div className="w-1 h-1 rounded-full bg-primary/40 mt-1"></div>
                        )}
                        {isToday && (
                          <div className="absolute inset-0 border border-primary/20 rounded-lg"></div>
                        )}
                      </>
                    ) : null}
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

        {/* ── Redundant XP Section Removed ── */}

        {/* ── GoalsSection (Luxury Update) ── */}
        <section className="space-y-6 pb-20">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Estratégias Ativas</h3>
            <button onClick={() => navigate('/goals')} className="text-[9px] font-black text-primary uppercase tracking-widest">Expandir</button>
          </div>
          <div className="space-y-4">
            {goals.length > 0 ? (
              goals.slice(0, 2).map((goal) => {
                const progress = Math.min(100, Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100)) || 0;
                return (
                  <motion.div key={goal.id} onClick={() => navigate(`/goal-details/${goal.id}`)} className="transparent-card-border rounded-[2.5rem] p-7 space-y-6 hover:bg-white/[0.02] cursor-pointer group border-white/5 transition-all">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-all text-primary">
                          <span className="material-symbols-outlined text-2xl">diamond</span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-black text-white italic tracking-tight">{goal.name}</span>
                          <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Alocação de Meta</span>
                        </div>
                      </div>
                      <span className="text-2xl font-black text-primary italic premium-text-glow">{progress}%</span>
                    </div>
                    <div className="h-[2px] bg-zinc-950/60 rounded-full overflow-hidden relative">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5 }} className="h-full bg-primary relative z-10" />
                      <div className="absolute inset-0 bg-primary/20 blur-sm"></div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="transparent-card-border rounded-[2.5rem] p-10 text-center border-dashed border-zinc-900 bg-zinc-950/20">
                <p className="text-[9px] text-zinc-700 font-black uppercase tracking-[0.4em]">Nenhuma diretriz estratégica ativa</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
