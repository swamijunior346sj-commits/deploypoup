import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-black text-white font-sans min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Header specifically for dashboard matching the requested design */}
      <header className="px-6 pt-10 pb-6 flex items-center justify-between sticky top-0 bg-background-black/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {/* Score POUP removido a pedido do usuário */}
          </div>
          <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all relative">
            <span className="absolute top-2.5 right-3 w-1 h-1 bg-primary rounded-full animate-pulse shadow-[0_0_5px_theme('colors.primary'),_0_0_15px_rgba(15,182,127,0.3)]"></span>
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-grow px-6 space-y-10 pb-16 pt-8">
        <section className="relative">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col items-start py-2">
              <div className="flex items-baseline gap-1">
                <span className="text-xs font-light text-zinc-500">R$</span>
                <span className="text-4xl font-display font-thin text-white tracking-tighter">124.450,00</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div onClick={() => navigate('/analysis')} className="border border-primary/40 bg-transparent rounded-sm p-4 flex flex-col gap-1 transition-all hover:border-primary cursor-pointer">
                <span className="text-[9px] font-medium tracking-widest text-primary uppercase">Ativos</span>
                <span className="text-lg font-display font-light text-white">R$ 138.200</span>
              </div>
              <div onClick={() => navigate('/analysis')} className="border border-primary/40 bg-transparent rounded-sm p-4 flex flex-col gap-1 transition-all hover:border-primary cursor-pointer">
                <span className="text-[9px] font-medium tracking-widest text-primary uppercase">Despesas Futuras</span>
                <span className="text-lg font-display font-light text-white">R$ 13.750</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Alocação por Conta</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">pie_chart</span>
          </div>
          <div className="flex items-center justify-between gap-6" onClick={() => navigate('/investment-portfolio')}>
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" fill="none" r="60" stroke="#1c1c1c" strokeWidth="0.5"></circle>
                <circle className="drop-shadow-[0_0_4px_rgba(15,182,127,0.5)]" cx="64" cy="64" fill="none" r="60" stroke="#0FB67F" strokeDasharray="376" strokeDashoffset="200" strokeLinecap="round" strokeWidth="1.5"></circle>
                <circle className="drop-shadow-[0_0_4px_rgba(168,85,247,0.5)] transform rotate-[170deg] origin-center" cx="64" cy="64" fill="none" r="60" stroke="#A855F7" strokeDasharray="376" strokeDashoffset="300" strokeLinecap="round" strokeWidth="1.5"></circle>
                <circle className="drop-shadow-[0_0_4px_rgba(245,158,11,0.5)] transform rotate-[250deg] origin-center" cx="64" cy="64" fill="none" r="60" stroke="#F59E0B" strokeDasharray="376" strokeDashoffset="350" strokeLinecap="round" strokeWidth="1.5"></circle>
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
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-accent-purple bg-accent-purple/20"></div>
                  <span className="text-zinc-300 font-light">Corrente</span>
                </div>
                <span className="text-white font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-accent-gold bg-accent-gold/20"></div>
                  <span className="text-zinc-300 font-light">Reserva</span>
                </div>
                <span className="text-white font-medium">25%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Conquistas Recentes</h3>
          </div>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center shadow-[0_0_5px_theme('colors.primary'),_0_0_15px_rgba(15,182,127,0.3)]">
                <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest text-center">Elite Saver</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">military_tech</span>
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest text-center">Invester</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">shield</span>
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest text-center">Protected</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest text-center">Fast Growth</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Missões do Dia</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">task_alt</span>
          </div>
          <div className="space-y-3">
            <div onClick={() => navigate('/new-transaction')} className="bg-transparent border border-primary rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                  <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                </div>
                <span className="text-xs font-light text-zinc-300 tracking-wide">Registrar gasto</span>
              </div>
              <span className="text-[10px] text-primary tracking-widest uppercase opacity-80">+5 XP</span>
            </div>
            <div onClick={() => navigate('/goals')} className="bg-transparent border border-primary rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5 cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center"></div>
              <span className="text-xs font-light text-zinc-300 tracking-wide flex-1 ml-3">Revisar metas</span>
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Pendente</span>
            </div>
            <div onClick={() => navigate('/ai-assistant')} className="bg-transparent border border-primary rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5 cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center"></div>
              <span className="text-xs font-light text-zinc-300 tracking-wide flex-1 ml-3">Ler insight IA</span>
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Pendente</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Desafios Diários</h3>
          </div>
          <div className="bg-transparent border border-primary rounded-sm p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs font-medium text-white mb-1 tracking-wide">Zero Supérfluos Hoje</h4>
                <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Complete o dia sem gastos não essenciais.</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-primary text-lg drop-shadow-[0_0_8px_rgba(15,182,127,0.8)]">local_fire_department</span>
                  <span className="text-sm font-semibold text-white">12</span>
                </div>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Dias Streak</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end text-[10px] text-zinc-400 font-light tracking-wide mb-1">
                <span>Progresso</span>
                <span>18h / 24h</span>
              </div>
              <div className="thin-progress-bar bg-zinc-900 h-[1px]">
                <div className="thin-progress-fill w-[75%] h-[1px] shadow-[0_0_8px_rgba(15,182,127,0.6)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_6px_1px_rgba(15,182,127,0.9)]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Metas Financeiras</h3>
            <button onClick={() => navigate('/goals')} className="text-[10px] text-zinc-500 hover:text-white transition-colors tracking-widest uppercase">Ver Tudo</button>
          </div>
          <div className="space-y-6 pt-2">
            <div className="space-y-2" onClick={() => navigate('/goals')}>
              <div className="flex justify-between items-end text-xs">
                <span className="text-white font-light tracking-wide">Carro Novo</span>
                <span className="text-primary font-medium">80%</span>
              </div>
              <div className="thin-progress-bar">
                <div className="thin-progress-fill w-[80%] shadow-[0_0_8px_rgba(15,182,127,0.4)]">
                  <div className="progress-tip-glow"></div>
                </div>
              </div>
            </div>
            <div className="space-y-2" onClick={() => navigate('/goals')}>
              <div className="flex justify-between items-end text-xs">
                <span className="text-white font-light tracking-wide">Viagem Europa</span>
                <span className="text-accent-purple font-medium">45%</span>
              </div>
              <div className="thin-progress-bar">
                <div className="thin-progress-fill w-[45%] bg-accent-purple shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                  <div className="progress-tip-glow bg-white shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-24"></div>
      </main>
    </div>
  );
}
