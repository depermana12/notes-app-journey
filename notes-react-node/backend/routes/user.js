import { Router } from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import { protect } from "../auth/auth.js";
import { signIn } from "../controllers/auth.js";
import { uploadAvatar } from "../controllers/upload.js";

const router = Router();

router.post("/signup", createUser);
router.post("/signin", signIn);

// protect all routes below this middleware
router.use(protect);
router.route("/").get(getAllUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);
router.post("/upload", uploadAvatar);

export default router;
