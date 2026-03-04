import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { useNotifications } from '../contexts/NotificationContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type AdminTab = 'products' | 'orders' | 'coupons' | 'users' | 'analytics' | 'broadcasts';

export default function Admin() {
    const navigate = useNavigate();
    const { profile } = useAuth();
    const { addNotification } = useNotifications();
    const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
    const [loading, setLoading] = useState(true);

    // Data states
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [coupons, setCoupons] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [broadcasts, setBroadcasts] = useState<any[]>([]);

    // Broadcast state
    const [newBroadcast, setNewBroadcast] = useState({ title: '', message: '', type: 'info' });
    const [sendingBroadcast, setSendingBroadcast] = useState(false);

    useEffect(() => {
        if (profile && profile.role !== 'admin') {
            navigate('/dashboard');
        }
    }, [profile, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'products') {
                const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
                setProducts(data || []);
            } else if (activeTab === 'orders') {
                const { data } = await supabase.from('orders').select('*, profiles(full_name, email)').order('created_at', { ascending: false });
                setOrders(data || []);
            } else if (activeTab === 'coupons') {
                const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
                setCoupons(data || []);
            } else if (activeTab === 'users') {
                const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
                setUsers(data || []);
            } else if (activeTab === 'analytics') {
                const { data: approvedOrders } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('status', 'approved')
                    .order('created_at', { ascending: true });

                if (approvedOrders) {
                    // Group by day for chart
                    const chartData: any[] = [];
                    const dailyMap: Record<string, number> = {};
                    let totalRevenue = 0;

                    approvedOrders.forEach(o => {
                        const day = new Date(o.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                        dailyMap[day] = (dailyMap[day] || 0) + Number(o.total_amount);
                        totalRevenue += Number(o.total_amount);
                    });

                    Object.entries(dailyMap).forEach(([name, value]) => {
                        chartData.push({ name, value });
                    });

                    setStats({
                        chartData,
                        totalRevenue,
                        orderCount: approvedOrders.length,
                        avgTicket: approvedOrders.length > 0 ? totalRevenue / approvedOrders.length : 0
                    });
                }
            } else if (activeTab === 'broadcasts') {
                const { data } = await supabase.from('broadcasts').select('*').order('created_at', { ascending: false }).limit(20);
                setBroadcasts(data || []);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    // Coupon creation state
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: 10, max_uses: 100 });

    const handleCreateCoupon = async () => {
        if (!newCoupon.code) return;
        const { error } = await supabase.from('coupons').insert([{
            code: newCoupon.code.toUpperCase(),
            discount_percent: newCoupon.discount,
            max_uses: newCoupon.max_uses,
            active: true
        }]);

        if (!error) {
            addNotification({ title: 'Ativo Gerado', message: `Cupom ${newCoupon.code.toUpperCase()} em vigor.`, type: 'success' });
            setShowCouponModal(false);
            setNewCoupon({ code: '', discount: 10, max_uses: 100 });
            fetchData();
        }
    };

    const handleUpdatePrice = async (id: string, newPrice: string) => {
        const { error } = await supabase.from('products').update({ price_string: newPrice }).eq('id', id);
        if (!error) {
            addNotification({ title: 'Sucesso', message: 'Preço atualizado no ecossistema.', type: 'success' });
            fetchData();
        }
    };

    const handleSendBroadcast = async () => {
        if (!newBroadcast.title || !newBroadcast.message) return;
        setSendingBroadcast(true);

        const { error } = await supabase.from('broadcasts').insert([{
            title: newBroadcast.title,
            message: newBroadcast.message,
            type: newBroadcast.type
        }]);

        if (!error) {
            addNotification({ title: 'Mensagem Enviada', message: 'Comunicado propagado para toda a rede.', type: 'success' });
            setNewBroadcast({ title: '', message: '', type: 'info' });
            fetchData();
        }
        setSendingBroadcast(false);
    };

    const handleDeleteCoupon = async (id: string) => {
        const { error } = await supabase.from('coupons').delete().eq('id', id);
        if (!error) {
            addNotification({ title: 'Removido', message: 'Oferta retirada do ecossistema.', type: 'info' });
            fetchData();
        }
    };

    const renderProducts = () => (
        <div className="space-y-6">
            {products.map((p) => (
                <div key={p.id} className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center">
                    <img src={p.image} className="w-20 h-20 rounded-2xl object-cover border border-white/10" alt="" />
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-white font-black italic uppercase tracking-tight">{p.title}</h4>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{p.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            defaultValue={p.price_string}
                            onBlur={(e) => handleUpdatePrice(p.id, e.target.value)}
                            className="bg-black/50 border border-white/5 rounded-xl px-4 py-2 text-primary font-black text-sm w-32 text-center focus:outline-none focus:border-primary/50"
                        />
                        <button className="p-3 bg-zinc-900 rounded-xl text-zinc-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const handleApproveOrder = async (id: string) => {
        const { error } = await supabase.from('orders').update({ status: 'approved' }).eq('id', id);
        if (!error) {
            addNotification({ title: 'Ordem Aprovada', message: 'Acesso liberado manualmente.', type: 'success' });
            fetchData();
        }
    };

    const renderOrders = () => (
        <div className="space-y-4">
            {orders.map((o) => (
                <div key={o.id} className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center group hover:border-primary/30 transition-all">
                    <div className="flex flex-col">
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-tight">#{o.id.slice(0, 8)}</span>
                        <span className="text-white font-black italic uppercase text-xs">{o.profiles?.full_name || 'Investidor'}</span>
                        <span className="text-[8px] text-zinc-600 font-bold mt-1 tracking-widest">{new Date(o.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <span className="text-primary font-black text-lg italic">R$ {Number(o.total_amount).toLocaleString('pt-BR')}</span>
                            <div className="flex items-center justify-end gap-1.5 mt-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${o.status === 'approved' ? 'bg-primary shadow-[0_0_8px_#0FB67F]' : 'bg-yellow-500 animate-pulse'}`}></span>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${o.status === 'approved' ? 'text-primary' : 'text-yellow-500'}`}>{o.status}</span>
                            </div>
                        </div>
                        {o.status !== 'approved' && (
                            <button
                                onClick={() => handleApproveOrder(o.id)}
                                className="w-10 h-10 bg-primary/10 text-primary rounded-xl border border-primary/20 hover:bg-primary hover:text-black transition-all"
                                title="Aprovar Manualmente"
                            >
                                <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCoupons = () => (
        <div className="space-y-4">
            <button
                onClick={() => setShowCouponModal(true)}
                className="w-full py-6 border-2 border-dashed border-white/5 rounded-[2rem] text-zinc-600 font-black text-[10px] uppercase tracking-[0.3em] hover:border-primary/40 hover:text-primary transition-all active:scale-[0.98] group"
            >
                <div className="flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined group-hover:scale-125 transition-transform">confirmation_number</span>
                    + Gerar Novo Cupom Estratégico
                </div>
            </button>
            {coupons.map((c) => (
                <div key={c.id} className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full"></div>
                    <div>
                        <span className="text-white font-black text-xl italic tracking-[0.2em] uppercase">{c.code}</span>
                        <p className="text-[9px] text-primary font-black uppercase tracking-widest mt-1">{c.discount_percent}% OFF</p>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="text-right">
                            <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest block mb-0.5">Uso do Ativo</span>
                            <span className="text-white text-xs font-black">{c.current_uses} / {c.max_uses}</span>
                        </div>
                        <button
                            onClick={() => handleDeleteCoupon(c.id)}
                            className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* ── Metric Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-primary">payments</span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Faturamento de Elite</span>
                    <h4 className="text-3xl font-black italic text-white premium-text-glow">R$ {stats?.totalRevenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                </div>
                <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-primary">shopping_cart_checkout</span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Conversões Reais</span>
                    <h4 className="text-3xl font-black italic text-white">{stats?.orderCount} <span className="text-xs text-zinc-500 not-italic">Ordens</span></h4>
                </div>
                <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl text-primary">trending_up</span>
                    </div>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block mb-2">Ticket Médio</span>
                    <h4 className="text-3xl font-black italic text-white">R$ {stats?.avgTicket?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h4>
                </div>
            </div>

            {/* ── Revenue Chart ── */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black italic uppercase tracking-tight text-white">Curva de Rendimento</h3>
                    <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">LIVE</span>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.chartData || []}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0FB67F" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0FB67F" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#444"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#666', fontWeight: 900 }}
                            />
                            <YAxis
                                stroke="#444"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#666', fontWeight: 900 }}
                                tickFormatter={(v) => `R$${v}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#09090b',
                                    border: '1px solid #ffffff10',
                                    borderRadius: '1.5rem',
                                    fontSize: '10px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase'
                                }}
                                itemStyle={{ color: '#0FB67F' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#0FB67F"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const renderBroadcasts = () => (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* ── Broadcast Form ── */}
            <div className="bg-zinc-950/40 border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xl font-black italic uppercase tracking-tight text-white">Centro de Transmissão</h3>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Enviar comunicado em massa para todos os estrategistas online</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Título do Aviso</label>
                        <input
                            type="text"
                            value={newBroadcast.title}
                            onChange={(e) => setNewBroadcast({ ...newBroadcast, title: e.target.value })}
                            placeholder="EX: MANUTENÇÃO AGENDADA"
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white font-black uppercase text-xs focus:border-primary/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Tipo de Alerta</label>
                        <select
                            value={newBroadcast.type}
                            onChange={(e) => setNewBroadcast({ ...newBroadcast, type: e.target.value })}
                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-primary font-black uppercase text-xs focus:border-primary/50"
                        >
                            <option value="info">INFORMATIVO (AZUL)</option>
                            <option value="success">SUCESSO (VERDE)</option>
                            <option value="warning">AVISO (AMARELO)</option>
                            <option value="error">CRÍTICO (VERMELHO)</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Corpo da Mensagem</label>
                    <textarea
                        value={newBroadcast.message}
                        onChange={(e) => setNewBroadcast({ ...newBroadcast, message: e.target.value })}
                        placeholder="Descreva o comunicado..."
                        rows={3}
                        className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-zinc-400 font-bold text-xs focus:border-primary/50 resize-none"
                    ></textarea>
                </div>

                <button
                    onClick={handleSendBroadcast}
                    disabled={sendingBroadcast || !newBroadcast.title || !newBroadcast.message}
                    className="w-full py-5 bg-primary text-black rounded-3xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(15,182,127,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 transition-all"
                >
                    <span className="material-symbols-outlined font-black">send</span>
                    {sendingBroadcast ? 'TRANSMITINDO...' : 'DISPARAR PARA TODOS'}
                </button>
            </div>

            {/* ── Recent Broadcasts ── */}
            <div className="space-y-4">
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] px-4">Histórico de Envios</h3>
                {broadcasts.map((b) => (
                    <div key={b.id} className="bg-zinc-950/20 border border-white/5 rounded-3xl p-6 flex items-center justify-between group">
                        <div className="flex gap-4 items-center">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.type === 'success' ? 'bg-primary/10 text-primary' :
                                    b.type === 'error' ? 'bg-red-500/10 text-red-500' :
                                        b.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-400'
                                }`}>
                                <span className="material-symbols-outlined text-sm">campaign</span>
                            </div>
                            <div>
                                <h5 className="text-xs font-black text-white uppercase italic">{b.title}</h5>
                                <p className="text-[9px] text-zinc-500 font-bold max-w-sm truncate">{b.message}</p>
                            </div>
                        </div>
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{new Date(b.created_at).toLocaleDateString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-display selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <Header title="Terminal Master" showBack />

            <main className="flex-grow px-6 pt-8 pb-32 space-y-8 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Tabs Navigation ── */}
                <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
                    {(['analytics', 'broadcasts', 'products', 'orders', 'coupons', 'users'] as AdminTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border ${activeTab === tab ? 'bg-primary text-black border-primary shadow-[0_10px_30px_rgba(15,182,127,0.3)]' : 'bg-zinc-950/60 text-zinc-500 border-white/5'}`}
                        >
                            {tab === 'analytics' && 'Analytics'}
                            {tab === 'broadcasts' && 'Avisos'}
                            {tab === 'products' && 'Inventário'}
                            {tab === 'orders' && 'Transações'}
                            {tab === 'coupons' && 'Marketing'}
                            {tab === 'users' && 'Estrategistas'}
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-4">Sincronizando Terminal...</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {activeTab === 'analytics' && renderAnalytics()}
                                {activeTab === 'broadcasts' && renderBroadcasts()}
                                {activeTab === 'products' && renderProducts()}
                                {activeTab === 'orders' && renderOrders()}
                                {activeTab === 'coupons' && renderCoupons()}
                                {activeTab === 'users' && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {users.map(u => (
                                            <div key={u.id} className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5">
                                                        <span className="material-symbols-outlined text-zinc-500">person</span>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-black text-white italic">{u.full_name || 'Sem Nome'}</h5>
                                                        <p className="text-[10px] text-zinc-500 font-bold">{u.email}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${u.role === 'admin' ? 'border-primary/20 text-primary bg-primary/5' : 'border-white/5 text-zinc-500'}`}>
                                                    {u.role}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </main>

            {/* ── Coupon Modal ── */}
            <AnimatePresence>
                {showCouponModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCouponModal(false)}></div>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative w-full max-w-sm bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                        >
                            <div className="space-y-2">
                                <h3 className="text-xl font-black italic uppercase tracking-tight text-white">Novo Cupom</h3>
                                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Defina a estratégia de desconto</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Código (EX: ELITE20)</label>
                                    <input
                                        type="text"
                                        value={newCoupon.code}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                                        className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white font-black tracking-widest uppercase focus:border-primary/50 transition-colors"
                                        placeholder="CÓDIGO"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">% Desconto</label>
                                        <input
                                            type="number"
                                            value={newCoupon.discount}
                                            onChange={(e) => setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) })}
                                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-primary font-black focus:border-primary/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Limite Usos</label>
                                        <input
                                            type="number"
                                            value={newCoupon.max_uses}
                                            onChange={(e) => setNewCoupon({ ...newCoupon, max_uses: parseInt(e.target.value) })}
                                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white font-black"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowCouponModal(false)}
                                    className="flex-1 py-4 text-[9px] font-black uppercase text-zinc-500 tracking-widest"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateCoupon}
                                    className="flex-grow py-4 bg-primary text-black rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(15,182,127,0.2)]"
                                >
                                    Ativar Oferta
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
