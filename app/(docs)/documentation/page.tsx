import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import { FC } from 'react'
import 'simplebar-react/dist/simplebar.min.css'

import DocumentationTabs from '@/components/DocumentationTab'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blk expense | Documentation',
    description: 'Free & open-source expense tracker app',
}

const page: FC = () => {
    return (
        <div className='container max-w-7xl mx-auto mt-12'>
            <div className='flex flex-col items-center gap-6'>
                <LargeHeading>Create Expenses & Track them with ease.</LargeHeading>
                <Paragraph>api/v1/blk</Paragraph>

                <DocumentationTabs />
            </div>
        </div>
    )
}

export default page