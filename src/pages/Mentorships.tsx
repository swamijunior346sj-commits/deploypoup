import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const mentorshipsData = [
    {
        id: '1',
        title: 'Mentoria Individual: Renda Fixa',
        author: 'Caio Moraes',
        category: 'Renda Fixa',
        price: 'R$ 497,00',
        coverUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        rating: 5.0,
        reviews: 42,
        duration: '1h de Sessão'
    },
    {
        id: '2',
        title: 'Masterclass: Dividendos e FIIs',
        author: 'Especialista em FIIs',
        category: 'Renda Variável',
        price: 'R$ 197,00',
        coverUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviews: 120,
        duration: '2h de Aula'
    },
    {
        id: '3',
        title: 'Consultoria Personalizada',
        author: 'Assessor de Investimentos',
        category: 'Patrimônio',
        price: 'R$ 897,00',
        coverUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
        reviews: 65,
        duration: 'Total de 3 Sessões'
    }
];

export default function Mentorships() {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-display text-white min-h-screen pb-20 overflow-x-hidden selection:bg-primary/30">
            <Header showBack title="Mentorias VIP" onBack={() => navigate('/shop')} />

            <main className="px-6 pt-6">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-none mb-1">Mentorias</h2>
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Acompanhamento Estratégico</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {mentorshipsData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/mentorship/${item.id}`)}
                            className="bg-zinc-900 rounded-[2.5rem] border border-white/5 overflow-hidden active:scale-[0.98] transition-all cursor-pointer shadow-2xl group flex flex-col h-full"
                        >
                            <div className="relative w-full aspect-video overflow-hidden">
                                <img src={item.coverUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                                    <span className="material-symbols-outlined text-black text-xs font-bold">verified</span>
                                    {item.category}
                                </div>
                                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                    <span className="text-[10px] text-white font-black">{item.rating}</span>
                                    <span className="material-symbols-outlined text-primary text-xs filled">star</span>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-between -mt-4">
                                <div>
                                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">Expert: {item.author}</p>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-sm">schedule</span>
                                            <span className="text-[9px] text-zinc-400 font-bold uppercase">{item.duration}</span>
                                        </div>
                                        <div className="w-px h-3 bg-white/5"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-sm">group</span>
                                            <span className="text-[9px] text-zinc-400 font-bold uppercase">{item.reviews} Alunos</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-black/50 p-4 rounded-3xl border border-white/5">
                                    <p className="text-xl font-black text-primary">{item.price}</p>
                                    <button className="h-12 px-6 rounded-2xl bg-primary text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                                        Agendar
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
