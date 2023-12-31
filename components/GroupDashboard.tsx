'use client';

import ExpenseOptions from "@/components/ExpenseOptions";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Table from "@/components/ui/Table";
import { Expense } from "@prisma/client";
import React, { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import Link from "next/link";
import {buttonVariants} from "@/ui/Button";
import Icons from "@/components/Icons";

interface GroupDashboardProps {
    expenses: Expense[];
}

const GroupDashboard: React.FC<GroupDashboardProps> = ({ expenses }) => {
    const { expenses: contextExpenses, setExpenses } = useContext(ExpenseContext);

    // Calculate the total amount spent by each user
    const usersTotalExpense: Record<string, number> = {};
    contextExpenses.forEach((expense) => {
        const { userId, amount, name } = expense;
        // @ts-ignore
        usersTotalExpense[userId] = (usersTotalExpense[userId] || 0) + amount;
    });

    // Calculate the total amount spent
    const totalExpense = Object.values(usersTotalExpense).reduce((total, amount) => total + amount, 0);

    // Calculate the equal amount to be split among users
    const numUsers = Object.keys(usersTotalExpense).length;
    const equalSplitAmount = totalExpense / numUsers;

    // Calculate the amount owed by each person
    const amountOwed: Record<string, number> = {};
    Object.entries(usersTotalExpense).forEach(([userId, amount]) => {
        const amountSpent = amount;
        let amountOwedToPay = 0;
        if (amountSpent < equalSplitAmount) {
            amountOwedToPay = equalSplitAmount - amountSpent;
        }

        amountOwed[userId] = amountOwedToPay;
    });

    // Format the amount owed as currency
    const formattedAmountOwed: Record<string, string> = {};
    Object.entries(amountOwed).forEach(([userId, amount]) => {
        const USDollar = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        formattedAmountOwed[userId] = USDollar.format(Math.abs(amount));
    });



    return (
        <div className="container flex flex-col gap-6">
            <LargeHeading className="mt-6">Welcome back to {contextExpenses[0]?.group} expense group</LargeHeading>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                <ExpenseOptions expenses={contextExpenses} />
            </div>

            <Paragraph className="text-center md:text-left mt-4 mb-4">
                You can filter your expenses by selecting the options from the dropdown above.
            </Paragraph>

            <Table expenses={contextExpenses} />
            {numUsers >= 2 && (
                <div className="mt-4">
                    <Paragraph className="font-bold text-start">Amounts Owed:</Paragraph>
                    <ul className="max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-start text-base sm:text-lg text-sm sm:text-base">
                        {Object.entries(formattedAmountOwed).map(([userId, amount]) => (
                            <li key={userId}>
                                {contextExpenses.find((expense) => expense.userId === userId)?.name} owes {amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className='flex flex-col items-center gap-6 text-center'>
                <Link
                    className={buttonVariants({
                        variant: 'ghost',
                        className: 'w-fit',
                    })}
                    href='/dashboard'>
                    <Icons.ChevronLeft className='mr-2 h-4 w-4' />
                    Back to your dashboard
                </Link>
            </div>
        </div>
    );
};

export default GroupDashboard;

