import {Request, Response} from 'express';
import {DbResponse} from "../models/DbResponse";
import {INote} from "../models/Note";
import * as NotesService from "../services/notes.service";

export const getNotes = async (request: Request, response: Response) => {
    try {
        const dbResponse: DbResponse<INote[]> = await NotesService.getNotes();
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

export const getNoteById = async (request: Request, response: Response) => {
    try {
        const noteId: string = request.params.id;
        const dbResponse: DbResponse<INote> = await NotesService.getNoteById(noteId);
        if (dbResponse.error) {
            return response.status(400).send({ error: dbResponse.error });
        } else if (dbResponse.value === null) {
            return response.status(404).send({ error: `Couldn't find any note with id = ${noteId}` });
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: 'Unexpected error' });
    }
};

export const addNote = async (request: Request, response: Response) => {
    try {
        const noteObj: INote = request.body;
        const dbResponse: DbResponse<INote> = await NotesService.addNote(noteObj);
        if (dbResponse.value === null) {
            return response.status(400).send('You have to provide a valid Note object');
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const updateNote = async (request: Request, response: Response) => {
    try {
        const noteObj: INote = request.body;
        const dbResponse: DbResponse<INote> = await NotesService.updateNote(noteObj);
        if (dbResponse.value === null) {
            return response.status(400).send('You have to provide a valid Note object');
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({error: 'Unexpected error'});
    }
};

export const deleteNote = async (request: Request, response: Response) => {
    try {
        const noteId: string = request.params.id;
        const dbResponse: DbResponse<INote> = await NotesService.deleteNote(noteId);
        if (dbResponse.error) {
            return response.status(400).send({ error: dbResponse.error });
        } else if (dbResponse.value === null) {
            return response.status(404).send({ error: `Couldn't find any note with id = ${noteId}` });
        } else {
            return response.status(200).send(dbResponse.value);
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: 'Unexpected error' });
    }
};
