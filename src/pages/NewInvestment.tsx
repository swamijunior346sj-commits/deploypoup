import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function NewInvestment() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Form States
    const [sliderValue, setSliderValue] = useState(30000);
    const [assetId, setAssetId] = useState('');
    const [broker, setBroker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const totalCost = useMemo(() => {
        const q = parseFloat(quantity) || 0;
        const p = parseFloat(price) || 0;
        return q * p;
    }, [quantity, price]);

    const handleSave = async () => {
        if (!user || !assetId || !quantity || !price) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        };

        setLoading(true);
        try {
            const { error } = await supabase.from('assets').insert([
                {
                    user_id: user.id,
                    name: assetId.toUpperCase(),
                    type: 'Renda Variável', // Default based on selects
                    current_value: totalCost,
                    purchase_date: new Date().toISOString().split('T')[0],
                    change_24h: 0,
                    broker: broker
                }
            ]);

            if (error) throw error;
            navigate('/analysis');
        } catch (error) {
            console.error('Error saving investment:', error);
            alert('Erro ao salvar investimento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-[#FCFCFC] font-sans flex flex-col min-h-screen selection:bg-primary/30 antialiased">
            <style>{`
                .custom-ring {
                    position: relative;
                    width: 280px;
                    height: 280px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(15, 182, 127, 0.05);
                    box-shadow: inset 0 0 20px rgba(15, 182, 127, 0.02);
                }
                .custom-ring::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    border-radius: 50%;
                    border: 1px solid transparent;
                    border-top-color: #0FB67F;
                    border-right-color: #0FB67F;
                    transform: rotate(-45deg);
                    filter: drop-shadow(0 0 8px rgba(15, 182, 127, 0.6));
                }
                .glow-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 2px;
                    background: rgba(15, 182, 127, 0.1);
                    border-radius: 999px;
                    outline: none;
                }
                .glow-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #0FB67F;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 0 20px 4px rgba(15, 182, 127, 0.6);
                    border: 1px solid #ffffff;
                }
                .slider-glow-track {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    height: 2px;
                    background: #0FB67F;
                    border-radius: 999px;
                    box-shadow: 0 0 12px rgba(15, 182, 127, 0.5);
                    pointer-events: none;
                    z-index: 0;
                }
            `}</style>

            <header className="flex items-center justify-between px-6 py-6 bg-black sticky top-0 z-50">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full transition-colors hover:bg-primary/5">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <h1 className="text-white text-lg font-semibold tracking-tight">Novo Investimento</h1>
                <div className="size-10"></div>
            </header>

            <main className="flex-1 px-6 pb-40 overflow-y-auto">
                <section className="flex flex-col items-center justify-center pt-8 pb-12">
                    <div className="custom-ring">
                        <div className="text-center">
                            <p className="text-[#D6D6D6] text-sm font-medium mb-1 uppercase tracking-widest opacity-60">Valor do Aporte</p>
                            <p className="text-white text-4xl tracking-tight font-light font-display">
                                R$ {sliderValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>

                    <div className="w-full max-w-[280px] mt-10 space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-zinc-700 text-[10px] font-bold uppercase tracking-tighter">R$ 0</span>
                            <span className="text-zinc-700 text-[10px] font-bold uppercase tracking-tighter">R$ 100k</span>
                        </div>
                        <div className="relative flex items-center">
                            <div className="slider-glow-track" style={{ width: `${(sliderValue / 100000) * 100}%` }}></div>
                            <input
                                class="glow-slider cursor-pointer z-10"
                                max="100000"
                                min="0"
                                step="500"
                                type="range"
                                value={sliderValue}
                                onChange={(e) => setSliderValue(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex justify-center">
                            <div className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                                <p className="text-primary text-[10px] font-semibold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                    Ajuste rápido de valor
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="space-y-6 max-w-md mx-auto">
                    {/* Asset Selection */}
                    <div className="space-y-2">
                        <label className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-60">Ativo</label>
                        <div className="relative group">
                            <select
                                value={assetId}
                                onChange={(e) => setAssetId(e.target.value)}
                                className="w-full h-14 border border-primary/20 bg-black rounded-2xl px-4 text-white appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option disabled value="">Selecionar Ativo</option>
                                <option value="petr4">PETR4 - Petrobras</option>
                                <option value="vale3">VALE3 - Vale</option>
                                <option value="itub4">ITUB4 - Itaú Unibanco</option>
                                <option value="bbas3">BBAS3 - Banco do Brasil</option>
                                <option value="btc">BTC - Bitcoin</option>
                                <option value="eth">ETH - Ethereum</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-4 text-zinc-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Broker Selection */}
                    <div className="space-y-2">
                        <label className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-60">Corretora</label>
                        <div className="relative group">
                            <select
                                value={broker}
                                onChange={(e) => setBroker(e.target.value)}
                                className="w-full h-14 border border-primary/20 bg-black rounded-2xl px-4 text-white appearance-none focus:outline-none focus:border-primary transition-all cursor-pointer"
                            >
                                <option disabled value="">Selecionar Corretora</option>
                                <option value="xp">XP Investimentos</option>
                                <option value="btg">BTG Pactual</option>
                                <option value="nu">Nubank / NuInvest</option>
                                <option value="inter">Inter Invest</option>
                                <option value="binance">Binance</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-4 text-zinc-500 pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-60">Quantidade</label>
                            <input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full h-14 border border-primary/20 bg-black rounded-2xl px-4 text-white focus:outline-none focus:border-primary transition-all placeholder:text-zinc-800"
                                placeholder="0"
                                type="number"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-[0.2em] ml-1 opacity-60">Preço Médio</label>
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-zinc-600 text-sm">R$</span>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full h-14 border border-primary/20 bg-black rounded-2xl pl-11 pr-4 text-white focus:outline-none focus:border-primary transition-all placeholder:text-zinc-800"
                                    placeholder="0,00"
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary Insight Card */}
                    <div className="border border-primary/10 bg-primary/[0.02] rounded-2xl p-6 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-widest opacity-60">Custo total estimado</span>
                            <span className="text-primary text-2xl font-display font-bold">
                                R$ {totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-lg">info</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Action */}
            <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-50">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-5 border border-primary text-white font-bold rounded-2xl hover:bg-primary/10 active:scale-[0.98] transition-all bg-transparent uppercase tracking-widest text-sm disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Confirmar Investimento'}
                    </button>
                </div>
            </footer>
        </div>
    );
}
