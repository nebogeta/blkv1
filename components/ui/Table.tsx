'use client';

import {Icons} from "@/components/Icons";
import {Button} from "@/components/ui/Button";
import {toast} from "@/ui/ToastComponent";
import {createTheme, ThemeProvider} from "@mui/material";
// @ts-ignore
import {DataGrid, GridColDef, GridRenderHeaderParams} from "@mui/x-data-grid";
import {useTheme} from "next-themes";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Expense} from '@prisma/client'
import {format} from "date-fns";
import moment from "moment";

interface TableProps {
    expenses: Expense[];
}
type ModifiedExpense<k extends keyof Expense> = {
    [key in k]: Expense[key];
}

const Table: React.FC<TableProps> = ({ expenses }) => {
    const [data, setData] = useState([]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Username", width: 250 },
        { field: "description", headerName: "Description", width: 250 },
        { field: "amount", headerName: "Amount in $", width: 200 },
        { field: "date", headerName: "Date", width: 150 ,  valueFormatter: params =>
                moment(params?.value).format("MM/DD/yyyy"),},
        { field: "group", headerName: "Group", width: 150 },
        {
            field: "action",
            headerName: "Update",
            width: 150,
            renderCell: (params) => renderActionsCell(params.row.expenseId),
        },
    ];

    const router = useRouter();
    const handleEdit = async (itemId: number) => {
        await router.push(`/update/expense?id=${itemId}`);
    };

    const handleDelete = async (itemId: number) => {
        const hasConfirmed = confirm("Are you sure you want to delete this expense?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/expense/${itemId}`, {
                    method: "DELETE",
                });

                // @ts-ignore
                const filteredPosts = data.filter((item) => item.id !== itemId);

                setData(filteredPosts);

                toast({
                    title: "Success",
                    message: "Expense deleted successfully",
                    type: "success",
                });
            } catch (error) {
                console.log(error);
            } finally {
                router.refresh();
            }
        }
    };


    const formatDate = (date: Date) => {
        const modifiedDate = new Date(date);
        modifiedDate.setDate(modifiedDate.getDate() + 1);
        const month = ("0" + (modifiedDate.getMonth() + 1)).slice(-2);
        const day = ("0" + modifiedDate.getDate()).slice(-2);
        const year = modifiedDate.getFullYear();

        return `${month}/${day}/${year}`;
    };

    const row = expenses.map((expense, index) => ({
        id: index + 1,
        name: expense.name,
        description: expense.description,
        amount: expense.amount,
        group: expense.group,
        date: formatDate(expense.date), //to be checked later
        expenseId: expense.id,
    }));

    const renderActionsCell = (expenseId: number) => {
        return (
            <>
                <Button variant="ghost" size="sm">
                    <Icons.Delete
                        className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:scale-10 dark:text-slate-400 dark:hover:text-slate-100"
                        onClick={() => handleDelete(expenseId)}
                    />
                </Button>
                <Button variant="ghost" size="sm">
                    <Icons.Edit
                        className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:scale-10 dark:text-slate-400 dark:hover:text-slate-100"
                        onClick={() => handleEdit(expenseId)}
                    />
                </Button>
            </>
        );
    };

    const renderHeader = (params: GridRenderHeaderParams) => {
        return (
            <strong className="font-semibold">{params.colDef.headerName}</strong>
        );
    };

    const updatedColumns = columns.map((column) => ({
        ...column,
        renderHeader: renderHeader,
    }));

    const { theme: applicationTheme } = useTheme();
    const darkTheme = createTheme({
        palette: {
            mode: applicationTheme === "light" ? "light" : "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <DataGrid
                style={{
                    backgroundColor: applicationTheme === "light" ? "white" : "#152238",
                    fontSize: "1rem",
                }}
                pageSizeOptions={[10, 25, 50, 100]}
                disableRowSelectionOnClick
                autoHeight
                rows={row}
                columns={updatedColumns}
            />
        </ThemeProvider>
    );
};

export default Table;
