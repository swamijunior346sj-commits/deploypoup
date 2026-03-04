import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { useNotifications } from '../contexts/NotificationContext';
import { useData } from '../contexts/DataContext';

export const allProducts = [
    // E-Books
    { id: '1', title: 'Dominando Investimentos', author: 'POUP Intelligence', type: 'E-Book', price: 'R$ 49,90', originalPrice: 'R$ 89,90', image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=400', tag: 'Mais Vendido', description: 'O guia definitivo para quem deseja sair do zero e construir um patrimônio sólido através de estratégias testadas.', rating: '4.9', reviews: '1.2k', pages: '184', published: '2023', delivery: 'Envio Imediato', accessLink: 'https://drive.google.com/poup-ebook-investimentos' },
    { id: '4', title: 'Mindset Milionário', author: 'Thiago Nigro', type: 'E-Book', price: 'R$ 39,90', originalPrice: 'R$ 59,90', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400', description: 'Aprenda a pensar como os grandes investidores e mude sua relação com o dinheiro para sempre.', rating: '4.8', reviews: '850', pages: '210', published: '2022', delivery: 'Envio Imediato', accessLink: 'https://drive.google.com/poup-ebook-mindset' },

    // Cursos
    { id: '2', title: 'Masterclass: Criptoeconomia', author: 'Especialista Convidado', type: 'Curso', price: 'R$ 297,00', originalPrice: 'R$ 597,00', image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400', tag: 'Lançamento', description: 'Mergulhe no mundo das criptomoedas, DEFI e Web3 com quem realmente entende do mercado.', rating: '5.0', reviews: '320', pages: '12 Módulos', published: '2024', delivery: 'Acesso Vitalício', accessLink: 'https://poupe-academy.com/crypto-masterclass' },

    // Ferramentas
    { id: '3', title: 'Planilha de Ativos Black', author: 'POUP Pro', type: 'Ferramenta', price: 'R$ 29,90', originalPrice: 'R$ 69,90', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400', description: 'O dashboard mais completo para controlar seus investimentos em ações, FIIs e Exterior.', rating: '4.9', reviews: '2.3k', pages: 'Excel/Google Sheets', published: 'V2.4', delivery: 'Download Imediato', accessLink: 'https://docs.google.com/spreadsheets/poup-black-sheet' },

    // Mentorias
    { id: '11', title: 'Individual: 1 Mi', author: 'Founder POUP', type: 'Mentoria', price: 'R$ 2.497,00', originalPrice: 'R$ 4.997,00', image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d26c?auto=format&fit=crop&q=80&w=400', description: 'Atendimento exclusivo via Zoom para desenhar seu plano rumo ao primeiro milhão investido.', rating: '5.0', reviews: '95', pages: '4 Encontros', published: 'Vagas Limitadas', delivery: 'Agendamento', accessLink: 'https://zoom.us/j/poup-exclusive' },

    // Physical Books
    { id: 'pb1', title: 'A Jornada do Investidor', author: 'POUP Press', type: 'Livro Físico', price: 'R$ 89,90', originalPrice: 'R$ 120,00', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400', description: 'Edição de luxo com capa dura e ilustrações exclusivas sobre o mercado financeiro.', rating: '5.0', reviews: '150', pages: '420', published: '2024', delivery: 'Frete Grátis', accessLink: 'https://poup.com.br/rastreio/pb1' },

    // Networking
    { id: '13', title: 'Acesso VIP: Platinum', author: 'POUP Networking', type: 'Networking', price: 'R$ 1.200,00', originalPrice: 'R$ 2.000,00', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400', description: 'O clube de benefícios mais exclusivo do Brasil para investidores profissionais e HNWI.', rating: '5.0', reviews: '55', pages: 'Vitalício', published: 'VIP', delivery: 'Acesso Imediato', accessLink: 'https://discord.gg/poup-platinum' },
];

export default function Shop() {
    const navigate = useNavigate();
    const { unreadCount } = useNotifications();
    const { xp, level, levelName, currentMaxXP } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(() => {
        const saved = localStorage.getItem('poup_cart');
        return saved ? JSON.parse(saved).length : 0;
    });

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [shippingAddress, setShippingAddress] = useState(() => {
        const saved = localStorage.getItem('poup_shipping_address');
        return saved ? JSON.parse(saved) : null;
    });

    // Address Form State
    const [addressForm, setAddressForm] = useState({
        cep: shippingAddress?.cep || '',
        street: shippingAddress?.street || '',
        number: shippingAddress?.number || '',
        complement: shippingAddress?.complement || '',
        neighborhood: shippingAddress?.neighborhood || '',
        city: shippingAddress?.city || '',
        state: shippingAddress?.state || ''
    });

    const handleSaveAddress = () => {
        setShippingAddress(addressForm);
        localStorage.setItem('poup_shipping_address', JSON.stringify(addressForm));
        setIsAddressModalOpen(false);
    };

    const categories = [
        { id: 'courses', name: 'Cursos', icon: 'school', color: 'text-blue-500', path: '/courses' },
        { id: 'mentorship', name: 'Mentorias', icon: 'diversity_3', color: 'text-purple-500', path: '/mentorships' },
        { id: 'ebooks', name: 'E-Books', icon: 'menu_book', color: 'text-primary', path: '/ebooks' },
        { id: 'books', name: 'Livros', icon: 'auto_stories', color: 'text-orange-500', path: '/physical-books' },
        { id: 'tools', name: 'Ferramentas', icon: 'construction', color: 'text-yellow-500', path: '/tools' },
        { id: 'networking', name: 'Conexões', icon: 'hub', color: 'text-cyan-500', path: '/networking' },
        { id: 'offers', name: 'Ofertas', icon: 'percent', color: 'text-red-500', path: '/all-products' },
    ];

    const flashDeals = allProducts.slice(0, 4);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            {/* ── Dynamic Header (ML Style) ── */}
            <header className="sticky top-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 pt-4 pb-4 space-y-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-black font-black">shopping_bag</span>
                        </div>
                        <div>
                            <h1 className="text-xs font-black text-white uppercase tracking-[0.2em] leading-none mb-1">Poup</h1>
                            <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] leading-none">Shop</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative group/orders"
                            title="Histórico de Pedidos"
                        >
                            <span className="material-symbols-outlined text-xl text-zinc-400 group-hover/orders:text-primary transition-colors">receipt_long</span>
                        </button>
                        <button
                            onClick={() => navigate('/notifications')}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative"
                        >
                            <span className="material-symbols-outlined text-xl text-zinc-400">notifications</span>
                            {unreadCount > 0 && (
                                <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-black animate-pulse shadow-[0_0_8px_#EF4444]"></div>
                            )}
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative"
                        >
                            <span className="material-symbols-outlined text-xl text-zinc-400">shopping_cart</span>
                            {cartCount > 0 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-black text-[9px] font-black rounded-full flex items-center justify-center border-2 border-black">
                                    {cartCount}
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center bg-zinc-900/50 border border-white/10 rounded-2xl px-4 py-3 group-focus-within:border-primary/50 transition-all duration-300">
                        <span className="material-symbols-outlined text-zinc-500 mr-3">search</span>
                        <input
                            type="text"
                            placeholder="Buscar cursos, mentorias, ebooks..."
                            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-zinc-600 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="material-symbols-outlined text-zinc-500 ml-2 cursor-pointer hover:text-primary">mic</span>
                    </div>
                </div>

                {/* Location/Status Bar */}
                <button
                    onClick={() => setIsAddressModalOpen(true)}
                    className="flex items-center justify-between w-full px-1 group"
                >
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-primary group-hover:animate-bounce">location_on</span>
                        <div className="flex flex-col text-left">
                            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-tight">Enviar para</span>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest truncate max-w-[200px]">
                                {shippingAddress?.street ? `${shippingAddress.street}, ${shippingAddress.number}` : 'Escolher endereço'}
                            </span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-xs text-zinc-600 group-hover:text-primary transition-colors">chevron_right</span>
                </button>
            </header>

            <main className="flex-grow pb-32 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Category Horizontal Scroller ── */}
                <section className="py-6 overflow-hidden">
                    <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-2">
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(cat.path)}
                                className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-[1.5rem] bg-zinc-900/50 border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-all duration-300 relative`}>
                                    <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-5 blur-xl transition-opacity ${cat.color}`}></div>
                                    <span className={`material-symbols-outlined text-3xl ${cat.color} group-hover:scale-110 transition-transform`}>{cat.icon}</span>
                                </div>
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.1em] group-hover:text-white transition-colors">{cat.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Hero Carousel (ML Banner Style) ── */}
                <section className="px-4 mb-8">
                    <div className="relative h-60 rounded-[2.5rem] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] linear"
                            alt="Hero Banner"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                            <div className="space-y-1">
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3].map(i => <div key={i} className={`h-1 rounded-full transition-all ${i === 1 ? 'w-6 bg-primary' : 'w-2 bg-white/20'}`}></div>)}
                                </div>
                                <span className="px-3 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-[0.3em] rounded-lg">Exclusivo</span>
                                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-none">
                                    Arsenal do <br />Investidor
                                </h3>
                                <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest opacity-80">Mentoria VIP com os mestres da POUP</p>
                            </div>
                            <button className="px-6 py-3 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-primary transition-colors">
                                Aproveitar
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── User Level / Gamification Card (ML Points Style) ── */}
                <section className="px-4 mb-10">
                    <div
                        onClick={() => navigate('/missions')}
                        className="bg-gradient-to-r from-zinc-900 to-black border border-white/5 rounded-[2rem] p-5 flex items-center justify-between cursor-pointer active:scale-95 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-primary/50 p-1">
                                <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center font-black text-primary italic text-xs">L{level}</div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{levelName}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary shadow-[0_0_8px_#0FB67F] transition-all duration-1000"
                                            style={{ width: `${(xp / currentMaxXP) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[8px] font-bold text-zinc-500">{xp} / {currentMaxXP} XP</span>
                                </div>
                            </div>
                        </div>
                        <button className="flex flex-col items-center">
                            <span className="material-symbols-outlined text-primary text-2xl">loyalty</span>
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Benefícios</span>
                        </button>
                    </div>
                </section>

                {/* ── Flash Deals / Ofertas Relâmpago ── */}
                <section className="space-y-4 mb-10">
                    <div className="flex items-center justify-between px-6">
                        <div className="flex items-center gap-2">
                            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic">Ofertas Relâmpago</h3>
                            <div className="bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">timer</span>
                                <span>02:45:12</span>
                            </div>
                        </div>
                        <button className="text-[9px] font-black text-primary uppercase tracking-widest" onClick={() => navigate('/all-products')}>Ver Todas</button>
                    </div>

                    <div className="flex overflow-x-auto no-scrollbar gap-4 px-6">
                        {flashDeals.map((product) => (
                            <motion.div
                                key={product.id}
                                onClick={() => navigate(`/product-details/${product.id}`)}
                                className="w-44 shrink-0 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden group cursor-pointer hover:border-primary/20 transition-all"
                            >
                                <div className="aspect-square relative overflow-hidden bg-zinc-800">
                                    <img src={product.image} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                                    {product.tag && (
                                        <div className="absolute top-4 left-4 bg-primary text-black text-[7px] font-black px-2 py-1 rounded uppercase tracking-widest z-10">
                                            {product.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 space-y-2">
                                    <h4 className="text-[10px] font-bold text-zinc-300 uppercase truncate">{product.title}</h4>
                                    <div className="space-y-0.5">
                                        <span className="text-[8px] text-zinc-500 line-through">{product.originalPrice}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-white italic">{product.price}</span>
                                            <span className="text-[8px] font-black text-primary italic">50% OFF</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-[8px] font-bold text-primary uppercase tracking-tighter">
                                        <span className="material-symbols-outlined text-[10px] filled">bolt</span>
                                        <span>Full Delivery</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Main Feed / masonry-ish grid ── */}
                <section className="px-4 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">Inspirado no seu histórico</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {allProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product-details/${product.id}`)}
                                className="bg-zinc-950/20 border border-white/5 rounded-[2.5rem] p-4 flex flex-col group cursor-pointer hover:border-primary/30 transition-all"
                            >
                                <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-900 mb-4">
                                    <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" alt={product.title} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[7px] font-black text-primary uppercase tracking-widest">{product.type}</span>
                                        <span className="text-[7px] text-zinc-600">•</span>
                                        <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">{product.author}</span>
                                    </div>
                                    <h4 className="text-xs font-black text-white italic uppercase tracking-tight line-clamp-2 leading-tight h-8">{product.title}</h4>
                                    <div className="pt-2 flex items-center justify-between">
                                        <div>
                                            <span className="text-sm font-black italic text-white premium-text-glow">{product.price}</span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <span className="material-symbols-outlined text-[10px] text-yellow-500 filled">star</span>
                                            <span className="text-[9px] font-black text-zinc-400">{product.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 opacity-60 italic">{product.delivery}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Loyalty / Advertisement ── */}
                <section className="px-4 mt-12 mb-20">
                    <div className="relative rounded-[3rem] p-10 bg-gradient-to-br from-primary/20 via-zinc-950 to-zinc-950 border border-primary/20 overflow-hidden text-center group cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(15,182,127,0.4)] mb-6 rotate-3 group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-black font-black">diamond</span>
                            </div>
                            <h5 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Comunidade Elite</h5>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest opacity-60 mb-8 max-w-[200px]">Acesso total a todos os produtos + Mentorias mensais exclusivas</p>
                            <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl hover:bg-primary transition-all active:scale-95">
                                Seja Membro Platinum
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            {/* ── Luxury Address Modal ── */}
            <AnimatePresence>
                {isAddressModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="w-full max-w-md bg-zinc-950/90 border border-white/10 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                        >
                            {/* Modal Aura */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <h3 className="text-xl font-black text-white italic tracking-tight mb-1">Localização</h3>
                                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Defina seu ponto de entrega seguro</p>
                                </div>
                                <button
                                    onClick={() => setIsAddressModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm text-zinc-400">close</span>
                                </button>
                            </div>

                            <div className="space-y-5 relative z-10">
                                {/* CEP */}
                                <div className="space-y-2 relative">
                                    <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">CEP</label>
                                    <input
                                        type="text"
                                        placeholder="00000-000"
                                        className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors"
                                        value={addressForm.cep}
                                        onChange={(e) => setAddressForm({ ...addressForm, cep: e.target.value })}
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-8 text-zinc-600 text-sm">search</span>
                                </div>

                                {/* Street & Number */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">Logradouro</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: Av. Paulista"
                                            className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors"
                                            value={addressForm.street}
                                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">Nº</label>
                                        <input
                                            type="text"
                                            placeholder="1000"
                                            className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors text-center"
                                            value={addressForm.number}
                                            onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Complement & Neighborhood */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">Complemento</label>
                                        <input
                                            type="text"
                                            placeholder="Apto 101"
                                            className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors"
                                            value={addressForm.complement}
                                            onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">Bairro</label>
                                        <input
                                            type="text"
                                            placeholder="Bela Vista"
                                            className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors"
                                            value={addressForm.neighborhood}
                                            onChange={(e) => setAddressForm({ ...addressForm, neighborhood: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* City & State */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">Cidade</label>
                                        <input
                                            type="text"
                                            placeholder="São Paulo"
                                            className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors"
                                            value={addressForm.city}
                                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black text-zinc-500 uppercase tracking-widest ml-1">UF</label>
                                        <input
                                            type="text"
                                            placeholder="SP"
                                            maxLength={2}
                                            className="w-full bg-black/50 border border-white/5 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder:text-zinc-700 focus:border-primary/50 focus:outline-none transition-colors text-center uppercase"
                                            value={addressForm.state}
                                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveAddress}
                                className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-10 flex items-center justify-center gap-2 group"
                            >
                                Sincronizar Coordenadas
                                <span className="material-symbols-outlined text-[12px] group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


