import './globals.css'
import { Providers } from "./providers";
import Script from "next/script"

export const metadata = {
  title: 'LinkReads',
  description: 'Goodreads for the internet.',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <div className="analytics">
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-TPXV40DFYJ" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-TPXV40DFYJ');
            `}
          </Script>
        </div>
        <Providers>
          {children}
        </Providers>
      </body>
    </html >
  )
}
