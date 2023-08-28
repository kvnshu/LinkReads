'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginBtn() {
    const { data: session } = useSession()
    return (<div>
        {session ?
            <> 
                <button onClick={() => signOut()}>Sign out</button>
            </>
            :
            <>
                <button onClick={() => signIn("google")}>Sign in</button>
            </>
        }
    </div>)
}