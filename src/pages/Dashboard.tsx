import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Dashboard() {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState<'Dia' | 'Semana' | 'Mês' | 'Ano'>('Mês');

  return (
    <div className="bg-background-black text-white font-sans flex flex-col overflow-x-hidden selection:bg-primary selection:text-black -mx-6 -mt-8">
      {/* Header specifically for dashboard matching the requested design */}
      <header className="px-6 pt-10 pb-6 flex items-center justify-between bg-black/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center space-x-4 w-full justify-between">
          <div className="flex-1">
            <p className="text-xl font-display font-light text-white tracking-wide">Roberto Silva</p>
          </div>
          <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-all relative">
            <span className="absolute top-2.5 right-3 w-1 h-1 bg-primary rounded-full animate-pulse shadow-[0_0_5px_theme('colors.primary'),_0_0_15px_rgba(15,182,127,0.3)]"></span>
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 0, "wght" 200' }}>notifications</span>
          </button>
        </div>
      </header>

      <div className="flex-grow px-6 space-y-12 pb-16 pt-8">
        <div className="relative flex flex-col items-center py-2">
          {/* Radial gradient glow for header area */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,182,127,0.15)_0%,transparent_60%)] opacity-40 blur-3xl -top-20 h-64 w-full"></div>
          <span className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 uppercase mb-3">Patrimônio Total</span>
          <h2 className="text-5xl font-display font-thin text-white tracking-tighter mb-10 z-10 flex items-baseline gap-2">
            <span className="text-2xl font-extralight text-zinc-600 self-start mt-2">R$</span>
            124.450
            <span className="text-xl text-zinc-600 font-extralight">,00</span>
          </h2>
          <div className="w-full h-32 relative overflow-visible mb-6" onClick={() => navigate('/reports')}>
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
              <defs>
                <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.15"></stop>
                  <stop offset="100%" stopColor="#042017" stopOpacity="0.01"></stop>
                </linearGradient>
              </defs>
              <path d="M0 40 C 10 38, 20 42, 30 35 C 45 25, 55 30, 70 20 C 80 14, 90 10, 100 2 L 100 50 H 0 Z" fill="url(#gradientArea)" stroke="none"></path>
              <path className="drop-shadow-[0_0_6px_rgba(15,182,127,0.4)]" d="M0 40 C 10 38, 20 42, 30 35 C 45 25, 55 30, 70 20 C 80 14, 90 10, 100 2" fill="none" stroke="#0FB67F" strokeLinecap="round" strokeWidth="0.5"></path>
              <circle cx="100" cy="2" fill="#000000" r="1.5" stroke="#0FB67F" strokeWidth="1"></circle>
            </svg>
            <div className="absolute -top-4 right-0 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_theme('colors.primary'),_0_0_15px_rgba(15,182,127,0.3)]"></div>
              <span className="text-[10px] text-primary tracking-wider font-light">+1.2% (24h)</span>
            </div>
          </div>
        </div>

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
                <circle className="drop-shadow-[0_0_4px_rgba(168,85,247,0.5)] transform -scale-x-100 origin-center" cx="64" cy="64" fill="none" r="60" stroke="#A855F7" strokeDasharray="376" strokeDashoffset="300" strokeLinecap="round" strokeWidth="1.5"></circle>
                <circle className="drop-shadow-[0_0_4px_rgba(245,158,11,0.5)] transform rotate-180 origin-center" cx="64" cy="64" fill="none" r="60" stroke="#F59E0B" strokeDasharray="376" strokeDashoffset="350" strokeLinecap="round" strokeWidth="1.5"></circle>
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
                  <div className="w-2 h-2 rounded-full border border-[#A855F7] bg-[#A855F7]/20"></div>
                  <span className="text-zinc-300 font-light">Corrente</span>
                </div>
                <span className="text-white font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border border-[#F59E0B] bg-[#F59E0B]/20"></div>
                  <span className="text-zinc-300 font-light">Reserva</span>
                </div>
                <span className="text-white font-medium">25%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Conquistas Recentes</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">emoji_events</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black border border-zinc-800 rounded-sm p-5 relative group transition-colors hover:border-zinc-700">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-primary text-2xl font-light drop-shadow-[0_0_5px_rgba(15,182,127,0.8)]">diamond</span>
                <span className="text-[9px] text-primary/60 border border-primary/20 px-1.5 py-0.5 rounded uppercase tracking-wider">Raro</span>
              </div>
              <h4 className="text-xs font-medium text-white mb-1 tracking-wide">Investidor Elite</h4>
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Atingiu R$ 100k em patrimônio acumulado.</p>
            </div>
            <div className="bg-black border border-zinc-800 rounded-sm p-5 relative group transition-colors hover:border-zinc-700">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-[#3B82F6] text-2xl font-light drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">token</span>
                <span className="text-[9px] text-[#3B82F6]/60 border border-[#3B82F6]/20 px-1.5 py-0.5 rounded uppercase tracking-wider">Novo</span>
              </div>
              <h4 className="text-xs font-medium text-white mb-1 tracking-wide">Crypto Holder</h4>
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Primeiro aporte em criptomoedas realizado.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Missões do Dia</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">task_alt</span>
          </div>
          <div className="space-y-3">
            <div className="bg-transparent border border-primary rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5" onClick={() => navigate('/transactions')}>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                  <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                </div>
                <span className="text-xs font-light text-zinc-300 tracking-wide">Registrar gasto</span>
              </div>
              <span className="text-[10px] text-primary tracking-widest uppercase opacity-80">+5 XP</span>
            </div>
            <div className="bg-transparent border border-zinc-800 rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5" onClick={() => navigate('/goals')}>
              <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center"></div>
              <span className="text-xs font-light text-zinc-300 tracking-wide flex-1 ml-3">Revisar metas</span>
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Pendente</span>
            </div>
            <div className="bg-transparent border border-zinc-800 rounded-sm p-3 flex items-center justify-between group transition-all hover:bg-white/5" onClick={() => navigate('/reports')}>
              <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center"></div>
              <span className="text-xs font-light text-zinc-300 tracking-wide flex-1 ml-3">Ler insight IA</span>
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase">Pendente</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-white/5 pb-2">
            <h3 className="text-xs font-light tracking-[0.2em] text-white uppercase">Desafios Diários</h3>
            <span className="material-symbols-outlined text-zinc-600 text-sm">local_fire_department</span>
          </div>
          <div className="bg-transparent border border-primary/40 rounded-sm p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs font-medium text-white mb-1 tracking-wide">Zero Supérfluos Hoje</h4>
                <p className="text-[10px] text-zinc-500 font-light leading-relaxed">Complete o dia sem gastos não essenciais.</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-primary text-lg drop-shadow-[0_0_8px_rgba(15,182,127,0.8)]" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
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
              <div className="h-[2px] bg-zinc-800 rounded-full overflow-visible relative">
                <div className="h-full bg-primary rounded-full relative w-[75%] shadow-[0_0_8px_rgba(15,182,127,0.6)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(15,182,127,0.8)]"></div>
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
              <div className="h-[2px] bg-zinc-800 rounded-full flex items-center">
                <div className="h-full bg-primary rounded-full relative w-[80%] shadow-[0_0_8px_rgba(15,182,127,0.4)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(15,182,127,0.8)]"></div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 font-light tracking-wide pt-0.5">
                <span>R$ 80k</span>
                <span>Meta: R$ 100k</span>
              </div>
            </div>
            <div className="space-y-2" onClick={() => navigate('/goals')}>
              <div className="flex justify-between items-end text-xs">
                <span className="text-white font-light tracking-wide">Viagem Europa</span>
                <span className="text-[#A855F7] font-medium">45%</span>
              </div>
              <div className="h-[2px] bg-zinc-800 rounded-full flex items-center">
                <div className="h-full bg-[#A855F7] rounded-full relative w-[45%] shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 font-light tracking-wide pt-0.5">
                <span>R$ 13.5k</span>
                <span>Meta: R$ 30k</span>
              </div>
            </div>
            <div className="space-y-2" onClick={() => navigate('/goals')}>
              <div className="flex justify-between items-end text-xs">
                <span className="text-white font-light tracking-wide">Aposentadoria</span>
                <span className="text-[#3B82F6] font-medium">12%</span>
              </div>
              <div className="h-[2px] bg-zinc-800 rounded-full flex items-center">
                <div className="h-full bg-[#3B82F6] rounded-full relative w-[12%] shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 font-light tracking-wide pt-0.5">
                <span>R$ 120k</span>
                <span>Meta: R$ 1M</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
