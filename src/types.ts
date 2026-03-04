export interface Transaction {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    category: string;
    subcategory?: string;
    notes?: string;
    type: 'income' | 'expense' | 'transfer';
    date: string;
    from_account_id?: string | null;
    to_account_id?: string | null;
    created_at: string;
}

export interface Asset {
    id: string;
    user_id: string;
    ticker?: string;
    name: string;
    current_value: number;
    type?: string;
    amount?: number;
    purchase_date?: string;
    broker?: string;
    change_percentage?: number;
    change_24h?: number;
    icon?: string;
    created_at: string;
}

export interface Goal {
    id: string;
    user_id: string;
    title: string;
    target_amount: number;
    current_amount: number;
    deadline?: string;
    icon?: string;
    category?: string;
    created_at: string;
}

export interface Category {
    id: string;
    user_id: string;
    name: string;
    icon: string;
    color: string;
    planned_budget: number;
    is_default?: boolean;
    created_at?: string;
}

export interface SubCategory {
    id: string;
    category_id: string;
    name: string;
    icon?: string;
    created_at?: string;
}

export interface Profile {
    id: string;
    full_name?: string;
    phone?: string;
    birth_date?: string;
    zip_code?: string;
    city?: string;
    updated_at: string;
}
