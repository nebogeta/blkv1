export const metadata = {
    title: "Blk expense | Group",
    description: "Free & open-source expense tracker app",
};

import GroupExpenses from "@/components/GroupExpenses";

const GroupPage = () => {

    return <GroupExpenses
        expenses={[]}
    />

};

export default GroupPage;