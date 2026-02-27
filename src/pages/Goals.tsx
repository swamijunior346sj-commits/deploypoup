import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Goal {
    id: string;
    name: string;
    target: number;
    current: number;
    date: string;
    percentage: number;
    icon?: string;
}

export default function Goals() {
    const navigate = useNavigate();
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const goals: Goal[] = [
        { id: '1', name: 'Viagem Europa', target: 15000, current: 9750, date: 'Agosto 2024', percentage: 65 },
        { id: '2', name: 'Reserva Emergência', target: 20000, current: 16000, date: 'Dezembro 2024', percentage: 80 },
        { id: '3', name: 'MacBook Pro', target: 12000, current: 2400, date: 'Outubro 2024', percentage: 20 },
        { id: '4', name: 'Aposentadoria', target: 100000, current: 45000, date: 'Janeiro 2030', percentage: 45 },
        { id: '5', name: 'Carro Novo', target: 89000, current: 10600, date: 'Junho 2025', percentage: 12 },
    ];

    return (
        <div className="bg-black text-[#fcfcfc] font-sans flex flex-col min-h-screen">
            <header className="px-6 pt-14 pb-4 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur-xl z-50">
                <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-start active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[#a7a7a7]">arrow_back_ios</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.3em] uppercase text-[#fcfcfc]">Minhas Metas</h1>
                <button className="w-8 h-8 flex items-center justify-end active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-primary">add</span>
                </button>
            </header>

            <main className="flex-grow px-6 pt-8 pb-32">
                <div className="grid grid-cols-2 gap-x-4 gap-y-12">
                    {goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform"
                            onClick={() => setSelectedGoal(goal)}
                        >
                            <div
                                className="circular-progress"
                                style={{ '--percentage': goal.percentage } as any}
                            >
                                <div className="shimmer-layer"></div>
                                <span className="text-xl font-display font-bold text-[#fcfcfc] animate-breathing inline-block">
                                    {goal.percentage}%
                                </span>
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-sm font-semibold text-[#fcfcfc] tracking-tight">{goal.name}</h3>
                                <p className="text-[10px] text-[#a7a7a7] uppercase tracking-widest mt-1">
                                    Faltam R$ {(goal.target - goal.current).toLocaleString('pt-BR')}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col items-center">
                        <div className="relative w-[120px] h-[120px] flex items-center justify-center group cursor-pointer">
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary animate-slow-rotate opacity-60"></div>
                            <button className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center bg-[#222426]/50 group-hover:bg-primary/20 transition-all border border-white/5 active:scale-90	">
                                <span className="material-symbols-outlined text-primary text-3xl">add</span>
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-sm font-semibold text-[#d6d6d6] tracking-tight">Nova Meta</h3>
                            <p className="text-[10px] text-[#a7a7a7] uppercase tracking-widest mt-1">Adicionar</p>
                        </div>
                    </div>
                </div>

                <footer className="mt-20 mb-8">
                    <div className="flex items-center justify-center space-x-2 text-[#096d4b]">
                        <span className="material-symbols-outlined text-xs">qr_code_2</span>
                        <p className="text-[8px] font-bold tracking-[0.3em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>

            {/* Details Modal */}
            {selectedGoal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-6 transition-opacity duration-300">
                    <div
                        className="w-full max-w-[340px] bg-[#121212] rounded-[32px] overflow-hidden shadow-2xl border border-white/5 animate-in fade-in zoom-in duration-300"
                    >
                        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
                            <h2 className="text-[10px] font-display font-bold tracking-[0.25em] text-[#a7a7a7] uppercase">Detalhes da Meta</h2>
                            <button
                                onClick={() => setSelectedGoal(null)}
                                className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full active:scale-90 transition-transform"
                            >
                                <span className="material-symbols-outlined text-[#a7a7a7] text-lg">close</span>
                            </button>
                        </div>

                        <div className="flex flex-col items-center py-6">
                            <div
                                className="circular-progress-large relative group"
                                style={{ '--percentage': selectedGoal.percentage } as any}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl font-display font-bold text-[#fcfcfc] drop-shadow-[0_0_8px_#0fb67f] animate-pulse-glow">
                                        {selectedGoal.percentage}%
                                    </span>
                                    <span className="text-[10px] text-primary font-bold tracking-widest uppercase">Completo</span>
                                </div>
                            </div>
                            <h3 className="mt-6 text-xl font-display font-bold text-[#fcfcfc]">{selectedGoal.name}</h3>
                        </div>

                        <div className="px-8 space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-xs text-[#a7a7a7]">Saldo Acumulado</span>
                                <span className="text-sm font-bold text-[#fcfcfc]">R$ {selectedGoal.current.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-xs text-[#a7a7a7]">Valor Restante</span>
                                <span className="text-sm font-bold text-primary">R$ {(selectedGoal.target - selectedGoal.current).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                <span className="text-xs text-[#a7a7a7]">Data Estimada</span>
                                <span className="text-sm font-bold text-[#fcfcfc]">{selectedGoal.date}</span>
                            </div>
                        </div>

                        <div className="mx-6 mt-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex gap-3">
                            <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                            <p className="text-[11px] leading-relaxed text-[#d6d6d6]">
                                <span className="font-bold text-primary">IA Insight:</span> Você está no caminho certo! Economize R$ 100 a mais este mês para antecipar em 15 dias.
                            </p>
                        </div>

                        <div className="p-6 flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/add-goal-value', { state: { goal: selectedGoal } })}
                                className="w-full py-4 bg-primary rounded-2xl text-black font-display font-bold text-xs tracking-widest uppercase shadow-[0_4px_20px_rgba(15,182,127,0.3)] active:scale-95 transition-transform"
                            >
                                Adicionar Valor
                            </button>
                            <button
                                onClick={() => navigate('/edit-goal', { state: { goal: selectedGoal } })}
                                className="w-full py-4 border border-[#a7a7a7]/30 rounded-2xl text-[#a7a7a7] font-display font-bold text-xs tracking-widest uppercase active:scale-95 transition-transform"
                            >
                                Editar Meta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
