import { Router } from "express";
import { createUser } from "../controllers/user.js";
import { signIn, forgotPassword, resetPassword } from "../controllers/auth.js";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", createUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
