import { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import ActionPopup from '../components/ActionPopup';

export default function Security() {
  const { user } = useAuth();
  const { clearAllData } = useData();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleDeleteAll = async () => {
    await clearAllData();
    setShowDeletePopup(false);
    setShowSuccessPopup(true);
  };

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
            <p className="text-[10px] text-text-label uppercase font-bold tracking-widest mt-1">Sua conta está segura</p>
            <p className="text-[8px] text-text-label opacity-70 uppercase font-bold tracking-tighter mt-1">{user?.email}</p>
          </div>

          <div className="space-y-2">
            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-text-label">fingerprint</span>
                <div>
                  <p className="text-sm font-semibold">Biometria / Face ID</p>
                  <p className="text-[10px] text-text-label opacity-70 uppercase font-bold">Acesso rápido e seguro</p>
                </div>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </Card>

            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-text-label">lock_reset</span>
                <div>
                  <p className="text-sm font-semibold">Alterar Senha</p>
                  <p className="text-[10px] text-text-label opacity-70 uppercase font-bold">Gerenciar via Supabase</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-700">chevron_right</span>
            </Card>

            <Card className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-text-label">phonelink_setup</span>
                <div>
                  <p className="text-sm font-semibold">Autenticação em 2 Fatores</p>
                  <p className="text-[10px] text-text-label opacity-70 uppercase font-bold">Configurado no Supabase</p>
                </div>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </Card>
          </div>

          <div className="pt-10 space-y-4">
            <h3 className="text-[10px] font-bold tracking-widest text-[#FF4B4B] uppercase px-2">Zona de Perigo</h3>
            <Card className="p-5 border-red-500/20 bg-red-500/5 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-[#FF4B4B] text-xl">delete_sweep</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Limpar todos os dados</p>
                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">Apaga transações, ativos, metas e orçamentos permanentemente.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDeletePopup(true)}
                className="w-full mt-6 py-4 rounded-xl border border-[#FF4B4B]/30 text-[#FF4B4B] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#FF4B4B]/10 active:scale-95 transition-all"
              >
                Confirmar Reset Total
              </button>
            </Card>
          </div>
        </main>
      </div>

      <ActionPopup
        isOpen={showDeletePopup}
        title="Deseja apagar tudo?"
        description="Esta ação é irreversível. Você perderá todo o histórico de transações, investimentos e metas."
        confirmText="Apagar Tudo"
        type="delete"
        onConfirm={handleDeleteAll}
        onCancel={() => setShowDeletePopup(false)}
      />

      <ActionPopup
        isOpen={showSuccessPopup}
        title="Dados Apagados"
        description="Seu perfil foi reiniciado com sucesso. Sincronização concluída."
        confirmText="Entendido"
        type="success"
        onConfirm={() => setShowSuccessPopup(false)}
        onCancel={() => setShowSuccessPopup(false)}
      />
    </div>
  );
}
