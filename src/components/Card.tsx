import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`bg-zinc-950 border border-zinc-900 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-all' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
