import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useData } from '../contexts/DataContext';

export default function EditGoal() {
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshData } = useData();
    const goal = location.state?.goal;

    const [name, setName] = useState(goal?.name || '');
    const [targetAmount, setTargetAmount] = useState(goal?.target_amount || 10000);
    const [monthlyContrib, setMonthlyContrib] = useState(850); // Valor inicial sugerido
    const [months, setMonths] = useState(12);
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Sincronizar meses baseado na contribuição e valor alvo
    useEffect(() => {
        if (goal) {
            const remaining = targetAmount - goal.current_amount;
            const calculatedMonths = Math.ceil(remaining / (monthlyContrib || 1));
            setMonths(Math.max(1, calculatedMonths));
        }
    }, [targetAmount, monthlyContrib, goal]);

    const handleSave = async () => {
        if (!goal) return;
        setLoading(true);
        try {
            const { error } = await supabase
                .from('goals')
                .update({
                    name,
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
            navigate('/goals');
        } catch (error) {
            console.error('Error deleting goal:', error);
            alert('Erro ao excluir a meta.');
        } finally {
            setLoading(false);
        }
    };

    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + Number(months));
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const deadlineText = `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;

    const percentage = goal ? Math.min(100, Math.round((goal.current_amount / (targetAmount || 1)) * 100)) : 0;

    return (
        <div className="bg-black text-[#FCFCFC] font-display min-h-screen flex flex-col selection:bg-primary/30">
            <div className={`${showSuccess ? 'blur-md opacity-40 pointer-events-none' : ''} transition-all duration-500 flex-1 flex flex-col`}>
                {/* Top Navigation */}
                <nav className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[#A7A7A7]">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight">Editar Meta</h1>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-red-500/20 transition-colors active:scale-90"
                    >
                        <span className="material-symbols-outlined text-red-500">delete</span>
                    </button>
                </nav>

                <main className="flex-1 px-6 pb-32 max-w-lg mx-auto w-full">
                    {/* Header Visual Section */}
                    <div className="flex flex-col items-center mt-8 mb-12">
                        <div className="relative">
                            <div className="relative w-40 h-40 rounded-full border-2 flex items-center justify-center p-1 border-primary/20 bg-slate-900/40 neon-glow">
                                <div className="w-full h-full rounded-full bg-slate-900/50 flex items-center justify-center overflow-hidden">
                                    <span className="material-symbols-outlined text-primary text-6xl">target</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 right-0 bg-primary text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(15,182,127,0.5)]">
                                {percentage}%
                            </div>
                        </div>
                        <div className="mt-8 text-center w-full px-4">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-3xl font-black tracking-tight text-center text-white p-0 hover:bg-white/5 rounded-lg w-full transition-all uppercase"
                                placeholder="NOME DA META"
                            />
                            <p className="text-[#A7A7A7] text-xs font-bold uppercase tracking-widest mt-2 opacity-50">Sua Meta Principal</p>
                        </div>
                    </div>

                    {/* Interactive Controls */}
                    <div className="space-y-10 mb-16 px-2">
                        {/* Target Amount Slider */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-widest opacity-70">Valor Alvo</label>
                                <span className="text-2xl font-light text-[#FCFCFC] tracking-tight">R$ {Number(targetAmount).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="relative flex items-center h-12 px-6 rounded-2xl border border-white/5 bg-slate-900/20 transition-all focus-within:border-primary/30">
                                <input
                                    className="w-full h-1 bg-white/10 rounded-full appearance-none slider-thumb outline-none accent-primary"
                                    max="200000" min="500" step="500"
                                    type="range"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Monthly Contribution Slider */}
                        <div className="group">
                            <div className="flex justify-between items-end mb-4">
                                <label className="text-[#D6D6D6] text-[10px] font-bold uppercase tracking-widest opacity-70">Contribuição Mensal</label>
                                <span className="text-2xl font-light text-[#FCFCFC] tracking-tight">R$ {monthlyContrib.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="relative flex items-center h-12 px-6 rounded-2xl border border-white/5 bg-slate-900/20 transition-all focus-within:border-primary/30">
                                <input
                                    className="w-full h-1 bg-white/10 rounded-full appearance-none slider-thumb outline-none accent-primary"
                                    max="10000" min="50" step="50"
                                    type="range"
                                    value={monthlyContrib}
                                    onChange={(e) => setMonthlyContrib(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Deadline Information */}
                        <div className="p-8 rounded-[32px] border border-white/5 bg-slate-900/20 flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-4">Prazo Estimado</span>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-black text-white">{months}</span>
                                <span className="text-lg font-bold text-slate-500 uppercase">Meses</span>
                            </div>
                            <p className="text-slate-400 font-medium text-sm">Conclusão em <span className="text-white font-bold">{deadlineText}</span></p>

                            <div className="w-full h-px bg-white/5 my-6"></div>

                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Economizando este valor mensalmente, você atingirá seu objetivo de R$ {targetAmount.toLocaleString('pt-BR')} em {months} meses.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Fixed Action Button */}
                <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black to-transparent z-[90]">
                    <div className="max-w-lg mx-auto">
                        <button
                            onClick={handleSave}
                            disabled={loading || !name}
                            className={`w-full h-18 rounded-[2.5rem] bg-white text-black font-black tracking-[0.5em] text-[11px] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] relative overflow-hidden group ${loading || !name ? 'opacity-50' : 'hover:bg-primary hover:text-black hover:shadow-[0_20px_50px_rgba(15,182,127,0.2)]'}`}
                        >
                            {loading ? 'Delineando...' : 'Confirmar Alterações'}
                        </button>
                    </div>
                </div>

                {/* Delete Confirmation Overlay */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 backdrop-blur-premium" onClick={() => setShowDeleteConfirm(false)}></div>
                        <div className="relative w-full max-w-sm transparent-card-border rounded-[40px] p-10 text-center popup-anim">
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                <span className="material-symbols-outlined text-red-500 text-4xl font-bold">delete_forever</span>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight uppercase">Excluir Meta?</h3>
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10 leading-relaxed italic">
                                Esta ação não pode ser desfeita. Todo o progresso acumulado será perdido permanentemente.
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleDelete}
                                        className="w-full h-16 rounded-2xl bg-white text-black font-black text-[11px] tracking-[0.3em] uppercase transition-all duration-500 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-red-500 hover:text-black hover:shadow-[0_20px_50px_rgba(239,68,68,0.2)]"
                                    >
                                        Excluir Agora
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="w-full h-16 rounded-2xl bg-zinc-950/50 border border-white/5 text-zinc-500 font-bold text-[10px] tracking-[0.2em] uppercase transition-all hover:text-white"
                                    >
                                        Manter Meta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-8">
                    <div className="absolute inset-0 backdrop-blur-premium" onClick={() => { setShowSuccess(false); navigate('/goals'); }}></div>
                    <div className="relative w-full max-w-[320px] transparent-card-border rounded-[40px] p-12 flex flex-col items-center text-center popup-anim">
                        <div className="mb-10">
                            <span className="material-symbols-outlined text-primary text-[100px] font-light neon-text-glow leading-none">
                                check_circle
                            </span>
                        </div>
                        <h2 className="text-[#FCFCFC] font-black text-[20px] tracking-[0.2em] uppercase mb-12">
                            Salvo com Sucesso!
                        </h2>
                        <button
                            onClick={() => {
                                setShowSuccess(false);
                                navigate('/goals');
                            }}
                            className="w-full py-5 rounded-2xl border-2 border-primary bg-transparent text-primary text-xs font-black uppercase tracking-[0.3em] active:bg-primary/20 transition-all hover:bg-primary/5"
                        >
                            Concluir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
