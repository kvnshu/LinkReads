import './globals.css'
import { Providers } from "./providers";
import Script from "next/script"
import Header from "@/components/Header"
import { createSupabaseServerComponentClient } from '@/utils/supabaseAppRouterServer';
export const metadata = {
  title: 'LinkReads',
  description: 'Goodreads for the internet.',
}


export default async function RootLayout({ children }) {
  const supabase = createSupabaseServerComponentClient()
  const { data: { user }, error } = await supabase.auth.getUser()

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
          <Header
            user={user}
          />
          {children}
        </Providers>
      </body>
    </html >
  )
}
