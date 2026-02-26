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
              <span className="text-[10px] text-primary font-bold">Reseta em 2d 14h</span>
            </div>

            <div className="flex items-end justify-center gap-2 mb-10 pt-4">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="w-14 h-14 rounded-full border-2 border-silver p-0.5 overflow-hidden">
                    <img alt="User 2" className="w-full h-full object-cover rounded-full bg-zinc-800" src="https://picsum.photos/seed/user2/100/100" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-silver text-black text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">2</div>
                </div>
                <p className="text-[10px] font-bold text-zinc-300">Beatriz M.</p>
                <div className="bg-zinc-900/50 w-20 h-16 mt-2 rounded-t-xl border-x border-t border-zinc-800 flex flex-col items-center pt-2">
                  <span className="text-[10px] font-bold text-silver">1.840 pts</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative mb-3 -mt-4">
                  <div className="w-20 h-20 rounded-full border-2 border-gold p-1 overflow-hidden">
                    <img alt="User 1" className="w-full h-full object-cover rounded-full bg-zinc-800" src="https://picsum.photos/seed/user1/100/100" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold animate-bounce">
                    <span className="material-symbols-outlined filled text-xl">workspace_premium</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gold text-black text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">1</div>
                </div>
                <p className="text-[11px] font-bold text-white">Lucas Silva</p>
                <div className="bg-primary/20 w-24 h-24 mt-2 rounded-t-xl border-x border-t border-primary/30 flex flex-col items-center pt-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <span className="text-xs font-bold text-primary">2.150 pts</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="w-14 h-14 rounded-full border-2 border-bronze p-0.5 overflow-hidden">
                    <img alt="User 3" className="w-full h-full object-cover rounded-full bg-zinc-800" src="https://picsum.photos/seed/user3/100/100" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-bronze text-black text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">3</div>
                </div>
                <p className="text-[10px] font-bold text-zinc-300">Marcos V.</p>
                <div className="bg-zinc-900/50 w-20 h-12 mt-2 rounded-t-xl border-x border-t border-zinc-800 flex flex-col items-center pt-2">
                  <span className="text-[10px] font-bold text-bronze">1.520 pts</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Card className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-600 w-4">4</span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                    <img alt="User 4" className="w-full h-full" src="https://picsum.photos/seed/user4/100/100" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">Ana Beatriz</p>
                </div>
                <span className="text-xs font-bold text-zinc-500">1.210 pts</span>
              </Card>

              <Card className="p-3 flex items-center justify-between bg-primary/10 border-primary/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary w-4">5</span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-primary/50">
                    <img alt="You" className="w-full h-full" src="https://picsum.photos/seed/you/100/100" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-sm font-bold text-white">Você</p>
                </div>
                <span className="text-xs font-bold text-primary">1.140 pts</span>
              </Card>

              <Card className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-zinc-600 w-4">6</span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                    <img alt="User 6" className="w-full h-full" src="https://picsum.photos/seed/user6/100/100" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">Ricardo Lima</p>
                </div>
                <span className="text-xs font-bold text-zinc-500">980 pts</span>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold text-zinc-500 tracking-[0.15em] uppercase mb-6 px-2">Minhas Conquistas</h2>
            <div className="grid grid-cols-3 gap-y-8 gap-x-4">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border-2 border-gold flex items-center justify-center mb-3 relative">
                  <span className="material-symbols-outlined text-gold text-3xl filled">military_tech</span>
                  <div className="absolute -top-1 -right-1 bg-gold rounded-full p-0.5">
                    <span className="material-symbols-outlined text-black text-[10px] font-black filled">check</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-zinc-100 text-center uppercase leading-tight mb-2">Controlador Iniciante</p>
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-full"></div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-3 relative">
                  <span className="material-symbols-outlined text-zinc-600 text-3xl filled">savings</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-400 text-center uppercase leading-tight mb-2">Poupador Fiel</p>
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[50%]"></div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 border-2 border-silver flex items-center justify-center mb-3 relative">
                  <span className="material-symbols-outlined text-silver text-3xl filled">stars</span>
                  <div className="absolute -top-1 -right-1 bg-silver rounded-full p-0.5">
                    <span className="material-symbols-outlined text-black text-[10px] font-black filled">check</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-zinc-100 text-center uppercase leading-tight mb-2">Mestre Planilha</p>
                <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-silver h-full w-full"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
