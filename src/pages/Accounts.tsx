import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { useData } from '../contexts/DataContext';

export default function Accounts() {
  const navigate = useNavigate();
  const { assets, loading } = useData();

  if (loading) {
    return (
      <div className="bg-background-black text-primary min-h-screen flex items-center justify-center font-display">
        <div className="animate-pulse tracking-[0.3em] uppercase font-bold text-xs font-sans">Sincronizando Ativos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Header
        showBack
        title="Contas e Cartões"
      />

      <div className="px-6 space-y-10">
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-text-label uppercase">Minhas Contas</h3>
          <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-6 px-6">
            {assets && assets.length > 0 ? (
              assets.map((asset) => (
                <div key={asset.id} onClick={() => navigate(`/asset-details/${asset.id}`)}>
                  <Card className="min-w-[160px] rounded-2xl p-4 flex flex-col space-y-4 cursor-pointer hover:border-primary/30 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-text-label font-bold uppercase truncate">{asset.name}</p>
                      <p className="text-sm font-bold font-display">R$ {Number(asset.current_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div className="w-full py-8 text-center border border-dashed border-white/5 rounded-2xl">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Nenhuma conta vinculada</p>
                <button onClick={() => navigate('/add-account')} className="mt-2 text-[10px] text-primary font-bold uppercase">Começar agora</button>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold tracking-widest text-text-label uppercase">Cartões de Crédito</h3>
            <span onClick={() => navigate('/add-card')} className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer">Adicionar</span>
          </div>

          <div className="py-8 text-center border border-dashed border-white/5 rounded-[20px]">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Nenhum cartão registrado</p>
          </div>

          <Card className="rounded-[24px] p-5 space-y-4">
            <p className="text-[10px] font-bold tracking-widest text-text-label uppercase mb-2">Controle de Parcelas</p>
            <div className="py-4 text-center">
              <p className="text-[10px] text-zinc-700 uppercase tracking-widest italic">Aguardando dados reais...</p>
            </div>
          </Card>
        </section>

        <section className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-text-label uppercase">Simulador de Limite</h3>
          <Card className="rounded-[24px] p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] text-text-label font-bold uppercase">Quanto você deseja gastar?</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-label font-bold">R$</span>
                <input className="w-full bg-zinc-900 border-none rounded-xl py-4 pl-12 pr-4 text-text-value font-display font-bold focus:ring-1 focus:ring-primary/50 transition-all" placeholder="0,00" type="number" />
              </div>
            </div>
            <div className="p-4 bg-transparent border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-zinc-400 font-bold uppercase">Projeção de Disponível</span>
                <span className="text-xs font-bold text-primary">R$ 0,00</span>
              </div>
              <p className="text-[9px] text-text-label leading-relaxed italic mt-2">Digite um valor para simular o impacto no seu limite disponível mensal.</p>
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
