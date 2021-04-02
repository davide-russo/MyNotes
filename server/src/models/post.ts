import {CallbackError, Schema} from 'mongoose';
import {MONGO_URI} from "../config/server.config";

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(`${MONGO_URI}/posts`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error: CallbackError) => {
        if (error) {
            console.error(error);
        } else {
            console.log('* Successfully connected to Posts Database *\n');
        }
    });

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }
});

export interface IPost {
    id: string,
    title: string,
    author: string,
    content: string
}

export const Post = mongoose.model('Post', PostSchema);
