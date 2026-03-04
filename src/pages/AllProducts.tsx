import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function AllProducts() {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Todos os Produtos" showBack />

            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Catálogo Completo</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">O Arsenal de Elite</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {allProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="flex gap-4 p-5 rounded-[2.5rem] bg-zinc-950/20 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group"
                        >
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 shrink-0">
                                <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" alt={product.title} />
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[8px] font-black text-primary uppercase tracking-widest">{product.type}</span>
                                    <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{product.author}</span>
                                </div>
                                <h4 className="text-xs font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{product.title}</h4>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-black italic text-white">{product.price}</span>
                                    <span className="material-symbols-outlined text-zinc-800 text-lg group-hover:text-primary transition-colors">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
