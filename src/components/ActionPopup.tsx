import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ActionPopupProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'confirm' | 'success' | 'delete';
}

export default function ActionPopup({
    isOpen,
    title,
    description,
    confirmText,
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    type = 'confirm'
}: ActionPopupProps) {

    const getIcon = () => {
        switch (type) {
            case 'success': return 'verified';
            case 'delete': return 'error';
            default: return 'info';
        }
    };

    const getColorClass = () => {
        switch (type) {
            case 'success': return 'text-primary border-primary/20 shadow-[0_0_20px_rgba(15,182,127,0.2)]';
            case 'delete': return 'text-red-500 border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
            default: return 'text-blue-500 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]';
        }
    };

    const getBtnClass = () => {
        switch (type) {
            case 'success': return 'bg-primary text-black shadow-[0_15px_30px_rgba(15,182,127,0.2)]';
            case 'delete': return 'bg-red-500 text-white shadow-[0_15px_30px_rgba(239,68,68,0.2)]';
            default: return 'bg-white text-black shadow-[0_15px_30px_rgba(255,255,255,0.1)]';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                        onClick={onCancel}
                    ></motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        className="relative w-full max-w-sm transparent-card-border rounded-[3.5rem] bg-zinc-950 p-12 text-center border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-primary/20 blur-[60px] rounded-full"></div>
                            <div className="absolute bottom-[-20%] right-[-20%] w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full"></div>
                        </div>

                        <div className={`w-20 h-20 rounded-[2.5rem] bg-zinc-900 border flex items-center justify-center mx-auto mb-8 relative z-10 ${getColorClass()}`}>
                            <span className="material-symbols-outlined text-4xl font-black">{getIcon()}</span>
                        </div>

                        <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-4 relative z-10">
                            {title}
                        </h2>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] leading-relaxed mb-10 relative z-10">
                            {description}
                        </p>

                        <div className="flex flex-col gap-4 relative z-10">
                            <button
                                onClick={onConfirm}
                                className={`w-full h-18 rounded-[2rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group 
                                    ${type === 'delete' ? 'hover:bg-red-500 hover:shadow-[0_20px_50px_rgba(239,68,68,0.2)]' : 'hover:bg-primary hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                            >
                                {confirmText}
                            </button>

                            {type !== 'success' && (
                                <button
                                    onClick={onCancel}
                                    className="w-full h-16 rounded-2xl bg-zinc-950/50 border border-white/5 text-zinc-500 font-bold text-[10px] tracking-[0.2em] uppercase transition-all hover:text-white"
                                >
                                    {cancelText}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
