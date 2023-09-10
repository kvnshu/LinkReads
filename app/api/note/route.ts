import { connectMongoDB } from '../../lib/mongodb'
import Note from '../../../models/note'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { ObjectId } from 'mongodb'
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function GET() {
    const session = await getServerSession(options)
    // console.log("Session Data:", session)
    await connectMongoDB()
    const user = await User.findOne({ email: session?.user?.email })
    const user_id = user?._id
    const data = await Note.find({ user_id: user_id })
    return NextResponse.json(data, { status: 200 })
}

export async function POST(req: Request) {
    const { note_url } = await req.json()
    const session = await getServerSession(options)
    await connectMongoDB()
    const user = await User.findOne({ email: session?.user?.email })
    // create and save note
    const user_id = user._id as ObjectId
    const note = new Note({ user_id: user_id, url: note_url })
    await note.save()
    // update user
    user.notes.push(note._id as ObjectId)
    await user.save()
    console.log(`Note with url ${note_url} successfully added by ${session?.user?.email}.`)
    return NextResponse.json({ message: `Note with url ${note_url} successfully added by ${session?.user?.email}.` }, { status: 201 })
}

export async function DELETE(req: Request) {
    const { note_id } = await req.json()
    console.log("Note_id:", note_id)
    await connectMongoDB();

    const note = await Note.findById(note_id)
    const note_url = note.url
    const user_id = note.user_id
    await User.findByIdAndUpdate(note.user_id, {
        $pull: { notes: note._id }
    })
    await Note.findByIdAndDelete(note_id)

    console.log(`Note with url ${note_url} from user with id ${user_id} deleted from database.`)
    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
}