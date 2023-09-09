import { connectMongoDB } from '../../lib/mongodb'
import Note from '../../../models/note'
import User from '@/models/user'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { ObjectId } from 'mongodb'


export async function GET(req: Request){
    await connectMongoDB()
    const session = await getServerSession()
    const user = await User.findOne({ email: session?.user?.email })
    const user_id = user._id
    const data = await Note.find({user_id: user_id})
    return NextResponse.json(data, {status: 200})
}

export async function POST(req: Request) {
    const { note_url } = await req.json()
    const session = await getServerSession()
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