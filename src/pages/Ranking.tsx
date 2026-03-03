import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Ranking() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Ranking e Conquistas" />

      <div className="px-6 space-y-8">
        <main className="space-y-8 pb-32">
          <section>
            <div className="flex items-center justify-between mb-8 px-2">
              <h2 className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase">Ranking Semanal</h2>
              <span className="text-[10px] text-primary font-bold">Temporada Iniciada</span>
            </div>

            <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
              <span className="material-symbols-outlined text-zinc-800 text-5xl mb-4">leaderboard</span>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Aguardando competidores</p>
              <p className="text-[9px] text-zinc-700 mt-2">Seja o primeiro a pontuar esta semana!</p>
            </div>

            <div className="mt-8 space-y-2">
              <Card className="p-3 flex items-center justify-between bg-primary/10 border-primary/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary w-4">1</span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-primary/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-zinc-600 text-sm">person</span>
                  </div>
                  <p className="text-sm font-bold text-white">Você</p>
                </div>
                <span className="text-xs font-bold text-primary">0 pts</span>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase mb-6 px-2">Minhas Conquistas</h2>
            <div className="grid grid-cols-3 gap-y-8 gap-x-4">
              <div className="flex flex-col items-center opacity-20">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-zinc-600 text-3xl filled">military_tech</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 text-center uppercase leading-tight">Controlador</p>
              </div>

              <div className="flex flex-col items-center opacity-20">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-zinc-600 text-3xl filled">savings</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 text-center uppercase leading-tight">Poupador</p>
              </div>

              <div className="flex flex-col items-center opacity-20">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-zinc-600 text-3xl filled">stars</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 text-center uppercase leading-tight">Elite</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
