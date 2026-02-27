import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function NewTransaction() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark text-white font-sans flex flex-col min-h-screen">
            <Header title="NOVA TRANSAÇÃO" showBack />

            <main className="flex-grow px-8 pb-32 mt-2">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative py-4">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Valor</label>
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-bold text-2xl">R$</span>
                            <input className="ios-underlined-input w-full py-2 text-3xl font-bold placeholder:text-zinc-800 text-white focus:ring-0" placeholder="0,00" type="text" />
                        </div>
                    </div>
                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Descrição</label>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500">edit_note</span>
                            <input className="ios-underlined-input w-full py-3 text-sm placeholder:text-zinc-700 text-white focus:ring-0" placeholder="Ex: Supermercado Semanal" type="text" />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block">Categoria</label>
                            <a className="text-[9px] text-primary font-bold tracking-wider uppercase hover:opacity-80" href="#">Gerenciar Subcategorias</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-500">category</span>
                            <select className="ios-underlined-input w-full py-3 text-sm text-white focus:ring-0 appearance-none">
                                <option className="bg-black" value="moradia">Moradia</option>
                                <option className="bg-black" value="alimentacao">Alimentação</option>
                                <option className="bg-black" value="transporte">Transporte</option>
                                <option className="bg-black" value="lazer">Lazer</option>
                                <option className="bg-black" value="saude">Saúde</option>
                                <option className="bg-black" value="educacao">Educação</option>
                                <option className="bg-black" value="investimentos">Investimentos</option>
                                <option className="bg-black" value="assinaturas">Assinaturas</option>
                                <option className="bg-black" value="outros">Outros</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-0 bottom-3 text-zinc-600 pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="space-y-6 pt-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-zinc-500">calendar_month</span>
                                    <span className="text-sm font-medium text-zinc-300">Parcelamento</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="pl-9" id="installments-field">
                                <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Número de Parcelas</label>
                                <input className="ios-underlined-input w-full py-2 text-sm placeholder:text-zinc-700 text-white focus:ring-0" placeholder="Ex: 12" type="number" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-zinc-500">autorenew</span>
                                <span className="text-sm font-medium text-zinc-300">Despesa Recorrente</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                    <div className="relative">
                        <label className="text-[10px] font-bold text-zinc-500 tracking-[0.15em] uppercase block mb-1">Observações</label>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-zinc-500 mt-2">notes</span>
                            <textarea className="ios-underlined-input w-full py-3 text-sm placeholder:text-zinc-700 text-white focus:ring-0 min-h-[80px] resize-none" placeholder="Adicione detalhes adicionais..."></textarea>
                        </div>
                    </div>
                    <div className="pt-2">
                        <button className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-2xl flex items-center justify-center gap-3 text-zinc-500 hover:border-primary hover:text-primary transition-colors" type="button">
                            <span className="material-symbols-outlined">add_a_photo</span>
                            <span className="text-xs font-bold tracking-widest uppercase">Anexar Comprovante</span>
                        </button>
                    </div>
                    <div className="space-y-4 pt-8">
                        <button className="w-full bg-primary text-black py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase active:scale-[0.98] transition-transform" type="button" onClick={() => navigate(-1)}>
                            SALVAR TRANSAÇÃO
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="bg-zinc-900 text-zinc-300 py-4 rounded-2xl font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors" type="button">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                EDITAR
                            </button>
                            <button className="bg-zinc-900 text-red-500/80 py-4 rounded-2xl font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-red-950/20 transition-colors" type="button">
                                <span className="material-symbols-outlined text-sm">delete</span>
                                EXCLUIR
                            </button>
                        </div>
                    </div>
                </form>
                <footer className="pt-16 pb-4">
                    <div className="flex items-center justify-center space-x-2 text-zinc-700">
                        <span className="material-symbols-outlined text-base">auto_awesome</span>
                        <p className="text-[9px] font-semibold tracking-[0.2em] uppercase">
                            POWERED BY POUP INTELLIGENCE
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
