import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const ebooksData = [
    {
        id: '1',
        title: 'Dominando Investimentos',
        author: 'POUP Intelligence',
        price: 'R$ 49,90',
        coverUrl: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
        reviews: 124,
        description: 'Um guia completo para sair da poupança e construir uma carteira sólida e diversificada.',
        tag: 'Mais Vendido',
        pages: 120,
        published: '2023'
    },
    {
        id: '2',
        title: 'Psicologia Financeira',
        author: 'Especialista Convidado',
        price: 'R$ 35,00',
        coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviews: 89,
        description: 'Entenda como sua mente afeta suas decisões financeiras e como mudar seus hábitos.',
        tag: 'Destaque',
        pages: 180,
        published: '2024'
    },
    {
        id: '3',
        title: 'Renda Fixa Essencial',
        author: 'POUP Pro',
        price: 'R$ 29,90',
        coverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
        rating: 4.7,
        reviews: 210,
        description: 'Tesouro Direto, CDBs, LCIs: Aprenda a rentabilizar com segurança.',
        pages: 95,
        published: '2023'
    },
    {
        id: '4',
        title: 'Dividendos na Prática',
        author: 'POUP Intelligence',
        price: 'R$ 59,90',
        coverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400',
        rating: 5.0,
        reviews: 55,
        description: 'O método definitivo para construir uma carteira focada em renda passiva.',
        tag: 'Lançamento',
        pages: 150,
        published: '2024'
    }
];

export default function Ebooks() {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-display text-white min-h-screen pb-20 overflow-x-hidden selection:bg-primary/30">
            <Header showBack title="Livros Digitais" onBack={() => navigate('/shop')} />

            <main className="px-6 pt-6">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-none mb-1">E-books</h2>
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Biblioteca Estruturada</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-2xl">auto_stories</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {ebooksData.map((ebook) => (
                        <div
                            key={ebook.id}
                            onClick={() => navigate(`/ebook/${ebook.id}`)}
                            className="bg-zinc-900 rounded-[2.5rem] border border-white/5 overflow-hidden active:scale-[0.98] transition-all cursor-pointer shadow-2xl group flex h-full"
                        >
                            <div className="relative w-1/3 aspect-[3/4] overflow-hidden">
                                <img src={ebook.coverUrl} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 shadow-2xl" alt={ebook.title} />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                                {ebook.tag && (
                                    <div className="absolute top-4 left-4 px-1.5 py-0.5 bg-primary text-black text-[7px] font-black uppercase tracking-widest rounded shadow-xl">
                                        {ebook.tag}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-base font-black text-white leading-tight uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">{ebook.title}</h3>
                                    <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mb-1">{ebook.author}</p>
                                    <p className="text-zinc-400 text-[10px] leading-relaxed line-clamp-2 mb-4 opacity-70 italic font-light">"{ebook.description}"</p>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex items-center gap-1.5 grayscale opacity-60">
                                            <span className="material-symbols-outlined text-[10px] text-zinc-400">menu_book</span>
                                            <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">{ebook.pages} Páginas</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] text-white font-black">{ebook.rating}</span>
                                            <span className="material-symbols-outlined text-primary text-xs filled">star</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-black/40 p-3 px-5 rounded-2xl border border-white/5">
                                    <p className="text-base font-black text-primary">{ebook.price}</p>
                                    <span className="material-symbols-outlined text-primary text-lg">shopping_cart</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
