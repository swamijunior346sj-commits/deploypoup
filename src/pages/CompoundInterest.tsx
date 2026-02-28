import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function CompoundInterest() {
  const navigate = useNavigate();
  const [initialAmount, setInitialAmount] = useState<number>(5000);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(1200);
  const [timeYears, setTimeYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(11.5);

  const RightElement = () => (
    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
      <span className="material-symbols-outlined text-zinc-400">info</span>
    </div>
  );

  return (
    <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen">
      <Header
        showBack
        title="Juros Compostos"
        rightElement={<RightElement />}
      />

      <main className="flex-grow px-6 space-y-8 pb-32 pt-4">
        <section className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-zinc-500">Aporte Inicial</span>
                <span className="text-zinc-200">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(initialAmount)}
                </span>
              </div>
              <input
                type="range"
                className="w-full form-range"
                min="0"
                max="100000"
                step="500"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-zinc-500">Aporte Mensal</span>
                <span className="text-zinc-200">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyAmount)}
                </span>
              </div>
              <input
                type="range"
                className="w-full form-range"
                min="0"
                max="10000"
                step="100"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-zinc-500">Tempo</span>
                <span className="text-zinc-200">{timeYears} Anos</span>
              </div>
              <input
                type="range"
                className="w-full form-range"
                min="1"
                max="40"
                step="1"
                value={timeYears}
                onChange={(e) => setTimeYears(Number(e.target.value))}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-zinc-500">Taxa de Juros (% a.a.)</span>
                <span className="text-zinc-200">{interestRate}%</span>
              </div>
              <input
                type="range"
                className="w-full form-range"
                min="1"
                max="30"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Evolução do Patrimônio</h3>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Investido</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">Juros</span>
                </div>
              </div>
            </div>
            <div className="h-48 w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 60">
                <defs>
                  <linearGradient id="interestGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 0.4 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }}></stop>
                  </linearGradient>
                  <linearGradient id="investedGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3f3f46', stopOpacity: 0.3 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#3f3f46', stopOpacity: 0 }}></stop>
                  </linearGradient>
                </defs>
                <path d="M0 55 Q 50 50, 100 45 V 60 H 0 Z" fill="url(#investedGradient)"></path>
                <path d="M0 55 Q 50 50, 100 45" fill="none" stroke="#3f3f46" strokeWidth="1.5"></path>
                <path d="M0 55 Q 40 50, 70 30 T 100 5 V 60 H 0 Z" fill="url(#interestGradient)"></path>
                <path d="M0 55 Q 40 50, 70 30 T 100 5" fill="none" stroke="#10B981" strokeLinecap="round" strokeWidth="3"></path>
                <circle cx="100" cy="5" fill="#10B981" r="3"></circle>
                <circle cx="100" cy="5" fill="white" r="1"></circle>
              </svg>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-[8px] text-zinc-700 font-bold">2024</span>
              <span className="text-[8px] text-zinc-700 font-bold">2032</span>
              <span className="text-[8px] text-zinc-700 font-bold">2039</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="bg-zinc-950 border border-zinc-900 rounded-[28px] p-8 shadow-2xl">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-2 text-center">Patrimônio Total</p>
                <p className="text-4xl font-display font-bold text-white text-center">R$ 648.214,32</p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-zinc-900">
                <div>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Total Investido</p>
                  <p className="text-lg font-bold text-zinc-300">R$ 221.000</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Total em Juros</p>
                  <p className="text-lg font-bold text-primary">R$ 427.214</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <button className="w-full py-5 rounded-2xl bg-primary text-black text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all">
          Simular Outro Cenário
        </button>

        {/* Savings Simulator Link */}
        <button
          onClick={() => navigate('/savings-simulator')}
          className="w-full bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex items-center justify-between active:scale-[0.98] transition-transform mt-4"
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <span className="material-symbols-outlined text-primary">savings</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">Simulador de Economia</p>
              <p className="text-[10px] text-zinc-500 font-medium">Descubra quanto você pode poupar</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-zinc-600">chevron_right</span>
        </button>

        <footer className="pt-4 pb-8">
          <div className="flex items-center justify-center space-x-2 text-zinc-700">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase">
              POWERED BY POUP INTELLIGENCE
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
