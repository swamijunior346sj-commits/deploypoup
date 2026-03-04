import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    const product = useMemo(() => allProducts.find(p => p.id === id), [id]);

    const images = useMemo(() => [
        product?.image || '',
        'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600'
    ], [product]);

    if (!product) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-zinc-800 mb-4">error</span>
                <h1 className="text-xl font-black uppercase tracking-widest text-zinc-500">Protocolo não encontrado</h1>
                <button onClick={() => navigate('/shop')} className="mt-8 text-primary font-black uppercase tracking-widest text-xs">Voltar para a Loja</button>
            </div>
        );
    }

    const addToCart = () => {
        const saved = localStorage.getItem('poup_cart');
        let cart = saved ? JSON.parse(saved) : [];
        if (!cart.find((item: any) => item.id === product.id)) {
            const priceVal = parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.').trim()) || 0;
            cart.push({ ...product, price: priceVal, quantity: 1 });
            localStorage.setItem('poup_cart', JSON.stringify(cart));
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } else {
            navigate('/cart');
        }
    };

    const buyNow = () => {
        addToCart();
        navigate('/upsell');
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Protocolo de Elite" showBack />

            <main className="flex-grow pb-48 relative z-10 overflow-y-auto no-scrollbar">

                {/* ── Product Gallery ── */}
                <section className="relative group">
                    <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-950">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                src={images[selectedImage]}
                                className="w-full h-full object-cover opacity-80"
                                alt={product.title}
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>

                    {/* Thumbnail Scroller */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-3 overflow-x-auto no-scrollbar">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${selectedImage === idx ? 'border-primary shadow-lg shadow-primary/30 scale-110' : 'border-white/10 opacity-50'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                            </button>
                        ))}
                    </div>

                    <div className="absolute top-6 right-6 z-20 space-y-3">
                        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">favorite</span>
                        </button>
                        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">share</span>
                        </button>
                    </div>
                </section>

                <div className="px-6 mt-8 space-y-8">
                    {/* Header Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">{product.type}</span>
                            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Protocolo {product.id}</span>
                        </div>
                        <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter premium-text-glow leading-[0.9]">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm text-yellow-500 filled">star</span>
                                <span className="text-white">{product.rating}</span>
                                <span className="opacity-50">({product.reviews} reviews)</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                            <div className="text-primary uppercase tracking-widest text-[9px]">Líder de Vendas</div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-6 space-y-4">
                        <div className="space-y-1">
                            <span className="text-xs text-zinc-500 line-through font-bold">{product.originalPrice}</span>
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-black italic text-white premium-text-glow leading-none">{product.price}</span>
                                <span className="text-primary font-black italic text-sm mb-1 text-neon-green">45% OFF</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            em <span className="text-white">12x de R$ {(parseFloat(product.price.replace('R$', '').replace('.', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')}</span> sem juros
                        </p>
                        <div className="flex items-center gap-2 py-3 px-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <span className="material-symbols-outlined text-primary text-xl filled">loyalty</span>
                            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Receba <span className="text-primary">+250 XP</span> ao adquirir</span>
                        </div>
                    </div>

                    {/* Delivery & Vendor Status (ML Style) */}
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-primary text-2xl">bolt</span>
                            <div>
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Envio Turbo</h4>
                                <p className="text-[10px] text-zinc-500 font-bold leading-relaxed mt-1">Disponível imediatamente após a confirmação do pagamento em seu dashboard.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-blue-500 text-2xl">verified_user</span>
                            <div>
                                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Compra Garantida</h4>
                                <p className="text-[10px] text-zinc-500 font-bold leading-relaxed mt-1">Receba o acesso ao conteúdo ou seu investimento de volta em até 7 dias.</p>
                            </div>
                        </div>

                        {/* Vendor Info */}
                        <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Informações do Estrategista</h5>
                                <span className="text-[8px] font-black py-0.5 px-2 bg-primary/20 text-primary rounded uppercase">Platinum</span>
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                                    <span className="material-symbols-outlined text-zinc-500">person</span>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-white italic uppercase tracking-tight">{product.author}</p>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">+5.000 Vendas Realizadas</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-1 h-1.5">
                                <div className="bg-red-500/20 rounded-full h-full"></div>
                                <div className="bg-orange-500/20 rounded-full h-full"></div>
                                <div className="bg-yellow-500/20 rounded-full h-full"></div>
                                <div className="bg-lime-500/40 rounded-full h-full"></div>
                                <div className="bg-primary rounded-full h-full shadow-[0_0_8px_#0FB67F]"></div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="text-center flex-1 border-r border-white/5">
                                    <p className="text-[10px] font-black text-white tracking-widest leading-none">5.0</p>
                                    <p className="text-[7px] font-bold text-zinc-500 uppercase tracking-tighter mt-1">Avaliação</p>
                                </div>
                                <div className="text-center flex-1 border-r border-white/5">
                                    <p className="text-[10px] font-black text-white tracking-widest leading-none">99%</p>
                                    <p className="text-[7px] font-bold text-zinc-500 uppercase tracking-tighter mt-1">Sucesso</p>
                                </div>
                                <div className="text-center flex-1">
                                    <p className="text-[10px] font-black text-white tracking-widest leading-none">&lt; 1h</p>
                                    <p className="text-[7px] font-bold text-zinc-500 uppercase tracking-tighter mt-1">Resposta</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-[2rem] bg-zinc-950/20 border border-white/5 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-2xl">school</span>
                            </div>
                            <h6 className="text-[10px] font-black text-white uppercase tracking-widest">Conteúdo VIP</h6>
                            <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Acesso exclusivo a planilhas e scripts</p>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-zinc-950/20 border border-white/5 space-y-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined text-2xl">hub</span>
                            </div>
                            <h6 className="text-[10px] font-black text-white uppercase tracking-widest">Networking</h6>
                            <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Grupo VIP no Discord/Telegram</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em] italic">Especificações Técnicas</h3>
                        <div className="space-y-4">
                            <p className="text-sm text-zinc-400 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4 py-2">
                                {product.description}
                            </p>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-4 border-t border-white/5">
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Formato</p>
                                    <p className="text-xs font-bold text-white uppercase">{product.type}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Duração/Páginas</p>
                                    <p className="text-xs font-bold text-white uppercase">{product.pages}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Lançamento</p>
                                    <p className="text-xs font-bold text-white uppercase">{product.published}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Suporte</p>
                                    <p className="text-xs font-bold text-white uppercase">Prioritário</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Buy Actions (ML Style Fixed Bottom) ── */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-2xl border-t border-white/10 z-[100] space-y-4 shadow-[0_-20px_60px_rgba(0,0,0,0.9)]">
                <div className="flex gap-4">
                    <button
                        onClick={addToCart}
                        className="flex-1 py-4 bg-zinc-900 text-primary border border-primary/20 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
                    >
                        <AnimatePresence mode="wait">
                            {added ? (
                                <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                                    <span className="material-symbols-outlined font-black text-sm">check</span>
                                    NO CARRINHO
                                </motion.span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined font-black text-sm group-hover:scale-125 transition-transform">shopping_cart</span>
                                    CARRINHO
                                </span>
                            )}
                        </AnimatePresence>
                    </button>
                    <button
                        onClick={buyNow}
                        className="flex-[2] py-4 bg-primary text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-[0_15px_30px_rgba(15,182,127,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 group border-luxury"
                    >
                        <span className="material-symbols-outlined font-black text-sm group-hover:animate-levitate">bolt</span>
                        COMPRAR AGORA
                    </button>
                </div>
                <div className="flex items-center justify-center gap-2 opacity-50">
                    <span className="material-symbols-outlined text-[10px]">shield</span>
                    <span className="text-[7px] font-black uppercase tracking-widest text-zinc-500">Transação Criptografada & Segura</span>
                </div>
            </div>
        </div>
    );
}
