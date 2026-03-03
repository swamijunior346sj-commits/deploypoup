import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

export default function AssetDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const asset = state?.asset || { ticker: 'PETR4.SA', name: 'Petróleo Brasileiro S.A.', value: 'R$ 38,42', change: '+2.45%', icon: 'payments' };

    return (
        <div className="bg-black text-[#F5F5F5] font-sans flex flex-col min-h-screen selection:bg-primary/30 overflow-x-hidden antialiased">
            {/* Header Sticky */}
            <header className="pt-12 pb-2 px-6 sticky top-0 bg-black/90 backdrop-blur-xl z-50 border-b border-zinc-900">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate(-1)} className="material-symbols-outlined text-[#FCFCFC] active:scale-95 transition-transform">arrow_back</button>
                    <h1 className="text-[10px] font-display font-bold tracking-[0.4em] text-[#FCFCFC] uppercase text-center flex-1">PERFORMANCE DO ATIVO</h1>
                    <span className="material-symbols-outlined text-[#FCFCFC]">notifications</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold tracking-wider px-2">
                    <button className="pb-3 px-2 text-zinc-500 hover:text-white transition-colors">GERAL</button>
                    <button className="pb-3 px-2 text-primary border-b-2 border-primary">TÉCNICO</button>
                    <button className="pb-3 px-2 text-zinc-500 hover:text-white transition-colors">HISTÓRICO</button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-12">
                <section className="p-6">
                    {/* Header do Ativo */}
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-[#FCFCFC] tracking-tight">{asset.ticker}</h2>
                            <p className="text-[10px] text-zinc-500 tracking-widest uppercase mt-1">{asset.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-primary neon-text-glow">{asset.value}</p>
                            <p className="text-[10px] text-primary font-bold tracking-tight mt-1">{asset.change} (Hoje)</p>
                        </div>
                    </div>

                    {/* Gráfico de Volatilidade */}
                    <div className="w-full aspect-[16/9] border border-primary/40 rounded-3xl p-4 relative overflow-hidden mb-6 bg-black/40">
                        <div className="absolute inset-0 grid grid-rows-5 px-4 py-8 opacity-10 pointer-events-none">
                            <div className="border-t border-primary"></div>
                            <div className="border-t border-primary"></div>
                            <div className="border-t border-primary"></div>
                            <div className="border-t border-primary"></div>
                            <div className="border-t border-primary"></div>
                        </div>
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
                            <defs>
                                <linearGradient id="neonGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.4"></stop>
                                    <stop offset="100%" stopColor="#0FB67F" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,200 L0,160 C50,150 80,180 120,140 C160,100 200,120 240,80 C280,40 320,60 360,30 C380,15 400,20 L400,200 Z" fill="url(#neonGradient)"></path>
                            <path d="M0,160 C50,150 80,180 120,140 C160,100 200,120 240,80 C280,40 320,60 360,30 C380,15 400,20" fill="none" stroke="#0FB67F" strokeWidth="2"></path>
                        </svg>
                        <div className="absolute top-4 right-6 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#0FB67F]"></div>
                            <span className="text-[9px] text-primary font-black tracking-tighter">VOLATILIDADE AO VIVO</span>
                        </div>
                    </div>

                    {/* Saldo Atual Card */}
                    <div className="neon-border rounded-2xl p-7 mb-4 flex flex-col items-center justify-center text-center bg-black/40 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-[10px] font-display font-bold tracking-[0.3em] text-zinc-500 uppercase mb-3 relative z-10">SALDO ATUAL</span>
                        <p className="text-3xl font-display font-bold text-[#FCFCFC] relative z-10 tracking-tight">R$ 15.368,00</p>
                        <div className="mt-3 flex items-center gap-2 relative z-10">
                            <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                            <span className="text-xs text-primary font-black tracking-wide">+R$ 842,10 (Este Mês)</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border border-primary/20 rounded-2xl p-6 bg-black/40">
                            <span className="text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">PREÇO MÉDIO</span>
                            <p className="text-xl font-display font-bold text-[#FCFCFC] mt-2 tracking-tight">R$ 34,12</p>
                        </div>
                        <div className="border border-primary/20 rounded-2xl p-6 bg-black/40">
                            <span className="text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">QUANTIDADE</span>
                            <p className="text-xl font-display font-bold text-[#FCFCFC] mt-2 tracking-tight">400 UN</p>
                        </div>
                    </div>

                    {/* Movimentações Recentes */}
                    <div className="border border-primary/20 rounded-[2rem] p-7 mb-6 bg-black/40">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">MOVIMENTAÇÕES RECENTES</h3>
                            <span className="material-symbols-outlined text-primary text-sm opacity-60">sync_alt</span>
                        </div>
                        <div className="space-y-8">
                            {[
                                { title: 'Compra Efetuada', date: '12 Out 2023 • 14:30', amount: '+50 UN', value: 'R$ 1.921,00', icon: 'add_circle' },
                                { title: 'Dividendos Recebidos', date: '05 Out 2023 • 09:15', amount: 'R$ 142,50', value: 'Proventos', icon: 'payments' }
                            ].map((move, i) => (
                                <div key={i} className="flex items-center justify-between group active:scale-[0.98] transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center bg-black">
                                            <span className="material-symbols-outlined text-primary text-xl">{move.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#FCFCFC] tracking-wide">{move.title}</p>
                                            <p className="text-[10px] text-zinc-600 font-bold tracking-widest mt-1 uppercase">{move.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[14px] font-black text-primary">{move.amount}</p>
                                        <p className="text-[10px] text-zinc-600 font-bold tracking-widest mt-1 uppercase">{move.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-4 text-[10px] font-black tracking-[0.3em] text-primary border border-primary/20 rounded-2xl hover:bg-primary/5 active:scale-95 transition-all uppercase">
                            VER HISTÓRICO COMPLETO
                        </button>
                    </div>

                    {/* Crescimento Patrimonial */}
                    <div className="border border-primary/20 rounded-[2rem] p-7 mb-6 bg-black/40">
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase mb-8">CRESCIMENTO PATRIMONIAL</h3>
                        <div className="w-full h-40 relative">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#0FB67F" stopOpacity="0.15"></stop>
                                        <stop offset="100%" stopColor="#0FB67F" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,130 C40,125 60,110 100,105 C140,100 160,115 200,80 C240,45 280,60 320,40 C360,20 380,25 400,10 L400,150 L0,150 Z" fill="url(#areaGradient)"></path>
                                <path d="M0,130 C40,125 60,110 100,105 C140,100 160,115 200,80 C240,45 280,60 320,40 C360,20 380,25 400,10" fill="none" stroke="#0FB67F" strokeWidth="1"></path>
                                <circle cx="100" cy="105" fill="#0FB67F" r="2"></circle>
                                <circle cx="200" cy="80" fill="#0FB67F" r="2"></circle>
                                <circle cx="320" cy="40" fill="#0FB67F" r="2"></circle>
                                <circle cx="400" cy="10" fill="#0FB67F" r="3"></circle>
                            </svg>
                            <div className="flex justify-between mt-4 text-[8px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                                <span>JAN</span>
                                <span>MAR</span>
                                <span>MAI</span>
                                <span>JUL</span>
                                <span>SET</span>
                                <span className="text-primary">HOJE</span>
                            </div>
                        </div>
                    </div>

                    {/* Alocação por Risco */}
                    <div className="border border-primary/20 rounded-[2rem] p-7 mb-6 bg-black/40">
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase mb-10">ALOCAÇÃO POR RISCO</h3>
                        <div className="flex items-center gap-10">
                            <div className="relative w-28 h-28 group">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" fill="none" r="16" stroke="rgba(15, 182, 127, 0.1)" strokeWidth="1.5"></circle>
                                    <circle cx="18" cy="18" fill="none" r="16" stroke="#0FB67F" strokeDasharray="100" strokeDashoffset="85" strokeLinecap="round" strokeWidth="2.5"></circle>
                                    <circle className="rotate-[54deg] origin-center" cx="18" cy="18" fill="none" r="16" stroke="#0FB67F" strokeDasharray="100" strokeDashoffset="60" strokeLinecap="round" strokeOpacity="0.6" strokeWidth="2.5"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center relative z-10">
                                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">SCORE</span>
                                    <span className="text-lg font-display font-bold text-[#FCFCFC]">B1</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-5">
                                {[
                                    { label: 'BAIXO', value: '60%', width: '60%', opacity: '0.4' },
                                    { label: 'MÉDIO', value: '25%', width: '25%', opacity: '0.7' },
                                    { label: 'ALTO', value: '15%', width: '15%', opacity: '1' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-[10px] font-black mb-1.5 tracking-widest">
                                            <span className="text-zinc-500">{item.label}</span>
                                            <span className="text-[#FCFCFC]">{item.value}</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: item.width, opacity: item.opacity }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
