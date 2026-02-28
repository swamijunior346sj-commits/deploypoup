import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!termsAccepted) {
            setError('Você precisa aceitar os Termos de Uso.');
            return;
        }
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/onboarding');
        }
        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/consent'
            }
        });
        if (error) setError(error.message);
    };

    return (
        <div className="bg-background-dark font-display antialiased text-[#FCFCFC] min-h-screen">
            <div className="relative flex h-auto min-h-screen w-full max-w-[430px] mx-auto flex-col bg-background-dark p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => navigate(-1)} className="text-[#FCFCFC] hover:opacity-80 transition-opacity active:scale-95">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold flex-1 text-center pr-6">Crie sua Conta</h1>
                </div>

                {/* Hero */}
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold leading-tight mb-3">Comece sua jornada para a liberdade financeira.</h2>
                    <p className="text-[#D6D6D6] text-sm font-medium">Cadastre-se para acessar recursos premium do Gestão Financeira Inteligente.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup} className="flex flex-col gap-8">
                    {/* Nome */}
                    <div className="custom-input flex flex-col gap-1 border-b border-[#222426] transition-colors duration-300 focus-within:border-primary">
                        <label className="text-xs font-semibold tracking-wider text-[#D6D6D6] uppercase">Nome Completo</label>
                        <input
                            className="bg-transparent border-none px-0 py-3 text-[#FCFCFC] placeholder:text-[#D6D6D6]/40 focus:ring-0 text-base"
                            placeholder="Como deseja ser chamado?"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* E-mail */}
                    <div className="custom-input flex flex-col gap-1 border-b border-[#222426] transition-colors duration-300 focus-within:border-primary">
                        <label className="text-xs font-semibold tracking-wider text-[#D6D6D6] uppercase">E-mail</label>
                        <input
                            className="bg-transparent border-none px-0 py-3 text-[#FCFCFC] placeholder:text-[#D6D6D6]/40 focus:ring-0 text-base"
                            placeholder="seu@email.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Senha */}
                    <div className="custom-input flex flex-col gap-1 border-b border-[#222426] transition-colors duration-300 focus-within:border-primary relative">
                        <label className="text-xs font-semibold tracking-wider text-[#D6D6D6] uppercase">Senha</label>
                        <input
                            className="bg-transparent border-none px-0 py-3 text-[#FCFCFC] placeholder:text-[#D6D6D6]/40 focus:ring-0 text-base pr-10"
                            placeholder="Mínimo 8 caracteres"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="material-symbols-outlined absolute right-0 bottom-3 text-[#D6D6D6]/60 cursor-pointer hover:text-[#FCFCFC] transition-colors"
                        >
                            {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-3 mt-2">
                        <label className="relative flex items-center cursor-pointer">
                            <input
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#222426] bg-transparent checked:bg-primary checked:border-primary transition-all"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <span className="material-symbols-outlined absolute text-black font-bold scale-0 peer-checked:scale-100 transition-transform left-0.5 text-base">check</span>
                        </label>
                        <p className="text-sm text-[#D6D6D6]">Aceito os <span className="text-primary hover:underline cursor-pointer">Termos de Uso</span> e Política de Privacidade</p>
                    </div>

                    {error && <p className="text-red-500 text-xs font-bold uppercase tracking-wider">{error}</p>}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-black font-extrabold py-4 rounded-xl transition-all uppercase tracking-wide active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Criando...' : 'Criar Conta'}
                        </button>

                        <div className="flex items-center gap-4 my-4">
                            <div className="h-[1px] flex-1 bg-[#222426]"></div>
                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">ou</span>
                            <div className="h-[1px] flex-1 bg-[#222426]"></div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignup}
                            className="w-full bg-[#0D0E10] border border-[#222426] hover:bg-[#FCFCFC]/5 text-[#FCFCFC] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Cadastrar com Google
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-auto pt-10 pb-4 text-center">
                    <p className="text-[#D6D6D6] text-sm">
                        Já tem uma conta?{' '}
                        <span onClick={() => navigate('/login')} className="text-primary font-bold hover:underline transition-all cursor-pointer">Entrar</span>
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="fixed top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
                <div className="fixed bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            </div>
        </div>
    );
}
