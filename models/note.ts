import mongoose, { Schema, models } from 'mongoose'

const noteSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Note = models.Note || mongoose.model('Note', noteSchema)

export default Note;