import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpendingAnalysis() {
    const navigate = useNavigate();
    const [activePeriod, setActivePeriod] = useState('1M');
    const periods = ['1M', '3M', '6M', '1Y'];

    const categories = [
        { name: 'Alimentação', sub: 'Restaurantes e Delivery', amount: 'R$ 1.250,00', percent: '36.2%', color: 'bg-primary', textColor: 'text-primary' },
        { name: 'Moradia', sub: 'Aluguel e Contas', amount: 'R$ 1.800,00', percent: '52.1%', color: 'bg-blue-500', textColor: 'text-blue-500' },
        { name: 'Lazer', sub: 'Eventos e Hobbies', amount: 'R$ 400,00', percent: '11.7%', color: 'bg-purple-500', textColor: 'text-purple-500' },
    ];

    const monthlyFlow = [
        { month: 'SET', height: 60, active: false },
        { month: 'OUT', height: 85, active: false },
        { month: 'NOV', height: 70, active: false },
        { month: 'DEZ', height: 100, active: true },
    ];

    const topExpenses = [
        { name: 'Supermercado Premium', date: '12 DEZ, 2023', amount: 'R$ 890,50', icon: 'shopping_bag' },
        { name: 'Aluguel Apartamento', date: '05 DEZ, 2023', amount: 'R$ 1.200,00', icon: 'home' },
    ];

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-sm font-display font-bold tracking-[0.25em] text-white uppercase flex-1 text-center pr-8">
                    ANÁLISE DE GASTOS
                </h1>
            </header>

            <main className="flex-1 px-6 pb-32">
                {/* Period Selector */}
                <div className="flex justify-between items-center bg-zinc-900/40 p-1 rounded-2xl mb-8 border border-zinc-800/50">
                    {periods.map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePeriod(p)}
                            className={`flex-1 py-2 text-[10px] font-bold tracking-widest transition-all ${activePeriod === p
                                    ? 'bg-primary text-black rounded-xl'
                                    : 'text-zinc-500 hover:text-white'
                                }`}
                            style={activePeriod === p ? { boxShadow: '0 0 25px rgba(16,185,129,0.4)' } : {}}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                {/* Donut Chart */}
                <div className="relative flex flex-col items-center justify-center py-4 mb-10">
                    <div className="relative w-64 h-64">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#18181b" strokeWidth="8" />
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3B82F6" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="8" className="transition-all duration-300" />
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10B981" strokeDasharray="251.2" strokeDashoffset="188.4" strokeWidth="8" className="transition-all duration-300" />
                            <circle cx="50" cy="50" fill="transparent" r="40" stroke="#A855F7" strokeDasharray="251.2" strokeDashoffset="230" strokeWidth="8" className="transition-all duration-300" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Total Gasto</span>
                            <span className="text-2xl font-display font-bold text-white mt-1">R$ 3.450,00</span>
                            <span className="text-[10px] font-medium text-primary mt-1">+12% vs mês ant.</span>
                        </div>
                    </div>
                    <div className="absolute w-40 h-40 bg-primary/10 rounded-full blur-[60px] -z-10"></div>
                </div>

                {/* Categories */}
                <div className="mb-10">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4 px-2">CATEGORIAS</h2>
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <div key={cat.name} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-2 h-8 ${cat.color} rounded-full`}></div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{cat.name}</p>
                                        <p className="text-[10px] text-zinc-500 font-medium">{cat.sub}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white">{cat.amount}</p>
                                    <p className={`text-[10px] ${cat.textColor} font-bold`}>{cat.percent}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Flow */}
                <div className="mb-10">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4 px-2">FLUXO MENSAL</h2>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6">
                        <div className="flex items-end justify-between h-32 space-x-2">
                            {monthlyFlow.map((bar) => (
                                <div key={bar.month} className="flex flex-col items-center flex-1 space-y-2">
                                    <div
                                        className={`w-full rounded-t-lg ${bar.active ? 'bg-primary/80' : 'bg-zinc-800'}`}
                                        style={{
                                            height: `${bar.height}%`,
                                            ...(bar.active ? { boxShadow: '0 0 25px rgba(16,185,129,0.4)' } : {}),
                                        }}
                                    ></div>
                                    <span className={`text-[8px] font-bold ${bar.active ? 'text-primary' : 'text-zinc-500'}`}>{bar.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Expenses */}
                <div className="mb-12">
                    <h2 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-4 px-2">MAIORES DESPESAS</h2>
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl divide-y divide-zinc-800 overflow-hidden">
                        {topExpenses.map((exp) => (
                            <div key={exp.name} className="p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-lg">{exp.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white uppercase">{exp.name}</p>
                                        <p className="text-[10px] text-zinc-500 font-medium">{exp.date}</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-white">{exp.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-8 mb-4 flex flex-col items-center">
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
