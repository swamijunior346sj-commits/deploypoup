import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PurchasedProduct {
    id: string;
    title: string;
    type: string;
    image: string;
    access_link: string;
    purchase_date: string;
}

interface PendingOrder {
    id: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: any[];
}

export default function Arsenal() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeProducts, setActiveProducts] = useState<PurchasedProduct[]>([]);
    const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
    const [tab, setTab] = useState<'ativos' | 'pendentes'>('ativos');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = activeProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchArsenalData = async () => {
            setLoading(true);
            try {
                // 1. Fetch all orders for this user
                const { data: orders, error: ordersError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (ordersError) throw ordersError;

                const approved = orders?.filter(o => o.status === 'approved') || [];
                const pending = orders?.filter(o => o.status === 'pending') || [];

                setPendingOrders(pending);

                // 2. Extract product IDs from approved orders to get latest access links
                const productIds = Array.from(new Set(
                    approved.flatMap(o => (o.items || []).map((i: any) => i.id))
                ));

                if (productIds.length > 0) {
                    const { data: products, error: prodError } = await supabase
                        .from('products')
                        .select('id, title, type, image, access_link')
                        .in('id', productIds);

                    if (prodError) throw prodError;

                    // Map products with their purchase date (latest order)
                    const arsenalItems: PurchasedProduct[] = products?.map(p => {
                        const latestOrder = approved.find(o =>
                            (o.items || []).some((item: any) => item.id === p.id)
                        );
                        return {
                            ...p,
                            purchase_date: latestOrder?.created_at || new Date().toISOString()
                        };
                    }) || [];

                    setActiveProducts(arsenalItems);
                }
            } catch (error) {
                console.error('Erro ao carregar arsenal:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArsenalData();
    }, [user, navigate]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-display selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <Header title="Meu Arsenal" showBack />

            <main className="flex-grow px-6 pt-8 pb-32 space-y-8 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Header Title ── */}
                <div className="space-y-1">
                    <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter premium-text-glow">Biblioteca de Elite</h2>
                    <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.3em]">Seus recursos tecnológicos e estratégicos</p>
                </div>

                {/* ── Search Bar ── */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-zinc-600 group-focus-within:text-primary transition-colors text-xl">search</span>
                    </div>
                    <input
                        type="search"
                        placeholder="BUSCAR NO ARSENAL..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-16 bg-zinc-950/60 border border-white/5 rounded-2xl pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                </div>

                {/* ── Tabs ── */}
                <div className="flex gap-4 p-1.5 bg-zinc-950/60 border border-white/5 rounded-2xl">
                    <button
                        onClick={() => setTab('ativos')}
                        className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${tab === 'ativos' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-500'}`}
                    >
                        Ativos Liberados ({activeProducts.length})
                    </button>
                    <button
                        onClick={() => setTab('pendentes')}
                        className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${tab === 'pendentes' ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-zinc-500'}`}
                    >
                        Sincronizações ({pendingOrders.length})
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 gap-4"
                        >
                            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest animate-pulse">Autenticando Arsenal...</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {tab === 'ativos' ? (
                                <>
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6">
                                            {filteredProducts.map((p) => (
                                                <motion.div
                                                    key={p.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-6 flex flex-col gap-6 group hover:border-primary/30 transition-all relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors"></div>

                                                    <div className="flex gap-6 items-start">
                                                        <div className="relative shrink-0">
                                                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                            <img src={p.image} className="w-20 h-20 rounded-3xl object-cover border border-white/10 relative z-10" alt="" />
                                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-zinc-950 border border-primary/20 rounded-xl flex items-center justify-center z-20">
                                                                <span className="material-symbols-outlined text-primary text-sm font-black">verified</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <span className="text-[8px] font-black text-primary uppercase tracking-[0.3em]">{p.type}</span>
                                                            <h4 className="text-lg font-black italic text-white uppercase group-hover:text-primary transition-colors leading-tight">{p.title}</h4>
                                                            <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">Adquirido em {new Date(p.purchase_date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-3 relative z-10">
                                                        <a
                                                            href={p.access_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all border-luxury active:scale-95"
                                                        >
                                                            <span className="material-symbols-outlined text-sm font-black">bolt</span>
                                                            Acessar Arsenal
                                                        </a>
                                                        <button className="w-14 h-14 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
                                                            <span className="material-symbols-outlined">share</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20 space-y-4">
                                            <div className="w-20 h-20 bg-zinc-900/50 rounded-[2rem] border border-dashed border-white/10 flex items-center justify-center mx-auto opacity-30">
                                                <span className="material-symbols-outlined text-3xl">token</span>
                                            </div>
                                            <div className="space-y-1">
                                                <h5 className="text-xs font-black text-zinc-600 uppercase tracking-widest">Silo Vazio</h5>
                                                <p className="text-[10px] text-zinc-700 font-bold max-w-[200px] mx-auto uppercase">Você ainda não adquiriu ativos de elite.</p>
                                            </div>
                                            <button
                                                onClick={() => navigate('/shop')}
                                                className="mt-4 px-8 py-3 bg-zinc-900 border border-white/5 rounded-xl text-[9px] font-black uppercase text-primary hover:bg-primary hover:text-black transition-all"
                                            >
                                                Explorar Arsenal
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-y-4">
                                    {pendingOrders.length > 0 ? (
                                        <>
                                            {pendingOrders.map((o) => (
                                                <div key={o.id} className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center group relative overflow-hidden">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                                            <span className="text-[10px] font-black text-white uppercase tracking-tight">Ordem #{o.id.slice(0, 8).toUpperCase()}</span>
                                                        </div>
                                                        <span className="text-[8px] text-zinc-600 font-black uppercase tracking-widest leading-none">
                                                            {o.items?.length || 0} Itens • {new Date(o.created_at).toLocaleDateString()}
                                                        </span>
                                                        <div className="mt-2 flex -space-x-2">
                                                            {o.items?.slice(0, 3).map((item: any, idx: number) => (
                                                                <img key={idx} src={item.image} className="w-6 h-6 rounded-full border border-black object-cover" alt="" title={item.title} />
                                                            ))}
                                                            {o.items?.length > 3 && (
                                                                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-black flex items-center justify-center text-[8px] font-black text-zinc-500">
                                                                    +{o.items.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-3">
                                                        <span className="text-primary font-black text-lg italic leading-none">R$ {Number(o.total_amount).toLocaleString('pt-BR')}</span>
                                                        <button
                                                            onClick={() => navigate('/payment', { state: { orderId: o.id } })}
                                                            className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[8px] font-black uppercase rounded-xl hover:bg-yellow-500 hover:text-black transition-all"
                                                        >
                                                            Finalizar Pix
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="text-center py-20 opacity-30">
                                            <span className="material-symbols-outlined text-3xl mb-4 text-zinc-500">sync_alt</span>
                                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Nenhuma sincronização pendente.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>

            {/* ── Help Button ── */}
            <div className="fixed bottom-8 left-0 right-0 px-6 z-[50]">
                <button className="w-full py-4 bg-zinc-900/80 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all group">
                    <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">support_agent</span>
                    Precisa de Ajuda com um Ativo?
                </button>
            </div>
        </div>
    );
}
