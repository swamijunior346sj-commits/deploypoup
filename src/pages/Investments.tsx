import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useData } from '../contexts/DataContext';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Investments() {
  const navigate = useNavigate();
  const { assets, loading } = useData();

  const totalAssets = assets.reduce((acc, asset) => acc + Number(asset.current_value || 0), 0);

  const categories = [
    { name: 'Renda Fixa', color: '#0FB67F', icon: 'lock' },
    { name: 'Renda Variável', color: '#3B82F6', icon: 'trending_up' },
    { name: 'FIIs', color: '#A855F7', icon: 'domain' },
    { name: 'Cripto', color: '#F59E0B', icon: 'currency_bitcoin' },
    { name: 'Outros', color: '#52525b', icon: 'more_horiz' },
  ];

  const chartData = categories.map(cat => {
    const value = assets
      .filter(a => a.type === cat.name)
      .reduce((acc, a) => acc + Number(a.current_value || 0), 0);
    return { ...cat, value };
  }).filter(d => d.value > 0);

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

      <Header title="Investimentos" showBack />

      <main className="flex-grow px-6 pt-8 pb-40 relative z-10 space-y-12">
        {/* ── Portfolio Hero ── */}
        <section className="flex flex-col items-center text-center">
          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.6em] mb-4">Patrimônio Investido</span>
          <h1 className="text-5xl font-display font-black tracking-tighter text-white premium-text-glow leading-tight">
            <span className="text-2xl font-light text-zinc-500 mr-2">R$</span>
            {totalAssets.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h1>
          <div className="flex items-center gap-2 mt-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#0FB67F]"></span>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest">Performance Positiva</span>
          </div>
        </section>

        {/* ── Allocation Chart ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2 text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">
            <span>Distribuição de Ativos</span>
            <span>{assets.length} Posicionamentos</span>
          </div>

          <div className="transparent-card-border rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 flex-shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={45}
                    outerRadius={65}
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
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Diversificação</span>
                <span className="text-xs font-bold text-white">ESTÁVEL</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-grow w-full">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest truncate">{item.name}</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    R$ {item.value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Detailed Asset List ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Carteira Elite</h3>
            <span className="text-[9px] font-black text-primary uppercase tracking-widest">Ativos em Foco</span>
          </div>

          <div className="space-y-4">
            {assets.length > 0 ? (
              assets.map((asset, idx) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/asset-details`, { state: { asset } })}
                  className="transparent-card-border rounded-[2.5rem] p-6 hover:bg-white/[0.02] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                      <span className="material-symbols-outlined text-zinc-500 text-2xl">
                        {asset.type === 'Renda Fixa' ? 'lock' : (asset.type === 'Cripto' ? 'currency_bitcoin' : 'show_chart')}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base font-bold text-white tracking-tight">{asset.symbol || asset.name}</h4>
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{asset.broker || 'Custódia Segura'}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-base font-black text-white">R$ {Number(asset.current_value).toLocaleString('pt-BR')}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] font-black text-primary uppercase tracking-tighter">
                      <span className="material-symbols-outlined text-xs">trending_up</span>
                      <span>Posicionamento Ativo</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="transparent-card-border rounded-[2.5rem] p-12 text-center border-dashed border-zinc-800">
                <span className="material-symbols-outlined text-zinc-800 text-4xl mb-4">account_balance</span>
                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mb-6">Seu portfólio aguarda o primeiro ativo</p>
                <button
                  onClick={() => navigate('/new-investment')}
                  className="bg-primary text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-[0_15px_30px_rgba(15,182,127,0.2)]"
                >
                  Adicionar Primeiro Ativo
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── Levitating FAB ── */}
      <div className="fixed bottom-28 right-8 z-[100] animate-levitate">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/new-investment')}
          className="w-16 h-16 rounded-[1.75rem] bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.3)] active:scale-90 transition-all border border-white/20 group hover:rotate-90 duration-500"
        >
          <span className="material-symbols-outlined text-black font-black text-4xl">add</span>
        </motion.button>
      </div>
    </div>
  );
}
