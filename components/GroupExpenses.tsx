'use client';

import React, {FC, useState, useContext} from "react";
import {useRouter} from "next/navigation";
import {toast} from "@/ui/ToastComponent";
import GroupForm from "@/ui/GroupForm";
import {Expense} from ".prisma/client";
import { ExpenseContext} from "@/context/ExpenseContext";

interface GroupExpensesProps  {
    // setExpenses: (expenses: any[]) => void,
    expenses: Expense[]
}

// interface GroupExpensesProps extends PropsFromRedux {}

const GroupExpenses: FC<GroupExpensesProps> = ({ expenses,  }) => {
    const { setExpenses } = useContext(ExpenseContext);
    const [dynamicQuery, setDynamicQuery] = useState({
        groupId: "",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
    });
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const updateQuery = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsEditing(true);

        try {
            const res = await fetch(`/api/group/${dynamicQuery.startDate}/${dynamicQuery.endDate}/${dynamicQuery.groupId}`);
            const expenses = await res.json();
            console.log(expenses);

            if (expenses.length === 0) {
                toast({
                    title: "No expense/group found for the given input.",
                    message: "Please select a valid date range or group.",
                    type: "error",
                });

                router.push('/dashboard');
                return;
            }

            if (res.status === 200) {
                setExpenses(expenses);
                router.push('/group-search');
            }
        } catch (error) {
            toast({
                title: "Something went wrong.",
                message: "Please try again later.",
                type: "error",
            });
        } finally {
            setIsEditing(false);
        }
    };


    return (

        <GroupForm
            type="group"
            dynamicQuery={dynamicQuery}
            setDynamicQuery={setDynamicQuery}
            isEditing={isEditing}
            updateQuery={updateQuery}
        />
    );
};



export default GroupExpenses;

