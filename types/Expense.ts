//expense expense interface
export interface Expense {
    id?: number;
    name: string;
    amount: number;
    date: string;
    group: string;
    description: string;
}