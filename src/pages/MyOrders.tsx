import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { allProducts } from './Shop';

interface Order {
    id: string;
    total_amount: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    items: any[];
}

export default function MyOrders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    navigate('/login');
                    return;
                }

                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrders(data || []);
            } catch (err) {
                console.error('Erro ao buscar pedidos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const handleAccess = (item: any) => {
        // Try to get link from item (order snapshot), fall back to catalog
        const link = item.accessLink || allProducts.find(p => p.id === item.id)?.accessLink;

        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        } else {
            alert('Estamos preparando seu acesso. Você receberá um e-mail em breve!');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <Header title="Meus Pedidos" showBack />

            <main className="flex-grow px-6 pt-8 pb-32 space-y-8 relative z-10 overflow-y-auto no-scrollbar">

                <div className="space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Histórico de Aquisição</span>
                    <h2 className="text-2xl font-black italic text-white uppercase tracking-tight">Arsenal Adquirido</h2>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 space-y-4"
                        >
                            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Sincronizando Ordens...</p>
                        </motion.div>
                    ) : orders.length > 0 ? (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] overflow-hidden group transition-all hover:border-primary/20"
                                >
                                    {/* Order Header (ML Style) */}
                                    <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Protocolo</span>
                                            <span className="text-[10px] font-black text-white uppercase truncate max-w-[120px]">#{order.id.slice(0, 8)}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Status</span>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'approved' ? 'bg-primary shadow-[0_0_8px_#0FB67F]' : 'bg-yellow-500 animate-pulse'}`}></span>
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${order.status === 'approved' ? 'text-primary' : 'text-yellow-500'}`}>
                                                    {order.status === 'approved' ? 'Aprovado' : 'Pendente'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <div className="p-6 space-y-6">
                                        <div className="space-y-4">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex gap-4 items-center group/item">
                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0">
                                                        <img src={item.image} className="w-full h-full object-cover opacity-60" alt={item.title} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-[11px] font-black text-white uppercase italic truncate">{item.title}</h4>
                                                        <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-none">{item.author}</p>
                                                    </div>
                                                    {order.status === 'approved' && (
                                                        <button
                                                            onClick={() => handleAccess(item)}
                                                            className="h-10 px-4 bg-primary/10 border border-primary/20 hover:bg-primary hover:text-black rounded-xl text-[8px] font-black uppercase tracking-widest transition-all shrink-0"
                                                        >
                                                            Acessar
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total da Ordem</span>
                                                <span className="text-xl font-black italic text-white premium-text-glow leading-none">R$ {Number(order.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString('pt-BR')}</span>
                                                {order.status !== 'approved' && (
                                                    <button
                                                        onClick={() => navigate('/payment')}
                                                        className="px-6 py-2 bg-zinc-900 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-widest rounded-xl active:scale-95 transition-all"
                                                    >
                                                        Concluir Pagamento
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                        >
                            <div className="w-24 h-24 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                                <span className="material-symbols-outlined text-zinc-800 text-5xl relative z-10">receipt_long</span>
                            </div>
                            <div className="space-y-2 px-8">
                                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Nenhum Registro</h3>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Você ainda não iniciou nenhum protocolo de aquisição em nosso terminal.</p>
                            </div>
                            <button
                                onClick={() => navigate('/shop')}
                                className="px-10 py-4 bg-primary text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_15px_30px_rgba(15,182,127,0.2)] transition-all"
                            >
                                Explorar Arsenal
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
