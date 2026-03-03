import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Transaction, Asset, Goal } from '../types';

interface DataContextType {
    transactions: Transaction[];
    assets: Asset[];
    goals: Goal[];
    budgets: any[]; // Temporary 'any' until Budget type is defined or imported
    loading: boolean;
    refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [budgets, setBudgets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        const transactionsChannel = supabase
            .channel('public:transactions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, () => fetchData())
            .subscribe();

        const assetsChannel = supabase
            .channel('public:assets')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'assets', filter: `user_id=eq.${user.id}` }, () => fetchData())
            .subscribe();

        const goalsChannel = supabase
            .channel('public:goals')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'goals', filter: `user_id=eq.${user.id}` }, () => fetchData())
            .subscribe();

        return () => {
            supabase.removeChannel(transactionsChannel);
            supabase.removeChannel(assetsChannel);
            supabase.removeChannel(goalsChannel);
        };
    }, [user]);

    return (
        <DataContext.Provider value={{ transactions, assets, goals, budgets, loading, refreshData: fetchData }}>
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
