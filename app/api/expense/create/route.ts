import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {getAuthSession} from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session?.user)
            return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { description, amount, date, group } = body;

        const expense = await db.expense.create({
            data: {
                description,
                amount: Number(amount),
                group,
                date: new Date(date).toISOString(),
                userId: session.user.id,
                name: session.user.name,
            },
        });


        return NextResponse.json(expense, { status: 201 });
    } catch (error) {

        return new NextResponse("Internal Server error", { status: 500 });
    }
}
