import React, {ChangeEvent, FormEvent} from "react";
import {DollarSign} from "lucide-react";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";

interface Expense {
    description: string;
    amount: number;
    group: string;
    date: Date;
}

interface FormProps {
    type: string;
    expense: Expense;
    setExpense: React.Dispatch<React.SetStateAction<Expense>>;
    isEditing: boolean;
    updateExpense: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

function Form({type, expense, setExpense, isEditing, updateExpense}: FormProps) {
    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExpense({...expense, description: e.target.value});
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExpense({...expense, amount: Number(e.target.value)});
    };

    const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExpense({...expense, group: e.target.value || ""});
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setExpense({...expense, date: (e.target.value)});

    };


    return (
        <div className="container md:max-w-2xl">
            <div className="flex flex-col gap-6 items-center mt-12">
                <DollarSign className="mx-auto h-12 w-12 text-gray-400"/>
                <LargeHeading className="text-center">{type} your Expense</LargeHeading>
                <Paragraph>You haven&apos;t {type}ed your expense yet.</Paragraph>
            </div>
            <form onSubmit={updateExpense} className="mt-6 sm:flex sm:items-center" action="#">
                <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
                    <Input
                        placeholder="Enter Description"
                        value={expense.description}
                        onChange={handleDescriptionChange}
                        required={true}
                    />

                    <Input
                        placeholder="Enter amount"
                        value={expense.amount || ""}
                        onChange={handleAmountChange}
                        type="number"
                        required={true}
                    />

                    <Input
                        placeholder="Enter Group Name"
                        value={expense.group}
                        onChange={handleGroupChange}
                        required={true}
                    />

                    <Input
                        placeholder="Enter Date"
                        onChange={handleDateChange}
                        type="date"
                        required={true}
                    />
                </div>
                <div className="mt-6 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                    <Button disabled={!expense} isLoading={isEditing}>
                        Add
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Form;
