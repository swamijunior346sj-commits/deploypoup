import { useNavigate } from 'react-router-dom';

export const allProducts = [
    // E-Books
    { id: '1', title: 'Dominando Investimentos', author: 'POUP Intelligence', type: 'E-Book', price: 'R$ 49,90', image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=400', tag: 'Mais Vendido', description: 'O guia definitivo para quem deseja sair do zero e construir um patrimônio sólido através de estratégias testadas.', rating: '4.9', reviews: '1.2k', pages: '184', published: '2023' },
    { id: '4', title: 'Mindset Milionário', author: 'Thiago Nigro', type: 'E-Book', price: 'R$ 39,90', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400', description: 'Aprenda a pensar como os grandes investidores e mude sua relação com o dinheiro para sempre.', rating: '4.8', reviews: '850', pages: '210', published: '2022' },
    { id: '5', title: 'Pai Rico, Pai Pobre', author: 'Robert Kiyosaki', type: 'E-Book', price: 'R$ 54,90', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400', description: 'O clássico sobre finanças pessoais que ensina a diferença entre ativos e passivos.', rating: '4.9', reviews: '5k', pages: '336', published: '2017' },
    { id: '6', title: 'A Psicologia Financeira', author: 'Morgan Housel', type: 'E-Book', price: 'R$ 45,00', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', description: 'Entenda como o ego, o preconceito e o marketing influenciam suas decisões de investimento.', rating: '4.7', reviews: '2.1k', pages: '240', published: '2021' },

    // Cursos
    { id: '2', title: 'Masterclass: Criptoeconomia', author: 'Especialista Convidado', type: 'Curso', price: 'R$ 297,00', image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400', tag: 'Lançamento', description: 'Mergulhe no mundo das criptomoedas, DEFI e Web3 com quem realmente entende do mercado.', rating: '5.0', reviews: '320', pages: '12 Módulos', published: '2024' },
    { id: '7', title: 'Método Dividendos Infinitos', author: 'Ana Silva', type: 'Curso', price: 'R$ 497,00', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400', description: 'A estratégia focada em renda passiva para você viver de dividendos em menos de 10 anos.', rating: '4.9', reviews: '1.1k', pages: '24 Aulas', published: '2023' },
    { id: '8', title: 'Day Trade do Zero', author: 'Marcos Oliver', type: 'Curso', price: 'R$ 197,00', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400', description: 'Aprenda a ler gráficos e operar no mercado intradiário com gerenciamento de risco profissional.', rating: '4.6', reviews: '450', pages: '18 Aulas', published: '2023' },

    // Ferramentas
    { id: '3', title: 'Planilha de Ativos Black', author: 'POUP Pro', type: 'Ferramenta', price: 'R$ 29,90', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400', description: 'O dashboard mais completo para controlar seus investimentos em ações, FIIs e Exterior.', rating: '4.9', reviews: '2.3k', pages: 'Excel/Google Sheets', published: 'V2.4' },
    { id: '9', title: 'Dashboard de Imposto de Renda', author: 'POUP Tech', type: 'Ferramenta', price: 'R$ 89,90', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400', description: 'Automatize sua declaração de IR e evite cair na malha fina com nossa planilha inteligente.', rating: '4.8', reviews: '600', pages: 'Automatizado', published: '2024' },
    { id: '10', title: 'Calculadora de Juros Pro', author: 'POUP Tech', type: 'Ferramenta', price: 'R$ 19,90', image: 'https://images.unsplash.com/photo-1518183275089-7e1c9ef51771?auto=format&fit=crop&q=80&w=400', description: 'Simule aportes, taxas e prazos com precisão matemática para planejar sua independência.', rating: '4.9', reviews: '150', pages: 'Multi-moeda', published: '2023' },

    // Mentorias
    { id: '11', title: 'Mentoria Individual: 1 Mi', author: 'Founder POUP', type: 'Mentoria', price: 'R$ 2.497,00', image: 'https://images.unsplash.com/photo-1521791136364-798a7bc0d26c?auto=format&fit=crop&q=80&w=400', description: 'Atendimento exclusivo via Zoom para desenhar seu plano rumo ao primeiro milhão investido.', rating: '5.0', reviews: '95', pages: '4 Encontros', published: 'Vagas Limitadas' },
    { id: '12', title: 'Grupo Mastermind Elite', author: 'Coletivo POUP', type: 'Mentoria', price: 'R$ 997,00/mês', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400', description: 'Comunidade fechada para debate de teses de investimento e networking de alto nível.', rating: '4.9', reviews: '210', pages: 'Call Semanal', published: 'Aberto' },

    // Networking
    { id: '13', title: 'Acesso VIP: Platinum', author: 'POUP Networking', type: 'Networking', price: 'R$ 1.200,00', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400', description: 'O clube de benefícios mais exclusivo do Brasil para investidores profissionais e HNWI.', rating: '5.0', reviews: '55', pages: 'Vitalício', published: 'VIP' },
    { id: '14', title: 'Conferência Investidor 2024', author: 'Eventos POUP', type: 'Networking', price: 'R$ 850,00', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=400', description: 'Assista as maiores mentes das finanças brasileiras ao vivo em São Paulo. Evento presencial.', rating: '4.8', reviews: '400', pages: 'Ingresso Presencial', published: 'Maio/24' },

    // Adicionais
    { id: '15', title: 'E-Book: Guia de FIIs', author: 'Junior Invest', type: 'E-Book', price: 'R$ 24,90', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400', description: 'Aprenda a escolher os melhores fundos imobiliários e receba aluguéis todos os meses.', rating: '4.5', reviews: '340', pages: '120', published: '2023' },
    { id: '16', title: 'Curso: Ações Americanas', author: 'Global Trade', type: 'Curso', price: 'R$ 397,00', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400', description: 'O passo a passo para dolarizar seu patrimônio e investir na NASDAQ e NYSE com segurança.', rating: '4.8', reviews: '180', pages: '20 Módulos', published: '2024' },
    { id: '17', title: 'Planilha Rebalanceamento', author: 'POUP Lab', type: 'Ferramenta', price: 'R$ 49,90', image: 'https://images.unsplash.com/photo-1543286386-2a6dbc9f051c?auto=format&fit=crop&q=80&w=400', description: 'Ferramenta para manter seus pesos ideais na carteira sem complicação ou erro de cálculo.', rating: '4.7', reviews: '120', pages: 'Automatizada', published: 'V3' },
    { id: '18', title: 'Mentoria Express (30min)', author: 'Consultores POUP', type: 'Mentoria', price: 'R$ 197,00', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400', description: 'Tire suas dúvidas pontuais com nossos analistas certificados em uma sessão rápida e objetiva.', rating: '4.9', reviews: '250', pages: 'Sessão Única', published: 'Sob Demanda' },
    { id: '19', title: 'Clube do Livro Financeiro', author: 'POUP Books', type: 'Networking', price: 'R$ 29,90/mês', image: 'https://images.unsplash.com/photo-1491849593786-b248a391f76b?auto=format&fit=crop&q=80&w=400', description: 'Leia as obras mais importantes sobre dinheiro e discuta com outros membros mensalmente.', rating: '4.6', reviews: '90', pages: 'Mensal', published: 'Online' },
    { id: '20', title: 'API de Dados Financeiros', author: 'POUP Dev', type: 'Ferramenta', price: 'R$ 149,90/mês', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400', description: 'Integração para desenvolvedores que precisam de cotações em tempo real para seus sistemas.', rating: '5.0', reviews: '45', pages: 'RESTful', published: 'Beta' },
    { id: '21', title: 'E-Book: Swing Trade Ágil', author: 'Trader X', type: 'E-Book', price: 'R$ 67,00', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400', description: 'Aproveite as oscilações de curto prazo para multiplicar seu capital com análise técnica.', rating: '4.4', reviews: '110', pages: '150', published: '2022' },
    { id: '22', title: 'Mentoria Carreira Finanças', author: 'HR Experts', type: 'Mentoria', price: 'R$ 597,00', image: 'https://images.unsplash.com/photo-1454165833767-027ffea7025c?auto=format&fit=crop&q=80&w=400', description: 'Entenda como entrar nas maiores instituições financeiras do país e turbinar seu salário.', rating: '4.8', reviews: '65', pages: '3 Sessões', published: 'Aberto' },
    { id: '23', title: 'Webinar: IA na Economia', author: 'POUP Vision', type: 'Curso', price: 'Grátis', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400', description: 'Como a inteligência artificial está moldando o futuro dos mercados globais e suas finanças.', rating: '4.9', reviews: '1.5k', pages: 'Acesso Livre', published: '2024' },
];

export default function Shop() {
    const navigate = useNavigate();

    const categories = [
        { id: 'ebooks', name: 'E-Books', icon: 'menu_book' },
        { id: 'courses', name: 'Cursos', icon: 'school' },
        { id: 'tools', name: 'Ferramentas', icon: 'construction' },
        { id: 'mentorship', name: 'Mentorias', icon: 'group' },
        { id: 'networking', name: 'Networking', icon: 'hub' },
    ];

    return (
        <div className="bg-background-dark font-display min-h-screen flex flex-col pt-6 pb-32 overflow-x-hidden selection:bg-primary/30">
            {/* Header Centered */}
            <header className="px-6 mb-8 relative flex items-center justify-center min-h-[60px]">
                <div className="text-center">
                    <h1 className="text-3xl font-extralight text-off-white tracking-tight">
                        POUP <span className="font-bold text-primary">Shop</span>
                    </h1>
                    <p className="text-light-gray text-[10px] mt-0.5 opacity-70 tracking-[0.3em] uppercase">Marketplace do Investidor</p>
                </div>
            </header>

            {/* Floating Cart Button */}
            <button
                className="fixed top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center bg-zinc-900/40 backdrop-blur-2xl border border-primary/30 z-[100] shadow-[0_15px_30px_rgba(15,182,127,0.2)] active:scale-95 transition-all text-primary animate-levitation"
            >
                <span className="material-symbols-outlined text-2xl filled">shopping_cart</span>
                {/* Badge if needed */}
                <div className="absolute top-3 right-3 w-4 h-4 bg-primary text-black text-[9px] font-black rounded-full flex items-center justify-center ring-4 ring-black/40">
                    0
                </div>
            </button>

            {/* Categories */}
            <div className="px-6 mb-8 overflow-x-auto no-scrollbar flex gap-3 pb-2 -mx-6 px-6">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => {
                            if (category.id === 'ebooks') navigate('/ebooks');
                            if (category.id === 'courses') navigate('/courses');
                            if (category.id === 'mentorship') navigate('/mentorships');
                        }}
                        className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-surface rounded-2xl border border-white/5 shrink-0 hover:bg-white/5 active:scale-95 transition-all group"
                    >
                        <span className="material-symbols-outlined text-primary mb-1 group-hover:scale-110 transition-transform">{category.icon}</span>
                        <span className="text-[10px] text-light-gray font-semibold uppercase tracking-wider">{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Featured Banner - Styled without image, with soft green green light BEHIND border */}
            <div className="px-6 mb-10">
                <style>{`
                    .glow-container::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 100%;
                        height: 100%;
                        background: rgba(15, 182, 127, 0.15);
                        filter: blur(40px);
                        border-radius: 32px;
                        z-index: -1;
                        pointer-events: none;
                    }

                    @keyframes levitation {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    .animate-levitation {
                        animation: levitation 3s ease-in-out infinite;
                    }
                `}</style>
                <div
                    onClick={() => navigate('/ebook/1')}
                    className="glow-container relative w-full h-48 rounded-[32px] overflow-hidden group border border-primary/20 bg-black cursor-pointer transition-all hover:border-primary/40"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-transparent to-primary/[0.02] z-10">
                        <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.3em] rounded mb-3">Oferta Exclusiva</span>
                        <h2 className="text-white text-xl font-bold leading-tight group-hover:scale-[1.02] transition-transform">Masterclass de <br />Análise Fundamentalista</h2>
                        <button className="mt-4 flex items-center gap-1 text-[11px] text-primary font-bold uppercase tracking-widest hover:gap-2 transition-all">
                            Ver Detalhes <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products List - Mapping all 20+ items */}
            <div className="px-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-lg font-bold">Explorar</h3>
                    <div className="flex gap-2">
                        <span className="text-zinc-600 text-[10px] font-bold uppercase">Filtrar</span>
                        <span className="material-symbols-outlined text-zinc-600 text-sm">tune</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {allProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/ebook/${product.id}`)}
                            className="flex gap-4 p-4 rounded-3xl bg-surface/30 border border-white/5 hover:border-primary/20 transition-all active:scale-[0.98] cursor-pointer group"
                        >
                            <div className="relative w-24 h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-900 border border-white/5">
                                <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                {product.tag && (
                                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary text-black text-[8px] font-bold uppercase tracking-widest rounded shadow-[0_0_10px_rgba(15,182,127,0.4)]">
                                        {product.tag}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center flex-1">
                                <span className="text-[10px] text-primary font-bold uppercase tracking-widest opacity-80 mb-1">{product.type}</span>
                                <h4 className="text-off-white text-sm font-bold leading-snug line-clamp-2">{product.title}</h4>
                                <span className="text-zinc-500 text-[11px] mt-1">{product.author}</span>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-white font-bold">{product.price}</span>
                                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-colors group-hover:border-primary/30">
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
