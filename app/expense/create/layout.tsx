import '@/styles/globals.css'
import React from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    // offset navbar height
    return <section className='pt-20'>{children}</section>
}