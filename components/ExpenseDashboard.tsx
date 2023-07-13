import {authOptions} from "@/lib/auth";
import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import Table from "@/ui/Table";
import ExpenseOptions from "@/components/ExpenseOptions";
import {notFound} from 'next/navigation'
import Link from "next/link";
import {buttonVariants} from "@/ui/Button";
import Icons from "@/components/Icons";


const ExpenseDashboard = async ({}) => {
    const user = await getServerSession(authOptions);

    if (!user) return notFound();

    const expenses = await db.expense.findMany({
        where: {
            userId: user.user.id,
        },
    });


    const total = expenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0);

    const roundedTotal = total.toFixed(2);

    const roundedTotalNumber = Number(roundedTotal);
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const formattedTotal = USDollar.format(roundedTotalNumber);


    return (
        <div className="container flex flex-col gap-6">
            <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
                <ExpenseOptions expenses={expenses}/>
            </div>

            <Paragraph className="text-center md:text-left mt-4 mb-4">
                Your Expense history:
            </Paragraph>

            <Table expenses={expenses}/>
            {roundedTotalNumber > 0 && <Paragraph className="text-center font-semibold md:text-left mt-4 -mb-4 ">
                Total: {formattedTotal}
            </Paragraph>}
            <div className='flex flex-col items-center gap-6 text-center'>
                <Link
                    className={buttonVariants({
                        variant: 'ghost',
                        className: 'w-fit',
                    })}
                    href='/'>
                    <Icons.ChevronLeft className='mr-2 h-4 w-4'/>
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default ExpenseDashboard;
