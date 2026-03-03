import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    onBack?: () => void;
    rightElement?: ReactNode;
    sticky?: boolean;
}

export default function Header({
    title,
    subtitle,
    showBack = false,
    onBack,
    rightElement,
}: HeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <header className="px-6 pt-4 pb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {showBack && (
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 hover:bg-zinc-900/50 rounded-full transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[#FCFCFC] text-2xl">arrow_back_ios_new</span>
                    </button>
                )}
                <div className="space-y-1">
                    {title && <h1 className="text-sm font-display font-bold tracking-[0.2em] uppercase">{title}</h1>}
                    {subtitle && <p className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-bold">{subtitle}</p>}
                </div>
            </div>
            {rightElement && (
                <div className="flex items-center">
                    {rightElement}
                </div>
            )}
            {!rightElement && showBack && <div className="w-10"></div>}
        </header>
    );
}
