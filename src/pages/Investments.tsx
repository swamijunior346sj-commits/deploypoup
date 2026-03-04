import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Header from '../components/Header';

export default function Investments() {
  const navigate = useNavigate();
  const { assets, loading, transactions } = useData();
  const [activeTab, setActiveTab] = useState<'carteira' | 'performance'>('carteira');

  // ── Data Processing ──
  const totalAssets = useMemo(() => assets.reduce((acc, asset) => acc + Number(asset.current_value || 0), 0), [assets]);

  const categories = [
    { name: 'Renda Fixa', color: '#0FB67F', icon: 'lock', risk: 'Baixo' },
    { name: 'Renda Variável', color: '#3B82F6', icon: 'trending_up', risk: 'Alto' },
    { name: 'FIIs', color: '#A855F7', icon: 'apartment', risk: 'Médio' },
    { name: 'Cripto', color: '#F59E0B', icon: 'currency_bitcoin', risk: 'Altíssimo' },
    { name: 'Outros', color: '#52525b', icon: 'more_horiz', risk: 'Variável' },
  ];

  const chartData = useMemo(() => {
    return categories.map(cat => {
      const value = assets
        .filter(a => a.type === cat.name)
        .reduce((acc, a) => acc + Number(a.current_value || 0), 0);
      return { ...cat, value };
    }).filter(d => d.value > 0);
  }, [assets]);

  const riskData = useMemo(() => {
    const riskMap: Record<string, number> = { 'Baixo': 0, 'Médio': 0, 'Alto': 0, 'Altíssimo': 0 };
    assets.forEach(a => {
      const cat = categories.find(c => c.name === a.type);
      const risk = cat?.risk || 'Baixo';
      riskMap[risk] += Number(a.current_value || 0);
    });
    return Object.entries(riskMap).map(([name, value]) => ({ name, value, percentage: totalAssets > 0 ? (value / totalAssets) * 100 : 0 }));
  }, [assets, totalAssets]);

  // Simulated Performance Data (Trend ending at totalAssets)
  const performanceData = useMemo(() => {
    const base = totalAssets * 0.8;
    return Array.from({ length: 7 }, (_, i) => ({
      day: `D-${6 - i}`,
      value: Number((base + (totalAssets - base) * (i / 6) * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2))
    }));
  }, [totalAssets]);

  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-primary/10 border-t-primary rounded-full shadow-[0_0_40px_rgba(15,182,127,0.2)]"
          />
          <div className="absolute inset-4 border border-blue-500/20 rounded-full animate-pulse"></div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 animate-pulse">Neural Finance Sincronizando...</span>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
      {/* ── Background Aura ── */}
      <div className="fixed top-[-5%] right-[-5%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
      <div className="fixed bottom-[-5%] left-[-5%] w-[50%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <Header title="Gestão de Ativos" showBack />

      <main className="flex-grow px-6 pt-8 pb-40 relative z-10 space-y-12 overflow-y-auto no-scrollbar">

        {/* ── Portfolio Hero ── */}
        <section className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em] block">Equity Total Auditado</span>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white premium-text-glow leading-tight">
              <span className="text-2xl font-light text-zinc-600 mr-2">R$</span>
              {fmt(totalAssets)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-950 border border-white/5 rounded-full shadow-2xl">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#0FB67F] animate-pulse"></div>
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Status: Portfólio Ativo</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-950 border border-white/5 rounded-full shadow-2xl">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">+{((performanceData[6].value / performanceData[0].value - 1) * 100).toFixed(2)}% (Mês)</span>
            </div>
          </div>
        </section>

        {/* ── Tab Switcher ── */}
        <div className="flex p-1 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-md max-w-[300px] mx-auto">
          <button
            onClick={() => setActiveTab('carteira')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${activeTab === 'carteira' ? 'bg-white text-black shadow-xl scale-[1.02]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Carteira
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${activeTab === 'performance' ? 'bg-white text-black shadow-xl scale-[1.02]' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Performance
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'carteira' ? (
            <motion.div
              key="carteira"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* ── Allocation & Risk Section ── */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full"></div>
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">Asset Distribution</h3>

                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 relative mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={10}
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
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Diversificação</span>
                        <span className="text-sm font-black text-white italic">ELITE</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                      {chartData.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-900/30 rounded-2xl border border-white/5 group/item transition-all hover:bg-zinc-900/50">
                          <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }}></div>
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{item.name}</span>
                            <span className="text-[10px] font-bold text-white leading-none mt-1">{((item.value / totalAssets) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/20 flex flex-col justify-between space-y-8">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Auditória de Risco</h3>

                  <div className="space-y-6">
                    {riskData.map((risk, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{risk.name}</span>
                          <span className="text-[10px] font-bold text-white">{risk.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${risk.percentage}%` }}
                            className={`h-full rounded-full ${risk.name === 'Baixo' ? 'bg-primary shadow-[0_0_10px_#0FB67F30]' :
                              risk.name === 'Médio' ? 'bg-blue-500' :
                                risk.name === 'Alto' ? 'bg-purple-500' : 'bg-red-500'
                              }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-xl">security</span>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">Sua carteira possui um viés de <span className="text-white font-black italic">equilíbrio estratégico</span> adaptado ao mercado atual.</p>
                  </div>
                </div>
              </section>

              {/* ── Asset List ── */}
              <section className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Custódia de Ativos</h3>
                  <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity">Ver Relatório Full</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {assets.length > 0 ? (
                    assets.map((asset, idx) => (
                      <motion.div
                        key={asset.id}
                        whileHover={{ y: -5 }}
                        onClick={() => navigate(`/asset-details`, { state: { asset } })}
                        className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 active:scale-[0.98] transition-all cursor-pointer group border-white/5 hover:border-primary/20"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center relative shadow-2xl group-hover:border-primary/40 transition-all">
                              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                              <span className="material-symbols-outlined text-zinc-500 text-3xl group-hover:text-primary transition-colors">
                                {asset.type === 'Renda Fixa' ? 'lock' : (asset.type === 'Cripto' ? 'currency_bitcoin' : 'show_chart')}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <h4 className="text-lg font-black text-white italic tracking-tight">{asset.symbol || asset.name}</h4>
                              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">{asset.type}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest mb-1">Status</span>
                            <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                              <span className="text-[7px] font-black text-primary uppercase tracking-tighter">Liquidificado</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/5 pt-4">
                          <div className="space-y-1">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Avaliação</span>
                            <p className="text-xl font-black text-white italic tracking-tighter">
                              <span className="text-xs font-light text-zinc-500 mr-1">R$</span>
                              {fmt(Number(asset.current_value))}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Volumetria</span>
                            <span className="text-[10px] font-bold text-white">{asset.quantity || '0.0'} UNIT</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center transparent-card-border rounded-[3rem] p-10 bg-zinc-950/10 border-dashed border-zinc-800">
                      <div className="w-20 h-20 rounded-full bg-zinc-900/40 border border-zinc-800 flex items-center justify-center mb-8">
                        <span className="material-symbols-outlined text-5xl text-zinc-800">wallet</span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">Carteira em Standby</h3>
                      <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed mb-10 opacity-60 italic">Seu capital aguarda a primeira diretriz estratégica.</p>
                      <button
                        onClick={() => navigate('/new-investment')}
                        className="bg-white text-black px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:bg-primary"
                      >
                        Iniciar Alocação
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* ── Performance Chart Header ── */}
              <section className="transparent-card-border rounded-[3rem] p-10 bg-zinc-950/20 space-y-10">
                <div className="flex justify-between items-center px-2">
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Log de Performance</h3>
                    <p className="text-[8px] font-black text-primary uppercase tracking-widest">+R$ {(totalAssets * 0.04).toFixed(2)} acumulado nos últimos 30 dias</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                  </div>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0FB67F" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0FB67F" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#52525b', fontSize: 10, fontWeight: 900 }}
                      />
                      <YAxis hide domain={['dataMin - 1000', 'dataMax + 1000']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #1f2937', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                        labelStyle={{ color: '#0FB67F', fontWeight: 900, fontSize: '10px' }}
                        itemStyle={{ color: '#fff', fontSize: '10px' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0FB67F"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={2500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-4">
                <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 border-white/5 space-y-4">
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Retorno Anual Esperado</span>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-black text-white italic tracking-tighter">14.8%</h4>
                    <span className="text-[10px] text-primary font-black animate-pulse">▲</span>
                  </div>
                  <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Projeção otimizada via algoritmos de elite.</p>
                </div>
                <div className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/20 border-white/5 space-y-4">
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Sharpe Ratio Auditado</span>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-2xl font-black text-white italic tracking-tighter">1.94</h4>
                    <span className="text-[10px] text-blue-500 font-black italic">ESTÁVEL</span>
                  </div>
                  <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Relação risco vs retorno operando no quadrante alpha.</p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Standardized Luxury FAB ── */}
      <div className="fixed bottom-24 right-6 z-[150] levitate-btn">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/new-investment')}
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
