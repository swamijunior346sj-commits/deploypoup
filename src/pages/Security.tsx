import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';

export default function Security() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Header showBack title="Segurança" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-32">
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">shield</span>
            </div>
            <h2 className="text-lg font-display font-bold">Proteção Ativa</h2>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Sua conta está segura</p>
            <p className="text-[8px] text-zinc-600 uppercase font-bold tracking-tighter mt-1">{user?.email}</p>
          </div>

          <div className="space-y-2">
            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-zinc-500">fingerprint</span>
                <div>
                  <p className="text-sm font-semibold">Biometria / Face ID</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold">Acesso rápido e seguro</p>
                </div>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </Card>

            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-zinc-500">lock_reset</span>
                <div>
                  <p className="text-sm font-semibold">Alterar Senha</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold">Gerenciar via Supabase</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-700">chevron_right</span>
            </Card>

            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-zinc-500">phonelink_setup</span>
                <div>
                  <p className="text-sm font-semibold">Autenticação em 2 Fatores</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold">Configurado no Supabase</p>
                </div>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-2">Dispositivos Conectados</h3>
            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-zinc-500">smartphone</span>
                <div>
                  <p className="text-sm font-semibold">Sessão Atual</p>
                  <p className="text-[10px] text-primary uppercase font-bold">Ativo agora</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
