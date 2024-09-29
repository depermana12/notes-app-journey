import * as db from "../databases/note.js";
import { DatabaseError } from "../error/customError.js";

export const getNotes = async () => {
  return await db.getAllNote();
};

export const getNote = async (id) => {
  const note = await db.getNoteById(id);
  if (!note) {
    throw new DatabaseError("Note not found");
  }
};

export const createNote = async (title, content, id) => {
  return await db.createNote(title, content, id);
};

export const updateNote = async (id, title, content) => {
  const note = await db.updateNote(id, title, content);
  if (!note) {
    throw new DatabaseError("Note not found");
  }
};

export const deleteNote = async (id) => {
  const note = await db.deleteNote(id);
  if (!note) {
    throw new DatabaseError("Note not found");
  }
  return note;
};

export const searchNotes = async (term) => {
  const notes = await db.searchNote(term);
  if (!notes) {
    throw new DatabaseError("Note not found");
  }
  return notes;
};
