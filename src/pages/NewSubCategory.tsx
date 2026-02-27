import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NewSubCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialCategory = location.state?.category || { id: 'moradia', name: 'Moradia', icon: 'home' };

    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('description');
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [selectedParent, setSelectedParent] = useState(initialCategory);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const mainCategories = [
        { id: 'moradia', name: 'Moradia', icon: 'home' },
        { id: 'alimentacao', name: 'Alimentação', icon: 'restaurant' },
        { id: 'transporte', name: 'Transporte', icon: 'directions_car' },
        { id: 'lazer', name: 'Lazer', icon: 'celebration' },
        { id: 'saude', name: 'Saúde', icon: 'medical_services' },
        { id: 'educacao', name: 'Educação', icon: 'school' },
        { id: 'investimentos', name: 'Investimentos', icon: 'savings' },
        { id: 'assinaturas', name: 'Assinaturas', icon: 'subscriptions' },
        { id: 'outros', name: 'Outros', icon: 'more_horiz' },
    ];

    const icons = [
        'description', 'receipt_long', 'water_drop', 'bolt',
        'wifi', 'cleaning_services', 'weekend', 'key'
    ];

    return (
        <div className={`bg-black text-white font-sans flex flex-col min-h-screen ${showSuccessModal ? 'overflow-hidden' : ''}`}>
            <div className={showSuccessModal ? 'opacity-30 pointer-events-none transition-opacity duration-300' : 'transition-opacity duration-300'}>
                <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center active:scale-90 transition-transform"
                    >
                        <span className="material-symbols-outlined text-zinc-400 text-sm">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-xs font-display font-bold tracking-[0.2em] uppercase text-center">NOVA SUBCATEGORIA</h1>
                    <div className="w-10"></div>
                </header>

                <main className="flex-grow px-6 pb-40">
                    <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-4 relative">
                        <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Categoria Pai</label>
                        <div
                            onClick={() => setShowCategorySelect(!showCategorySelect)}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">{selectedParent.icon}</span>
                                </div>
                                <div>
                                    <span className="text-lg font-medium text-white block">{selectedParent.name}</span>
                                </div>
                            </div>
                            <span className={`material-symbols-outlined text-zinc-600 transition-transform ${showCategorySelect ? 'rotate-180' : ''}`}>expand_more</span>
                        </div>

                        {showCategorySelect && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-[#18181b] border border-zinc-800 rounded-2xl p-2 z-50 max-h-60 overflow-y-auto shadow-2xl">
                                {mainCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setSelectedParent(cat);
                                            setShowCategorySelect(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 rounded-xl transition-colors text-left"
                                    >
                                        <span className="material-symbols-outlined text-primary text-lg">{cat.icon}</span>
                                        <span className="text-sm font-medium">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 mb-8">
                        <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-4">Nome da Subcategoria</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-xl font-medium focus:ring-0 placeholder:text-zinc-700 text-white focus:outline-none"
                            placeholder="Ex: Aluguel, Condomínio..."
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="h-px w-full bg-zinc-800 mt-2"></div>
                    </div>

                    <div className="mb-12">
                        <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-6 px-2">Ícone</label>
                        <div className="grid grid-cols-4 gap-4">
                            {icons.map((icon) => (
                                <button
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`aspect-square rounded-xl flex items-center justify-center border transition-all active:scale-90 ${selectedIcon === icon
                                        ? 'bg-primary/10 border-primary/20 text-primary'
                                        : 'bg-zinc-900/50 border-zinc-800/50 text-primary/40'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-2xl ${selectedIcon === icon ? 'filled' : ''}`}>{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSuccessModal(true)}
                        disabled={!name}
                        className={`w-full py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-xl transition-all ${name ? 'bg-primary shadow-primary/20 hover:opacity-90 active:scale-[0.98]' : 'bg-zinc-800 text-zinc-600 opacity-50 cursor-not-allowed'
                            }`}
                    >
                        Criar Subcategoria
                    </button>

                    <footer className="mt-20 py-4">
                        <div className="flex items-center justify-center space-x-2 text-zinc-800">
                            <span className="material-symbols-outlined text-base">auto_awesome</span>
                            <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">
                                POWERED BY POUP INTELLIGENCE
                            </p>
                        </div>
                    </footer>
                </main>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-8 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300">
                    <div className="bg-[#121212] border border-zinc-800 rounded-[32px] p-10 w-full max-w-sm text-center shadow-[0_0_20px_rgba(15,182,127,0.15)] animate-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 relative">
                            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
                            <span className="material-symbols-outlined text-primary text-5xl relative z-10 font-bold">check</span>
                        </div>
                        <h2 className="text-xl font-display font-bold tracking-wider text-white mb-3">SUBCATEGORIA CRIADA!</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-10 px-4">
                            A subcategoria foi adicionada com sucesso à <span className="text-white font-semibold">{selectedParent.name}</span>.
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full bg-primary py-5 rounded-2xl text-black font-display font-bold tracking-[0.1em] uppercase text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
                        >
                            ENTENDI
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
