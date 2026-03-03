import { useNavigate } from 'react-router-dom';

export const mentorshipsData = [
    {
        id: '1',
        title: 'Mentoria Black: Carteira Perfeita',
        author: 'Rafael Mendonça (CEO)',
        price: 'R$ 1.500,00',
        coverUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=600',
        rating: 5.0,
        reviews: 42,
        description: 'Encontro 1 a 1 para montar seu portfólio completo com foco em independência financeira.',
        tag: 'Exclusivo',
        duration: '2 Horas + Acompanhamento 30 dias',
        category: 'Estratégia Global'
    },
    {
        id: '2',
        title: 'Diagnóstico Financeiro',
        author: 'Equipe POUP Wealth',
        price: 'R$ 350,00',
        coverUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        reviews: 128,
        description: 'Onde você está errando? Descubra ralos financeiros e defina sua taxa de poupança ideal.',
        tag: 'Recomendado',
        duration: '1 Hora',
        category: 'Organização'
    },
    {
        id: '3',
        title: 'Review de Portfólio Cripto',
        author: 'Daniel Crypto',
        price: 'R$ 600,00',
        coverUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        reviews: 85,
        description: 'Análise de risco das suas altcoins e balanceamento da sua carteira de criptomoedas.',
        duration: '1.5 Horas',
        category: 'Ativos Digitais'
    }
];

export default function Mentorships() {
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
                    <h1 className="text-lg font-bold text-off-white tracking-tight">Mentorias</h1>
                    <p className="text-[10px] text-light-gray opacity-70 tracking-widest uppercase">Assessoria 1 a 1</p>
                </div>
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-white/10 active:scale-95 transition-all text-light-gray"
                >
                    <span className="material-symbols-outlined text-lg">filter_list</span>
                </button>
            </header>

            {/* Mentorships List */}
            <div className="px-6 space-y-5">
                {mentorshipsData.map((mentorship) => (
                    <div
                        key={mentorship.id}
                        onClick={() => navigate(`/mentorship/${mentorship.id}`)}
                        className="flex flex-col rounded-[24px] bg-transparent border border-white/10 hover:border-primary/30 transition-all active:scale-[0.98] group cursor-pointer p-5"
                    >
                        <div className="flex gap-4">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/20 p-1">
                                <img src={mentorship.coverUrl} alt={mentorship.author} className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center">
                                {mentorship.tag && (
                                    <span className="self-start px-2 py-0.5 mb-1 bg-primary text-black text-[8px] font-black uppercase tracking-[0.2em] rounded">
                                        {mentorship.tag}
                                    </span>
                                )}
                                <h4 className="text-white text-base font-bold leading-tight line-clamp-2">{mentorship.title}</h4>
                                <span className="text-primary text-[11px] mt-1 font-semibold">{mentorship.author}</span>
                            </div>
                        </div>

                        <div className="w-full h-px bg-white/5 my-4"></div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-light-gray text-xs truncate mr-4">{mentorship.duration}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-[14px] filled">star</span>
                                    <span className="text-white font-bold text-sm tracking-wide">{mentorship.rating}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-light-gray/60 uppercase tracking-wider">{mentorship.category}</span>
                                <span className="text-white font-bold text-lg">{mentorship.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
