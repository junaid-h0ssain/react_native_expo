import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("Database URL is not defined in environment variables.");
}

export const sql = neon(DB_URL);