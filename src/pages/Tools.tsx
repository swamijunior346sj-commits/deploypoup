import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const toolsData = [
    {
        id: 'tech-1',
        title: 'Planilha de Ativos Black',
        author: 'POUP Pro',
        price: 'R$ 29,90',
        coverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviews: 2300,
        description: 'O dashboard mais completo para controlar seus investimentos em ações, FIIs e Exterior.',
        tag: 'Essencial',
        format: 'Excel/Google Sheets',
        version: 'V2.4',
        features: ['Multimoedas', 'Cálculo de PM', 'IR Integrado']
    },
    {
        id: 'tech-2',
        title: 'Dashboard de Imposto de Renda',
        author: 'POUP Tech',
        price: 'R$ 89,90',
        coverUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
        reviews: 600,
        description: 'Automatize sua declaração de IR e evite cair na malha fina com nossa planilha inteligente.',
        version: '2024',
        features: ['Importação B3', 'Critpomoedas', 'Histórico 10 anos']
    },
    {
        id: 'tech-3',
        title: 'Calculadora de Juros Pro',
        author: 'POUP Tech',
        price: 'R$ 19,90',
        coverUrl: 'https://images.unsplash.com/photo-1518183275089-7e1c9ef51771?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviews: 150,
        description: 'Simule aportes, taxas e prazos com precisão matemática para planejar sua independência.',
        tag: 'Grátis p/ VIP',
        features: ['Inflação Real', 'Taxa Selic Auto', 'Exportar PDF']
    }
];

export default function Tools() {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-display text-white min-h-screen pb-20 overflow-x-hidden selection:bg-primary/30">
            <Header showBack title="Ferramentas Tech" onBack={() => navigate('/shop')} />

            <main className="px-6 pt-6">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-none mb-1">Tecnologia</h2>
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Alta Performance Financeira</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-2xl">construction</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {toolsData.map((tool) => (
                        <div
                            key={tool.id}
                            onClick={() => navigate(`/ebook/${tool.id}`)}
                            className="bg-zinc-900 rounded-[2.5rem] border border-white/5 overflow-hidden active:scale-[0.98] transition-all cursor-pointer shadow-2xl group flex flex-col sm:flex-row h-full"
                        >
                            <div className="relative w-full sm:w-[150px] aspect-square sm:aspect-auto overflow-hidden">
                                <img src={tool.coverUrl} className="w-full h-full object-cover opacity-50 gray-scale group-hover:scale-110 transition-transform duration-700" alt={tool.title} />
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <span className="material-symbols-outlined text-primary text-6xl opacity-20">construction</span>
                                </div>
                                {tool.tag && (
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-widest rounded shadow-xl">
                                        {tool.tag}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">{tool.title}</h3>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-black rounded-lg border border-white/5">
                                            <span className="text-[10px] text-white font-black">{tool.rating}</span>
                                            <span className="material-symbols-outlined text-primary text-xs filled">star</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">Desenvolvido por {tool.author}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {tool.features?.map(f => (
                                            <span key={f} className="text-[8px] px-2 py-1 bg-white/5 text-zinc-400 font-black uppercase tracking-widest rounded-md border border-white/10">{f}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-black/50 p-4 rounded-3xl border border-white/5">
                                    <div>
                                        <p className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter mb-0.5">Licença Vitalícia</p>
                                        <p className="text-lg font-black text-primary">{tool.price}</p>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black shadow-lg shadow-primary/20">
                                        <span className="material-symbols-outlined font-black">arrow_forward</span>
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
