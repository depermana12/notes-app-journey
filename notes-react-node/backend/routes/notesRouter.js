import { Router } from "express";
import {
  getAllNote,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controller/notesController.js";

const router = Router();

router.route("/").get(getAllNote).post(createNote);
router.route("/:id").get(getNoteById).patch(updateNote).delete(deleteNote);

export default router;
