import {Request, Response} from 'express';
import {Post} from "../models/post";

const ObjectId = require('mongoose').Types.ObjectId;

export const getPosts = async (request: Request, response: Response) => {
    try {
        const posts = await Post.find();
        response.send(posts);
    } catch (_) {
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const getPostById = async (request: Request, response: Response) => {
    const postId = request.params.id;
    if (!ObjectId.isValid(postId)) {
        return response.status(400).send({ error: 'Invalid Post id' });
    }
    try {
        const post = await Post.findById(postId);
        if (post) {
            return response.send(post);
        } else {
            return response.status(404).send({ error: 'Post not found' });
        }
    } catch (_) {
        return response.status(500).send({ error: 'Unexpected error' });
    }
};

export const addPost = async (request: Request, response: Response) => {
    const post = new Post(request.body);
    try {
        await post.save();
        response.send(post);
    } catch (_) {
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const updatePost = async (request: Request, response: Response) => {
    const post = new Post(request.body);
    if (!ObjectId.isValid(post.id)) {
        return response.status(400).send({ error: 'Invalid Post' });
    }
    try {
        await Post.findByIdAndUpdate(post.id, post);
        response.send({ success: true, _id: post.id });
    } catch (e) {
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const deletePost = async (request: Request, response: Response) => {
    const postId = request.params.id;
    if (!ObjectId.isValid(postId)) {
        return response.status(400).send({ error: 'Invalid Post Id' });
    }
    try {
        await Post.findByIdAndRemove(postId)
        response.send({ success: true, _id: postId });
    } catch (e) {
        response.status(500).send({error: 'Unexpected error'});
    }
};
