import express from "express";
import dotenv from "dotenv";
import { sql } from "./db";
// import cors from "cors";

import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "./controllers"
import rateLimiter from "./rateLimiter";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(rateLimiter)
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

async function DB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY, 
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      date DATE NOT NULL DEFAULT CURRENT_DATE
    )`;
  }
  catch (error) {
    console.error("Error creating table:", error);
  }
}

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);

app.use("/api/transactions", router);

DB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, DB Connected successfully.`);
  });
}).catch((error) => {
  console.error("Error initializing database:", error);
});

