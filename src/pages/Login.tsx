import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
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

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/consent'
      }
    });
    if (error) setError(error.message);
  };

  return (
    <div className="bg-background-dark text-white font-sans min-h-screen flex flex-col items-center justify-between px-8 py-12">
      <div className="flex flex-col items-center mt-12">
        <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-primary font-display">$</span>
        </div>
        <h1 className="text-center text-xs font-display font-bold tracking-[0.3em] uppercase leading-relaxed max-w-[200px]">
          Gestão Financeira Inteligente
        </h1>
      </div>
      <div className="w-full max-w-sm space-y-10">
        <form onSubmit={handleLogin} className="space-y-8">
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

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black h-14 rounded-full flex items-center justify-center space-x-3 hover:bg-zinc-100 transition-all active:scale-[0.98] duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] group disabled:opacity-50"
            >
              <span className="font-display font-bold text-xs tracking-[0.2em] uppercase ml-4">
                {loading ? 'Entrando...' : 'Entrar'}
              </span>
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-white h-14 rounded-full flex items-center justify-center space-x-3 hover:bg-zinc-900 transition-colors active:scale-[0.98] duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="font-display font-bold text-[10px] tracking-widest uppercase">Login com Google</span>
            </button>
          </div>
        </form>
      </div>
      <div className="w-full space-y-12">
        <div className="flex flex-col items-center space-y-4">
          <button className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase hover:text-white transition-colors">
            Esqueci minha senha
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-[10px] font-bold text-primary tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            Criar conta
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
