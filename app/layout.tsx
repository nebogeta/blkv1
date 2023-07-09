import Navbar from '@/components/Navbar'
import {Toaster} from '@/components/ui/ToastComponent'
import '@/styles/globals.css'
import {Inter} from 'next/font/google'
import MobileMenu from '@/components/MobileMenu'
import Providers from '@/components/Provider'
import {cn} from '@/lib/utils'
import React from "react";
import {ExpenseProvider} from "@/context/ExpenseContext";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({children,}: { children: React.ReactNode }) {

    return (
        <html
            lang='en'
            className={cn('bg-white text-slate-900 antialiased', inter.className)}>
        <body className='min-h-screen bg-slate-50 dark:bg-slate-900 antialiased'>
        <Providers>
            <ExpenseProvider>
            <Navbar/>
            <Toaster position='bottom-right'/>
            <MobileMenu/>
            <main>{children}</main>
            </ExpenseProvider>
        </Providers>

        <div className='h-40 md:hidden'/>
        </body>
        </html>
    )
}
