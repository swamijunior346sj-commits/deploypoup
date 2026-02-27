import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddGoalValue() {
    const navigate = useNavigate();
    const location = useLocation();
    const goal = location.state?.goal || { name: 'Viagem Europa', current: 9750, percentage: 65 };
    const [amount, setAmount] = useState('0,00');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleConfirm = () => {
        setShowSuccess(true);
    };

    return (
        <div className="bg-black text-[#fcfcfc] font-sans h-screen flex flex-col overflow-hidden relative">
            <header className="px-6 pt-14 pb-4 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur-xl z-50">
                <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-start active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-[#fcfcfc]">arrow_back_ios</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.3em] uppercase text-[#fcfcfc]">Adicionar Valor</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow flex flex-col px-6">
                <div className="flex flex-col items-center justify-center py-12">
                    <span className="text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase mb-2 text-center">Quanto deseja aportar?</span>
                    <div className="relative w-full">
                        <input
                            className="bg-transparent border-none text-center text-5xl font-display font-bold text-primary drop-shadow-[0_0_15px_rgba(15,182,127,0.6)] focus:ring-0 focus:outline-none w-full"
                            type="text"
                            value={`R$ ${amount}`}
                            onChange={(e) => setAmount(e.target.value.replace('R$ ', ''))}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase ml-1">Meta de Destino</label>
                    <div className="bg-[#121212] p-5 rounded-[24px] flex items-center justify-between border border-white/5 active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-4">
                            <div
                                className="circular-progress-small"
                                style={{ '--percentage': goal.percentage } as any}
                            >
                                <span className="text-[10px] font-bold text-[#fcfcfc]">{goal.percentage}%</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#fcfcfc]">{goal.name}</h3>
                                <p className="text-[10px] text-[#a7a7a7] tracking-wide">Saldo: R$ {goal.current.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[#a7a7a7]">chevron_right</span>
                    </div>

                    <label className="text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase ml-1 block mt-6">Conta de Origem</label>
                    <div className="bg-[#121212] p-5 rounded-[24px] flex items-center justify-between border border-white/5 active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">account_balance</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#fcfcfc]">Minha Carteira</h3>
                                <p className="text-[10px] text-[#a7a7a7] tracking-wide">Disponível: R$ 1.200,50</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-[#a7a7a7]">unfold_more</span>
                    </div>
                </div>
            </main>

            <footer className="p-6 pb-10 flex flex-col items-center gap-6 z-10">
                <button
                    onClick={handleConfirm}
                    className="w-full py-5 bg-primary rounded-2xl text-black font-display font-bold text-xs tracking-widest uppercase shadow-[0_8px_30px_rgba(15,182,127,0.4)] active:scale-95 transition-transform"
                >
                    Confirmar Aporte
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[8px] font-display font-bold tracking-[0.4em] text-[#a7a7a7] opacity-50 uppercase">Powered by</span>
                    <span className="text-[9px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] opacity-80 uppercase mt-1">Poup Intelligence</span>
                </div>
            </footer>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full h-full max-w-[430px] flex flex-col items-center justify-center px-6">
                        <div className="w-full bg-[#121212] border border-primary/40 rounded-[2.5rem] p-8 shadow-[0_0_30px_rgba(15,182,127,0.15)] relative animate-in zoom-in slide-in-from-bottom-10 duration-500">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                <div className="relative flex items-center justify-center animate-float-icon">
                                    <div className="absolute inset-0 bg-primary blur-[25px] opacity-40 rounded-full"></div>
                                    <div className="relative bg-[#121212] p-5 rounded-full border-2 border-primary shadow-[0_10px_30px_rgba(15,182,127,0.4)]">
                                        <span className="material-symbols-outlined text-6xl text-primary font-bold">check_circle</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 text-center flex flex-col items-center">
                                <h4 className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-1 opacity-80">Sucesso no Investimento</h4>
                                <h2 className="text-white text-2xl font-black tracking-tight uppercase mb-6 italic font-display">Aporte Confirmado!</h2>

                                <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                                    <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                        <circle className="text-white/5" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="7"></circle>
                                        <circle className="text-primary animate-pulse-glow" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="282.7" strokeDashoffset="79.1" strokeLinecap="round" strokeWidth="7"></circle>
                                    </svg>
                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-extrabold text-white tracking-tighter font-display">72%</span>
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] animate-breathing mt-1">+7% HOJE</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                        Você investiu com sucesso <br />
                                        <span className="text-primary text-2xl font-black block mt-1 tracking-tight">R$ {amount}</span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    <div className="flex items-center gap-2 bg-[#121212] border border-primary/30 rounded-full px-4 py-2 shadow-inner">
                                        <span className="material-symbols-outlined text-lg text-primary">bolt</span>
                                        <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">+50 XP</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#121212] border border-primary/30 rounded-full px-4 py-2 shadow-inner">
                                        <span className="material-symbols-outlined text-lg text-primary">local_fire_department</span>
                                        <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Recorde de Streak!</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full bg-primary hover:bg-primary/90 text-black font-black py-5 rounded-2xl text-[11px] tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(15,182,127,0.3)] active:scale-[0.98] font-display"
                                >
                                    IR PARA O DASHBOARD
                                </button>
                            </div>
                        </div>

                        <div className="mt-12 opacity-30 flex flex-col items-center gap-2">
                            <span className="text-[9px] font-bold tracking-[0.4em] text-white">POWERED BY POUP INTELLIGENCE</span>
                            <div className="h-[2px] w-8 bg-primary rounded-full"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
