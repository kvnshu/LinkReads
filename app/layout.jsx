import './globals.css'
import { Providers } from "./providers";

export const metadata = {
  title: 'LinkReads',
  // description: 'Goodreads for links',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  )
}
