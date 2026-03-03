import { useNavigate } from 'react-router-dom';

export default function Shop() {
    const navigate = useNavigate();

    const categories = [
        { id: 'ebooks', name: 'E-Books', icon: 'menu_book' },
        { id: 'courses', name: 'Cursos', icon: 'school' },
        { id: 'tools', name: 'Ferramentas', icon: 'construction' },
        { id: 'mentorship', name: 'Mentorias', icon: 'group' },
    ];

    const featuredProducts = [
        {
            id: 1,
            title: 'Dominando Investimentos',
            author: 'POUP Intelligence',
            type: 'E-Book',
            price: 'R$ 49,90',
            image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=400',
            tag: 'Mais Vendido',
        },
        {
            id: 2,
            title: 'Masterclass: Criptoeconomia',
            author: 'Especialista Convidado',
            type: 'Curso (Vídeo)',
            price: 'R$ 297,00',
            image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400',
            tag: 'Lançamento',
        },
        {
            id: 3,
            title: 'Planilha de Ativos Black',
            author: 'POUP Pro',
            type: 'Ferramenta',
            price: 'R$ 29,90',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
        }
    ];

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pt-6 pb-32 overflow-x-hidden selection:bg-primary/30">
            {/* Header */}
            <header className="px-6 mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extralight text-off-white tracking-tight">POUP <span className="font-bold text-primary">Shop</span></h1>
                    <p className="text-light-gray text-xs mt-1 opacity-70 tracking-wide uppercase">Marketplace do Investidor</p>
                </div>
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center relative bg-surface border border-white/5 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-off-white text-lg">shopping_cart</span>
                </button>
            </header>

            {/* Categories */}
            <div className="px-6 mb-8 overflow-x-auto no-scrollbar flex gap-3 pb-2 -mx-6 px-6">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => {
                            if (category.id === 'ebooks') navigate('/ebooks');
                            if (category.id === 'courses') navigate('/courses');
                            if (category.id === 'mentorship') navigate('/mentorships');
                        }}
                        className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-surface rounded-2xl border border-white/5 shrink-0 hover:bg-white/5 active:scale-95 transition-all group"
                    >
                        <span className="material-symbols-outlined text-primary mb-1 group-hover:scale-110 transition-transform">{category.icon}</span>
                        <span className="text-[10px] text-light-gray font-semibold uppercase tracking-wider">{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Featured Banner */}
            <div className="px-6 mb-10">
                <div onClick={() => navigate('/ebook/1')} className="relative w-full h-48 rounded-[32px] overflow-hidden group border border-white/10 glow-border cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
                        alt="Promo Banner"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="px-2 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] rounded">Oferta Exclusiva</span>
                        <h2 className="text-white text-xl font-bold mt-2 leading-tight">Masterclass de <br />Análise Fundamentalista</h2>
                        <button className="mt-3 flex items-center gap-1 text-[11px] text-primary font-bold uppercase tracking-widest hover:gap-2 transition-all">
                            Ver Detalhes <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Featured List */}
            <div className="px-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-lg font-bold">Destaques</h3>
                    <span onClick={() => navigate('/ebooks')} className="text-primary text-xs font-bold uppercase tracking-wider cursor-pointer active:scale-95">Ver todos</span>
                </div>

                <div className="space-y-4">
                    {featuredProducts.map((product) => (
                        <div key={product.id} onClick={() => navigate(`/ebook/${product.id}`)} className="flex gap-4 p-4 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors active:scale-[0.98] cursor-pointer">
                            <div className="relative w-24 h-28 rounded-xl overflow-hidden shrink-0">
                                <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                                {product.tag && (
                                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary text-black text-[8px] font-bold uppercase tracking-widest rounded shadow-[0_0_10px_rgba(15,182,127,0.4)]">
                                        {product.tag}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <span className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-80 mb-1">{product.type}</span>
                                <h4 className="text-white text-sm font-bold leading-snug line-clamp-2">{product.title}</h4>
                                <span className="text-light-gray text-[11px] mt-1">{product.author}</span>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-white font-bold">{product.price}</span>
                                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
