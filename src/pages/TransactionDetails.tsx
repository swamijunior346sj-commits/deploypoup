import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function TransactionDetails() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30">
            {/* Header */}
            <header className="px-6 pt-14 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-lg z-50">
                <button
                    onClick={() => navigate(-1)}
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
                    <button className="flex-1 h-14 rounded-2xl border border-primary text-primary font-bold tracking-widest text-[12px] uppercase active:bg-primary/10 transition-all">
                        Editar
                    </button>
                    <button className="flex-1 h-14 rounded-2xl border border-zinc-700 text-zinc-500 font-bold tracking-widest text-[12px] uppercase active:bg-zinc-900 transition-all">
                        Excluir
                    </button>
                </div>
            </footer>
        </div>
    );
}
