import express from "express";
import {addPost, deletePost, getPostById, getPosts, updatePost} from "../services/post.service";

export const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostById);
postsRouter.post('/', addPost);
postsRouter.put('/', updatePost);
postsRouter.delete('/:id', deletePost);
