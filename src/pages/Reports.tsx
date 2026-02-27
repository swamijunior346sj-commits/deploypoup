import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Reports() {
  const navigate = useNavigate();

  const RightElement = () => (
    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
      <span className="material-symbols-outlined text-zinc-400">share</span>
    </div>
  );

  return (
    <div className="bg-background-dark text-white font-sans min-h-screen flex flex-col">
      <Header
        showBack
        title="Relatórios Avançados"
        rightElement={<RightElement />}
      />

      <main className="flex-grow px-6 space-y-8 pb-32 pt-4">
        <div className="flex p-1 bg-zinc-950 border border-zinc-900 rounded-2xl">
          <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-zinc-900 rounded-xl transition-all shadow-lg shadow-black/40">Mensal</button>
          <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 rounded-xl transition-all">Anual</button>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Evolução Patrimonial</h3>
            <span onClick={() => navigate('/financial-performance')} className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer hover:text-white transition-colors">Ver Detalhes</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6 relative overflow-hidden">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Total acumulado</p>
                <p className="text-2xl font-bold font-display text-primary">R$ 142.850,20</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-primary font-bold uppercase">+4.2% este mês</p>
              </div>
            </div>
            <div className="h-32 w-full mt-4">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 0.2 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }}></stop>
                  </linearGradient>
                </defs>
                <path d="M0 35 Q 10 32, 20 28 T 40 25 T 60 15 T 80 12 T 100 5 V 40 H 0 Z" fill="url(#areaGradient)"></path>
                <path d="M0 35 Q 10 32, 20 28 T 40 25 T 60 15 T 80 12 T 100 5" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="2.5"></path>
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-[8px] text-zinc-700 font-bold uppercase">Jan</span>
              <span className="text-[8px] text-zinc-700 font-bold uppercase">Mar</span>
              <span className="text-[8px] text-zinc-700 font-bold uppercase">Mai</span>
              <span className="text-[8px] text-zinc-700 font-bold uppercase">Jul</span>
              <span className="text-[8px] text-zinc-700 font-bold uppercase">Set</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Comparação Mensal</h3>
            <span className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer">Ver Detalhes</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Receitas</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Despesas</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-32 px-2">
              <div className="flex space-x-1 items-end h-full">
                <div className="w-6 bg-primary rounded-t-lg" style={{ height: '60%' }}></div>
                <div className="w-6 bg-zinc-700 rounded-t-lg" style={{ height: '40%' }}></div>
              </div>
              <div className="flex space-x-1 items-end h-full">
                <div className="w-6 bg-primary rounded-t-lg" style={{ height: '85%' }}></div>
                <div className="w-6 bg-zinc-700 rounded-t-lg" style={{ height: '35%' }}></div>
              </div>
              <div className="flex space-x-1 items-end h-full">
                <div className="w-6 bg-primary rounded-t-lg shadow-lg shadow-primary/20" style={{ height: '75%' }}></div>
                <div className="w-6 bg-zinc-700 rounded-t-lg" style={{ height: '50%' }}></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-2">
              <span className="text-[9px] text-zinc-600 font-bold uppercase">Out</span>
              <span className="text-[9px] text-zinc-600 font-bold uppercase">Nov</span>
              <span className="text-[9px] text-white font-bold uppercase">Dez</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Relatório de Cartões</h3>
              <span className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer">Ver Detalhes</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                  <span className="text-zinc-400">Visa Platinum</span>
                  <span className="text-zinc-200">R$ 2.450,00</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                  <span className="text-zinc-400">Mastercard Black</span>
                  <span className="text-zinc-200">R$ 1.800,00</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full">
                  <div className="h-full bg-zinc-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                  <span className="text-zinc-400">Amex Gold</span>
                  <span className="text-zinc-200">R$ 420,00</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full">
                  <div className="h-full bg-zinc-700 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Investimentos</h3>
              <span className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer">Ver Detalhes</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6 flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-zinc-900" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeWidth="12"></circle>
                  <circle className="text-primary" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339" strokeDashoffset="100" strokeLinecap="round" strokeWidth="12"></circle>
                  <circle className="text-zinc-600" cx="64" cy="64" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339" strokeDashoffset="240" strokeLinecap="round" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold font-display">70%</span>
                  <span className="text-[7px] text-zinc-500 font-bold uppercase">Renda Fixa</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">Ações</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">FIIs</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Fluxo de Caixa Detalhado</h3>
            <span className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer">Ver Detalhes</span>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6">
            <div className="h-40 w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                <path d="M0 50 L0 45 Q 25 40, 50 48 T 100 42 L 100 50 Z" fill="#10B981" fillOpacity="0.1"></path>
                <path d="M0 45 Q 25 40, 50 48 T 100 42" fill="none" opacity="0.3" stroke="#10B981" strokeWidth="1"></path>
                <path d="M0 50 L0 30 Q 25 20, 50 25 T 100 10 L 100 50 Z" fill="#10B981" fillOpacity="0.25"></path>
                <path d="M0 30 Q 25 20, 50 25 T 100 10" fill="none" stroke="#10B981" strokeWidth="2"></path>
              </svg>
            </div>
            <div className="flex justify-between mt-4">
              <div className="text-center">
                <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Entradas</p>
                <p className="text-xs font-bold text-primary">R$ 18k</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Fixos</p>
                <p className="text-xs font-bold text-zinc-400">R$ 8k</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] text-zinc-500 font-bold uppercase mb-1">Variáveis</p>
                <p className="text-xs font-bold text-zinc-400">R$ 4k</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-8 pb-4">
          <div className="flex items-center justify-center space-x-2 text-zinc-700">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase">
              POWERED BY POUP INTELLIGENCE
            </p>
          </div>
        </footer>
      </main>

      <button className="fixed right-6 bottom-24 w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full shadow-2xl flex items-center justify-center z-[60] active:scale-95 transition-transform text-zinc-400">
        <span className="material-symbols-outlined">add</span>
      </button>

    </div>
  );
}
