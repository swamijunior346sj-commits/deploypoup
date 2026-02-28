import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reports() {
  const navigate = useNavigate();
  const tabs = ['GERAL', 'INVESTIMENTOS', 'ORÇAMENTOS'] as const;
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('INVESTIMENTOS');

  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const idx = tabs.indexOf(activeTab);
    if (diff > 60 && idx < tabs.length - 1) setActiveTab(tabs[idx + 1]);
    if (diff < -60 && idx > 0) setActiveTab(tabs[idx - 1]);
  };

  const candlesticks = [
    { wickTop: 16, body: 48, wickBottom: 12, up: false },
    { wickTop: 24, body: 64, wickBottom: 16, up: true },
    { wickTop: 32, body: 96, wickBottom: 8, up: true },
    { wickTop: 16, body: 80, wickBottom: 40, up: false },
    { wickTop: 48, body: 112, wickBottom: 16, up: true },
  ];

  const budgetCategories = [
    { name: 'Alimentação', icon: 'restaurant', spent: 1840, limit: 2000, remaining: 160, percent: 92 },
    { name: 'Moradia', icon: 'home', spent: 3200, limit: 4000, remaining: 800, percent: 80 },
    { name: 'Lazer', icon: 'movie', spent: 650, limit: 1000, remaining: 350, percent: 65 },
  ];

  return (
    <div className="bg-black text-[#D6D6D6] font-sans flex flex-col min-h-screen overflow-x-hidden">
      {/* Header */}
      {/* Tabs */}
      <div className="px-6 pt-2 pb-2 flex justify-between items-center text-xs font-semibold tracking-wider border-b border-zinc-900">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-[10px] font-bold tracking-widest transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-zinc-500'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <main
        className="flex-1 overflow-y-auto pb-32"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ===== INVESTIMENTOS TAB ===== */}
        {activeTab === 'INVESTIMENTOS' && (
          <div>
            {/* Asset Header */}
            <section className="p-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-2xl font-display font-bold text-[#FCFCFC]">PETR4.SA</h2>
                  <p className="text-[10px] text-zinc-500 tracking-widest uppercase">Petróleo Brasileiro S.A.</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">R$ 38,42</p>
                  <p className="text-[10px] text-primary font-medium">+2.45% (Hoje)</p>
                </div>
              </div>

              {/* Candlestick Chart */}
              <div className="w-full aspect-[4/3] bg-[#0D0E10] rounded-3xl border border-zinc-800/50 p-4 relative overflow-hidden flex items-end gap-1.5">
                <div className="absolute inset-0 grid grid-rows-5 px-4 py-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-zinc-800/30"></div>
                  ))}
                </div>
                {candlesticks.map((c, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                    <div className="w-[1px] bg-zinc-700" style={{ height: `${c.wickTop}px` }}></div>
                    <div
                      className={`w-full rounded-sm ${c.up ? 'bg-primary' : 'bg-rose-600 opacity-60'}`}
                      style={{
                        height: `${c.body}px`,
                        ...(c.up ? { boxShadow: `0 0 ${8 + i * 2}px rgba(15,182,127,${0.3 + i * 0.05})` } : {}),
                      }}
                    ></div>
                    <div className="w-[1px] bg-zinc-700" style={{ height: `${c.wickBottom}px` }}></div>
                  </div>
                ))}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                  <path d="M 0 120 Q 80 100, 160 110 T 320 80" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
                  <path d="M 0 140 Q 80 130, 160 145 T 320 120" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                </svg>
              </div>
            </section>

            {/* Stats Cards */}
            <section className="px-6 grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#0D0E10] border border-zinc-800 p-5 rounded-3xl">
                <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">Lucro Real</span>
                <p className="text-lg font-display font-bold text-[#FCFCFC] mt-1">R$ 14.280</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="material-symbols-outlined text-primary text-xs">trending_up</span>
                  <span className="text-[10px] text-primary font-bold">+12.4%</span>
                </div>
              </div>
              <div className="bg-[#0D0E10] border border-zinc-800 p-5 rounded-3xl">
                <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">Total Rendido</span>
                <p className="text-lg font-display font-bold text-[#FCFCFC] mt-1">R$ 4.120</p>
                <div className="flex items-center gap-1 mt-2 text-zinc-500">
                  <span className="material-symbols-outlined text-[14px]">history</span>
                  <span className="text-[10px] font-medium">Últimos 30d</span>
                </div>
              </div>
            </section>

            {/* Growth Chart */}
            <section className="px-6 space-y-6">
              <div className="bg-[#0D0E10] border border-zinc-800 rounded-3xl p-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">Crescimento Patrimonial</h3>
                <div className="h-32 relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 100">
                    <defs>
                      <linearGradient id="growthGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0FB67F" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,100 L0,80 Q50,70 100,85 T200,50 T300,20 L300,100 Z" fill="url(#growthGradient)" />
                    <path d="M0,80 Q50,70 100,85 T200,50 T300,20" fill="none" stroke="#0FB67F" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              {/* Risk Allocation */}
              <div className="bg-[#0D0E10] border border-zinc-800 rounded-3xl p-6 flex items-center justify-between">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Alocação por Risco</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-[10px] text-[#D6D6D6]">Baixo (62%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-[10px] text-[#D6D6D6]">Médio (28%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                      <span className="text-[10px] text-[#D6D6D6]">Alto (10%)</span>
                    </div>
                  </div>
                </div>
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#1A1A1A" strokeWidth="3" />
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#0FB67F" strokeDasharray="100" strokeDashoffset="38" strokeWidth="3" />
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#F59E0B" strokeDasharray="28 100" strokeDashoffset="-62" strokeWidth="3" />
                    <circle cx="18" cy="18" fill="none" r="16" stroke="#E11D48" strokeDasharray="10 100" strokeDashoffset="-90" strokeWidth="3" />
                  </svg>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== ORÇAMENTOS TAB ===== */}
        {activeTab === 'ORÇAMENTOS' && (
          <div>
            {/* Total Budget Circle */}
            <section className="p-6">
              <div className="bg-[#0D0E10] border border-zinc-800 rounded-[32px] p-8 flex flex-col items-center">
                <h2 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6 text-center">ORÇAMENTO TOTAL</h2>
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="transparent" r="42" stroke="#1A1A1A" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" fill="transparent" r="42"
                      stroke="#0FB67F"
                      strokeDasharray="263.89"
                      strokeDashoffset="73.89"
                      strokeLinecap="round"
                      strokeWidth="8"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(15,182,127,0.4))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-display font-bold text-[#FCFCFC]">72%</span>
                    <span className="text-[9px] font-bold text-zinc-500 tracking-widest uppercase mt-1">Consumido</span>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Gasto</p>
                    <p className="text-lg font-bold text-[#FCFCFC]">R$ 8.640</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Limite</p>
                    <p className="text-lg font-bold text-zinc-500">R$ 12.000</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Budget Categories */}
            <section className="px-6 space-y-4">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase px-2">Categorias</h3>
              {budgetCategories.map((cat) => (
                <div key={cat.name} className="bg-[#0D0E10] border border-zinc-800 rounded-3xl p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-[20px]">{cat.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#FCFCFC]">{cat.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] font-bold text-[#FCFCFC]">R$ {cat.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        <span className="text-[10px] text-zinc-500 font-medium">Restam R$ {cat.remaining}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${cat.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </section>

            {/* AI Insight */}
            <section className="p-6">
              <div className="bg-gradient-to-br from-[#0D0E10] to-zinc-950 border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full"></div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/20 rounded-xl">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">IA INSIGHT</h3>
                    <p className="text-sm text-[#D6D6D6] leading-relaxed">
                      <span className="font-bold text-[#FCFCFC]">Atenção!</span> Seu orçamento de <span className="text-[#FCFCFC] font-semibold">Alimentação</span> atingiu 92% do limite planejado para este mês. Recomendamos reduzir gastos em delivery nos próximos 5 dias.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== GERAL TAB ===== */}
        {activeTab === 'GERAL' && (
          <div>
            {/* Patrimônio Total Card */}
            <section className="p-6">
              <div className="bg-[#0D0E10] border border-zinc-800 rounded-[32px] p-8">
                <h2 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">PATRIMÔNIO TOTAL</h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-display font-bold text-[#FCFCFC] leading-none">R$ 54.320,00</span>
                  <div className="flex items-center text-primary text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                    <span>4.2%</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-900 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Saldo Mensal</p>
                    <p className="text-sm font-semibold text-[#FCFCFC]">+ R$ 2.450,00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Meta 2024</p>
                    <p className="text-sm font-semibold text-zinc-500">65% atingido</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Receitas vs Despesas - 6 months */}
            <section className="px-6 mb-8">
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Receitas vs Despesas</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Rec</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Des</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0D0E10] border border-zinc-800 rounded-3xl p-6 h-48 flex items-end justify-between gap-2">
                {[
                  { month: 'JUN', rec: 80, des: 40 },
                  { month: 'JUL', rec: 90, des: 50 },
                  { month: 'AGO', rec: 75, des: 55 },
                  { month: 'SET', rec: 100, des: 35 },
                  { month: 'OUT', rec: 85, des: 60 },
                  { month: 'NOV', rec: 95, des: 45, active: true },
                ].map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex justify-center items-end gap-1 h-24">
                      <div
                        className="w-2.5 bg-primary rounded-t-sm"
                        style={{
                          height: `${bar.rec}%`,
                          ...(bar.active ? { boxShadow: '0 0 10px rgba(15,182,127,0.3)' } : {}),
                        }}
                      ></div>
                      <div className="w-2.5 bg-zinc-700 rounded-t-sm" style={{ height: `${bar.des}%` }}></div>
                    </div>
                    <span className={`text-[9px] font-bold ${bar.active ? 'text-[#FCFCFC]' : 'text-zinc-600'}`}>{bar.month}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Fluxo de Caixa Diário */}
            <section className="px-6 mb-8">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase px-2 mb-4">Fluxo de Caixa Diário</h3>
              <div className="bg-[#0D0E10] border border-zinc-800 rounded-3xl p-6 relative overflow-hidden h-40">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                  <defs>
                    <linearGradient id="lineGradientGeral" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0FB67F" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,120 Q50,110 100,130 T200,80 T300,60 T400,40 L400,150 L0,150 Z" fill="url(#lineGradientGeral)" />
                  <path d="M0,120 Q50,110 100,130 T200,80 T300,60 T400,40" fill="none" stroke="#0FB67F" strokeLinecap="round" strokeWidth="3" />
                  <circle cx="400" cy="40" fill="#0FB67F" r="4" />
                  <circle cx="400" cy="40" fill="#0FB67F" opacity="0.4" r="8" />
                </svg>
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center">
                  <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Início do Mês</span>
                  <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Hoje</span>
                </div>
              </div>
            </section>

            {/* AI Insight */}
            <section className="px-6">
              <div className="bg-gradient-to-br from-[#0D0E10] to-zinc-950 border border-zinc-800/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full"></div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/20 rounded-xl">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">IA INSIGHT</h3>
                    <p className="text-sm text-[#D6D6D6] leading-relaxed">
                      Seu <span className="text-[#FCFCFC] font-semibold">saldo líquido</span> cresceu <span className="text-primary font-bold">12%</span> este mês devido a um bônus extra. Ótimo trabalho!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Simulator Button */}
        <section className="px-6 mt-10">
          <button
            onClick={() => navigate('/savings-simulator')}
            className="w-full bg-[#0D0E10] border border-zinc-800 rounded-2xl p-5 flex items-center justify-between active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <span className="material-symbols-outlined text-primary">calculate</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-display font-bold text-[#FCFCFC]">Simulador de Economia</p>
                <p className="text-[10px] text-zinc-500 font-medium">Descubra quanto você pode poupar</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-600">chevron_right</span>
          </button>
        </section>

        {/* Footer */}
        <footer className="mt-16 mb-8 px-6 flex flex-col items-center">
          <div className="flex items-center space-x-2 opacity-30">
            <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
            <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#FCFCFC]">
              POWERED BY POUP INTELLIGENCE
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
