import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params:{startDate: Date, endDate: Date, groupId:string} }) {
    try {
        const { startDate, endDate, groupId } = params;

        if (!startDate || !endDate) {
            return new NextResponse("Start date and end date are required", {
                status: 400,
            });
        }

        if (!groupId) {
            return new NextResponse("Group ID is required", { status: 400 });
        }


        const expenses = await db.expense.findMany({
            where: {
                date: {
                    gte: new Date(params.startDate).toISOString(),
                    lte: new Date(params.endDate).toISOString(),
                },
                group: {
                    startsWith: params.groupId,

                },
            },
            include: {
                user: true,
            },
        });

        return new NextResponse(JSON.stringify(expenses));
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}
