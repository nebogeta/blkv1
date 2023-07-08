import { Expense } from "@/types/Expense";

export const setExpenses = (expenses: Expense[]) => ({
    type: 'SET_EXPENSES',
    payload: expenses,
});
