import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allProducts } from './Shop';

export default function Courses() {
    const navigate = useNavigate();
    const products = allProducts.filter(p => p.type === 'Curso');

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <Header title="Cursos Elite" showBack />
            <main className="flex-grow px-6 pt-8 pb-32 space-y-10 relative z-10 overflow-y-auto no-scrollbar">
                <div className="space-y-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Treinamentos</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Especialização Estratégica</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/product-details/${product.id}`)}
                            className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 border-white/5 space-y-6 group cursor-pointer"
                        >
                            <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/5 relative shadow-2xl">
                                <img src={product.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={product.title} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/40 flex items-center justify-center text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                        <span className="material-symbols-outlined text-4xl filled">play_arrow</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">{product.author}</span>
                                <h4 className="text-xl font-black text-white italic uppercase tracking-tight mb-2 leading-tight">{product.title}</h4>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-lg font-black italic text-white">{product.price}</span>
                                    <button className="px-6 py-2 rounded-full bg-blue-500 text-black text-[10px] font-black uppercase tracking-widest transition-all">MATRICULA</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
