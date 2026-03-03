import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function TransactionHistory() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30">
            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background-dark/95 backdrop-blur-xl z-50">
                <div className="flex items-center space-x-4">
                    <h1 className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-zinc-400">Evolução de Gastos</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-400 text-[20px]">more_vert</span>
                    </button>
                </div>
            </header>

            <main className="flex-grow px-6 space-y-8 pb-12 pt-2">
                {/* Evolution Chart Section */}
                <section className="space-y-8">
                    <div className="flex items-end justify-between h-32 px-4 relative">
                        <div className="absolute inset-x-0 top-0 h-px bg-white/5"></div>
                        <div className="absolute inset-x-0 top-1/2 h-px bg-white/5"></div>

                        {/* Days of the week bars */}
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-primary/20 rounded-full h-[30%]"></div>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Seg</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-primary/40 rounded-full h-[55%]"></div>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Ter</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-primary/30 rounded-full h-[45%]"></div>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Qua</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-primary/60 rounded-full h-[85%]"></div>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Qui</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-primary/40 rounded-full h-[60%]"></div>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Vie</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-primary rounded-full h-full neon-glow-sm"></div>
                            <span className="text-[8px] font-bold text-primary uppercase tracking-tighter">Sáb</span>
                        </div>
                        <div className="flex flex-col items-center gap-4 h-full justify-end">
                            <div className="w-[2px] bg-zinc-800 rounded-full h-[25%]"></div>
                            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">Dom</span>
                        </div>
                    </div>
                </section>

                {/* Summary Card and Search */}
                <div className="space-y-4">
                    <div className="bg-transparent neon-border rounded-[28px] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Total Gasto Hoje</p>
                                <div className="flex items-baseline space-x-2">
                                    <h2 className="text-3xl font-display font-bold text-text-main">R$ 342,50</h2>
                                    <span className="text-[10px] text-primary font-bold tracking-tight">▲ 2.4%</span>
                                </div>
                            </div>
                            <div className="flex items-end space-x-0.5 h-8">
                                <div className="w-0.5 bg-primary/20 h-2 rounded-full"></div>
                                <div className="w-0.5 bg-primary/30 h-4 rounded-full"></div>
                                <div className="w-0.5 bg-primary/40 h-3 rounded-full"></div>
                                <div className="w-0.5 bg-primary/60 h-6 rounded-full"></div>
                                <div className="w-0.5 bg-primary h-5 rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <div className="flex-grow flex items-center bg-transparent border border-[#222426] rounded-xl px-4 py-2.5 transition-colors focus-within:border-primary/40">
                                <span className="material-symbols-outlined text-zinc-600 mr-3 text-[18px]">search</span>
                                <input
                                    className="bg-transparent border-none focus:ring-0 text-[13px] placeholder-zinc-700 w-full p-0 text-text-main"
                                    placeholder="Buscar no histórico..."
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="w-11 h-11 flex items-center justify-center rounded-xl border border-[#222426] bg-transparent active:bg-zinc-900">
                                <span className="material-symbols-outlined text-zinc-500 text-[20px]">tune</span>
                            </button>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <section className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-[9px] font-bold tracking-[0.25em] text-zinc-600 uppercase">Fluxo Analítico</h3>
                            <div className="flex space-x-4">
                                <span className="text-[9px] font-bold text-primary uppercase tracking-widest cursor-pointer">Débito</span>
                                <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest cursor-pointer">Crédito</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {/* Transaction Items */}
                            <div
                                onClick={() => setShowDetails(true)}
                                className="bg-transparent neon-border rounded-2xl p-3.5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center bg-white/[0.02]">
                                        <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[13px] font-medium text-text-main leading-tight">Supermercado Premium</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-[9px] text-zinc-600 font-bold tracking-wider uppercase">Conta Principal</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                                            <span className="text-[9px] text-zinc-600 font-medium">14:20</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold font-display text-text-main tracking-tight">- R$ 342,50</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setShowDetails(true)}
                                className="bg-transparent neon-border rounded-2xl p-3.5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center bg-white/[0.02]">
                                        <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[13px] font-medium text-text-main leading-tight">Dividendos Recebidos</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-[9px] text-zinc-600 font-bold tracking-wider uppercase">Investimentos</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                                            <span className="text-[9px] text-zinc-600 font-medium">Ontem</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold font-display text-primary tracking-tight">+ R$ 1.250,00</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setShowDetails(true)}
                                className="bg-transparent neon-border rounded-2xl p-3.5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center bg-white/[0.02]">
                                        <span className="material-symbols-outlined text-primary text-[20px]">local_gas_station</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[13px] font-medium text-text-main leading-tight">Posto de Combustível</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-[9px] text-zinc-600 font-bold tracking-wider uppercase">Cartão Black</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                                            <span className="text-[9px] text-zinc-600 font-medium">Ontem</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold font-display text-text-main tracking-tight">- R$ 280,00</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setShowDetails(true)}
                                className="bg-transparent neon-border rounded-2xl p-3.5 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center bg-white/[0.02]">
                                        <span className="material-symbols-outlined text-primary text-[20px]">restaurant</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[13px] font-medium text-text-main leading-tight">Restaurante Gourmet</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-[9px] text-zinc-600 font-bold tracking-wider uppercase">Cartão Black</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                                            <span className="text-[9px] text-zinc-600 font-medium">08 Dez</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-bold font-display text-text-main tracking-tight">- R$ 156,90</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer className="pt-8 pb-12 flex justify-center">
                        <div className="w-12 h-1 bg-white/10 rounded-full"></div>
                    </footer>
                </div>
            </main>

            {/* Floating Action Button */}
            <button
                onClick={() => navigate('/new-transaction')}
                className="fixed right-6 bottom-32 w-14 h-14 bg-primary text-black rounded-full shadow-2xl shadow-primary/20 flex items-center justify-center z-[70] active:scale-90 transition-all cursor-pointer"
            >
                <span className="material-symbols-outlined font-bold text-2xl">add</span>
            </button>

            {/* Transaction Details Popup */}
            {showDetails && (
                <div className="fixed inset-0 z-[110] bg-black flex flex-col animate-in fade-in slide-in-from-bottom duration-300 overflow-y-auto hide-scrollbar">
                    {/* Header */}
                    <header className="px-6 pt-14 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-lg z-50">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-white text-[20px]">arrow_back_ios_new</span>
                        </button>
                        <h1 className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-zinc-500">Detalhes da Transação</h1>
                        <div className="w-10"></div>
                    </header>

                    <main className="flex-grow px-6 pt-4 pb-32 space-y-8">
                        {/* Transaction Main Card */}
                        <div className="neon-border rounded-[32px] bg-transparent p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-primary text-[32px] neon-glow-icon">shopping_bag</span>
                            </div>
                            <h2 className="text-4xl font-display font-bold tracking-tight text-text-main mb-2">R$ 342,50</h2>
                            <p className="text-lg font-medium text-text-secondary">Supermercado Premium</p>

                            <div className="mt-8 pt-8 border-t border-white/5 w-full space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Data e Hora</span>
                                    <span className="text-[13px] text-text-main">Sábado, 09 Dez • 14:20</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Método</span>
                                    <span className="text-[13px] text-text-main">Débito • Conta Principal</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Categoria</span>
                                    <span className="text-[13px] text-text-main">Alimentação</span>
                                </div>
                            </div>
                        </div>

                        {/* Attached Document Section */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase px-2">Documento Anexado</h3>
                            <div className="border border-white/10 rounded-2xl p-4 flex items-center justify-between bg-white/[0.02]">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-lg bg-zinc-900 overflow-hidden border border-white/10 relative">
                                        <img
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover opacity-60"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa49TLMpfOdsJFBHZN-Tz4wtT2b5-rO8iaMADEPiUSz3Q23AVuBXirKDY51jKudw8qP5zro-zp7SMVq08U9InBWJkSjZMosxDW-umRpOFUN9JLGYQqcUHhC4eKmNkwOFRGmtRgaK14hcAtEL8EBY2-Hcl_aWVfoHxBnNU2k-sqSYzZhE3_jXmIQjxqahpO0pV8cOkgloPAdXI4gevPD4JJ7syDC5PucseolZFj5xvbV-gwkEi8kK3LVFRpu_gvHP3hYcPH9QlRzvY"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-zinc-400 text-[18px]">receipt_long</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] font-medium text-text-main">comprovante_transacao.pdf</span>
                                        <span className="text-[11px] text-zinc-600">1.2 MB • PDF</span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 rounded-xl border border-primary text-primary text-[11px] font-bold uppercase tracking-wider active:bg-primary/10 transition-colors">
                                    Ver PDF
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Sticky Footer Actions */}
                    <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent pb-10">
                        <div className="flex space-x-4 max-w-md mx-auto">
                            <button
                                onClick={() => navigate('/edit-transaction')}
                                className="flex-1 h-14 rounded-2xl border border-primary text-primary font-bold tracking-widest text-[12px] uppercase active:bg-primary/10 transition-all"
                            >
                                Editar
                            </button>
                            <button className="flex-1 h-14 rounded-2xl border border-zinc-700 text-zinc-500 font-bold tracking-widest text-[12px] uppercase active:bg-zinc-900 transition-all">
                                Excluir
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
}
