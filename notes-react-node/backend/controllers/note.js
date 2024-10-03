import * as noteService from "../services/note.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getAllNote = asyncHandler(async (req, res) => {
  const notes = await noteService.getNotes();
  res.status(200).json({ message: "success", data: notes });
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await noteService.getNote(req.params.id);
  res.status(200).json({ message: "success", data: note });
});

export const getNoteByPaginated = asyncHandler(async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  const { notes, length, pagination } = await noteService.paginatedNote(
    page,
    limit,
  );

  res.status(200).json({ message: "success", data: notes, length, pagination });
});

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const newNote = await noteService.createNote(title, content, id);
  res.status(201).json({ message: "success", data: newNote });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  const updatedNote = await noteService.updateNote(id, title, content);
  res.status(200).json({ message: "success", data: updatedNote });
});

export const deleteNote = asyncHandler(async (req, res) => {
  await noteService.deleteNote(req.params.id);
  res.status(204).json({ message: "success" });
});
