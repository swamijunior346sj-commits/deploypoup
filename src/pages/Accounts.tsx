import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Accounts() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <Header
        showBack
        title="Contas e Cartões"
      />

      <div className="px-6 space-y-10">
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Minhas Contas</h3>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            <Card className="min-w-[160px] rounded-2xl p-4 flex flex-col space-y-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Conta Corrente</p>
                <p className="text-sm font-bold font-display">R$ 12.450,00</p>
              </div>
            </Card>
            <Card className="min-w-[160px] rounded-2xl p-4 flex flex-col space-y-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-400 text-xl">savings</span>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Poupança</p>
                <p className="text-sm font-bold font-display">R$ 45.300,00</p>
              </div>
            </Card>
            <Card className="min-w-[160px] rounded-2xl p-4 flex flex-col space-y-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-400 text-xl">wallet</span>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Carteira</p>
                <p className="text-sm font-bold font-display">R$ 840,00</p>
              </div>
            </Card>
            <Card className="min-w-[160px] rounded-2xl p-4 flex flex-col space-y-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-zinc-400 text-xl">trending_up</span>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Investimentos</p>
                <p className="text-sm font-bold font-display">R$ 84.260,20</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Cartões de Crédito</h3>
            <span onClick={() => navigate('/add-card')} className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer">Adicionar</span>
          </div>
          <div className="relative w-full aspect-[1.58/1] bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-[20px] p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-zinc-800/10 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Mastercard Black</p>
                <div className="mt-4 flex space-x-1">
                  <div className="w-8 h-6 bg-zinc-800/50 rounded-sm border border-zinc-700/50 flex items-center justify-center">
                    <div className="w-4 h-3 bg-yellow-600/20 rounded-xs border border-yellow-600/30"></div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-[-10px]">
                <div className="w-8 h-8 rounded-full bg-zinc-800/80"></div>
                <div className="w-8 h-8 rounded-full bg-zinc-700/60 backdrop-blur-sm"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[8px] text-zinc-500 font-bold uppercase">Limite Disponível</p>
                  <p className="text-xl font-display font-bold text-primary">R$ 5.400,00</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[8px] text-zinc-500 font-bold uppercase text-right">Limite Total</p>
                  <p className="text-sm font-display font-bold text-white">R$ 15.000,00</p>
                </div>
              </div>
              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '36%' }}></div>
              </div>
              <p className="text-[8px] text-zinc-500 font-bold uppercase">Fatura fecha em: 15/10</p>
            </div>
          </div>

          <Card className="rounded-[24px] p-5 space-y-4">
            <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2">Controle de Parcelas</p>
            <div className="flex items-center justify-between py-2 border-b border-zinc-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-zinc-400 text-lg">shopping_bag</span>
                </div>
                <div>
                  <p className="text-xs font-bold">MacBook Pro M2</p>
                  <p className="text-[9px] text-zinc-500">Parcela 08/12</p>
                </div>
              </div>
              <p className="text-xs font-bold">R$ 1.250,00</p>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-zinc-400 text-lg">flight</span>
                </div>
                <div>
                  <p className="text-xs font-bold">Passagem Paris</p>
                  <p className="text-[9px] text-zinc-500">Parcela 02/06</p>
                </div>
              </div>
              <p className="text-xs font-bold">R$ 850,00</p>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Simulador de Limite</h3>
          <Card className="rounded-[24px] p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] text-zinc-500 font-bold uppercase">Quanto você deseja gastar?</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">R$</span>
                <input className="w-full bg-zinc-900 border-none rounded-xl py-4 pl-12 pr-4 text-white font-display font-bold focus:ring-1 focus:ring-primary/50 transition-all" placeholder="0,00" type="number" />
              </div>
            </div>
            <div className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-zinc-400 font-bold uppercase">Projeção de Disponível</span>
                <span className="text-xs font-bold text-primary">R$ 5.400,00</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary/30" style={{ width: '100%' }}></div>
              </div>
              <p className="text-[9px] text-zinc-500 leading-relaxed italic">Digite um valor para simular o impacto no seu limite disponível mensal.</p>
            </div>
          </Card>
        </section>

      </div>

      <button
        onClick={() => navigate('/add-account')}
        className="fixed right-6 bottom-24 w-14 h-14 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center z-[60] animate-levitate transition-transform active:scale-95"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}
