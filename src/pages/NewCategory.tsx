import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewCategory() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('category');
    const [selectedColor, setSelectedColor] = useState('#0fb67f');

    const icons = [
        'category', 'shopping_cart', 'directions_car', 'restaurant',
        'payments', 'fitness_center', 'medical_services', 'flight',
        'home', 'celebration', 'school', 'savings'
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
                <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">NOVA CATEGORIA</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow px-6 pb-40">
                <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-6">
                    <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Nome da Categoria</label>
                    <input
                        className="w-full bg-transparent border-none p-0 text-xl font-medium text-white focus:ring-0 focus:outline-none placeholder-zinc-700"
                        type="text"
                        placeholder="Ex: Viagens"
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
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-600'
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
                        disabled={!name}
                        className={`w-full py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-lg transition-all ${name ? 'bg-primary shadow-primary/20 hover:opacity-90 active:scale-[0.98]' : 'bg-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed'
                            }`}
                    >
                        CRIAR CATEGORIA
                    </button>
                </div>

                <footer className="mt-12 py-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-800">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">POWERED BY POUP INTELLIGENCE</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
