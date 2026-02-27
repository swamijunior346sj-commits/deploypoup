import React from 'react';
import Header from '../components/Header';

export default function FinancialPerformance() {
    const RightElement = () => (
        <div className="w-10 h-10 flex items-center justify-end">
            <span className="material-symbols-outlined text-zinc-400">share</span>
        </div>
    );

    return (
        <div className="bg-background-dark text-white font-sans min-h-screen flex flex-col">
            <Header
                showBack
                title="Performance Financeira"
                rightElement={<RightElement />}
            />

            <main className="flex-grow px-6 space-y-8 pb-32">
                <div className="bg-zinc-950 border-2 border-primary/50 glow-border rounded-[28px] p-6 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
                    </div>
                    <h2 className="text-xl font-display font-bold text-white leading-tight">VOCÊ VENCEU O CDI ESTE MÊS!</h2>
                    <p className="text-[10px] text-primary font-bold tracking-widest mt-2 uppercase">Performance Superior +2.4%</p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Rentabilidade Real vs Inflação</h3>
                        <div className="flex space-x-3">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-0.5 bg-primary"></div>
                                <span className="text-[8px] text-zinc-500 font-bold uppercase">Carteira</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-0.5 bg-zinc-600 border-t border-dashed"></div>
                                <span className="text-[8px] text-zinc-500 font-bold uppercase">IPCA</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-5">
                        <div className="h-48 w-full relative flex items-end">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 60">
                                <path d="M0 50 Q 25 48, 50 45 T 100 42" fill="none" opacity="0.6" stroke="#3B82F6" strokeWidth="1"></path>
                                <path d="M0 55 Q 25 54, 50 52 T 100 51" fill="none" stroke="#52525b" strokeDasharray="2" strokeWidth="1"></path>
                                <path d="M0 58 Q 20 50, 40 30 T 70 35 T 100 10" fill="none" stroke="#10B981" strokeWidth="2.5"></path>
                                <path d="M0 58 Q 20 50, 40 30 T 70 35 T 100 10 V 60 H 0 Z" fill="url(#grad-green)" opacity="0.1"></path>
                                <defs>
                                    <linearGradient id="grad-green" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }}></stop>
                                        <stop offset="100%" style={{ stopColor: '#10B981', stopOpacity: 0 }}></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex justify-between mt-4 px-1">
                            <span className="text-[8px] text-zinc-700 font-bold">JAN</span>
                            <span className="text-[8px] text-zinc-700 font-bold">FEV</span>
                            <span className="text-[8px] text-zinc-700 font-bold">MAR</span>
                            <span className="text-[8px] text-zinc-700 font-bold">ABR</span>
                            <span className="text-[8px] text-zinc-700 font-bold">MAI</span>
                            <span className="text-[8px] text-zinc-700 font-bold">JUN</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter mb-1">Rentabilidade Bruta</p>
                        <p className="text-xl font-display font-bold text-white">14.8%</p>
                        <div className="flex items-center text-primary mt-1">
                            <span className="material-symbols-outlined text-xs">trending_up</span>
                            <span className="text-[10px] font-bold ml-1">+2.1% vs CDI</span>
                        </div>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
                        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter mb-1">Rentabilidade Real</p>
                        <p className="text-xl font-display font-bold text-primary">8.42%</p>
                        <div className="flex items-center text-zinc-500 mt-1">
                            <span className="material-symbols-outlined text-xs">info</span>
                            <span className="text-[10px] font-bold ml-1">Acima da Inflação</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Benchmark Performance</h3>
                    <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6">
                        <div className="flex items-end justify-between h-32 px-4">
                            <div className="flex flex-col items-center space-y-2 group w-1/4">
                                <div className="w-full bg-zinc-900 rounded-t-lg relative h-20 overflow-hidden">
                                    <div className="absolute bottom-0 w-full bg-zinc-700 h-full"></div>
                                </div>
                                <span className="text-[9px] font-bold text-zinc-500">IBOV</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2 group w-1/4">
                                <div className="w-full bg-zinc-900 rounded-t-lg relative h-12 overflow-hidden">
                                    <div className="absolute bottom-0 w-full bg-zinc-700 h-full"></div>
                                </div>
                                <span className="text-[9px] font-bold text-zinc-500">IPCA</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2 group w-1/4">
                                <div className="w-full bg-zinc-900 rounded-t-lg relative h-16 overflow-hidden">
                                    <div className="absolute bottom-0 w-full bg-blue-500 h-full"></div>
                                </div>
                                <span className="text-[9px] font-bold text-zinc-500">CDI</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2 group w-1/4">
                                <div className="w-full bg-zinc-900 rounded-t-lg relative h-28 overflow-hidden">
                                    <div className="absolute bottom-0 w-full bg-primary h-full glow-border"></div>
                                </div>
                                <span className="text-[9px] font-bold text-primary">VOCÊ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="pt-8 pb-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-600">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
