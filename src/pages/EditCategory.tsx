import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category || {
        id: '1',
        name: 'Moradia',
        spent: 1250,
        planned: 1500,
        icon: 'home',
        color: '#0fb67f'
    };

    const [name, setName] = useState(category.name);
    const [selectedIcon, setSelectedIcon] = useState(category.icon);
    const [selectedColor, setSelectedColor] = useState(category.color || '#0fb67f');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const icons = [
        'home', 'shopping_cart', 'directions_car', 'restaurant',
        'payments', 'fitness_center', 'medical_services', 'flight'
    ];

    const colors = [
        '#0fb67f', '#3b82f6', '#a855f7', '#ec4899',
        '#ef4444', '#f59e0b', '#eab308', '#14b8a6'
    ];

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col">
            <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-30">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-zinc-400 text-sm">arrow_back_ios_new</span>
                </button>
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">EDITAR CATEGORIA</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-6 pb-40">
                <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-6">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Nome da Categoria</label>
                    <input
                        className="w-full bg-transparent border-none p-0 text-xl font-medium text-white focus:ring-0 focus:outline-none"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-8">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4 px-2">Ícone</label>
                    <div className="grid grid-cols-4 gap-4">
                        {icons.map((icon) => (
                            <button
                                key={icon}
                                onClick={() => setSelectedIcon(icon)}
                                className={`aspect-square rounded-2xl flex items-center justify-center border transition-all active:scale-90 ${selectedIcon === icon
                                    ? 'bg-primary/10 border-primary/40 text-primary'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-2xl ${selectedIcon === icon ? 'filled' : ''}`}>{icon}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4 px-2">Cor da Categoria</label>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
                        {colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`flex-shrink-0 w-8 h-8 rounded-full transition-all active:scale-90 ${selectedColor === color
                                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110'
                                    : ''
                                    }`}
                                style={{ backgroundColor: color }}
                            ></button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-primary py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                        SALVAR ALTERAÇÕES
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full bg-transparent border border-zinc-800 py-5 rounded-2xl text-zinc-500 font-display font-bold tracking-[0.1em] uppercase text-sm hover:bg-zinc-900/50 active:scale-[0.98] transition-all"
                    >
                        EXCLUIR CATEGORIA
                    </button>
                </div>

                <footer className="mt-12 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">POWERED BY POUP INTELLIGENCE</p>
                    </div>
                </footer>
            </main>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6 animate-in fade-in duration-300">
                    <div className="w-full max-w-sm bg-[#121212] border border-zinc-800 rounded-[32px] p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(15,182,127,0.15)] animate-in zoom-in-95 duration-300">
                        <div className="mb-6">
                            <span className="material-symbols-outlined text-primary text-6xl !font-light">warning</span>
                        </div>
                        <h2 className="text-white font-display font-bold text-xl tracking-tight mb-4">EXCLUIR CATEGORIA?</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                            Tem certeza que deseja apagar a categoria <span className="text-white font-semibold">{name}</span>? Todas as subcategorias vinculadas também serão removidas.
                        </p>
                        <div className="w-full flex flex-col gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full bg-primary py-4 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                            >
                                CANCELAR
                            </button>
                            <button
                                onClick={() => navigate('/manage-categories')}
                                className="w-full bg-transparent py-3 rounded-2xl text-[#a7a7a7] font-display font-bold tracking-[0.1em] uppercase text-xs hover:text-white transition-colors"
                            >
                                SIM, EXCLUIR
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
