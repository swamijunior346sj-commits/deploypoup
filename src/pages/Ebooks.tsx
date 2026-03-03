import { useNavigate } from 'react-router-dom';

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
        <div className="bg-background-dark font-display min-h-screen flex flex-col pt-6 pb-12 overflow-x-hidden selection:bg-primary/30">
            {/* Header */}
            <header className="px-6 mb-8 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-10 py-4">
                <button
                    onClick={() => navigate('/shop')}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-white/10 active:scale-95 transition-all text-light-gray"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-off-white tracking-tight">E-Books</h1>
                    <p className="text-[10px] text-light-gray opacity-70 tracking-widest uppercase">Biblioteca Premium</p>
                </div>
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-white/10 active:scale-95 transition-all text-light-gray"
                >
                    <span className="material-symbols-outlined text-lg">search</span>
                </button>
            </header>

            {/* Ebooks Grid */}
            <div className="px-6">
                <div className="grid grid-cols-2 gap-4">
                    {ebooksData.map((ebook) => (
                        <div
                            key={ebook.id}
                            onClick={() => navigate(`/ebook/${ebook.id}`)}
                            className="flex flex-col gap-2 p-3 rounded-2xl bg-transparent border border-white/10 hover:border-primary/30 transition-all active:scale-[0.98] group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden w-full">
                                <img src={ebook.coverUrl} alt={ebook.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                {ebook.tag && (
                                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary text-black text-[8px] font-black uppercase tracking-widest rounded shadow-[0_0_10px_rgba(15,182,127,0.4)]">
                                        {ebook.tag}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>

                            <div className="flex flex-col mt-1">
                                <h4 className="text-white text-sm font-bold leading-tight line-clamp-2">{ebook.title}</h4>
                                <span className="text-light-gray text-[10px] mt-1 line-clamp-1">{ebook.author}</span>

                                <div className="flex items-center gap-1 mt-2">
                                    <span className="material-symbols-outlined text-primary text-[12px]">star</span>
                                    <span className="text-[10px] text-white font-bold">{ebook.rating}</span>
                                    <span className="text-[9px] text-light-gray">({ebook.reviews})</span>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-primary font-bold">{ebook.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
