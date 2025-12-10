import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the path of the current file (backend/config/db.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the project root (two levels up from backend/config)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Log an error if connection variables are missing to make debugging easier
if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
  console.error("Error: Database environment variables are missing. Ensure .env is loaded correctly.");
}

export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);