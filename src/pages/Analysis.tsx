import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useData } from '../contexts/DataContext';

export default function Analysis() {
  const navigate = useNavigate();
  const { assets, loading } = useData();

  const totalAssetsValue = assets.reduce((acc, asset) => acc + Number(asset.current_value), 0);

  // Calculate distribution (example logic)
  const total = assets.length || 1;
  const fixedIncome = assets.filter(a => a.type?.toLowerCase().includes('fixa')).length;
  const variableIncome = assets.filter(a => a.type?.toLowerCase().includes('variável') || a.type?.toLowerCase().includes('var')).length;
  const crypto = assets.filter(a => a.type?.toLowerCase().includes('cripto')).length;

  const distFixed = Math.round((fixedIncome / total) * 100);
  const distVar = Math.round((variableIncome / total) * 100);
  const distCripto = 100 - distFixed - distVar;

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary tracking-widest uppercase font-bold text-xs">Analisando Patrimônio...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-[#FCFCFC] font-sans flex flex-col min-h-screen selection:bg-primary/30 overflow-x-hidden antialiased">
      <style>{`
        @keyframes levitate {
          0% { transform: translateY(0px) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
          100% { transform: translateY(0px) translateX(-50%); }
        }
        .levitate-btn {
          animation: levitate 3s ease-in-out infinite;
        }
      `}</style>

      <main className="flex-1 px-6 pt-16 pb-48">
        <section className="mb-12 relative group">
          {/* Efeito de luz atrás do card principal */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75 opacity-50 group-hover:opacity-100 transition-opacity"></div>

          <div className="neon-border rounded-[2.5rem] p-4 bg-transparent relative flex flex-col items-center justify-center min-h-[240px] w-full overflow-hidden">
            <label className="absolute top-8 text-[10px] uppercase tracking-[0.5em] text-text-label font-semibold">PATRIMÔNIO TOTAL</label>
            <div className="flex flex-col items-center justify-center w-full px-2">
              <span className="text-off-white text-[11vw] xs:text-5xl font-display font-light tracking-tighter premium-text-glow leading-none text-center whitespace-nowrap">
                R$ {totalAssetsValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <div className="absolute bottom-8 flex items-center space-x-2">
                <span className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase neon-text-glow">+2.4% PERFORMANCE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 flex items-center justify-between">
          <div className="relative w-44 h-44 animate-pulse-neon">
            <div className="absolute inset-4 bg-primary/20 blur-[40px] rounded-full opacity-40"></div>
            <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
              <circle className="concentric-ring" cx="50" cy="50" r="45" stroke="#18181b" strokeWidth="1"></circle>
              <circle className="concentric-ring" cx="50" cy="50" r="38" stroke="#18181b" strokeWidth="1"></circle>
              <circle className="concentric-ring" cx="50" cy="50" r="31" stroke="#18181b" strokeWidth="1"></circle>
              <circle className="concentric-ring animate-draw ring-1" cx="50" cy="50" r="45" stroke="#0FB67F" strokeWidth="2.5" style={{ "--final-offset": 80 } as any}></circle>
              <circle className="concentric-ring animate-draw ring-2" cx="50" cy="50" opacity="0.7" r="38" stroke="#0FB67F" strokeWidth="2.5" style={{ "--final-offset": 100 } as any}></circle>
              <circle className="concentric-ring animate-draw ring-3" cx="50" cy="50" opacity="0.4" r="31" stroke="#0FB67F" strokeWidth="2.5" style={{ "--final-offset": 120 } as any}></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-[0.2em]">Ativos</span>
              <span className="text-2xl font-display font-light text-white">{assets.length}</span>
            </div>
          </div>
          <div className="flex-1 ml-10 space-y-5">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-text-label font-bold">DISTRIBUIÇÃO</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[12px] tracking-widest">
                <span className="text-text-label">RENDA FIXA</span>
                <span className="font-bold text-off-white">{distFixed}%</span>
              </div>
              <div className="flex items-center justify-between text-[12px] tracking-widest">
                <span className="text-text-label">RENDA VAR.</span>
                <span className="font-bold text-off-white">{distVar}%</span>
              </div>
              <div className="flex items-center justify-between text-[12px] tracking-widest">
                <span className="text-text-label">CRIPTO</span>
                <span className="font-bold text-off-white">{distCripto}%</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-display font-bold tracking-[0.3em] text-off-white uppercase">MEUS ATIVOS</h2>
            <div className="h-[1px] flex-1 mx-6 bg-zinc-900"></div>
            <button className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">VER TUDO</button>
          </div>
          <div className="space-y-4">
            {assets.length > 0 ? (
              assets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => navigate('/asset-details', { state: { asset } })}
                  className="neon-border rounded-2xl p-6 flex items-center justify-between bg-transparent cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center space-x-5">
                    <div className="w-11 h-11 border border-zinc-800 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-off-white text-xl">{asset.icon || 'currency_bitcoin'}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold font-display tracking-widest text-off-white">{asset.ticker || 'ATIVO'}</p>
                      <p className="text-[9px] text-text-label font-medium uppercase tracking-widest mt-0.5">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">R$ {Number(asset.current_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <p className={`text-[10px] font-bold tracking-widest neon-text-glow mt-0.5 ${asset.change_percentage >= 0 ? 'text-primary' : 'text-red-500'}`}>
                      {asset.change_percentage >= 0 ? '+' : ''}{asset.change_percentage}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center neon-border rounded-3xl p-8 bg-black/20">
                <p className="text-[9px] text-text-label uppercase tracking-widest mb-4">Seu portfólio está vazio</p>
                <button
                  onClick={() => navigate('/new-investment')}
                  className="bg-primary text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                  Adicionar Investimento
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Levitating Floating Button */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[150] levitate-btn">
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
