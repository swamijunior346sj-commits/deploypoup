import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const networkingData = [
    {
        id: 'net-1',
        title: 'Mastermind Elite POUP',
        author: 'Caio & Equipe',
        price: 'R$ 497,00',
        coverUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400',
        rating: 5.0,
        reviews: 42,
        description: 'Grupo exclusivo de investidores de alto nível para troca de estratégias e parcerias.',
        tag: 'Exclusivo',
        duration: '12 meses'
    },
    {
        id: 'net-2',
        title: 'Network em São Paulo',
        author: 'E-POUP Events',
        price: 'R$ 150,00',
        coverUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviews: 800,
        description: 'Encontro presencial trimestral para expandir sua rede de contatos e negócios.',
        duration: '1 dia'
    },
    {
        id: 'net-3',
        title: 'Grupo VIP Telegram',
        author: 'POUP Intel',
        price: 'R$ 49,90/mês',
        coverUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=400',
        rating: 4.7,
        reviews: 1500,
        description: 'Alertas e discussões em tempo real sobre o mercado financeiro e oportunidades.',
        tag: 'Assinatura',
        duration: 'Mensal'
    }
];

export default function Networking() {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-display text-white min-h-screen pb-20 overflow-x-hidden selection:bg-primary/30">
            <Header showBack title="Networking Hub" onBack={() => navigate('/shop')} />

            <main className="px-6 pt-6">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-none mb-1">Conexões</h2>
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">O Capital das Pessoas</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-2xl">handshake</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {networkingData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/ebook/${item.id}`)}
                            className="bg-zinc-900 rounded-[2.5rem] border border-white/5 overflow-hidden active:scale-[0.98] transition-all cursor-pointer shadow-2xl group flex flex-col sm:flex-row h-full"
                        >
                            <div className="relative w-full sm:w-[150px] aspect-square sm:aspect-auto overflow-hidden">
                                <img src={item.coverUrl} className="w-full h-full object-cover opacity-50 gray-scale group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <span className="material-symbols-outlined text-primary text-6xl opacity-20">handshake</span>
                                </div>
                                {item.tag && (
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-widest rounded shadow-xl">
                                        {item.tag}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">{item.title}</h3>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-black rounded-lg border border-white/5">
                                            <span className="text-[10px] text-white font-black">{item.rating}</span>
                                            <span className="material-symbols-outlined text-primary text-xs filled">star</span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">Liderado por {item.author}</p>

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                                            <span className="material-symbols-outlined text-[12px] text-zinc-400">schedule</span>
                                            <span className="text-[8px] text-zinc-400 font-black uppercase tracking-widest">{item.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                                            <span className="material-symbols-outlined text-[12px] text-zinc-400">group</span>
                                            <span className="text-[8px] text-zinc-400 font-black uppercase tracking-widest">{item.reviews} Membros</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-black/50 p-4 rounded-3xl border border-white/5">
                                    <div>
                                        <p className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter mb-0.5">Acesso Premium</p>
                                        <p className="text-lg font-black text-primary">{item.price}</p>
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
