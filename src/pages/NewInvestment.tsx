import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionPopup from '../components/ActionPopup';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function NewInvestment() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshData } = useData();
    const [amount, setAmount] = useState(100);
    const [selectedAsset, setSelectedAsset] = useState('PETR4');
    const [selectedBroker, setSelectedBroker] = useState('NuInvest');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Manual inputs
    const [isManualAsset, setIsManualAsset] = useState(false);
    const [manualAssetName, setManualAssetName] = useState('');
    const [isManualBroker, setIsManualBroker] = useState(false);
    const [manualBrokerName, setManualBrokerName] = useState('');

    const assets = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'WEGE3', 'BTC', 'ETH', 'Tesouro Selic 2026', 'CDB Inter 102%'];
    const brokers = ['NuInvest', 'XP Investimentos', 'BTG Pactual', 'Inter', 'Binance', 'Bitybank'];

    const totalCost = useMemo(() => {
        const q = parseFloat(quantity.replace(',', '.')) || 0;
        const p = parseFloat(price.replace(',', '.')) || 0;
        return q * p;
    }, [quantity, price]);

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const finalAsset = isManualAsset ? manualAssetName : selectedAsset;
            const finalBroker = isManualBroker ? manualBrokerName : selectedBroker;
            const finalQuantity = parseFloat(quantity.replace(',', '.')) || 0;
            const finalPrice = parseFloat(price.replace(',', '.')) || 0;

            const { error } = await supabase.from('assets').insert([
                {
                    user_id: user.id,
                    symbol: finalAsset,
                    name: finalAsset,
                    type: finalAsset.includes('CDB') || finalAsset.includes('Tesouro') ? 'Renda Fixa' : (finalAsset.length <= 6 ? 'Renda Variável' : 'Outros'),
                    amount: finalQuantity * finalPrice,
                    quantity: finalQuantity,
                    avg_price: finalPrice,
                    broker: finalBroker,
                    purchase_date: new Date().toISOString()
                }
            ]);

            if (error) throw error;
            await refreshData();
            setShowSuccess(true);
        } catch (err) {
            console.error('Error saving investment:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-[#fcfcfc] font-sans min-h-screen flex flex-col">
            <header className="px-6 pt-14 pb-4 flex items-center sticky top-0 bg-black/95 backdrop-blur-xl z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="flex-grow text-center text-xs font-display font-bold tracking-[0.3em] uppercase text-[#fcfcfc] pr-8">Novo Investimento</h1>
            </header>

            <main className="flex-grow px-6 space-y-12 pb-32 pt-8 overflow-y-auto no-scrollbar">
                {/* Visual Amount Slider */}
                <div className="space-y-8 flex flex-col items-center">
                    <div className="text-center">
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-500 mb-2 block">Valor Previsto</span>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-xl font-display font-bold text-primary">R$</span>
                            <span className="text-5xl font-display font-bold text-[#fcfcfc]">{amount.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
                        </div>
                    </div>

                    <div className="w-full max-w-sm px-4 space-y-4">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            step="5"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                            <span>Mínimo R$0</span>
                            <span>Máximo R$10k</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Seção de Ativo */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Ativo</label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <span className={`text-[8px] font-bold uppercase transition-colors ${isManualAsset ? 'text-primary' : 'text-zinc-600'}`}>Manual</span>
                                <div className="relative inline-block w-8 h-4">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isManualAsset}
                                        onChange={() => setIsManualAsset(!isManualAsset)}
                                    />
                                    <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-full peer peer-checked:bg-primary/20 peer-checked:border-primary/40 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-700 peer-checked:after:bg-primary after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                                </div>
                            </label>
                        </div>

                        {isManualAsset ? (
                            <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-4">
                                <input
                                    type="text"
                                    placeholder="Digite o nome do ativo"
                                    className="w-full bg-transparent border-none text-white font-medium p-0 focus:ring-0 placeholder:text-zinc-700"
                                    value={manualAssetName}
                                    onChange={(e) => setManualAssetName(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
                                {assets.map((asset) => (
                                    <button
                                        key={asset}
                                        onClick={() => setSelectedAsset(asset)}
                                        className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-bold border transition-all active:scale-95 ${selectedAsset === asset
                                            ? 'bg-primary border-primary text-black'
                                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'
                                            }`}
                                    >
                                        {asset}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setIsManualAsset(true)}
                                    className="flex-shrink-0 w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Custódia / Corretora */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Instituição</label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <span className={`text-[8px] font-bold uppercase ${isManualBroker ? 'text-primary' : 'text-zinc-600'}`}>Manual</span>
                                <div className="relative inline-block w-8 h-4">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isManualBroker}
                                        onChange={() => setIsManualBroker(!isManualBroker)}
                                    />
                                    <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-full peer peer-checked:bg-primary/20 peer-checked:border-primary/40 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-700 peer-checked:after:bg-primary after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                                </div>
                            </label>
                        </div>

                        {isManualBroker ? (
                            <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-4">
                                <input
                                    type="text"
                                    placeholder="Nome da Corretora ou Banco"
                                    className="w-full bg-transparent border-none text-white font-medium p-0 focus:ring-0 placeholder:text-zinc-700"
                                    value={manualBrokerName}
                                    onChange={(e) => setManualBrokerName(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-1">
                                {brokers.map((broker) => (
                                    <button
                                        key={broker}
                                        onClick={() => setSelectedBroker(broker)}
                                        className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-bold border transition-all active:scale-95 ${selectedBroker === broker
                                            ? 'bg-primary border-primary text-black'
                                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-400'
                                            }`}
                                    >
                                        {broker}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setIsManualBroker(true)}
                                    className="flex-shrink-0 w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Quantidade e Preço */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6">
                            <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Qtd Comprada</label>
                            <input
                                className="w-full bg-transparent border-none p-0 text-xl font-display font-bold focus:ring-0 placeholder:text-zinc-800"
                                type="text"
                                placeholder="0.00"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6">
                            <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Preço Pago (Un)</label>
                            <input
                                className="w-full bg-transparent border-none p-0 text-xl font-display font-bold focus:ring-0 placeholder:text-zinc-800"
                                type="text"
                                placeholder="R$ 0,00"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <Card className="p-6 bg-primary/5 border-primary/20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">receipt_long</span>
                            </div>
                            <div>
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Custo Total</p>
                                <p className="text-xl font-display font-bold text-primary">R$ {totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-primary/30">info</span>
                    </Card>
                </div>

                <div className="pt-4  mb-10">
                    <button
                        onClick={handleSave}
                        disabled={loading || !quantity || !price}
                        className={`w-full py-5 bg-primary rounded-2xl text-black font-display font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(15,182,127,0.2)] ${loading ? 'opacity-50' : 'hover:bg-primary/90'}`}
                    >
                        {loading ? 'Processando...' : 'Confirmar Investimento'}
                    </button>
                </div>
            </main>

            <ActionPopup
                isOpen={showSuccess}
                title="Parabéns!"
                description="Novo investimento criado com sucesso. Seu patrimônio agradece!"
                confirmText="Ver Minha Carteira"
                type="success"
                onConfirm={() => navigate('/investments')}
                onCancel={() => setShowSuccess(false)}
            />
        </div>
    );
}
