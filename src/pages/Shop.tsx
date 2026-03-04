import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';

export const allProducts = [
    // E-Books
    { id: '1', title: 'Dominando Investimentos', author: 'POUP Intelligence', type: 'E-Book', price: 'R$ 49,90', image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=400', tag: 'Mais Vendido', description: 'O guia definitivo para quem deseja sair do zero e construir um patrimônio sólido através de estratégias testadas.', rating: '4.9', reviews: '1.2k', pages: '184', published: '2023' },
    { id: '4', title: 'Mindset Milionário', author: 'Thiago Nigro', type: 'E-Book', price: 'R$ 39,90', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400', description: 'Aprenda a pensar como os grandes investidores e mude sua relação com o dinheiro para sempre.', rating: '4.8', reviews: '850', pages: '210', published: '2022' },

    // Cursos
    { id: '2', title: 'Masterclass: Criptoeconomia', author: 'Especialista Convidado', type: 'Curso', price: 'R$ 297,00', image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400', tag: 'Lançamento', description: 'Mergulhe no mundo das criptomoedas, DEFI e Web3 com quem realmente entende do mercado.', rating: '5.0', reviews: '320', pages: '12 Módulos', published: '2024' },

    // Ferramentas
    { id: '3', title: 'Planilha de Ativos Black', author: 'POUP Pro', type: 'Ferramenta', price: 'R$ 29,90', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400', description: 'O dashboard mais completo para controlar seus investimentos em ações, FIIs e Exterior.', rating: '4.9', reviews: '2.3k', pages: 'Excel/Google Sheets', published: 'V2.4' },

    // Mentorias
    { id: '11', title: 'Individual: 1 Mi', author: 'Founder POUP', type: 'Mentoria', price: 'R$ 2.497,00', image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d26c?auto=format&fit=crop&q=80&w=400', description: 'Atendimento exclusivo via Zoom para desenhar seu plano rumo ao primeiro milhão investido.', rating: '5.0', reviews: '95', pages: '4 Encontros', published: 'Vagas Limitadas' },

    // Physical Books
    { id: 'pb1', title: 'A Jornada do Investidor', author: 'POUP Press', type: 'Livro Físico', price: 'R$ 89,90', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400', description: 'Edição de luxo com capa dura e ilustrações exclusivas sobre o mercado financeiro.', rating: '5.0', reviews: '150', pages: '420', published: '2024' },

    // Networking
    { id: '13', title: 'Acesso VIP: Platinum', author: 'POUP Networking', type: 'Networking', price: 'R$ 1.200,00', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400', description: 'O clube de benefícios mais exclusivo do Brasil para investidores profissionais e HNWI.', rating: '5.0', reviews: '55', pages: 'Vitalício', published: 'VIP' },
];

export default function Shop() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(() => {
        const saved = localStorage.getItem('poup_cart');
        return saved ? JSON.parse(saved).length : 0;
    });

    const categories = [
        { id: 'courses', name: 'Cursos', icon: 'school', color: 'text-blue-500', path: '/courses' },
        { id: 'mentorship', name: 'Mentorias', icon: 'diversity_3', color: 'text-purple-500', path: '/mentorships' },
        { id: 'ebooks', name: 'E-Books', icon: 'menu_book', color: 'text-primary', path: '/ebooks' },
        { id: 'books', name: 'Livros', icon: 'auto_stories', color: 'text-orange-500', path: '/physical-books' },
        { id: 'tools', name: 'Ferramentas', icon: 'construction', color: 'text-yellow-500', path: '/tools' },
        { id: 'networking', name: 'Conexões', icon: 'hub', color: 'text-cyan-500', path: '/networking' },
    ];

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Luxury Marketplace" />

            {/* ── Cart FAB ── */}
            <div className="fixed bottom-24 right-6 z-[150] animate-bounce-subtle">
                <button
                    onClick={() => navigate('/cart')}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_20px_40px_rgba(15,182,127,0.4)] active:scale-90 transition-all group relative"
                >
                    <span className="material-symbols-outlined text-black font-black text-3xl group-hover:scale-110 transition-transform">shopping_cart</span>
                    {cartCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center ring-4 ring-black shadow-lg">
                            {cartCount}
                        </div>
                    )}
                </button>
            </div>

            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Visual Hero ── */}
                <section className="relative h-56 rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer" onClick={() => navigate('/ebook/1')}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                        alt="Featured"
                    />
                    <div className="absolute bottom-8 left-8 z-20 space-y-2">
                        <span className="px-3 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-[0.3em] rounded">Destaque da Semana</span>
                        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-none">
                            Arsenal do <br />Investidor
                        </h2>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest opacity-60">Sua jornada para o milhão começa aqui</p>
                    </div>
                </section>

                {/* ── Category Grid ── */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Categorias de Elite</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(cat.path)}
                                className="transparent-card-border rounded-[2.5rem] bg-zinc-950/40 p-6 flex flex-col items-center text-center space-y-4 cursor-pointer hover:bg-zinc-900/60 transition-colors"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner ${cat.color}`}>
                                    <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{cat.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── Trending Products ── */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Em Alta</h3>
                        <button className="text-[9px] font-black text-primary uppercase tracking-widest">Ver Todos</button>
                    </div>

                    <div className="space-y-4">
                        {allProducts.slice(0, 3).map((product) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product-details/${product.id}`)}
                                className="flex gap-4 p-5 rounded-[2.5rem] bg-zinc-950/20 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
                            >
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0">
                                    <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" alt={product.title} />
                                </div>
                                <div className="flex flex-col justify-center flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[8px] font-black text-primary uppercase tracking-widest">{product.type}</span>
                                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{product.author}</span>
                                    </div>
                                    <h4 className="text-sm font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{product.title}</h4>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-sm font-black italic text-white premium-text-glow">{product.price}</span>
                                        <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                            <span className="material-symbols-outlined text-lg">add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Social Proof / Membership Card ── */}
                <section className="transparent-card-border rounded-[3.5rem] p-10 bg-gradient-to-br from-primary/20 via-zinc-950 to-zinc-950 border-primary/20 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16"></div>
                    <span className="material-symbols-outlined text-4xl text-primary mb-4 drop-shadow-[0_0_15px_#0FB67F]">workspace_premium</span>
                    <h5 className="text-xl font-black text-white italic uppercase tracking-tight mb-2">Comunidade Elite</h5>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest opacity-60 mb-6">Acesso total a todos os produtos + Mentorias mensais exclusivas</p>
                    <button className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-[0_10px_20px_rgba(15,182,127,0.3)] hover:scale-[1.02] transition-transform">
                        Seja Membro Platinum
                    </button>
                </section>

            </main>
        </div>
    );
}
