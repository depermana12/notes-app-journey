import { Router } from "express";
import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { protect } from "../modules/auth.js";

import { signIn, signUp } from "../controller/authController.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

// protect all routes below this middleware
router.use(protect);
router.route("/").get(getAllUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
