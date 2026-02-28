import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BudgetDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const budget = location.state?.budget || {
        name: 'Alimentação', type: 'Despesa', icon: 'restaurant', spent: 1250, target: 2000
    };

    const percentage = Math.min(Math.round((budget.spent / budget.target) * 100), 100);
    const remaining = budget.target - budget.spent;
    const strokeDashoffset = 282.7 - (282.7 * percentage / 100);
    const isExceeded = budget.spent > budget.target;
    const exceededPercent = isExceeded ? Math.round(((budget.spent - budget.target) / budget.target) * 100) : 0;
    const [showAlert, setShowAlert] = useState(isExceeded);

    const dailyFlow = [
        { day: 'SEG', height: 40 },
        { day: 'TER', height: 60 },
        { day: 'QUA', height: 45 },
        { day: 'QUI', height: 85 },
        { day: 'HOJE', height: 100, active: true },
        { day: 'SAB', height: 10 },
        { day: 'DOM', height: 10 },
    ];

    const transactions = [
        { name: 'Supermercado Silva', time: 'Hoje, 14:20', amount: '- R$ 342,90', icon: 'shopping_cart' },
        { name: 'Ifood Burguer', time: 'Ontem, 20:15', amount: '- R$ 89,90', icon: 'restaurant' },
        { name: 'Cafeteria Central', time: '22 de Mai, 09:30', amount: '- R$ 15,00', icon: 'local_cafe' },
    ];

    return (
        <div className="bg-black text-[#D6D6D6] font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.3em] text-[#FCFCFC] uppercase flex-1 text-center">
                    DETALHES DO ORÇAMENTO
                </h1>
                <button className="p-2 -mr-2 hover:bg-zinc-900/50 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">edit</span>
                </button>
            </header>

            <main className="flex-1 px-6 pb-40">
                {/* Progress Circle */}
                <section className="mt-4 bg-[#0D0E10] rounded-[32px] p-8 flex flex-col items-center border border-zinc-900/50">
                    <h2 className="text-[#FCFCFC] font-display font-bold text-lg mb-6">{budget.name}</h2>
                    <div className="relative w-48 h-48 rounded-full flex items-center justify-center p-4">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" fill="none" r="45" stroke="#1A1A1A" strokeWidth="8" />
                            <circle
                                cx="50" cy="50" fill="none" r="45"
                                stroke="#0FB67F"
                                strokeDasharray="282.7"
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                strokeWidth="8"
                                style={{ filter: 'drop-shadow(0 0 8px rgba(15,182,127,0.6))' }}
                            />
                        </svg>
                        <div className="text-center z-10">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1">Gasto</p>
                            <p className="text-3xl font-display font-bold text-[#FCFCFC]">R$ {budget.spent.toLocaleString('pt-BR')}</p>
                            <p className="text-[10px] font-medium text-zinc-500 mt-1">{percentage}% consumido</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-8 w-full border-t border-zinc-800/50 pt-6">
                        <div className="text-center">
                            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1">Resta</p>
                            <p className="text-[#FCFCFC] font-bold text-sm">R$ {remaining.toLocaleString('pt-BR')}</p>
                        </div>
                        <div className="text-center border-l border-zinc-800/50">
                            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1">Meta</p>
                            <p className="text-zinc-500 font-bold text-sm">R$ {budget.target.toLocaleString('pt-BR')}</p>
                        </div>
                    </div>
                </section>

                {/* Daily Flow Chart */}
                <section className="mt-10">
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-[10px] font-display font-bold tracking-[0.3em] text-[#FCFCFC] uppercase">FLUXO DIÁRIO</h3>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Últimos 7 dias</span>
                    </div>
                    <div className="h-32 flex items-end justify-between px-2 gap-2">
                        {dailyFlow.map((d) => (
                            <div key={d.day} className="flex flex-col items-center flex-1 gap-2">
                                <div
                                    className={`w-full rounded-t-sm ${d.active ? 'bg-primary' : d.height > 10 ? `bg-primary/${Math.min(d.height, 80)}` : 'bg-zinc-800/50'}`}
                                    style={{
                                        height: `${d.height}%`,
                                        ...(d.active ? { boxShadow: '0 0 20px rgba(15, 182, 127, 0.3)' } : {}),
                                    }}
                                ></div>
                                <span className={`text-[8px] font-bold ${d.active ? 'text-primary' : 'text-zinc-600'}`}>{d.day}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AI Insight */}
                <section className="mt-10">
                    <div className="bg-[#042017] border border-primary/30 rounded-2xl p-4 flex items-start gap-4">
                        <div className="bg-primary/20 p-2 rounded-lg mt-1">
                            <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-display font-bold tracking-widest text-primary uppercase mb-1">IA INSIGHT</h4>
                            <p className="text-xs text-[#FCFCFC]/90 leading-relaxed font-medium">
                                Cuidado! Você já consumiu {percentage}% do orçamento e ainda faltam 12 dias para o fim do mês.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Recent Transactions */}
                <section className="mt-10 space-y-4">
                    <h3 className="text-[10px] font-display font-bold tracking-[0.3em] text-[#FCFCFC] uppercase">ÚLTIMAS TRANSAÇÕES</h3>
                    {transactions.map((t, i) => (
                        <div key={i} className="bg-[#0D0E10] rounded-2xl p-4 flex items-center justify-between border border-zinc-900/50">
                            <div className="flex items-center gap-4">
                                <div className="bg-zinc-900 p-2 rounded-xl">
                                    <span className="material-symbols-outlined text-zinc-400 text-xl">{t.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#FCFCFC]">{t.name}</p>
                                    <p className="text-[10px] text-zinc-500 font-medium">{t.time}</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-[#FCFCFC]">{t.amount}</p>
                        </div>
                    ))}
                </section>

                {/* Footer */}
                <footer className="mt-16 mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2 opacity-30">
                        <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                        <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#FCFCFC]">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>

            {/* Budget Exceeded Alert */}
            {showAlert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/80 backdrop-blur-[2px]">
                    <div className="w-full max-w-sm bg-[#0D0E10] border border-zinc-800 rounded-[32px] p-8 relative overflow-hidden" style={{ boxShadow: '0 0 25px rgba(15, 182, 127, 0.4)' }}>
                        {/* Animated Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-primary/10 p-4 rounded-full" style={{ animation: 'pulse 2s infinite ease-in-out' }}>
                                <span className="material-symbols-outlined text-primary text-4xl">auto_awesome</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="text-center space-y-3 mb-8">
                            <h2 className="text-[#FCFCFC] font-display font-bold text-base tracking-[0.2em] uppercase">ALERTA DE ORÇAMENTO</h2>
                            <p className="text-sm text-[#D6D6D6] leading-relaxed font-medium">
                                Detectamos que você excedeu seu limite mensal de <span className="text-[#FCFCFC] font-bold">{budget.name}</span> em <span className="text-primary font-bold">{exceededPercent}%</span>.
                            </p>
                        </div>

                        {/* Spending Details */}
                        <div className="bg-zinc-900/50 rounded-2xl p-5 mb-8 border border-zinc-800/50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Gasto Atual</span>
                                <span className="text-primary font-display font-bold text-base">R$ {budget.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-full"></div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Limite</span>
                                <span className="text-[#FCFCFC] font-medium text-sm">R$ {budget.target.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { setShowAlert(false); navigate('/budgets'); }}
                                className="w-full bg-primary hover:bg-primary/90 text-black font-display font-bold text-xs py-5 rounded-2xl transition-all active:scale-95 tracking-[0.1em]"
                            >
                                AJUSTAR PLANEJAMENTO
                            </button>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="w-full bg-transparent border border-zinc-800 hover:bg-zinc-800/30 text-[#D6D6D6] font-display font-bold text-[10px] py-4 rounded-2xl transition-all active:scale-95 tracking-[0.2em]"
                            >
                                FECHAR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
