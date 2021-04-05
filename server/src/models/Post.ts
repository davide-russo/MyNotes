import mongoose, {Schema, Document} from 'mongoose';

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }
});

export interface IPost extends Document {
    title: string,
    author: string,
    content: string
}

export const Post = mongoose.model<IPost>('Post', PostSchema);
