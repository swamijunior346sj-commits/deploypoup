import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import { useNotifications } from '../contexts/NotificationContext';

export default function NotificationCenter() {
    const navigate = useNavigate();
    const { notifications, markAsRead, clearAll } = useNotifications();

    return (
        <div className="bg-black text-white min-h-screen flex flex-col selection:bg-primary/30 relative overflow-hidden font-display">
            {/* ── Background Aura ── */}
            <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[40%] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <Header title="Centro de Comando" showBack subtitle="Notificações e Alertas" />

            <main className="flex-grow px-6 pt-8 pb-32 space-y-8 relative z-10 overflow-y-auto no-scrollbar">

                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Central de Inteligência</span>
                        <h2 className="text-2xl font-black italic text-white uppercase tracking-tight text-glow">Feed de Atividade</h2>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-red-500 transition-colors"
                        >
                            Limpar Tudo
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {notifications.length > 0 ? (
                            notifications.map((notif, idx) => (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => markAsRead(notif.id)}
                                    className={`relative p-6 rounded-[2rem] border transition-all cursor-pointer group ${notif.read
                                            ? 'bg-zinc-950/20 border-white/5 opacity-60'
                                            : 'bg-zinc-900/40 border-primary/20 shadow-[0_10px_30px_rgba(15,182,127,0.1)]'
                                        }`}
                                >
                                    <div className="flex gap-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.type === 'success' ? 'bg-primary/10 text-primary' :
                                                notif.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            <span className="material-symbols-outlined text-2xl font-black">{
                                                notif.type === 'success' ? 'check_circle' :
                                                    notif.type === 'error' ? 'report_problem' : 'notifications'
                                            }</span>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-[11px] font-black text-white uppercase tracking-wider italic">{notif.title}</h4>
                                                <span className="text-[8px] font-bold text-zinc-600 uppercase">{new Date(notif.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight leading-relaxed">{notif.message}</p>
                                        </div>
                                    </div>
                                    {!notif.read && (
                                        <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_#0FB67F]"></div>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                                <div className="w-20 h-20 rounded-full bg-zinc-950 border border-white/5 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                                    <span className="material-symbols-outlined text-zinc-800 text-4xl">notifications_off</span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-black italic text-zinc-500 uppercase tracking-tighter">Silêncio Absoluto</h3>
                                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Nenhuma nova transmissão interceptada.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
}
