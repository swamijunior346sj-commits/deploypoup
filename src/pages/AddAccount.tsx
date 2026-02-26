import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function AddAccount() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Adicionar Conta" />

      <div className="px-8 space-y-8">
        <section className="py-8 text-center">
          <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-2">Saldo Inicial</label>
          <div className="flex items-center justify-center gap-2">
            <span className="text-primary font-bold text-2xl mt-1">R$</span>
            <input className="bg-transparent border-none text-5xl font-bold text-primary placeholder:text-zinc-900 focus:ring-0 w-full max-w-[240px] text-center" placeholder="0,00" type="text" />
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-4">Tipo de Conta</label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-primary/5 border border-primary transition-all active:scale-95">
                <span className="material-symbols-outlined text-primary mb-2 text-2xl">account_balance</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Conta Corrente</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all active:scale-95">
                <span className="material-symbols-outlined text-zinc-500 mb-2 text-2xl">savings</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Conta Poupança</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all active:scale-95">
                <span className="material-symbols-outlined text-zinc-500 mb-2 text-2xl">account_balance_wallet</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Carteira</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-all active:scale-95">
                <span className="material-symbols-outlined text-zinc-500 mb-2 text-2xl">trending_up</span>
                <span className="text-[10px] font-bold tracking-tight uppercase">Conta Investimento</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-4">Instituição Financeira</label>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-[10px] font-bold">IT</div>
                <span className="text-sm font-medium text-zinc-300">Banco Itaú</span>
                <span className="material-symbols-outlined ml-auto text-zinc-700 text-sm">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-purple-700 flex items-center justify-center text-[10px] font-bold">NU</div>
                <span className="text-sm font-medium text-zinc-300">Nubank</span>
                <span className="material-symbols-outlined ml-auto text-zinc-700 text-sm">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-[10px] font-bold">SA</div>
                <span className="text-sm font-medium text-zinc-300">Santander</span>
                <span className="material-symbols-outlined ml-auto text-zinc-700 text-sm">chevron_right</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-bold">BB</div>
                <span className="text-sm font-medium text-zinc-300">Banco do Brasil</span>
                <span className="material-symbols-outlined ml-auto text-zinc-700 text-sm">chevron_right</span>
              </div>
            </div>
            <button className="w-full mt-4 py-3 text-[10px] font-bold text-zinc-500 tracking-widest uppercase border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors">
              Ver Outros Bancos
            </button>
          </div>

          <div className="pt-8">
            <button onClick={() => navigate('/accounts')} className="w-full bg-primary text-black py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-transform shadow-lg shadow-primary/10">
              SALVAR CONTA
            </button>
          </div>
        </section>


      </div>
    </div>
  );
}
