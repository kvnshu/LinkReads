// getServerSession or useSession()?
import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]/options"
import React from "react"
import Image from "next/image"

// async function getNotes(){
//     const res = await fetch('');
//     const data = await res.json();
//     return data?.items as any
// }

export default async function Dashboard() {
    const session = await getServerSession(options)
    // const data = getNotes()
    // console.log(data)
    // console.log(session?.user?.image)

    return (
        <div>
            <h1 className="text-bold">User homepage</h1>
            <Image className="rounded-full" src={session?.user?.image as string} alt="Picture of the author" width={60} height={60} />
            <div>Signed in as <span>{session?.user?.name}</span></div>
            <div>Email: <span>{session?.user?.email}</span></div>
        </div>
    )
}