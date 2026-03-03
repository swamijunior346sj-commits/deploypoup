import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function EditTransaction() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('R$ 342,50');
    const [description, setDescription] = useState('Supermercado Premium');
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <div className={`bg-background-dark text-text-main font-sans flex flex-col min-h-screen selection:bg-primary/30 ${showSuccess ? 'overflow-hidden' : ''}`}>
            {/* Background Content (blurred when success popup is shown) */}
            <div className={`flex flex-col min-h-screen transition-all duration-500 ${showSuccess ? 'blur-md opacity-40 pointer-events-none' : ''}`}>
                {/* Header */}
                <header className="px-6 pt-14 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-lg z-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 active:scale-95 transition-transform"
                    >
                        <span className="material-symbols-outlined text-white text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-[10px] font-display font-bold tracking-[0.4em] uppercase text-text-main">EDITAR TRANSAÇÃO</h1>
                    <div className="w-10"></div>
                </header>

                <main className="flex-grow px-6 pt-6 pb-32 space-y-10">
                    {/* Hero Amount Section */}
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-full relative">
                            <input
                                className="w-full bg-transparent border-none text-center text-[42px] font-display font-bold text-[#FCFCFC] white-text-glow focus:ring-0 p-0"
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="w-full max-w-[280px]">
                            <input
                                className="w-full bg-transparent border-none text-center text-[15px] font-normal text-text-secondary focus:ring-0 p-0 placeholder-zinc-700"
                                placeholder="Nome da transação"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="neon-border rounded-[32px] bg-white/[0.02] p-6 space-y-6">
                        <button className="w-full flex justify-between items-center group">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A7A7A7]">DATA E HORA</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[13px] font-bold text-[#FCFCFC]">09 DEZ 2023, 14:20</span>
                                <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
                            </div>
                        </button>
                        <div className="h-[1px] w-full bg-white/5"></div>
                        <button className="w-full flex justify-between items-center group">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A7A7A7]">MÉTODO / CONTA</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[13px] font-bold text-[#FCFCFC]">CONTA PRINCIPAL</span>
                                <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
                            </div>
                        </button>
                        <div className="h-[1px] w-full bg-white/5"></div>
                        <button className="w-full flex justify-between items-center group">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A7A7A7]">CATEGORIA</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-[13px] font-bold text-[#FCFCFC]">ALIMENTAÇÃO</span>
                                <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
                            </div>
                        </button>
                    </div>

                    {/* Document Section */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#A7A7A7] uppercase px-2">Documento Anexado</h3>
                        <div className="neon-border rounded-[24px] p-4 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-900 overflow-hidden border border-white/10 relative">
                                    <img
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover opacity-40"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa49TLMpfOdsJFBZNTz4wtT2b5-rO8iaMADEPiUSz3Q23AVuBXirKDY51jKudw8qP5zro-zp7SMVq08U9InBWJkSjZMosxDW-umRpOFUN9JLGYQqcUHhC4eKmNkwOFRGmtRgaK14hcAtEL8EBY2-Hcl_aWVfoHxBnNU2k-sqSYzZhE3_jXmIQjxqahpO0pV8cOkgloPAdXI4gevPD4JJ7syDC5PucseolZFj5xvbV-gwkEi8kK3LVFRpu_gvHP3hYcPH9QlRzvY"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-zinc-400 text-[18px]">receipt_long</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-medium text-[#FCFCFC]">comprovante.pdf</span>
                                    <span className="text-[11px] text-[#A7A7A7]">1.2 MB • PDF</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 rounded-lg border border-primary/40 text-primary text-[10px] font-bold uppercase tracking-wider active:bg-primary/10 transition-colors">
                                Alterar
                            </button>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/95 to-transparent pb-8">
                    <div className="max-w-md mx-auto space-y-6">
                        <button
                            onClick={() => setShowSuccess(true)}
                            className="w-full h-14 rounded-2xl bg-transparent border border-primary text-primary font-bold tracking-[0.2em] text-[12px] uppercase active:bg-primary/10 transition-all"
                        >
                            Salvar Alterações
                        </button>
                        <div className="text-center">
                            <span className="text-[9px] font-display font-bold tracking-[0.4em] text-zinc-700 uppercase">Powered by POUP</span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                    <div className="w-full max-w-[320px] neon-border rounded-[40px] bg-black/60 backdrop-blur-xl p-10 flex flex-col items-center text-center scale-up-center">
                        <div className="mb-8">
                            <span className="material-symbols-outlined text-primary text-[84px] font-light neon-text-glow leading-none">
                                check_circle
                            </span>
                        </div>
                        <h2 className="text-[#FCFCFC] font-display font-bold text-[18px] tracking-[0.2em] uppercase mb-12">
                            Alterações Salvas!
                        </h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full py-4 rounded-2xl border border-primary bg-transparent text-primary text-[14px] font-bold uppercase tracking-[0.3em] active:bg-primary/10 transition-all"
                        >
                            Concluir
                        </button>
                    </div>
                    <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center z-[110]">
                        <span className="text-[9px] font-display font-bold tracking-[0.5em] text-zinc-600 uppercase">Powered by POUP</span>
                    </footer>
                </div>
            )}
        </div>
    );
}
