'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from '@/ui/ToastComponent';
// @ts-ignore
import { useSearchParams } from 'next/navigation';
import Form from '@/components/ui/Form';

interface Expense {
    description: string;
    amount: number;
    group: string;
    date: Date;
}

function UpdatePrompt() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const expenseId = searchParams.get("id");

    const [expense, setExpense] = useState<Expense>({
        description: "",
        amount: 0,
        group: "",
        date: new Date(),
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getExpenseDetails = async () => {
            try {
                const response = await fetch(`/api/expense/${expenseId}`);
                const data = await response.json();

                setExpense({
                    description: data.description,
                    amount: data.amount,
                    group: data.group,
                    date: data.date,
                });
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (expenseId) getExpenseDetails();
    }, [expenseId]);

    async function updateExpense(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsEditing(true);

        try {
            const response = await fetch(`/api/expense/${expenseId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    description: expense.description,
                    amount: expense.amount,
                    date: expense.date,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    message: "Expense updated successfully",
                    type: "success",
                });
                router.push("/dashboard");
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    message: "Failed to update expense",
                    type: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsEditing(false);
        }
    }

    return (
        <Form
            type="Edit"
            expense={expense}
            setExpense={setExpense}
            isEditing={isEditing}
            updateExpense={updateExpense}
        />
    );
}

export default UpdatePrompt;
