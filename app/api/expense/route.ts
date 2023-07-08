import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";


export async function GET(req: NextRequest) {
    try {
        const user = await getServerSession(authOptions);

        if (!user) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        const expenses = await db.expense.findMany({
            where: {
                userId: (user.user as { id: string }).id,
            },
        });

        return new NextResponse(JSON.stringify(expenses));
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
