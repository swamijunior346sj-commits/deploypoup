import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Planning() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Planejamento" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-32">
          <Card className="rounded-[32px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary/20 text-6xl">calendar_month</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Orçamento Mensal</h2>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-3xl font-display font-bold">R$ 4.500</span>
                <span className="text-xs text-zinc-500">disponível</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-zinc-400">Gasto Atual</span>
                    <span className="text-zinc-300">R$ 2.850 / R$ 4.500</span>
                  </div>
                  <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[63%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-2">Categorias de Planejamento</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center justify-between group active:bg-zinc-900 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-500">home</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Moradia</h4>
                    <p className="text-[10px] text-zinc-500 font-medium">R$ 1.200 / R$ 1.500</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-zinc-300">80%</span>
                  <div className="w-16 h-1 bg-zinc-900 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-blue-500 w-[80%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center justify-between group active:bg-zinc-900 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-500">restaurant</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Alimentação</h4>
                    <p className="text-[10px] text-zinc-500 font-medium">R$ 650 / R$ 800</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-zinc-300">81%</span>
                  <div className="w-16 h-1 bg-zinc-900 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-amber-500 w-[81%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-2xl flex items-center justify-between group active:bg-zinc-900 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-purple-500">directions_car</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Transporte</h4>
                    <p className="text-[10px] text-zinc-500 font-medium">R$ 300 / R$ 500</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-zinc-300">60%</span>
                  <div className="w-16 h-1 bg-zinc-900 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-purple-500 w-[60%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Insight da IA</h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              "Você já utilizou 63% do seu orçamento mensal. Se mantiver esse ritmo, economizará R$ 450 extras este mês. Que tal destinar esse valor para sua meta 'Viagem 2024'?"
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors active:scale-95">
              Ajustar Planejamento
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
