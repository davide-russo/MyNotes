import {INote, Note} from "../models/Note";
import {DbResponse} from "../models/DbResponse";

const ObjectId = require('mongoose').Types.ObjectId;

export const getNotes = async (): Promise<DbResponse<INote[]>> => {
    const allNotes: INote[] = await Note.find();
    return {error: null, value: allNotes};
};

export const getNoteById = async (noteId: string): Promise<DbResponse<INote>> => {
    if (!ObjectId.isValid(noteId)) {
        return { value: null, error: 'Invalid Note Id' };
    }
    const foundNote: INote | null = await Note.findById(noteId);
    return { value: foundNote, error: null };
};

export const addNote = async (noteObj: INote): Promise<DbResponse<INote>> => {
    const note = new Note(noteObj);
    const savedNote: INote = await note.save();
    return { value: savedNote, error: null };
};

export const updateNote = async (noteObj: INote): Promise<DbResponse<INote>> => {
    const note = new Note(noteObj);
    const updatedNote = await Note.findByIdAndUpdate(note.id, note);
    return { value: updatedNote, error: null };
};

export const deleteNote = async (noteId: string): Promise<DbResponse<INote>> => {
    if (!ObjectId.isValid(noteId)) {
        return { value: null, error: 'Invalid Note Id' };
    }
    const deletedNote: INote | null = await Note.findByIdAndRemove(noteId);
    return { value: deletedNote, error: null };
};
