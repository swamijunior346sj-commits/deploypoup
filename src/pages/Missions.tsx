import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Missions() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Missões e Metas" />

      <div className="px-6 space-y-8">
        <div className="flex items-center gap-6 mb-10 bg-zinc-900/40 p-5 rounded-3xl border border-zinc-800/50">
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#10B981 75%, #18181b 0deg)' }}>
              <div className="w-16 h-16 bg-black rounded-full flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-primary">75%</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
              5
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase mb-1">Nível Atual</h2>
            <p className="text-lg font-display font-bold text-white leading-tight">Investidor Inteligente</p>
            <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-tighter">Faltam 250 pts para o Nível 6</p>
          </div>
        </div>

        <div className="flex border-b border-zinc-900 mb-8">
          <button className="flex-1 pb-4 text-[10px] font-bold tracking-[0.2em] uppercase text-primary border-b-2 border-primary">Missões</button>
          <button onClick={() => navigate('/ranking')} className="flex-1 pb-4 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-600">Conquistas</button>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-end mb-5">
            <h3 className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase">Missões Diárias</h3>
            <span className="text-[10px] text-primary font-bold">Reseta em 14h</span>
          </div>
          <div className="space-y-3">
            <Card>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <span className="material-symbols-outlined text-primary text-xl">receipt_long</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">Registrar despesas</p>
                  <p className="text-[10px] text-zinc-500">Adicione todos os gastos do dia</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-primary">
                  <span className="text-[10px] font-bold">+50</span>
                  <span className="material-symbols-outlined text-sm filled">stars</span>
                </div>
                <span className="material-symbols-outlined text-zinc-700">radio_button_unchecked</span>
              </div>
            </Card>

            <Card className="opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <span className="material-symbols-outlined text-primary text-xl">block</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">Zero supérfluos</p>
                  <p className="text-[10px] text-zinc-500">Não gaste com itens não essenciais</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-primary/50">
                  <span className="text-[10px] font-bold">+30</span>
                  <span className="material-symbols-outlined text-sm filled">stars</span>
                </div>
                <span className="material-symbols-outlined text-primary filled">check_circle</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase mb-5">Missões Semanais</h3>
          <div className="space-y-3">
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                    <span className="material-symbols-outlined text-primary text-xl">savings</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">Economizar R$ 100</p>
                    <p className="text-[10px] text-zinc-500">R$ 65 de R$ 100 economizados</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <span className="text-[10px] font-bold">+150</span>
                  <span className="material-symbols-outlined text-sm filled">stars</span>
                </div>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[65%]"></div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                    <span className="material-symbols-outlined text-primary text-xl">home_repair_service</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">Reduzir Moradia</p>
                    <p className="text-[10px] text-zinc-500">Mantenha abaixo da meta semanal</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <span className="text-[10px] font-bold">+200</span>
                  <span className="material-symbols-outlined text-sm filled">stars</span>
                </div>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[40%]"></div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase mb-5">Próximas Conquistas</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <div className="flex-shrink-0 w-28 aspect-square rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center p-3 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-gold flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-gold filled">military_tech</span>
              </div>
              <p className="text-[9px] font-bold text-zinc-300 leading-tight uppercase">Controlador Iniciante</p>
            </div>
            <div className="flex-shrink-0 w-28 aspect-square rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center p-3 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-silver flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-silver filled">workspace_premium</span>
              </div>
              <p className="text-[9px] font-bold text-zinc-300 leading-tight uppercase">Mestre das Finanças</p>
            </div>
            <div className="flex-shrink-0 w-28 aspect-square rounded-2xl bg-zinc-900/50 border border-zinc-800 flex flex-col items-center justify-center p-3 text-center opacity-40">
              <div className="w-12 h-12 rounded-full border-2 border-zinc-700 flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-zinc-700">lock</span>
              </div>
              <p className="text-[9px] font-bold text-zinc-500 leading-tight uppercase">Investidor Senior</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
