import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/mongoDB/db.mongo.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // Parses incoming requests with JSON payloads and puts the parsed data in req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});
