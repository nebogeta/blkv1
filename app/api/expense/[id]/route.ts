import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { Expense } from "@/types/Expense";

// expense get by id route
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const { id } = params;

        if (!id) {
            return new NextResponse("Expense id is required", { status: 400 });
        }

        const expense = await db.expense.findUnique({
            where: {
                id: params.id,
            },
        });

        return new NextResponse(JSON.stringify(expense));
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}

// expense delete by id route
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const { id } = params;

        if (!id) {
            return new NextResponse("Expense id is required", { status: 400 });
        }

        const expense = await db.expense.delete({
            where: {
                id: params.id,
            },
        });

        return new NextResponse(JSON.stringify(expense));
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}

// expense update by id route
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getAuthSession();
        const { description, date, amount, group } = await req.json();

        if (!session?.user) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const { id } = params;

        if (!id) {
            return new NextResponse("Expense id is required", { status: 400 });
        }

        const existingExpense = await db.expense.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!existingExpense) {
            return new NextResponse("Expense not found", { status: 404 });
        }

        existingExpense.description = description;
        existingExpense.date = date;
        existingExpense.group = group;
        existingExpense.amount = amount;

        const expense = await db.expense.update({
            where: {
                id: params.id,
            },
            data: {
                description: description,
                amount: Number(amount),
                group: group,
                date: new Date(date),
                userId: session.user.id,
                name: session.user.name,
            },
        });

        return new NextResponse(JSON.stringify(expense));
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
