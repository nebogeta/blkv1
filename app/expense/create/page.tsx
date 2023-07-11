
'use client';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {toast} from '@/ui/ToastComponent';

import Form from '@/components/ui/Form';


interface Expense {
    description: string;
    amount: number;
    group: string;
    date: Date;
}

function CreateExpenseNew() {
    const router = useRouter();

    const [expense, setExpense] = useState<Expense>({
        description: "",
        amount: 0,
        group: "",
        date: new Date(),
    });
    const [isEditing, setIsEditing] = useState(false);

    async function createNewExpense(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsEditing(true);
        const localDate = new Date(expense.date);
        const formattedExpense = {
            ...expense,
            date:  localDate.toISOString(), // Format the date as ISO string
        };
        try {

             await fetch("/api/expense/create", {
                method: "POST",
                body: JSON.stringify(formattedExpense),
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(() => {
                    setExpense({
                        description: "",
                        amount: 0,
                        group: "",
                        date: new Date(),
                    });
                })
                .then(() => {
                    toast({
                        title: "Success",
                        message: "Expense created successfully",
                        type: "success",
                    });
                })
                .then(() => {
                    router.push("/dashboard");
                    router.refresh();
                });

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsEditing(false);
        }
    }


    return (

          <Form
          type='create'
            expense={expense}
            setExpense={setExpense}
            isEditing={isEditing}
          updateExpense={createNewExpense}
          />

    );
}

export default CreateExpenseNew;