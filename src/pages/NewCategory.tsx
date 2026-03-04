import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';
import Header from '../components/Header';

export default function NewCategory() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { refreshData } = useData();
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('category');
    const [selectedColor, setSelectedColor] = useState('#0fb67f');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const icons = [
        'category', 'shopping_cart', 'directions_car', 'restaurant',
        'payments', 'fitness_center', 'medical_services', 'flight',
        'home', 'celebration', 'school', 'savings'
    ];

    const colors = [
        '#0fb67f', '#3b82f6', '#a855f7', '#ec4899',
        '#ef4444', '#f59e0b', '#eab308', '#14b8a6'
    ];

    const handleSave = async () => {
        if (!user || !name) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('categories').insert([
                {
                    user_id: user.id,
                    name,
                    icon: selectedIcon,
                    color: selectedColor,
                    planned_budget: 0
                }
            ]);

            if (error) throw error;
            await refreshData();
            setShowSuccess(true);
        } catch (err) {
            console.error('Error creating category:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <Header title="Criar" showBack />

            <main className="flex-grow px-6 pb-40 pt-4">
                <div className="flex flex-col mb-10">
                    <h2 className="text-[24px] font-display font-black tracking-tighter uppercase text-white leading-tight">Nova<br /><span className="text-primary italic">Categoria</span></h2>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] mt-3 opacity-60">Expanda os horizontes do seu ecossistema</p>
                </div>

                <div className="transparent-card-border rounded-[2.5rem] p-8 space-y-10 mb-10">
                    <div className="space-y-4">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Nome da Categoria</label>
                        <input
                            className="w-full bg-transparent border-none p-0 text-2xl font-display font-bold text-white focus:ring-0 focus:outline-none placeholder-zinc-900"
                            type="text"
                            placeholder="Ex: Entretenimento"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent"></div>
                    </div>

                    <div className="space-y-6">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Seletor de Ícone</label>
                        <div className="grid grid-cols-4 gap-4">
                            {icons.map((icon) => (
                                <button
                                    key={icon}
                                    onClick={() => setSelectedIcon(icon)}
                                    className={`aspect-square rounded-2xl flex items-center justify-center border transition-all duration-300 active:scale-90 ${selectedIcon === icon
                                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(15,182,127,0.2)] text-primary'
                                        : 'bg-zinc-900/40 border-white/5 text-zinc-700 hover:text-zinc-500'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-2xl ${selectedIcon === icon ? 'filled scale-110' : ''}`}>{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label className="block text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase px-1">Espectro de Cor</label>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`flex-shrink-0 w-10 h-10 rounded-full transition-all duration-300 active:scale-90 relative ${selectedColor === color
                                        ? 'ring-2 ring-white ring-offset-4 ring-offset-black scale-110'
                                        : 'opacity-40 hover:opacity-100'
                                        }`}
                                    style={{ backgroundColor: color }}
                                >
                                    {selectedColor === color && (
                                        <div className="absolute inset-0 bg-white/20 blur-lg rounded-full animate-pulse"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={!name || loading}
                    className={`w-full h-16 rounded-[2rem] font-display font-black tracking-[0.4em] uppercase text-[11px] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 ${name && !loading
                        ? 'bg-primary text-black shadow-[0_20px_40px_rgba(15,182,127,0.2)]'
                        : 'bg-zinc-900 text-zinc-700 opacity-50 cursor-not-allowed border border-white/5'
                        }`}
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                            <span>Processando...</span>
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-base">rocket_launch</span>
                            <span>Consolidar Categoria</span>
                        </>
                    )}
                </button>
            </main>

            <ActionPopup
                isOpen={showSuccess}
                title="Consolidado!"
                description="A nova categoria foi integrada ao seu ecossistema com sucesso."
                confirmText="Visualizar Estrutura"
                type="success"
                onConfirm={() => navigate('/manage-categories')}
                onCancel={() => navigate('/manage-categories')}
            />
        </div>
    );
}
