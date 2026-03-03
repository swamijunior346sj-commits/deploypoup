import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { transactions, assets, goals, loading, xp, level, levelName, currentMaxXP, addXP } = useData();

  const totalAssets = assets.reduce((acc, asset) => acc + Number(asset.current_value), 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalBalance = totalAssets - totalExpenses;

  if (loading) {
    return (
      <div className="bg-background-black text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Carregando Realidade...</div>
      </div>
    );
  }

  return (
    <div className="bg-background-black text-white font-sans min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Header specifically for dashboard matching the requested design */}
      <header className="px-6 pt-10 pb-6 flex items-center justify-between sticky top-0 bg-background-black/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center justify-between w-full">
          <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all overflow-hidden group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">person</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-widest">{levelName}</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow px-6 space-y-10 pb-16 pt-8">
        <section className="relative">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col items-center py-2">
              <span className="text-[10px] font-bold tracking-[0.4em] text-text-label uppercase mb-3">PATRIMÔNIO TOTAL</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-light text-text-label">R$</span>
                <span className="text-5xl font-extralight text-text-value tracking-tighter premium-text-glow">
                  {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div onClick={() => navigate('/analysis')} className="border border-primary/20 bg-transparent rounded-sm p-4 flex flex-col gap-1 transition-all hover:border-primary/50 cursor-pointer">
                <span className="text-[9px] font-medium tracking-widest text-primary uppercase">Ativos</span>
                <span className="text-lg font-light text-text-value">
                  R$ {totalAssets.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div onClick={() => navigate('/analysis')} className="border border-primary/20 bg-transparent rounded-sm p-4 flex flex-col gap-1 transition-all hover:border-primary/50 cursor-pointer">
                <span className="text-[9px] font-medium tracking-widest text-primary uppercase">Despesas Totais</span>
                <span className="text-lg font-light text-text-value">
                  R$ {totalExpenses.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Alocação por Conta</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">pie_chart</span>
          </div>
          {assets.length > 0 ? (
            <div className="flex items-center justify-between gap-6" onClick={() => navigate('/analysis')}>
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" fill="none" r="60" stroke="#1c1c1c" strokeWidth="0.5"></circle>
                  <circle className="drop-shadow-[0_0_4px_rgba(15,182,127,0.5)]" cx="64" cy="64" fill="none" r="60" stroke="#0FB67F" strokeDasharray="376" strokeDashoffset="200" strokeLinecap="round" strokeWidth="1.5"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Total</span>
                  <span className="text-sm font-light text-white">100%</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full border border-primary bg-primary/20"></div>
                    <span className="text-zinc-300 font-light">Investimentos</span>
                  </div>
                  <span className="text-white font-medium">100%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center border border-dashed border-zinc-800 rounded-sm">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Aguardando seu primeiro aporte</p>
              <button
                onClick={() => navigate('/add-account')}
                className="mt-2 text-[10px] text-primary font-bold uppercase tracking-widest"
              >
                Adicionar Conta
              </button>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Sua Experiência ({levelName})</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end mb-1">
              <span className="text-2xl font-black text-white">Nível {level}</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{xp} / {currentMaxXP} XP</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary shadow-[0_0_10px_rgba(15,182,127,0.5)] transition-all duration-1000"
                style={{ width: `${(xp / currentMaxXP) * 100}%` }}
              ></div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Missões do Dia</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">task_alt</span>
          </div>
          <div className="space-y-3">
            <div onClick={() => { addXP(1); navigate('/new-transaction'); }} className="bg-transparent border border-primary rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                  <span className="material-symbols-outlined text-primary text-[14px]">add</span>
                </div>
                <span className="text-xs font-light text-zinc-300 tracking-wide">Registrar gasto</span>
              </div>
              <span className="text-[10px] text-primary tracking-widest uppercase opacity-80">+1 XP</span>
            </div>
            <div onClick={() => { addXP(5); navigate('/goals'); }} className="bg-transparent border border-primary rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5 cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center"></div>
              <span className="text-xs font-light text-zinc-300 tracking-wide flex-1 ml-3">Revisar metas</span>
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase">+5 XP</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Metas Financeiras</h3>
            <button onClick={() => navigate('/goals')} className="text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest uppercase">Ver Tudo</button>
          </div>
          <div className="space-y-6 pt-2">
            {goals.length > 0 ? (
              goals.slice(0, 3).map((goal) => {
                const progress = Math.min(100, Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100)) || 0;
                return (
                  <div key={goal.id} className="space-y-2 cursor-pointer transition-all active:scale-95" onClick={() => navigate(`/goal-details/${goal.id}`)}>
                    <div className="flex justify-between items-end text-xs">
                      <span className="text-white font-light tracking-wide">{goal.name}</span>
                      <span className="text-primary font-medium">{progress}%</span>
                    </div>
                    <div className="thin-progress-bar">
                      <div
                        className="thin-progress-fill shadow-[0_0_8px_rgba(15,182,127,0.4)]"
                        style={{ width: `${progress}%`, backgroundColor: goal.color || '#0FB67F' }}
                      >
                        <div className="progress-tip-glow"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Nenhuma meta definida</p>
                <button
                  onClick={() => navigate('/new-goal')}
                  className="mt-2 text-[10px] text-primary font-bold uppercase tracking-widest"
                >
                  Criar minha primeira meta
                </button>
              </div>
            )}
          </div>
        </section>
        <div className="h-24"></div>
      </main>
    </div>
  );
}
