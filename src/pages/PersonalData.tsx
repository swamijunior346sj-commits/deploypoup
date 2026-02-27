import React, { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export default function PersonalData() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    nome: 'Ricardo Oliveira Silva',
    email: user?.email || 'ricardo.silva@exemplo.com',
    tel: '(11) 98765-4321',
    nascimento: '15/04/1992',
    cep: '04571-010',
    cidade: 'São Paulo/SP'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    // Save logic
    console.log('Saved:', formData);
  };

  const RightElement = () => (
    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
      <span className="material-symbols-outlined text-zinc-400">settings</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background-dark text-white font-sans">
      <Header
        showBack
        title="Dados Pessoais"
        rightElement={<RightElement />}
      />

      <main className="flex-grow px-6 space-y-10 pb-32 pt-6">
        <section className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-primary p-1">
              <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-600 text-5xl">person</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-background-dark">
              <span className="material-symbols-outlined text-sm font-bold">edit</span>
            </button>
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-6">
            <div className="relative border-b border-primary/30 focus-within:border-primary transition-colors">
              <input
                id="nome"
                type="text"
                placeholder=" "
                value={formData.nome}
                onChange={handleChange}
                className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-white font-medium"
              />
              <label htmlFor="nome" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none">Nome Completo</label>
            </div>

            <div className="relative border-b border-primary/30 focus-within:border-primary transition-colors">
              <input
                id="email"
                type="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-white font-medium"
              />
              <label htmlFor="email" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none">E-mail</label>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="relative border-b border-primary/30 focus-within:border-primary transition-colors">
                <input
                  id="tel"
                  type="text"
                  placeholder=" "
                  value={formData.tel}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-white font-medium"
                />
                <label htmlFor="tel" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none">Telefone</label>
              </div>

              <div className="relative border-b border-primary/30 focus-within:border-primary transition-colors">
                <input
                  id="nascimento"
                  type="text"
                  placeholder=" "
                  value={formData.nascimento}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-white font-medium"
                />
                <label htmlFor="nascimento" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none">Data de Nascimento</label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Endereço</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="relative border-b border-primary/30 focus-within:border-primary transition-colors">
                <input
                  id="cep"
                  type="text"
                  placeholder=" "
                  value={formData.cep}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-white font-medium"
                />
                <label htmlFor="cep" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none">CEP</label>
              </div>

              <div className="col-span-2 relative border-b border-primary/30 focus-within:border-primary transition-colors">
                <input
                  id="cidade"
                  type="text"
                  placeholder=" "
                  value={formData.cidade}
                  onChange={handleChange}
                  className="floating-label-input block w-full bg-transparent border-0 px-0 pt-6 pb-2 text-sm focus:ring-0 text-white font-medium"
                />
                <label htmlFor="cidade" className="absolute left-0 top-0 origin-[0] transition-all duration-200 text-[10px] font-bold uppercase tracking-widest pointer-events-none">Cidade/UF</label>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={handleSave}
          className="w-full py-5 rounded-2xl bg-primary text-black text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all"
        >
          Salvar Alterações
        </button>

        <footer className="pt-4 pb-8">
          <div className="flex items-center justify-center space-x-2 text-zinc-700">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase">
              POWERED BY POUP INTELLIGENCE
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
