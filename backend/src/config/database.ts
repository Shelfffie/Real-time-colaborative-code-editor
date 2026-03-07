import { Client } from "pg";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../.env") });

export const db = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});
