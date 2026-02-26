import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Header showBack title="Análise Mensal" />

      <div className="px-6 space-y-8">
        <div className="flex items-center justify-between bg-zinc-950 border border-zinc-900 rounded-2xl p-4">
          <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_left</span>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-300">Setembro 2023</span>
          <span className="material-symbols-outlined text-zinc-500 cursor-pointer">chevron_right</span>
        </div>

        <div className="flex flex-col items-center py-4">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#10B981" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="12"></circle>
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#3B82F6" strokeDasharray="251.2" strokeDashoffset="188.4" strokeWidth="12"></circle>
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#F59E0B" strokeDasharray="251.2" strokeDashoffset="230" strokeWidth="12"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Total</span>
              <span className="text-2xl font-display font-bold">R$ 3.750</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Moradia</span>
              <span className="text-xs font-semibold">45%</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Lazer</span>
              <span className="text-xs font-semibold">30%</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Saúde</span>
              <span className="text-xs font-semibold">15%</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-900 p-4 rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-zinc-600 shadow-[0_0_8px_rgba(82,82,82,0.5)]"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Outros</span>
              <span className="text-xs font-semibold">10%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Gastos por Dia</h3>
          <div className="bg-zinc-950 border border-zinc-900 rounded-[24px] p-6">
            <div className="flex items-end justify-between h-32 space-x-1">
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[20%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[40%]"></div>
              <div className="w-2 bg-primary rounded-t-sm h-[80%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[30%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[50%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[15%]"></div>
              <div className="w-2 bg-primary rounded-t-sm h-[90%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[45%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[35%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[60%]"></div>
              <div className="w-2 bg-primary rounded-t-sm h-[75%]"></div>
              <div className="w-2 bg-zinc-800 rounded-t-sm h-[25%]"></div>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-[8px] text-zinc-600 font-bold uppercase">Dia 01</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase">Dia 15</span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase">Dia 30</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
