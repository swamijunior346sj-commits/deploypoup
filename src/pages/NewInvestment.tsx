import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';

export default function NewInvestment() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshData, addXP } = useData();

    const [amount, setAmount] = useState(1);
    const [assetType, setAssetType] = useState('Renda Variável');
    const [symbol, setSymbol] = useState('');
    const [broker, setBroker] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const assetCategories = [
        { name: 'Renda Fixa', icon: 'account_balance', color: 'text-primary', bg: 'bg-primary/5' },
        { name: 'Renda Variável', icon: 'trending_up', color: 'text-blue-500', bg: 'bg-blue-500/5' },
        { name: 'FIIs', icon: 'apartment', color: 'text-purple-500', bg: 'bg-purple-500/5' },
        { name: 'Cripto', icon: 'currency_bitcoin', color: 'text-amber-500', bg: 'bg-amber-500/5' },
    ];

    const totalCalculated = useMemo(() => {
        const p = parseFloat(price.replace(',', '.')) || 0;
        const q = parseFloat(quantity.replace(',', '.')) || 0;
        return p * q;
    }, [price, quantity]);

    const handleSave = async () => {
        if (!user || !symbol || !price || !quantity) return;
        setLoading(true);
        try {
            const p = parseFloat(price.replace(',', '.')) || 0;
            const q = parseFloat(quantity.replace(',', '.')) || 0;

            const { error } = await supabase.from('assets').insert([
                {
                    user_id: user.id,
                    symbol: symbol.toUpperCase(),
                    name: symbol.toUpperCase(),
                    type: assetType,
                    amount: p * q,
                    quantity: q,
                    avg_price: p,
                    broker: broker || 'Padrão',
                    purchase_date: new Date().toISOString()
                }
            ]);

            if (error) throw error;

            await addXP(150); // High XP for investing
            await refreshData();
            setShowSuccess(true);
        } catch (err) {
            console.error('Error saving investment:', err);
            alert('Erro ao registrar aporte estratégico.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <Header showBack title="Aporte Estratégico" />

            <main className="flex-grow px-6 pt-4 pb-32 relative z-10 space-y-12">
                {/* ── Gamified Hero Indicator ── */}
                <div className="flex flex-col items-center py-8 text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center relative shadow-2xl overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined text-4xl text-white relative z-10">rocket_launch</span>
                    </motion.div>
                    <div className="space-y-1">
                        <h2 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">Novo Alocamento</h2>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-light text-zinc-500">R$</span>
                            <span className="text-5xl font-display font-black tracking-tighter premium-text-glow">
                                {totalCalculated.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Asset Type Selection (Gamified Cards) ── */}
                <div className="space-y-4">
                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] px-2">Eixo do Ativo</label>
                    <div className="grid grid-cols-2 gap-4">
                        {assetCategories.map((cat) => (
                            <motion.button
                                key={cat.name}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setAssetType(cat.name)}
                                className={`p-6 rounded-[2rem] border transition-all duration-500 flex flex-col items-center gap-3 relative overflow-hidden ${assetType === cat.name
                                        ? `bg-black border-primary shadow-[0_0_30px_rgba(15,182,127,0.15)]`
                                        : 'bg-zinc-950/40 border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                                    }`}
                            >
                                {assetType === cat.name && (
                                    <motion.div layoutId="active-bg" className="absolute inset-0 bg-primary/5 z-0" />
                                )}
                                <span className={`material-symbols-outlined text-2xl relative z-10 ${cat.color}`}>{cat.icon}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest relative z-10">{cat.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* ── Inputs Card ── */}
                <div className="transparent-card-border rounded-[2.5rem] p-8 space-y-10 bg-zinc-950/20">
                    <div className="space-y-4">
                        <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] block px-1">Ticker / Identificador</label>
                        <input
                            className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-2xl font-display font-bold text-white focus:ring-0 focus:border-primary transition-colors placeholder:text-zinc-900"
                            type="text"
                            placeholder="EX: PETR4, BTC..."
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] block px-1">Cotação Atual</label>
                            <div className="flex items-center border-b border-white/5 pb-4">
                                <span className="text-zinc-700 font-bold mr-2">R$</span>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-xl font-bold text-white focus:ring-0"
                                    type="text"
                                    placeholder="0,00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] block px-1">Volumetria</label>
                            <div className="flex items-center border-b border-white/5 pb-4">
                                <span className="text-zinc-700 font-bold mr-2">Qtd</span>
                                <input
                                    className="w-full bg-transparent border-none p-0 text-xl font-bold text-white focus:ring-0"
                                    type="text"
                                    placeholder="0.00"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] block px-1">Instituição de Custódia</label>
                        <input
                            className="w-full bg-transparent border-none border-b border-white/5 pb-4 text-[15px] font-medium text-white focus:ring-0 placeholder:text-zinc-800"
                            type="text"
                            placeholder="Ex: XP, BTG, Binance..."
                            value={broker}
                            onChange={(e) => setBroker(e.target.value)}
                        />
                    </div>
                </div>

                {/* ── Submit Section ── */}
                <div className="pt-8 pb-12">
                    <button
                        onClick={handleSave}
                        disabled={loading || !symbol || !price || !quantity}
                        className={`w-full h-18 rounded-[2.2rem] bg-white text-black font-black tracking-[0.4em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading ? 'opacity-50' : 'hover:bg-primary hover:shadow-[0_20px_40px_rgba(15,182,127,0.2)]'}`}
                    >
                        {loading ? 'Sincronizando...' : 'Confirmar Alocamento'}
                    </button>
                </div>
            </main>

            {/* ── PREMIUM SUCCESS POPUP ── */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-8"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl"></div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="relative w-full max-w-sm transparent-card-border rounded-[3.5rem] bg-zinc-950 p-12 text-center border-primary/20 shadow-[0_0_80px_rgba(15,182,127,0.1)] overflow-hidden"
                        >
                            {/* Animated Particles in Background */}
                            <div className="absolute inset-0 pointer-events-none opacity-20">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 blur-[60px] rounded-full" />
                                <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full" />
                            </div>

                            <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/30 shadow-[0_0_30px_rgba(15,182,127,0.1)] relative z-10">
                                <span className="material-symbols-outlined text-5xl text-primary font-black animate-bounce">verified</span>
                            </div>

                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2 relative z-10">
                                Missa Cumprida
                            </h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] leading-relaxed mb-10 relative z-10">
                                Ativo {symbol.toUpperCase()} integrado ao seu<br />patrimônio de elite.
                            </p>

                            <div className="space-y-4 relative z-10">
                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">+150 XP de Estrategista</span>
                                </div>
                                <button
                                    onClick={() => navigate('/investments')}
                                    className="w-full py-5 rounded-2xl bg-white text-black font-black text-[10px] tracking-[0.3em] uppercase active:scale-95 transition-all shadow-xl"
                                >
                                    Visualizar Carteira
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
