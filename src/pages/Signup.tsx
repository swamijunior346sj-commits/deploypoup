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
    const [showSuccess, setShowSuccess] = useState(false);

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
            setShowSuccess(true);
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
        <div className={`bg-black font-sans antialiased text-white min-h-screen relative overflow-hidden selection:bg-primary/30 ${showSuccess ? 'overflow-hidden' : ''}`}>
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <div className={`relative flex h-auto min-h-screen w-full max-w-[430px] mx-auto flex-col p-6 z-10 ${showSuccess ? 'blur-sm pointer-events-none' : ''}`}>

                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white hover:text-primary transition-colors p-2 -ml-2"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-[10px] font-black tracking-[0.5em] uppercase text-zinc-600 flex-1 text-center pr-6">Integração Inicial</h1>
                </div>

                {/* Hero Section */}
                <div className="mb-10 pt-4">
                    <h2 className="text-4xl font-display font-black leading-tight mb-4 tracking-tighter uppercase italic premium-text-glow">Inicie seu<br /><span className="text-primary italic">Legado.</span></h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-[280px]">Conecte-se ao ecossistema financeiro de elite e assuma o controle.</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSignup} className="flex flex-col gap-10">
                    <div className="transparent-card-border bg-zinc-950/20 p-8 rounded-[2.5rem] border border-white/5 space-y-10">
                        {/* Nome Input */}
                        <div className="flex flex-col gap-4">
                            <label className="text-[9px] font-black tracking-[0.4em] text-zinc-600 uppercase px-1">Designação</label>
                            <input
                                className="bg-transparent border-none border-b border-white/5 px-1 pb-4 text-[15px] font-bold placeholder:text-zinc-900 focus:ring-0 text-white focus:border-primary transition-colors"
                                placeholder="Seu Nome Completo"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        {/* E-mail Input */}
                        <div className="flex flex-col gap-4">
                            <label className="text-[9px] font-black tracking-[0.4em] text-zinc-600 uppercase px-1">Criptografia de E-mail</label>
                            <input
                                className="bg-transparent border-none border-b border-white/5 px-1 pb-4 text-[15px] font-bold placeholder:text-zinc-900 focus:ring-0 text-white focus:border-primary transition-colors"
                                placeholder="seu@ecossistema.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Senha Input */}
                        <div className="flex flex-col gap-4 relative">
                            <label className="text-[9px] font-black tracking-[0.4em] text-zinc-600 uppercase px-1">Chave de Segurança</label>
                            <div className="relative">
                                <input
                                    className="w-full bg-transparent border-none border-b border-white/5 px-1 pb-4 text-[15px] font-bold placeholder:text-zinc-900 focus:ring-0 text-white focus:border-primary transition-colors pr-10"
                                    placeholder="••••••••"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="material-symbols-outlined absolute right-0 bottom-4 text-zinc-700 cursor-pointer hover:text-white transition-colors"
                                >
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center gap-4 px-1">
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-xl border border-white/10 bg-zinc-900 checked:bg-primary checked:border-primary transition-all"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <span className="material-symbols-outlined absolute text-black font-black scale-0 peer-checked:scale-100 transition-transform left-1/2 -ml-[10px] text-lg">check</span>
                            </label>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">Aceito os <span className="text-primary hover:underline cursor-pointer">Termos de Uso</span> de elite</p>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">{error}</p>}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-6">
                        <button
                            className={`w-full h-18 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Operacionalizando...' : 'Concluir Integração'}
                        </button>

                        <div className="flex items-center gap-6 my-2 px-8">
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                            <span className="text-[8px] text-zinc-700 font-black uppercase tracking-[0.5em]">OR</span>
                            <div className="h-[1px] flex-1 bg-white/5"></div>
                        </div>

                        <button
                            onClick={handleGoogleSignup}
                            className="w-full h-18 rounded-[2.5rem] bg-zinc-950/50 border border-white/5 text-white font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 flex items-center justify-center gap-4 shadow-2xl hover:bg-white/5 backdrop-blur-xl"
                            type="button"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            Continuar com Google
                        </button>
                    </div>
                </form>

                {/* Footer Section */}
                <div className="mt-auto pt-10 pb-4 text-center">
                    <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                        Já possui credenciais?
                        <span
                            onClick={() => navigate('/login')}
                            className="text-primary font-black hover:underline transition-all cursor-pointer ml-2"
                        >
                            Acessar Terminal
                        </span>
                    </p>
                </div>
            </div>

            {/* Success Popup Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-[360px] bg-transparent border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden" style={{ boxShadow: '0 0 40px -10px rgba(15, 182, 127, 0.3)' }}>
                        {/* Decorative glow */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-[60px]"></div>

                        {/* Icon */}
                        <div className="relative mb-8 pt-4">
                            <div className="relative z-10" style={{ filter: 'drop-shadow(0 0 15px rgba(15, 182, 127, 0.5))' }}>
                                <span className="material-symbols-outlined text-[100px] text-primary leading-none select-none" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
                                    verified_user
                                </span>
                            </div>
                            <span className="material-symbols-outlined absolute -top-2 -right-2 text-primary text-2xl animate-pulse">auto_awesome</span>
                            <span className="material-symbols-outlined absolute top-1/2 -left-6 text-primary/60 text-xl">colors_spark</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[#FCFCFC] font-black text-2xl leading-tight mb-4 tracking-tight">CONTA CRIADA COM SUCESSO!</h3>
                        <p className="text-[#D6D6D6] text-sm leading-relaxed mb-8 px-2">
                            Bem-vindo à sua jornada financeira. Você acaba de ganhar seu primeiro emblema!
                        </p>

                        {/* Achievement Card */}
                        <div className="w-full bg-background-dark/50 border border-[#222426] rounded-2xl p-4 mb-10 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">workspace_premium</span>
                                <span className="text-[#FCFCFC] text-sm font-bold">Emblema: Aprendiz Financeiro</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full">
                                <span className="material-symbols-outlined text-primary text-sm font-bold">add_circle</span>
                                <span className="text-primary text-xs font-black tracking-widest uppercase">100 XP</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="w-full bg-primary hover:brightness-110 active:scale-[0.98] transition-all text-black font-extrabold py-5 rounded-2xl shadow-lg shadow-primary/20 uppercase tracking-widest text-sm"
                        >
                            COMEÇAR MINHA JORNADA
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
