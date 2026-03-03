import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export default function AssetDetails() {
    const navigate = useNavigate();
    const location = useLocation();

    // Fallback data if no state is passed
    const asset = location.state?.asset || {
        ticker: 'BTC',
        name: 'Bitcoin',
        value: 'R$ 9.120,00',
        change: '+12.4%',
        icon: 'currency_bitcoin'
    };

    return (
        <div className="bg-black text-[#FCFCFC] font-sans flex flex-col min-h-screen selection:bg-primary/30 overflow-x-hidden antialiased">
            <header className="pt-16 pb-6 px-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-30">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:opacity-70 transition-opacity active:scale-95"
                >
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-[10px] font-display font-semibold tracking-[0.4em] text-white/80 uppercase flex-1 text-center pr-8">
                    {asset.ticker} ({asset.name})
                </h1>
            </header>

            <main className="flex-1 px-8 pb-12">
                <section className="mt-4 mb-10">
                    <div className="border-luxury rounded-[2rem] p-8 glow-primary relative overflow-hidden bg-transparent">
                        <label className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold mb-4 block">SALDO ATUAL</label>
                        <div className="flex flex-col">
                            <span className="text-white text-4xl font-display font-light tracking-tight mb-3">{asset.value}</span>
                            <div className="flex items-center space-x-2">
                                <span className="material-symbols-outlined text-primary text-sm font-bold">trending_up</span>
                                <span className="text-primary text-[11px] font-bold tracking-[0.1em] uppercase">{asset.change} PERFORMANCE</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 mb-12">
                    <div className="border-luxury rounded-2xl p-6 flex items-center justify-between bg-transparent transition-all active:scale-[0.98]">
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em] mb-2">Preço Médio</p>
                            <p className="text-lg font-medium font-display tracking-tight text-white">R$ 324.510,00</p>
                        </div>
                        <span className="material-symbols-outlined text-primary/40 text-2xl">payments</span>
                    </div>
                    <div className="border-luxury rounded-2xl p-6 flex items-center justify-between bg-transparent transition-all active:scale-[0.98]">
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em] mb-2">Quantidade</p>
                            <p className="text-lg font-medium font-display tracking-tight text-white">0.025 BTC</p>
                        </div>
                        <span className="material-symbols-outlined text-primary/40 text-2xl">database</span>
                    </div>
                    <div className="border-luxury rounded-2xl p-6 flex items-center justify-between bg-transparent transition-all active:scale-[0.98]">
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em] mb-2">Juros/Lucro</p>
                            <p className="text-lg font-semibold font-display tracking-tight text-primary text-neon-green">+ R$ 1.130,80</p>
                        </div>
                        <span className="material-symbols-outlined text-primary text-2xl">add_chart</span>
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[10px] font-display font-semibold tracking-[0.3em] text-white/70 uppercase">MOVIMENTAÇÕES</h2>
                        <span className="text-[8px] text-primary tracking-[0.2em] font-bold uppercase px-2 py-1 border border-primary/30 rounded">HISTORY</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            { type: 'Compra Efetuada', date: '12 de Out, 2023', amount: '+0.005 BTC', value: 'R$ 1.622,00' },
                            { type: 'Compra Efetuada', date: '05 de Out, 2023', amount: '+0.020 BTC', value: 'R$ 6.490,00' }
                        ].map((mov, i) => (
                            <div key={i} className="flex items-center justify-between border-luxury rounded-2xl p-5 bg-transparent">
                                <div className="flex items-center space-x-5">
                                    <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-xl">call_made</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium tracking-wide text-white">{mov.type}</p>
                                        <p className="text-[9px] text-white/30 tracking-widest uppercase mt-1">{mov.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-primary">{mov.amount}</p>
                                    <p className="text-[9px] text-white/30 font-medium mt-1 tracking-wider">{mov.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-20 mb-12 flex flex-col items-center">
                    <div className="flex items-center space-x-3 opacity-20">
                        <span className="material-symbols-outlined !text-[12px] text-white">verified_user</span>
                        <p className="text-[8px] font-bold tracking-[0.5em] uppercase text-white">
                            POUP INTELLIGENCE LUXURY DIVISION
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
