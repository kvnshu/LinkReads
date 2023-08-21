import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google' 

export  const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ]
    // pages option can be used to create my own sign-in page
}