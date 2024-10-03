import "dotenv/config";
import path from "node:path";
import express from "express";

import userRoute from "./routes/user.js";
import notesRoute from "./routes/note.js";
import authRoute from "./routes/auth.js";
import { protect } from "./auth/authHandler.js";
import globalErrorHandler from "./middlewares/errorHandler.js";
import invalidRouteHandler from "./middlewares/notFoundHandler.js";

const app = express();

const __dirname = import.meta.dirname;
const PUBLIC_PATH = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_PATH));

app.use("/api/v1/notes", protect, notesRoute);
app.use("/api/v1/users", protect, userRoute);
app.use("/api/v1/auth", authRoute);

app.use(invalidRouteHandler);
app.use(globalErrorHandler);

export default app;
