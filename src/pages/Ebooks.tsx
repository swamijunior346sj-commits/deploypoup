import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function Ebooks() {
    const navigate = useNavigate();
    const products = allProducts.filter(p => p.type === 'E-Book');

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <Header title="Biblioteca Digital" showBack />
            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Manuais Técnicos</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Literatura de Elite</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="transparent-card-border rounded-[2.5rem] p-6 bg-zinc-950/40 border-white/5 space-y-4 group cursor-pointer"
                        >
                            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/5 relative">
                                <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                                {product.tag && (
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-black text-[7px] font-black uppercase tracking-widest rounded shadow-[0_5px_10px_rgba(15,182,127,0.3)]">
                                        {product.tag}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col text-center">
                                <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest mb-1">{product.author}</span>
                                <h4 className="text-xs font-black text-white italic uppercase tracking-tight mb-2 leading-tight line-clamp-2">{product.title}</h4>
                                <span className="text-sm font-black italic text-primary">{product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
