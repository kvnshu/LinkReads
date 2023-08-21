import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]/options"
import React from "react"

// async function getNotes(){
//     const res = await fetch('');
//     const data = await res.json();
//     return data?.items as any
// }

export default async function Dashboard() {
    // const session = await getServerSession(options)
    // const data = getNotes()
    // console.log(data)

    return (
        <div>
            <h1>User homepage</h1>
            {/* Signed in as {session?.user?.name} <br /> */}
        </div>
    )
}