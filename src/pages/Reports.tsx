import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-dark text-white font-sans flex flex-col min-h-[100dvh]">
      <Header showBack title="Relatórios Avançados" />
      <main className="flex-grow px-6 space-y-8 pb-32">
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
          <button className="px-5 py-2.5 bg-primary text-black text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">Mensal</button>
          <button className="px-5 py-2.5 bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap border border-zinc-800">Trimestral</button>
          <button className="px-5 py-2.5 bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap border border-zinc-800">Anual</button>
          <button className="px-5 py-2.5 bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap border border-zinc-800">Personalizado</button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-zinc-950 border border-zinc-900 rounded-[32px] p-6">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-6">Evolução do Patrimônio Líquido</h3>
            <div className="h-48 flex items-end justify-between space-x-2">
              <div className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full bg-zinc-900 rounded-t-lg relative group h-[40%]">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Jan</span>
              </div>
              <div className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full bg-zinc-900 rounded-t-lg relative group h-[55%]">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Fev</span>
              </div>
              <div className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full bg-zinc-900 rounded-t-lg relative group h-[45%]">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Mar</span>
              </div>
              <div className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full bg-primary rounded-t-lg relative group h-[75%] shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                <span className="text-[8px] font-bold text-primary uppercase">Abr</span>
              </div>
              <div className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full bg-zinc-900 rounded-t-lg relative group h-[65%]">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Mai</span>
              </div>
              <div className="flex flex-col items-center flex-1 space-y-2">
                <div className="w-full bg-zinc-900 rounded-t-lg relative group h-[85%]">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg"></div>
                </div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase">Jun</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 rounded-[32px] p-6">
            <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-6">Comparativo Mensal</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium text-zinc-300">Entradas</span>
                </div>
                <span className="text-sm font-bold text-primary">R$ 8.450,00</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs font-medium text-zinc-300">Saídas</span>
                </div>
                <span className="text-sm font-bold text-red-500">R$ 5.120,00</span>
              </div>
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Saldo Líquido</span>
                <span className="text-lg font-display font-bold text-white">R$ 3.330,00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button className="flex items-center space-x-3 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors active:scale-95">
            <span className="material-symbols-outlined text-zinc-400">download</span>
            <span>Exportar PDF</span>
          </button>
        </div>

      </main>
    </div>
  );
}
