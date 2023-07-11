import React, { useState, useEffect } from "react";
import { FilterIcon } from "lucide-react";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "@/ui/ToastComponent";

interface GroupFormProps {
    type: string;
    dynamicQuery: DynamicQuery;
    setDynamicQuery: React.Dispatch<React.SetStateAction<DynamicQuery>>;
    isEditing: boolean;
    updateQuery: (event: React.FormEvent) => void;
}

interface ExpenseItem {
    group: string;
}

interface DynamicQuery {
    groupId: string;
    startDate: string;
    endDate: string;
}

function GroupForm({
                       type,
                       dynamicQuery,
                       setDynamicQuery,
                       isEditing,
                       updateQuery,
                   }: GroupFormProps) {
    const [groups, setGroups] = useState<string[]>([]);

    useEffect(() => {
        fetchGroups().then((r) => console.log(r));
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await fetch("/api/expense");
            const data: ExpenseItem[] = await response.json();
            // @ts-ignore
            const groupIds = [...new Set(data.map((item) => item.group))];
            setGroups(groupIds);
        } catch (error) {
            toast({
                title: "Error fetching groups",
                message: "Please try again later",
                type: "error",
            });
        }
    };

    // @ts-ignore
    return (
        <div className="container md:max-w-2xl mt-12">
            <div className="flex flex-col gap-6 items-center">
                <FilterIcon className="mx-auto h-12 w-12 text-gray-400" />
                <LargeHeading className="text-center">
                    Welcome to your {type} Expense
                </LargeHeading>
                <Paragraph className="text-start">
                    You can filter your {type} expense by date.
                </Paragraph>
            </div>
            <form
                onSubmit={updateQuery}
                className="mt-6 sm:flex sm:items-center"
                action="#"
            >
                <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
                    <select
                        value={dynamicQuery.groupId}
                        onChange={(e) =>
                            setDynamicQuery({ ...dynamicQuery, groupId: e.target.value })
                        }
                        required={true}
                        className="block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-50 focus:border-indigo-500 disabled:opacity-50 dark:border-slate-700 dark:text-slate-500 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
                    >
                        <option value="" className="bg-transparent">
                            Select Group
                        </option>
                        {groups.map((groupId) => (
                            <option key={groupId} value={groupId}>
                                {groupId}
                            </option>
                        ))}
                    </select>

                    <Input
                        placeholder="Enter start date"
                        onChange={(e) =>
                            setDynamicQuery({ ...dynamicQuery, startDate: e.target.value})
                        }
                        type="date"
                        required={true}
                    />
                    <Input
                        placeholder="Enter end date"
                        type="date"
                        required={true}
                        onChange={(e) =>
                            setDynamicQuery({ ...dynamicQuery, endDate: e.target.value })
                        }
                    />
                </div>
                <div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                    <Button disabled={!dynamicQuery} isLoading={isEditing}>
                        Filter
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default GroupForm;
