import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';

export default function Investments() {
  const navigate = useNavigate();
  const { assets, loading } = useData();

  const totalAssets = assets.reduce((acc, asset) => acc + (parseFloat(asset.amount?.toString() || asset.value?.toString() || '0')), 0);

  const getCategoryTotal = (type: string) =>
    assets.filter(a => a.type === type).reduce((acc, a) => acc + (parseFloat(a.amount?.toString() || a.value?.toString() || '0')), 0);

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
      <style>{`
        @keyframes levitate {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .levitate-btn {
          animation: levitate 3s ease-in-out infinite;
        }
      `}</style>
      <Header showBack title="Investimentos" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-48">
          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_left</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-300">Patrimônio Atual</span>
            <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_right</span>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="40" stroke="#18181b" strokeWidth="8"></circle>
                <circle
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="#10B981"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * (Math.min(1, rendaFixa / (totalAssets || 1))))}
                  strokeLinecap="round"
                  strokeWidth="8"
                  className="transition-all duration-1000 ease-out"
                ></circle>
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
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Meus Ativos</h3>
              <span className="text-[10px] text-zinc-700 font-bold uppercase">{assets.length} Ativos</span>
            </div>

            <div className="space-y-3">
              {assets.length > 0 ? (
                assets.map((asset) => (
                  <div key={asset.id} className="bg-[#121212] border border-white/5 rounded-2xl p-4 flex items-center justify-between active:scale-95 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-lg">
                          {asset.type === 'Renda Fixa' ? 'lock' : (asset.type === 'Cripto' ? 'currency_bitcoin' : 'show_chart')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{asset.symbol}</h4>
                        <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{asset.broker || 'Corretora'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">R$ {parseFloat(asset.amount?.toString() || asset.value?.toString() || '0').toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      <div className="flex items-center justify-end gap-1 text-[8px] font-bold uppercase text-primary">
                        <span className="material-symbols-outlined text-[10px]">arrow_drop_up</span>
                        <span>2.4%</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center border border-dashed border-zinc-800 rounded-3xl">
                  <p className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">Nenhum ativo registrado</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-32 right-6 z-[150] levitate-btn">
        <button
          onClick={() => navigate('/new-investment')}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group"
        >
          <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">add</span>
        </button>
      </div>
    </div>
  );
}
