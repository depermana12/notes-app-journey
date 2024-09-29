import { Router } from "express";
import { createUser, forgotPassword } from "../controllers/auth.js";

const router = Router();

router.post("/signup", createUser);
router.post("/forgotpassword", forgotPassword);

export default router;
