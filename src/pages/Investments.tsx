import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Investments() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Investimentos" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-32">
          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_left</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-300">Últimos 12 Meses</span>
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_right</span>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="relative w-64 h-64 flex items-center justify-center chart-container">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10B981" strokeDasharray="251.2" strokeDashoffset="100.48" strokeLinecap="round" strokeWidth="10"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3B82F6" strokeDasharray="251.2" strokeDashoffset="175.84" strokeLinecap="round" strokeWidth="10" transform="rotate(144 50 50)"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#F59E0B" strokeDasharray="251.2" strokeDashoffset="200.96" strokeLinecap="round" strokeWidth="10" transform="rotate(252 50 50)"></circle>
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#8B5CF6" strokeDasharray="251.2" strokeDashoffset="226.08" strokeLinecap="round" strokeWidth="10" transform="rotate(324 50 50)"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Patrimônio Total</span>
                <span className="text-3xl font-display font-bold">R$ 25.400</span>
                <span className="text-[10px] text-primary font-bold mt-1">+12.4% <span className="text-zinc-600">ano</span></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">account_balance</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">40%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Renda Fixa</h4>
                <p className="text-sm font-bold text-primary">R$ 10.160</p>
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500 text-sm">trending_up</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">30%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Variável</h4>
                <p className="text-sm font-bold text-primary">R$ 7.620</p>
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-500 text-sm">grouped_bar_chart</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">20%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Fundos</h4>
                <p className="text-sm font-bold text-primary">R$ 5.080</p>
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-500 text-sm">currency_bitcoin</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">10%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Cripto</h4>
                <p className="text-sm font-bold text-primary">R$ 2.540</p>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Crescimento Patrimonial</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-0.5 bg-primary"></div>
                <span className="text-[8px] text-zinc-500 uppercase font-bold">Real</span>
                <div className="w-2 h-0.5 border-t border-dashed border-zinc-500"></div>
                <span className="text-[8px] text-zinc-500 uppercase font-bold">Projeção</span>
              </div>
            </div>
            <Card className="p-6">
              <div className="relative h-32 flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 100">
                  <path d="M0,80 L40,75 L80,60 L120,65 L160,40" fill="none" stroke="#10B981" strokeWidth="2"></path>
                  <path d="M160,40 L200,20" fill="none" stroke="#525252" strokeDasharray="4" strokeWidth="2"></path>
                  <circle cx="160" cy="40" fill="#10B981" r="3"></circle>
                </svg>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-[8px] text-zinc-600 font-bold uppercase">Jan</span>
                <span className="text-[8px] text-zinc-600 font-bold uppercase">Jun</span>
                <span className="text-[8px] text-zinc-600 font-bold uppercase">Dez</span>
                <span className="text-[8px] text-zinc-400 font-bold uppercase">Projeção</span>
              </div>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform active:scale-90">
              <span className="material-symbols-outlined text-black font-bold text-3xl">add</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
