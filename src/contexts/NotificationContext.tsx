import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    read: boolean;
    created_at: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (notif: Omit<Notification, 'id' | 'read' | 'created_at'>) => void;
    markAsRead: (id: string) => void;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [currentToast, setCurrentToast] = useState<Notification | null>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = (notif: Omit<Notification, 'id' | 'read' | 'created_at'>) => {
        const newNotif: Notification = {
            ...notif,
            id: Math.random().toString(36).substr(2, 9),
            read: false,
            created_at: new Date().toISOString(),
        };

        setNotifications(prev => [newNotif, ...prev]);
        setCurrentToast(newNotif);

        // Auto-hide toast
        setTimeout(() => {
            setCurrentToast(null);
        }, 5000);

        // Request Browser Push Permission (Real Push groundwork)
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        if (Notification.permission === "granted") {
            new Notification(newNotif.title, { body: newNotif.message });
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, clearAll }}>
            {children}

            {/* ── Luxury Gaming Toast ── */}
            <AnimatePresence>
                {currentToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="fixed top-8 right-6 z-[9999] w-80 pointer-events-auto"
                    >
                        <div className="relative p-5 bg-zinc-950/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-1 h-full ${currentToast.type === 'success' ? 'bg-primary' :
                                    currentToast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                                }`}></div>

                            <div className="flex gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${currentToast.type === 'success' ? 'bg-primary/10 text-primary' :
                                        currentToast.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                                    }`}>
                                    <span className="material-symbols-outlined font-black">
                                        {currentToast.type === 'success' ? 'check_circle' :
                                            currentToast.type === 'error' ? 'error' : 'notifications'}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{currentToast.title}</h4>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">{currentToast.message}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setCurrentToast(null)}
                                className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error("useNotifications must be used within NotificationProvider");
    return context;
};
