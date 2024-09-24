import "dotenv/config";
import path from "node:path";
import express from "express";

import userRoute from "./routes/userRouter.js";
import notesRoute from "./routes/notesRouter.js";
import { protect } from "./modules/auth.js";

const app = express();

const __dirname = import.meta.dirname;
const PUBLIC_PATH = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_PATH));

app.use("/api/v1/notes", protect, notesRoute);
app.use("/api/v1/users", userRoute);

export default app;
