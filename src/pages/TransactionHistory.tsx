import { useNavigate } from 'react-router-dom';

export default function TransactionHistory() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-40">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-zinc-300">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-sm font-display font-bold tracking-[0.2em] uppercase">Histórico</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => navigate('/spending-analysis')} className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center active:scale-95 transition-transform">
                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-400">share</span>
                    </div>
                </div>
            </header>

            <main className="flex-grow px-6 space-y-6 pb-12 pt-4">
                <div className="flex space-x-3">
                    <div className="flex-grow flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3">
                        <span className="material-symbols-outlined text-zinc-500 mr-2">search</span>
                        <input className="bg-transparent border-none focus:ring-0 text-sm placeholder-zinc-500 w-full p-0" placeholder="Buscar transação..." type="text" />
                    </div>
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shrink-0">
                        <span className="material-symbols-outlined text-primary">tune</span>
                    </button>
                </div>

                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase ml-1">Hoje</h3>
                    <div onClick={() => navigate('/transaction-details')} className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Supermercado</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Conta Corrente</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold font-display">- R$ 342,50</p>
                    </div>
                    <div onClick={() => navigate('/transaction-details')} className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">payments</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Salário Mensal</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Investimentos</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold font-display text-primary">+ R$ 8.500,00</p>
                    </div>
                </section>

                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase ml-1">Ontem</h3>
                    <div onClick={() => navigate('/transaction-details')} className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">local_gas_station</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Posto de Gasolina</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Cartão de Crédito</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold font-display">- R$ 280,00</p>
                    </div>
                    <div onClick={() => navigate('/transaction-details')} className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">restaurant</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Restaurante Gourmet</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Cartão de Crédito</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold font-display">- R$ 156,90</p>
                    </div>
                    <div onClick={() => navigate('/transaction-details')} className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">bolt</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Energia Elétrica</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Conta Corrente</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold font-display">- R$ 412,20</p>
                    </div>
                </section>

                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase ml-1">10 de Dezembro</h3>
                    <div onClick={() => navigate('/transaction-details')} className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">fitness_center</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Mensalidade Academia</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Conta Corrente</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold font-display">- R$ 189,90</p>
                    </div>
                </section>

                <footer className="pt-8 pb-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-bold tracking-[0.3em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>

            <button onClick={() => navigate('/new-transaction')} className="fixed right-6 bottom-24 w-14 h-14 bg-primary text-black rounded-full shadow-2xl shadow-primary/20 flex items-center justify-center z-[60] active:scale-95 transition-transform animate-levitate">
                <span className="material-symbols-outlined font-bold text-3xl">add</span>
            </button>
        </div>
    );
}
