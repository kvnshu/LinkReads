import './globals.css'
import type { Metadata } from 'next'

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
      <body >{children}</body>
    </html>
  )
}
