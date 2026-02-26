import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';


export default function AddCard() {
  const navigate = useNavigate();
  const [cardName, setCardName] = useState('');

  return (
    <div className="space-y-6">
      <Header showBack title="Adicionar Cartão" />

      <div className="px-8 space-y-8">
        <div className="mb-10 perspective-1000">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-10 bg-zinc-800/50 rounded-md border border-zinc-700/50 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-yellow-500/40 text-2xl">grid_view</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-zinc-600 text-3xl">contactless</span>
            </div>
            <div className="relative z-10">
              <p className="text-zinc-500 text-[10px] tracking-widest uppercase mb-1">Nome no Cartão</p>
              <p className="text-white font-display font-semibold tracking-widest text-lg h-7 overflow-hidden">
                {cardName.toUpperCase() || 'NOME DO TITULAR'}
              </p>
            </div>
            <div className="flex justify-between items-end relative z-10">
              <div className="flex gap-4">
                <div>
                  <p className="text-zinc-600 text-[8px] tracking-widest uppercase">Expira</p>
                  <p className="text-zinc-400 font-mono text-xs">--/--</p>
                </div>
              </div>
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700"></div>
                <div className="w-8 h-8 rounded-full bg-zinc-700/50 border border-zinc-600"></div>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/accounts'); }}>
          <div className="relative">
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Nome do Cartão</label>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-zinc-500">credit_card</span>
              <input
                className="ios-underlined-input w-full py-3 text-sm placeholder:text-zinc-800 text-white focus:ring-0"
                placeholder="Ex: Nubank Platinum"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>

          <div className="relative py-2">
            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Limite Total</label>
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold text-2xl">R$</span>
              <input className="ios-underlined-input w-full py-2 text-2xl font-bold placeholder:text-zinc-900 text-white focus:ring-0" placeholder="0,00" type="text" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="relative">
              <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Fechamento</label>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-zinc-500 text-xl">event_repeat</span>
                <input className="ios-underlined-input w-full py-3 text-sm placeholder:text-zinc-800 text-white focus:ring-0" max="31" min="1" placeholder="Dia 05" type="number" />
              </div>
            </div>
            <div className="relative">
              <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Vencimento</label>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-zinc-500 text-xl">event_available</span>
                <input className="ios-underlined-input w-full py-3 text-sm placeholder:text-zinc-800 text-white focus:ring-0" max="31" min="1" placeholder="Dia 12" type="number" />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-zinc-500">vibration</span>
                <span className="text-sm font-medium text-zinc-300">Cartão Virtual</span>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-zinc-500">notifications_active</span>
                <span className="text-sm font-medium text-zinc-300">Notificar Fechamento</span>
              </div>
              <label className="relative inline-block w-11 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <div className="pt-8">
            <button className="w-full bg-primary text-black py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-transform shadow-lg shadow-primary/10" type="submit">
              SALVAR CARTÃO
            </button>
          </div>
        </form>


      </div>
    </div>
  );
}
