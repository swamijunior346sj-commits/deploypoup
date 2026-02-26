import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="bg-background-dark text-white font-sans min-h-screen flex flex-col items-center justify-between px-8 py-12">
            <div className="flex flex-col items-center mt-12">
                <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-primary font-display">$</span>
                </div>
                <h1 className="text-center text-xs font-display font-bold tracking-[0.3em] uppercase leading-relaxed max-w-[200px]">
                    Criar Nova Conta
                </h1>
            </div>

            <div className="w-full max-w-sm space-y-10">
                <form onSubmit={handleSignup} className="space-y-8">
                    <div className="relative">
                        <label className="block text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-1">E-mail</label>
                        <input
                            className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-zinc-800 px-0 py-2 text-sm placeholder:text-zinc-700 focus:border-white transition-colors duration-300 outline-none"
                            placeholder="seu@email.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="block text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-1">Senha</label>
                        <input
                            className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-zinc-800 px-0 py-2 text-sm placeholder:text-zinc-700 focus:border-white transition-colors duration-300 outline-none"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black h-14 rounded-full flex items-center justify-center space-x-3 hover:bg-zinc-100 transition-all active:scale-[0.98] duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] group disabled:opacity-50"
                    >
                        <span className="font-display font-bold text-xs tracking-[0.2em] uppercase ml-4">
                            {loading ? 'Criando...' : 'Cadastrar'}
                        </span>
                        <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                    </button>
                </form>
            </div>

            <div className="w-full space-y-12">
                <div className="flex flex-col items-center space-y-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase hover:text-white transition-colors"
                    >
                        Já tem uma conta? Entrar
                    </button>
                </div>
                <footer className="flex items-center justify-center space-x-2 text-zinc-800">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <p className="text-[8px] font-bold tracking-[0.4em] uppercase">
                        POWERED BY POUP INTELLIGENCE
                    </p>
                </footer>
            </div>
        </div>
    );
}
