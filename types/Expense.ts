//expense expense interface
export interface Expense {
    id: number;
    name: string;
    amount: number;
    date: Date;
    group: string;
    description: string;
}