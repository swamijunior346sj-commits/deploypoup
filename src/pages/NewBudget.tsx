import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewBudget() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('alimentacao');
    const [type, setType] = useState<'Receita' | 'Despesa'>('Despesa');
    const [amount, setAmount] = useState('2000.00');
    const [period, setPeriod] = useState('mensal');
    const [showSuccess, setShowSuccess] = useState(false);

    const categoryLabels: Record<string, string> = {
        alimentacao: 'Alimentação', moradia: 'Moradia', lazer: 'Lazer', transporte: 'Transporte', saude: 'Saúde'
    };
    const periodLabels: Record<string, string> = {
        mensal: 'Mensal', semanal: 'Semanal', anual: 'Anual', unico: 'Único'
    };

    const handleSave = () => {
        // TODO: Save budget to Supabase
        setShowSuccess(true);
    };

    return (
        <div className={`bg-black text-[#D6D6D6] font-sans flex flex-col min-h-screen ${showSuccess ? 'overflow-hidden' : 'overflow-x-hidden'}`}>
            <header className="pt-14 pb-4 px-6 grid grid-cols-3 items-center sticky top-0 bg-black/95 backdrop-blur-md z-20">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-colors active:scale-95">
                        <span className="material-symbols-outlined text-[#FCFCFC] text-[22px]">arrow_back_ios_new</span>
                    </button>
                </div>
                <h1 className="text-[11px] font-display font-bold tracking-[0.3em] text-[#FCFCFC] uppercase text-center whitespace-nowrap">
                    NOVO ORÇAMENTO
                </h1>
                <div className="w-full"></div>
            </header>

            <main className="flex-1 px-6 pb-44 space-y-6 mt-2">
                {/* Name */}
                <div className="bg-[#0D0E10] rounded-2xl p-6 border border-[#1A1C1E]">
                    <label className="text-[10px] font-display font-bold tracking-[0.2em] text-[#D6D6D6] uppercase mb-3 block">NOME DO ORÇAMENTO</label>
                    <input
                        className="w-full bg-transparent border-none p-0 text-[#FCFCFC] text-lg font-medium focus:ring-0 placeholder:text-zinc-800"
                        placeholder="Ex: Mercado Mensal"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Category */}
                <div className="bg-[#0D0E10] rounded-2xl p-6 border border-[#1A1C1E]">
                    <label className="text-[10px] font-display font-bold tracking-[0.2em] text-[#D6D6D6] uppercase mb-3 block">CATEGORIA</label>
                    <select
                        className="w-full bg-transparent border-none p-0 text-[#FCFCFC] text-lg font-medium focus:ring-0 appearance-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23FCFCFC' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                        }}
                    >
                        <option className="bg-[#0D0E10]" value="alimentacao">Alimentação</option>
                        <option className="bg-[#0D0E10]" value="moradia">Moradia</option>
                        <option className="bg-[#0D0E10]" value="lazer">Lazer</option>
                        <option className="bg-[#0D0E10]" value="transporte">Transporte</option>
                        <option className="bg-[#0D0E10]" value="saude">Saúde</option>
                    </select>
                </div>

                {/* Type Toggle */}
                <div className="bg-[#0D0E10] rounded-2xl p-1.5 border border-[#1A1C1E] flex">
                    <button
                        onClick={() => setType('Receita')}
                        className={`flex-1 py-3.5 rounded-xl text-[11px] font-display font-bold tracking-[0.15em] uppercase transition-all ${type === 'Receita' ? 'bg-primary text-black' : 'bg-[#222426] text-zinc-500'
                            }`}
                    >
                        Receita
                    </button>
                    <button
                        onClick={() => setType('Despesa')}
                        className={`flex-1 py-3.5 rounded-xl text-[11px] font-display font-bold tracking-[0.15em] uppercase transition-all ${type === 'Despesa' ? 'bg-primary text-black' : 'bg-[#222426] text-zinc-500'
                            }`}
                    >
                        Despesa
                    </button>
                </div>

                {/* Amount */}
                <div className="py-8">
                    <label className="text-[10px] font-display font-bold tracking-[0.2em] text-[#D6D6D6] uppercase mb-6 block text-center">VALOR DA META</label>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-baseline justify-center space-x-2 py-2 px-4">
                            <span className="text-primary text-2xl font-display font-bold" style={{ textShadow: '0 0 12px rgba(15, 182, 127, 0.4)' }}>R$</span>
                            <input
                                className="bg-transparent border-none p-0 text-primary text-5xl font-display font-bold text-center focus:ring-0 w-[220px]"
                                style={{ textShadow: '0 0 12px rgba(15, 182, 127, 0.4)' }}
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="h-[1px] w-32 bg-primary/40 mt-4" style={{ boxShadow: '0 0 20px rgba(15, 182, 127, 0.35)' }}></div>
                    </div>
                </div>

                {/* Period */}
                <div className="bg-[#0D0E10] rounded-2xl p-6 border border-[#1A1C1E]">
                    <label className="text-[10px] font-display font-bold tracking-[0.2em] text-[#D6D6D6] uppercase mb-3 block">PERÍODO</label>
                    <select
                        className="w-full bg-transparent border-none p-0 text-[#FCFCFC] text-lg font-medium focus:ring-0 appearance-none"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23FCFCFC' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                        }}
                    >
                        <option className="bg-[#0D0E10]" value="mensal">Mensal</option>
                        <option className="bg-[#0D0E10]" value="semanal">Semanal</option>
                        <option className="bg-[#0D0E10]" value="anual">Anual</option>
                        <option className="bg-[#0D0E10]" value="unico">Único</option>
                    </select>
                </div>

                {/* Footer */}
                <footer className="pt-10 flex flex-col items-center">
                    <div className="flex items-center space-x-2 opacity-30">
                        <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                        <p className="text-[8px] font-bold tracking-[0.4em] uppercase text-[#FCFCFC]">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>

            {/* Fixed Save Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent px-6 pt-12 pb-10 z-40">
                <button
                    onClick={handleSave}
                    className="w-full bg-primary text-black font-display font-bold py-5 rounded-2xl active:scale-[0.98] transition-all tracking-[0.2em] uppercase text-xs"
                    style={{ boxShadow: '0 0 15px rgba(15, 182, 127, 0.3)' }}
                >
                    SALVAR ORÇAMENTO
                </button>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] z-[100] flex items-center justify-center px-8">
                    <div className="bg-[#0D0E10] w-full max-w-sm rounded-[32px] p-8 border border-white/5 flex flex-col items-center text-center" style={{ boxShadow: '0 0 40px rgba(0, 0, 0, 0.8)' }}>
                        {/* Icon */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150"></div>
                            <div className="relative bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center border border-primary/20">
                                <span className="material-symbols-outlined text-primary text-5xl" style={{ textShadow: '0 0 15px rgba(15, 182, 127, 0.5)' }}>check_circle</span>
                            </div>
                        </div>

                        <h2 className="text-[#FCFCFC] font-display font-bold text-xl tracking-[0.15em] uppercase mb-4">
                            Orçamento Salvo!
                        </h2>
                        <p className="text-[#D6D6D6] text-sm leading-relaxed mb-8 px-2">
                            Sua nova meta de <span className="text-[#FCFCFC] font-semibold">{categoryLabels[category]}</span> foi configurada com sucesso.
                        </p>

                        {/* Details Card */}
                        <div className="w-full bg-black/40 rounded-2xl p-5 mb-10 border border-white/[0.03] space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-display font-bold tracking-[0.15em] text-zinc-500 uppercase">Valor</span>
                                <span className="text-primary font-display font-bold text-lg" style={{ textShadow: '0 0 15px rgba(15, 182, 127, 0.5)' }}>R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="h-px bg-white/5 w-full"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-display font-bold tracking-[0.15em] text-zinc-500 uppercase">Período</span>
                                <span className="text-[#FCFCFC] font-medium text-sm">{periodLabels[period]}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/budgets')}
                            className="w-full bg-primary text-black font-display font-bold py-5 rounded-2xl active:scale-[0.98] transition-all tracking-[0.15em] uppercase text-xs"
                            style={{ boxShadow: '0 8px 24px rgba(15, 182, 127, 0.35)' }}
                        >
                            Ir para Orçamentos
                        </button>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="mt-6 text-[10px] font-display font-bold tracking-[0.2em] text-zinc-600 uppercase hover:text-zinc-400 transition-colors"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
