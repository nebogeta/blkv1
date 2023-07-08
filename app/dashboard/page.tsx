
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import CreateExpense  from "@/components/CreateExpense";
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Blk expense | Dashboard',
    description: 'Free & open-source expense tracker app',
}

const page = async () => {
    const user = await getServerSession(authOptions);
    if (!user) return notFound();

    const expenses = await db.expense.findMany({
        where: {
            userId: user.user.id,

        },
    });


    return (
        <div className='max-w-7xl mx-auto mt-16'>
            {expenses ? (

                // <ExpenseDashboard />
                <strong>here you go</strong>

            ) : (
                <CreateExpense />

            )}
        </div>
    )
};