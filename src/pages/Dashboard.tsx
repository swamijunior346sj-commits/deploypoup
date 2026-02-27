import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Dashboard() {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState<'Dia' | 'Semana' | 'Mês' | 'Ano'>('Mês');

  return (
    <div className="space-y-6">
      <Header
        title="Olá, Investidor"
        subtitle="Inteligência Financeira"
        rightElement={
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative active:scale-95 transition-transform">
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-zinc-900"></div>
              <span className="material-symbols-outlined text-zinc-400 text-xl">notifications</span>
            </button>
            <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-zinc-400">person</span>
            </button>
          </div>
        }
      />

      <div className="px-6 space-y-6 pb-20">
        <div className="flex p-1 bg-zinc-950 border border-zinc-900 rounded-2xl">
          {(['Dia', 'Semana', 'Mês', 'Ano'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${timePeriod === period
                ? 'text-white bg-zinc-900'
                : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="w-full bg-zinc-950 border border-zinc-900 rounded-[28px] p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase mb-2">Saldo Total</span>
          <h2 className="text-4xl font-bold text-primary font-display animate-pulse-glow">R$ 12.450,00</h2>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Saldo por Contas</h3>
          <div className="flex space-x-3 overflow-x-auto no-scrollbar py-1">
            <div className="flex-shrink-0 w-44 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full animate-shimmer pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.05), transparent)' }}></div>
              <div className="flex items-center space-x-2 mb-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Receitas</span>
              </div>
              <p className="text-sm font-bold font-display relative z-10 text-primary">R$ 18.250,00</p>
            </div>
            <div className="flex-shrink-0 w-44 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full animate-shimmer pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.05), transparent)', animationDelay: '1.5s' }}></div>
              <div className="flex items-center space-x-2 mb-2 relative z-10">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Despesas</span>
              </div>
              <p className="text-sm font-bold font-display relative z-10">R$ 5.800,00</p>
            </div>
            <div className="flex-shrink-0 w-44 bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase">Investimentos</span>
              </div>
              <p className="text-sm font-bold font-display">R$ 400,00</p>
            </div>
          </div>
        </div>

        <div onClick={() => navigate('/ai-assistant')} className="cursor-pointer bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center space-x-4 animate-aura-breathe">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary">Insight da IA</p>
            <p className="text-[11px] text-zinc-300">Atenção: Gasto em Lazer está 20% acima da sua média mensal.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div onClick={() => navigate('/analysis')} className="cursor-pointer bg-zinc-950 border border-zinc-900 rounded-[24px] p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Fluxo de Caixa</h3>
              <span className="text-[10px] font-bold text-primary">+12%</span>
            </div>
            <div className="h-32 w-full flex items-end justify-between space-x-1">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path className="chart-line" d="M0 35 Q 20 30, 40 15 T 80 20 T 100 5" fill="none" stroke="#10B981" strokeWidth="2"></path>
                <path d="M0 35 Q 20 30, 40 15 T 80 20 T 100 5 V 40 H 0 Z" fill="url(#gradient)" opacity="0.1"></path>
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }}></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[8px] text-zinc-600 font-bold uppercase">S1</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase">S2</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase">S3</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase">S4</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div onClick={() => navigate('/manage-categories')} className="cursor-pointer bg-zinc-950 border border-zinc-900 rounded-[24px] p-5 flex flex-col items-center">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4 w-full">Categorias</h3>
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-zinc-900" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213" strokeDashoffset="60" strokeWidth="8"></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">72%</span>
                </div>
              </div>
              <p className="text-[9px] text-zinc-500 mt-4 font-bold uppercase">Meta: 80%</p>
            </div>
            <div onClick={() => navigate('/ranking')} className="cursor-pointer bg-zinc-950 border border-zinc-900 rounded-[24px] p-5 flex flex-col items-center overflow-hidden">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4 w-full">Score IA</h3>
              <div className="relative w-20 h-20 flex flex-col items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
                  <circle className="text-zinc-900" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="4"></circle>
                  <circle className="text-primary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213" strokeDashoffset="40" strokeLinecap="round" strokeWidth="4"></circle>
                </svg>
                <div className="absolute inset-0 w-full h-full animate-rotate-glow pointer-events-none">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full blur-[8px] opacity-40"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold font-display">845</span>
                  <span className="text-[8px] text-primary font-bold">EXCELENTE</span>
                </div>
              </div>
              <p className="text-[9px] text-zinc-500 mt-4 font-bold uppercase">+15 pts mês</p>
            </div>
          </div>
        </div>

        <div onClick={() => navigate('/goals')} className="cursor-pointer bg-zinc-950 border border-zinc-900 rounded-[24px] p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Progresso de Metas</h3>
            <span className="text-[10px] text-zinc-400 font-bold">2 Ativas</span>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">Reserva de Emergência</span>
                <span className="text-primary font-bold">85%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">Novo iPhone 16 Pro</span>
                <span className="text-zinc-500 font-bold">32%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-zinc-700 h-full rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Últimas Transações</h3>
            <span onClick={() => navigate('/transactions')} className="text-[10px] text-primary font-bold cursor-pointer">VER TUDO</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-zinc-400 text-lg">shopping_cart</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Mercado</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Hoje, 14:20</p>
                </div>
              </div>
              <p className="text-sm font-bold text-zinc-300">- R$ 450,00</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-lg">account_balance</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Dividendos</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Ontem, 09:15</p>
                </div>
              </div>
              <p className="text-sm font-bold text-primary">+ R$ 1.200,00</p>
            </div>
          </div>
        </div>

      </div>

      <button onClick={() => navigate('/new-transaction')} className="fixed right-6 bottom-24 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center z-[60] active:scale-95 transition-transform hover:shadow-primary/40">
        <span className="material-symbols-outlined text-black font-bold text-3xl">add</span>
      </button>
    </div>
  );
}
