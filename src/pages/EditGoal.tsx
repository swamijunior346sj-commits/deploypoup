import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';

export default function EditGoal() {
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshData } = useData();
    const goal = location.state?.goal;

    const [name, setName] = useState(goal?.name || '');
    const [targetAmount, setTargetAmount] = useState(goal?.target_amount || 0);
    const [monthlyContrib, setMonthlyContrib] = useState(500);
    const [months, setMonths] = useState(12);
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (goal) {
            const remaining = Math.max(0, targetAmount - goal.current_amount);
            const calculatedMonths = Math.ceil(remaining / (monthlyContrib || 1));
            setMonths(Math.max(1, calculatedMonths));
        }
    }, [targetAmount, monthlyContrib, goal]);

    const handleSave = async () => {
        if (!goal || !name) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('goals')
                .update({
                    name: name.trim(),
                    target_amount: targetAmount,
                })
                .eq('id', goal.id);

            if (error) throw error;
            await refreshData();
            setShowSuccess(true);
        } catch (error) {
            console.error('Error updating goal:', error);
            alert('Erro ao salvar as alterações.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!goal) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('goals')
                .delete()
                .eq('id', goal.id);

            if (error) throw error;
            await refreshData();
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting goal:', error);
            alert('Erro ao excluir a meta.');
        } finally {
            setLoading(false);
        }
    };

    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + Number(months));
    const deadlineText = targetDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    const percentage = goal ? Math.min(100, Math.round((goal.current_amount / (targetAmount || 1)) * 100)) : 0;

    return (
        <div className="bg-black text-white font-sans min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0 rotate-12"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[30%] bg-red-500/5 blur-[120px] rounded-full pointer-events-none z-0 -rotate-12"></div>

            <Header title="Ajustar Estratégia" showBack onAction={() => setShowDeleteConfirm(true)} actionIcon="delete" />

            <main className="flex-grow px-6 pt-10 pb-40 relative z-10 space-y-12 overflow-y-auto no-scrollbar">

                {/* ── Goal Identity ── */}
                <section className="flex flex-col items-center text-center space-y-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-950/40 border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden">
                            <span className="material-symbols-outlined text-5xl text-primary font-light relative z-10">target</span>
                            <div className="absolute inset-0 bg-primary/5 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-widest shadow-[0_10px_20px_rgba(15,182,127,0.3)] italic">
                            {percentage}%
                        </div>
                    </div>

                    <div className="w-full space-y-2">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-3xl font-black tracking-tight text-center text-white p-0 hover:bg-white/5 rounded-2xl w-full transition-all uppercase italic"
                            placeholder="NOME DA META"
                        />
                        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] italic opacity-60">Identificador Tático</p>
                    </div>
                </section>

                {/* ── Interactive Controls ── */}
                <section className="space-y-12">
                    {/* Target Amount Slider */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-end px-2">
                            <label className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em]">Patrimônio Alvo</label>
                            <span className="text-xl font-black text-white italic tracking-tight">R$ {Number(targetAmount).toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="relative h-2 flex items-center">
                            <input
                                className="w-full h-1 bg-zinc-900 rounded-full appearance-none outline-none accent-primary cursor-pointer active:scale-[1.02] transition-transform"
                                max="1000000" min="1000" step="1000"
                                type="range"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Monthly Contribution Slider */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-end px-2">
                            <label className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em]">Aporte Mensal</label>
                            <span className="text-xl font-black text-primary italic tracking-tight">R$ {monthlyContrib.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="relative h-2 flex items-center">
                            <input
                                className="w-full h-1 bg-zinc-900 rounded-full appearance-none outline-none accent-primary cursor-pointer active:scale-[1.02] transition-transform"
                                max="50000" min="100" step="100"
                                type="range"
                                value={monthlyContrib}
                                onChange={(e) => setMonthlyContrib(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Strategy insight Card ── */}
                <section className="transparent-card-border rounded-[3rem] p-8 bg-zinc-950/40 space-y-8 border-white/5 relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <span className="material-symbols-outlined text-primary text-2xl">insights</span>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Estratégia de Alocação</h3>
                            <p className="text-[8px] text-zinc-600 font-black uppercase tracking-widest mt-1">Análise de Performance IA</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1 text-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Tempo Restante</span>
                            <p className="text-3xl font-black text-white italic tracking-tighter">{months} <span className="text-xs text-zinc-600 uppercase not-italic">Meses</span></p>
                        </div>
                        <div className="space-y-1 text-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Data Limite</span>
                            <p className="text-sm font-black text-white italic uppercase tracking-tight mt-3">{deadlineText}</p>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-sm mt-0.5 animate-pulse italic">bolt</span>
                            <p className="text-[10px] text-zinc-400 font-medium leading-relaxed italic">
                                Para reduzir o prazo em <span className="text-white font-bold">3 meses</span>, aumente seu aporte para <span className="text-white font-bold">R$ {(monthlyContrib * 1.2).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-sm mt-0.5 italic">lightbulb</span>
                            <p className="text-[10px] text-zinc-400 font-medium leading-relaxed italic">
                                Dica: Automatize este aporte no dia do recebimento para garantir 100% de execução.
                            </p>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </section>

                {/* ── Submit Action ── */}
                <div className="pt-10">
                    <button
                        onClick={handleSave}
                        disabled={loading || !name}
                        className={`w-full h-20 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || !name ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                    >
                        <span className="relative z-10">{loading ? 'SINCRONIZANDO...' : 'CONFIRMAR AJUSTES'}</span>
                        <motion.div
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-1/3 bg-white/40 skew-x-12 z-0"
                        />
                    </button>
                    <p className="text-[9px] text-zinc-700 font-bold uppercase tracking-[0.3em] text-center mt-8 italic opacity-60">"PROTOCOLOS AJUSTADOS PARA MÁXIMA PERFORMANCE."</p>
                </div>

            </main>

            {/* ── Overlays ── */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setShowDeleteConfirm(false)}></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="relative w-full max-w-[320px] transparent-card-border rounded-[3rem] p-10 flex flex-col items-center text-center shadow-[0_0_80px_rgba(239,68,68,0.1)] border-red-500/10"
                        >
                            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-8 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                <span className="material-symbols-outlined text-4xl text-red-500">delete_forever</span>
                            </div>
                            <h2 className="text-xl font-black text-white tracking-widest uppercase italic mb-4">Abortar Meta?</h2>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] mb-10 leading-relaxed italic">
                                Todo o progresso e dados acumulados serão deletados permanentemente.
                            </p>
                            <div className="w-full space-y-4">
                                <button
                                    onClick={handleDelete}
                                    className="w-full py-4 rounded-2xl bg-red-500 text-white font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl"
                                >
                                    Confirmar Deleção
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="w-full py-4 rounded-2xl bg-zinc-900 text-zinc-500 font-bold uppercase text-[9px] tracking-widest active:scale-95 transition-all"
                                >
                                    Manter Ativo
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {showSuccess && (
                    <div className="fixed inset-0 z-[600] flex flex-col items-center justify-center p-8">
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => navigate('/dashboard')}></div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full max-w-[320px] transparent-card-border rounded-[40px] p-12 flex flex-col items-center text-center shadow-[0_0_100px_rgba(15,182,127,0.1)]"
                        >
                            <span className="material-symbols-outlined text-primary text-6xl mb-8 animate-pulse italic">verified</span>
                            <h2 className="text-white font-black text-xl tracking-[0.2em] uppercase italic mb-12">Dados Atualizados</h2>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-5 rounded-2xl border-2 border-primary bg-transparent text-primary text-[10px] font-black uppercase tracking-[0.3em] active:bg-primary/20 transition-all hover:bg-primary/5 italic"
                            >
                                Finalizar
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
