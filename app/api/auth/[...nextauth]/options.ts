import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import User from "@/models/user";
import { connectMongoDB } from '@/app/lib/mongodb'

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                const { name, email } = user
                try {
                    await connectMongoDB();
                    const userExists = await User.findOne({ email });
                    if (!userExists) {
                        const res = await fetch('http://localhost:3000/api/user', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                email
                            })
                        })
                        if (res.ok) {
                            return true
                        }
                    }
                } catch (error) {
                    console.log(error)
                    return false
                }
            }

            return true
        },
    }
    // adapter: MongoDBAdapter(connectMongoDB)
}