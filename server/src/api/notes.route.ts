import express from "express";
import {addNote, deleteNote, getNoteById, getNotes, updateNote} from "../controllers/notes.controller";

export const notesRoute = express.Router();

notesRoute.get('/', getNotes);
notesRoute.get('/:id', getNoteById);
notesRoute.post('/', addNote);
notesRoute.put('/', updateNote);
notesRoute.delete('/:id', deleteNote);
