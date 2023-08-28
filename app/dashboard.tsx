// getServerSession or useSession()?
import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]/options"
import React from "react"
import Image from "next/image"
import NotesContainer from "./notesContainer"

export default async function Dashboard() {
    // const session = await getServerSession(options)
    // const data = getNotes()
    // console.log(data)
    // console.log(session?.user?.image)

    return (
        <div>
            <NotesContainer/>
            {/* <Image className="rounded-full" src={session?.user?.image as string} alt="Picture of the author" width={60} height={60} />
            <div>Signed in as <span>{session?.user?.name}</span></div>
            <div>Email: <span>{session?.user?.email}</span></div> */}
        </div>
    )
}