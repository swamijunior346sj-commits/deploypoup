import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function CompoundInterest() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Juros Compostos" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-32">
          <Card className="bg-zinc-950 border border-zinc-900 rounded-[32px] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary/20 text-6xl">trending_up</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">Simulação de Crescimento</h2>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-3xl font-display font-bold text-primary">R$ 125.400</span>
                <span className="text-xs text-zinc-500">em 10 anos</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Investimento</span>
                  <p className="text-sm font-bold text-zinc-300">R$ 50.000</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Rendimento</span>
                  <p className="text-sm font-bold text-primary">R$ 75.400</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Parâmetros do Simulador</h3>
                <span className="material-symbols-outlined text-zinc-600 text-sm">tune</span>
              </div>
              <div className="space-y-6 bg-zinc-950 border border-zinc-900 p-6 rounded-[24px]">
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-zinc-400">Aporte Inicial</span>
                    <span className="text-primary">R$ 5.000</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full relative">
                    <div className="absolute h-full bg-primary w-[30%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.5 left-[30%] shadow-lg cursor-pointer"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-zinc-400">Aporte Mensal</span>
                    <span className="text-primary">R$ 500</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full relative">
                    <div className="absolute h-full bg-primary w-[50%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.5 left-[50%] shadow-lg cursor-pointer"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-zinc-400">Taxa de Juros (Anual)</span>
                    <span className="text-primary">12%</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full relative">
                    <div className="absolute h-full bg-primary w-[60%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.5 left-[60%] shadow-lg cursor-pointer"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-zinc-400">Período (Anos)</span>
                    <span className="text-primary">10 Anos</span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full relative">
                    <div className="absolute h-full bg-primary w-[40%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
                    <div className="absolute w-4 h-4 bg-white border-2 border-primary rounded-full -top-1.5 left-[40%] shadow-lg cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button className="w-full py-4 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-400 transition-colors active:scale-95">
              Recalcular Simulação
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
