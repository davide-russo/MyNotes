import express from "express";
import {addPost, deletePost, getPostById, getPosts, updatePost} from "../controllers/posts.controller";

export const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:id', getPostById);
postsRouter.post('/', addPost);
postsRouter.put('/', updatePost);
postsRouter.delete('/:id', deletePost);
