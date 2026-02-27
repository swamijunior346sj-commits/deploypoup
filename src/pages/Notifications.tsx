import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Notifications() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-background-dark text-white font-sans overflow-x-hidden">
            <Header title="NOTIFICAÇÕES" showBack />

            <main className="flex-1 px-6 space-y-4 pb-12 mt-2">
                <div className="space-y-3">
                    <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Alertas Financeiros</h2>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Gastos em tempo real</p>
                                <p className="text-[11px] text-zinc-500">Notificar a cada nova transação</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Vencimento de Faturas</p>
                                <p className="text-[11px] text-zinc-500">2 dias antes do vencimento</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Assistente IA</h2>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Dicas de Economia</p>
                                <p className="text-[11px] text-zinc-500">Insights baseados no seu perfil</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Relatórios Semanais</p>
                                <p className="text-[11px] text-zinc-500">Resumo visual de performance</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Segurança</h2>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-sm">Logins Suspeitos</p>
                                <p className="text-[11px] text-zinc-500">Alertar novos acessos em dispositivos</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-8 pb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-primary text-black font-display font-bold py-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 active:scale-[0.98] transition-all tracking-wide uppercase text-sm"
                    >
                        SALVAR ALTERAÇÕES
                    </button>
                </div>
            </main>

            <footer className="pb-12 pt-6 flex flex-col items-center">
                <div className="flex items-center space-x-2 opacity-30">
                    <span className="material-symbols-outlined !text-[10px] !fill-0">auto_awesome</span>
                    <p className="text-[8px] font-bold tracking-[0.4em] uppercase">
                        POWERED BY POUP INTELLIGENCE
                    </p>
                </div>
                <div className="h-6 mt-4"></div>
            </footer>
        </div>
    );
}
