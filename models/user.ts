import mongoose, { Schema, models, Types } from 'mongoose';

interface IUser {
    name: string,
    email: string,
    notes: [Types.ObjectId]
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
}, { timestamps: true })

const User = models.User || mongoose.model<IUser>('User', userSchema)

export default User;