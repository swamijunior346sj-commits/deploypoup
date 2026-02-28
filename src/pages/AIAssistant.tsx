import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAssistant() {
  const navigate = useNavigate();
  const [savingsSimulation, setSavingsSimulation] = useState(15);

  return (
    <div className="bg-brand-bg text-brand-primaryText font-sans flex flex-col min-h-screen relative">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-brand-bg/90 backdrop-blur-xl z-50">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-brand-card border border-white/5 flex items-center justify-center active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-brand-subtitle text-xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-xs font-display font-bold tracking-[0.3em] uppercase text-brand-primaryText text-center px-2">Assistente IA & Análise</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/5 shrink-0">
          <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARoQpVuOA1P7pvcmCUaudfQYfcmtIJhE-4m0s9a0NXPwZpr_-ul0DCqdm78RWpTmkHMwkFY4JDwKgi0r7MkgBGU6WK8hfB-k74SfNxWZLn7zpTzwT7HvlXdLhLFcXy3Kr7kNG5JkvRW0NeFvrtZebXNDB2Tey3SZd1Ha7k90cnbai1hV81KXCWDBW-0hL_ETIISR_aQbWzFKXKz9QHsEZV7-x9hHDqGGaXuMYQyPQxAhDJLwNvk-vokQt1MElRMv5LRloV8ESpr_0" />
        </div>
      </header>

      <main className="flex-grow px-6 space-y-8 pb-48">
        <section className="mt-2">
          <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex-shrink-0 flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full p-[2px] story-gradient">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-black">
                  <span className="material-symbols-outlined text-brand-interactive text-2xl">auto_awesome</span>
                </div>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-brand-subtitle uppercase">Resumo</span>
            </div>

            <div className="flex-shrink-0 w-64 bg-brand-card rounded-2xl p-4 border border-white/5 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-brand-indicatorBg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-brand-interactive text-xl">trending_up</span>
              </div>
              <div>
                <p className="text-[11px] text-brand-secondaryLabel leading-tight">Você economizou <span className="text-brand-primaryText font-bold">R$ 150</span> a mais que semana passada.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 px-1">
              <div className="w-6 h-6 rounded-full bg-brand-card flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px] text-brand-subtitle">smart_toy</span>
              </div>
              <span className="text-[10px] font-bold text-brand-subtitle tracking-widest uppercase">Análise de Gastos</span>
            </div>
            <div className="bg-brand-card rounded-2xl rounded-tl-none p-5 border border-white/5 space-y-4 max-w-[90%]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-orange-500">restaurant</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-primaryText">Alimentação</h4>
                  <p className="text-[11px] text-brand-subtitle">80% do orçamento mensal</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-interactive glow-interactive w-[80%] rounded-full"></div>
                </div>
                <p className="text-sm text-brand-secondaryLabel">
                  Você já gastou <span className="font-bold text-brand-interactive">80%</span> do seu orçamento mensal aqui. Recomendo cautela nos próximos 10 dias.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2 px-1">
              <div className="w-6 h-6 rounded-full bg-brand-card flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[14px] text-brand-subtitle">query_stats</span>
              </div>
              <span className="text-[10px] font-bold text-brand-subtitle tracking-widest uppercase">Simulação de Economia</span>
            </div>
            <div className="bg-brand-card border border-white/5 rounded-2xl rounded-tl-none p-6 space-y-6 max-w-[95%]">
              <p className="text-sm text-brand-secondaryLabel">Arraste para ver como reduzir gastos em <span className="text-brand-primaryText font-semibold">Lazer</span> impacta seu saldo futuro:</p>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-brand-subtitle uppercase tracking-tighter">Redução</span>
                  <span className="text-2xl font-display font-bold text-brand-interactive">-{savingsSimulation}%</span>
                </div>
                <input
                  className="w-full accent-brand-interactive form-range"
                  max="100"
                  min="0"
                  type="range"
                  value={savingsSimulation}
                  onChange={(e) => setSavingsSimulation(Number(e.target.value))}
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-brand-subtitle">Saldo projetado (30 dias)</span>
                <div className="text-right">
                  <span className="text-xs text-brand-subtitle line-through block">R$ 2.400</span>
                  <span className="text-lg font-bold text-brand-interactive">R$ {2400 + (savingsSimulation * 350 / 100)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="bg-brand-card/40 border border-dashed border-white/10 rounded-2xl p-4 flex items-start space-x-3">
              <span className="material-symbols-outlined text-brand-action shrink-0">lightbulb</span>
              <p className="text-xs text-brand-subtitle leading-relaxed italic">
                "Dica: Pagar faturas antes do vencimento este mês pode liberar R$ 45 em cashback adicional."
              </p>
            </div>
          </div>
        </div>

        <footer className="flex flex-col items-center py-4 opacity-40">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[12px] text-brand-subtitle">verified</span>
            <p className="text-[8px] font-bold tracking-[0.3em] uppercase text-brand-subtitle">Powered by POUP Intelligence</p>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-28 left-0 right-0 px-6 z-50">
        <div className="ai-gradient-border p-[1px] purple-glow">
          <div className="bg-brand-selection/95 backdrop-blur-xl rounded-[15px] p-2 flex items-center space-x-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-brand-interactive flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <input className="bg-transparent border-none focus:ring-0 text-sm text-brand-primaryText placeholder-brand-subtitle w-full font-medium" placeholder="Como posso economizar hoje?" type="text" />
            <button className="w-10 h-10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-brand-interactive glow-interactive text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
