import mongoose, {Schema, Document} from 'mongoose';

const NoteSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }
});

export interface INote extends Document {
    title: string,
    author: string,
    content: string
}

export const Note = mongoose.model<INote>('Note', NoteSchema);
