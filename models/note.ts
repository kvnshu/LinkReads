import mongoose, { Schema, Types, models } from 'mongoose'

interface INote {
    user_id: Types.ObjectId,
    url: string
}

const noteSchema = new Schema<INote>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Note = models.Note || mongoose.model<INote>('Note', noteSchema)

export default Note;