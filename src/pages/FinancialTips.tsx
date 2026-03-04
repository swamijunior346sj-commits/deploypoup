import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';

export default function FinancialTips() {
    const navigate = useNavigate();

    const tips = [
        {
            title: "Regra dos 50-30-20",
            category: "Gestão de Orçamento",
            description: "Aloque 50% para necessidades, 30% para desejos e 20% para poupança e investimentos. É a base de um ecossistema saudável.",
            icon: "account_balance_wallet",
            color: "#0FB67F"
        },
        {
            title: "Reserva de Emergência",
            category: "Segurança Financeira",
            description: "Mantenha entre 6 a 12 meses de despesas em um ativo de alta liquidez. Isso neutraliza riscos inesperados.",
            icon: "security",
            color: "#3B82F6"
        },
        {
            title: "Juros Compostos",
            category: "Crescimento Exponencial",
            description: "O tempo é seu maior aliado. Pequenos aportes constantes superam grandes aportes esporádicos no longo prazo.",
            icon: "trending_up",
            color: "#A855F7"
        },
        {
            title: "Diversificação Inteligente",
            category: "Mitigação de Riscos",
            description: "Não coloque todos os seus ativos em um único setor. Distribua entre Renda Fixa, Variável e Ativos Globais.",
            icon: "pie_chart",
            color: "#F59E0B"
        }
    ];

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <Header title="Diretrizes Financeiras" showBack />

            <main className="flex-grow px-6 pb-32 pt-8 relative z-10 space-y-10">
                <div className="flex flex-col">
                    <h2 className="text-[24px] font-display font-black tracking-tighter uppercase text-white leading-tight italic">Insights de<br /><span className="text-primary not-italic">Elite</span></h2>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em] mt-3 opacity-60">Diretrizes para a maestria do seu ecossistema</p>
                </div>

                <div className="space-y-6">
                    {tips.map((tip, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="transparent-card-border rounded-[2.5rem] p-8 space-y-4 hover:bg-white/[0.02] transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:border-primary/30 transition-colors">
                                    <span className="material-symbols-outlined text-2xl" style={{ color: tip.color }}>{tip.icon}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: tip.color }}>{tip.category}</span>
                                    <h3 className="text-lg font-display font-bold text-white leading-tight">{tip.title}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
                                "{tip.description}"
                            </p>
                        </motion.div>
                    ))}
                </div>

                <section className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Maestria Profissional</h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                        O POUP não é apenas um app, é seu copiloto na jornada para a liberdade financeira absoluta. Siga estas diretrizes e monitore seu progresso diariamente.
                    </p>
                </section>
            </main>
        </div>
    );
}
