export interface Transaction {
    id: string;
    user_id: string;
    description: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
    date: string;
    method?: string;
    created_at: string;
}

export interface Asset {
    id: string;
    user_id: string;
    ticker?: string;
    name: string;
    current_value: number;
    type?: string;
    change_percentage: number;
    icon?: string;
    created_at: string;
}

export interface Goal {
    id: string;
    user_id: string;
    name: string;
    target_amount: number;
    current_amount: number;
    deadline?: string;
    color?: string;
    created_at: string;
}
