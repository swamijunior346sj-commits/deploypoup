import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewInvestment() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('0,00');
    const [name, setName] = useState('');
    const [type, setType] = useState('Renda Fixa');
    const [date, setDate] = useState('');
    const [rate, setRate] = useState('');

    const handleSave = () => {
        // TODO: Save investment to Supabase
        navigate('/investment-portfolio');
    };

    return (
        <div className="bg-black text-white font-sans flex flex-col min-h-screen overflow-x-hidden">
            <header className="pt-14 pb-4 px-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-20">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900 rounded-full transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="text-sm font-display font-bold tracking-[0.25em] text-white uppercase flex-1 text-center pr-8">
                    NOVO INVESTIMENTO
                </h1>
            </header>

            <main className="flex-1 px-6 pb-32">
                {/* Value Input */}
                <div className="mt-8 mb-10 text-center">
                    <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2 block">VALOR APLICADO</label>
                    <div className="flex justify-center items-center">
                        <span className="text-primary text-4xl font-display font-bold mr-2" style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}>R$</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-primary text-5xl font-display font-bold text-center p-0 w-48 outline-none"
                            style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.6)' }}
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Nome do Ativo</label>
                            <input
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                placeholder="Ex: Bitcoin, Tesouro Direto"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Tipo de Ativo</label>
                            <div className="relative">
                                <select
                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option>Renda Fixa</option>
                                    <option>Renda Variável</option>
                                    <option>FIIs</option>
                                    <option>Cripto</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Data da Compra</label>
                            <input
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none [color-scheme:dark]"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-3 block">Rentabilidade Estimada (%)</label>
                            <input
                                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                placeholder="0.00%"
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Attach Receipt */}
                    <button className="w-full bg-zinc-900/30 border border-dashed border-zinc-700 rounded-3xl p-8 flex flex-col items-center justify-center space-y-3 hover:bg-zinc-900/50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-zinc-500">photo_camera</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Anexar Comprovante</span>
                    </button>
                </div>

                {/* Save Button */}
                <div className="mt-10">
                    <button
                        onClick={handleSave}
                        className="w-full bg-primary text-black font-display font-bold py-5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all tracking-widest uppercase text-sm"
                        style={{ boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)' }}
                    >
                        SALVAR INVESTIMENTO
                    </button>
                </div>

                {/* Footer */}
                <footer className="mt-12 mb-8 flex flex-col items-center">
                    <div className="flex items-center space-x-2 opacity-30">
                        <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                        <p className="text-[8px] font-bold tracking-[0.4em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
