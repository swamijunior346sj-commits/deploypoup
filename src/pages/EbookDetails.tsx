import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allProducts } from './Shop';

export default function EbookDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    // Find product from the expanded shop list
    const product = allProducts.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return (
            <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center text-off-white p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">search_off</span>
                <p className="font-bold text-lg mb-2 uppercase tracking-widest">Produto não encontrado</p>
                <p className="text-sm opacity-60 mb-8">O item que você procura não existe ou foi removido.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="px-8 py-3 border border-primary text-primary rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] active:scale-95 transition-all"
                >
                    Voltar para Loja
                </button>
            </div>
        );
    }

    const isOwned = () => {
        const saved = localStorage.getItem('poup_cart');
        if (!saved) return false;
        const cart = JSON.parse(saved);
        return !!cart.find((item: any) => item.id === product.id);
    };

    const handlePurchase = () => {
        if (product.id === '10' && isOwned()) {
            navigate('/compound-interest');
            return;
        }
        const saved = localStorage.getItem('poup_cart');
        let cart = saved ? JSON.parse(saved) : [];
        if (!cart.find((item: any) => item.id === product.id)) {
            const priceVal = product.price === 'Grátis' ? 0 : parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.').trim());
            cart.push({
                ...product,
                price: priceVal,
                quantity: 1
            });
            localStorage.setItem('poup_cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
            navigate('/cart');
        } else {
            navigate('/cart');
        }
    };

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pb-48 overflow-x-hidden selection:bg-primary/30 relative">
            <style>{`
                @keyframes levitate {
                    0% { transform: translateY(0px) translateX(-50%); }
                    50% { transform: translateY(-10px) translateX(-50%); }
                    100% { transform: translateY(0px) translateX(-50%); }
                }
                .levitate-btn {
                    animation: levitate 3s ease-in-out infinite;
                }
            `}</style>

            {/* Header Navigation Floating */}
            <div className="fixed top-6 left-6 right-6 flex justify-between items-center z-50 pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95 text-white pointer-events-auto"
                >
                    <span className="material-symbols-outlined text-white text-2xl">arrow_back_ios_new</span>
                </button>
                <div className="w-10 pointer-events-none"></div> {/* Spacer for symmetry */}
            </div>

            {/* Hero Cover Component */}
            <div className="relative w-full h-[400px] flex justify-center pt-24 pb-8 bg-black border-b border-white/5 overflow-hidden">
                {/* Background image reflection mask */}
                <div className="absolute inset-0 overflow-hidden opacity-10 blur-3xl scale-125">
                    <img src={product.image} className="w-full h-full object-cover" alt="blur-bg" />
                </div>

                {/* Dynamic light behind cover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>

                {/* Cover Frame */}
                <div className="relative z-10 w-48 h-[280px] rounded-2xl shadow-2xl shadow-black ring-1 ring-white/10 overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
                    {product.tag && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] rounded shadow-[0_0_15px_rgba(15,182,127,0.5)]">
                            {product.tag}
                        </div>
                    )}
                </div>
            </div>

            {/* Content Details */}
            <main className="px-6 relative z-20 -mt-6">
                <div className="flex flex-col mb-8">
                    <h1 className="text-2xl font-bold text-white leading-tight font-display tracking-tight text-center">{product.title}</h1>
                    <p className="text-zinc-500 text-xs mt-2 text-center font-bold uppercase tracking-widest">{product.author}</p>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            <span className="text-white font-bold text-xs tracking-wide">{product.rating}</span>
                            <span className="material-symbols-outlined text-primary text-sm filled">star</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                        <div className="flex items-center gap-1.5 opacity-60">
                            <span className="material-symbols-outlined text-zinc-400 text-sm">group</span>
                            <span className="text-xs text-zinc-400">{product.reviews} avaliações</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-4 rounded-2xl bg-surface/40 border border-white/5 text-center">
                        <span className="block text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Formato</span>
                        <span className="text-white text-sm font-bold">{product.type}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface/40 border border-white/5 text-center">
                        <span className="block text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-1">Data</span>
                        <span className="text-white text-sm font-bold">{product.published}</span>
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-white text-[10px] font-bold mb-4 uppercase tracking-[0.3em] opacity-40">Sinopse do Item</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{product.description || "Este item premium faz parte do programa de excelência financeira da POUP, garantindo os melhores insights do mercado."}</p>
                </div>

                {/* Additional Features List */}
                <div className="space-y-3 mb-12">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface/30 border border-white/5">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                            <span className="material-symbols-outlined text-primary text-xl">verified</span>
                        </div>
                        <div>
                            <h4 className="text-white text-xs font-bold uppercase tracking-wide">Qualidade Garantida</h4>
                            <p className="text-zinc-600 text-[10px] mt-0.5">Certificado por especialistas da POUP Lab.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Floating levitating checkout button */}
            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md z-[150] levitate-btn">
                <button
                    onClick={handlePurchase}
                    className="w-full flex items-center justify-between p-2 pl-6 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] active:scale-95 transition-all group"
                >
                    <div className="flex flex-col items-start px-2">
                        <span className="text-[10px] text-zinc-500 uppercase font-black tracking-tighter">Investimento</span>
                        <span className="text-xl font-black text-white tracking-tight">{product.price}</span>
                    </div>
                    <div className="h-14 px-8 bg-primary rounded-[20px] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(15,182,127,0.3)]">
                        <span className="text-black text-[11px] font-black uppercase tracking-[0.15em]">{isOwned() ? 'Acessar Ferramenta' : 'Adicionar ao carrinho'}</span>
                        <span className="material-symbols-outlined text-black text-sm font-bold">{isOwned() ? 'open_in_new' : 'shopping_cart'}</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
