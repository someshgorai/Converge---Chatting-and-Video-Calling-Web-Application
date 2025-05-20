import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import { db } from "./lib/sql/db.postgres.js";
import { connectDB } from "./lib/mongoDB/db.mongo.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Parses incoming requests with JSON payloads and puts the parsed data in req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  // MongoDB
  connectDB();

  // PostgreSQL
  db.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("DB connection error:", err));
});
