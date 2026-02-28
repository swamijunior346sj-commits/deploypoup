import { useNavigate } from 'react-router-dom';

export default function InvestmentPortfolio() {
    const navigate = useNavigate();

    const categories = [
        { name: 'Renda Fixa', value: 'R$ 15.200,00' },
        { name: 'Renda Variável', value: 'R$ 12.450,00' },
        { name: 'Cripto', value: 'R$ 9.120,00' },
        { name: 'FIIs', value: 'R$ 8.550,00' },
    ];

    const assets = [
        { ticker: 'BTC', name: 'Bitcoin', value: 'R$ 9.120,00', change: '+12.4%', icon: 'currency_bitcoin', iconColor: 'text-orange-500', positive: true },
        { ticker: 'ITUB4', name: 'Itaú Unibanco', value: 'R$ 5.430,20', change: '+3.2%', icon: 'account_balance', iconColor: 'text-blue-400', positive: true },
        { ticker: 'SELIC 2029', name: 'Tesouro Direto', value: 'R$ 15.200,00', change: '0.0%', icon: 'receipt_long', iconColor: 'text-zinc-400', positive: false },
        { ticker: 'HGLG11', name: 'Logística FII', value: 'R$ 8.550,00', change: '+1.8%', icon: 'apartment', iconColor: 'text-purple-400', positive: true },
    ];

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.25em] text-white uppercase flex-1 text-center pr-8">
                    CARTEIRA DE INVESTIMENTOS
                </h1>
            </header>

            <main className="flex-1 px-6 pb-32">
                {/* Patrimônio Total */}
                <section className="mt-4 mb-8">
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
                        <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3 block">PATRIMÔNIO TOTAL</label>
                        <div className="flex flex-col">
                            <span className="text-primary text-4xl font-display font-bold mb-2" style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}>R$ 45.320,00</span>
                            <div className="flex items-center space-x-2 bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
                                <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                                <span className="text-primary text-xs font-bold tracking-tight">+2.4% este mês</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Scroll */}
                <section className="mb-10 -mx-6 px-6">
                    <div className="flex overflow-x-auto space-x-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {categories.map((cat) => (
                            <div key={cat.name} className="flex-shrink-0 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 min-w-[140px]">
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">{cat.name}</p>
                                <p className="text-sm font-bold font-display">{cat.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Allocation Chart */}
                <section className="mb-12 flex items-center justify-between">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#18181b" strokeWidth="12" />
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10B981" strokeDasharray="251.2" strokeDashoffset="100" strokeWidth="12" />
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#059669" strokeDasharray="251.2" strokeDashoffset="180" strokeWidth="12" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Ativos</span>
                            <span className="text-sm font-bold">12</span>
                        </div>
                    </div>
                    <div className="flex-1 ml-8 space-y-2">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">ALOCAÇÃO</h3>
                        <div className="flex items-center text-xs">
                            <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                            <span className="text-zinc-400">Renda Fixa</span>
                            <span className="ml-auto font-bold">33%</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></div>
                            <span className="text-zinc-400">Renda Var.</span>
                            <span className="ml-auto font-bold">28%</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-2 h-2 rounded-full bg-zinc-700 mr-2"></div>
                            <span className="text-zinc-400">Outros</span>
                            <span className="ml-auto font-bold">39%</span>
                        </div>
                    </div>
                </section>

                {/* Assets List */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-display font-bold tracking-[0.2em] text-white uppercase">MEUS ATIVOS</h2>
                        <button className="text-[10px] text-primary font-bold uppercase tracking-widest">Ver Todos</button>
                    </div>
                    <div className="space-y-3">
                        {assets.map((asset) => (
                            <div
                                key={asset.ticker}
                                onClick={() => navigate('/asset-details', { state: { asset } })}
                                className="bg-zinc-900/60 border border-zinc-800/50 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform hover:bg-zinc-900/80">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                                        <span className={`material-symbols-outlined ${asset.iconColor}`}>{asset.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold font-display">{asset.ticker}</p>
                                        <p className="text-[10px] text-zinc-500 font-medium">{asset.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">{asset.value}</p>
                                    <p className={`text-[10px] font-bold ${asset.positive ? 'text-primary' : 'text-white'}`} style={asset.positive ? { textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' } : {}}>
                                        {asset.change}
                                    </p>
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

            {/* Floating Add Button */}
            <button
                onClick={() => navigate('/new-investment')}
                className="fixed right-6 bottom-24 w-14 h-14 bg-primary rounded-full flex items-center justify-center z-[60] active:scale-95 transition-transform animate-float-icon"
                style={{ boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)' }}
            >
                <span className="material-symbols-outlined text-black font-bold text-3xl">add</span>
            </button>
        </div>
    );
}
