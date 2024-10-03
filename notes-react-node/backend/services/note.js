import * as db from "../database/note.js";
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

export const totalNoteLength = async () => {
  return await db.countNote();
};

export const paginatedNote = async (page, limit) => {
  const offset = (page - 1) * limit;

  const notesLength = await db.countNote();
  const notes = await db.getNoteByPaginated(limit, offset);

  const totalPage = Math.ceil(parseInt(notesLength) / limit);

  const hasNext = page < totalPage;
  const hasPrev = page > 1;

  return {
    notes,
    length: notesLength,
    pagination: { currentPage: page, totalPage, hasNext, hasPrev },
  };
};

export const createNote = async (title, content, id) => {
  return await db.createNote(title, content, id);
};

export const updateNote = async (id, title, content) => {
  const note = await db.updateNote(id, title, content);
  if (!note) {
    throw new DatabaseError("Note not found, failed to update");
  }
};

export const deleteNote = async (id) => {
  const note = await db.deleteNote(id);
  if (!note) {
    throw new DatabaseError("Note not found, failed to delete");
  }
  return note;
};

export const searchNotes = async (term) => {
  const notes = await db.searchNote(term);
  if (!notes) {
    throw new DatabaseError("Search term not found");
  }
  return notes;
};
