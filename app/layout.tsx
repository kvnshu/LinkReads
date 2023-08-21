import './globals.css'
import type { Metadata } from 'next'
import Navbar from './nav'
import AuthProvider from './context/AuthProvider'

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
                <AuthProvider>
                    <main>
                        <Navbar />
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    )
}
