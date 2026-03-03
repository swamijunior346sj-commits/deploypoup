import { useNavigate } from 'react-router-dom';

export default function BudgetDetails() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark font-display antialiased min-h-screen">
            <div className="max-w-md mx-auto min-h-screen flex flex-col px-6 py-8 relative">
                {/* Header */}
                <header className="flex items-center justify-between mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-off-white hover:opacity-70 transition-opacity active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[28px]">arrow_back</span>
                    </button>
                    <h1 className="text-off-white text-lg font-medium tracking-tight">Detalhes do Orçamento</h1>
                    <div className="w-7"></div>
                </header>

                {/* Circular Gauge Section */}
                <section className="flex flex-col items-center mb-12">
                    <div className="relative flex items-center justify-center">
                        {/* Outer Ring */}
                        <div className="w-64 h-64 rounded-full border border-[#18181B] absolute"></div>
                        {/* Progress Ring */}
                        <svg className="w-64 h-64 -rotate-90">
                            <circle cx="128" cy="128" fill="transparent" r="120" stroke="#18181B" strokeWidth="1.5"></circle>
                            <circle
                                cx="128" cy="128" fill="transparent" r="120"
                                stroke="#0FB67F"
                                strokeDasharray="753.98"
                                strokeDashoffset="188.49"
                                strokeLinecap="round"
                                strokeWidth="2"
                                className="transition-all duration-1000 ease-out"
                            ></circle>
                        </svg>
                        {/* Central Text */}
                        <div className="absolute flex flex-col items-center">
                            <span className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-medium mb-1">Total Gasto</span>
                            <span className="text-off-white text-4xl font-extralight tracking-tight">R$ 3.750</span>
                            <span className="text-light-gray text-sm mt-1 font-light">de R$ 5.000</span>
                        </div>
                    </div>
                </section>

                {/* Monthly Evolution Chart */}
                <section className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-light-gray text-xs uppercase tracking-widest font-semibold">Evolução Mensal</h3>
                        <span className="text-primary text-xs font-medium">+2.4% vs mês ant.</span>
                    </div>
                    <div className="h-20 w-full flex items-end justify-between px-2">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                            <path d="M0,80 Q50,70 100,85 T200,40 T300,55 T400,20" fill="none" opacity="0.8" stroke="#0FB67F" strokeWidth="1.5"></path>
                            <path d="M0,80 Q50,70 100,85 T200,40 T300,55 T400,20 L400,100 L0,100 Z" fill="url(#gradient)" opacity="0.1"></path>
                            <defs>
                                <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#0FB67F', stopOpacity: 1 }}></stop>
                                    <stop offset="100%" style={{ stopColor: '#0FB67F', stopOpacity: 0 }}></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="flex justify-between mt-2 px-1">
                        {['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'].map(m => (
                            <span key={m} className="text-zinc-500 text-[10px]">{m}</span>
                        ))}
                    </div>
                </section>

                {/* Categories Breakdown */}
                <section className="space-y-8 mb-24">
                    <h3 className="text-light-gray text-xs uppercase tracking-widest font-semibold">Categorias</h3>

                    {[
                        { id: 1, name: 'Alimentação', icon: 'restaurant', spent: 800, percent: 80 },
                        { id: 2, name: 'Moradia', icon: 'home', spent: 1900, percent: 95 },
                        { id: 3, name: 'Transporte', icon: 'directions_car', spent: 450, percent: 60 },
                        { id: 4, name: 'Lazer', icon: 'confirmation_number', spent: 600, percent: 40 },
                    ].map(cat => (
                        <div key={cat.id} className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-light-gray text-xl">{cat.icon}</span>
                                    <span className="text-off-white font-medium">{cat.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-off-white text-sm font-semibold">R$ {cat.spent}</p>
                                    <p className="text-zinc-500 text-[11px]">{cat.percent}% utilizado</p>
                                </div>
                            </div>
                            <div className="h-[2px] w-full bg-[#18181B] rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${cat.percent}%` }}></div>
                            </div>
                        </div>
                    ))}

                </section>

                {/* Action Button */}
                <footer className="mt-auto pb-6 pt-4 sticky bottom-0 bg-background-dark/80 backdrop-blur-sm shadow-[0_-20px_30px_#000]">
                    <button
                        onClick={() => navigate('/edit-budget')}
                        className="w-full py-4 border border-primary rounded-full text-off-white font-bold hover:bg-primary/10 transition-colors tracking-widest text-sm uppercase bg-transparent active:scale-[0.98]"
                    >
                        Ajustar Orçamento
                    </button>
                </footer>
            </div>
        </div>
    );
}
