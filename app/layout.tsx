import './globals.css'
import type { Metadata } from 'next'
import Navbar from './nav'

export const metadata: Metadata = {
    title: 'LinkReads',
    description: 'Platform for digital readers',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body >
                <main>
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    )
}
