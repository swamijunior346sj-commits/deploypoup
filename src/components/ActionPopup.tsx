import React from 'react';

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
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success': return 'check_circle';
            case 'delete': return 'delete_forever';
            default: return 'help';
        }
    };

    const getIconColor = () => {
        switch (type) {
            case 'success': return 'text-primary';
            case 'delete': return 'text-red-500';
            default: return 'text-primary';
        }
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCancel}></div>
            <div className="relative w-full max-w-sm bg-zinc-900 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6`}>
                        <span className={`material-symbols-outlined text-4xl font-bold ${getIconColor()}`}>{getIcon()}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">{title}</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                        {description}
                    </p>

                    <div className="w-full space-y-3">
                        <button
                            onClick={onConfirm}
                            className={`w-full py-4 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase transition-all active:scale-95 ${type === 'delete'
                                    ? 'bg-red-500 text-white shadow-[0_10px_20px_rgba(239,68,68,0.2)]'
                                    : 'bg-primary text-black shadow-[0_10px_20px_rgba(15,182,127,0.2)]'
                                }`}
                        >
                            {confirmText}
                        </button>

                        {type !== 'success' && (
                            <button
                                onClick={onCancel}
                                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-xs tracking-[0.2em] uppercase active:scale-95 transition-all"
                            >
                                {cancelText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
