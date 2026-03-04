import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function Tools() {
    const navigate = useNavigate();
    const products = allProducts.filter(p => p.type === 'Ferramenta');

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <Header title="Ferramentas Pro" showBack />
            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.5em]">Instrumentação</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Software de Combate</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="transparent-card-border rounded-[2.5rem] p-8 bg-zinc-950/40 border-white/5 flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-500 shadow-inner group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">terminal</span>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-sm font-black text-white italic uppercase tracking-tight leading-tight">{product.title}</h4>
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-1">{product.author}</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <span className="text-sm font-black italic text-white mb-2">{product.price}</span>
                                <button className="w-8 h-8 rounded-full border border-yellow-500 text-yellow-500 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
