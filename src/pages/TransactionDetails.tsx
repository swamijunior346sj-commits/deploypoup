import { useNavigate } from 'react-router-dom';

export default function TransactionDetails() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-40">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-zinc-300">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-sm font-display font-bold tracking-[0.2em] uppercase">Detalhes</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-zinc-400">edit</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-red-500">delete</span>
                    </button>
                </div>
            </header>

            <main className="flex-grow px-6 space-y-6 pb-12 pt-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 text-center">
                    <div className="mb-4">
                        <p className="text-3xl font-bold font-display text-primary tracking-tight">+ R$ 8.500,00</p>
                        <h2 className="text-xl font-bold text-white mt-1">Salário Mensal</h2>
                        <div className="mt-3 inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Concluído</span>
                        </div>
                    </div>

                    <div className="mt-10 space-y-5 text-left border-t border-zinc-800 pt-8">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-500 font-medium">Conta</span>
                            <span className="text-sm font-semibold">Investimentos</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-500 font-medium">Data</span>
                            <span className="text-sm font-semibold">10 de Dezembro, 2023</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-500 font-medium">Categoria</span>
                            <span className="text-sm font-semibold">Renda</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="text-xs text-zinc-500 font-medium">Observações</span>
                            <p className="text-sm font-semibold text-zinc-300">Pagamento referente ao mês de Novembro</p>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 rounded-[28px] p-5 flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Comprovante</h3>
                        <span className="material-symbols-outlined text-zinc-500 text-lg">description</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                            <div className="bg-zinc-800 w-12 h-14 rounded-sm relative flex items-center justify-center shadow-inner">
                                <span className="material-symbols-outlined text-zinc-600 text-3xl">picture_as_pdf</span>
                                <div className="absolute bottom-2 left-0 right-0 h-1 bg-primary/30 mx-2"></div>
                                <div className="absolute bottom-4 left-0 right-0 h-1 bg-zinc-700 mx-2"></div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-bold text-white mb-1">comprovante_0023.pdf</p>
                            <p className="text-[10px] text-zinc-500">Adicionado em 10/12/2023</p>
                        </div>
                    </div>
                    <button className="w-full h-12 bg-primary text-black font-bold rounded-2xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-transform">
                        <span className="material-symbols-outlined">download</span>
                        <span className="text-sm uppercase tracking-wider">Baixar PDF</span>
                    </button>
                </div>

                <footer className="pt-8 pb-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-bold tracking-[0.3em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
