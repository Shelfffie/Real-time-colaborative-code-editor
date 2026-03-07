import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import { connectDb } from "./database/connection";
import sessionsRouter from "./routes/sessions";
import changesRouter from "./routes/changes";

const app = express();

console.log("Loading .env from:", path.join(__dirname, ".env"));

app.use(express.json(), cors());
const PORT: number = parseInt(process.env.PORT ?? "3000");

app.use("/sessions", sessionsRouter);
app.use("/changes", changesRouter);

connectDb();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listen at http://localhost:${PORT}`);
});
