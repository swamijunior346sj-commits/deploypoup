import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function Mentorships() {
    const navigate = useNavigate();
    const products = allProducts.filter(p => p.type === 'Mentoria');

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <Header title="Mentorias Elite" showBack />
            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.5em]">Direct Access</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Orientação Exclusiva</h3>
                </div>
                <div className="space-y-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="transparent-card-border rounded-[3.5rem] p-10 bg-zinc-950/60 border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)] text-center group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8"><span className="material-symbols-outlined text-purple-500 text-3xl opacity-20">verified</span></div>
                            <img src={product.image} className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-2 border-purple-500 shadow-2xl group-hover:scale-110 transition-transform" alt={product.title} />
                            <h4 className="text-xl font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{product.title}</h4>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-6">{product.description}</p>
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-2xl font-black italic text-white">{product.price}</span>
                                <button className="w-full py-4 bg-purple-500 text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-lg">AGENDAR SESSÃO</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
