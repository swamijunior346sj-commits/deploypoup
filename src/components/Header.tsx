import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    showBack?: boolean;
    rightElement?: ReactNode;
    sticky?: boolean;
}

export default function Header({
    title,
    subtitle,
    showBack = false,
    rightElement,
    sticky = true
}: HeaderProps) {
    const navigate = useNavigate();

    return (
        <header className={`${sticky ? 'sticky top-0 z-40' : ''} px-6 pt-12 pb-6 flex items-center justify-between bg-background-dark/80 backdrop-blur-md`}>
            <div className="flex items-center space-x-4">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 active:scale-95 transition-transform"
                    >
                        <span className="material-symbols-outlined text-zinc-300 text-sm">arrow_back_ios_new</span>
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
