import { useNavigate } from 'react-router-dom';

export const coursesData = [
    {
        id: '1',
        title: 'Formação Investidor Master',
        author: 'Especialista XP',
        price: 'R$ 497,00',
        coverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
        rating: 4.9,
        reviews: 450,
        description: 'Um treinamento completo com mais de 40h de conteúdo. Estruture do zero ao avançado uma carteira resiliente.',
        tag: 'Mais Vendido',
        modules: 8,
        hours: '42h'
    },
    {
        id: '2',
        title: 'Masterclass: Criptoeconomia',
        author: 'POUP Crypto',
        price: 'R$ 297,00',
        coverUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=600',
        rating: 4.8,
        reviews: 215,
        description: 'Domine Bitcoin, Ethereum e entenda os ciclos de mercado para maximizar seus lucros.',
        tag: 'Lançamento',
        modules: 5,
        hours: '18h'
    },
    {
        id: '3',
        title: 'Renda Fixa na Prática',
        author: 'POUP Pro',
        price: 'R$ 149,90',
        coverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
        rating: 4.7,
        reviews: 320,
        description: 'Marcação a mercado, curvas de juros e como lucrar dezenas de por cento com títulos públicos e privados.',
        modules: 4,
        hours: '12h'
    }
];

export default function Courses() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pt-6 pb-12 overflow-x-hidden selection:bg-primary/30">
            {/* Header */}
            <header className="px-6 mb-8 flex items-center justify-between sticky top-0 bg-background-dark/80 backdrop-blur-md z-10 py-4">
                <button
                    onClick={() => navigate('/shop')}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-white/5 active:scale-95 transition-all text-light-gray"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                </button>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-off-white tracking-tight">Cursos</h1>
                    <p className="text-[10px] text-light-gray opacity-70 tracking-widest uppercase">Educação Premium</p>
                </div>
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-white/5 active:scale-95 transition-all text-light-gray"
                >
                    <span className="material-symbols-outlined text-lg">search</span>
                </button>
            </header>

            {/* Courses List */}
            <div className="px-6 space-y-4">
                {coursesData.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/course/${course.id}`)}
                        className="flex flex-col rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all active:scale-[0.98] group cursor-pointer overflow-hidden"
                    >
                        <div className="relative h-40 w-full overflow-hidden">
                            <img src={course.coverUrl} alt={course.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            {course.tag && (
                                <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-black text-[9px] font-black uppercase tracking-[0.2em] rounded shadow-[0_0_15px_rgba(15,182,127,0.4)]">
                                    {course.tag}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                                <div>
                                    <h4 className="text-white text-base font-bold leading-tight">{course.title}</h4>
                                    <span className="text-light-gray text-[10px]">{course.author}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(15,182,127,0.4)]">
                                    <span className="material-symbols-outlined text-black text-lg">play_arrow</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-4 text-[10px] text-light-gray font-semibold uppercase tracking-wider">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">view_module</span>
                                    <span>{course.modules} Módulos</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                                    <span>{course.hours}</span>
                                </div>
                                <div className="flex items-center gap-1 ml-auto">
                                    <span className="material-symbols-outlined text-primary text-[14px] filled">star</span>
                                    <span className="text-white font-bold">{course.rating}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center border-t border-white/5 pt-3">
                                <span className="text-xs text-light-gray">Acesso Vitalício</span>
                                <span className="text-primary font-bold text-lg">{course.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
