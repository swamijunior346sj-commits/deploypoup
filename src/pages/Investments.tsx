import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';

export default function Investments() {
  const navigate = useNavigate();
  const { assets, loading } = useData();

  const totalAssets = assets.reduce((acc, asset) => acc + Number(asset.value), 0);

  const getCategoryTotal = (type: string) =>
    assets.filter(a => a.type === type).reduce((acc, a) => acc + Number(a.value), 0);

  const rendaFixa = getCategoryTotal('Renda Fixa');
  const rendaVariavel = getCategoryTotal('Renda Variável');
  const fiis = getCategoryTotal('FIIs');
  const cripto = getCategoryTotal('Cripto');

  if (loading) {
    return (
      <div className="bg-background-dark text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Analisando Carteira...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header showBack title="Investimentos" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-32">
          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_left</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-300">Patrimônio Atual</span>
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_right</span>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="relative w-64 h-64 flex items-center justify-center chart-container">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10B981" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (rendaFixa / (totalAssets || 1)))} strokeLinecap="round" strokeWidth="10"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Patrimônio Total</span>
                <span className="text-3xl font-display font-bold">R$ {totalAssets.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">account_balance</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">{totalAssets ? Math.round((rendaFixa / totalAssets) * 100) : 0}%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Renda Fixa</h4>
                <p className="text-sm font-bold text-primary">R$ {rendaFixa.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500 text-sm">trending_up</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">{totalAssets ? Math.round((rendaVariavel / totalAssets) * 100) : 0}%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Variável</h4>
                <p className="text-sm font-bold text-primary">R$ {rendaVariavel.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-500 text-sm">grouped_bar_chart</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">{totalAssets ? Math.round((fiis / totalAssets) * 100) : 0}%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">FIIs</h4>
                <p className="text-sm font-bold text-primary">R$ {fiis.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
              </div>
            </Card>
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-500 text-sm">currency_bitcoin</span>
                </div>
                <span className="text-[10px] font-bold text-zinc-500">{totalAssets ? Math.round((cripto / totalAssets) * 100) : 0}%</span>
              </div>
              <div>
                <h4 className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Cripto</h4>
                <p className="text-sm font-bold text-primary">R$ {cripto.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</p>
              </div>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => navigate('/new-investment')}
              className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform active:scale-90"
            >
              <span className="material-symbols-outlined text-black font-bold text-3xl">add</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
