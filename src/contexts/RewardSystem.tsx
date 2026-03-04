import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from './DataContext';

interface Reward {
    type: 'xp' | 'discount' | 'multiplier';
    value: string;
    label: string;
    icon: string;
}

export const RewardSystem: React.FC = () => {
    const { level, addXP } = useData();
    const [showChest, setShowChest] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [reward, setReward] = useState<Reward | null>(null);
    const [lastLevel, setLastLevel] = useState(() => Number(localStorage.getItem('poup_last_awarded_level') || level));

    useEffect(() => {
        const handleLevelUp = (e: any) => {
            setShowChest(true);
            setLastLevel(e.detail.level);
            localStorage.setItem('poup_last_awarded_level', String(e.detail.level));
        };

        window.addEventListener('level_up', handleLevelUp);

        // Also check if level > lastLevel on mount/update (fallback)
        if (level > lastLevel) {
            setShowChest(true);
            setLastLevel(level);
            localStorage.setItem('poup_last_awarded_level', String(level));
        }

        return () => window.removeEventListener('level_up', handleLevelUp);
    }, [level, lastLevel]);

    const rewards: Reward[] = [
        { type: 'xp', value: '500', label: 'Bônus de XP Massivo', icon: 'auto_awesome', weight: 40 },
        { type: 'discount', value: '20%', label: 'Desconto Arsenal Black', icon: 'payments', weight: 30 },
        { type: 'multiplier', value: '2x', label: 'Multiplicador de XP (1h)', icon: 'bolt', weight: 20 },
        { type: 'discount', value: '50%', label: 'CUPOM LENDÁRIO', icon: 'diamond', weight: 10 },
    ] as any;

    const handleOpenChest = () => {
        setIsOpening(true);

        // Strategic delay for tension
        setTimeout(() => {
            const random = Math.random() * 100;
            let cumulativeWeight = 0;
            let selectedReward = rewards[0];

            for (const r of (rewards as any)) {
                cumulativeWeight += r.weight;
                if (random <= cumulativeWeight) {
                    selectedReward = r;
                    break;
                }
            }

            setReward(selectedReward);
            setIsOpening(false);

            if (selectedReward.type === 'xp') {
                addXP(parseInt(selectedReward.value));
            }
        }, 2000);
    };

    const closeAll = () => {
        setShowChest(false);
        setReward(null);
    };

    return (
        <AnimatePresence>
            {showChest && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
                >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full"></div>
                    </div>

                    {!reward ? (
                        <div className="text-center space-y-8">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="space-y-2"
                            >
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block">Nível {level} Alcançado</span>
                                <h2 className="text-3xl font-black text-white italic premium-text-glow">BAÚ DE PRESTÍGIO</h2>
                            </motion.div>

                            <motion.div
                                animate={isOpening ? {
                                    rotate: [0, -5, 5, -5, 5, 0],
                                    scale: [1, 1.1, 1],
                                } : {
                                    y: [0, -20, 0]
                                }}
                                transition={isOpening ? {
                                    duration: 0.2,
                                    repeat: Infinity
                                } : {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                onClick={!isOpening ? handleOpenChest : undefined}
                                className={`w-64 h-64 mx-auto relative cursor-pointer group ${isOpening ? 'pointer-events-none' : ''}`}
                            >
                                {/* Luxury Chest Visual */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-8xl text-primary drop-shadow-[0_0_30px_rgba(15,182,127,0.5)] filled">
                                        {isOpening ? 'lock_open' : 'inventory_2'}
                                    </span>

                                    {/* Shimmer on Chest */}
                                    <motion.div
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-white/10 skew-x-12 blur-md"
                                    />
                                </div>
                            </motion.div>

                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] animate-pulse">
                                {isOpening ? 'Sincronizando Recompensas...' : 'Toque no baú para resgatar'}
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-10"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 bg-primary rounded-full blur-xl"
                                />
                                <div className="w-40 h-40 bg-zinc-950 border-2 border-primary rounded-[2.5rem] mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(15,182,127,0.3)]">
                                    <span className="material-symbols-outlined text-6xl text-primary filled">{reward.icon}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] block mb-2">Desbloqueio Épico</span>
                                    <h3 className="text-4xl font-black text-white italic tracking-tighter">{reward.value}</h3>
                                    <p className="text-sm font-black text-primary uppercase tracking-widest mt-1">{reward.label}</p>
                                </motion.div>
                            </div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                onClick={closeAll}
                                className="px-12 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-primary transition-colors active:scale-95 shadow-2xl"
                            >
                                Adicionar ao Inventário
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
