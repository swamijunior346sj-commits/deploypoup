import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ActionPopup from '../components/ActionPopup';

export default function PersonalData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: user?.email || '',
    tel: '',
    nascimento: '',
    cep: '',
    cidade: ''
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setFormData({
            nome: data.full_name || '',
            email: user.email || '',
            tel: data.phone || '',
            nascimento: data.birth_date || '',
            cep: data.zip_code || '',
            cidade: data.city || ''
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.nome,
          phone: formData.tel,
          birth_date: formData.nascimento,
          zip_code: formData.cep,
          city: formData.cidade,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      setShowSuccess(true);
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const RightElement = () => (
    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
      <span className="material-symbols-outlined text-zinc-400">settings</span>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background-dark text-text-value font-sans">
      <Header
        showBack
        title="Dados Pessoais"
        rightElement={<RightElement />}
      />

      <main className="flex-grow px-6 space-y-10 pb-32 pt-6 overflow-y-auto no-scrollbar">
        <section className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-primary p-1">
              <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-text-label text-5xl">person</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-background-dark shadow-lg">
              <span className="material-symbols-outlined text-sm font-bold">edit</span>
            </button>
          </div>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary">{user?.email}</p>
        </section>

        <section className="space-y-8">
          <div className="space-y-6">
            <div className="relative border-b border-primary/20 focus-within:border-primary transition-all group">
              <input
                id="nome"
                type="text"
                placeholder=" "
                value={formData.nome}
                onChange={handleChange}
                className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-text-value font-medium"
              />
              <label htmlFor="nome" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none text-zinc-500 group-focus-within:text-primary">Nome Completo</label>
            </div>

            <div className="relative border-b border-primary/20 focus-within:border-primary transition-all group opacity-50">
              <input
                id="email"
                type="email"
                readOnly
                placeholder=" "
                value={formData.email}
                className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-text-value font-medium cursor-not-allowed"
              />
              <label htmlFor="email" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none text-zinc-500">E-mail (Não editável)</label>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative border-b border-primary/20 focus-within:border-primary transition-all group">
                <input
                  id="tel"
                  type="text"
                  placeholder=" "
                  value={formData.tel}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-text-value font-medium"
                />
                <label htmlFor="tel" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none text-zinc-500 group-focus-within:text-primary">Telefone</label>
              </div>

              <div className="relative border-b border-primary/20 focus-within:border-primary transition-all group">
                <input
                  id="nascimento"
                  type="text"
                  placeholder=" "
                  value={formData.nascimento}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-text-value font-medium"
                />
                <label htmlFor="nascimento" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none text-zinc-500 group-focus-within:text-primary">Data de Nascimento</label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span>
              Endereço
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="relative border-b border-primary/20 focus-within:border-primary transition-all group">
                <input
                  id="cep"
                  type="text"
                  placeholder=" "
                  value={formData.cep}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-text-value font-medium"
                />
                <label htmlFor="cep" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none text-zinc-500 group-focus-within:text-primary">CEP</label>
              </div>

              <div className="col-span-2 relative border-b border-primary/20 focus-within:border-primary transition-all group">
                <input
                  id="cidade"
                  type="text"
                  placeholder=" "
                  value={formData.cidade}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-text-value font-medium"
                />
                <label htmlFor="cidade" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none text-zinc-500 group-focus-within:text-primary">Cidade/UF</label>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-5 rounded-2xl bg-transparent border border-primary text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(16,185,129,0.1)] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {saving ? 'Sincronizando...' : 'Salvar Alterações'}
        </button>

        <footer className="pt-4 pb-8">
          <div className="flex items-center justify-center space-x-2 text-zinc-800">
            <span className="material-symbols-outlined text-base">verified_user</span>
            <p className="text-[8px] font-black tracking-[0.4em] uppercase">
              Dados Protegidos por POUP AI
            </p>
          </div>
        </footer>
      </main>

      <ActionPopup
        isOpen={showSuccess}
        title="Perfil Atualizado"
        description="Seus dados pessoais foram salvos com sucesso no sistema."
        confirmText="Entendido"
        type="success"
        onConfirm={() => setShowSuccess(false)}
        onCancel={() => setShowSuccess(false)}
      />
    </div>
  );
}
