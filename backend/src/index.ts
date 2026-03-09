import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { connectDb } from "./database/connection";
import { socketConn } from "./sockets/connection";
import sessionsRouter from "./routes/sessions";
import changesRouter from "./routes/changes";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);
app.use(express.json(), cors());

socketConn(io);

const PORT: number = parseInt(process.env.PORT ?? "3000");

app.use("/sessions", sessionsRouter);
app.use("/changes", changesRouter);

connectDb();

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listen at http://localhost:${PORT}`);
});
