import {Request, Response} from 'express';
import {DbResponse} from "../models/DbResponse";
import {IPost} from "../models/Post";
import * as PostsService from "../services/posts.service";

export const getPosts = async (request: Request, response: Response) => {
    try {
        const dbResponse: DbResponse<IPost[]> = await PostsService.getPosts();
        if (dbResponse.error) {
            response.status(400).send({ code: 400, error: dbResponse.error });
        } else {
            response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const getPostById = async (request: Request, response: Response) => {
    try {
        const postId: string = request.params.id;
        const dbResponse: DbResponse<IPost> = await PostsService.getPostById(postId);
        if (dbResponse.error) {
            return response.status(400).send({ error: dbResponse.error });
        } else if (dbResponse.value === null) {
            return response.status(404).send({ error: `Couldn't find any post with id = ${postId}` });
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: 'Unexpected error' });
    }
};

export const addPost = async (request: Request, response: Response) => {
    try {
        const postObj: IPost = request.body;
        const dbResponse: DbResponse<IPost> = await PostsService.addPost(postObj);
        if (dbResponse.value === null) {
            return response.status(400).send('You have to provide a valid Post object');
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const updatePost = async (request: Request, response: Response) => {
    try {
        const postObj: IPost = request.body;
        const dbResponse: DbResponse<IPost> = await PostsService.updatePost(postObj);
        if (dbResponse.value === null) {
            return response.status(400).send('You have to provide a valid Post object');
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const deletePost = async (request: Request, response: Response) => {
    try {
        const postId: string = request.params.id;
        const dbResponse: DbResponse<IPost> = await PostsService.deletePost(postId);
        if (dbResponse.error) {
            return response.status(400).send({ error: dbResponse.error });
        } else if (dbResponse.value === null) {
            return response.status(404).send({ error: `Couldn't find any post with id = ${postId}` });
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: 'Unexpected error' });
    }
};
