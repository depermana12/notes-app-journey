import { Router } from "express";
import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import { uploadAvatar } from "../controllers/upload.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);
router.post("/upload", uploadAvatar);

export default router;
