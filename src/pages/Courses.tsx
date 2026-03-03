import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const coursesData = [
    {
        id: '1',
        title: 'Mastering Money: Do Zero ao Milhão',
        author: 'Caio Moraes',
        price: 'R$ 297,00',
        coverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        reviews: 1240,
        description: 'O treinamento definitivo para você sair do zero e chegar à liberdade financeira com estratégias validadas.',
        tag: 'Mais Vendido',
        modules: 12,
        hours: '40h'
    },
    {
        id: '2',
        title: 'Investment Mastery 2.0',
        author: 'Especialistas POUP',
        price: 'R$ 497,00',
        coverUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
        reviews: 856,
        description: 'Aprofunde seus conhecimentos em renda variável, análise técnica e fundamentalista.',
        tag: 'Destaque',
        modules: 15,
        hours: '55h'
    },
    {
        id: '3',
        title: 'Mindset Milionário',
        author: 'Psic. Financeiro',
        price: 'R$ 197,00',
        coverUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
        rating: 4.7,
        reviews: 2100,
        description: 'Reprograme sua mente para o sucesso e elimine crenças limitantes sobre o dinheiro.',
        modules: 8,
        hours: '20h'
    },
    {
        id: '4',
        title: 'Cripto para Iniciantes',
        author: 'POUP Lab',
        price: 'R$ 147,00',
        coverUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=400',
        rating: 5.0,
        reviews: 150,
        description: 'Aprenda a investir em bitcoin e outras criptos com segurança no mercado mais volátil do mundo.',
        tag: 'Lançamento',
        modules: 6,
        hours: '15h'
    }
];

export default function Courses() {
    const navigate = useNavigate();

    return (
        <div className="bg-black font-display text-white min-h-screen pb-20 overflow-x-hidden selection:bg-primary/30">
            <Header showBack title="Educação Premium" onBack={() => navigate('/shop')} />

            <main className="px-6 pt-6">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-2xl font-black text-white leading-none mb-1">Cursos</h2>
                        <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Formação de Investidores</span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-2xl">school</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {coursesData.map((course) => (
                        <div
                            key={course.id}
                            onClick={() => navigate(`/course/${course.id}`)}
                            className="bg-zinc-900 rounded-[2.5rem] border border-white/5 overflow-hidden active:scale-[0.98] transition-all cursor-pointer shadow-2xl group flex flex-col h-full"
                        >
                            <div className="relative w-full aspect-[21/9] overflow-hidden">
                                <img src={course.coverUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" alt={course.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <span className="material-symbols-outlined text-primary text-4xl opacity-20">play_circle</span>
                                </div>
                                {course.tag && (
                                    <div className="absolute top-4 left-4 px-2 py-1 bg-primary text-black text-[8px] font-black uppercase tracking-widest rounded shadow-xl">
                                        {course.tag}
                                    </div>
                                )}
                                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                    <span className="text-[10px] text-white font-black">{course.rating}</span>
                                    <span className="material-symbols-outlined text-primary text-xs filled">star</span>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-between -mt-4">
                                <div>
                                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">Prof. {course.author}</p>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-sm">view_module</span>
                                            <span className="text-[9px] text-zinc-400 font-bold uppercase">{course.modules} Módulos</span>
                                        </div>
                                        <div className="w-px h-3 bg-white/5"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-zinc-600 text-sm">schedule</span>
                                            <span className="text-[9px] text-zinc-400 font-bold uppercase">{course.hours} Conteúdo</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center bg-black/50 p-4 rounded-3xl border border-white/5">
                                    <div>
                                        <p className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter mb-0.5">Acesso Vitalício</p>
                                        <p className="text-xl font-black text-primary">{course.price}</p>
                                    </div>
                                    <button className="h-12 px-6 rounded-2xl bg-primary text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                                        Explorar
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
