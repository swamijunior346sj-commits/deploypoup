import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function PhysicalBooks() {
    const navigate = useNavigate();
    const products = allProducts.filter(p => p.type === 'Livro Físico');

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>

            <Header title="Livros Físicos" showBack />

            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">Edições Impressas</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">O Conhecimento em Mãos</h3>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 border-white/5 flex gap-6 items-center group cursor-pointer"
                        >
                            <div className="w-28 h-40 rounded-xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
                                <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                            </div>
                            <div className="flex flex-col flex-1">
                                <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest mb-1">{product.author}</span>
                                <h4 className="text-base font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{product.title}</h4>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-black italic text-white">{product.price}</span>
                                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                                        <span className="material-symbols-outlined">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
