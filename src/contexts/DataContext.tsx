import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Transaction, Asset, Goal } from '../types';

interface DataContextType {
    transactions: Transaction[];
    assets: Asset[];
    goals: Goal[];
    budgets: any[];
    loading: boolean;
    refreshData: () => Promise<void>;
    xp: number;
    level: number;
    currentMaxXP: number;
    addXP: (amount: number) => void;
    levelName: string;
    levelNames: string[];
    clearAllData: () => Promise<void>;
}

export const LEVEL_NAMES = [
    "Novato", "Iniciante", "Aprendiz", "Poupador", "Poupador Ativo",
    "Investidor", "Estrategista", "Analista", "Planejador", "Gestor",
    "Visionário", "Mestre", "Águia", "Tubarão", "Elite",
    "Magnata", "Barão", "Soberano", "Lenda do POUP"
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [budgets, setBudgets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [xp, setXp] = useState(() => Number(localStorage.getItem('poup_xp') || 0));
    const [level, setLevel] = useState(() => Number(localStorage.getItem('poup_level') || 1));

    const currentMaxXP = Math.min(1000, Math.round(100 * Math.pow(1.1, level - 1)));
    const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];

    const addXP = (amount: number) => {
        setXp(prev => {
            const nextXp = prev + amount;
            if (nextXp >= currentMaxXP) {
                setLevel(l => {
                    const nextL = l + 1;
                    localStorage.setItem('poup_level', String(nextL));
                    return nextL;
                });
                const leftover = nextXp - currentMaxXP;
                localStorage.setItem('poup_xp', String(leftover));
                return leftover;
            }
            localStorage.setItem('poup_xp', String(nextXp));
            return nextXp;
        });
    };

    const clearAllData = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Delete from all tables in Supabase for this user
            await Promise.all([
                supabase.from('transactions').delete().eq('user_id', user.id),
                supabase.from('assets').delete().eq('user_id', user.id),
                supabase.from('goals').delete().eq('user_id', user.id),
                supabase.from('budgets').delete().eq('user_id', user.id)
            ]);

            // Reset local state
            setTransactions([]);
            setAssets([]);
            setGoals([]);
            setBudgets([]);
            setXp(0);
            setLevel(1);
            localStorage.setItem('poup_xp', '0');
            localStorage.setItem('poup_level', '1');

            await fetchData();
        } catch (error) {
            console.error('Error clearing data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const [
                { data: transData },
                { data: assetsData },
                { data: goalsData }
            ] = await Promise.all([
                supabase.from('transactions').select('*').order('date', { ascending: false }),
                supabase.from('assets').select('*').order('created_at', { ascending: false }),
                supabase.from('goals').select('*').order('created_at', { ascending: false })
            ]);

            setTransactions(transData || []);
            setAssets(assetsData || []);
            setGoals(goalsData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setTransactions([]);
            setAssets([]);
            setGoals([]);
            setLoading(false);
            return;
        }

        fetchData();

        // Real-time subscriptions
        const channels = [
            supabase.channel('public:transactions').on('postgres_changes', { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, () => {
                fetchData();
                addXP(1);
            }),
            supabase.channel('public:assets').on('postgres_changes', { event: '*', schema: 'public', table: 'assets', filter: `user_id=eq.${user.id}` }, () => {
                fetchData();
                addXP(1);
            }),
            supabase.channel('public:goals').on('postgres_changes', { event: '*', schema: 'public', table: 'goals', filter: `user_id=eq.${user.id}` }, () => {
                fetchData();
                addXP(5);
            })
        ].map(c => c.subscribe());

        return () => {
            channels.forEach(c => supabase.removeChannel(c));
        };
    }, [user, level]);

    return (
        <DataContext.Provider value={{
            transactions, assets, goals, budgets, loading,
            refreshData: fetchData, xp, level, currentMaxXP, addXP, levelName, levelNames: LEVEL_NAMES, clearAllData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
