import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AssetDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const asset = location.state?.asset || {
        ticker: 'BTC',
        name: 'Bitcoin',
        value: 'R$ 9.120,00',
        change: '+12.4%',
        icon: 'currency_bitcoin',
        iconColor: 'text-orange-500',
    };

    const [timePeriod, setTimePeriod] = useState('1M');
    const periods = ['1D', '1W', '1M', '1Y', 'ALL'];

    const movements = [
        { type: 'Compra Efetuada', date: '12 de Out, 2023', amount: '+0.005 BTC', value: 'R$ 1.622,00' },
        { type: 'Compra Efetuada', date: '05 de Out, 2023', amount: '+0.020 BTC', value: 'R$ 6.490,00' },
    ];

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.25em] text-white uppercase flex-1 text-center pr-8">
                    {asset.ticker} ({asset.name})
                </h1>
            </header>

            <main className="flex-1 px-6 pb-32">
                {/* Balance Card */}
                <section className="mt-4 mb-6">
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
                        <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3 block">SALDO ATUAL</label>
                        <div className="flex flex-col">
                            <span className="text-white text-4xl font-display font-bold mb-2">{asset.value}</span>
                            <div className="flex items-center space-x-2 bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
                                <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                                <span className="text-primary text-xs font-bold tracking-tight">{asset.change} no total</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chart with Period Selector */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-6 bg-zinc-900/40 p-1 rounded-xl border border-zinc-800">
                        {periods.map((p) => (
                            <button
                                key={p}
                                onClick={() => setTimePeriod(p)}
                                className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${timePeriod === p ? 'text-primary bg-zinc-800 rounded-lg' : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="h-48 w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                            <defs>
                                <linearGradient id="chartFade" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,120 Q50,110 80,130 T150,80 T220,90 T300,40 T400,20 L400,150 L0,150 Z" fill="url(#chartFade)" />
                            <path
                                d="M0,120 Q50,110 80,130 T150,80 T220,90 T300,40 T400,20"
                                fill="none"
                                stroke="#10B981"
                                strokeLinecap="round"
                                strokeWidth="3"
                                style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' }}
                            />
                            <circle cx="400" cy="20" fill="#10B981" r="4" style={{ filter: 'drop-shadow(0 0 6px rgba(16,185,129,0.6))' }} />
                        </svg>
                        <div className="flex justify-between mt-4 text-[10px] text-zinc-600 font-bold tracking-widest uppercase">
                            <span>01 OUT</span>
                            <span>15 OUT</span>
                            <span>HOJE</span>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="grid grid-cols-1 gap-3 mb-10">
                    <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Preço Médio</p>
                            <p className="text-lg font-bold font-display">R$ 324.510,00</p>
                        </div>
                        <span className="material-symbols-outlined text-zinc-700">payments</span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Quantidade</p>
                            <p className="text-lg font-bold font-display">0.025 BTC</p>
                        </div>
                        <span className="material-symbols-outlined text-zinc-700">database</span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-5 flex items-center justify-between border-l-4 border-l-primary">
                        <div>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Total em Juros/Lucro</p>
                            <p className="text-lg font-bold font-display text-primary" style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}>+ R$ 1.130,80</p>
                        </div>
                        <span className="material-symbols-outlined text-primary">add_chart</span>
                    </div>
                </section>

                {/* Movements */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-display font-bold tracking-[0.2em] text-white uppercase">ÚLTIMAS MOVIMENTAÇÕES</h2>
                    </div>
                    <div className="space-y-4">
                        {movements.map((mov, i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-zinc-900">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-xl">call_made</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{mov.type}</p>
                                        <p className="text-[10px] text-zinc-500">{mov.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{mov.amount}</p>
                                    <p className="text-[10px] text-zinc-500">{mov.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-16 mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2 opacity-30">
                        <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                        <p className="text-[8px] font-bold tracking-[0.4em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
