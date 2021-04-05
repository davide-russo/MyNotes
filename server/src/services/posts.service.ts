import {IPost, Post} from "../models/Post";
import {DbResponse} from "../models/DbResponse";

const ObjectId = require('mongoose').Types.ObjectId;

export const getPosts = async (): Promise<DbResponse<IPost[]>> => {
    const allPosts: IPost[] = await Post.find();
    return {error: null, value: allPosts};
};

export const getPostById = async (postId: string): Promise<DbResponse<IPost>> => {
    if (!ObjectId.isValid(postId)) {
        return { value: null, error: 'Invalid Post Id' };
    }
    const foundPost: IPost | null = await Post.findById(postId);
    return { value: foundPost, error: null };
};

export const addPost = async (postObj: IPost): Promise<DbResponse<IPost>> => {
    const post = new Post(postObj);
    const savedPost: IPost = await post.save();
    return { value: savedPost, error: null };
};

export const updatePost = async (postObj: IPost): Promise<DbResponse<IPost>> => {
    const post = new Post(postObj);
    const updatedPost = await Post.findByIdAndUpdate(post.id, post);
    return { value: updatedPost, error: null };
};

export const deletePost = async (postId: string): Promise<DbResponse<IPost>> => {
    if (!ObjectId.isValid(postId)) {
        return { value: null, error: 'Invalid Post Id' };
    }
    const deletedPost: IPost | null = await Post.findByIdAndRemove(postId);
    return { value: deletedPost, error: null };
};
