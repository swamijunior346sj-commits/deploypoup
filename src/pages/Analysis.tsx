import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-[#FCFCFC] font-sans flex flex-col min-h-screen selection:bg-primary/30 overflow-x-hidden antialiased">
      <main className="flex-1 px-6 pt-16 pb-12">
        <section className="mb-12 relative group">
          {/* Efeito de luz atrás do card principal */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-75 opacity-50 group-hover:opacity-100 transition-opacity"></div>

          <div className="neon-border rounded-[2.5rem] p-4 bg-black/40 backdrop-blur-sm relative flex flex-col items-center justify-center min-h-[240px] w-full overflow-hidden">
            <label className="absolute top-10 text-[10px] uppercase tracking-[0.5em] text-[#71717A] font-bold">PATRIMÔNIO TOTAL</label>
            <div className="flex flex-col items-center justify-center w-full px-2 mt-4">
              <span className="text-white text-[12vw] xs:text-6xl font-display font-light tracking-tighter premium-text-glow leading-none text-center whitespace-nowrap">
                R$ 45.320,00
              </span>
              <div className="flex items-center space-x-2 mt-10">
                <span className="text-primary text-[11px] font-bold tracking-[0.3em] uppercase neon-text-glow">+2.4% PERFORMANCE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 flex items-center justify-between">
          <div className="relative w-48 h-48 animate-pulse-neon">
            {/* Efeito de brilho circular atrás do gráfico */}
            <div className="absolute inset-4 bg-primary/20 blur-[40px] rounded-full opacity-40"></div>

            <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
              <circle className="concentric-ring" cx="50" cy="50" r="44" stroke="#18181b" strokeWidth="1.5"></circle>
              <circle className="concentric-ring" cx="50" cy="50" r="37" stroke="#18181b" strokeWidth="1.5"></circle>
              <circle className="concentric-ring" cx="50" cy="50" r="30" stroke="#18181b" strokeWidth="1.5"></circle>
              <circle className="concentric-ring animate-draw ring-1" cx="50" cy="50" r="44" stroke="#0FB67F" strokeWidth="3" style={{ "--final-offset": 80 } as any}></circle>
              <circle className="concentric-ring animate-draw ring-2" cx="50" cy="50" opacity="0.7" r="37" stroke="#0FB67F" strokeWidth="3" style={{ "--final-offset": 100 } as any}></circle>
              <circle className="concentric-ring animate-draw ring-3" cx="50" cy="50" opacity="0.4" r="30" stroke="#0FB67F" strokeWidth="3" style={{ "--final-offset": 120 } as any}></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-[0.3em]">Ativos</span>
              <span className="text-3xl font-display font-light text-white">12</span>
            </div>
          </div>
          <div className="flex-1 ml-8 space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#71717A] font-black">DISTRIBUIÇÃO</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between text-[13px] tracking-[0.1em] font-medium">
                <span className="text-[#71717A]">RENDA FIXA</span>
                <span className="font-bold text-white">33%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] tracking-[0.1em] font-medium">
                <span className="text-[#71717A]">RENDA VAR.</span>
                <span className="font-bold text-white">28%</span>
              </div>
              <div className="flex items-center justify-between text-[13px] tracking-[0.1em] font-medium">
                <span className="text-[#71717A]">CRIPTO</span>
                <span className="font-bold text-white">39%</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[10px] font-display font-bold tracking-[0.4em] text-white uppercase">MEUS ATIVOS</h2>
            <div className="h-[1px] flex-1 mx-6 bg-zinc-900/50"></div>
            <button className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.3em] hover:text-primary transition-colors">VER TUDO</button>
          </div>
          <div className="space-y-5">
            {[
              { ticker: 'BTC', name: 'BITCOIN NETWORK', value: 'R$ 9.120,00', change: '+12.4%', icon: 'currency_bitcoin' },
              { ticker: 'ITUB4', name: 'ITAÚ UNIBANCO', value: 'R$ 5.430,20', change: '+3.2%', icon: 'account_balance' },
              { ticker: 'SELIC 2029', name: 'TESOURO DIRETO', value: 'R$ 15.200,00', change: '0.0%', icon: 'receipt_long' }
            ].map((asset, i) => (
              <div
                key={i}
                onClick={() => navigate('/asset-details', { state: { asset } })}
                className="relative group cursor-pointer"
              >
                {/* Brilho atrás de cada card da lista */}
                <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="neon-border rounded-2xl p-7 flex items-center justify-between bg-black/40 backdrop-blur-sm relative active:scale-[0.98] transition-all">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center bg-black">
                      <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">{asset.icon}</span>
                    </div>
                    <div>
                      <p className="text-[15px] font-bold font-display tracking-[0.1em] text-white">{asset.ticker}</p>
                      <p className="text-[10px] text-[#71717A] font-bold uppercase tracking-[0.2em] mt-1">{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white tracking-wide">{asset.value}</p>
                    <p className={`text-[11px] font-black tracking-widest mt-1.5 ${asset.change.includes('+') ? 'text-primary neon-text-glow' : 'text-[#71717A]'}`}>
                      {asset.change}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
