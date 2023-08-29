import { connectMongoDB } from '../../lib/mongodb'
import Note from '../../../models/note';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { ObjectId } from 'mongodb';


export async function POST(request: Request) {
    const { url } = await request
    const session = await getServerSession()
    await connectMongoDB();
    const userDoc = await User.findOne({ email: session?.user?.email })
    const user_id = userDoc._id as ObjectId;
    await Note.create({ user_id, url })
    return NextResponse.json({ message: "Note Added." }, { status: 201 })
}