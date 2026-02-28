import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SavingsSimulator() {
    const navigate = useNavigate();

    const [sliders, setSliders] = useState([
        { label: 'Lazer', value: 450, max: 1000 },
        { label: 'Assinaturas', value: 120, max: 500 },
        { label: 'Alimentação', value: 930, max: 2500 },
    ]);

    const total = sliders.reduce((s, sl) => s + sl.value, 0);

    const updateSlider = (index: number, val: number) => {
        setSliders(prev => prev.map((s, i) => i === index ? { ...s, value: val } : s));
    };

    return (
        <div className="bg-black text-[#FCFCFC] font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-[10px] font-display font-bold tracking-[0.3em] text-[#FCFCFC] uppercase flex-1 text-center pr-8">
                    SIMULADOR DE ECONOMIA
                </h1>
            </header>

            <main className="flex-1 px-6 pb-40">
                {/* Total Card */}
                <section className="mt-4 mb-8">
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-[2.5rem] p-10 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 blur-[80px] rounded-full -ml-20 -mt-20"></div>
                        <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-4 block">ECONOMIA POTENCIAL TOTAL</label>
                        <div className="flex flex-col items-center">
                            <span className="text-[#FCFCFC] text-5xl font-display font-bold mb-2" style={{ textShadow: '0 0 10px rgba(252,252,252,0.4)' }}>
                                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-primary text-[10px] font-bold tracking-widest uppercase mt-2">Poupado por Mês</span>
                        </div>
                    </div>
                </section>

                {/* Sliders */}
                <section className="mb-12 space-y-10">
                    {sliders.map((slider, index) => {
                        const percent = (slider.value / slider.max) * 100;
                        return (
                            <div key={slider.label} className="relative pt-6">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{slider.label}</label>
                                </div>
                                <div className="relative w-full">
                                    <div
                                        className="absolute -top-8 bg-primary text-black px-2 py-0.5 rounded text-[10px] font-bold pointer-events-none"
                                        style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
                                    >
                                        R$ {slider.value}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary"></div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max={slider.max}
                                        value={slider.value}
                                        onChange={(e) => updateSlider(index, Number(e.target.value))}
                                        className="w-full appearance-none bg-transparent cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #0FB67F ${percent}%, #1A1B1E ${percent}%)`,
                                            height: '4px',
                                            borderRadius: '2px',
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* AI Insights */}
                <section className="mb-10">
                    <div className="flex items-center space-x-2 mb-5">
                        <div className="bg-primary/20 p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-primary text-base">auto_awesome</span>
                        </div>
                        <h2 className="text-xs font-display font-bold tracking-[0.2em] text-[#FCFCFC] uppercase">INSIGHTS DA IA</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-[#0D0E10] border-l-4 border-l-primary rounded-r-2xl p-5">
                            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                Você pode economizar <span className="text-primary font-bold">R$ 45,00</span> mensais cancelando assinaturas que não usa há 3 meses.
                            </p>
                            <div className="flex justify-end">
                                <button className="bg-primary text-black text-[9px] font-bold px-5 py-2 rounded-full uppercase tracking-widest active:scale-95 transition-all">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                        <div className="bg-[#0D0E10] border-l-4 border-l-primary rounded-r-2xl p-5">
                            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                                Seus gastos com Lazer estão <span className="text-primary font-bold">20% acima</span> da média. Tente reduzir R$ 100,00 para bater sua meta.
                            </p>
                            <div className="flex justify-end">
                                <button className="bg-primary text-black text-[9px] font-bold px-5 py-2 rounded-full uppercase tracking-widest active:scale-95 transition-all">
                                    Aplicar
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spending Projection Chart */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xs font-display font-bold tracking-[0.2em] text-[#FCFCFC] uppercase">PROJEÇÃO DE GASTOS</h2>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-1.5">
                                <div className="w-3 h-[2px] bg-zinc-600 border-t border-dashed"></div>
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">Atual</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <div className="w-2.5 h-2.5 rounded-sm bg-primary/40 border border-primary"></div>
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">Novo</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-48 w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                            <defs>
                                <linearGradient id="neonGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#0FB67F" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,80 C50,75 100,90 150,85 C200,80 250,70 300,75 C350,80 400,70" fill="none" stroke="#52525b" strokeDasharray="4,4" strokeWidth="1.5" />
                            <path d="M0,120 C50,115 100,130 150,125 C200,120 250,110 300,115 C350,120 400,110 L400,150 L0,150 Z" fill="url(#neonGradient)" />
                            <path d="M0,120 C50,115 100,130 150,125 C200,120 250,110 300,115 C350,120 400,110" fill="none" stroke="#0FB67F" strokeLinecap="round" strokeWidth="2.5" />
                            <circle cx="400" cy="110" fill="#0FB67F" r="4" style={{ filter: 'drop-shadow(0 0 10px rgba(15,182,127,0.5))' }} />
                        </svg>
                        <div className="flex justify-between mt-6 text-[9px] text-zinc-600 font-bold tracking-widest uppercase">
                            <span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span><span>DOM</span>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-[#0D0E10] border border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-between h-28">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-tight">Economia Anual Estimada</p>
                        <p className="text-xl font-bold font-display text-primary">R$ {(total * 12).toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="bg-[#0D0E10] border border-zinc-800/50 rounded-2xl p-6 flex flex-col justify-between h-28">
                        <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-tight">Tempo poupado para Meta</p>
                        <p className="text-xl font-bold font-display text-[#FCFCFC]">- 4 Meses</p>
                    </div>
                </section>

                {/* Save Button */}
                <button
                    onClick={() => navigate('/budgets')}
                    className="w-full bg-primary py-5 rounded-2xl text-black font-display font-bold text-sm tracking-[0.2em] active:scale-[0.98] transition-all uppercase"
                    style={{ boxShadow: '0 0 20px rgba(15, 182, 127, 0.3)' }}
                >
                    ATUALIZAR MEU ORÇAMENTO
                </button>

                {/* Footer */}
                <footer className="mt-16 mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2 opacity-30">
                        <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                        <p className="text-[8px] font-bold tracking-[0.5em] uppercase text-[#FCFCFC]">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
