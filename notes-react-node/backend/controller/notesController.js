import * as db from "../db/noteQueries.js";

export const getAllNote = async (req, res) => {
  const notes = await db.getAllNote();

  res.status(200);
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;

  const note = await db.getNoteById(id);
  // res.status(200).json({ title: row.title });
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  const newNote = await db.createNote(title, content);
};
export const updateNote = async () => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedNote = await db.updateNote(id, title, content);
};
export const deleteNote = async () => {
  const { id } = req.params;

  const deletedNote = await db.deleteNote(id);
};
