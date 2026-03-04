import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function Networking() {
    const navigate = useNavigate();
    const products = allProducts.filter(p => p.type === 'Networking');

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <Header title="Conexões Globais" showBack />
            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">High Net Worth</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">O Poder do Ecossistema</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="transparent-card-border rounded-[3.5rem] p-10 bg-zinc-950 border-cyan-500/10 shadow-[0_0_40px_rgba(6,182,212,0.05)] relative overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-2xl bg-black border border-cyan-500/20 flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-4xl">hub</span>
                                </div>
                                <h4 className="text-xl font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{product.title}</h4>
                                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed mb-8">{product.description}</p>
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <span className="text-2xl font-black italic text-white">{product.price}</span>
                                    <button className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-[0_10px_20px_rgba(6,182,212,0.3)]">SOLICITAR ACESSO</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
