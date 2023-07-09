'use client';


import React, {createContext, useState, ReactNode, useEffect} from "react";
import {Expense} from "@prisma/client";

interface ExpenseContextProps {
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
}

const initialExpenseContext: ExpenseContextProps = {
    expenses: [],
    setExpenses: () => {
    },
};

export const ExpenseContext = createContext<ExpenseContextProps>(
    initialExpenseContext
);

export const ExpenseProvider = ({children}: { children: ReactNode }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    useEffect(() => {

        const storedExpenses = localStorage.getItem("expenses");
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }
    }, []);

    useEffect(() => {

        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);
    const updateExpenses = (newExpenses: Expense[]) => {
        setExpenses(newExpenses);
    };

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                setExpenses: updateExpenses,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

