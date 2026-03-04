import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { Transaction, Asset, Goal, Category, SubCategory } from '../types';

interface DataContextType {
    transactions: Transaction[];
    assets: Asset[];
    goals: Goal[];
    categories: Category[];
    subCategories: SubCategory[];
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
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
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
            await Promise.all([
                supabase.from('transactions').delete().eq('user_id', user.id),
                supabase.from('assets').delete().eq('user_id', user.id),
                supabase.from('goals').delete().eq('user_id', user.id),
                supabase.from('budgets').delete().eq('user_id', user.id),
                supabase.from('categories').delete().eq('user_id', user.id)
            ]);

            setTransactions([]);
            setAssets([]);
            setGoals([]);
            setBudgets([]);
            setCategories([]);
            setSubCategories([]);
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
                { data: goalsData },
                { data: categoriesData },
                { data: subCategoriesData }
            ] = await Promise.all([
                supabase.from('transactions').select('*').order('date', { ascending: false }),
                supabase.from('assets').select('*').order('created_at', { ascending: false }),
                supabase.from('goals').select('*').order('created_at', { ascending: false }),
                supabase.from('categories').select('*').order('name', { ascending: true }),
                supabase.from('subcategories').select('*').order('name', { ascending: true })
            ]);

            setTransactions(transData || []);
            setAssets(assetsData || []);
            setGoals(goalsData || []);
            setCategories(categoriesData || []);
            setSubCategories(subCategoriesData || []);
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
            setCategories([]);
            setSubCategories([]);
            setLoading(false);
            return;
        }

        fetchData();

        const channels = [
            supabase.channel('public:transactions').on('postgres_changes', { event: '*', schema: 'public', table: 'transactions', filter: `user_id=eq.${user.id}` }, () => fetchData()),
            supabase.channel('public:assets').on('postgres_changes', { event: '*', schema: 'public', table: 'assets', filter: `user_id=eq.${user.id}` }, () => fetchData()),
            supabase.channel('public:goals').on('postgres_changes', { event: '*', schema: 'public', table: 'goals', filter: `user_id=eq.${user.id}` }, () => fetchData()),
            supabase.channel('public:categories').on('postgres_changes', { event: '*', schema: 'public', table: 'categories', filter: `user_id=eq.${user.id}` }, () => fetchData()),
            supabase.channel('public:subcategories').on('postgres_changes', { event: '*', schema: 'public', table: 'subcategories' }, () => fetchData())
        ].map(c => c.subscribe());

        return () => {
            channels.forEach(c => supabase.removeChannel(c));
        };
    }, [user, level]);

    return (
        <DataContext.Provider value={{
            transactions, assets, goals, categories, subCategories, budgets, loading,
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
