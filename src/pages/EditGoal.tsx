import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditGoal() {
    const navigate = useNavigate();
    const location = useLocation();
    const goal = location.state?.goal || { name: 'Viagem Europa', current: 9750, target: 15000, date: '30 / 08 / 2024' };

    const [name, setName] = useState(goal.name);
    const [target, setTarget] = useState(goal.target.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
    const [date, setDate] = useState(goal.date);
    const [selectedIcon, setSelectedIcon] = useState('flight_takeoff');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const icons = [
        'directions_car',
        'flight_takeoff',
        'home',
        'laptop_mac',
        'school'
    ];

    return (
        <div className={`bg-black text-[#fcfcfc] font-sans min-h-screen flex flex-col ${showDeleteConfirm ? 'overflow-hidden' : ''}`}>
            <header className="px-6 pt-14 pb-4 flex items-center sticky top-0 bg-black/95 backdrop-blur-xl z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-start -ml-2 active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-[#fcfcfc] text-2xl">arrow_back_ios</span>
                </button>
                <h1 className="flex-grow text-center text-xs font-display font-bold tracking-[0.3em] uppercase text-[#fcfcfc] pr-8">Editar Meta</h1>
            </header>

            <main className="flex-grow px-6 pt-6 pb-40 space-y-6">
                {/* Name and Icon Section */}
                <div className="bg-[#121212] rounded-[32px] p-6 border border-white/5">
                    <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase mb-4">Nome da Meta</label>
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="w-14 h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-primary text-3xl">{selectedIcon}</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#121212]">
                                <span className="material-symbols-outlined text-black text-[12px] font-bold">edit</span>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-xl font-display font-bold text-[#fcfcfc] p-0"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="h-[1px] w-full bg-white/10 mt-1"></div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-[10px] font-display font-bold tracking-[0.1em] text-[#a7a7a7] uppercase mb-4">Selecione um Ícone</p>
                        <div className="flex justify-between">
                            {icons.map((icon) => (
                                <button
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center active:scale-90 transition-all ${selectedIcon === icon
                                        ? 'bg-primary/20 border border-primary/40 text-primary'
                                        : 'bg-white/5 text-[#a7a7a7]'
                                        }`}
                                >
                                    <span className="material-symbols-outlined">{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Financial Details Section */}
                <div className="bg-[#121212] rounded-[32px] p-6 border border-white/5 space-y-8">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase">Valor Total</label>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-display font-bold text-primary">R$</span>
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 text-4xl font-display font-bold text-primary p-0 placeholder-primary/30"
                                type="text"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase">Data Limite</label>
                            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-2xl p-4 border border-white/10 focus-within:border-primary/50 focus-within:shadow-[0_0_10px_rgba(15,182,127,0.2)] transition-all">
                                <span className="material-symbols-outlined text-[#a7a7a7]">calendar_today</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-[#fcfcfc] w-full p-0"
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-display font-bold tracking-[0.2em] text-[#a7a7a7] uppercase">Aporte Mensal Sugerido</label>
                            <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 opacity-70">
                                <span className="material-symbols-outlined text-[#a7a7a7]">payments</span>
                                <span className="text-sm font-semibold text-[#fcfcfc] italic">R$ 875,00 / mês</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-white/5 px-6 pt-6 pb-10 space-y-4 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-full py-5 bg-primary rounded-2xl text-black font-display font-bold text-xs tracking-[0.2em] uppercase shadow-[0_4px_25px_rgba(15,182,127,0.4)] active:scale-[0.98] transition-transform"
                >
                    Salvar Alterações
                </button>
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full py-5 border border-white/10 rounded-2xl text-red-500 font-display font-bold text-xs tracking-[0.2em] uppercase active:bg-red-500/5 transition-colors"
                >
                    Excluir Meta
                </button>
            </footer>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex flex-col items-center justify-center p-8">
                    <div className="w-full max-w-[320px] bg-[#0A0A0A] border-2 border-primary/50 rounded-[40px] p-10 flex flex-col items-center" style={{ boxShadow: '0 0 15px rgba(16, 185, 129, 0.4), inset 0 0 5px rgba(16, 185, 129, 0.2)' }}>
                        <h2 className="text-sm font-display font-bold text-white tracking-[0.25em] mb-12 text-center uppercase">CONFIRMAR EXCLUSÃO?</h2>
                        <div className="flex justify-center gap-8 mb-4">
                            <button
                                onClick={() => { setShowDeleteConfirm(false); navigate('/goals'); }}
                                className="w-16 h-16 rounded-full border border-primary flex items-center justify-center transition-transform active:scale-95 hover:bg-primary/10"
                            >
                                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'wght' 500" }}>check</span>
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="w-16 h-16 rounded-full border border-red-500 flex items-center justify-center transition-transform active:scale-95 hover:bg-red-500/10"
                            >
                                <span className="material-symbols-outlined text-red-500 text-3xl" style={{ fontVariationSettings: "'wght' 500" }}>close</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 flex items-center justify-center space-x-2 text-zinc-600">
                        <span className="material-symbols-outlined text-xs">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">POWERED BY POUP INTELLIGENCE</p>
                    </div>
                </div>
            )}
        </div>
    );
}
